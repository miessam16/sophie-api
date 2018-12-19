const {body} = require('express-validator/check');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.validateSignUp = () => {
    return [
        body('email', 'Email should be an email').isEmail(),
        body('email', 'Email should be exists').exists(),
        body('email', 'Email should be unique').custom(async (email) => {
            return await User.isEmailUnique(email);
        }),
        body('password', 'Password should be at least 8 characters').isLength({min: 8}),
        body('password', 'Password should exists').exists(),
        body('name', 'Name should exists').exists(),
        body('name', 'Name be at least 3 characters').isLength({min: 3})
    ];
};

module.exports.signUp = async (req, res) => {

    const validationErrors = await req.getValidationResult();

    if(!validationErrors.isEmpty()) {
        return res.status(403).json(validationErrors.mapped());
    }

    const user = await User.create({
        email: req.body.email,
        name: req.body.name,
        password: bcrypt.hashSync(req.body.password, 10)
    });

    const token = createJWT(user);

    res.status(200).json({token});
};

const createJWT = (user) => {
    return jwt.sign(
        {
            userId: user._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: 3600,
            algorithm: 'HS256'
        }
    );
};
