module.exports = function(api) {
  api.cache(true);

  const presets = [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        corejs: '3.3.4',
      },
    ],
    '@babel/preset-typescript',
  ];
  const plugins = [
    ['@babel/plugin-proposal-class-properties', {loose: true}],
    ['@babel/plugin-transform-classes', {loose: true}],
    ['@babel/plugin-transform-arrow-functions', {spec: true}],
    ['@babel/plugin-transform-spread', {loose: true}],
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-transform-runtime',
    '@babel/plugin-transform-literals',
  ];

  return {
    presets,
    plugins,
  };
};
