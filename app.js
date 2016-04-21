var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var dbUrl = 'mongodb://localhost/express-practice';
var mongoose = require('mongoose'); // mongo db connection
var session = require('express-session');
var MongoStore = require('connect-mongo')(session); // session store in mongodb

// 動態 models 載入
var models_path = __dirname + '/app/models'
var walk = function (path) {
    fs
        .readdirSync(path)
        .forEach(function (file) {
            var newPath = path + '/' + file;
            var stat = fs.statSync(newPath);

            if (stat.isFile()) {
                if (/(.*)\.(js|coffee)/.test(file)) {
                    require(newPath);
                }
            }
            else if (stat.isDirectory()) {
                walk(newPath);
            }
        })
};
walk(models_path);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

// session 保存
var COOKIE_LENGTH = 1000*60*60*24*365*10; // cookie 保留時間 (10年)
app.use(session({
    secret: 'foo',
    cookie:{
        expires: new Date(Date.now() + COOKIE_LENGTH),
        maxAge: COOKIE_LENGTH
    },
    store: new MongoStore({
        url: dbUrl,
        collection: 'sessions'
    }),
    resave: true,
    saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'public')));

// routes
require('./app/routes')(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// mongodb connect
mongoose.connect(dbUrl);

module.exports = app;
