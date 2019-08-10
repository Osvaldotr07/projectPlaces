var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var jwtMiddleware = require('express-jwt')
//Se expota la configuracion
var db = require('./config/database')
var places = require('./routes/places')
var users = require('./routes/users')
var sessions = require('./routes/sessions')
const secrets = require('./config/secrets')
var app = express();
db.connect();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  jwtMiddleware({secret: secrets.jwtSecrets})
    .unless({path: ['/sessions', '/users'], method: 'GET'})
)

//Metodos CRUD
app.use('/places', places)
app.use('/users', users)
app.use('/sessions', sessions)


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
  res.json(err);
});

module.exports = app;
