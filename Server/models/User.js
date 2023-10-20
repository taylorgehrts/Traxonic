const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const userSchema = new Schema({
  isAdmin: {
    type: Boolean,
    default: false,
  },

  username: {
    type: String,
    required: true,
    unique: true,
  },
  first: {
    type: String,
    required: true,
    trim: true,
  },
  last: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 10,
  },
});

// hash user password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
