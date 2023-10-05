const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const db = require('./config/connection');

const User = require('./models/User');
const Profile = require('./models/Profile');
const Project = require('./models/Project');
const File = require('./models/File');
const Message = require('./models/Message');

const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // You can use this context to authenticate users if needed
    // For simplicity, let's just pass the User model to the context
    return { User };
  },
});

server.applyMiddleware({ app });

db
  .once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => {
      console.log('Server is running on http://localhost:3000/graphql');
    });
  })
  .on('error', (error) => {
    console.error('Error connecting to MongoDB:', error);
  });