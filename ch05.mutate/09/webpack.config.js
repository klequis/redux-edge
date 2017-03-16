const path = require('path');
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;


const entry = [ './source/index' ];

const output = {
  path: path.resolve(__dirname, 'public/js'),
  filename: 'app.js',
};

const resolve = {
  extensions: [ '', '.js', '.jsx' ],
};

const scriptLoader = {
  loader: 'babel',
  include: path.resolve(__dirname, 'source'),
  test: /\.jsx$|\.js$/,
};

const devServer = {
  historyApiFallback: true,
  hot: true,
  progress: true,

  stats: 'errors-only',

  host: HOST,
  port: PORT,

  // CopyWebpackPlugin: This is required for webpack-dev-server.
  // The path should be an absolute path to your build destination.
  outputPath:  path.resolve(__dirname, 'public/js'),
};

module.exports = {
  devtool: 'eval',
  entry,
  output,
  resolve,
  module: { loaders: [ scriptLoader ] },
  devServer,
};
