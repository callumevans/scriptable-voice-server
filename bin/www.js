'use strict';

// Modules

var app = require('../app');
var http = require('http');

// Set port

var port = process.env.PORT || '3000';
app.set('port', port);

// Create server

var server = http.createServer(app);
server.listen(port);

// Event listeners

server.on('listening', () => {
    console.log(`Listening on port ${port}`);
});