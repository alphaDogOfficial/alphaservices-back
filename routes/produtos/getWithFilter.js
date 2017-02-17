var path = require('path');
var pg = require('pg');
var connectionString = require(path.join(__dirname, '../', '../', 'config')).connectionString;

module.exports = function(req, res) {

  var results = [];

  var data = {
    Genero: req.body.genero,
    Tipo: req.body.tipo
  }


  // Get a Postgres client from the connection pool
  pg.connect(connectionString, function(err, client, done) {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    }

    // SQL Query > Select Data
    var genderString = ''
    if(data.Genero !== undefined) {
      genderString += "("
      for(var i = 0; i < data.Genero.length; i++) {
        if(i == data.Genero.length - 1) {
          genderString += "genero=" + data.Genero[i] + ") "
        } else {
          genderString += "genero=" + data.Genero[i] + " OR "
        }
      }
    }

    var typeString = ''
    if(data.Tipo !== undefined) {
      typeString = "("
      for(var i = 0; i < data.Tipo.length; i++) {
        if(i == data.Tipo.length - 1) {
          typeString += "tipo='" + data.Tipo[i] + "') "
        } else {
          typeString += "tipo='" + data.Tipo[i] + "' OR "
        }
      }
    }

    var andString = ''
    if(data.Tipo !== undefined && data.Genero !== undefined) {
      andString = "AND "
    }

    var queryString = "SELECT * FROM Produto WHERE " + genderString + andString + typeString + "ORDER BY idProduto;"

    var query = client.query(queryString)

    // Stream results back one row at a time
    query.on('row', function(row) {
        results.push(row);
    });

    // After all data is returned, close connection and return results
    query.on('end', function() {
      results = results.map(function(obj){
         var rObj = obj;
         rObj['peso'] = parseInt(obj.peso);
         rObj['valor'] = parseInt(obj.valor);
         rObj['quantidade'] = parseInt(obj.quantidade);
         rObj['genero'] = parseInt(obj.genero)
         return rObj;
      });
      done();
      return res.json(results);
    });

  });

}
