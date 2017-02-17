var path = require('path');
var pg = require('pg');
var connectionString = require(path.join(__dirname, '../', '../', 'config')).connectionString;

module.exports = function(req, res) {
  console.log('add was called!');
  var results = [];

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
      return res.status(500).json({ success: false, data: err});
    }

    // SQL Query > Insert Data
    client.query('INSERT INTO Produto(' +
      'valor,'                          +
      'nome,'                           +
      'imagem,'                         +
      'descricao,'                      +
      'peso,'                           +
      'tamanho,'                        +
      'fabricante,'                     +
      'quantidade,'                     +
      'tipo,'                           +
      'genero'                          +
    ') values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [data.Valor, data.Nome, data.Imagem, data.Descricao, data.Peso, data.Tamanho, data.Fabricante, data.Quantidade, data.Tipo, data.Genero]);

    // SQL Query > Select Data
    var query = client.query("SELECT * FROM Produto ORDER BY idProduto DESC LIMIT 1");

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
