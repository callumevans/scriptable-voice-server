'use strict';

var express = require('express');
var plugins = require('~/services/plugins.js');
var async = require('asyncawait/async');
var await = require('asyncawait/await');

var router = express.Router();

router.get('/', async ((req, res) => {
    var out = await (plugins.getFunctionForCommand('hello world Manchester'));
    res.send(out);
}));

module.exports = router;