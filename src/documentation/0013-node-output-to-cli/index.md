---
title: Output to the command line using Node
description: 'How to print to the command line console using Node, from the basic console.log to more complex scenarios'
author: flaviocopes
---

<!-- TOC -->

- [Basic output using the console module](#basic-output-using-the-console-module)
- [Clear the console](#clear-the-console)
- [Counting elements](#counting-elements)
- [Print the stack trace](#print-the-stack-trace)
- [Calculate the time spent](#calculate-the-time-spent)
- [stdout and stderr](#stdout-and-stderr)
- [Color the output](#color-the-output)
- [Create a progress bar](#create-a-progress-bar)

<!-- /TOC -->

## Basic output using the console module

Node provides a [`console` module](https://nodejs.org/api/console.html) which provides tons of very useful ways to interact with the command line.

It is basically the same as the `console` object you find in the browser.

The most basic and most used method is `console.log()`, which prints the string you pass to it to the console.

If you pass an object, it will render it as a string.

You can pass multiple variables to `console.log`, for example:

```js
const x = 'x'
const y = 'y'
console.log(x, y)
```

and Node will print both.

We can also format pretty phrases by passing variables and a format specifier.

For example:

```js
console.log('My %s has %d years', 'cat', 2)
```

- `%s` format a variable as a string
- `%d` or `%i` format a variable as an integer
- `%f` format a variable as a floating point number
- `%O` used to print an object representation

Example:

```js
console.log('%O', Number)
```

## Clear the console

`console.clear()` clears the console (the behavior might depend on the console used)

## Counting elements

`console.count()` is a handy method.

Take this code:

```js
const x = 1
const y = 2
const z = 3
console.count(
  'The value of x is ' + x + ' and has been checked .. how many times?'
)
console.count(
  'The value of x is ' + x + ' and has been checked .. how many times?'
)
console.count(
  'The value of y is ' + y + ' and has been checked .. how many times?'
)
```

What happens is that count will count the number of times a string is printed, and print the count next to it:

You can just count apples and oranges:

```js
const oranges = ['orange', 'orange']
const apples = ['just one apple']
oranges.forEach(fruit => {
  console.count(fruit)
})
apples.forEach(fruit => {
  console.count(fruit)
})
```

## Print the stack trace

There might be cases where it's useful to print the call stack trace of a function, maybe to answer the question _how did you reach that part of the code?_

You can do so using `console.trace()`:

```js
const function2 = () => console.trace()
const function1 = () => function2()
function1()
```

This will print the stack trace. This is what's printed if we try this in the Node REPL:

```txt
Trace
    at function2 (repl:1:33)
    at function1 (repl:1:25)
    at repl:1:1
    at ContextifyScript.Script.runInThisContext (vm.js:44:33)
    at REPLServer.defaultEval (repl.js:239:29)
    at bound (domain.js:301:14)
    at REPLServer.runBound [as eval] (domain.js:314:12)
    at REPLServer.onLine (repl.js:440:10)
    at emitOne (events.js:120:20)
    at REPLServer.emit (events.js:210:7)
```

## Calculate the time spent

You can easily calculate how much time a function takes to run, using `time()` and `timeEnd()`

```js
const doSomething = () => console.log('test')
const measureDoingSomething = () => {
  console.time('doSomething()')
  //do something, and measure the time it takes
  doSomething()
  console.timeEnd('doSomething()')
}
measureDoingSomething()
```

## stdout and stderr

As we saw console.log is great for printing messages in the Console. This is what's called the standard output, or `stdout`.

`console.error` prints to the `stderr` stream.

It will not appear in the console, but it will appear in the error log.

## Color the output

You can color the output of your text in the console by using [escape sequences](https://gist.github.com/chrisopedia/8754917). An escape sequence is a set of characters that identifies a color.

Example:

```js
console.log('\x1b[33m%s\x1b[0m', 'hi!')
```

You can try that in the Node REPL, and it will print `hi!` in yellow.

However, this is the low-level way to do this. The simplest way to go about coloring the console output is by using a library. [Chalk](https://github.com/chalk/chalk) is such a library, and in addition to coloring it also helps with other styling facilities, like making text bold, italic or underlined.

You install it with `npm install chalk`, then you can use it:

```js
const chalk = require('chalk')
console.log(chalk.yellow('hi!'))
```

Using `chalk.yellow` is much more convenient than trying to remember the escape codes, and the code is much more readable.

Check the project link posted above for more usage examples.

## Create a progress bar

[Progress](https://www.npmjs.com/package/progress) is an awesome package to create a progress bar in the console. Install it using `npm install progress`

This snippet creates a 10-step progress bar, and every 100ms one step is completed. When the bar completes we clear the interval:

```js
const ProgressBar = require('progress')

const bar = new ProgressBar(':bar', { total: 10 })
const timer = setInterval(() => {
  bar.tick()
  if (bar.complete) {
    clearInterval(timer)
  }
}, 100)
```
