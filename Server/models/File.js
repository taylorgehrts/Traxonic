const mongoose = require("mongoose");

const { Schema } = mongoose;

const fileSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  url: String,
  duration: Number, // In seconds
  size: Number, // In bytes
  uploadedOn: {
    type: Date,
    default: Date.now,
  },
});

const File = mongoose.model("File", fileSchema);

module.exports = File;
