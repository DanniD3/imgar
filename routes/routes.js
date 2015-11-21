'use strict';

/////////////////////////////////////
/*             MODULES             */
/////////////////////////////////////

var express = require('express');
var router = express.Router();
var xss = require('xss');
var multer  = require('multer');

// var dbManager = require('../lib/dbManager');
var users = require('../lib/users');

/////////////////////////////////////
/*        UPLOAD & STORAGE         */
/////////////////////////////////////

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


/////////////////////////////////////
/*             ROUTES              */
/////////////////////////////////////

/* GET Index. */
router.get('/', displayIndex);

/* POST Login. */
router.post('/login', loginHandler, displayIndex);

/* POST Upload */
router.post('/upload', upload.single('img'), 
	uploadHandler, displayIndex);

/////////////////////////////////////
/*           MIDDLEWARES           */
/////////////////////////////////////

function displayIndex(req, res, next) {
	/*jshint unused:false*/
	
	// Initialize user variables
	console.log(req.session);
	var vars = {};
	if (req.session.user) {
		vars.user = req.session.user;
	}
	if (req.session.img) {
		// var img = req.session.img;
		// vars.img = img.path;
		// vars.buffer = img.buffer.toString('base64');
		vars.buffer = req.session.img;
	}
	if (req.session.err) {
		vars.err = req.session.err;
	}
	console.log(vars);
	// Display
	res.render('index', {
		title: 'IMGAR VEF2015',
		cssSrc: '/stylesheets/index.css',
		vars: vars
	});
}

function loginHandler(req, res, next) {
	/*jshint unused:false*/

	var username = xss(req.body.user);
	var pwd = xss(req.body.pwd);

	users.auth(username, pwd, function(err, user) {
		if (err) {
			console.log(err);
			req.session.err = err;
		}

		if (user) {
			req.session.regenerate(function (){
				req.session.user = user;
			});
		}
		req.session.user = username;
		res.redirect('/');
	});
}

function uploadHandler(req, res, next) {
	/*jshint unused:false*/

	var img = req.file;
	var imgData = img.buffer.toString('base64');

	console.log(img);
	req.session.img = imgData;
	res.redirect('/');
}

module.exports = router;
