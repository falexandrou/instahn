const path              = require('path');
const webpack           = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AppCachePlugin    = require('appcache-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.resolve(__dirname, 'src/index.html'),
  filename: 'index.html',
  inject: 'body',
});

const AppCachePluginConfig = new AppCachePlugin({
  cache: null,
  settings: ['fast'],
  output: 'instahn.appcache',
  fallback: ['/', '/index.html', 'index.html'],
});

module.exports = {
  entry: [
    // necessary for HMR to know where to load the hot update chunks
    path.resolve('src/app.jsx'),
  ],

  devtool: false,

  output: {
    path: path.resolve('dist'),
    filename: 'app.bundle.js',
    // the entry point of our app
    publicPath: '',
  },

  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.s(c|a)ss$/, use: [{ loader: "style-loader" }, { loader: "css-loader", options: { sourceMap: true } }, { loader: "sass-loader", options: { sourceMap: true } }], exclude: /node_modules/ },
      { test: /\.(png|jpg|svg)$/, loader: 'file-loader' },
    ],
  },

  plugins: [
    new CopyWebpackPlugin([
      { from: path.join(path.resolve(__dirname, 'assets'), '**/*'), to: path.resolve(__dirname, 'dist') },
    ]),
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

  devServer: {},
};