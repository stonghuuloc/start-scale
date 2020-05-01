'use strict'

const utils = require('./utils')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const config = require('./config')

const themePath = utils.themePath(config.targetDomain)

module.exports = merge(baseConfig, {
  mode: 'development',
  output: {
    // path: utils.resolve(`../../site/web${themePath}/public`),
    path: utils.resolve('../web/public'),
    pathinfo: false,
    filename: 'js/[name].js',
    // publicPath: `${themePath}/public/`
    publicPath: './'
  },

  plugins: [
    new CopyWebpackPlugin([{
      from: utils.resolve('assets/static/img'),
      // to: utils.resolve(`../../site/web${themePath}/public/img`),
      to: utils.resolve('../web/public/img'),
      toType: 'dir'
    }])
  ]
})
