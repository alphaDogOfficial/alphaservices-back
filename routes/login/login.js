var path = require('path');
var pg = require('pg');
var jwt    = require('jsonwebtoken');
var config = require(path.join(__dirname, '../', '../', 'config'));

module.exports = function (req, res) {

  var results = [];
  // Grab data from http request
  var credential = {
    login: req.body.login,
    senha: req.body.senha
  };

  pg.connect(config.connectionString, function(err, client, done) {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    }

    var query = client.query("SELECT login, senha FROM Administrador WHERE login= \'" + credential.login + "\' and senha=\'" + credential.senha + "\';");

    query.on('row', function(row) {
        results.push(row);
    });

    query.on('end', function() {
      done();
      if(!results.length) {
        return res.status(403).json({ success: false, message: 'Authentication FAILED! :('});
      } else {
        var token = jwt.sign(credential, config.secret, {
          expiresIn : 60*60*24 // 24h
        });

        return res.json({
          success: true,
          message: 'Token Created!',
          token: token
        });
      }
    });

  });

};
