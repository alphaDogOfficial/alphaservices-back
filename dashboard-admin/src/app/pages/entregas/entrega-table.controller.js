var entregaCtrl = function (crudService, $state) {
  var vm = this;
  var get = function () {
    crudService.get('entrega')
      .then(function(response){
        vm.entregas = response.data;
        console.log(vm.entregas);
      }, function(err) {
        console.log('error', err);
      });
  };
  get();


  vm.goToAddEntrega = function() {
    $state.go('entrega.add');
  }

  vm.delete = function (idEntrega) {
    swal({
      title: "Você está certo disso?",
      text: "A entrega será deletado do banco de dados!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Sim, deletar!",
      closeOnConfirm: false,
      html: false
    }, function(){
      crudService.delete('entrega', identrega)
        .then(function(response){
          get();
          swal("Deletada!", "A entrega foi deletada!.", "success");
        }, function(err) {
          console.log('error', err);
        });
    });
  };

}

angular
  .module('app')
  .controller('entregaCtrl', entregaCtrl);
