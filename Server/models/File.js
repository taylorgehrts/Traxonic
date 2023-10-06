const mongoose = require('mongoose');

const { Schema } = mongoose;

const fileSchema = new Schema({
  url: String,
  uploadedOn: {
    type: Date,
    default: Date.now,
  },
});

const File = mongoose.model('File', fileSchema);

module.exports = File;