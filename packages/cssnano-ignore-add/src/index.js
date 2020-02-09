import { plugin } from 'postcss';

export default plugin('cssnano-ignore-add', (options = {}) => {
  return (root, result) => {
    const msgs = result.messages;
    var declToAdd = [];
    msgs.forEach((msg) => {
      if (msg['cssnano-ignore-plugin'] !== undefined) {
        msg['cssnano-ignore-plugin'].forEach((ignoreData) => {
          declToAdd.push(ignoreData);
        });
      }
    });

    // add the atrules
    root.walkAtRules((atRules) => {
      declToAdd.forEach((decl) => {
        if (
          decl.atRule !== undefined &&
          atRules.name === decl.atRule.name &&
          atRules.params === decl.atRule.params
        ) {
          atRules.walkRules((rules) => {
            if (rules.selector === decl.selector) {
              rules.append({
                prop: decl.prop,
                value: decl.value,
              });
            }
          });
        }
      });
    });

    // add only those with no atrules
    root.walkRules((rules) => {
      declToAdd.forEach((decl) => {
        if (rules.selector === decl.selector && decl.atRule === undefined) {
          rules.append({
            prop: decl.prop,
            value: decl.value,
          });
        }
      });
    });
  };
});
