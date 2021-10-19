module.exports = {
  map: false,
  plugins: {
    'postcss-import': {},
    'postcss-placehold': {},
    'postcss-preset-env': {
      browsers: 'last 2 versions',
    },
    'autoprefixer': {},
    'postcss-browser-reporter': {},
    'postcss-reporter': {},
  },
};