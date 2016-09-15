'use strict';

var exports = module.exports = { };

var fs = require('fs');
var file = 'svs.db';

var exists = fs.existsSync(file);

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(file);

if (!exists) {
    console.log('Creating database...');
    fs.openSync(file, 'w');

    db.serialize(() => {
        db.run('CREATE TABLE Stuff (thing TEXT)');
    });

    db.close();
}

exports.getDatabase = function () {
    return 'Hello!';
}