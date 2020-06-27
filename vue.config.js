module.exports = {
  devServer: {
    port: 8081,
    proxy: {
      "/api/": {
        target: "http://localhost:8080",
        changeOrigin: true
      }
    }
  },
  //编译资源使用相对路径
  publicPath: "./",
  //编译后不生成map
  productionSourceMap: false
};
