module.exports = [{
    path: '/carrinho',
    method: 'get',
    callback: require('./get')
  },
  {
    path: '/carrinho/:cpf',
    method: 'get',
    callback: require('./getById')
  },
  {
    path: '/carrinho/:cpf/:idProduto',
    method: 'delete',
    callback: require('./delete')
  },
  {
    path: '/carrinho/:cpf',
    method: 'put',
    callback: require('./update')
  },
  {
    path: '/carrinho',
    method: 'post',
    callback: require('./post')
  }
];
