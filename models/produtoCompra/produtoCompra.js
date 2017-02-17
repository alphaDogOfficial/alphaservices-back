var pg = require('pg');
var path = require('path');
var connectionString = require(path.join(__dirname, '../../', 'config')).connectionString;

var client = new pg.Client(connectionString);
client.connect();

var query = client.query(
  'CREATE TABLE IF NOT EXISTS ProdutoCompra('       		+
    'idCompra integer REFERENCES Compra (idCompra),'        +
    'idProduto integer REFERENCES Produto (idProduto),' 	+
    'quantidade numeric(30) not null,' 						+
    'idEntrega integer REFERENCES Entrega'					+

  ')'
);

query.on('end', function() {
  client.end();
});