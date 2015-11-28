'use strict';

/////////////////////////////////////
/*             MODULES             */
/////////////////////////////////////

var dbManager = require('../lib/dbManager');

/////////////////////////////////////
/*           MIDDLEWARES           */
/////////////////////////////////////

module.exports = function (req, res, next) {
  /*jshint unused:false*/

  var hashname = req.url.substring(1);

  dbManager.get(hashname, function(err, result) {
    var vars = {};
    if (req.session.user) {
      vars.user = req.session.user.username;
    }
    if (err) {
      console.log(err);
      vars.err = err;
    } else if (result.length === 0) {
      vars.err = new Error('No such file exists!');
    } else {
      // Found
      vars.buffer = new Buffer(result[0].data)
        .toString('base64');
      vars.ext = result[0].ext;

      // Grab all comments
      dbManager.load(hashname, function (err, result) {
        if (err) {
          console.log(err);
          vars.err = err;
        } else {
          vars.comments = result;
        }

        // Finally load page
        res.render('file', {
          cssSrc: '/stylesheets/file.css',
          jsSrc: '/javascripts/file.js',
          vars: vars
        });
      });
    }
  });
}