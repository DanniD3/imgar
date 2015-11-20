'use strict';

var express = require('express');
var router = express.Router();
var xss = require('xss');
var multer  = require('multer');

var upload = multer({ 
	fileFilter: function (req, file, cb) {
		// The function should call `cb` with a boolean
		// to indicate if the file should be accepted

		// To reject this file pass `false`, like so:
		// cb(null, false)

		// To accept the file pass `true`, like so:
		// cb(null, true)

		// You can always pass an error if something 
		// goes wrong:
		// cb(new Error('I don\'t have a clue!'))

		if (['jpg', 'jpeg', 'png'].indexOf(
				file.originalname.split('.')
				.pop().toLowerCase()
				) !== -1
			) {
			cb(null, true);
		}
		// Don't accept any other formats
		cb(null, false);
	},
	// storage: multer.diskStorage({
	// 	destination: function (req, file, cb) {
	// 		cb(null, './uploads');
	// 	},
	// 	filename: function (req, file, cb) {
	// 		cb(null, file.originalname);
	// 	}
	// })
	storage: multer.memoryStorage()
});

// var dbManager = require('../lib/dbManager');
var users = require('../lib/users');

/* GET Login. */
router.get('/', function(req, res, next) {
	/*jshint unused:false*/
	res.render('index', {
		title: 'IMGAR VEF2015',
		cssSrc: '/stylesheets/index.css'
	});
});
/* POST Login. */
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

/* GET Upload */
router.get('/upload', function(req, res, next) {
	/*jshint unused:false*/
	res.render('upload', {
		cssSrc: '/stylesheets/upload.css'
	});
});
/* POST Upload */
router.post('/upload', upload.single('img'), 
	function(req, res, next) {
	/*jshint unused:false*/
	/*jshint forin: false */

	var img = req.file;

	console.log(img);
	console.log(img.buffer.length);

	res.render('upload', {
		cssSrc: '/stylesheets/upload.css',
		img: img.path,
		buffer: img.buffer.toString('base64')
	});
});

module.exports = router;
