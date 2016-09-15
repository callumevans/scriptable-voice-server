"use strict";

let express = require("express");
let router = express.Router();

router.get("/", (request, response) => {
   response.json({"test":"value"});
});

function test() {
   return 123;
}

module.exports = router;