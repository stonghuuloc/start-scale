'use strict'

const utils = require('./utils')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const HtmlCriticalWebpackPlugin = require("html-critical-webpack-plugin")
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const config = require('./config')
const themePath = utils.themePath(config.targetDomain)

module.exports = merge(baseConfig, {
  mode: 'production',

  output: {
    path: utils.resolve(`../../site/web${themePath}/public`),
    pathinfo: true,
    filename: 'js/[name].js',
    publicPath: `${themePath}/public/`
  },

  optimization: {
    minimize: true,
    sideEffects: false,
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 6,
      maxInitialRequests: 4,
      automaticNameDelimiter: '-',
      automaticNameMaxLength: 30,
      name: true,
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      },
    },
    minimizer: [
      new TerserPlugin({
        parallel: true,
        extractComments: true,
      }),
      // new UglifyJsPlugin({parallel: true}),
      new OptimizeCSSAssetsPlugin({
        cssProcessorPluginOptions: {
          parser: require('postcss-safe-parser'),
          preset: ['default', { discardComments: { removeAll: true } }],
        }
      }),
    ]
  },

  plugins: [
    new CopyWebpackPlugin([{
      from: utils.resolve('assets/static/img'),
      to: utils.resolve(`../../site/web${themePath}/public/img`),
      toType: 'dir'
    }]),
    new BundleAnalyzerPlugin()
  ]
})
