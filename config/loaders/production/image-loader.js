const imageLoader = {
    test: /\.(png|jpg|gif)$/i,
    use: [
        {
            loader: 'url-loader',
            options: {
                limit: 8192,
                fallback: require.resolve('responsive-loader'),
            },
        }
    ]
};

module.exports = imageLoader;