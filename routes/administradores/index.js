module.exports = [{
    path: '/administrador',
    method: 'get',
    callback: require('./get')
  },
  {
    path: '/administrador/:cpf',
    method: 'get',
    callback: require('./getById')
  },
  {
    path: '/administrador',
    method: 'post',
    callback: require('./post')
  },
  {
    path: '/administrador/:cpf',
    method: 'put',
    callback: require('./update')
  },
  {
    path: '/administrador/:cpf',
    method: 'delete',
    callback: require('./delete')
  }
];
