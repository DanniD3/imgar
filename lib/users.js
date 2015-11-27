'use strict';

var hash = require('../lib/hash');
var pg = require('pg');

var DATABASE = process.env.DATABASE_URL;

function createUserWithHashAndSalt (username, salt, hash, cb) {
  pg.connect(DATABASE, function (error, client, done) {
    if (error) {
      return cb(error);
    }

    var values = [username, salt, hash, new Date()];
    var query = 
      'INSERT into users (username, salt, hash, date) ' +
      'VALUES($1, $2, $3, $4)';
    client.query(query, values, function (err, result) {
      done();
      
      if (err) {
        console.error(err);
        return cb(error);
      } else {
        console.log(result);
        return cb(null, true);
      }
    });
  });
}

function findUser (username, cb) {
  pg.connect(DATABASE, function (error, client, done) {
    if (error) {
      return cb(error);
    }

    var values = [username];
    var query = 'SELECT username, salt, hash FROM users WHERE username = $1';
    client.query(query, values, function (err, result) {
      done();

      if (err) {
        return cb(error);
      } else {
        return cb(null, result.rows);
      }
    });
  });
}

module.exports.createUser = function createUser (username, password, cb) {
  hash(128, password, function (err, salt, hash) {
    if (err) {
      return cb(err);
    }

    createUserWithHashAndSalt(username, salt, hash, cb);
  });
};

module.exports.listUsers = function listUsers (cb) {
  pg.connect(DATABASE, function (error, client, done) {
    if (error) {
      return cb(error);
    }

    var query = 'SELECT username FROM users LIMIT 20';
    client.query(query, function (err, result) {
      done();

      if (err) {
        return cb(error);
      } else {
        return cb(null, result.rows);
      }
    });
  });
};

module.exports.auth = function auth (name, pass, cb) {
  findUser(name, function (err, result) {
    if (err) {
      return cb(err);
    }

    if (!result) {
      return cb(new Error('Nonexisting Tables'));
    }

    var user;

    if (result.length === 1) {
      user = result[0];
    }

    if (!user) {
      return cb(new Error('cannot find user'));
    }

    hash(pass, user.salt, function(err, hash){
      if (err) {
        return cb(err);
      }
      
      if (hash === user.hash) {
        return cb(null, user);
      }

      cb(new Error('invalid password'));
    });
  });
};