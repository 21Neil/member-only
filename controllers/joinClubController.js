import { changeUserStatus } from '../db/queries.js';
import { body, validationResult } from 'express-validator';

const validateJoinClub = [
  body('inviteCode')
    .trim()
    .custom(value => value === process.env.INVITE_CODE)
    .withMessage('Wrong invite code')
    .escape(),
];

const getJoinClubView = (req, res) => {
  res.render('joinClub');
};

const postJoinClub = [
  validateJoinClub,
  async (req, res, next) => {
    const errors = validationResult(req).errors;

    if (errors.length !== 0) {
      res.render('joinClub', {
        errors,
      });
    }

    try {
      await changeUserStatus(req.user.id, 'member');
      res.redirect('/')
    } catch (err) {
      next(err)
    }
  },
];

export { getJoinClubView, postJoinClub };
