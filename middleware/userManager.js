'use strict';

/////////////////////////////////////
/*             MODULES             */
/////////////////////////////////////

var xss = require('xss');
var users = require('../lib/users');

/////////////////////////////////////
/*           MIDDLEWARES           */
/////////////////////////////////////

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

module.exports = {
	loginHandler: loginHandler,
	registerHandler: registerHandler,
	logout: logout
};
