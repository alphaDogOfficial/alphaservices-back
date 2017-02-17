var pg = require('pg');
var path = require('path');
var connectionString = require(path.join(__dirname, '../../', 'config')).connectionString;

var client = new pg.Client(connectionString);
client.connect();

var query = client.query(
  'CREATE TABLE IF NOT EXISTS funcionario('       +
    'cpf numeric PRIMARY KEY,'        +
    'nome varchar(255) not null,'     +
    'login varchar(255) not null,'    +
    'senha varchar(255) not null,'    +
    'email varchar(255) not null'    +
  ')'
);

query.on('end', function() {
  client.end();
});