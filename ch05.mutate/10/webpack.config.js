const path = require('path');

const entry = [ './source/index' ];

const output = {
  path: path.resolve(__dirname, 'public/js'),
  filename: 'app.js',
};

const resolve = {
  extensions: [ '', '.js', '.jsx' ],
};

const scriptLoader = {
  loader: 'babel-loader',
  include: path.resolve(__dirname, 'source'),
  test: /\.jsx$|\.js$/,
};

const devServer = {
  historyApiFallback: true,
  proxy: {
    '/api*': 'http://localhost:8181',
  },
  stats: 'errors-only',
  overlay: {
    errors: true,
    warnings: true,
  },
};

module.exports = {
  devtool: 'eval',
  entry,
  output,
  resolve,
  module: { loaders: [ scriptLoader ] },
  devServer,
};
