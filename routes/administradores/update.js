var path = require('path');
var pg = require('pg');
var connectionString = require(path.join(__dirname, '../', '../', 'config')).connectionString;

module.exports = function(req, res) {

  var results = [];

  // Grab data from the URL parameters
  var id = req.params.cpf;

  // Grab data from http request
  var data = {
    cpf: req.body.cpf,
    nome: req.body.nome,
    login: req.body.login,
    senha: req.body.senha,
    email: req.body.email,
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
    client.query("UPDATE Administrador SET cpf=($1), nome=($2), login=($3), senha=($4), email=($5) WHERE cpf=($6)", [data.cpf, data.nome, data.login, data.senha, data.email, id]);

    // SQL Query > Select Data
    var query = client.query("SELECT * FROM Administrador ORDER BY cpf ASC");

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
