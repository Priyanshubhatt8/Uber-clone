const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklistTokenModel = require('../models/blacklisttoken.model');


module.exports.authenticate = async (req, res, next) => {
    const token = req.cookies.token || req?.headers?.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Authentication token is missing' });
    }
    const blacklistToken = await blacklistTokenModel.findOne({ token });
    if (blacklistToken) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        
        if (!user) {
            return res.status(401).json({ message: 'Invalid authentication token' });
        }
        
        req.user = user; // Attach user to request object
        return next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid authentication token' });
    }



}