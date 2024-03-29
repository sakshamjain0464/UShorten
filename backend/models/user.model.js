const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true // Ensures that each username is unique
  },
  email: {
    type: String,
    required: true,
    unique: true // Ensures that each email is unique
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now // Sets the default value to the current timestamp
  }
});

// Create a User model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
