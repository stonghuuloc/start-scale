'use strict'

const path = require('path')

module.exports = {
  resolve: function (dir) {
    return path.join(__dirname, '..', dir)
  },

  assetsPath: function (_path) {
    const assetsSubDirectory = ''
    return path.posix.join(assetsSubDirectory, _path)
  },
  themePath: function (domain) {
    const themeName = domain.split('.').join('-')
    return path.join('/wp-content/themes', `${themeName}`)
  },
  productionPath: function (_root, _path) {
    return path.join(_root, _path);
  }
}
