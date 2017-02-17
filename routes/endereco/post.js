var path = require('path');
var pg = require('pg');
var connectionString = require(path.join(__dirname, '../', '../', 'config')).connectionString;


module.exports = function(req, res) {
  console.log('add was called!');
  var results = [];

  // Grab data from http request
  var data = {
    nome: req.body.nome,
    rua: req.body.rua,
    numero: req.body.numero,
    bairro: req.body.bairro,
    cidade: req.body.cidade,
    estado: req.body.estado,
    pais: req.body.pais,
    cep: req.body.cep,
    complemento: req.body.complemento,
    cpf_cliente: req.body.cpf_cliente
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
    client.query('INSERT INTO endereco('        +
      'nome,'                                   +
      'rua,'                                    +
      'numero,'                                 +
      'bairro,'                                 +
      'cidade,'                                  +
      'estado,'                                  +
      'pais,'                                    +
      'cep,'                                     +
      'complemento,'                             +
      'cpf_cliente'                             +
    ') values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [data.nome, data.rua, data.numero, data.bairro, data.cidade, data.estado, data.pais, data.cep, data.complemento, data.cpf_cliente]);

    // SQL Query > Select Data
    var query = client.query("SELECT * FROM endereco ORDER BY nome DESC LIMIT 1");

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
