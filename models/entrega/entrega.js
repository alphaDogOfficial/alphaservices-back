var pg = require('pg');
var path = require('path');
var connectionString = require(path.join(__dirname, '../../', 'config')).connectionString;

var client = new pg.Client(connectionString);
client.connect();

var query = client.query(
  'CREATE TABLE IF NOT EXISTS entrega('              		+
    'idEntrega SERIAL PRIMARY KEY,' 			    		+
    'idCompra integer REFERENCES compra (idCompra),' 	   	+
    'prazo DATE not null'                                  	+

  ')'
);

query.on('end', function() {
  client.end();
});
