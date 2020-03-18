import { plugin } from 'postcss';

export default plugin('postcss-ignore-plugin-add', () => {
  return (root, result) => {
    if (result.messages.type !== 'postcss-ignore-plugin') {
      return;
    }

    const msgs = result.messages;
    let declToAdd = [],
      rulesToAdd = [];

    msgs.forEach((msg) => {
      if (msg['postcss-ignore-plugin'] !== undefined) {
        msg['postcss-ignore-plugin'].ignoredLineData.forEach((ignoreData) => {
          declToAdd.push(ignoreData);
        });
        msg['postcss-ignore-plugin'].ignoreRulesData.forEach((ignoredRule) => {
          rulesToAdd.push(ignoredRule);
        });
      }
    });

    // add decl to  atrules
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

    // add decl only those with no atrules
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

    // add rules
    rulesToAdd = rulesToAdd.filter((rule) => {
      if (rule.parent.type !== 'atrule') {
        root.append(rule.rule);
        return false;
      }
      return true;
    });

    // add rules to artules
    root.walkAtRules((atrule) => {
      rulesToAdd = rulesToAdd.filter((rule) => {
        if (atrule.params === rule.parent.params) {
          atrule.append(rule.rule);
          return false;
        }
        return true;
      });
    });
  };
});
