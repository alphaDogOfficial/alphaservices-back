var pg = require('pg');
var path = require('path');
var connectionString = require(path.join(__dirname, '../../', 'config')).connectionString;
var _   = require('underscore');

var marcas = ['Adidas', 'Nike', 'Converse', 'Lacoste', 'Topper', 'Mizuno', 'Vans', 'Puma', 'Reebok']
var imagens = ['http://static1.netshoes.net/Produtos/tenis-puma-elsu-v2-perf-sl/46/D14-1109-846/D14-1109-846_detalhe1.jpg?resize=254:*',
'http://static1.netshoes.net/Produtos/tenis-reebok-trainfusion-nine/58/D19-0791-058/D19-0791-058_detalhe1.jpg?resize=254:*',
'http://static1.netshoes.net/Produtos/tenis-reebok-trainfusion-nine/04/D19-0792-904/D19-0792-904_detalhe1.jpg?resize=254:*',
'http://static1.netshoes.net/Produtos/tenis-nike-biscuit-2-sl/14/004-7214-014/004-7214-014_detalhe1.jpg?resize=254:*',
'http://static1.netshoes.net/Produtos/tenis-lacoste-lerond-sep/12/D66-0420-012/D66-0420-012_detalhe1.jpg?resize=254:*',
'http://static1.netshoes.net/Produtos/tenis-adidas-breeze-102/26/D13-4878-026/D13-4878-026_detalhe1.jpg?resize=254:*',
'http://static1.netshoes.net/Produtos/tenis-nike-eastham/26/004-0617-326/004-0617-326_detalhe1.jpg?resize=254:*',
'http://static1.netshoes.net/Produtos/tenis-converse-all-star-european-ox/02/047-3280-002/047-3280-002_detalhe1.jpg?resize=254:*',
'http://static1.netshoes.net/Produtos/tenis-nike-vapor-court/28/004-5147-028/004-5147-028_detalhe1.jpg?resize=254:*',
'http://static1.netshoes.net/Produtos/tenis-nike-futslide-sl/28/004-7620-128/004-7620-128_detalhe1.jpg?resize=254:*',
'http://static1.netshoes.net/Produtos/chuteira-adidas-artilheira-in-futsal/14/D13-3054-114/D13-3054-114_detalhe1.jpg?resize=254:*',
'http://static1.netshoes.net/Produtos/chuteira-nike-mercurial-victory-5-ic-futsal/54/004-6286-054/004-6286-054_detalhe1.jpg?resize=254:*',
'http://static1.netshoes.net/Produtos/chuteira-nike-mercurial-vortex-2-cr7-tf-society/86/004-7351-086/004-7351-086_detalhe1.jpg?resize=254:*',
'http://static1.netshoes.net/Produtos/chuteira-adidas-ace-164-fxg-campo/78/D13-3047-178/D13-3047-178_detalhe1.jpg?resize=254:*'
]
var imagem;
var tipos = ['Corrida', 'Social', 'Chuteira', 'Skate', 'Casual'];
var marca;
var valor;
var nome;
var descricao;
var peso;
var tamanho = [35, 36, 37, 38, 39, 40, 41, 42, 43, 44];
var quantidade
var tipo;
var query;
var genero = [0, 1, 2]

var client = new pg.Client(connectionString);
client.connect();
var collection = [];

var query = client.query("SELECT * FROM Produto where nome='tenis0';");
query.on('row', function(row) {
    console.log('tem coisa jah!');
    client.end();
    process.exit();
});

query.on('end', function (){
  for(var i = 0; i < 1000; i ++) {
    collection.push(
      'INSERT INTO Produto(' +
        'valor,'                          +
        'nome,'                           +
        'imagem,'                         +
        'descricao,'                      +
        'peso,'                           +
        'tamanho,'                        +
        'fabricante,'                     +
        'quantidade,'                     +
        'tipo,'                           +
        'genero'                          +
      ')  VALUES(' +
        parseFloat(getRandomFloat(50, 500).toFixed(2)) + ","                 +
        "'tenis" + i  + "',"        +
        "'" + imagens[i%imagens.length]  + "',"    +
        "'Tenis Teste Numero " + i + "',"  +
        getRandomInt(50, 500) + "," +
        tamanho[i%tamanho.length] + "," +
        "'Fabricante " + i + "',"  +
        getRandomInt(50, 500) + "," +
        "'" + tipos[i%tipos.length]  + "',"    +
        genero[i%genero.length] +
      ')'
    );
  }
  insertCollection(collection, closeConnection);
})

function closeConnection(err) {
  if (err) {
    console.log('deu ruim, nada foi adicionado :/');
  } else {
    console.log(' MOCK de Produtos Adicionado ao banco!!');
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
      console.log('Foi adicionado esse produto: ', record);
      if (coll.length == 0) {
        callback();
      } else {
        setTimeout(insertOne, 0);
      }
    });
  })();
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloat(min, max) {
    return Math.random() * (max - min + 1) + min;
}
