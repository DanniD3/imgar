'use strict';

var crypto = require('crypto');

/**
 * Iterations. ~300ms
 */

var iterations = 12000;

/**
 * Hashes a password with optional `salt`, otherwise
 * generate a salt for `pass` and invoke `cb(err, salt, hash)`.
 *
 * @param {String} password to hash
 * @param {String} optional salt
 * @param {Function} callback
 * @api public
 */

module.exports = function (len, val, salt, cb) {
  if (4 === arguments.length) {
    crypto.pbkdf2(val, salt, iterations, len, function(err, hash){
      cb(err, hash.toString('base64'));
    });
  } else {
    cb = salt;
    crypto.randomBytes(len, function(err, salt){
      if (err) {
        return cb(err);
      }
      salt = salt.toString('base64');
      crypto.pbkdf2(val, salt, iterations, len, function(err, hash){
        if (err) {
          return cb(err);
        }
        cb(null, salt, hash.toString('base64'));
      });
    });
  }
};