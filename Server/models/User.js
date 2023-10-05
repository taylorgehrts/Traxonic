const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  first: String,
  last: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
