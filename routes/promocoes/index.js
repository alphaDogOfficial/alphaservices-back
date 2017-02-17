module.exports = [{
    path: '/promocoes',
    method: 'get',
    callback: require('./get')
  },
  {
    path: '/promocoes/:idPromocao',
    method: 'get',
    callback: require('./getById')
  },
  {
    path: '/promocoes/:idPromocao',
    method: 'put',
    callback: require('./update')
  }
];