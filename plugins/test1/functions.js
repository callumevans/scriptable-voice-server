var async = require('asyncawait/async');
var builder = require('xmlbuilder');

var testCommand = async ((name) => {
    var xml = builder.create('Response')
        .ele('Say', { }, `Hello ${name}`)
        .end();

    return xml;
});

var exports = module.exports = { };

exports.testCommand = testCommand;