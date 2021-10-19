const path = require('path');

const postCSSLoader = {
    loader: 'postcss-loader',
    options: {
        config: {
            path: path.join(__dirname, '../../../postcss.config.js')
        }
    }
};
module.exports = postCSSLoader;