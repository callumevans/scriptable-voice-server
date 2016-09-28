'use strict';

var express = require('express');
var plugins = require('~/services/plugins.js');
var async = require('asyncawait/async');
var await = require('asyncawait/await');

var router = express.Router();

router.post('/', async ((req, res) => {
    var command = req.body.command;

    var out = await (plugins.executeFunctionForCommand(command));

    if (out === null) {
        res.status(404);
        res.send('Command not found');

        return;
    }

    res.send(out);
}));

module.exports = router;