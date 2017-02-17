module.exports = [{
    path: '/funcionario',
    method: 'get',
    callback: require('./get')
  },
  {
    path: '/funcionario/:cpf',
    method: 'get',
    callback: require('./getById')
  },
  {
    path: '/funcionario',
    method: 'post',
    callback: require('./post')
  },
  {
    path: '/funcionario/:cpf',
    method: 'put',
    callback: require('./update')
  },
  {
    path: '/funcionario/:cpf',
    method: 'delete',
    callback: require('./delete')
  }
];
