---
title: Understanding JavaScript Promises
description: 'Promises are one way to deal with asynchronous code in JavaScript, without writing too many callbacks in your code.'
author: flaviocopes
---

<!-- TOC -->

- [Introduction to promises](#introduction-to-promises)
  - [How promises work, in brief](#how-promises-work-in-brief)
  - [Which JS API use promises?](#which-js-api-use-promises)
- [Creating a promise](#creating-a-promise)
- [Consuming a promise](#consuming-a-promise)
- [Chaining promises](#chaining-promises)
  - [Example of chaining promises](#example-of-chaining-promises)
- [Handling errors](#handling-errors)
  - [Cascading errors](#cascading-errors)
- [Orchestrating promises](#orchestrating-promises)
  - [`Promise.all()`](#promiseall)
  - [`Promise.race()`](#promiserace)
- [Common errors](#common-errors)
  - [Uncaught TypeError: undefined is not a promise](#uncaught-typeerror-undefined-is-not-a-promise)

<!-- /TOC -->

## Introduction to promises

A promise is commonly defined as **a proxy for a value that will eventually become available**.

Promises are one way to deal with asynchronous code, without writing too many callbacks in your code.

Although being around since years, they have been standardized and introduced in ES2015, and now they have been superseded in ES2017 by async functions.

**Async functions** use the promises API as their building block, so understanding them is fundamental even if in newer code you'll likely use async functions instead of promises.

### How promises work, in brief

Once a promise has been called, it will start in **pending state**. This means that the caller function continues the execution, while it waits for the promise to do its own processing, and give the caller function some feedback.

At this point, the caller function waits for it to either return the promise in a **resolved state**, or in a **rejected state**, but as you know JavaScript is asynchronous, so _the function continues its execution while the promise does it work_.

### Which JS API use promises?

In addition to your own code and libraries code, promises are used by standard modern Web APIs such as:

- the Battery API
- the Fetch API
- Service Workers

It's unlikely that in modern JavaScript you'll find yourself _not_ using promises, so let's start diving right into them.

---

## Creating a promise

The Promise API exposes a Promise constructor, which you initialize using `new Promise()`:

```js
let done = true

const isItDoneYet = new Promise((resolve, reject) => {
  if (done) {
    const workDone = 'Here is the thing I built'
    resolve(workDone)
  } else {
    const why = 'Still working on something else'
    reject(why)
  }
})
```

As you can see the promise checks the `done` global constant, and if that's true, we return a resolved promise, otherwise a rejected promise.

Using `resolve` and `reject` we can communicate back a value, in the above case we just return a string, but it could be an object as well.

---

## Consuming a promise

In the last section, we introduced how a promise is created.

Now let's see how the promise can be _consumed_ or used.

```js
const isItDoneYet = new Promise()
//...

const checkIfItsDone = () => {
  isItDoneYet
    .then(ok => {
      console.log(ok)
    })
    .catch(err => {
      console.error(err)
    })
}
```

Running `checkIfItsDone()` will execute the `isItDoneYet()` promise and will wait for it to resolve, using the `then` callback, and if there is an error, it will handle it in the `catch` callback.

---

## Chaining promises

A promise can be returned to another promise, creating a chain of promises.

A great example of chaining promises is given by the Fetch API, a layer on top of the XMLHttpRequest API, which we can use to get a resource and queue a chain of promises to execute when the resource is fetched.

The Fetch API is a promise-based mechanism, and calling `fetch()` is equivalent to defining our own promise using `new Promise()`.

### Example of chaining promises

```js
const status = response => {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  }
  return Promise.reject(new Error(response.statusText))
}

const json = response => response.json()

fetch('/todos.json')
  .then(status)
  .then(json)
  .then(data => {
    console.log('Request succeeded with JSON response', data)
  })
  .catch(error => {
    console.log('Request failed', error)
  })
```

In this example, we call `fetch()` to get a list of TODO items from the `todos.json` file found in the domain root, and we create a chain of promises.

Running `fetch()` returns a [response](https://fetch.spec.whatwg.org/#concept-response), which has many properties, and within those we reference:

- `status`, a numeric value representing the HTTP status code
- `statusText`, a status message, which is `OK` if the request succeeded

`response` also has a `json()` method, which returns a promise that will resolve with the content of the body processed and transformed into JSON.

So given those premises, this is what happens: the first promise in the chain is a function that we defined, called `status()`, that checks the response status and if it's not a success response (between 200 and 299), it rejects the promise.

This operation will cause the promise chain to skip all the chained promises listed and will skip directly to the `catch()` statement at the bottom, logging the `Request failed` text along with the error message.

If that succeeds instead, it calls the json() function we defined. Since the previous promise, when successful, returned the `response` object, we get it as an input to the second promise.

In this case, we return the data JSON processed, so the third promise receives the JSON directly:

```js
.then((data) => {
  console.log('Request succeeded with JSON response', data)
})
```

and we simply log it to the console.

---

## Handling errors

In the example, in the previous section, we had a `catch` that was appended to the chain of promises.

When anything in the chain of promises fails and raises an error or rejects the promise, the control goes to the nearest `catch()` statement down the chain.

```js
new Promise((resolve, reject) => {
  throw new Error('Error')
}).catch(err => {
  console.error(err)
})

// or

new Promise((resolve, reject) => {
  reject('Error')
}).catch(err => {
  console.error(err)
})
```

### Cascading errors

If inside the `catch()` you raise an error, you can append a second `catch()` to handle it, and so on.

```js
new Promise((resolve, reject) => {
  throw new Error('Error')
})
  .catch(err => {
    throw new Error('Error')
  })
  .catch(err => {
    console.error(err)
  })
```

---

## Orchestrating promises

### `Promise.all()`

If you need to synchronize different promises, `Promise.all()` helps you define a list of promises, and execute something when they are all resolved.

Example:

```js
const f1 = fetch('/something.json')
const f2 = fetch('/something2.json')

Promise.all([f1, f2])
  .then(res => {
    console.log('Array of results', res)
  })
  .catch(err => {
    console.error(err)
  })
```

The ES2015 destructuring assignment syntax allows you to also do

```js
Promise.all([f1, f2]).then(([res1, res2]) => {
  console.log('Results', res1, res2)
})
```

You are not limited to using `fetch` of course, **any promise is good to go**.

### `Promise.race()`

`Promise.race()` runs when the first of the promises you pass to it resolves, and it runs the attached callback just once, with the result of the first promise resolved.

Example:

```js
const first = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, 'first')
})
const second = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'second')
})

Promise.race([first, second]).then(result => {
  console.log(result) // second
})
```

## Common errors

### Uncaught TypeError: undefined is not a promise

If you get the `Uncaught TypeError: undefined is not a promise` error in the console, make sure you use `new Promise()` instead of just `Promise()`
