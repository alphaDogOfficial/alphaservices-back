var path = require('path');
var pg = require('pg');
var jwt    = require('jsonwebtoken');
var config = require(path.join(__dirname, '../', '../', 'config'))
var _ = require('underscore')
var nonSecurePaths = require('./nonSecurePaths');


module.exports = function(req, res, next) {

  //If the path is non Secure, continue. No Validation needed

  for(var i = 0; i < nonSecurePaths.length; i++){
    if ( nonSecurePaths[i].path == req.path && (nonSecurePaths[i].method == req.method || nonSecurePaths[i].method == '*')) {
      return next();
    }
  }


  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['authorization'];

  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });

  }
};
