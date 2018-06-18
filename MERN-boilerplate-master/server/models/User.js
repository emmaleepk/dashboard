const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    default: '',
    required: true
  },
  lastName: {
    type: String,
    default: '',
    required: true
  },
  email: {
    type: String,
    default: '',
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    default:'',
    requited: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  classTaken: {
    type: Object
    required: false,
    properties:{
      classType: {
        type: Array,
        items:{
          type: String,
          default: ''
        }
      },
      instructor:{
        type: Array,
        items:{
          type: String,
          default: ''
        }
      },
      date:{
        type: Array,
        items:{
          type: Date,
          default: Date.now
        }
      }
    }
  }
});

// Generate hash for password using bcrypt
UserSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

UserSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', UserSchema);
