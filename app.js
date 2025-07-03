import express from 'express'
import signupRouter from './routes/signupRouter.js';
import indexRouter from './routes/indexRouter.js';
import joinClubRouter from './routes/joinClubRouter.js';

const app = express();
const PORT = process.env.PORT || 3000

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true}))

app.use('/', indexRouter)
app.use('/sign-up', signupRouter)
app.use('/join-club', joinClubRouter)

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message)
})

app.listen(PORT, console.log('http://localhost:' + PORT))
