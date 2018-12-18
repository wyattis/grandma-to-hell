'use strict'
const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('./config')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    main: './src/index.ts'
  },
  mode: 'development',
  output: {
    path: resolve(__dirname, 'dist'),
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
    extensions: ['.js', '.json', '.ts'],
    alias: {
      '@': resolve('src')
    }
  },
  module: {
    rules: [{
      test: [ /\.vert$/, /\.frag$/ ],
      use: 'raw-loader'
    }, {
      test: /\.tsx?$/,
      use: [{
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
        }
      }],
      exclude: /node_modules/
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
    new webpack.DefinePlugin(Object.assign({
      'CANVAS_RENDERER': JSON.stringify(true),
      'WEBGL_RENDERER': JSON.stringify(true)
    }, Object.keys(config).reduce((agg, key) => {
      agg[key] = JSON.stringify(config[key])
      return agg
    }, {}))),
    new HtmlWebpackPlugin({
      title: 'Grandma to hell'
    })
  ],
  watchOptions: {
    poll: true
  }
};
