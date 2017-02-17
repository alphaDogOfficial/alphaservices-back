var path = require('path');
var pg = require('pg');
var connectionString = require(path.join(__dirname, '../', '../', 'config')).connectionString;

module.exports = function(req, res) {

  var results = [];

  // Grab data from the URL parameters
  var idCompra = req.params.idCompra;
  var idProduto = req.params.idProduto;

  // Grab data from http request
  var data = {
    quantidade: req.body.quantidade,
    idEntrega: req.body.idEntrega
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
    if(data.quantidade !== undefined) {
      client.query("UPDATE produtoCompra SET quantidade=($1) idEntrega=($2) WHERE idCompra=($3) AND idProduto=($4)", [data.quantidade, data.idEntrega, idCompra, idProduto]);
    } else {
      client.query("UPDATE produtoCompra SET idEntrega=($1) WHERE idCompra=($2) AND idProduto=($3)", [data.idEntrega, idCompra, idProduto]);

    }

    // SQL Query > Select Data
    var query = client.query("SELECT * FROM produtocompra");

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
