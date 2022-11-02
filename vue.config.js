const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    open: true,
    onBeforeSetupMiddleware: function (devServer) {
      if (!devServer) {
        throw new Error("webpack-dev-server is not defined");
      }
    },
    // before: require("./mock/index.js"), //用before的属性来拦截处理mock中的index.js文件，需要在mock文件夹下新建一个index.js
  },
});
