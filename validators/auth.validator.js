const {body} = require('express-validator/check');
const User = require('../models/user.model');

module.exports.validateSignUp = () => {
    return [
        body('email', 'Email should be an email').isEmail(),
        body('email', 'Email should be exists').exists(),
        body('email', 'Email should be unique').custom(async (email) => {
            return ! await User.isEmailExist(email);
        }),
        body('password', 'Password should be at least 8 characters').isLength({min: 8}),
        body('password', 'Password should exists').exists(),
        body('name', 'Name should exists').exists(),
        body('name', 'Name be at least 3 characters').isLength({min: 3})
    ];
};

module.exports.validateLogin = () => {
    return [
        body('email', 'Email should be exists').exists(),
        body('password', 'Password should exists').exists()
    ];
};
