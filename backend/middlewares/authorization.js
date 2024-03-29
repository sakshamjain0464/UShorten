const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const authorization = async (req, res, next) => {
    const token = req.header('Authorization');
    
    if (!token) {
        return res.status(401).json({ message: 'Authorization denied' });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select('-password');
        
        if (!user) {
            return res.status(401).json({ message: 'Authorization denied' });
        }
        
        req.user = user;

        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authorization;