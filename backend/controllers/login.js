const User = require('../models/user.model'); // Import the User model
const bcrypt = require('bcryptjs'); // Import bcrypt
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const { validationResult } = require('express-validator'); // Import the validationResult function from express-validator

dotenv.config()

const login = async (req, res) => {
    console.log('login')
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {username, password } = req.body;

    try{
        const user = await User.findOne({ username });

        if(!user){
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

        res.status(200).json({ message: 'Login successful' , token, userId: user._id});
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = login; // Export the login function