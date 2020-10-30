var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/blog',{
    promiseLibrary: require('bluebird'),
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => console.log('connected successfully'))
  .catch((err) => console.error(err));

var passport = require('passport');
var auth = require('./routes/auth');
var category = require('./routes/category');
var post = require('./routes/post');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/auth', auth);
app.use('/api/category', category);
app.use('/api/post', post);
module.exports = app;
