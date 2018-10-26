const merge = require('webpack-merge');
const common = require('./webpack.config.js');

module.exports = function (env, argv) {
  env = env || {};
  env.dev_mode = true;
  return merge.smart(common(env, argv), {
    mode: "development",
    output: {
      publicPath: "http://confluence:9090/"
    },
    devServer: {
      host: 'confluence',
      port: 9090,
      proxy: {
        '/': {
          target: 'http://confluence:8090',
          secure: false,
          prependPath: false
        }
      },
      publicPath: 'http://confluence:9090/',
      historyApiFallback: true
    }
  });
};
