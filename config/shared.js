/* eslint-disable */
const path = require('path');
const { injectBabelPlugin } = require('react-app-rewired');
const { APP_MODES } = require('./constants');

const rewireAntd = function (config) {
  return injectBabelPlugin(
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ], config);
};

const rewirePolyfill = function (config) {
  config.entry = [].concat('babel-polyfill', config.entry);

  return config;
}

const rewireTSLint = function (config, env) {
  const tslint = {
    include: path.resolve(__dirname, '../', 'src'),
    exclude: [
      /node_modules/,
      /assets/
    ],
    test: /\.tsx?$/,
    enforce: 'pre',
    loader: 'tslint-loader',
    options: {
      emitErrors: env === APP_MODES.Production,
    }
  };

  config.module.rules = [].concat(tslint, config.module.rules);

  return config;
};

module.exports = {
  rewireAntd,
  rewirePolyfill,
  rewireTSLint,
};
