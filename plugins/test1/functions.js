var async = require('asyncawait/async');
var await = require('asyncawait/await');

var testCommand = async ((name, place) => {
    return name + ' : ' + place;
});

var exports = module.exports = { };

exports.testCommand = testCommand;