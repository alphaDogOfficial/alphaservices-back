module.exports = [{
    path: '/endereco',
    method: 'get',
    callback: require('./get')
  },
  {
    path: '/endereco/:idCliente',
    method: 'get',
    callback: require('./getById')
  },
  {
    path: '/endereco',
    method: 'post',
    callback: require('./post')
  },
  {
    path: '/endereco/:idEndereco',
    method: 'put',
    callback: require('./update')
  },
  {
    path: '/endereco/:idEndereco',
    method: 'delete',
    callback: require('./delete')
  }
];
