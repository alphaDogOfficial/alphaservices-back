var comprasCtrl = function (crudService, $state, $http, $q) {
  var vm = this;
  var get = function () {
    crudService.get('compra')
      .then(function(response){
        vm.compras = response.data;
        vm.compras.forEach(function(item){
          if(item.estado == 0) {
            item.estado = false;
            item.estadoType = "Não confirmado!";
          }else {
            item.estado = true;
            item.estadoType = "PAGO";
          }
        })
        console.log('RESULTADO -> ', response.data);
      }, function(err) {
        console.log('error', err);
      });
  };
  get();

  vm.confirm = function (idCompra, index) {
    $http
      .put(TSConfig.urlBase + 'compra' + "/" + idCompra, {estado: 1})
      .then(function(response){
        vm.compras[index].estado = true;
        vm.compras[index].estadoType = "PAGO";
        return;
      },function(response){
          return $q.reject(response.data);
    });
  }
}

angular
  .module('app')
  .controller('comprasCtrl', comprasCtrl);
