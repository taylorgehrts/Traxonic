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
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    findUser: async (_, { id }, context) => {
      // Add authentication check
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
      // Add authentication check
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
      // Add authentication check
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
  },
  Mutation: {
    login: async (_, { email, password }) => {
      // Validate user credentials and generate a token
      // You can use the signToken function from your auth module
      const user = await User.findOne({ email });

      if (!user || !(await user.isCorrectPassword(password))) {
        throw new AuthenticationError("Invalid credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    logout: async (_, __, context) => {
      // Handle logout logic (if needed)
      // For example, you might invalidate the token on the client-side
      return true;
    },
    addUser: async (_, args) => {
      try {
        const user = await User.create(args);
        return user;
      } catch (error) {
        console.error("Error adding user:", error.message); // Log the specific error message
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
      // Add authentication check
      if (!context.user) {
        throw new AuthenticationError("Authentication required");
      }

      try {
        // Check if the authenticated user is removing their own account
        if (context.user._id === userId) {
          // Perform the logic to remove the user (and associated data)
          // Example: You might want to delete the user, their profile, projects, files, messages, etc.
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
      // Add authentication check
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

    // Add other mutations for projects, files, collaborators, messages, etc.
  },
  // Add other resolvers for User, Profile, Project, File, Message types
};

module.exports = resolvers;
