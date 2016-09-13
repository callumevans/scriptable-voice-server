"use strict";

// Modules

let app = require("../app");
let http = require("http");

// Set port

let port = process.env.PORT || "3000";
app.set("port", port);

// Create server

let server = http.createServer(app);
server.listen(port);

// Event listeners

server.on("listening", onListening);

function onListening() {
    console.log(`Listening on port ${port}`);
}