'use strict';

var express = require('express');
var router = express.Router();
var xss = require('xss');

// var dbManager = require('../lib/dbManager');
var users = require('../lib/users');

/* GET home page. */
router.get('/', function(req, res, next) {
	/*jshint unused:false*/
	res.render('index', {
		title: 'IMGAR VEF2015',
		cssSrc: '/stylesheets/index.css'
	});
});

router.post('/', function(req, res, next) {
	/*jshint unused:false*/

	var user = xss(req.body.user);
	var pwd = xss(req.body.pwd);

	users.auth(user, pwd, function(err) {
		if (err) {
			console.log(err);
		}

		res.render('index', {
			title: 'IMGAR VEF2015',
			cssSrc: '/stylesheets/index.css',
			user: user,
			pwd: pwd,
			err: err
		});
	});
});

/* Upload */
router.get('/upload', function(req, res, next) {
	/*jshint unused:false*/
	res.render('upload', {
		cssSrc: '/stylesheets/upload.css'
	});
});

router.post('/upload', function(req, res, next) {
	/*jshint unused:false*/
	/*jshint forin: false */

	var img = xss(req.body.img);

	var reqstuff = [];
	for (var att in req) {
		reqstuff.push(att);
	}
	console.log(reqstuff.sort());
	console.log(req.body);
	console.log(req.files);
	// console.log(img.files[0], 'This is the img');

	res.render('upload', {
		cssSrc: '/stylesheets/upload.css',
		img: img
	});
});

module.exports = router;
