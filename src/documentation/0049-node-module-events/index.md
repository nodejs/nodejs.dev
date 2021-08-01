---
title: 'The Node.js events module'
description: 'The events module of Node.js provides the EventEmitter class'
authors: flaviocopes, ZYSzys, MylesBorins, fhemberger, LaRuaNa, amiller-gh, ahmadawais
section: Getting Started
category: learn
---

The `events` module provides us the EventEmitter class, which is key to working with events in Node.js.

```js
const EventEmitter = require('events')
const door = new EventEmitter()
```

The event listener has these in-built events:

* `newListener` when a listener is added
* `removeListener` when a listener is removed

Here's a detailed description of the most useful methods:

## `emitter.addListener()`

Alias for `emitter.on()`.

## `emitter.emit()`

Emits an event. It synchronously calls every event listener in the order they were registered.

```js
door.emit("slam") // emitting the event "slam"
```

## `emitter.eventNames()`

Return an array of strings that represent the events registered on the current `EventEmitter` object:

```js
door.eventNames()
```

## `emitter.getMaxListeners()`

Get the maximum amount of listeners one can add to an `EventEmitter` object, which defaults to 10 but can be increased or lowered by using `setMaxListeners()`

```js
door.getMaxListeners()
```

## `emitter.listenerCount()`

Get the count of listeners of the event passed as parameter:

```js
door.listenerCount('open')
```

## `emitter.listeners()`

Gets an array of listeners of the event passed as parameter:

```js
door.listeners('open')
```

## `emitter.off()`

Alias for `emitter.removeListener()` added in Node.js 10

## `emitter.on()`

Adds a callback function that's called when an event is emitted.

Usage:

```js
door.on('open', () => {
  console.log('Door was opened')
})
```

## `emitter.once()`

Adds a callback function that's called when an event is emitted for the first time after registering this. This callback is only going to be called once, never again.

```js
const EventEmitter = require('events')
const ee = new EventEmitter()

ee.once('my-event', () => {
  //call callback function once
})
```

## `emitter.prependListener()`

When you add a listener using `on` or `addListener`, it's added last in the queue of listeners, and called last. Using `prependListener` it's added, and called, before other listeners.

## `emitter.prependOnceListener()`

When you add a listener using `once`, it's added last in the queue of listeners, and called last. Using `prependOnceListener` it's added, and called, before other listeners.

## `emitter.removeAllListeners()`

Removes all listeners of an `EventEmitter` object listening to a specific event:

```js
door.removeAllListeners('open')
```

## `emitter.removeListener()`

Remove a specific listener. You can do this by saving the callback function to a variable, when added, so you can reference it later:

```js
const doSomething = () => {}
door.on('open', doSomething)
door.removeListener('open', doSomething)
```

## `emitter.setMaxListeners()`

Sets the maximum amount of listeners one can add to an `EventEmitter` object, which defaults to 10 but can be increased or lowered.

```js
door.setMaxListeners(50)
```
