const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: String,
  genre: String,
  bpm: Number,
  description: String,
  image: String,
  files: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'File',
    },
  ],
  collaborators: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
    },
  ],
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
