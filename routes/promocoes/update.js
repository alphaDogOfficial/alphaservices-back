var path = require('path');
var pg = require('pg');
var connectionString = require(path.join(__dirname, '../', '../', 'config')).connectionString;

module.exports = function(req, res) {

  var results = [];

  // Grab data from the URL parameters
  var id = req.params.idpromocao;

  // Grab data from http request
  var data = {
    idPromocao: req.body.idpromocao,
    tipo: req.body.tipo,
    estado: req.body.estado,
  };

  if ( req.body.ativo == true ) {
    data.estado = 'Ativo';
  }
  else data.estado = 'Inativo';
  console.log('minha data ', data);

  // Get a Postgres client from the connection pool
  pg.connect(connectionString, function(err, client, done) {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).send(json({ success: false, data: err}));
    }

    // SQL Query > Update Data
    client.query("UPDATE promocao SET estado=($1) WHERE idPromocao=($2)", [data.estado, data.idPromocao]);

    // SQL Query > Select Data
    var query = client.query("SELECT * FROM promocao ORDER BY idPromocao");

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
