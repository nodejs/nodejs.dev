---
title: understanding-processnexttick
displayTitle: '理解 process.nextTick()'
description: 'Node.js 中的 process.nextTick 函数以一种特殊的方式与事件循环交互'
authors: xgqfrms, flaviocopes, MylesBorins, LaRuaNa, ahmadawais, ovflowd, marksist300
category: learn
---

当你尝试理解 Node.js 事件循环时，其中一个重要部分是 `process.nextTick()`。每次事件循环完成一次完整的行程，我们称之为一个滴答(`tick`)。

当我们将一个函数传递给 `process.nextTick()` 时，我们指示引擎在当前操作结束时调用此函数，在下一个事件循环滴答开始之前:

```js
process.nextTick(() => {
  // do something
});
```

事件循环正忙于处理当前函数代码。当此操作结束时，JS 引擎运行在该操作期间传递给 `nextTick` 调用的所有函数。

这是我们可以告诉 JS 引擎异步地处理函数的方式（在当前函数之后），但要尽快，而不是将其排队。

调用 `setTimeout(() => {}, 0)` 将在下一个滴答结束时执行该函数，比使用 `nextTick()` 时要晚得多，它会优先调用并在下一个滴答开始之前执行它。

当你想确保在下一次事件循环迭代中该代码已被执行时，请使用 `nextTick()`。

#### 一个事件顺序的示例

```js
console.log("Hello => number 1");

setTimeout(() => {
  console.log("The timeout running last => number 4");
}, 0);

setImmediate(() => {
  console.log("Running before the timeout => number 3");
});

process.nextTick(() => {
  console.log("Running at next tick => number 2");
});
```

#### 输出

```bash
Hello => number 1
Running at next tick => number 2
The timeout running last => number 4
Running before the timeout => number 3
```
