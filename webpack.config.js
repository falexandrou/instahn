const path    = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AppCachePlugin = require('appcache-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.resolve('index.html'),
  filename: 'index.html',
  inject: 'body',
});

const AppCachePluginConfig = new AppCachePlugin({
  network: [ '*' ],
  settings: ['prefer-online'],
  output: 'instahn.appcache',
});

module.exports = {
  entry: [
    // activate HMR for React
    'react-hot-loader/patch',

    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint
    'webpack-dev-server/client?http://localhost:3000',

    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates
    'webpack/hot/only-dev-server',

    // necessary for HMR to know where to load the hot update chunks
    path.resolve('src/app.jsx'),
  ],

  devtool: 'inline-source-map',

  output: {

    path: path.resolve('dist'),

    filename: 'app.bundle.js',

    // the entry point of our app
    publicPath: '/public/',
  },

  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.s(c|a)ss$/, use: [{ loader: "style-loader" }, { loader: "css-loader", options: { sourceMap: true } }, { loader: "sass-loader", options: { sourceMap: true } }], exclude: /node_modules/ },
      { test: /\.worker\.jsx?$/, loader: 'worker-loader' },
      { test: /\.(png|jpg|svg)$/, loader: 'file-loader' },
    ],
  },

  plugins: [
    // enable HMR globally
    new webpack.HotModuleReplacementPlugin(),

    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),

    // do not emit compiled assets that include errors
    new webpack.NoEmitOnErrorsPlugin(),

    HtmlWebpackPluginConfig,

    AppCachePluginConfig,
  ],

  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      path.resolve('node_modules'),
    ],
    extensions: ['.json', '.js', '.jsx'],
  },

  devServer: {
    host: 'localhost',
    port: 3000,

    // respond to 404s with index.html
    historyApiFallback: true,

    // enable HMR on the server
    hot: true,
  },
};