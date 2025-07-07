import { createUser } from '../db/queries.js';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';

const alphaErr = 'must only contain letters.';
const lengthErr = 'must be between 1 and 50 characters.';

const validateUser = [
  body('firstName')
    .trim()
    .isAlpha()
    .withMessage('First name ' + alphaErr)
    .isLength({ min: 1, max: 50 })
    .withMessage('First name ' + lengthErr)
    .escape(),
  body('lastName')
    .trim()
    .isAlpha()
    .withMessage('Last name ' + alphaErr)
    .isLength({ min: 1, max: 50 })
    .withMessage('Last name ' + lengthErr)
    .escape(),
  body('username')
    .trim()
    .isEmail()
    .withMessage('Username must be an email')
    .escape(),
  body('password')
    .isLength({ min: 5, max: 50 })
    .withMessage('Password must be between 5 and 50 characters'),
  body('confirmPassword')
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage('Password do not match.'),
];

const getSignupView = (req, res) => {
  res.render('signup');
};

const postSignup = [
  validateUser,
  async (req, res, next) => {
    const { firstName, lastName, username, password } = req.body;
    const errors = validationResult(req).errors;

    if (errors.length !== 0) {
      res.render('signup', {
        errors,
        ...req.body
      });

      return;
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
     
      await createUser(firstName, lastName, username, hashedPassword, 'guest');
    
      res.redirect('/')
    } catch (err) {
      next(err);
    }
  },
];

export { getSignupView, postSignup };
