import { plugin } from 'postcss';

export default plugin('cssnano-ignore-remove', () => {
  let commentsIgnoredData = [];
  // Work with options here
  return (root, result) => {
    // Transform CSS AST here
    root.walkRules((rule) => {
      // Transform each rule here
      rule.walkComments((comment) => {
        if (comment.text === 'cssnano-ignore-line') {
          let commentData = {
            commentedLine: comment.source.start.line,
            ignoredLine: comment.source.start.line + 1,
          };
          commentsIgnoredData.push(commentData);
        }
      });
    });
    root.walkRules((rule) => {
      rule.walkDecls((decl) => {
        const declLine = decl.source.start.line;
        commentsIgnoredData.forEach((ignoreData) => {
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
    });

    result.messages.type = 'cssnano-ignore-plugin';
    result.messages.push({
      'cssnano-ignore-plugin': commentsIgnoredData,
    });
  };
});
