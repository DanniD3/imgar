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
      vars.buffer = new Buffer(result[0].data)
        .toString('base64');
      vars.ext = result[0].ext;
    }
    // HERE NEED TO GRAB ALL COMMENTS
    res.render('file', {
      cssSrc: '/stylesheets/file.css',
      jsSrc: '/javascripts/file.js',
      vars: vars
    });
  });


  // // JF My home redirector
  // res.status(404);
  // res.send(
  //   'The requested URL is Not Found<br><br>' +
  //   req.url.substring(1) + '<br>' +
  //   'You will be redirected to the Index page in 5s' +
  //   '<script text=\'javascript\'>setTimeout(function(){' +
  //     'location.replace(\'/\');' +
  //   '}, 5000)</script>'
  // );

  // // Original error handler
  // // var err = new Error('Not Found');
  // // err.status = 404;
  // // next(err);
}