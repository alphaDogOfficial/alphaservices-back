module.exports = [{
    path: '/entrega',
    method: 'get',
    callback: require('./get')
  },
  {
    path: '/entrega/:idEntrega',
    method: 'get',
    callback: require('./getById')
  },
  {
    path: '/entrega',
    method: 'post',
    callback: require('./post')
  },
  {
    path: '/entrega/:idEntrega',
    method: 'put',
    callback: require('./update')
  },
  {
    path: '/entrega/:idEntrega',
    method: 'delete',
    callback: require('./delete')
  }
];
