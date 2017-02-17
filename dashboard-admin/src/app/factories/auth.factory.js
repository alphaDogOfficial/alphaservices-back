var AuthenticationService = function($http, $localStorage, $state) {
  var service = {};

  var login = function(login, senha, callback) {
    $http.post(TSConfig.urlBase + 'login', { login: login, senha: senha })
      .success(function (response) {
        // login successful if there's a token in the response
        if (response.token) {
          // store login and token in local storage to keep user logged in between page refreshes
          $localStorage.currentUser = { login: login, token: response.token };

          // add jwt token to auth header for all requests made by the $http service
          $http.defaults.headers.common.Authorization = 'Bearer ' + response.token;

          // execute callback with true to indicate successful login
          callback(true);
        } else {
          // execute callback with false to indicate failed login
          callback(false);
        }
      });
  }

  var logout = function() {
    // remove user from local storage and clear http auth header
    delete $localStorage.currentUser;
    $http.defaults.headers.common.Authorization = '';
    $state.go('login');
  }

  service.login = login;
  service.logout = logout;

  return service;


}

angular
  .module('app')
  .factory('AuthenticationService', AuthenticationService);
