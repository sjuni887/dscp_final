const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/v1',
    createProxyMiddleware({
      target: 'https://api.replicate.com',
      changeOrigin: true,
      secure: false,
      onProxyReq: (proxyReq, req, res) => {
        proxyReq.setHeader('Authorization', `Token ${process.env.REACT_APP_REPLICATE_API_TOKEN}`);
        proxyReq.setHeader('Content-Type', 'application/json');
      },
    })
  );
};
