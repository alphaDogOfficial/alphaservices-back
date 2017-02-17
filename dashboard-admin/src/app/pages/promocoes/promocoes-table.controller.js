var promocoesCtrl = function (crudService, $state) {
  var vm = this;
  var get = function () {
    crudService.get('promocoes')
      .then(function(response){
        vm.promocoes = response.data;
        console.log(response.data);
      }, function(err) {
        console.log('error', err);
      });
  };
  get();


}

angular
  .module('app')
  .controller('promocoesCtrl', promocoesCtrl);
