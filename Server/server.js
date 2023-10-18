require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { authMiddleware, signGraphqlToken } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const cors = require('cors');
const path = require('path');

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

const Project = require('./models/Project');

// Serve up static assets (React frontend) in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  // For any other requests, serve the React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

// Set up a route for handling project details
app.get('/api/projects/:projectId', async (req, res) => {
  try {
    const projectId = req.params.projectId;

    // Fetch project details from the database based on projectId
    const projectDetails = await Project.findById(projectId);

    if (!projectDetails) {
      // If the project is not found, return a 404 status
      return res.status(404).json({ error: 'Project not found' });
    }

    // Send the project details as a JSON response
    res.json(projectDetails);
  } catch (error) {
    console.error('Error fetching project details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

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
