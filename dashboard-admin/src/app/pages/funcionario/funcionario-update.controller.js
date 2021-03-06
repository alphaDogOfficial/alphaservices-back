var funcionarioUpdateCtrl = function (crudService, $state, $stateParams) {
  var vm = this;

  vm.formData = {};
  vm.htmlData = {};

  vm.htmlData.title = 'Atualizar funcionario';
  vm.htmlData.subtitle = 'Atualizar funcionario';
  vm.htmlData.submit = 'Atualizar funcionario';

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
    isRequired: true,
    isDisabled: true
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
    isRequired: true,
    isDisabled: true
  }]


  crudService.getById('funcionario', $stateParams.cpf)
    .then(function(response){
      console.log('Success');
      vm.formData = response.data[0];
      vm.formData.senha = "password";
      vm.htmlData.forms.forEach(function(curr, index, arr){
        curr.model = vm.formData[curr.name.toLowerCase()];
      });
    }, function(err) {
      console.log('error', err);
    });

  vm.submitForm = function(){
    delete vm.formData.cpf;

    vm.htmlData.forms.forEach(function(curr, index, arr){
      vm.formData[curr.name.toLowerCase()] = curr.model;
    });
    console.log(vm.formData);
    if(vm.formData.email) {
      crudService.update('funcionario', $stateParams.cpf, vm.formData)
        .then(function(){
          console.log('Success!');
          $state.go('usuario.funcionario');
        }, function(err){
          console.log('err', err);
        });
    }

  };

  vm.resetForm = function(){
    vm.htmlData.forms.forEach(function(curr, index, arr){
      if(!curr.isDisabled) curr.model = '';
    });
  };
}

angular
  .module('app')
  .controller('funcionarioUpdateCtrl', funcionarioUpdateCtrl);
