var pg = require('pg');
var path = require('path');
var connectionString = require(path.join(__dirname, '../../', 'config')).connectionString;

var client = new pg.Client(connectionString);
client.connect();

var query = client.query(
  'CREATE TABLE IF NOT EXISTS Cliente('            		    +
    'cpf numeric(11) PRIMARY KEY,' 			    +
    'nome varchar(255) not null,' 			    +
    'login varchar(255) unique not null,'  	+
    'senha varchar(255) not null,'  		    +
    'telefone numeric(15) not null,'  		  +
    'email varchar(255) not null' 			    +
  ')'
);

query.on('end', function() {
  client.end();
});
