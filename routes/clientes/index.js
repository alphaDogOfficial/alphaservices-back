module.exports = [{
    path: '/cliente',
    method: 'get',
    callback: require('./get')
  },
  {
    path: '/cliente/:cpf',
    method: 'get',
    callback: require('./getById')
  },
  {
    path: '/cliente',
    method: 'post',
    callback: require('./post')
  },
  {
    path: '/cliente/:cpf',
    method: 'put',
    callback: require('./update')
  },
  {
    path: '/cliente/:cpf',
    method: 'delete',
    callback: require('./delete')
  },
  {
    path: '/cliente/check/:atributo/:q',
    method: 'get',
    callback: require('./checkUser')
  }
];
