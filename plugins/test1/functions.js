var async = require('asyncawait/async');
var await = require('asyncawait/await');

var testCommand = async ((name) => {
    return name;
});

var exports = module.exports = { };

exports.testCommand = testCommand;