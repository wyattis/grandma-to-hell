'use strict'
const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    main: './src/index.js'
  },
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'grandma-to-hell.[name].[chunkhash].js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
     host: '0.0.0.0',
     allowedHosts: [
      'grandma-to-hell-mereswine.c9users.io'
    ]
  },
  resolve: {
    extensions: ['.js', '.json']
  },
  module: {
    rules: [{
      test: [ /\.vert$/, /\.frag$/ ],
      use: 'raw-loader'
    }, {
      test: /\.json$/,
      type: 'javascript/auto',
      use: 'file-loader'
    }, {
      test: /\.(png|jpg|gif|mp4|mp3|ogg|webm)$/,
      use: 'file-loader'
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'CANVAS_RENDERER': JSON.stringify(true),
      'WEBGL_RENDERER': JSON.stringify(true)
    }),
    new HtmlWebpackPlugin({
      title: 'Grandma to hell'
    })
  ]
};
