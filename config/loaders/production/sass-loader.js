const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const sassLoader = {
    test: /\.scss$/,
    use: [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                publicPath: '../../dist',
            }
        },
        // Translates CSS into CommonJS
        {
            loader: 'css-loader',
            options: {
                sourceMap: false,
            }
        },
        // Compiles Sass to CSS
        {
            loader: 'sass-loader',
            options: {
                // Prefer `dart-sass`
                implementation: require('sass'),
                sourceMap: false,
            },
        }
    ]
};
module.exports = sassLoader;