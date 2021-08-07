---
title: Code for add(1)(2)...(n)
description: Another sample program to explain currying.
date: 2021-08-07T16:00:00.000Z
published: true
---

## Code for add(1)(2)...(n)

- [A simpler code for simpler problem](../code-for-add-1-2)
- [Well written article about currying](https://medium.com/@kevincennis/currying-in-javascript-c66080543528)

```js
function add(n) {
  let sum = n;
  const proxy = new Proxy(function a() {}, {
    get(obj, key) {
      return () => sum;
    },
    apply(receiver, ...args) {
      sum += args[1][0];
      return proxy;
    },
  });
  return proxy;
}

console.log(add(1)(2)(7)(15) == 25); // true
console.log(Number(add(1)(2)(7)(15))); // 25
console.log(typeof add(1)(2)(7)(15)); // function

// Does not work with ===
console.log(add(1)(2)(7)(15) === 25); // false
```

**Second Solution**

```js
function add(n) {
  var addNext = function (x) {
    return add(n + x);
  };

  addNext.valueOf = function () {
    return n;
  };

  return addNext;
}

console.log(add(1)(2)(7) == 10); // true
console.log(add(1)(2)(7).valueOf()); // 10
console.log(typeof add(1)(2)(7)); // function

// Does not work with ===
console.log(add(1)(2)(7) === 10); // false
```
