const { defineConfig } = require('@vue/cli-service')

let sockjsAlias = {};
try {
  sockjsAlias = { 'sockjs-client': require.resolve('sockjs-client/dist/sockjs.min.js') };
} catch {
  sockjsAlias = {};
}

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8080
  },
  configureWebpack: {
    resolve: {
      fallback: {
        net: false,
        tls: false
      },
      alias: sockjsAlias
    }
  }
})
