'use strict'

module.exports = {
  sourceMap: true,
  parser: 'postcss-scss',
  plugins: [
    // require('precss'),
    require('autoprefixer')({grid: "autoplace"}),
    require('postcss-css-variables')({preserve: true}),
    require('postcss-calc')(),
    require('postcss-object-fit-images'),
  ]
}