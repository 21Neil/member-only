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
  async (req, res) => {
    const errors = validationResult(req).errors;

    if (errors.length !== 0) {
      res.render('joinClub', {
        errors,
      });
    }

    await changeUserStatus(id, 'member');
  },
];

export { getJoinClubView, postJoinClub };
