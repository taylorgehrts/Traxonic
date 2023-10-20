const mongoose = require("mongoose");
const User = require("./User");
const Project = require("./Project");

const { Schema } = mongoose;

const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  projects: [
    {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
  location: String,
  bio: String,
  image: String,
  links: [
    {
      title: String,
      url: String,
    },
  ],
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
