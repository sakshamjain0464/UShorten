const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const dotenv = require("dotenv");

dotenv.config();

passport.use(
 new GoogleStrategy(
  {
   clientID: process.env.GOOGLE_CLIENT_ID,
   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
   callbackURL: "http://localhost:3000/api/users/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    const userData = {
    email: profile.emails[0].value,
    name: profile.displayName,
    token: accessToken
   };
   
   done(null, userData);
  }
 )
);