'use strict';
var express = require('express');
var router = express.Router();
var dbManager = require('../lib/dbManager');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'IMGAR VEF2015' });
});

module.exports = router;
