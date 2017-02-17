var pg = require('pg');
var path = require('path');
var connectionString = require(path.join(__dirname, '../../', 'config')).connectionString;

var client = new pg.Client(connectionString);
client.connect();

var query = client.query(
  'CREATE TABLE IF NOT EXISTS Carrinho('        				    +
    'cpf_cliente numeric(11) not null REFERENCES cliente (cpf),' 		+
    'id_produto integer not null REFERENCES produto(idProduto),' 		+
    'quantidade numeric(30) not null, '	    					      +
    'tamanho numeric(30) not null, '	    					        +
    'data timestamp not null default now()'	    				    +
  ')'
);

query.on('end', function() {
  client.end();
});
