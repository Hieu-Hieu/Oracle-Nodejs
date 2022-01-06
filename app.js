
import createError from 'http-errors';
import express from 'express';
import path, { dirname } from 'path';
import cookieParser from 'cookie-parser';
// var logger = require('morgan');
import morgan from 'morgan';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// var indexRouter = require('./routes/index');
import { api } from './routes/index.js';
// var usersRouter = require('./routes/users');
import { users } from './routes/users.js'

var app = express();

// setup morgan
app.use(morgan("tiny"));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', api);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, () => console.log("nodeOracleRestApi app listening on port %s!", 3000))

// export default app;
