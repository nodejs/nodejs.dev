---
title: understanding-setimmediate
displayTitle: 'Understanding setImmediate()'
description: 'The Node.js setImmediate function interacts with the event loop in a special way'
authors: flaviocopes, MylesBorins, LaRuaNa, ahmadawais, clean99, ovflowd
category: learn
---

When you want to execute some piece of code asynchronously, but as soon as possible, one option is to use the `setImmediate()` function provided by Node.js:

```js
setImmediate(() => {
  // run something
});
```

Any function passed as the setImmediate() argument is a callback that's executed in the next iteration of the event loop.

How is `setImmediate()` different from `setTimeout(() => {}, 0)` (passing a 0ms timeout), and from `process.nextTick()` and `Promise.then()`?

A function passed to `process.nextTick()` is going to be executed on the current iteration of the event loop, after the current operation ends. This means it will always execute before `setTimeout` and `setImmediate`.

A `setTimeout()` callback with a 0ms delay is very similar to `setImmediate()`. The execution order will depend on various factors, but they will be both run in the next iteration of the event loop.

A `process.nextTick` callback is added to `process.nextTick queue`. A `Promise.then()` callback is added to `promises microtask queue`. A `setTimeout`, `setImmediate` callback is added to `macrotask queue`.

Event loop executes tasks in `process.nextTick queue` first, and then executes `promises microtask queue`, and then executes `macrotask queue`.

Here is an example to show the order between `setImmediate()`, `process.nextTick()` and `Promise.then()`:

<iframe
  title="A simple example for showing difference between setImmediate nextTick Promise"
  src="https://stackblitz.com/edit/nodejs-dev-setimmediate?file=index.js&zenmode=1&view=editor"
  alt="nodejs-dev-setimmediate-example on StackBlitz"
  style="height: 500px; width: 100%; border: 0;">
</iframe>

This code will first call `start()`, then call `foo()` in `process.nextTick queue`. After that, it will handle `promises microtask queue`, which prints `bar` and adds `zoo()` in `process.nextTick queue` at the same time. Then it will call `zoo()` which has just been added. In the end, the `baz()` in `macrotask queue` is called.
