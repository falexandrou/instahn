const path    = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const commonConfig = require("./webpack.config.babel.js");
const CompressionPlugin = require("compression-webpack-plugin");

let config = Object.assign({}, commonConfig, {
  devtool: false,
});

config.plugins.push(
  new CompressionPlugin({
    asset: "[path].gz[query]",
    algorithm: "gzip",
    test: /\.js$|\.css$|\.html$/,
    threshold: 10240,
    minRatio: 0,
  })
);

module.exports = config;