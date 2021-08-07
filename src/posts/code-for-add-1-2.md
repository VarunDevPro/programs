---
title: Code for add(1)(2)
description: A sample program to explain currying.
date: 2021-08-07T16:00:00.000Z
published: true
---

## Code for add(1)(2)

- [Well written article about currying](https://medium.com/@kevincennis/currying-in-javascript-c66080543528)

```js
function add(x) {
  return function (y) {
    return x + y;
  };
}
```

**Alternative syntax**

```js
const add = (x) => (y) => x + y;
```
