var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'client/index.jsx'),
    vendors: ['react']
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },

  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel'
    },
    {
      test: /\.scss?$/,
      loader: 'style!css!sass'
    },
    {
      test: /\.jpeg?$/,
      loader: 'url?limit=25000'
    }],
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules', 'bower_components', './client'],
    alias: {
      jquery: path.resolve(__dirname, 'node_modules/jquery/dist/jquery.min.js')
    }
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ]
};
