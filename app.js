//NPM Dependencies
var express     = require('express');
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var cors        = require('cors');
var _           = require('underscore');

//Project Dependencies
var routes      = require('./routes');
var auth        = require('./middlewares').auth;
//FOR NOW, encapsulate this in a setup folder!

var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('dashboard-admin/dist'));
app.use(cors());
app.use(morgan('dev'));

//Authentication
// app.use(auth);

//Adding routes
var appRoutes = [];
var actions = [];

_.forEach(routes, function(route){
  if (_.isArray(route)) appRoutes = _.union(appRoutes, route);
  else appRoutes.push(route);
});

_.forEach(appRoutes, function(route){
  actions.push(cb(route));
});

//For async loop in _
function cb(route) {
    return function(next) {
        app[route.method]('/api' + route.path, route.callback);
        next();
    }
}

_(actions).reduceRight(_.wrap, function() { console.warn('Finished Adding routes!') })();

app.listen(3000, function () {
  console.log('The service is on port 3000!');
});
