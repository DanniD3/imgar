'use strict';

/////////////////////////////////////
/*             MODULES             */
/////////////////////////////////////

var dbManager = require('../lib/dbManager');
var crypto = require('crypto');

/////////////////////////////////////
/*           MIDDLEWARES           */
/////////////////////////////////////

module.exports = function (req, res, next) {
	/*jshint unused:false*/
	
	var img = req.file;
	if (!img) {
		// Redirects to index if no file has been uploaded
		res.redirect('/');
	}
	var name = img.originalname.toLowerCase();
	var data = JSON.stringify(img.buffer);

	dbManager.store(name, data, function(err, hash) {
		if (err || !hash) {
			console.log(err);
			req.session.err = err;
			res.redirect('/');
		} else {
			// Generate link
			req.session.url = 
				req.protocol + '://' + req.get('host') +
				'/' + hash;
			res.redirect('/' + hash);
		}
	});
}