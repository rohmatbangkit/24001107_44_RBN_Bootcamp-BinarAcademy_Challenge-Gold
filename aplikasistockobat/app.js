const express = require('express');
const path = require('path');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const favicon = require('serve-favicon');

const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');
const drugsRouter = require('./routes/drugs');

const app = express();

// Path to the favicon
app.use(favicon(path.join(__dirname, 'public', 'images', 'Favicon.ico')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Patch to the Fetch API
app.use(express.static(path.join(__dirname, 'Fetch_API')));

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/drugs', drugsRouter);

// Route to render drugmanage.ejs
app.get('/drugmanage', (req, res) => {
  res.render('drugmanage');
});

// Handle 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
