---
title: Expose functionality from a Node.js file using exports
description: 'How to use the module.exports API to expose data to other files in your application, or to other applications as well'
authors: flaviocopes, MylesBorins, fhemberger, LaRuaNa, ahmadawais
section: Getting Started
category: learn
---

Node.js has a built-in module system.

A Node.js file can import functionality exposed by other Node.js files.

When you want to import something you use

```js
const library = require('./library')
```

to import the functionality exposed in the `library.js` file that resides in the current file folder.

In this file, functionality must be exposed before it can be imported by other files.

Any other object or variable defined in the file by default is private and not exposed to the outer world.

This is what the `module.exports` API offered by the [`module` system](https://nodejs.org/api/modules.html) allows us to do.

When you assign an object or a function as a new `exports` property, that is the thing that's being exposed, and as such, it can be imported in other parts of your app, or in other apps as well.

You can do so in 2 ways.

The first is to assign an object to `module.exports`, which is an object provided out of the box by the module system, and this will make your file export _just that object_:

```js
// car.js
const car = {
  brand: 'Ford',
  model: 'Fiesta'
}

module.exports = car
```
```js
// index.js
const car = require('./car')
```

The second way is to add the exported object as a property of `exports`. This way allows you to export multiple objects, functions or data:

```js
const car = {
  brand: 'Ford',
  model: 'Fiesta'
}

exports.car = car
```

or directly

```js
exports.car = {
  brand: 'Ford',
  model: 'Fiesta'
}
```

And in the other file, you'll use it by referencing a property of your import:

```js
const items = require('./items')
items.car
```

or

```js
const car = require('./items').car
```

What's the difference between `module.exports` and `exports`?

The first exposes the object it points to.
The latter exposes _the properties_ of the object it points to.
