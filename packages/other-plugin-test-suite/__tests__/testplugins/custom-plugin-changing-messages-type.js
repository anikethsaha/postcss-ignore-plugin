const postcss = require('postcss');

module.exports = postcss.plugin('custom-plugin-changing-messages-type', () => {
  return (root, result) => {
    result.messages.type = 'custom-plugin-changing-messages-type';
  };
});
