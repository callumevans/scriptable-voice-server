'use strict';

var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var commandParser = require('~/services/command-parser');
var async = require('asyncawait/async');
var await = require('asyncawait/await');

// Internal variables

var pluginMap = null;

// Functions

var getPluginJson = async ((plugin) => {
    var data = await(fs.readFileAsync(
        `${global.appRoot}/plugins/${plugin}/plugin.json`, 'utf-8'));

    return JSON.parse(data);
});

var getPluginDirectories = async (() => {
    var directories = await (fs.readdirAsync(
        `${global.appRoot}/plugins`
    ));

    return directories;
});

var refreshPlugins = async (() => {
    var plugins = await (getPluginDirectories());

    var map = { };

    // Load all plugin info
    plugins.forEach((x) => {
        map[x] = await (getPluginJson(x));
    });

    pluginMap = map;
});

var getPluginMap = async (() => {
    if (pluginMap === null) {
        await (refreshPlugins());
    }

    return pluginMap;
});

var getPluginFunctionFile = function(plugin) {
    return `${global.appRoot}/plugins/${plugin}/functions`;
};

var getFunctionForCommand = async ((inputCommand) => {
    var pluginMap = await (getPluginMap());

    for (var plugin in pluginMap) {
        for (var command in pluginMap[plugin]['commands']) {

            var pluginCommand = pluginMap[plugin]['commands'][command];
            var match = commandParser.isCommandMatch(pluginCommand, inputCommand);

            // If we have found a matching command then import the plugin's function file
            // and execute the found function
            if (match !== null) {
                var pluginFunctions = require(getPluginFunctionFile(plugin));
                var response = await (pluginFunctions[command].apply(this, match));

                return response;
            }
        }
    }
});

// Exports
var exports = module.exports = { };

exports.getPluginDirectories = getPluginDirectories;
exports.getPluginMap = getPluginMap;
exports.getFunctionForCommand = getFunctionForCommand;
exports.refreshPlugins = refreshPlugins;