"use strict";

let express = require("express");
let logger = require("morgan");

let app = express();

// 404 Handler
app.use((request, response, next) => {
    let error = new Error("Not Found");
    error.status = 404;

    next(error);
});

// Error logger
app.use(logger("dev"));

if (app.get("env") === "development") {
    app.use((error, request, response) => {
        response.status(error.status || 500);
        response.render("error", {
            message: error.message,
            error: error
        });
    });
} else {
    app.use((error, request, response) => {
        response.status(error.status || 500);
        response.render("error", {
            message: error.message,
            error: null
        });
    });
}

module.exports = app;