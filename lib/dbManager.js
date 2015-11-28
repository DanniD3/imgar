'use strict';

var hash = require('../lib/hash');
var pg = require('pg');

var DATABASE = process.env.DATABASE_URL;

module.exports.store = function (name, data, ext, cb) {
	hash(8, name, function (err, salt, hash) {
		if (err) {
			return cb(err);
		}
		pg.connect(DATABASE, function (error, client, done) {
			if (error) {
				return cb(error);
			}
			
			var values = [
				name, data, ext, hash, salt, new Date()
			];
			var query = 'INSERT INTO imgs ' +
				'(name, data, ext, hash, salt, date) ' +
				'VALUES($1, $2, $3, $4, $5, $6)';
			client.query(query, values, function (err, result) {
				/*jshint unused:false*/
				done();
				
				if (err) {
					return cb(err);
				} else {
					// Return the hash value
					return cb(null, hash);
				}
			});
		});
	});
};

module.exports.get = function (name, cb) {
	pg.connect(DATABASE, function (error, client, done) {
		if (error) {
			return cb(error);
		}

		var values = [name];
		var query = 'SELECT data, ext FROM imgs ' +
			'WHERE hash = $1';
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