'use strict';

var express = require('express');
var plugins = require('~/services/plugins.js');
var async = require('asyncawait/async');
var await = require('asyncawait/await');

var router = express.Router();

var commandParser = require('~/services/command-parser');

router.get('/', async ((req, res) => {
    var resp = commandParser.commandToRegEx('Hello :world');
    res.send(resp);
}));

module.exports = router;