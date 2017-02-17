var clienteAddCtrl = function (crudService, $state) {
  var vm = this;
  vm.formData = {};
  vm.htmlData = {};

  vm.htmlData.title = 'Adicionar novos clientes';
  vm.htmlData.subtitle = 'Adicionar Novos Clientes';
  vm.htmlData.submit = 'Adicionar Novos Clientes';

  vm.htmlData.forms = [{
    name: 'Nome',
    type: 'text',
    model: '',
    isRequired: true
  },
  {
    name: 'Login',
    type: 'text',
    model: '',
    isRequired: true
  },
  {
    name: 'Senha',
    type: 'password',
    model: '',
    isRequired: true
  },
  {
    name: 'Email',
    type: 'email',
    model: '',
    isRequired: true
  },
  {
    name: 'CPF',
    type: 'number',
    model: '',
    min: "0",
    max: "99999999999",
    isRequired: true
  },
  {
    name: 'Telefone',
    type: 'number',
    model: '',
    min: "0",
    max: "999999999999999",
    isRequired: true
  }]

  vm.fillForm = function(){
    vm.formData.nome = "Cliente Teste";
    vm.formData.login = "clienteteste" + Math.floor(Math.random() * 100000000000);
    vm.formData.senha = "senhateste";
    vm.formData.email = "cliente@teste.com";
    vm.formData.cpf = Math.floor(Math.random() * 100000000000);
    vm.formData.telefone = 11999999999;

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
    crudService.post('cliente', vm.formData)
      .then(function(){
        console.log('Success!');
        $state.go('usuario.cliente');
      }, function(err){
        console.log('err', err);
      });
  };

}

angular
  .module('app')
  .controller('clienteAddCtrl', clienteAddCtrl);
