var produtoAddCtrl = function (crudService, $state) {
  var vm = this;
  vm.formData = {};
  vm.htmlData = {};

  vm.htmlData.title = 'Adicionar novos produtos';
  vm.htmlData.subtitle = 'Adicionar Novos Produtos';
  vm.htmlData.submit = 'Adicionar Novos Produtos';

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
  },
  {
    name: 'Imagem',
    type: 'text',
    model: '',
    isRequired: true
  }]

  vm.fillForm = function(){

    vm.formData.nome = "Novo";
    vm.formData.valor = 999;
    vm.formData.descricao = "Tenis de couro com muito gliter,";
    vm.formData.peso = 999;
    vm.formData.fabricante = "Chineis";
    vm.formData.tamanho = 1;
    vm.formData.quantidade = 99;
    vm.formData.tipo = "Corrida"
    vm.formData.genero = 1
    vm.formData.imagem = 'http://static1.netshoes.net/Produtos/chuteira-adidas-ace-164-fxg-campo/78/D13-3047-178/D13-3047-178_detalhe1.jpg?resize=254:*'

    vm.htmlData.forms.forEach(function(curr, index, arr){
      curr.model = vm.formData[curr.name.toLowerCase()];
    });

  }

  vm.resetForm = function(){
    vm.htmlData.forms.forEach(function(curr, index, arr){
      curr.model = '';
    });
  };

  vm.submitForm = function(){

    vm.htmlData.forms.forEach(function(curr, index, arr){
      vm.formData[curr.name.toLowerCase()] = curr.model;
    });
    console.log(vm.formData);
    crudService.post('produto', vm.formData)
      .then(function(){
        console.log('Success!');
        $state.go('produto.table');
      }, function(err){
        console.log('err', err);
      });
  };

}

angular
  .module('app')
  .controller('produtoAddCtrl', produtoAddCtrl);
