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

/* POST Register. */
router.post('/register', registerHandler, displayIndex);

/* GET Logout. */
router.get('/logout', logout);

/* POST Upload */
router.post('/upload', upload.single('img'), 
	uploadHandler, displayIndex);

/////////////////////////////////////
/*           MIDDLEWARES           */
/////////////////////////////////////

function displayIndex(req, res, next) {
	/*jshint unused:false*/
	
	// Initialize user variables
	var vars = {};
	if (req.session.user) {
		vars.user = req.session.user.username;
		console.log(req.session.user);
	}
	if (req.session.img) {
		vars.buffer = req.session.img;
		req.session.img = null;
	}
	if (req.session.err) {
		vars.err = req.session.err;
		req.session.err = null;
	}

	// Display
	res.render('index', {
		title: 'IMGAR VEF2015',
		cssSrc: '/stylesheets/index.css',
		vars: vars
	});
}

function loginHandler(req, res, next) {
	/*jshint unused:false*/

	var usr = xss(req.body.usr);
	var pwd = xss(req.body.pwd);

	users.auth(usr, pwd, function(err, user) {
		if (err) {
			console.log(err);
			req.session.err = err;
			res.redirect('/');
		}

		if (user) {
			req.session.regenerate(function (){
				req.session.user = user;
				res.redirect('/');
			});
		}
	});
}

function registerHandler(req, res, next) {
	/*jshint unused:false*/

	var usr = xss(req.body.usr);
	var pwd = xss(req.body.pwd);

	users.createUser(usr, pwd, function(err, status) {
		if (err || !status) {
			console.log(err);
			req.session.err = err;
			res.redirect('/');
		}

		users.auth(usr, pwd, function(err, user) {
			if (err) {
				console.log(err);
				req.session.err = err;
				res.redirect('/');
			}

			if (user) {
				req.session.regenerate(function (){
					req.session.user = user;
					res.redirect('/');
				});
			}
		});
	});
}

function logout(req, res, next) {
	/*jshint unused:false*/
	req.session.destroy(function(){
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
