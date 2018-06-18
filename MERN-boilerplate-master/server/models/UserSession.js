const mongoose = require('mongoose');

const UserSessionSchema = new mongoose.Schema({
  userId: {
    type: Number,
    default: -1
  },
  timestamp: {
    type: Dete,
    default: Date.now()
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('UserSession', UserSessionSchema);
