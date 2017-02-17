var loginCtrl = function (AuthenticationService, $localStorage, $state) {
  var vm = this;
  vm.login = "testelogin";
  vm.senha = "testesenha";
  vm.doLogin = function(){
    AuthenticationService.login(vm.login, vm.senha, function (result) {
      if (result === true) {
          $state.go('produto.add');
      } else {
          vm.error = '';
      }
    });
  }

}

angular
  .module('app')
  .controller('loginCtrl', loginCtrl);
