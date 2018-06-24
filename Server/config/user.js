const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: '',
    lowercase: true
  },
  password: {
    type: String,
    default:''
  },
  isDeleted: {
    type: Boolean,
  },
  classTaken: {
    type: Array,
    items:{
      type: Object,
      properties: {
        classType: {
          type: String,
          default: ''
        },
        instructor:{
            type: String,
            default: ''
        },
        date:{
            type: Date,
            default: Date.now
        }
      }
    }
  }
});

module.exports = mongoose.model('User', UserSchema);
