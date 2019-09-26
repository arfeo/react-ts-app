const rewirePolyfill = function (config) {
  config.entry = [].concat('babel-polyfill', config.entry);

  return config;
};

module.exports = {
  rewirePolyfill,
};
