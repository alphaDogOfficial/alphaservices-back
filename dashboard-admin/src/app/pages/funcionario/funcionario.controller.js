var funcionarioCtrl = function (crudService, $state) {
  var vm = this;

  var get = function () {
    crudService.get('funcionario')
      .then(function(response){
        vm.funcionarios = response.data;
      }, function(err) {
        console.log('error', err);
      });
  };
  vm.goToAddfunc = function() {
    $state.go('usuario.funcionario-add');
  }

  get();
  vm.delete = function (cpf) {
    swal({
      title: "Você está certo disso?",
      text: "O funcionario será deletado do banco de dados!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Sim, deletar!",
      closeOnConfirm: false,
      html: false
    }, function(){
      crudService.delete('funcionario', cpf)
    	  .then(function(response){
					get();
		      swal("Deletado!", "O funcionario foi deletado!.", "success");
        }, function(err) {
          console.log('error', err);
        });
    });
  };

}

angular
  .module('app')
  .controller('funcionarioCtrl', funcionarioCtrl);
