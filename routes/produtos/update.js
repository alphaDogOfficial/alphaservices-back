var path = require('path');
var pg = require('pg');
var connectionString = require(path.join(__dirname, '../', '../', 'config')).connectionString;

module.exports = function(req, res) {

  var results = [];

  // Grab data from the URL parameters
  var id = req.params.idProduto;

  // Grab data from http request
  var data = {
    Valor: req.body.valor,
    Nome: req.body.nome,
    Imagem: req.body.imagem,
    Descricao: req.body.descricao,
    Peso: req.body.peso,
    Tamanho: req.body.tamanho,
    Fabricante: req.body.fabricante,
    Quantidade: req.body.quantidade,
    Tipo: req.body.tipo,
    Genero: req.body.genero
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
    if(data.Valor !== undefined) {
      client.query("UPDATE Produto SET valor=($1), nome=($2), imagem=($3), descricao=($4), peso=($5), tamanho=($6), fabricante=($7), quantidade=($8), tipo=($9), genero=($10) WHERE idProduto=($11)", [data.Valor, data.Nome, data.Imagem, data.Descricao, data.Peso, data.Tamanho, data.Fabricante, data.Quantidade, data.Tipo, data.Genero, id]);
    } else {
      client.query("UPDATE Produto SET quantidade=($1) WHERE idProduto=($2)", [data.Quantidade, id])
    }

    // SQL Query > Select Data
    var query = client.query("SELECT * FROM Produto ORDER BY idProduto ASC");

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
