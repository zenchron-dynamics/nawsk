const sassLoader = {
    test: /\.scss$/,
    use: [
        // Creates `style` nodes from JS strings
        'style-loader',
        // Translates CSS into CommonJS
        {
            loader: 'css-loader',
            options: {
                sourceMap: true,
            }
        },
        // Compiles Sass to CSS
        {
            loader: 'sass-loader',
            options: {
                // Prefer `dart-sass`
                implementation: require('sass'),
                sourceMap: true,
            },
        }
    ]
};
module.exports = sassLoader;