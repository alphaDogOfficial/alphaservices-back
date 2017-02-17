var path = require('path');
var pg = require('pg');
var connectionString = require(path.join(__dirname, '../', '../', 'config')).connectionString;

module.exports = function(req, res) {

  var results = [];
  var _id = req.params.idEntrega;


  // Get a Postgres client from the connection pool
  pg.connect(connectionString, function(err, client, done) {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    }

    // SQL Query > Select Data
    var query = client.query("SELECT * FROM entrega WHERE idEntrega="+ _id +"ORDER BY idEntrega;");

    // Stream results back one row at a time
    query.on('row', function(row) {
        results.push(row);
    });

    // After all data is returned, close connection and return results
    query.on('end', function() {
      results = results.map(function(obj){
         var rObj = obj;
         rObj['idEntrega'] = parseInt(obj.idEntrega);
         return rObj;
      });
      done();
      return res.json(results);
    });

  });

}