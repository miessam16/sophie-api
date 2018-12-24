const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const authValidator = require('../validators/auth.validator');
const validatorMiddleware = require('../middlewares/validator.middleware');

router.post('/sign-up', authValidator.validateSignUp(), validatorMiddleware, authController.signUp);
router.post('/login', authValidator.validateLogin(), validatorMiddleware, authController.login);

module.exports = router;
