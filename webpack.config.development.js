const path    = require('path');
const webpack = require('webpack');
const commonConfig = require("./webpack.config.babel.js");

let config = Object.assign({}, commonConfig, {
  entry: [].concat(commonConfig.entry, [
    // activate HMR for React
    'react-hot-loader/patch',

    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint
    'webpack-dev-server/client?http://localhost:3000',

    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates
    'webpack/hot/only-dev-server',
  ]),
  devtool: 'inline-source-map',
  output: Object.assign({}, commonConfig.output, {
    publicPath: '/',
  }),
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    host: 'localhost',
    port: 3000,

    // respond to 404s with index.html
    historyApiFallback: true,

    // enable HMR on the server
    hot: true,
  }
});

// Copy assets to the `dist` folder
config.plugins = config.plugins.concat([
  // prints more readable module names in the browser console on HMR updates
  new webpack.NamedModulesPlugin(),

  // do not emit compiled assets that include errors
  new webpack.NoEmitOnErrorsPlugin(),

  new webpack.HotModuleReplacementPlugin()
]);

module.exports = config;