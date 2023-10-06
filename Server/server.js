const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return { /* context data */ };
  },
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Start the Apollo Server asynchronously
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`Connected to MongoDB`);
      console.log(`Server is running on http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};

// Error handling for MongoDB connection
db.on('error', (error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Call the async function to start the server
startApolloServer();
