const htmlLoader = {
  test: /\.(html)$/,
  use: {
    loader: 'html-loader',
    options: {
      attributes: true
    },
  },
};
module.exports = htmlLoader;
