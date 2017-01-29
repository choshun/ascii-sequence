var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: path.resolve(__dirname, '../app/src/app.js'),
  output: {
    path: path.resolve(__dirname, '../app/static'),
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /(\.jsx?|\.js?)/,
        exclude: /(node_modules)/,
        loader: 'babel'
      },
      {
        test: /\.vue$/,
        loader: 'vue'
      }
    ]
  }
};
