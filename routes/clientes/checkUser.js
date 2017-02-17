var path = require('path');
var pg = require('pg');
var connectionString = require(path.join(__dirname, '../', '../', 'config')).connectionString;

module.exports = function(req, res) {

  var results = [];
  var _atributo = req.params.atributo;
  var _q = req.params.q;

  // Get a Postgres client from the connection pool
  pg.connect(connectionString, function(err, client, done) {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    }
    console.log('attr', _atributo);
    console.log('q', _q);
    // SQL Query > Select Data
    var query = client.query("SELECT cpf, nome, login, telefone, email FROM Cliente WHERE "+ _atributo +"='"+ _q +"';");

    console.log('query>', query);
    // Stream results back one row at a time
    query.on('row', function(row) {
        results.push(row);
    });

    query.on('error', function(row) {
      done();
      return res.json({success: false});
    });

    // After all data is returned, close connection and return results
    query.on('end', function() {
      results = results.map(function(obj){
         var rObj = obj;
         rObj['cpf'] = parseInt(obj.cpf);
         rObj['telefone'] = parseInt(obj.telefone);

         return rObj;
      });
      done();
      return res.json(results);
    });

  });

}
