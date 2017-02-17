var pg = require('pg');
var path = require('path');
var connectionString = require(path.join(__dirname, '../../', 'config')).connectionString;
var cpf = require('bradoc').cpf;
var _   = require('underscore');

var client = new pg.Client(connectionString);
client.connect();
var collection = [];

var query = client.query("SELECT * FROM funcionario where nome='funcionario0';");
query.on('row', function(row) {
    console.log('tem coisa jah!');
    client.end();
    process.exit();
});

query.on('end', function (){
  for(var i = 0; i < 20; i ++) {
    collection.push(
      'INSERT INTO funcionario VALUES(' +
        parseInt(cpf.generate().replace('.', '').replace('.', '').replace('-', '')) + ',' +
        "'funcionario" + i  + "',"              +
        "'login" + i  + "',"                +
        "'senha" + i  + "',"                +
        "'email_admin" + i + "@gmail.com'"  +
      ')'
    );
  }
  insertCollection(collection, closeConnection);
})

function closeConnection(err) {
  if (err) {
    console.log('deu ruim, nada foi adicionado :/');
  } else {
    console.log(' MOCK de funcionario Adicionado ao banco!!');
  }
  client.end();
  return;
}

function insertCollection(collection, callback) {
  var coll = collection.slice(0); // clone collection
  (function insertOne() {
    var record = coll.splice(0, 1)[0]; // get the first record of coll and reduce coll by one
    var query = client.query(record);
    query.on('error', function(err) {
      console.log(err);
      callback(err);
    });
    query.on('end', function() {
      console.log('Foi adicionado esse funcionario: ', record);
      if (coll.length == 0) {
        callback();
      } else {
        setTimeout(insertOne, 0);
      }
    });
  })();
}
