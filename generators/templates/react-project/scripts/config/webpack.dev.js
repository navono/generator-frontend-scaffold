const { merge } = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')

const common = require('./webpack.common')
const { PROJECT_PATH, SERVER_HOST, SERVER_PORT } = require('../constant')


module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  target: 'web',
  output: {
    filename: 'js/[name].js',
    path: path.resolve(PROJECT_PATH, './dist')
  },
  devServer: {
    host: SERVER_HOST,
    port: SERVER_PORT,
    compress: true,
    open: true,
    hot: true,
  },
  stats: 'errors-only',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  optimization: {
    minimize: false,
    minimizer: [],
    splitChunks: {
      chunks: 'all',
      minSize: 0,
    },
  },
})