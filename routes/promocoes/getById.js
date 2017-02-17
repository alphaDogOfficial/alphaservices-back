var path = require('path');
var pg = require('pg');
var connectionString = require(path.join(__dirname, '../', '../', 'config')).connectionString;

module.exports = function(req, res) {

  var results = [];
  var _id = req.params.idPromocao;
  console.log('ID: '+_id);

  // Get a Postgres client from the connection pool
  pg.connect(connectionString, function(err, client, done) {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    }

    // SQL Query > Select Data
    var query = client.query("SELECT * FROM promocao WHERE idPromocao="+ _id +";");

    // Stream results back one row at a time
    query.on('row', function(row) {
        results.push(row);
    });

    // After all data is returned, close connection and return results
    query.on('end', function() {
      results = results.map(function(obj){
         var rObj = obj;
         if (rObj['estado'] == 'Ativo') {
          rObj['ativo'] = true;
         } else {
          rObj['ativo'] = false;
         }
         return rObj;
      });
      done();
      return res.json(results);
    });

  });

}