const mongoose = require('mongoose');
const Collaborator = require('./Collaborator');
const File = require('./File'); 
const Message = require('./Message'); 

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
      role: String, //to store the role of each collaborator in this project later
    },
  ],
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Message',
    },
  ],
});

projectSchema.virtual('ownerUsername', {
  ref: 'User',
  localField: 'owner',
  foreignField: '_id',
  justOne: true,
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
