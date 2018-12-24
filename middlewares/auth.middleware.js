const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json('Unauthorized');
    }

    try {
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decodedToken.userId);
        next();
    } catch (err) {
        res.status(401).json('Unauthorized');
    }
};
