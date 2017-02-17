var path = require('path');
var pg = require('pg');
var connectionString = require(path.join(__dirname, '../', '../', 'config')).connectionString;

module.exports = function(req, res) {

  var results = [];

  // Grab data from the URL parameters
  var id = req.params.idEntrega;

  // Grab data from http request
  var data = {
    idCompra: req.body.idCompra,
    prazo: req.body.prazo,
  };

  // Get a Postgres client from the connection pool
  pg.connect(connectionString, function(err, client, done) {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).send(json({ success: false, data: err}));
    }

    // SQL Query > Update Data
    client.query("UPDATE entrega SET idCompra=($1), nome=($2) WHERE idEntrega=($3)", [data.idCompra, data.prazo, id]);

    // SQL Query > Select Data
    var query = client.query("SELECT * FROM entrega ORDER BY idEntrega ASC");

    // Stream results back one row at a time
    query.on('row', function(row) {
        results.push(row);
    });

    // After all data is returned, close connection and return results
    query.on('end', function() {
      done();
      return res.json(results);
    });
  });

}
