const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const cssLoader = {
  test: /\.css$/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: path.join(__dirname, 'dist')
      }
    },
    {
      // creates style nodes from JS strings
      loader: 'style-loader',
      options: {
        sourceMap: true
      }
    },
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
        sourceMap: true
      }
    }
  ]
};

module.exports = cssLoader;
