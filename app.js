var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var lessMiddleware = require('less-middleware');
var logger = require('morgan');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const serverJWT_Secret = 'kpTxN=)7mX3W3SEJ58Ubt8-';

var indexRouter = require('./routes/index');
var custRouter = require('./routes/customer');
var acctRouter = require('./routes/account');
var tranRouter = require('./routes/transaction');

const mongoose = require('mongoose');
//Set up default mongoose connection
const mongoDB = 'mongodb://localhost:27017/singlyBankDB';

mongoose.connect(mongoDB);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;



//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


var app = express();

/**
 * Setting up CORS, such that it can work together with an Application at another domain / port
 */
app.use(cors());

// setting header
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "OPTIONS, HEAD, GET, POST, PUT, DELETE");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));


//Routes
app.use('/login', indexRouter);

const jwtMiddleWare = function(req,res,next){
  /**
   * In JWT it is convention that the token is provided to the server in the authorization header including a prefix,
   * separated by a space. The authorization header could be:
   * 'Token eyJhbGciOiJIUzI1NiIsInR...' or 'Bearer eyJhbGciOiJIUzI1NiIsInR...' or something like this.
   */
  const authString = req.headers['authorization'];
  if(typeof authString === 'string' && authString.indexOf(' ') > -1) {
    const authArray = authString.split(' ');
    const token = authArray[1];
    jwt.verify(token, serverJWT_Secret, (err, decoded) => {
      if(err) {
        res.sendStatus(403);
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.sendStatus(403);
  }
};

app.use(jwtMiddleWare);

app.use('/cust', custRouter);
app.use('/acct', acctRouter);
app.use('/tran', tranRouter);

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

module.exports = app;
