var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

module.exports = {
  entry: path.resolve(__dirname, '../src/client/app.js'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /(\.jsx?|\.js?)/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!sass')
      },
      {
        test: /\.vue$/,
        loader: 'vue'
      }
    ]
  },

  sassLoader: {
    includePaths: [path.resolve(__dirname, '../src/client/sass')]
  },

  plugins: [
    new ExtractTextPlugin('style.css', {
      allChunks: true
    })
  ]
};
