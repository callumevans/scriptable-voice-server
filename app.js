'use strict';

var express = require('express');
var logger = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

// Global path
global.appRoot = path.resolve(__dirname);

// Body parser
app.use(bodyParser.urlencoded({
    extended: true
}));

// Routes
var commands = require('./routes/commands');

app.use('/commands', commands);

// 404 Handler
app.use((req, res, next) => {
    var error = new Error('Not Found');
    error.status = 404;

    next(error);
});

// Error logger
app.use(logger('dev'));

// If dev then print full stack trace on error
var isDev = app.get('env') === 'development';

app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: isDev ? err : null
    });
});

module.exports = app;