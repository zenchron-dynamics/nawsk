const path = require('path');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const {merge} = require('webpack-merge');
const baseConfig = require('./webpack.common');
const sassLoader = require('./loaders/production/sass-loader');
const cssLoader = require('./loaders/development/css-loader');
const fileLoader = require('./loaders/development/file-loader');
const imageLoader = require('./loaders/development/image-loader');
const fontLoader = require('./loaders/development/font-loader');
const htmlLoader = require('./loaders/shared/html-loader');

const {getEntries} = require('./utilities/file-loader');

const publicPath = '/';

const config = {
  mode: 'production',
  target: 'web',
  devtool: 'none',
  entry: {},
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name]-[contenthash:8].js',
    chunkFilename: '[name]-[contenthash:8].js',
    publicPath,
  },
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin({
        // A regular expression that indicates the names of the assets that should be optimized \ minimized.
        // The regular expression provided is run against the filenames of the files exported by the
        // ExtractTextPlugin instances in your configuration, not the filenames of your source CSS files.
        // Defaults to /\.css$/g
        assetNameRegExp: /\.optimize\.css$/g,
        // he CSS processor used to optimize \ minimize the CSS, defaults to cssnano. This should be a function
        // that follows cssnano.process interface (receives a CSS and options parameters and returns a Promise).
        cssProcessor: require('cssnano'),
        //  The options passed to the cssProcessor, defaults to {}
        cssProcessorOptions: {},
        // The plugin options passed to the cssProcessor, defaults to {}
        cssProcessorPluginOptions: {
          preset: ['default', {discardComments: {removeAll: true}}],
        },
        canPrint: true, // A boolean indicating if the plugin can print messages to the console, defaults to true
      }),
      new UglifyJsPlugin({
        test: /\.js(\?.*)?$/i,
        parallel: 4,
        cache: true,
        uglifyOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
    runtimeChunk: 'single',
    mergeDuplicateChunks: true,
    splitChunks: {
      name: false,
      chunks: 'all',
      maxSize: 0,
      minChunks: 3,
      maxAsyncRequests: 20, // for HTTP2
      maxInitialRequests: 20, // for HTTP2
      automaticNameDelimiter: '~',
      automaticNameMaxLength: 30,
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2,
          minSize: 0,
          enforce: true,
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          minChunks: 2,
          minSize: 0,
          enforce: true,
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
            )[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace('@', '')}`;
          },
        },
      },
    },
  },
  node: {
    fs: 'empty',
  },
  module: {
    rules: [
      sassLoader,
      cssLoader,
      fileLoader,
      imageLoader,
      fontLoader,
      htmlLoader,
    ],
  },
  plugins: [
    /**
     * All files inside webpack's output.path directory will be removed once, but the
     * directory itself will not be. If using webpack 4+'s default configuration,
     * everything under <PROJECT_DIR>/dist/ will be removed.
     * Use cleanOnceBeforeBuildPatterns to override this behavior.
     *
     * During rebuilds, all webpack assets that are not used anymore
     * will be removed automatically.
     *
     * See `Options and Defaults` for information
     */
    new CleanWebpackPlugin(),
    new webpack.HashedModuleIdsPlugin(), // so that file hashes don't change unexpectedly
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[name].[hash].css',
    }),
    new BundleAnalyzerPlugin(),
  ],
};
const pages = getEntries('./src/views/', 'js');

for (const pathname in pages) {
  // Configured to generate the html file, define paths, etc.
  config.entry[pathname] = path.resolve(
    __dirname,
    '../src/views/' + `${pathname}.js`,
  );
}
const buildConfig = merge(baseConfig, config);

module.exports = buildConfig;
