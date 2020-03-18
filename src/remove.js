import { plugin } from 'postcss';

export default plugin('postcss-ignore-plugin-remove', () => {
  let ignoredLineData = [];
  let commentsIgnoredRule = [];
  let ignoreRulesData = [];
  // Work with options here
  return (root, result) => {
    // Transform CSS AST here
    root.walkRules((rule) => {
      // Transform each rule here
      rule.walkComments((comment) => {
        if (comment.text === 'postcss-ignore-line') {
          let commentData = {
            commentedLine: comment.source.start.line,
            ignoredLine: comment.source.start.line + 1,
          };
          comment.remove();
          ignoredLineData.push(commentData);
        }
      });
    });
    root.walkComments((comment) => {
      if (comment.text === 'postcss-ignore') {
        commentsIgnoredRule.push({
          commentLine: comment.source.start,
          ruleIgnoreLineNo: comment.source.start.line + 1,
        });
        comment.remove();
      }
    });
    root.walkRules((rule) => {
      rule.walkDecls((decl) => {
        const declLine = decl.source.start.line;
        ignoredLineData.forEach((ignoreData) => {
          if (ignoreData.ignoredLine === declLine) {
            ignoreData.selector = decl.parent.selector;

            ignoreData.prop = decl.prop;
            ignoreData.value = decl.value;
            if (decl.parent.parent.type === 'atrule') {
              ignoreData.atRule = {
                name: decl.parent.parent.name,
                params: decl.parent.parent.params,
              };
            }
            decl.remove();
          }
        });
      });
      commentsIgnoredRule.forEach((data) => {
        if (rule.source.start.line === data.ruleIgnoreLineNo) {
          ignoreRulesData.push({ rule, parent: rule.parent });
          rule.remove();
        }
      });
    });

    result.messages.type = 'postcss-ignore-plugin';
    result.messages.push({
      'postcss-ignore-plugin': { ignoredLineData, ignoreRulesData },
    });
  };
});
