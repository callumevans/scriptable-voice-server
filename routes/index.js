"use strict";

let express = require("express");
let router = express.Router();

router.get("/", (request, response) => {
   response.json({"test":"value"});
});

module.exports = router;