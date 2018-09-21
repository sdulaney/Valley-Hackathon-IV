var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/contact', require('./routes/contact'));

var adminRoute = require('./routes/admin');

app.use('/admin', adminRoute);
app.use('/login', require('./routes/admin_login'));
app.use('/register', require('./routes/admin_register'));
app.use('/forgot', require('./routes/admin_forgot'));

app.use('/mappost', require('./routes/mappost'));

app.post("/api/contact", function(req, res) {
	adminRoute.addContact(req.body);
	res.redirect("/contact");
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.post("/api/mappost", function(req, res) {

});

app.post("/api/alertpost", function(req, res) {

});

module.exports = app;
