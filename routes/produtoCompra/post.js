var path = require('path');
var pg = require('pg');
var connectionString = require(path.join(__dirname, '../', '../', 'config')).connectionString;


module.exports = function(req, res) {
  console.log('add was called!');
  var results = [];

  // Grab data from http request
  var data = {
    idCompra: req.body.idCompra,
    idProduto: req.body.idProduto,
    quantidade: req.body.quantidade,
    idEntrega: req.body.idEntrega
  };

  // Get a Postgres client from the connection pool
  pg.connect(connectionString, function(err, client, done) {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    }

    // SQL Query > Insert Data
    client.query('INSERT INTO ProdutoCompra('         +
      'idCompra,'                                     +
      'idProduto,'                                    +
      'quantidade,'                                   +
      'idEntrega'                                        +
    ') values($1, $2, $3, $4)', [data.idCompra, data.idProduto, data.quantidade, data.idEntrega]);

    // SQL Query > Select Data
    var query = client.query("SELECT * FROM ProdutoCompra ORDER BY idCompra DESC LIMIT 1");

    // Stream results back one row at a time
    query.on('row', function(row) {
      results.push(row);
    });

    // After all data is returned, close connection and return results
    query.on('end', function() {
      done();
      console.log(results);
      return res.json(results);
    });


  });
}
