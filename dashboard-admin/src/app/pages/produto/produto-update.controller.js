var produtoUpdateCtrl = function (crudService, $state, $stateParams) {
  var vm = this;

  vm.formData = {};
  vm.htmlData = {};

  vm.htmlData.title = 'Atualizar produtos';
  vm.htmlData.subtitle = 'Atualizar Produtos';
  vm.htmlData.submit = 'Atualizar Produtos';

  vm.htmlData.forms = [{
    name: 'Nome',
    type: 'text',
    model: '',
    isRequired: true
  },
  {
    name: 'Valor',
    type: 'number',
    model: '',
    isRequired: true
  },
  {
    name: 'Descricao',
    type: 'text',
    model: '',
    isRequired: true
  },
  {
    name: 'Peso',
    type: 'number',
    model: '',
    isRequired: true
  },
  {
    name: 'Fabricante',
    type: 'text',
    model: '',
    isRequired: true
  },
  {
    name: 'Tamanho',
    type: 'text',
    model: '',
    isRequired: true
  },
  {
    name: 'Quantidade',
    type: 'number',
    model: '',
    isRequired: true
  },
  {
    name: 'Tipo',
    type: 'text',
    model: '',
    isRequired: true
  },
  {
    name: 'Genero',
    type: 'number',
    model: '',
    isRequired: true
  }];


  crudService.getById('produto', $stateParams.idproduto)
    .then(function(response){
      vm.formData = response.data[0];
      vm.htmlData.forms.forEach(function(curr, index, arr){
        curr.model = vm.formData[curr.name.toLowerCase()];
      });
    }, function(err) {
      console.log('error', err);
    });

  vm.submitForm = function(){

    vm.htmlData.forms.forEach(function(curr, index, arr){
      vm.formData[curr.name.toLowerCase()] = curr.model;
    });

    crudService.update('produto', $stateParams.idproduto , vm.formData)
      .then(function(){
        $state.go('produto.table');

        crudService.getById('produtoCompra', $stateParams.idproduto)
          .then(function(response) {
            if(response.data.length > 0) {
              var quantidade = vm.formData.quantidade
              for(var i = 0; i < response.data.length; i++) {
                if(response.data[i].identrega == null && response.data[i].quantidade <= quantidade) {
                  var data = {}
                  data.idCompra = response.data[i].idcompra
                  data.prazo = new Date()


                  crudService.post('entrega', data).
                    then(function(res) {
                      var datapc = {}
                      datapc.idEntrega = res.data[0].identrega

                      crudService.update('produtoCompra', res.config.data.idCompra, datapc, $stateParams.idproduto)
                  })

                  quantidade = quantidade - response.data[i].quantidade

                  var dataprod = {}
                  dataprod.quantidade = quantidade

                  crudService.update('produto', $stateParams.idproduto, dataprod)
                }
              }
            }
          })
      }, function(err){
        console.log('err', err);
      });
  };

  vm.resetForm = function(){
    vm.htmlData.forms.forEach(function(curr, index, arr){
      if(!curr.isDisabled) curr.model = '';
    });
  };
}

angular
  .module('app')
  .controller('produtoUpdateCtrl', produtoUpdateCtrl);
