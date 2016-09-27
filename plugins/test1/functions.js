var async = require('asyncawait/async');

var testCommand = async ((name, place) => {
    return name + ' : ' + place;
});

var exports = module.exports = { };

exports.testCommand = testCommand;