'use strict';

angular
  .module('app', [
    'ngAnimate',
    'ngCookies',
    'ngTouch',
    'ngSanitize',
    'ngResource',
    'ui.router',
    'ui.bootstrap',
    'ngMessages',
    'ngStorage'
  ])
  .run(function ($rootScope, $http, $state, $localStorage) {
        //keep user logged in after page refresh
        if ($localStorage.currentUser) {
            $http.defaults.headers.common.Authorization = $localStorage.currentUser.token;
        }

        // redirect to login page if not logged in and trying to access a restricted page
        $rootScope.$on('$stateChangeStart', function (e, toState, toParams, fromState, fromParams) {
            var publicStatePages = ['login'];
            var restrictedPage = publicStatePages.indexOf(toState.name) === -1;
            if (restrictedPage && !$localStorage.currentUser) {
              e.preventDefault();
              $state.go('login');
            }
            if (toState.name == 'login' && $localStorage.currentUser) {
              e.preventDefault();
              $state.go('produto.add');
            }
        });
    });



(function(root) {

  var backendPort  = "3000";
  var hostname = "localhost";

  root.TSConfig = {};
  root.TSConfig.urlBase = "http://" + hostname + ":" + backendPort + "/api/";

  console.log("Backend Located @ ", root.TSConfig.urlBase);

})(this);
