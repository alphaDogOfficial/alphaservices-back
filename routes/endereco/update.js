var path = require('path');
var pg = require('pg');
var connectionString = require(path.join(__dirname, '../', '../', 'config')).connectionString;

module.exports = function(req, res) {

  var results = [];

  // Grab data from the URL parameters
  var id = req.params.idEndereco;

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
    cpf_cliente: req.body.cpf_cliente,
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
    client.query("UPDATE endereco SET nome=($1), rua=($2), numero=($3), bairro=($4), cidade=($5), estado=($6), pais=($7), cep=($8), complemento=($9), cpf_cliente=($10) WHERE idEndereco=($11)", [data.nome, data.rua, data.numero, data.bairro, data.cidade, data.estado, data.pais, data.cep, data.complemento, data.cpf_cliente, id]);

    // SQL Query > Select Data
    var query = client.query("SELECT * FROM endereco ORDER BY nome ASC");

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
