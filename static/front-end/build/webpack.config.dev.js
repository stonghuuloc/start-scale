'use strict'

const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
// const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');

const utils = require('./utils')

const HOST = 'localhost'
const PORT = 8081

module.exports = merge(baseConfig, {
  mode: 'development',

  output: {
    path: utils.resolve('public'),
    filename: 'js/[name].js',
    publicPath: '/'
  },

  devServer: {
    clientLogLevel: 'warning',
    hot: true,
    contentBase: [utils.resolve('assets'), utils.resolve('src')],
    // compress: true,
    host: HOST,
    port: PORT,
    open: true,
    overlay: { warnings: false, errors: true },
    publicPath: '/',
    quiet: true,
    watchContentBase: true
  },

  plugins: [
    // new BrowserSyncPlugin({
    //   host: HOST,
    //   port: 3000,
    //   // proxy the Webpack Dev Server endpoint
    //   // (which should be serving on http://localhost:8082/)
    //   // through BrowserSync
    //   proxy: 'http://localhost:8082/'
    // }, {
    //   // prevent BrowserSync from reloading the page
    //   // and let Webpack Dev Server take care of this
    //   // reload: false
    // }),
    new CopyWebpackPlugin([{
      from: utils.resolve('assets/static/img'),
      to: utils.resolve('public/img'),
      toType: 'dir'
    }])
    // new webpack.HotModuleReplacementPlugin()
  ]
})
