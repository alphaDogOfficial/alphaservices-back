module.exports =
[{
  path: '/login',
  method: 'post',
  callback: require('./login')
},
{
  path: '/login/tradesports',
  method: 'post',
  callback: require('./loginTradesports')
}];
