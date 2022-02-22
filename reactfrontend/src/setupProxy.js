const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  console.log("setup proxy worked, proxy to /api to port 5000");
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:5000",
      changeOrigin: true,
    })
  );
};
