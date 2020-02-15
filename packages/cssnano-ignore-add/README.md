# cssnano-ignore-plugin

![CI tests](https://github.com/anikethsaha/cssnano-ignore-plugin/workflows/CI%20tests/badge.svg?branch=master&event=push)
![CI Integration tests](https://github.com/anikethsaha/cssnano-ignore-plugin/workflows/CI%20Integration%20tests/badge.svg?branch=master&event=push)

Ignore CSSNANO operations in lines using comments

> ### These packages will be moved to [`CSSNANO`](https://github.com/cssnano/cssnano) soon once its ready to use

## Status

> ### WORK IN PROGRESS :warning:

## Getting started

This will be soon ship with `cssnano default preset`.
In the meantime, install it using

`$ yarn add cssnano-ignore-add cssnano-ignore-remove -D`

and add this it in your `postcss` config

```js
// postcss.config.js
module.exports = {
  plugins: [
    require('cssnano-ignore-remove'),
    require('cssnano'),
    require('cssnano-ignore-add'),
  ],
};
```

> This can be just with any of `postcss` plugin, not just with cssnano. But the comment will be same
>
> ```css
> /* cssnano-ignore-line */
> ```

## How it works

In order to stop cssnano doing optimization on some particular line, you simply need to add `/* cssnano-ignore-line */` comment over that line.
Currently we support only for declaration statement, that mean you can add this comment over CSS declaration line not over the selector list in Rule declaration

`example`

```css
// Correct example

.classname {
  margin: auto;
  /* cssnano-ignore-line */
  color: red;
}

// Wrong example

/* cssnano-ignore-line */
.classname {
  margin: auto;
  color: red;
}

/* cssnano-ignore-line */
@media screen and (min-width: 480px) {
  ul {
    list-style: none;
  }
}
```

It simple remove the next line before running the cssnano plugins and then add them at the end.

## Packages

It contains two packages, one to remove the line and another to add it .

- [`cssnano-ignore-remove`](#cssnano-ignore-remove)
- [`cssnano-ignore-add`](#cssnano-ignore-add)

## Tests

this plugins are tested with

- cssnano
- Autoprefixer
- postcss-preset-env
- stylelint
- some custom plugins meant to fail the op
- Indivial tests for each plugins

> There are not many test cases. More will be added soon
