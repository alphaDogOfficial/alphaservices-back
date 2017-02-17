var path = require('path');
var pg = require('pg');
var connectionString = require(path.join(__dirname, '../', '../', 'config')).connectionString;

module.exports = function(req, res) {
  console.log('Cliente add was called!');
  var results = [];

  // Grab data from http request
  var data = {
    CPF: req.body.cpf,
    Nome: req.body.nome,
    Login: req.body.login,
    Senha: req.body.senha,
    Telefone: req.body.telefone,
    Email: req.body.email
  };

  console.log(data);

  // Get a Postgres client from the connection pool
  pg.connect(connectionString, function(err, client, done) {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    }

    // SQL Query > Insert Data
    client.query('INSERT INTO Cliente(' +
      'cpf,'                            +
      'nome,'                           +
      'login,'                          +
      'senha,'                          +
      'telefone,'                       +
      'email'                          +
    ') values($1, $2, $3, $4, $5, $6)', [data.CPF, data.Nome, data.Login, data.Senha, data.Telefone, data.Email]);

    // SQL Query > Select Data
    var query = client.query("SELECT * FROM Cliente WHERE cpf=" + data.CPF);

    // Stream results back one row at a time
    query.on('row', function(row) {
      results.push(row);
    });

    // After all data is returned, close connection and return results
    query.on('end', function() {
      done();
      console.log('connected');
      return res.json(results);
    });


  });
}
