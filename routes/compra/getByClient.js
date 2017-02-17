var path = require('path');
var pg = require('pg');
var _ = require('underscore');
var connectionString = require(path.join(__dirname, '../', '../', 'config')).connectionString;

module.exports = function(req, res) {

  var results = [];
  var _id = req.params.id;
  var filteredResult = [];

  // Get a Postgres client from the connection pool
  pg.connect(connectionString, function(err, client, done) {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    }

    // SQL Query > Select Data
    var query = client.query("SELECT * FROM Compra as c JOIN ProdutoCompra as pc ON pc.idCompra = c.idCompra WHERE c.cpf_cliente = " + _id + ";");

    // Stream results back one row at a time
    query.on('row', function(row) {
        results.push(row);
    });

    // After all data is returned, close connection and return results
    query.on('end', function() {

      var x = {};

      var i = 0;

      for (var i=0; i < results.length; i++) {
        var key = results[i].idcompra;
        if (typeof(x[key]) == "undefined") x[key] = [];
        x[key].push(results[i]);
      }
      done();
      return res.json(x);
    });

  });

}
