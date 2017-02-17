var promocoesUpdateCtrl = function (crudService, $state, $stateParams) {
  var vm = this;

  vm.formData = {};
  vm.htmlData = {};

  vm.htmlData.title = 'Atualizar promoção';
  vm.htmlData.subtitle = 'Atualizar promoção';
  vm.htmlData.submit = 'Atualizar promoção';

  vm.htmlData.forms = [{
    name: 'Tipo',
    type: 'text',
    model: '',
    isRequired: true,
    isDisabled: true
  },
  {
    name: 'Ativo',
    type: 'checkbox',
    model: ''
  }];



  crudService.getById('promocoes', $stateParams.idPromocao)
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

    crudService.update('promocoes', $stateParams.idPromocao , vm.formData)
      .then(function(){
        $state.go('promocoes.table');
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
  .controller('promocoesUpdateCtrl', promocoesUpdateCtrl);
