import { changeUserStatus } from '../db/queries.js';
import { body, validationResult } from 'express-validator';

const validateJoinClub = [
  body('inviteCode')
    .custom(value => value === process.env.INVITE_CODE)
    .withMessage('Wrong invite code'),
];

const getJoinClubView = (req, res) => {
  res.render('joinClub', {
    title: 'Join The Club',
  });
};

const postJoinClub = [
  validateJoinClub,
  async (req, res) => {
    const errors = validationResult(req).errors;

    if (errors.length !== 0) {
      res.render('joinClub', {
        title: 'Join The Club',
        errors,
      });
    }

    await changeUserStatus(id, 'member');
  },
];

export { getJoinClubView, postJoinClub };
