const { AuthenticationError, ApolloError } = require("apollo-server-express");
const {
  User,
  Collaborator,
  File,
  Message,
  Profile,
  Project,
  PublicFile,
} = require("../models");
const { signToken, signGraphqlToken } = require("../utils/auth");

const resolvers = {
  Query: {
    findUser: async (_, { id }, context) => {
      if (!context.user) {
        throw new AuthenticationError("Authentication required");
      }

      try {
        const user = await User.findById(id);
        return user;
      } catch (error) {
        console.error("Error finding user:", error);
        throw new ApolloError("Error finding user");
      }
    },
    findByGenre: async (_, { genre }, context) => {
      if (!context.user) {
        throw new AuthenticationError("Authentication required");
      }

      try {
        const projects = await Project.find({ genre });
        return projects;
      } catch (error) {
        console.error("Error finding projects by genre:", error);
        throw new ApolloError("Error finding projects");
      }
    },
    findAllUsers: async (_, __, context) => {
      if (!context.user) {
        throw new AuthenticationError("Authentication required");
      }

      try {
        const users = await User.find();
        return users;
      } catch (error) {
        console.error("Error finding all users:", error);
        throw new ApolloError("Error finding users");
      }
    },
    getProjects: async (_, { userId }, context) => {
      if (!context.user) {
        throw new AuthenticationError("Authentication required");
      }

      // Fetch projects based on user ID
      const projects = await Project.find({ owner: userId });
      return projects;
    },
  },
  Mutation: {
    login: async (_, { email, password }) => {
      try {
        // Validate user credentials and generate a token
        const user = await User.findOne({ email });

        if (!user || !(await user.isCorrectPassword(password))) {
          throw new AuthenticationError("Invalid credentials");
        }

        // Use the appropriate token
        const token = signToken(user); // for Cognito or other purposes
        const graphqlToken = signGraphqlToken(user); // for GraphQL

        return { token, graphqlToken, user };
      } catch (error) {
        console.error("Error logging in:", error);
        // Handle errors
        if (error.networkError) {
          console.error("Network error:", error.networkError);
          throw new ApolloError(
            "A network error occurred. Please check your internet connection and try again."
          );
        }

        if (error.graphQLErrors) {
          const firstError = error.graphQLErrors[0];
          console.error("GraphQL error:", firstError);

          if (firstError.extensions.code === "BAD_USER_INPUT") {
            throw new ApolloError(
              "Invalid email or password. Please try again."
            );
          } else if (firstError.extensions.code === "UNAUTHENTICATED") {
            throw new AuthenticationError(
              "Authentication failed. Please check your email and password."
            );
          } else {
            throw new ApolloError(
              "An error occurred during login. Please try again."
            );
          }
        }

        console.error("Error during login:", error);
        throw new ApolloError(
          "An error occurred during login. Please try again."
        );
      }
    },
    logout: async function (parent, args, context) {
      try {
        const { req, res, user } = context;

        if (!user) {
          console.log("User not authenticated");
          return false;
        }

        console.log("Clearing session and cookies");

        req.session.destroy();

        console.log("Logout successful");

        // Return true if logout was successful
        return true;
      } catch (error) {
        console.error("Error during logout:", error);
        // Handle error as needed
        return false;
      }
    },

    addUser: async (_, args) => {
      try {
        const user = await User.create(args);
        return user;
      } catch (error) {
        console.error("Error adding user:", error.message);
        throw new ApolloError("Error adding user");
      }
    },

    updateUser: async (
      _,
      { userId, username, first, last, email },
      context
    ) => {
      // Add authentication check
      if (!context.user) {
        throw new AuthenticationError("Authentication required");
      }

      try {
        // Check if the authenticated user is updating their own account
        if (context.user._id === userId) {
          // Perform the logic to update the user's information
          const updatedUser = await User.findByIdAndUpdate(
            userId,
            { username, first, last, email },
            { new: true }
          );

          // Return the updated user
          return updatedUser;
        } else {
          // If the user is not updating their own account, throw an error
          throw new AuthenticationError(
            "You are not authorized to update this user"
          );
        }
      } catch (error) {
        console.error("Error updating user:", error);
        throw new ApolloError("Error updating user");
      }
    },

    removeUser: async (_, { userId }, context) => {
      if (!context.user) {
        throw new AuthenticationError("Authentication required");
      }

      try {
        // Check if the authenticated user is removing their own account
        if (context.user._id === userId) {
          // Perform the logic to remove the user (and associated data)?

          await User.findByIdAndRemove(userId);

          // Return true to indicate success
          return true;
        } else {
          // If the user is not removing their own account, throw an error
          throw new AuthenticationError(
            "You are not authorized to remove this user"
          );
        }
      } catch (error) {
        console.error("Error removing user:", error);
        throw new ApolloError("Error removing user");
      }
    },

    addProfile: async (_, { userId, location, bio, image, links }, context) => {
      if (!context.user) {
        throw new AuthenticationError("Authentication required");
      }

      try {
        console.log("Adding profile for user:", userId);

        // Check if the authenticated user is adding a profile for themselves
        if (context.user._id === userId) {
          console.log(
            "Adding profile for authenticated user:",
            context.user._id
          );

          // Check if the user already has a profile
          const existingProfile = await Profile.findOne({ user: userId });

          if (existingProfile) {
            throw new ApolloError("User already has a profile");
          }

          // Perform the logic to add the user's profile
          const newProfile = await Profile.create({
            user: userId,
            location,
            bio,
            image,
            links,
          });

          // Return the newly created profile
          return newProfile;
        } else {
          // If the user is not adding a profile for themselves, throw an error
          throw new AuthenticationError(
            "You are not authorized to add a profile for this user"
          );
        }
      } catch (error) {
        console.error("Error adding profile:", error);
        throw new ApolloError("Error adding profile");
      }
    },

    updateProfile: async (
      _,
      { userId, location, bio, image, links },
      context
    ) => {
      // Add authentication check
      if (!context.user) {
        throw new AuthenticationError("Authentication required");
      }

      try {
        // Check if the authenticated user is updating their own profile
        if (context.user._id === userId) {
          // Find and update the user's profile
          const updatedProfile = await Profile.findOneAndUpdate(
            { user: userId },
            { $set: { location, bio, image, links } },
            { new: true } // Return the updated document
          ).populate("user"); // Ensure that the 'user' field is populated

          // Return the updated profile
          return updatedProfile;
        } else {
          // If the user is not updating their own profile, throw an error
          throw new AuthenticationError(
            "You are not authorized to update this profile"
          );
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        throw new ApolloError("Error updating profile");
      }
    },

    addProject: async (
      _,
      { userId, title, genre, bpm, description },
      context
    ) => {
      if (!context.user) {
        throw new AuthenticationError("Authentication required");
      }

      try {
        // Check if the authenticated user is adding a project for themselves
        if (context.user._id.toString() === userId) {
          // Perform the logic to add the project
          const newProject = await Project.create({
            owner: userId,
            user: context.user._id,
            title,
            genre,
            bpm,
            description,
          });

          // Return the newly created project
          return newProject;
        } else {
          // If the user is not adding a project for themselves, throw an error
          throw new AuthenticationError(
            "You are not authorized to add a project for this user"
          );
        }
      } catch (error) {
        console.error("Error adding project:", error);
        throw new ApolloError("Error adding project");
      }
    },

    removeProject: async (_, { projectId }, context) => {
      // Check if the user is authenticated
      if (!context.user) {
        throw new AuthenticationError("Authentication required");
      }

      try {
        // Find the project by ID
        const project = await Project.findById(projectId);

        // Check if the project exists
        if (!project) {
          throw new ApolloError("Project not found");
        }

        // Check if the authenticated user is the owner of the project
        if (context.user._id.toString() === project.owner.toString()) {
          // Perform the logic to remove the project
          await Project.findByIdAndRemove(projectId);

          // Return true to indicate success
          return true;
        } else {
          // If the user is not the owner, throw an error
          throw new AuthenticationError(
            "You are not authorized to remove this project"
          );
        }
      } catch (error) {
        console.error("Error removing project:", error);
        throw new ApolloError("Error removing project");
      }
    },
  },
};

module.exports = resolvers;
