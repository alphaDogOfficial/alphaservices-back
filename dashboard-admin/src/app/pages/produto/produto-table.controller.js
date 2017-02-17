var produtoCtrl = function (crudService, $state) {
  var vm = this;
  var get = function () {
    crudService.get('produto')
      .then(function(response){
        vm.produtos = response.data;
      }, function(err) {
        console.log('error', err);
      });
  };
  get();


  vm.goToAddProduct = function() {
    $state.go('produto.add');
  }

  vm.delete = function (idProduto) {
    swal({
      title: "Você está certo disso?",
      text: "O Produto será deletado do banco de dados!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Sim, deletar!",
      closeOnConfirm: false,
      html: false
    }, function(){
      crudService.delete('produto', idProduto)
        .then(function(response){
          get();
          swal("Deletado!", "O Produto foi deletado!.", "success");
        }, function(err) {
          console.log('error', err);
        });
    });
  };

}

angular
  .module('app')
  .controller('produtoCtrl', produtoCtrl);
