import { body, validationResult } from 'express-validator';
import passport from 'passport';

const alphaErr = 'must only contain letters.';
const lengthErr = 'must be between 1 and 50 characters.';

const validateLogin = [
  body('username')
    .trim()
    .isEmail()
    .withMessage('Username must be an email')
    .escape(),
  body('password')
    .isLength({ min: 5, max: 50 })
    .withMessage('Password must be between 5 and 50 characters'),
];

const getLoginView = (req, res) => {
  res.render('login');
};

const postLogin = [
  validateLogin,
  (req, res, next) => {
    const errors = validationResult(req).errors;
    if (errors.length !== 0) {
      return res.render('login', {
        errors,
        ...req.body,
      });
    }

    passport.authenticate('local', (err, user, info) => {
      if (err) {
        console.error(err);
        return res.send('Sever Error');
      }
      if (info) {
        return res.render('login', {
          errors: [{ msg: info.message }],
          ...req.body,
        });
      }
      if (!user) {
        return res.redirect('/login', {
          errors: [{ msg: 'login fail' }],
          ...req.body,
        });
      }

      req.logIn(user, err => {
        if (err) return next(err);
        return res.redirect('/');
      });
    })(req, res, next);
  },
];

export { getLoginView, postLogin };
