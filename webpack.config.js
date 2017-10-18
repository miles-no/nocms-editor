const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const path = require('path');

const host = '0.0.0.0';
const port = '9000';

const config = {
  entry: './example/src',
  devtool: 'source-map',
  output: {
    path: `${__dirname}/example/build`,
    filename: 'app.js',
    publicPath: `${__dirname}/example`,
  },
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel',
        exclude: /node_modules/,
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    alias: {
      'nocms-editor': '../../src',
    },
  },
};

new WebpackDevServer(webpack(config), {
  contentBase: './example',
  hot: true,
  debug: true,
}).listen(port, host, (err, result) => {
  if (err) {
    console.log(err);
  }
});
console.log('-------------------------');
console.log(`Local web server runs at http://${host}:${port}`);
console.log('-------------------------');

module.exports = config;
