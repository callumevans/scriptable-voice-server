'use strict';

var optionalParam = /\s*\((.*?)\)\s*/g;
var optionalRegex = /(\(\?:[^)]+\))\?/g;
var namedParam    = /(\(\?)?:\w+/g;
var splatParam    = /\*\w+/g;
var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#]/g;

var commandToRegEx = function(command) {
    command = command.replace(escapeRegExp, '\\$&')
        .replace(optionalParam, '(?:$1)?')
        .replace(namedParam, function(match, optional) {
            return optional ? match : '([^\\s]+)';
        })
        .replace(splatParam, '(.*?)')
        .replace(optionalRegex, '\\s*$1?\\s*');
    return '^' + command + '$';
};

// Exports

var exports = module.exports = { };

exports.commandToRegEx = commandToRegEx;