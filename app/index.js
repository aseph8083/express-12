if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const cors = require('cors');

const app = express();

app.use(logger('dev'));
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true }
}));
app.use(cors());

// Routing
const onlineCourse = require('./online-course/routes');

app.use('/api/online-course', onlineCourse);

// routing for chek web service status
app.get('/status', function(req, res, next) {
  res.send({
    status: 'RUNNING',
  });
});

module.exports = app;
