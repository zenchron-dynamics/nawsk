const path = require('path');
const webpackMerge = require('webpack-merge');
const DashboardPlugin = require('webpack-dashboard/plugin');

const commonConfig = require('./webpack.common');

const cssLoader = require('./loaders/development/css-loader');
const sassLoader = require('./loaders/development/sass-loader');
const fileLoader = require('./loaders/development/file-loader');
const imageLoader = require('./loaders/development/image-loader');
const fontLoader = require('./loaders/development/font-loader');
const htmlLoader = require('./loaders/shared/html-loader');

const config = {
  mode: 'development',
  target: 'web',
  devtool: 'inline-source-map',
  devServer: {
    watchContentBase: true,
    contentBase: path.join(__dirname, '../src'),
    liveReload: true,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    watchOptions: {
      poll: 1000,
    },
    stats: {
      children: true,
    },
  },
  // devServer: {
  //   publicPath: path.join(__dirname, '../src/views'),
  //   watchContentBase: true,
  //   inline: true,
  //   liveReload: true,
  //   hot: true,
  //   disableHostCheck: true,
  //   historyApiFallback: true,
  //   host: '0.0.0.0',
  //   port: '8080',
  //   headers: {
  //     'Access-Control-Allow-Origin': '*'
  //   },
  //   watchOptions: {
  //     poll: 1000
  //   },
  //   stats: {
  //     children: true
  //   }
  // },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\\/]node_modules[\\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  module: {
    rules: [
      htmlLoader,
      cssLoader,
      sassLoader,
      imageLoader,
      fileLoader,
      fontLoader,
    ],
  },
  plugins: [new DashboardPlugin()],
};

// Let's merge the commons with dev config
const buildConfig = webpackMerge(commonConfig, config);

module.exports = buildConfig;
