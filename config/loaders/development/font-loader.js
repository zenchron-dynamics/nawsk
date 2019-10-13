const fontLoader = {
    // Load all icons
    test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
    use: [
        {
            loader: 'file-loader',
        }
    ]
};

module.exports = fontLoader;