const postCSSLoader = require('../shared/postcss-loader');

const cssLoader = {
    test: /\.css$/,
    use: [
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
        },
        postCSSLoader,
    ]
};
module.exports = cssLoader;
