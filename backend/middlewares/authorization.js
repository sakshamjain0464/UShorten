const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const authorization = async (req, res, next) => {
    const token = req.header('Authorization');
    
    console.log(token)

    if (!token) {
        return res.status(401).json({ message: 'Authorization denied' });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select('-password');
        
        console.log(user)

        if (!user) {
            return res.status(401).json({ message: 'Authorization denied' });
        }
        
        req.user = user;

        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authorization;