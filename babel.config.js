const presets = [
  [
    '@babel/preset-env',
    {
      targets: {
        edge: '17',
        ie: '11',
        firefox: '50',
        chrome: '64',
        safari: '11.1',
      },

      // использовать полифиллы для браузеров из свойства target
      // по умолчанию babel использует поллифиллы библиотеки core-js
      useBuiltIns: 'entry',
      corejs: '^3.27.1',
    },
  ],
];

module.exports = { presets };
