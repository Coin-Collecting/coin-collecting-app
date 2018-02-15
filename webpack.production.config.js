let webpack = require('webpack');
let path = require('path');
let loaders = require('./webpack.loaders');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let WebpackCleanupPlugin = require('webpack-cleanup-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

let config = require('./config')['production'];

loaders.push({
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract({fallback: 'style-loader', use : 'css-loader?sourceMap&localIdentName=[local]___[hash:base64:5]!sass-loader?outputStyle=expanded'}),
  exclude: ['node_modules']
});

module.exports = {
  entry: [
    './src/index.jsx',
  ],
  output: {
    publicPath: './',
    path: path.join(__dirname, 'public'),
    filename: 'scripts.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders
  },
  plugins: [
    new WebpackCleanupPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      template: './src/template.html',
      files: {
        css: ['style.css'],
        js: ['bundle.js'],
      }
    }),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('development'),
				'API_URL': JSON.stringify(config.api.url),
				'DOMAIN': JSON.stringify(config.url),
			}
		})
  ]
};
