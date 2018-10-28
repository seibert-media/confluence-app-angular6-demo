const merge = require('webpack-merge');
const common = require('./webpack.config.js');

module.exports = function (env, argv) {
  env = env || {};
  env.dev_mode = true;
  return merge.smart(common(env, argv), {
    mode: "development",
    output: {
      publicPath: "http://localhost:9090/"
    },
    devServer: {
      host: 'confluence',
      port: 9090,
      proxy: {
        '/': {
          target: 'http://localhost:1990',
          secure: false,
          prependPath: false
        }
      },
      publicPath: 'http://localhost:9090/',
      historyApiFallback: true
    }
  });
};
