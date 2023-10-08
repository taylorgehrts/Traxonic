const { AuthenticationError, ApolloError } = require('apollo-server-express');
const {User, Collaborator, File, Message, Profile, Project, PublicFile} = require('../models')
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
      findUser: async (_, { id }, context) => {
        // Add authentication check
        if (!context.user) {
          throw new AuthenticationError('Authentication required');
        }
  
        try {
          const user = await User.findById(id);
          return user;
        } catch (error) {
          console.error('Error finding user:', error);
          throw new ApolloError('Error finding user');
        }
      },
      findByGenre: async (_, { genre }, context) => {
        // Add authentication check
        if (!context.user) {
          throw new AuthenticationError('Authentication required');
        }
  
        try {
          const projects = await Project.find({ genre });
          return projects;
        } catch (error) {
          console.error('Error finding projects by genre:', error);
          throw new ApolloError('Error finding projects');
        }
      },
      findAllUsers: async (_, __, context) => {
        // Add authentication check
        if (!context.user) {
          throw new AuthenticationError('Authentication required');
        }
  
        try {
          const users = await User.find();
          return users;
        } catch (error) {
          console.error('Error finding all users:', error);
          throw new ApolloError('Error finding users');
        }
      },
    },
    Mutation: {

        login: async (_, { email, password }) => {
            // Validate user credentials and generate a token
            // You can use the signToken function from your auth module
            const user = await User.findOne({ email });
      
            if (!user || !(await user.isCorrectPassword(password))) {
              throw new AuthenticationError('Invalid credentials');
            }
      
            const token = signToken(user);
      
            return { token };
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
              console.error('Error adding user:', error.message); // Log the specific error message
              throw new ApolloError('Error adding user');
            }
          },
          
      updateProfile: async (_, args, context) => {
        // Add authentication check
        if (!context.user) {
          throw new AuthenticationError('Authentication required');
        }
  
        try {
          const profile = await Profile.findOneAndUpdate(
            { user: context.user._id },
            { $set: args },
            { new: true }
          );
          return profile;
        } catch (error) {
          console.error('Error updating profile:', error);
          throw new ApolloError('Error updating profile');
        }
      },
      // Add other mutations for projects, files, collaborators, messages, etc.
    },
    // Add other resolvers for User, Profile, Project, File, Message types
  };
  
  module.exports = resolvers;
  