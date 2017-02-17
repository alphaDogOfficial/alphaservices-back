module.exports = [{
    path: '/produtoCompra',
    method: 'get',
    callback: require('./get')
  },
  {
    path: '/produtoCompra/:idProduto',
    method: 'get',
    callback: require('./getById')
  },
  {
    path: '/produtoCompra',
    method: 'post',
    callback: require('./post')
  },
  {
    path: '/produtoCompra/:idCompra/:idProduto',
    method: 'put',
    callback: require('./update')
  },
  {
    path: '/produtoCompra/:idCompra/:idProduto',
    method: 'delete',
    callback: require('./delete')
  }
];