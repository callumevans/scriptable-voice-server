var async = require('asyncawait/async');
var await = require('asyncawait/await');

var testCommand = async (() => {
    var p = 3;
    var j = 2;

    console.log(p + j);
    return p + j;
});

var exports = module.exports = { };

exports.testCommand = testCommand;