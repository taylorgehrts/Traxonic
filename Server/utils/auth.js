const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'mysecretsshhhhh';
const expiration = process.env.JWT_EXPIRATION || '2h';

module.exports = {
  authMiddleware: function ({ req, res }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      console.log('Authorization header:', req.headers.authorization); // Add this line for logging

      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return { req, res, user: null };
    }

    try {
      const { data } = jwt.verify(token, secret);
      req.user = data;
    } catch (error) {
      console.log('Invalid token');
    }

    return { req, res, user: req.user };
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
  signGraphqlToken: function ({ username, email, _id }) {
    // Function to sign a GraphQL-specific token
    const payload = { username, email, _id, scope: 'graphql' }; // Add a scope to differentiate from Cognito token
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
