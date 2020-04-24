'use strict'

const HtmlWebpackPlugin = require('html-webpack-plugin')
// const NunjucksWebpackPlugin = require('nunjucks-webpack-plugin')
// const CopyWebpackPlugin = require('copy-webpack-plugin')
// const MagicImporter = require('node-sass-magic-importer')
const glob = require('glob-all');
const globImporter = require('node-sass-glob-importer')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const PurgecssPlugin = require('purgecss-webpack-plugin')
const MergeIntoSingleFilePlugin = require('webpack-merge-and-include-globally')
// const { VueLoaderPlugin } = require('vue-loader')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const utils = require('./utils')
const development = process.env.NODE_ENV === 'development'

const pages = glob.sync('*.njk', {
  cwd: utils.resolve('assets/views'),
  root: '/',
}).map(page => new HtmlWebpackPlugin({
  filename: page.replace('njk', 'html'),
  template: utils.resolve(`assets/views/${page}`),
}));

const PATHS = {
  layouts: utils.resolve('assets/views/templates/layouts'),
  macros: utils.resolve('assets/views/templates/macros'),
  partials: utils.resolve('assets/views/templates/partials')
}

module.exports = {
  entry: {
    // 'polyfill': ['core-js/stable', 'regenerator-runtime/runtime'],
    app: './src/index.js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      // 'vue$': 'vue/dist/vue.esm.js',
      '@': utils.resolve('src'),
      'assets': utils.resolve('assets'),
    }
  },

  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        include: utils.resolve('src'),
        use: 'eslint-loader',
        enforce: 'pre'
      },
      // {
      //   test: /\.vue$/,
      //   use: ['cache-loader', 'vue-loader']
      // },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: utils.resolve('src'),
        use: ['cache-loader', 'babel-loader']
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: utils.assetsPath('css/[name].css'),
            }
          },
          {
            loader: 'extract-loader'
          },
          'cache-loader',
          {
            loader: 'css-loader?-url',
            options: { sourceMap: development, importLoaders: 1 }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function (loader) {
                return loader.resourcePath.indexOf('style.') > -1
                ? [require('autoprefixer')]
                : [
                    require('autoprefixer'), 
                    require('postcss-css-variables')({preserve: true}), 
                    require('postcss-calc'),
                    require('postcss-object-fit-images')
                  ];
              }
            }
          }, 
          {
            loader: 'sass-loader',
            options: {
              sourceMap: development,
              importer: globImporter()
            }
          },
        ]
      },
      {
        test: /\.(html|njk|nunjucks)$/,
        include: utils.resolve('assets/views'),
        use: [
          'cache-loader',
          'html-loader', 
          {
            loader: 'nunjucks-html-loader',
            options: {
              searchPaths: [utils.resolve('assets/views/templates')],
            }
          }
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        // include: utils.resolve('assets/static/img'),
        use: [
          'cache-loader',
          {
            loader: 'file-loader',
            options: {
              limit: 10000,
              name: '[name].[ext]',
              outputPath: 'img/'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75
              }
            },
          },
        ],
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        include: utils.resolve('assets/static/media'),
        use: [
          'cache-loader',
          'url-loader',
          {
            loader: 'file-loader',
            options: {
              limit: 10000,
              name: '[name].[ext]',
              outputPath: 'img/media/'
            }
          }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 10000,
              name: '[name].[ext]',
              outputPath: 'fonts/',
            }
          },
        ]
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),
    ...pages,
    // new VueLoaderPlugin(),
    // new MiniCssExtractPlugin({
    //   filename: 'css/[name].css',
    // }),
    new MergeIntoSingleFilePlugin({ // 👈  merge util.js and components .js files
      files: [
        {
          src: [utils.resolve('node_modules/codyhouse-framework/main/assets/js/util.js')],
          dest: code => {
            const min = require("uglify-js").minify(code);

            return {
              'js/util.js': min.code
            }
          }
        }
      ]
    }),
    new PurgecssPlugin({
      paths: glob.sync([
        `${PATHS.layouts}/*.njk`,
        `${PATHS.macros}/**/*.njk`,
        `${PATHS.partials}/**/*.njk`
      ]),
      whitelistPatterns: [/^animated/, /^delay/, /^fade/, /^is-/, /^v-/, /^circular$/, /^tns/, /^vue-lb-/, /^col/, /^modal/, /@/, /^crop/, /%$/],
      whitelistPatternsChildren: [/^el-/]
    })
  ]
}