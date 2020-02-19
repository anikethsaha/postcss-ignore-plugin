# postcss-ignore-plugin

![CI tests](https://github.com/anikethsaha/postcss-ignore-plugin/workflows/CI%20tests/badge.svg?branch=master&event=push)
![CI Integration tests](https://github.com/anikethsaha/postcss-ignore-plugin/workflows/CI%20Integration%20tests/badge.svg?branch=master&event=push)

Ignore postcss plugins operations in lines using comments

## Status

> ### WORK IN PROGRESS :warning:

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

```css
/* postcss-ignore-line */
```

## How it works

Currently we support only for declaration statement, that mean you can add this comment over CSS declaration line not over the selector list in Rule declaration

`example`

```css
// Correct example

.classname {
  margin: auto;
  /* postcss-ignore-line */
  color: red;
}

// Not supported yet

/* postcss-ignore-line */
.classname {
  margin: auto;
  color: red;
}

/* postcss-ignore-line */
@media screen and (min-width: 480px) {
  ul {
    list-style: none;
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
