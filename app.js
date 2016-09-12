"use strict";

let express = require("express");
let logger = require("morgan");

let app = express();

// Error logger
app.use(logger("dev"));

if (app.get("env") === "development") {
    app.use(function (error, request, response, next) {
        response.status(error.status || 500);
        response.render("error", {
            message: error.message,
            error: error
        });
    });
}

app.use((error, request, response, next) => {
    response.status(error.status || 500);
    response.render("error", {
        message: error.message,
        error: { }
    });
});

// 404 Handler
app.use((request, response, next) => {
    let error = new Error("Not Found");
    error.status = 404;

    next(error);
});

module.exports = app;