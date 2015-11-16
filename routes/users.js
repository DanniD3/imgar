'use strict';

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	/*jshint unused:false*/
	res.send('respond with a resource');
});

module.exports = router;
