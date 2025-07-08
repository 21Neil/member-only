import { changeUserAdmin, changeUserStatus } from '../db/queries.js';
import { body, validationResult } from 'express-validator';

const validateJoinClub = [
  body('inviteCode')
    .trim()
    .escape(),
];

const getJoinClubView = (req, res) => {
  res.render('joinClub');
};

const postJoinClub = [
  validateJoinClub,
  async (req, res, next) => {
    const errors = validationResult(req).errors;
    const { inviteCode } = req.body;

    if (!req.user) {
      return res.redirect('/login')
    }

    const { id } = req.user;

    if (errors.length !== 0) {
      return res.render('joinClub', {
        errors,
      });
    }


    if (inviteCode === process.env.INVITE_CODE) {
      try {
        await changeUserStatus(id, 'member');
        res.redirect('/');
      } catch (err) {
        next(err);
      }
    } else if (inviteCode === process.env.ADMIN_CODE) {
      try {
        await changeUserStatus(id, 'member');
        await changeUserAdmin(id);
        res.redirect('/');
      } catch (err) {
        next(err);
      }
    } else {
      res.render('joinClub', {
        errors: [{ msg: 'Wrong invite code' }],
      });
    }
  },
];

export { getJoinClubView, postJoinClub };
