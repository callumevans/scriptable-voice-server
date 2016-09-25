'use strict';

var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
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
    return await (fs.readdirAsync(
        `${global.appRoot}/plugins`
    ));
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

var getFunctionForCommand = async ((cmd) => {
    var pluginMap = await (getPluginMap());

    for (var plugin in pluginMap) {
        for (var command in pluginMap[plugin]['commands']) {
            var expression = pluginMap[plugin]['commands'][command];

            //
            if (expression == cmd) {

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