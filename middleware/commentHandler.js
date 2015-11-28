'use strict';

/////////////////////////////////////
/*             MODULES             */
/////////////////////////////////////

var dbManager = require('../lib/dbManager');
var xss = require('xss');

/////////////////////////////////////
/*           MIDDLEWARES           */
/////////////////////////////////////

module.exports = function (req, res, next) {
	/*jshint unused:false*/
	
	var user = req.session.user.username;
	var text = xss(req.body.comment);
	var hashname = xss(req.body.lastUrl).substring(1);

	dbManager.save(user, text, hashname, function (err) {
		if (err) {
			console.log(err);
		}
		res.redirect(xss(req.body.lastUrl));
	});
}