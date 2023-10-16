require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { authMiddleware, signGraphqlToken } = require('./utils/auth'); // Import new function
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const cors = require('cors');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => authMiddleware({ req, res }),
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

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

db.on('error', (error) => {
  console.error('Error connecting to MongoDB:', error);
});

startApolloServer();
