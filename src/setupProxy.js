const { createProxyMiddleware } = require('http-proxy-middleware'); // eslint-disable-line no-console
const IP = `http://localhost:4000`
module.exports = function(app) {
  console.log(app)
  app.use(
    createProxyMiddleware('/api', {
      target: `${IP}`,
      // secure:false,
      logLevel: 'debug',
      changeOrigin: true,
      pathRewrite: {'^/api': ''}
    })
  )
};

