'use strict';

/////////////////////////////////////
/*             MODULES             */
/////////////////////////////////////

var express = require('express');
var router = express.Router();
var multer  = require('multer');

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

var userRoutes = require('../middleware/userRoutes');
var dbRoutes = require('../middleware/dbRoutes');

var loginHandler = userRoutes.loginHandler;
var registerHandler = userRoutes.registerHandler;
var logout = userRoutes.logout;

var uploadHandler = dbRoutes.uploadHandler;
var fileHandler = dbRoutes.fileHandler;

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
		jsSrc: '/javascripts/index.js',
		vars: vars
	});
}

function indexRedirect(req, res, next) {
	/*jshint unused:false*/
	res.redirect('/');
}

/////////////////////////////////////
/*             ROUTES              */
/////////////////////////////////////

/* GET Index. */
router.get('/', displayIndex);

/* POST Login. */
router.post('/login', loginHandler);

/* POST Register. */
router.post('/register', registerHandler);

/* GET Logout. */
router.get('/logout', logout);

/* POST Upload */
router.post('/upload', upload.single('img'), uploadHandler);

/* GET File. */
router.get('/file', fileHandler);

module.exports = router;
