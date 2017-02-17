var pg = require('pg');
var path = require('path');
var connectionString = require(path.join(__dirname, '../../', 'config')).connectionString;

var client = new pg.Client(connectionString);
client.connect();

var query = client.query(
  'CREATE TABLE IF NOT EXISTS Produto('  +
    'idProduto SERIAL PRIMARY KEY,'      +
    'valor float(30) not null,'          +
    'nome varchar(255) not null,'        +
    'imagem varchar(255),'               +
    'descricao varchar(255) not null,'   +
    'peso numeric(30) not null,'         +
    'tamanho numeric(30) not null,'      +
    'fabricante varchar(255) not null,'  +
    'quantidade numeric(30) not null,'   +
    'tipo varchar(255) not null,'        +
    'genero numeric(1) not null'         +
  ')'
);

/*
  GENERO:
  0 -> MASCULINO
  1 -> FEMININO
  2 -> CRIANÇAS
*/

query.on('end', function() {
  client.end();
});
