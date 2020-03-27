const path = require('path');

const paths = {
  "@components": path.resolve(__dirname, 'src/components')
};

module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: paths
        }
      ]
    ]
  };
};
