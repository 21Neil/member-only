import express from 'express';
import signupRouter from './routes/signupRouter.js';
import indexRouter from './routes/indexRouter.js';
import joinClubRouter from './routes/joinClubRouter.js';
import loginRouter from './routes/loginRouter.js';
import session from 'express-session';
import passport from 'passport';
import './config/passport.js';
import logoutRouter from './routes/logoutRouter.js';
import messageRouter from './routes/messageRouter.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/sign-up', signupRouter);
app.use('/join-club', joinClubRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/message', messageRouter)

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});

app.listen(PORT, console.log('http://localhost:' + PORT));
