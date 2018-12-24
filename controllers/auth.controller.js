const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.signUp = async (req, res) => {
    const user = await User.create({
        email: req.body.email,
        name: req.body.name,
        password: await bcrypt.hash(req.body.password, 10)
    });

    const token = createJWT(user);

    res.status(200).json({token});
};

module.exports.login = async (req, res) => {
    const user = await User.findOne({email: req.body.email});

    if(user) {
        res.status(401, {error: 'invalid email'});
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

    if (!isPasswordValid) {
        res.status(401, {error: "invalid password"})
    }

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
