var topnavCtrl = function (AuthenticationService) {
  var vm = this;
  vm.doLogout = function() {
    AuthenticationService.logout();
  };
};

angular
  .module('app')
  .controller('topnavCtrl', topnavCtrl);
