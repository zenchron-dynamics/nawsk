const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHardiskPlugin = require('html-webpack-harddisk-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const LinkTypePlugin = require('html-webpack-link-type-plugin')
    .HtmlWebpackLinkTypePlugin;
const {getEntries} = require('./utilities/file-loader');
const entries = getEntries('./src/views/', 'html');
const logoPath = path.resolve(__dirname, '../src/assets/logo.png');

const config = {
    mode: 'none',
    entry: Object.assign(entries, {
        index: './src/javascript/index.ts',
    }),
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts', '.tsx', '.js'],
    },
    plugins: [
        new StyleLintPlugin({
            configFile: path.resolve(__dirname, '../stylelint.config.js'),
            context: path.resolve(__dirname, '../src'),
            // files: '**/*.css',
            failOnError: false,
            quiet: false,
        }),
    ],
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
            minifyURLs: true,
        },
    };
    config.plugins.push(new HtmlWebpackPlugin(conf));
}


// const eslint = {
//     rules: [
//         {
//             test: /\.(ts|tsx)$/,
//             enforce: 'pre',
//             use: [
//                 {
//                     loader: require.resolve('eslint-loader'),
//                     options: {
//                         eslintPath: require.resolve('eslint'),
//                         fix: true,
//                         emitError: true,
//                     },
//                 },
//             ],
//             exclude: /node_modules/,
//         },
//         {
//             enforce: 'pre',
//             test: /\.js$/,
//             exclude: /node_modules/,
//             loader: 'eslint-loader',
//             options: {
//                 fix: true,
//                 emitError: true,
//             },
//         },
//         {
//             test: /\.ts(x?)$/,
//             exclude: /(node_modules|bower_components)/,
//             use: [
//                 {
//                     loader: 'babel-loader',
//                     options: {
//                         configFile: path.resolve(__dirname, '../babel.config.js'),
//                         cacheDirectory: true,
//                     },
//                 },
//             ],
//         },
//     ],
// }
config.plugins.push(
    new HtmlWebpackHardiskPlugin({
        outputPath: path.resolve(__dirname, '../dist'),
    }),
    new FaviconsWebpackPlugin(logoPath), // svg works too!
    new LinkTypePlugin(),
    // new ESLintPlugin(eslint)
);

module.exports = config;
