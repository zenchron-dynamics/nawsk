'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHardiskPlugin = require('html-webpack-harddisk-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const CspHtmlWebpackPlugin = require('csp-html-webpack-plugin');
const LinkTypePlugin = require('html-webpack-link-type-plugin').HtmlWebpackLinkTypePlugin;

const { getEntries } = require('./utilities/file-loader');

const logoPath = path.resolve(__dirname, '../src/assets/logo.png');

const config = {
  mode: 'none',
  entry: Object.assign({ entries, index: './src/javascript/index.js' }),
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new StyleLintPlugin({
      configFile: path.resolve(__dirname, 'stylelint.config.js'),
      context: path.resolve(__dirname, '../src'),
      // files: '**/*.css',
      failOnError: false,
      quiet: false
    })
  ]
};

const pages = getEntries('./src/views/', 'html');

for (const pathName in pages) {
  // Configured to generate the html file, define paths, etc.
  const conf = {
    filename: `${pathName}.html`, // html output pathname
    template: path.resolve(__dirname, `.${pages[pathName]}`), // Template path
    inject: true,
    showErrors: true,
    appMountId: 'application',
    alwaysWriteToDisk: true,
    chunks: 'all',
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: false,
      useShortDoctype: true,
      removeEmptyAttributes: false,
      removeStyleLinkTypeAttributes: false,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true
    }
  };
  config.plugins.push(new HtmlWebpackPlugin(conf));
}

config.plugins.push(
  new HtmlWebpackHardiskPlugin({
    outputPath: path.resolve(__dirname, '../dist')
  }),
  new FaviconsWebpackPlugin(logoPath), // svg works too!
  new CspHtmlWebpackPlugin(
    {
      'base-uri': "'self'",
      'object-src': "'none'",
      'script-src': ["'unsafe-inline'", "'self'", "'unsafe-eval'"],
      'style-src': ["'unsafe-inline'", "'self'", "'unsafe-eval'"]
    },
    {
      enabled: true,
      hashingMethod: 'sha256',
      hashEnabled: {
        'script-src': true,
        'style-src': true
      },
      nonceEnabled: {
        'script-src': true,
        'style-src': true
      }
    }
  ),
  new LinkTypePlugin()
);
module.exports = config;
