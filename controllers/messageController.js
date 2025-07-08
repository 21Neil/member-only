import { createMessage, deleteMessage } from '../db/queries.js';
import { body, validationResult } from 'express-validator';

const validateMessage = [
  body('title').trim().escape().isLength({ min: 1, max: 50 }),
  body('text').trim().escape(),
];

const getMessageView = (req, res) => {
  res.render('message');
};

const postNewMessage = [
  validateMessage,
  async (req, res, next) => {
    const { title, text } = req.body;
    const time = new Date();
    const errors = validationResult(req).errors;

    if (!req.user) {
      res.redirect('/login');
    }

    if (errors.length !== 0) {
      res.render('message', {
        errors,
      });
    }

    try {
      await createMessage(title, time, text, req.user.id);
      res.redirect('/');
    } catch (err) {
      next(err);
    }
  },
];

const getDeleteMessage = async (req, res, next) => {
  const { id } = req.params;

  try {
    await deleteMessage(id);

    return res.redirect('/');
  } catch (err) {
    next(err);
  }
};

export { getMessageView, postNewMessage, getDeleteMessage };
