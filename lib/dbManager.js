'use strict';

var hash = require('../lib/hash');
var pg = require('pg');

var DATABASE = process.env.DATABASE_URL;

// Store image
function store (name, data, ext, cb) {
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
}

// Get image
function get (name, cb) {
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
}

// Save comment
function save (user, text, hash, cb) {
	pg.connect(DATABASE, function (error, client, done) {
		if (error) {
			return cb(error);
		}
		
		var values = [user, text, hash, new Date()];
		var query = 'INSERT INTO cmts ' +
			'(username, text, hash, date) ' +
			'VALUES($1, $2, $3, $4)';
		client.query(query, values, function (err, result) {
			/*jshint unused:false*/
			done();
			
			if (err) {
				return cb(err);
			} else {
				return cb(null);
			}
		});
	});
}

// Load comments
function load (hash, cb) {
	pg.connect(DATABASE, function (error, client, done) {
		if (error) {
			return cb(error);
		}

		var values = [hash];
		var query = 'SELECT * FROM cmts WHERE hash = $1 ' +
			'ORDER BY date DESC LIMIT 10';
		client.query(query, values, function (err, result) {
			done();

			if (err) {
				return cb(err);
			} else {
				return cb(null, result.rows);
			}
		});
	});
}

module.exports = {
	store: store,
	get: get,
	save: save,
	load: load
};