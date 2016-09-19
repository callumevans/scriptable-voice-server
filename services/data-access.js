'use strict';

var exports = module.exports;

var fs = require('fs');
var file = 'svs.db';

var exists = fs.existsSync(file);

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(file);

if (!exists) {
    console.log('Creating database...');

    var data = fs.readFileSync(global.appRoot + '/database/create.sql', 'utf8');

    fs.openSync(file, 'w');

    db.serialize(() => {
        db.run(data);
        console.log('Database created!');
    });
}

exports.getDatabase = function () {
    return db;
};