'use strict';

var pg = require('pg');

var DATABASE = process.env.DATABASE_URL;

module.exports.store = function (name, data, cb) {
	pg.connect(DATABASE, function (error, client, done) {
		if (error) {
			return cb(error);
		}

		var values = [name, data, new Date()];
		var query = 'INSERT INTO imgs (name, data, date) ' +
			'VALUES($1, $2, $3)';
		client.query(query, values, function (err, result) {
			/*jshint unused:false*/
			done();
			
			if (err) {
				return cb(err);
			} else {
				// console.log(result);
				return cb(null, true);
			}
		});
	});
};

module.exports.get = function (name, cb) {
	pg.connect(DATABASE, function (error, client, done) {
		if (error) {
			return cb(error);
		}

		var values = [name];
		var query = 'SELECT data FROM imgs WHERE name = $1';
		client.query(query, values, function (err, result) {
			done();

			if (err) {
				return cb(err);
			} else {
				return cb(null, result.rows);
			}
		});
	});
};