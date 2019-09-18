import winston from 'winston';

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const expressWinston = require('express-winston');

import authCheck from './src/security/jwtAuthentication';
import * as Sentry from '@sentry/node';
import {mongoConnect} from './src/configs/mongoDB';
import {stream} from './src/configs/winston';
// Error tracking
Sentry.init({dsn: 'https://566bd809b9a0464e8e690a199ab83396@sentry.io/1553162'});

// DB Config
mongoConnect();

// MiddleWares
app.use(cors());
app.use(morgan('combined', { stream }));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());

// Api
import indexRouter from './index';
import authRouter from './src/router/auth/authentiController';
import userRouter from './src/router/user/userController';
import subsTmplRouter from './src/router/subscriptionTemplate/subsTmplController';

// log the whole request and response body
expressWinston.requestWhitelist.push('body');
expressWinston.responseWhitelist.push('body');
app.use(expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename: 'response.log',
      dirname: './src/logs',
      level: 'info',
    }),
    new winston.transports.Console(),
    new winston.transports.File({
      filename: 'warn.log',
      dirname: './src/logs',
      level: 'warn',
    }),
    new winston.transports.File({
      filename: 'err.log',
      dirname: './src/logs',
      level: 'error',
    }),
  ],
  colorize: false,
  expressFormat: true,
  statusLevels: false,
  level: (req, res) => {
    let level;
    if (res.statusCode >= 100) { level = 'info'; }
    if (res.statusCode >= 400) { level = 'error'; }
    if (res.statusCode >= 500) { level = 'error'; }
    return level;
  },
}));


app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use(authCheck);
app.use('/users', userRouter);
app.use('/subs-tmpl', subsTmplRouter);

// error logger
app.use(expressWinston.errorLogger({
  // showstack: true,
  transports: [
    new winston.transports.File({
      filename: 'error.log',
      dirname: './src/logs',
      level: 'error',
    }),
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
}));

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.end(res.sentry + '\n');
});

export default app;
