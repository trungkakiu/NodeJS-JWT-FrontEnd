const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/kcntt',
    createProxyMiddleware({
      target: 'http://220.231.119.171',
      changeOrigin: true,
      secure: false, 
      cookieDomainRewrite: "localhost", 
    })
  );
};
