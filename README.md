# postcss-ignore-plugin

![CI tests](https://github.com/anikethsaha/postcss-ignore-plugin/workflows/CI%20tests/badge.svg?branch=master&event=push)
![CI Integration tests](https://github.com/anikethsaha/postcss-ignore-plugin/workflows/CI%20Integration%20tests/badge.svg?branch=master&event=push)

Ignore postcss plugins operations in lines using comments

## Status

> ### WORK IN PROGRESS :warning:

**Contribute to make it production ready**

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/anikethsaha/postcss-ignore-plugin)


## Getting started

`$ yarn add postcss-ignore-plugin -D`

and add this it in your `postcss` config

```js
// postcss.config.js
module.exports = {
  plugins: [
    require('postcss-ignore-plugin/remove'), // Important to keep this at the top of the plugins
    require('cssnano'),
    require('autoprefixer'),
    require('stylelint'),
    require('postcss-ignore-plugin/add'), // Important to keep it at the end
  ],
};
```

Now use the following comments whenever you want to ignore any operation for other plugins

- for ignoring a particular line or declaration (css properties) inside of css rule

  ```css
  /* postcss-ignore-line */
  ```

  > Dont use `/* postcss-ignore-line */` for css rules

- for ignoring a whole rule

  ```css
  /* postcss-ignore */
  ```

## How it works

Currently we support only for declaration statement, that mean you can add this comment over CSS declaration line not over the selector list in Rule declaration

`example`

```css
.classname {
  margin: auto;
  /* postcss-ignore-line */
  color: red;
}

/* postcss-ignore */
.classname {
  margin: auto;
  color: red;
}

@media screen and (min-width: 480px) {
  ul {
    /* postcss-ignore-line */
    list-style: none;
  }

  /* postcss-ignore */
  p {
    font-size: 10px;
  }
}
```

It simple remove the next line before running the other plugins and then add them at the end.

## Rules

Use [`stylelint-postcss-ignore`](https://github.com/anikethsaha/stylelint-postcss-ignore) for rules regarding this plugin 's better use

## Tests

this plugins are tested with

- cssnano
- Autoprefixer
- postcss-preset-env
- stylelint
- some custom plugins meant to fail the op
- Indivial tests for each plugins

> There are not many test cases. More will be added soon

## FAQ

- **Can we ignore a whole css `atrules` (like media queries) ?**

  No, you need to use `/* postcss-ignore */` before each rule inside the `atrules`

- **will those ignore rules/properties (declarations) will come back to there original position after all operations?**

  No, both. rules and atrules will append at the end. declarations (rules's properties) will append at the rule itself. and if you have used `/* postcss-ignore */` for a rule inside of atrules, it will get appended for that atrule at the end

- **Does it effect the performance like the build time?**

  Yes _(sometimes for code with many ignore comments )_, but not at a huge level. It slightly decreases the performance as there are 2-3 nested looks so you can notices some issue with huge code with many ignore comments
