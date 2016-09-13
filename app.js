"use strict";

let express = require("express");
let logger = require("morgan");

let app = express();

// Routes
let routes = require("./routes/index");

app.use("/", routes);

// 404 Handler
app.use((request, response, next) => {
    let error = new Error("Not Found");
    error.status = 404;

    next(error);
});

// Error logger
app.use(logger("dev"));

// If dev then print full stack trace on error
let isDev = app.get("env") === "development";

app.use((error, request, response) => {
    response.status(error.status || 500);
    response.render("error", {
        message: error.message,
        error: isDev ? error : null
    });
});

module.exports = app;