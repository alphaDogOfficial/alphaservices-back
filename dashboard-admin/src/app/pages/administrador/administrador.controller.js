var administradorCtrl = function (crudService, $state) {
  var vm = this;

  var get = function () {
    crudService.get('administrador')
      .then(function(response){
        vm.administradores = response.data;
      }, function(err) {
        console.log('error', err);
      });
  };
  vm.goToAddAdmin = function() {
    $state.go('usuario.administrador-add');
  }

  get();
  vm.delete = function (cpf) {
    swal({
      title: "Você está certo disso?",
      text: "O Administrador será deletado do banco de dados!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Sim, deletar!",
      closeOnConfirm: false,
      html: false
    }, function(){
      crudService.delete('administrador', cpf)
    	  .then(function(response){
					get();
		      swal("Deletado!", "O Administrador foi deletado!.", "success");
        }, function(err) {
          console.log('error', err);
        });
    });
  };

}

angular
  .module('app')
  .controller('administradorCtrl', administradorCtrl);
