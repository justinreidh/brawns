const { body } = require('express-validator');

const registerValidation = [
  body('username')
    .trim()
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters')
    .isAlphanumeric().withMessage('Username must contain only letters and numbers'),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

const loginValidation = [
  body('username')
    .trim()
    .notEmpty().withMessage('Username is required'),
  body('password')
    .notEmpty().withMessage('Password is required'),
];

module.exports = {
  registerValidation,
  loginValidation
};