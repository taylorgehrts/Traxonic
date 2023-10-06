const mongoose = require('mongoose');

const { Schema } = mongoose;

const messageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  text: String,
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
