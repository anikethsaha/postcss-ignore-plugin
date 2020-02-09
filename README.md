# cssnano-ignore-plugin
Ignore CSSNANO operations in lines using comments

# Status
> ### WORK IN PROGRESS :warning:


# How it works
In order to stop cssnano doing optimization on some particular line, you simply need to add `/* cssnano-ignore-line */` comment over that line.
Currently we support only for declaration statement, that mean you can add this comment over CSS declaration line not over the selector list in Rule declaration

`example`

```css

// Correct example

.classname{
  margin : auto;
  /* cssnano-ignore-line */
  color : red
}

// Wrong example

/* cssnano-ignore-line */
.classname{
  margin : auto;
  color : red
}

/* cssnano-ignore-line */
@media screen and (min-width: 480px) {
  ul {
  list-style : none;
 }
}

```
 
It simple remove the next line before running the cssnano plugins and then add them at the end.

# Packages
It contains two packages, one to remove the line and another to add it .

- [`cssnano-ignore-remove`](#cssnano-ignore-remove)
- [`cssnano-ignore-add`](#cssnano-ignore-add)

