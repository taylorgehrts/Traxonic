const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdOn: Date,
  text: String,
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
