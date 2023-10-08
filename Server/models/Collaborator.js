const mongoose = require('mongoose');
const User = require('./User'); // Adjusted import statement for User model

const { Schema } = mongoose;

const collaboratorSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  role: {
    type: String,
    enum: ['viewer', 'editor'],
    default: 'editor', // Set the default role to 'editor'
  },
});

const Collaborator = mongoose.model('Collaborator', collaboratorSchema);

module.exports = Collaborator;
