var carrinhoCtrl = function (crudService, $state) {
  var vm = this;
  crudService.get('carrinho')
    .then(function(response){
      vm.carrinho = response.data;
    }, function(err) {
      console.log('error', err);
    });
}

angular
  .module('app')
  .controller('carrinhoCtrl', carrinhoCtrl);
