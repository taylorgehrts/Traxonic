const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  url: String,
});

const File = mongoose.model('File', fileSchema);

module.exports = File;
