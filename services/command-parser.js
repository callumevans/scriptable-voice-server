'use strict';

var optionalParam = /\s*\((.*?)\)\s*/g;
var optionalRegex = /(\(\?:[^)]+\))\?/g;
var namedParam    = /(\(\?)?:\w+/g;
var splatParam    = /\*\w+/g;
var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#]/g;

// Functions

var commandToRegEx = function(command) {
    command = command.replace(escapeRegExp, '\\$&')
        .replace(optionalParam, '(?:$1)?')
        .replace(namedParam, (match, optional) => {
            return optional ? match : '([^\\s]+)';
        })
        .replace(splatParam, '(.*?)')
        .replace(optionalRegex, '\\s*$1?\\s*');
    return '^' + command + '$';
};

var isCommandMatch = function (command, input) {
    var regex = commandToRegEx(command);
    var result = input.match(regex);

    var parsedArguments = null;

    if (result !== null) {
        parsedArguments = result.slice(1);
    }

    return parsedArguments;
};

// Exports

var exports = module.exports = { };

exports.commandToRegEx = commandToRegEx;
exports.isCommandMatch = isCommandMatch;