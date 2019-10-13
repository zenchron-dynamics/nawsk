const cssLoader = {
    test: /\.css$/,
    use: [
        {
            // creates style nodes from JS strings
            loader: "style-loader",
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
        // {
        //     loader: 'postcss-loader',
        //     options: {
        //         parser: 'sugarss', exec: true,
        //         config: {
        //             path: __dirname + './postcss.config.js'
        //         }
        //     }
        // }
    ]
};

module.exports = cssLoader;