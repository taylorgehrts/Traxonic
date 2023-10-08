const mongoose = require('mongoose');
const Collaborator = require('./Collaborator');
const File = require('./File'); // Import the File model
const Message = require('./Message'); // Import the Message model

const { Schema } = mongoose;

const projectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  genre: String,
  bpm: Number,
  description: String,
  image: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  files: [
    {
      type: Schema.Types.ObjectId,
      ref: 'File',
    },
  ],
  collaborators: [
    {
      collaborator: {
        type: Schema.Types.ObjectId,
        ref: 'Collaborator',
      },
      role: String, // If you want to store the role of each collaborator in this project
    },
  ],
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Message',
    },
  ],
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
