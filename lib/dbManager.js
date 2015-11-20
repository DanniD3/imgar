'use strict';

var pg = require('pg');

var DATABASE = process.env.DATABASE_URL;

function storeImage (img, cb) {
  pg.connect(DATABASE, function (error, client, done) {
    if (error) {
      return cb(error);
    }

    var values = [img];
    var query = 
      'INSERT INTO imgs (imgbytes) ' +
      'VALUES($1)';
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

module.exports.store = function (img, cb) {
  storeImage(img, function (err, result) {
    if (err) {
      return cb(err);
    }

    if (!result) {
      return cb(new Error('Nonexisting Tables'));
    }
  });
};