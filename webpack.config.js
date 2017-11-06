const webpack = require('webpack'),
path = require('path')

const BUILD_DIR = path.resolve(__dirname,'dist');
const APP_DIR = path.resolve(__dirname, 'src');

module.exports = {
entry: [
  path.resolve(__dirname, 'src/index.js')
],
output: {
  path: BUILD_DIR,
  filename: 'jq.js',
  publicPath: '/'
},
resolve: {
  alias: {
    '@': APP_DIR,
  }
},
module: {
  rules: [
      {
          test: /\.js$/,
          loader: 'babel-loader',
          include: [
              APP_DIR
          ]
      }
  ]
}
}
