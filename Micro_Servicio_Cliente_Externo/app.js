var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
/* */
var loginRouter = require('./routes/getLogin');
var menuRouter = require('./routes/menu');
var getNacimientoRouter=require('./routes/getNacimiento');
var getMatrimonioRouter=require('./routes/getMatrimonio');
var getDefuncionRouter=require('./routes/getDefuncion');
var getDivorcioRouter=require('./routes/getDivorcio');
var getDPIRouter=require('./routes/getDPI');
var getLicencia=require('./routes/getLicencia');

//*** */
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/menu',menuRouter);
app.use('/getLogin',loginRouter);
app.use('/getNacimiento',getNacimientoRouter);
app.use('/getMatrimonio',getMatrimonioRouter);
app.use('/getDefuncion',getDefuncionRouter);
app.use('/getDivorcio',getDivorcioRouter);
app.use('/getDPI',getDPIRouter);
app.use('/getLicencia',getLicencia);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
app.get('/descargar/:id',function(req,res)
{
    res.download(__dirname+'/routes'+req.params.id,
        req.params.id,function(err)
        {
          if(err)
          {
            console.log(err);
          }
        });
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

module.exports = app;
