const User = require('../models/user.model'); // Import the User model
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

async function googleLogin (req, res) {
    const {email, name } = req.user;

    try{
       const user = await User.findOne({ email });

      if(!user){
        const newUser = new User({ email, username: name, password: '' });
        await newUser.save();
      }
      
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

      return res.redirect(`https://u-shorten-tan.vercel.app/auth/google/${token}/${user._id}`);
    }
    catch (error) {
      console.log(error);
      return res.redirect('http://localhost:5173/');
    }
}

module.exports = googleLogin; // Export the login function