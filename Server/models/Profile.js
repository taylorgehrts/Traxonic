const mongoose = require('mongoose');

const { Schema } = mongoose;

const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  projects: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Project',
    },
  ],
  location: String,
  bio: String,
  image: String,
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
