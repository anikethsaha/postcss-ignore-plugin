const postcss = require('postcss');

module.exports = postcss.plugin(
  'postcss-ignore-test-plugin',
  (options = { data: [] }) => {
    const { data } = options;
    return (root, result) => {
      const pluginHolder = 'postcss-ignore';
      result.messages.type = pluginHolder;
      result.messages.push({
        [pluginHolder]: data, //  Array<Object>
      });
    };
  }
);
