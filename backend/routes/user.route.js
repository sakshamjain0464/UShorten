const express = require('express'); // Import express
const User = require('../models/user.model'); // Import the User model
const bcrypt = require('bcryptjs'); // Import bcrypt
const { body, validationResult } = require('express-validator'); // Import the express-validator functions
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const router = express.Router(); // Create a new router

const validations = [body('username').isLength({ min: 7 }), body('email').isEmail(), body('password').isLength({ min: 8 })];

router.post('/signup', validations, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({ message: 'User created successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/login', validations, async (req, res) => {
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
});

module.exports = router; // Export the router