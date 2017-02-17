var routes      = require('./routes');
var _           = require('underscore');
var express         = require('express');
var app = express();
//iterating over a object, do all here


//
var appRoutes = [];
var actions = [];
var test = routes[0];
console.log(routes);

_.forEach(routes, function(arr){
  appRoutes = _.union(appRoutes, arr);
});

console.log(appRoutes);

_.forEach(appRoutes, function(route){
  actions.push(cb(route));
});

function cb(route) {
    return function(next) {
      console.log('the method is: ' ,route.method);
        app[route.method](route.path, route.callback);
        console.log('called! ==> ', route);
        next();
    }
}

// a list of things to call


// call the functions in the series array in order
_(actions).reduceRight(_.wrap, function() { console.warn('done') })();

// // _.forEach(test, function(routeOptions) {
// //   console.log('routhe.method -> : ', routeOptions.method);
// //   app[get](routeOptions.path, routeOptions.callback);
// // });
//
// console.log(app);
