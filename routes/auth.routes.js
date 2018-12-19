const router = require('express').Router();
const authController = require('../controllers/auth.controller');

router.post('/sign-up', authController.validateSignUp(), authController.signUp);


module.exports = router;