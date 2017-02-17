var funcionarioAddCtrl = function (crudService, $state) {
  var vm = this;
  vm.formData = {};
  vm.htmlData = {};

  vm.htmlData.title = 'Adicionar novos funcionario';
  vm.htmlData.subtitle = 'Adicionar Novos funcionario';
  vm.htmlData.submit = 'Adicionar Novos funcionario';

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
  }]

  vm.fillForm = function(){

    vm.formData.nome = "funcionario Teste";
    vm.formData.login = "loginteste" + Math.floor(Math.random() * 100000000000);
    vm.formData.senha = "senhateste";
    vm.formData.email = "funcionario@teste.com";
    vm.formData.cpf = Math.floor(Math.random() * 100000000000);

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
    crudService.post('funcionario', vm.formData)
      .then(function(){
        console.log('Success!');
        $state.go('usuario.funcionario');
      }, function(err){
        console.log('err', err);
      });
  };

}

angular
  .module('app')
  .controller('funcionarioAddCtrl', funcionarioAddCtrl);
