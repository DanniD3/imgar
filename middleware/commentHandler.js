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

	var stuff = [];
	for (var i in req) {
		stuff.push(i);
	}
	console.log(stuff);
	console.log(req.url);
	console.log(req.baseUrl, 'base');
	console.log(req.originalUrl, 'org');
}