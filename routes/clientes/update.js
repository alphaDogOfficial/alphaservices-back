var path = require('path');
var pg = require('pg');
var connectionString = require(path.join(__dirname, '../', '../', 'config')).connectionString;

module.exports = function(req, res) {

  var results = [];

  // Grab data from the URL parameters
  var id = req.params.cpf;
  console.log('id is: ', id);

  // Grab data from http request
  var data = {
    Nome: req.body.nome,
    Login: req.body.login,
    Senha: req.body.senha,
    Telefone: req.body.telefone,
    Email: req.body.email
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
    client.query("UPDATE Cliente SET nome=($1), login=($2), senha=($3), telefone=($4), email=($5) WHERE cpf=($6)", [data.Nome, data.Login, data.Senha, data.Telefone, data.Email, id]);

    // SQL Query > Select Data
    var query = client.query("SELECT * FROM Cliente");

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
