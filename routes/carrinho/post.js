var path = require('path');
var pg = require('pg');
var connectionString = require(path.join(__dirname, '../', '../', 'config')).connectionString;
var creds = require(path.join(__dirname, '../', '../', 'credentials'));
var config = {
  user: creds.login, //env var: PGUSER
  database: 'tradesportsdb', //env var: PGDATABASE
  password: creds.senha, //env var: PGPASSWORD
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};
var pool = new pg.Pool(config);

module.exports = function(req, res) {
  var results = [];
  var notOnCart = [];
  var updateCart = [];
  var collectionToGet = [];
  var collectionToPost = [];
  var collectionToUpdate = [];

  // Grab data from http request
  var data = {
    item: req.body.item,
    cpf_cliente: req.body.cpf_cliente
  }

  // Get a Postgres client from the connection pool
  pool.connect(function(err, client, done) {
    // Handle connection errors
    if(err) {
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    };

    for(var i = 0; i < data.item.length; i++) {
      collectionToGet.push(
        "SELECT id_produto, tamanho, cpf_cliente FROM Carrinho WHERE " +
        "cpf_cliente=" + data.cpf_cliente + " and " +
        "id_produto="  + data.item[i].idProduto + " and " +
        "tamanho="  + data.item[i].tamanho + ";"
      );
    };
    insertCollection(collectionToGet, postToCart);

    //     client.query("UPDATE Carrinho SET quantidade=($1) WHERE cpf_cliente=($2) and id_produto=($3)", [quant,  data.CPF, data.idProduto]);


    function postToCart(err) {
      if (err) {
        console.log('deu ruim, nada foi adicionado :/');
      } else {

          notOnCart.forEach((index)=>{
            collectionToPost.push(
              'INSERT INTO Carrinho('  +
              'cpf_cliente'   +
              ', id_produto'     +
              ', quantidade'     +
              ', tamanho'        +
              ") values( " + data.cpf_cliente +
              ", "  + data.item[index].idProduto +
              ", "   + data.item[index].quantidade +
              ", "  + data.item[index].tamanho +
              ");" );
          });
          console.log('col to post: ', collectionToPost);
          if(!!collectionToPost[0]) {
            console.log('post');
            insertCollection(collectionToPost, closeConnection);
          }
          console.log('updatecart: > ', updateCart);
          updateCart.forEach((index)=>{
            collectionToUpdate.push(
              "UPDATE Carrinho SET "+
              "quantidade=" + data.item[index].quantidade +
              " WHERE cpf_cliente="+ data.cpf_cliente +
              " and tamanho="+ data.item[index].tamanho +
              " and id_produto=" + data.item[index].idProduto + ";");
          });
          console.log('col to update: ', collectionToUpdate);
          if(!!collectionToUpdate[0]) {
              insertCollection(collectionToUpdate, closeConnection);
          }

        }
      return;
    }

    function closeConnection(err) {
      if(err){
        console.log('deu erro na hora do post! :x');
        done();
      } else {
        console.log('success!');
        done();
      }
      return res.json({success: true});
    }

    function insertCollection(collection, callback) {
      var index = 0;
      var coll = collection.slice(0); // clone collection
      (function insertOne() {
        var record = coll.splice(0, 1)[0]; // get the first record of coll and reduce coll by one
        console.log('QUERY: ', record);
        client.query(record, function(err, result){
          if(err) {
            console.log(err);
            callback(err);
          }
          // console.log(result);
          if(result.rowCount == 0) {
            notOnCart.push(index);
          }else {
            updateCart.push(index);
          }

          if (coll.length == 0) {

            console.log('adicionar ', notOnCart);
            console.log('atualizar ', updateCart);
            callback();
          } else {
            index ++;
            setTimeout(insertOne, 0);
          }
        });
      })();
    }

  });
}
