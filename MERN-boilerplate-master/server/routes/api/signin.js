const express = require('express');
const app = express.Router();
const mongoose = require('mongoose');

const User = require('../../models/User');
const UserSession = require('../../models/UserSession');

// Sign up

// Post request
app.post('/api/account/signup', (req, res, next)=>{
  const { body } = req;

  const {
    firstName,
    lastName,
    email,
    password
  } = body;

  if (!firstName){
    res.send({
      success: false,
      message: 'Error: First name cannot be blank.'
    });
  }
  if (!lastName){
    res.send({
      success: false,
      message: 'Error: Last name cannot be blank.'
    });
  }
  if (!email){
    res.send({
      success: false,
      message: 'Error: Email cannot be blank.'
    });
  }
  if (!password){
    res.send({
      success: false,
      message: 'Error: Password required.'
    });
  }

  // Check if email exsists if not save user
  User.find({
    email: email
  }, (err, previousUsers) => {
      if(err){
        res.send({
          success: false,
          message: 'Error: Server Error.'
        });
      } else if (previousUsers.length > 0) {
        res.send({
          success: false,
          message: 'Error: Email in use!'
        });
      }

    // Email already exsists
    const newUser = new User();

    newUser.email = email;
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.password = newUser.generateHash(password);
    newUser.save((err, user) => {
      if(err){
        res.send({
          success: false,
          message: 'Error: Server Error.'
        });
      }
      res.send({
        success: true,
        message:'Signed up'
      });
    });
});

module.exports = app;
