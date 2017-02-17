var creds = require('./credentials');

var config = {};

if(creds.login) {
    config.connectionString = process.env.DATABASE_URL || ('postgres://'+creds.login +':'+creds.senha +'@localhost:5432/tradesportsdb');
} else {
  config.connectionString = process.env.DATABASE_URL || ('postgres://@localhost:5432/tradesportsdb');
}

//config.connectionString = process.env.DATABASE_URL || ('postgres://localhost:5432/tradesportsdb');
config.secret = "superSecret";


module.exports = config;
