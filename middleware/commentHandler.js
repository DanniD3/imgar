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

	res.redirect(xss(req.body.lastUrl));
}