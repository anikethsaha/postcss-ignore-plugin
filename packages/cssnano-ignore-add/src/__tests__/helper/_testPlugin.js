const postcss = require('postcss');

module.exports = postcss.plugin(
  'cssnano-test-plugin',
  (options = { data: [] }) => {
    const { data } = options;
    return (root, result) => {
      const pluginHolder = 'cssnano-ignore-plugin';
      result.messages.type = pluginHolder;
      result.messages.push({
        [pluginHolder]: data, //  Array<Object>
      });
    };
  }
);
