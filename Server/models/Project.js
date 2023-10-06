const mongoose = require('mongoose');

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
  files: [
    {
      type: Schema.Types.ObjectId,
      ref: 'File',
    },
  ],
  collaborators: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
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
