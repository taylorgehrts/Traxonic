const mongoose = require('mongoose');

const { Schema } = mongoose;

const publicFileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  title: String,
  duration: Number,
  size: Number,
  url: String,
  uploadedOn: {
    type: Date,
    default: Date.now,
  },
});

const PublicFile = mongoose.model('PublicFile', publicFileSchema);

module.exports = PublicFile;
