module.exports = [{
    path: '/compra',
    method: 'get',
    callback: require('./get')
  },
  {
    path: '/compra/:id',
    method: 'get',
    callback: require('./getById')
  },
  {
    path: '/compraByClient/:id',
    method: 'get',
    callback: require('./getByClient')
  },
  {
    path: '/compra/:idCompra',
    method: 'put',
    callback: require('./update')
  },
  {
    path: '/compra/',
    method: 'post',
    callback: require('./post')
  }
];
