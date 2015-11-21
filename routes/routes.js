'use strict';

/////////////////////////////////////
/*             MODULES             */
/////////////////////////////////////

var express = require('express');
var router = express.Router();
var multer  = require('multer');

var dbManager = require('../lib/dbManager');

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
/*           MIDDLEWARES           */
/////////////////////////////////////

var userManager = require('../middleware/userManager');

var loginHandler = userManager.loginHandler;
var registerHandler = userManager.registerHandler;
var logout = userManager.logout;

function displayIndex(req, res, next) {
	/*jshint unused:false*/
	
	// Initialize user variables
	var vars = {};
	if (req.session.user) {
		vars.user = req.session.user.username;
	}
	if (req.session.url) {
		vars.url = req.session.url;
		req.session.url = null;
	}
	if (req.session.err) {
		vars.err = JSON.stringify(req.session.err);
		req.session.err = null;
	}

	// Display
	res.render('index', {
		cssSrc: '/stylesheets/index.css',
		vars: vars
	});
}

function uploadHandler(req, res, next) {
	/*jshint unused:false*/
	var img = req.file;
	var name = img.originalname.toLowerCase();
	var data = JSON.stringify(img.buffer);

	dbManager.store(name, data, function(err, status) {
		if (err || !status) {
			console.log(err);
			req.session.err = err;
		} else {
			// Generate link
			req.session.url = 
				req.protocol + '://' + req.get('host') +
				'/file?name=' + name;
		}
		res.redirect('/');
	});
}

function fileHandler(req, res, next) {
	/*jshint unused:false*/

	var filename = req.query.name;

	dbManager.get(filename, function(err, result) {
		var vars = {};

		if (err) {
			console.log(err);
			vars.err = err;
		} else if (result.length === 0) {
			vars.err = new Error('No such file exists!');
		} else {
			vars.buffer = new Buffer(result[0].data)
				.toString('base64');
		}
		res.render('file', {
			cssSrc: '/stylesheets/file.css',
			vars: vars
		});
	});
}

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

/* GET File. */
router.get('/file', fileHandler);

module.exports = router;
