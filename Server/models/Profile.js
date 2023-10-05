const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
    },
  ],
  location: String,
  bio: String,
  image: String,
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
