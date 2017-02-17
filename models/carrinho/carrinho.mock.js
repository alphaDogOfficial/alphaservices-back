var pg = require('pg');
var path = require('path');
var connectionString = require(path.join(__dirname, '../../', 'config')).connectionString;
var cpf = require('bradoc').cpf;
var _   = require('underscore');

var client = new pg.Client(connectionString);
client.connect();
var collection = [];
var cpfCliente = [];
var tamanho = [35, 36, 37, 38, 39, 40, 41, 42, 43, 44];
var checkCliente = client.query("SELECT cpf FROM cliente;");
checkCliente.on('row', function(row) {
  cpfCliente.push(row);
});

checkCliente.on('end', function () {
  if (cpfCliente) {
    var idProduto = [];

    var checkProduto = client.query("SELECT idproduto FROM produto;");
    checkProduto.on('row', function(row) {
      idProduto.push(row);
    });

    checkProduto.on('end', function() {
      // console.log('cpfs: ', cpfCliente);
      // console.log('idsProduto: ', idProduto);
      if (idProduto) {
        for (var i =0; i < 20; i++) {
          for(var j = 0; j < 10; j ++) {

            collection.push(
              'INSERT INTO Carrinho VALUES('      +
                cpfCliente[i].cpf + ","           +
                idProduto[j].idproduto + ","      +
                (j+1)         + ","                   +
                tamanho[j%10] + ","      +
                "'2011-05-16 15:36:38'"           +
              ')'
            );
          }
        }
        insertCollection(collection, closeConnection);
      } else {
        console.log('não tem produto...!!');
        client.end();
        process.exit(1);
      }
    });

  } else {
    console.log('não tem cliente...!!');
    client.end();
    process.exit(1);
  }

})

function closeConnection(err) {
  if (err) {
    console.log('deu ruim, nada foi adicionado :/');
  } else {
    console.log(' MOCK de Carrinho Adicionado ao banco!!');
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
      // console.log('Foi adicionado esse admin: ', record);
      if (coll.length == 0) {
        callback();
      } else {
        setTimeout(insertOne, 0);
      }
    });
  })();
}
