const postcss = require('postcss');

module.exports = postcss.plugin(
  'cssnano-test-plugin',
  (options = { data: [] }) => {
    const { data } = options;
    return (root, result) => {
      result.messages.push({
        'cssnano-ignore-plugin': data, //  Array<Object>
      });
    };
  }
);
