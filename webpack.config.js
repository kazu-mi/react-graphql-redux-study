const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const precss = require('precss');
const autoprefixer = require('autoprefixer');

const APP = path.join(__dirname, 'app');
const BUILD = path.join(__dirname, 'build');
const STYLE = path.join(__dirname, 'app/style.css');
const PUBLIC = path.join(__dirname, 'app/public');
const TEMPLATE = path.join(__dirname, 'app/template/index.html');
const NODE_MODULES = path.join(__dirname, 'node_modules');
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;

module.exports = {
  entry: {
    app: APP,
    style: STYLE,
  },
  output: {
    path: BUILD,
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
        include: APP,
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
        include: [APP, NODE_MODULES],
      },
      {
        test: /\.json$/,
        loaders: 'json-loader',
        include: [APP, NODE_MODULES],
      },
    ],
  },
  devtool: 'eval-source-map',
  devServer: {
    historyApiFallback: true,
    hot: true,
    progress: true,
    host: HOST,
    port: PORT,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([
      { from: PUBLIC, to: BUILD },
    ], {
      ignore: ['.DS_Store'],
    }),
    new HtmlWebpackPlugin({
      template: TEMPLATE,
      inject: 'body',
    }),
  ],
}