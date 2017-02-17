var path = require('path');
var pg = require('pg');
var connectionString = require(path.join(__dirname, '../', '../', 'config')).connectionString;

module.exports = function(req, res) {

  var results = [];

  // Grab data from the URL parameters
  var idCliente = req.params.cpf;
  console.log('id is: ', idCliente);

  // Grab data from http request
  var data = {
    quantidade: req.body.quantidade,
    id_produto: req.body.id_produto
  };
  console.log('body is: ', req.body);
  console.log('quantidade is: ', data.quantidade);

  // Get a Postgres client from the connection pool
  pg.connect(connectionString, function(err, client, done) {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).send(json({ success: false, data: err}));
    }

    // SQL Query > Update Data
    client.query("UPDATE Carrinho SET quantidade=($1) WHERE cpf_cliente=($2) and id_produto=($3)", [data.quantidade,  idCliente, data.id_produto]);

    // SQL Query > Select Data
    var query = client.query("SELECT * FROM Carrinho");

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
