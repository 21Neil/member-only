import passport from 'passport';
import { Strategy } from 'passport-local';
import { getUserByID, getUserByUsername } from '../db/queries.js';
import bcrypt from 'bcryptjs';

const verify = async (username, password, done) => {
  try {
    const user = await getUserByUsername(username);
    if (!user) return done(null, false, { message: 'Incorrect username' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return done(null, false, { message: 'Incorrect password' });

    done(null, user);
  } catch (err) {
    done(err);
  }
};

const localStrategy = new Strategy(verify);

passport.use(localStrategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await getUserByID(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
