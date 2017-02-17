var pg = require('pg');
var path = require('path');
var connectionString = require(path.join(__dirname, '../../', 'config')).connectionString;

var client = new pg.Client(connectionString);
client.connect();

var query = client.query(
  'CREATE TABLE IF NOT EXISTS Endereco('            		+
    'idEndereco SERIAL PRIMARY KEY,' 			    		+
    'nome varchar(255) not null,' 			    			+
    'rua varchar(255) unique not null,'  					+
    'numero varchar(255) not null,'  		   			 	+	
    'bairro varchar(15) not null,'  		  				+
    'cidade varchar(255) not null,' 			    		+
    'estado varchar(255) not null,' 			    		+
    'pais varchar(255) not null,' 			    			+	
    'cep varchar(255) not null,' 			    			+
    'complemento varchar(255) not null,' 			    	+
    'cpf_cliente numeric(11) REFERENCES cliente (cpf)' 		+
  ')'
);

query.on('end', function() {
  client.end();
});
