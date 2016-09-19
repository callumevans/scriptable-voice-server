'use strict';

var express = require('express');
var router = express.Router();

var data = require('../services/data-access');

router.get('/', (req, res) => {
   res.json(data.getDatabase());
});

module.exports = router;