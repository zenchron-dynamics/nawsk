const htmlLoader = {
  test: /\.(html)$/,
  use: {
    loader: 'html-loader',
  },
};
module.exports = htmlLoader;
