import { plugin } from 'postcss';

export default plugin('postcss-ignore-add', () => {
  return (root, result) => {
    if (result.messages.type !== 'postcss-ignore') {
      return;
    }

    const msgs = result.messages;
    let declToAdd = [];
    msgs.forEach((msg) => {
      if (msg['postcss-ignore'] !== undefined) {
        msg['postcss-ignore'].forEach((ignoreData) => {
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
