angular
  .module('app')
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state('login', {
            url: "/login",
            templateUrl: "app/pages/login/login.html",
            controller: loginCtrl,
            controllerAs: 'loginVm',
            data: { pageTitle: 'Login', specialClass: 'gray-bg' }
        })
        .state('usuario', {
            abstract: true,
            url: "/usuario",
            templateUrl: "components/common/content.html"
        })
        .state('usuario.cliente', {
            url: "/cliente",
            controller: clienteCtrl,
            controllerAs: "vm",
            templateUrl: "app/pages/cliente/cliente-table.html",
            data: { pageTitle: 'Cliente' }
        })
        .state('usuario.cliente-update', {
            url: "/cliente/:cpf",
            controller: clienteUpdateCtrl,
            controllerAs: "vm",
            templateUrl: "components/form/form.html",
            data: { pageTitle: 'Atualizar Cliente' }
        })
        .state('usuario.cliente-add', {
            url: "/addCliente",
            controller: clienteAddCtrl,
            controllerAs: "vm",
            templateUrl: "components/form/form.html",
            data: { pageTitle: 'Add new Cliente' }
        })
        .state('usuario.funcionario', {
            url: "/funcionario",
            controller: funcionarioCtrl,
            controllerAs: "vm",
            templateUrl: "app/pages/funcionario/funcionario-table.html",
            data: { pageTitle: 'Funcionario' }
        })
        .state('usuario.funcionario-add', {
            url: "/addFuncionario",
            controller: funcionarioAddCtrl,
            controllerAs: "vm",
            templateUrl: "components/form/form.html",
            data: { pageTitle: 'Funcionario' }
        })
        .state('usuario.funcionario-update', {
            url: "/funcionario/:cpf",
            controller: funcionarioUpdateCtrl,
            controllerAs: "vm",
            templateUrl: "components/form/form.html",
            data: { pageTitle: 'Atualizar funcionario' }
        })
        .state('usuario.administrador', {
            url: "/administrador",
            controller: administradorCtrl,
            controllerAs: "vm",
            templateUrl: "app/pages/administrador/administrador-table.html",
            data: { pageTitle: 'Administrador' }
        })
        .state('usuario.administrador-add', {
            url: "/addAdministrador",
            controller: administradorAddCtrl,
            controllerAs: "vm",
            templateUrl: "components/form/form.html",
            data: { pageTitle: 'Administrador' }
        })
        .state('usuario.administrador-update', {
            url: "/administrador/:cpf",
            controller: adminsitradorUpdateCtrl,
            controllerAs: "vm",
            templateUrl: "components/form/form.html",
            data: { pageTitle: 'Atualizar Administrador' }
        })
        .state('promocoes', {
            abstract: true,
            url: "/promocoes",
            templateUrl: "components/common/content.html"
        })
         .state('promocoes.table', {
            url: "/table",
            controller: promocoesCtrl,
            controllerAs: "vm",
            templateUrl: "app/pages/promocoes/promocoes-table.html",
            data: { pageTitle: 'Promocoes' }
        })
         .state('promocoes.update', {
            url: "/putPromotion/:idPromocao",
            controller: promocoesUpdateCtrl,
            controllerAs: "vm",
            templateUrl: "components/form/form.html",
            data: { pageTitle: 'Update Promocoes' }
        })
        .state('produto', {
            abstract: true,
            url: "/produto",
            templateUrl: "components/common/content.html"
        })
        .state('produto.table', {
            url: "/table",
            controller: produtoCtrl,
            controllerAs: "vm",
            templateUrl: "app/pages/produto/produto-table.html",
            data: { pageTitle: 'Produto' }
        })
        .state('produto.add', {
            url: "/addProduct",
            controller: produtoAddCtrl,
            controllerAs: "vm",
            templateUrl: "components/form/form.html",
            data: { pageTitle: 'Add new Produto' }
        })
        .state('produto.update', {
            url: "/putProduct/:idproduto",
            controller: produtoUpdateCtrl,
            controllerAs: "vm",
            templateUrl: "components/form/form.html",
            data: { pageTitle: 'Update Produto' }
        })

        .state('carrinho', {
            abstract: true,
            url: "/carrinho",
            templateUrl: "components/common/content.html"
        })
        .state('carrinho.table', {
            url: "/table",
            controller: carrinhoCtrl,
            controllerAs: "vm",
            templateUrl: "app/pages/carrinho/carrinho-table.html",
            data: { pageTitle: 'Carrinho' }
        })
        .state('entrega', {
            abstract: true,
            url: "/entrega",
            templateUrl: "components/common/content.html"
        })
        .state('entrega.table', {
            url: "/table",
            controller: entregaCtrl,
            controllerAs: "vm",
            templateUrl: "app/pages/entregas/entrega-table.html",
            data: { pageTitle: 'Entregas' }
        })
        .state('compras', {
            abstract: true,
            url: "/compras",
            templateUrl: "components/common/content.html"
        })
         .state('compras.table', {
            url: "/table",
            controller: comprasCtrl,
            controllerAs: "vm",
            templateUrl: "app/pages/compras/compras-table.html",
            data: { pageTitle: 'Compras' }
        })

        ;

    $urlRouterProvider.otherwise('login');

  })
  .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });
