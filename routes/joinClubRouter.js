import { Router } from 'express';
import {
  getJoinClubView,
  postJoinClub,
} from '../controllers/joinClubController.js';

const joinClubRouter = new Router();

joinClubRouter.get('/', getJoinClubView);
joinClubRouter.post('/', postJoinClub);

export default joinClubRouter;
