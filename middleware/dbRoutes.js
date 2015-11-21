'use strict';

/////////////////////////////////////
/*             MODULES             */
/////////////////////////////////////

var dbManager = require('../lib/dbManager');

/////////////////////////////////////
/*           MIDDLEWARES           */
/////////////////////////////////////

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

module.exports = {
	uploadHandler: uploadHandler,
	fileHandler: fileHandler
};