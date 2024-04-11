const express = require('express'); // Import express

const passport = require('passport'); // Import passport

const { body } = require('express-validator'); // Import the express-validator functions

const signup = require('../controllers/signup') // Import the signup function from the controllers/signup.js file

const login = require('../controllers/login') // Import the login function from the controllers/login.js file

const googleLogin = require('../controllers/googleLogin') // Import the googleLogin function from the controllers/googleLogin.js file

const router = express.Router(); // Create a new router


router.post('/signup', [body('username').isLength({ min: 7 }), body('email').isEmail(), body('password').isLength({ min: 8 })], signup); // Create a new POST endpoint with the /signup path, the validations array, and the signup function

router.post('/login', [body('username').isLength({ min: 7 }), body('password').isLength({ min: 8 })], login); // Create a new POST endpoint with the /login path, the validations array, and the login function

router.get('/login/google', passport.authenticate('google', {
    scope: ["email", "profile"],
    prompt: 'select_account'
  })); // POST endpoint with the /login path, the validations array, and the login function

router.get('/google/callback', passport.authenticate('google', { failureRedirect: "https://u-shorten-tan.vercel.app/login", session: false }), googleLogin)
module.exports = router; // Export the router