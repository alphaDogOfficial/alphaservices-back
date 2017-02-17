  var path = require('path');
var pg = require('pg');
var connectionString = require(path.join(__dirname, '../', '../', 'config')).connectionString;

module.exports = function(req, res) {

  var results = [];
  var _id = req.params.cpf;

  // Get a Postgres client from the connection pool
  pg.connect(connectionString, function(err, client, done) {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    }

    // SQL Query > Select Data
    var query = client.query("SELECT "    +
    "c.nome as c_nome,"                   +
    "cart.quantidade as cart_quantidade," +
    "cart.tamanho as cart_tamanho," +
    "prod.nome as prod_nome,"             +
    "prod.valor as prod_valor,"           +
    "prod.idProduto as prod_idProduto,"   +
    "prod.imagem as prod_imagem,"         +
    "prod.descricao as prod_description," +
    "prod.peso as prod_peso,"             +
    "prod.fabricante as prod_fabricante," +
    "prod.tipo as prod_tipo,"             +
    "prod.quantidade as prod_quantidade,"  +
    "prod.genero as prod_genero"  +
    " FROM Carrinho as cart LEFT JOIN Produto as prod ON prod.idProduto = cart.id_produto LEFT JOIN Cliente as c  ON c.cpf = cart.cpf_cliente WHERE c.cpf = " + _id + ";");

    // Stream results back one row at a time
    query.on('row', function(row) {
        results.push(row);
    });

    // After all data is returned, close connection and return results
    query.on('end', function() {
      done();
      return res.json(results);
    });

    query.on('error', function(err) {
      console.log('error', err);
      done();
      return res.json(results);
    });

  });

}
