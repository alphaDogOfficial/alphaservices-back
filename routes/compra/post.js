var path = require('path');
var pg = require('pg');
var connectionString = require(path.join(__dirname, '../', '../', 'config')).connectionString;


module.exports = function(req, res) {
  console.log('add was called!');
  var results = [];

  // Grab data from http request
  var data = {
    cpf_cliente: req.body.cpf_cliente,
    valor: req.body.valor,
    idEndereco: req.body.idEndereco,
    metodo_de_pagamento: req.body.metodo_de_pagamento,
    imagemNF: req.body.imagemNF,
    notaFiscal: req.body.notaFiscal,
    estado: req.body.estado,
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
    client.query('INSERT INTO Compra('        +
      'cpf_cliente,'                                    +
      'valor,'                                 +
      'idEndereco,'                                 +
      'metodo_de_pagamento,'                                  +
      'imagemNF,'                                  +
      'notaFiscal,'                                    +
      'estado'                                     +
    ') values($1, $2, $3, $4, $5, $6, $7)', [data.cpf_cliente, data.valor, data.idEndereco, data.metodo_de_pagamento, data.imagemNF, data.notaFiscal, data.estado]);

    // SQL Query > Select Data
    var query = client.query("SELECT * FROM Compra ORDER BY idCompra DESC LIMIT 1");

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