---
title: 'globals'
displayTitle: 'Global objects'
category: 'api'
version: 'v18'
---

<MC data={{"update":{"type":"introduced_in","version":["v0.10.0"]}}} />

<MC data={{"type":"misc"}} />

These objects are available in all modules. The following variables may appear
to be global but are not. They exist only in the scope of modules, see the
[module system documentation][]:

* [`__dirname`][]
* [`__filename`][]
* [`exports`][]
* [`module`][]
* [`require()`][]

The objects listed here are specific to Node.js. There are [built-in objects][]
that are part of the JavaScript language itself, which are also globally
accessible.

### <Tag tag="C" /> `AbortController`

<MC data={{"changes":[{"version":"v15.4.0","pr-url":"https://github.com/nodejs/node/pull/35949","description":"No longer experimental."}],"update":{"type":"added","version":["v15.0.0","v14.17.0"]}}} />

<MC data={{"type":"global"}} />

A utility class used to signal cancelation in selected `Promise`-based APIs.
The API is based on the Web API [`AbortController`][].

```js
const ac = new AbortController();

ac.signal.addEventListener('abort', () => console.log('Aborted!'),
                           { once: true });

ac.abort();

console.log(ac.signal.aborted);  // Prints True
```

#### <Tag tag="M" /> `abortController.abort([reason])`

<MC data={{"changes":[{"version":["v17.2.0","v16.14.0"],"pr-url":"https://github.com/nodejs/node/pull/40807","description":"Added the new optional reason argument."}],"update":{"type":"added","version":["v15.0.0","v14.17.0"]}}} />

* `reason` [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types) An optional reason, retrievable on the `AbortSignal`'s
  `reason` property.

Triggers the abort signal, causing the `abortController.signal` to emit
the `'abort'` event.

#### <Tag tag="M" /> `abortController.signal`

<MC data={{"update":{"type":"added","version":["v15.0.0","v14.17.0"]}}} />

* Type: [`AbortSignal`](/api/globals#abortsignal)

#### <Tag tag="C" /> `AbortSignal`

<MC data={{"update":{"type":"added","version":["v15.0.0","v14.17.0"]}}} />

* Extends: [`EventTarget`](/api/events#eventtarget)

The `AbortSignal` is used to notify observers when the
`abortController.abort()` method is called.

##### Static method: `AbortSignal.abort([reason])`

<MC data={{"changes":[{"version":["v17.2.0","v16.14.0"],"pr-url":"https://github.com/nodejs/node/pull/40807","description":"Added the new optional reason argument."}],"update":{"type":"added","version":["v15.12.0","v14.17.0"]}}} />

* `reason`: [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types)
* Returns: [`AbortSignal`](/api/globals#abortsignal)

Returns a new already aborted `AbortSignal`.

##### Static method: `AbortSignal.timeout(delay)`

<MC data={{"update":{"type":"added","version":["v17.3.0","v16.14.0"]}}} />

* `delay` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The number of milliseconds to wait before triggering
  the AbortSignal.

Returns a new `AbortSignal` which will be aborted in `delay` milliseconds.

##### <Tag tag="E" /> `'abort'`

<MC data={{"update":{"type":"added","version":["v15.0.0","v14.17.0"]}}} />

The `'abort'` event is emitted when the `abortController.abort()` method
is called. The callback is invoked with a single object argument with a
single `type` property set to `'abort'`:

```js
const ac = new AbortController();

// Use either the onabort property...
ac.signal.onabort = () => console.log('aborted!');

// Or the EventTarget API...
ac.signal.addEventListener('abort', (event) => {
  console.log(event.type);  // Prints 'abort'
}, { once: true });

ac.abort();
```

The `AbortController` with which the `AbortSignal` is associated will only
ever trigger the `'abort'` event once. We recommended that code check
that the `abortSignal.aborted` attribute is `false` before adding an `'abort'`
event listener.

Any event listeners attached to the `AbortSignal` should use the
`{ once: true }` option (or, if using the `EventEmitter` APIs to attach a
listener, use the `once()` method) to ensure that the event listener is
removed as soon as the `'abort'` event is handled. Failure to do so may
result in memory leaks.

##### <Tag tag="M" /> `abortSignal.aborted`

<MC data={{"update":{"type":"added","version":["v15.0.0","v14.17.0"]}}} />

* Type: [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) True after the `AbortController` has been aborted.

##### <Tag tag="M" /> `abortSignal.onabort`

<MC data={{"update":{"type":"added","version":["v15.0.0","v14.17.0"]}}} />

* Type: [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)

An optional callback function that may be set by user code to be notified
when the `abortController.abort()` function has been called.

##### <Tag tag="M" /> `abortSignal.reason`

<MC data={{"update":{"type":"added","version":["v17.2.0","v16.14.0"]}}} />

* Type: [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types)

An optional reason specified when the `AbortSignal` was triggered.

```js
const ac = new AbortController();
ac.abort(new Error('boom!'));
console.log(ac.signal.reason);  // Error('boom!');
```

##### <Tag tag="M" /> `abortSignal.throwIfAborted()`

<MC data={{"update":{"type":"added","version":["v17.3.0"]}}} />

If `abortSignal.aborted` is `true`, throws `abortSignal.reason`.

### <Tag tag="C" /> `Blob`

<MC data={{"update":{"type":"added","version":["v18.0.0"]}}} />

<MC data={{"type":"global"}} />

See [`Blob`](/api/buffer#blob).

### <Tag tag="C" /> `Buffer`

<MC data={{"update":{"type":"added","version":["v0.1.103"]}}} />

<MC data={{"type":"global"}} />

* [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)

Used to handle binary data. See the [buffer section][].

### <Tag tag="C" /> `ByteLengthQueuingStrategy`

<MC data={{"update":{"type":"added","version":["v18.0.0"]}}} />

<MC data={{"stability":{"level":1,"text":" - Experimental."}}} />

A browser-compatible implementation of [`ByteLengthQueuingStrategy`][].

### <Tag tag="M" /> `__dirname`

This variable may appear to be global but is not. See [`__dirname`][].

### <Tag tag="M" /> `__filename`

This variable may appear to be global but is not. See [`__filename`][].

### <Tag tag="M" /> `atob(data)`

<MC data={{"update":{"type":"added","version":["v16.0.0"]}}} />

<MC data={{"stability":{"level":3,"text":" - Legacy. Use `Buffer.from(data, 'base64')` instead."}}} />

Global alias for [`buffer.atob()`][].

### <Tag tag="M" /> `BroadcastChannel`

<MC data={{"update":{"type":"added","version":["v18.0.0"]}}} />

See [`BroadcastChannel`](/api/worker_threads#broadcastchannel-extends-eventtarget).

### <Tag tag="M" /> `btoa(data)`

<MC data={{"update":{"type":"added","version":["v16.0.0"]}}} />

<MC data={{"stability":{"level":3,"text":" - Legacy. Use `buf.toString('base64')` instead."}}} />

Global alias for [`buffer.btoa()`][].

### <Tag tag="M" /> `clearImmediate(immediateObject)`

<MC data={{"update":{"type":"added","version":["v0.9.1"]}}} />

<MC data={{"type":"global"}} />

[`clearImmediate`][] is described in the [timers][] section.

### <Tag tag="M" /> `clearInterval(intervalObject)`

<MC data={{"update":{"type":"added","version":["v0.0.1"]}}} />

<MC data={{"type":"global"}} />

[`clearInterval`][] is described in the [timers][] section.

### <Tag tag="M" /> `clearTimeout(timeoutObject)`

<MC data={{"update":{"type":"added","version":["v0.0.1"]}}} />

<MC data={{"type":"global"}} />

[`clearTimeout`][] is described in the [timers][] section.

### <Tag tag="C" /> `CompressionStream`

<MC data={{"update":{"type":"added","version":["v18.0.0"]}}} />

<MC data={{"stability":{"level":1,"text":" - Experimental."}}} />

A browser-compatible implementation of [`CompressionStream`][].

### <Tag tag="M" /> `console`

<MC data={{"update":{"type":"added","version":["v0.1.100"]}}} />

<MC data={{"type":"global"}} />

* [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

Used to print to stdout and stderr. See the [`console`][] section.

### <Tag tag="C" /> `CountQueuingStrategy`

<MC data={{"update":{"type":"added","version":["v18.0.0"]}}} />

<MC data={{"stability":{"level":1,"text":" - Experimental."}}} />

A browser-compatible implementation of [`CountQueuingStrategy`][].

### <Tag tag="M" /> `Crypto`

<MC data={{"update":{"type":"added","version":["v17.6.0"]}}} />

<MC data={{"stability":{"level":1,"text":" - Experimental. Enable this API with the `--experimental-global-webcrypto` CLI flag."}}} />

A browser-compatible implementation of [`Crypto`](/api/webcrypto#crypto). This global is available
only if the Node.js binary was compiled with including support for the
`node:crypto` module.

### <Tag tag="M" /> `crypto`

<MC data={{"update":{"type":"added","version":["v17.6.0"]}}} />

<MC data={{"stability":{"level":1,"text":" - Experimental. Enable this API with the `--experimental-global-webcrypto` CLI flag."}}} />

A browser-compatible implementation of the [Web Crypto API][].

### <Tag tag="M" /> `CryptoKey`

<MC data={{"update":{"type":"added","version":["v17.6.0"]}}} />

<MC data={{"stability":{"level":1,"text":" - Experimental. Enable this API with the `--experimental-global-webcrypto` CLI flag."}}} />

A browser-compatible implementation of [`CryptoKey`](/api/webcrypto#cryptokey). This global is available
only if the Node.js binary was compiled with including support for the
`node:crypto` module.

### <Tag tag="M" /> `CustomEvent`

<MC data={{"update":{"type":"added","version":["v18.7.0"]}}} />

<MC data={{"stability":{"level":1,"text":" - Experimental. Enable this API with the `--experimental-global-customevent` CLI flag."}}} />

<MC data={{"type":"global"}} />

A browser-compatible implementation of the [`CustomEvent` Web API][].

### <Tag tag="C" /> `DecompressionStream`

<MC data={{"update":{"type":"added","version":["v18.0.0"]}}} />

<MC data={{"stability":{"level":1,"text":" - Experimental."}}} />

A browser-compatible implementation of [`DecompressionStream`][].

### <Tag tag="M" /> `Event`

<MC data={{"changes":[{"version":"v15.4.0","pr-url":"https://github.com/nodejs/node/pull/35949","description":"No longer experimental."}],"update":{"type":"added","version":["v15.0.0"]}}} />

<MC data={{"type":"global"}} />

A browser-compatible implementation of the `Event` class. See
[`EventTarget` and `Event` API][] for more details.

### <Tag tag="M" /> `EventTarget`

<MC data={{"changes":[{"version":"v15.4.0","pr-url":"https://github.com/nodejs/node/pull/35949","description":"No longer experimental."}],"update":{"type":"added","version":["v15.0.0"]}}} />

<MC data={{"type":"global"}} />

A browser-compatible implementation of the `EventTarget` class. See
[`EventTarget` and `Event` API][] for more details.

### <Tag tag="M" /> `exports`

This variable may appear to be global but is not. See [`exports`][].

### <Tag tag="M" /> `fetch`

<MC data={{"update":{"type":"added","version":["v17.5.0"]}}} />

<MC data={{"stability":{"level":1,"text":" - Experimental. Disable this API with the `--no-experimental-fetch` CLI flag."}}} />

A browser-compatible implementation of the [`fetch()`][] function.

### Class `FormData`

<MC data={{"update":{"type":"added","version":["v17.6.0"]}}} />

<MC data={{"stability":{"level":1,"text":" - Experimental. Disable this API with the `--no-experimental-fetch` CLI flag."}}} />

A browser-compatible implementation of [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData).

### <Tag tag="M" /> `global`

<MC data={{"update":{"type":"added","version":["v0.1.27"]}}} />

<MC data={{"type":"global"}} />

* [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) The global namespace object.

In browsers, the top-level scope is the global scope. This means that
within the browser `var something` will define a new global variable. In
Node.js this is different. The top-level scope is not the global scope;
`var something` inside a Node.js module will be local to that module.

### Class `Headers`

<MC data={{"update":{"type":"added","version":["v17.5.0"]}}} />

<MC data={{"stability":{"level":1,"text":" - Experimental. Disable this API with the `--no-experimental-fetch` CLI flag."}}} />

A browser-compatible implementation of [`Headers`](https://developer.mozilla.org/en-US/docs/Web/API/Headers).

### <Tag tag="M" /> `MessageChannel`

<MC data={{"update":{"type":"added","version":["v15.0.0"]}}} />

<MC data={{"type":"global"}} />

The `MessageChannel` class. See [`MessageChannel`][] for more details.

### <Tag tag="M" /> `MessageEvent`

<MC data={{"update":{"type":"added","version":["v15.0.0"]}}} />

<MC data={{"type":"global"}} />

The `MessageEvent` class. See [`MessageEvent`][] for more details.

### <Tag tag="M" /> `MessagePort`

<MC data={{"update":{"type":"added","version":["v15.0.0"]}}} />

<MC data={{"type":"global"}} />

The `MessagePort` class. See [`MessagePort`][] for more details.

### <Tag tag="M" /> `module`

This variable may appear to be global but is not. See [`module`][].

### <Tag tag="M" /> `performance`

<MC data={{"update":{"type":"added","version":["v16.0.0"]}}} />

The [`perf_hooks.performance`][] object.

### <Tag tag="M" /> `process`

<MC data={{"update":{"type":"added","version":["v0.1.7"]}}} />

<MC data={{"type":"global"}} />

* [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

The process object. See the [`process` object][] section.

### <Tag tag="M" /> `queueMicrotask(callback)`

<MC data={{"update":{"type":"added","version":["v11.0.0"]}}} />

<MC data={{"type":"global"}} />

* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) Function to be queued.

The `queueMicrotask()` method queues a microtask to invoke `callback`. If
`callback` throws an exception, the [`process` object][] `'uncaughtException'`
event will be emitted.

The microtask queue is managed by V8 and may be used in a similar manner to
the [`process.nextTick()`][] queue, which is managed by Node.js. The
`process.nextTick()` queue is always processed before the microtask queue
within each turn of the Node.js event loop.

```js
// Here, `queueMicrotask()` is used to ensure the 'load' event is always
// emitted asynchronously, and therefore consistently. Using
// `process.nextTick()` here would result in the 'load' event always emitting
// before any other promise jobs.

DataHandler.prototype.load = async function load(key) {
  const hit = this._cache.get(key);
  if (hit !== undefined) {
    queueMicrotask(() => {
      this.emit('load', hit);
    });
    return;
  }

  const data = await fetchData(key);
  this._cache.set(key, data);
  this.emit('load', data);
};
```

### <Tag tag="C" /> `ReadableByteStreamController`

<MC data={{"update":{"type":"added","version":["v18.0.0"]}}} />

<MC data={{"stability":{"level":1,"text":" - Experimental."}}} />

A browser-compatible implementation of [`ReadableByteStreamController`][].

### <Tag tag="C" /> `ReadableStream`

<MC data={{"update":{"type":"added","version":["v18.0.0"]}}} />

<MC data={{"stability":{"level":1,"text":" - Experimental."}}} />

A browser-compatible implementation of [`ReadableStream`][].

### <Tag tag="C" /> `ReadableStreamBYOBReader`

<MC data={{"update":{"type":"added","version":["v18.0.0"]}}} />

<MC data={{"stability":{"level":1,"text":" - Experimental."}}} />

A browser-compatible implementation of [`ReadableStreamBYOBReader`][].

### <Tag tag="C" /> `ReadableStreamBYOBRequest`

<MC data={{"update":{"type":"added","version":["v18.0.0"]}}} />

<MC data={{"stability":{"level":1,"text":" - Experimental."}}} />

A browser-compatible implementation of [`ReadableStreamBYOBRequest`][].

### <Tag tag="C" /> `ReadableStreamDefaultController`

<MC data={{"update":{"type":"added","version":["v18.0.0"]}}} />

<MC data={{"stability":{"level":1,"text":" - Experimental."}}} />

A browser-compatible implementation of [`ReadableStreamDefaultController`][].

### <Tag tag="C" /> `ReadableStreamDefaultReader`

<MC data={{"update":{"type":"added","version":["v18.0.0"]}}} />

<MC data={{"stability":{"level":1,"text":" - Experimental."}}} />

A browser-compatible implementation of [`ReadableStreamDefaultReader`][].

### <Tag tag="M" /> `require()`

This variable may appear to be global but is not. See [`require()`][].

### <Tag tag="M" /> `Response`

<MC data={{"update":{"type":"added","version":["v17.5.0"]}}} />

<MC data={{"stability":{"level":1,"text":" - Experimental. Disable this API with the `--no-experimental-fetch` CLI flag."}}} />

A browser-compatible implementation of [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response).

### <Tag tag="M" /> `Request`

<MC data={{"update":{"type":"added","version":["v17.5.0"]}}} />

<MC data={{"stability":{"level":1,"text":" - Experimental. Disable this API with the `--no-experimental-fetch` CLI flag."}}} />

A browser-compatible implementation of [`Request`](https://developer.mozilla.org/en-US/docs/Web/API/Request).

### <Tag tag="M" /> `setImmediate(callback[, ...args])`

<MC data={{"update":{"type":"added","version":["v0.9.1"]}}} />

<MC data={{"type":"global"}} />

[`setImmediate`][] is described in the [timers][] section.

### <Tag tag="M" /> `setInterval(callback, delay[, ...args])`

<MC data={{"update":{"type":"added","version":["v0.0.1"]}}} />

<MC data={{"type":"global"}} />

[`setInterval`][] is described in the [timers][] section.

### <Tag tag="M" /> `setTimeout(callback, delay[, ...args])`

<MC data={{"update":{"type":"added","version":["v0.0.1"]}}} />

<MC data={{"type":"global"}} />

[`setTimeout`][] is described in the [timers][] section.

### <Tag tag="M" /> `structuredClone(value[, options])`

<MC data={{"update":{"type":"added","version":["v17.0.0"]}}} />

<MC data={{"type":"global"}} />

The WHATWG [`structuredClone`][] method.

### <Tag tag="M" /> `SubtleCrypto`

<MC data={{"update":{"type":"added","version":["v17.6.0"]}}} />

<MC data={{"stability":{"level":1,"text":" - Experimental. Enable this API with the `--experimental-global-webcrypto` CLI flag."}}} />

A browser-compatible implementation of [`SubtleCrypto`](/api/webcrypto#subtlecrypto). This global is available
only if the Node.js binary was compiled with including support for the
`node:crypto` module.

### <Tag tag="M" /> `DOMException`

<MC data={{"update":{"type":"added","version":["v17.0.0"]}}} />

<MC data={{"type":"global"}} />

The WHATWG `DOMException` class. See [`DOMException`][] for more details.

### <Tag tag="M" /> `TextDecoder`

<MC data={{"update":{"type":"added","version":["v11.0.0"]}}} />

<MC data={{"type":"global"}} />

The WHATWG `TextDecoder` class. See the [`TextDecoder`][] section.

### <Tag tag="C" /> `TextDecoderStream`

<MC data={{"update":{"type":"added","version":["v18.0.0"]}}} />

<MC data={{"stability":{"level":1,"text":" - Experimental."}}} />

A browser-compatible implementation of [`TextDecoderStream`][].

### <Tag tag="M" /> `TextEncoder`

<MC data={{"update":{"type":"added","version":["v11.0.0"]}}} />

<MC data={{"type":"global"}} />

The WHATWG `TextEncoder` class. See the [`TextEncoder`][] section.

### <Tag tag="C" /> `TextEncoderStream`

<MC data={{"update":{"type":"added","version":["v18.0.0"]}}} />

<MC data={{"stability":{"level":1,"text":" - Experimental."}}} />

A browser-compatible implementation of [`TextEncoderStream`][].

### <Tag tag="C" /> `TransformStream`

<MC data={{"update":{"type":"added","version":["v18.0.0"]}}} />

<MC data={{"stability":{"level":1,"text":" - Experimental."}}} />

A browser-compatible implementation of [`TransformStream`][].

### <Tag tag="C" /> `TransformStreamDefaultController`

<MC data={{"update":{"type":"added","version":["v18.0.0"]}}} />

<MC data={{"stability":{"level":1,"text":" - Experimental."}}} />

A browser-compatible implementation of [`TransformStreamDefaultController`][].

### <Tag tag="M" /> `URL`

<MC data={{"update":{"type":"added","version":["v10.0.0"]}}} />

<MC data={{"type":"global"}} />

The WHATWG `URL` class. See the [`URL`][] section.

### <Tag tag="M" /> `URLSearchParams`

<MC data={{"update":{"type":"added","version":["v10.0.0"]}}} />

<MC data={{"type":"global"}} />

The WHATWG `URLSearchParams` class. See the [`URLSearchParams`][] section.

### <Tag tag="M" /> `WebAssembly`

<MC data={{"update":{"type":"added","version":["v8.0.0"]}}} />

<MC data={{"type":"global"}} />

* [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

The object that acts as the namespace for all W3C
[WebAssembly][webassembly-org] related functionality. See the
[Mozilla Developer Network][webassembly-mdn] for usage and compatibility.

### <Tag tag="C" /> `WritableStream`

<MC data={{"update":{"type":"added","version":["v18.0.0"]}}} />

<MC data={{"stability":{"level":1,"text":" - Experimental."}}} />

A browser-compatible implementation of [`WritableStream`][].

### <Tag tag="C" /> `WritableStreamDefaultController`

<MC data={{"update":{"type":"added","version":["v18.0.0"]}}} />

<MC data={{"stability":{"level":1,"text":" - Experimental."}}} />

A browser-compatible implementation of [`WritableStreamDefaultController`][].

### <Tag tag="C" /> `WritableStreamDefaultWriter`

<MC data={{"update":{"type":"added","version":["v18.0.0"]}}} />

<MC data={{"stability":{"level":1,"text":" - Experimental."}}} />

A browser-compatible implementation of [`WritableStreamDefaultWriter`][].

[Web Crypto API]: (/api/webcrypto)
[`--experimental-global-customevent`]: (/api/cli#--experimental-global-customevent)
[`--experimental-global-webcrypto`]: (/api/cli#--experimental-global-webcrypto)
[`--no-experimental-fetch`]: (/api/cli#--no-experimental-fetch)
[`AbortController`]: https://developer.mozilla.org/en-US/docs/Web/API/AbortController
[`ByteLengthQueuingStrategy`]: (/api/webstreams#class-bytelengthqueuingstrategy)
[`CompressionStream`]: (/api/webstreams#class-compressionstream)
[`CountQueuingStrategy`]: (/api/webstreams#class-countqueuingstrategy)
[`CustomEvent` Web API]: https://dom.spec.whatwg.org/#customevent
[`DOMException`]: https://developer.mozilla.org/en-US/docs/Web/API/DOMException
[`DecompressionStream`]: (/api/webstreams#class-decompressionstream)
[`EventTarget` and `Event` API]: (/api/events#eventtarget-and-event-api)
[`MessageChannel`]: worker_threads.md#class-messagechannel
[`MessageEvent`]: https://developer.mozilla.org/en-US/docs/Web/API/MessageEvent/MessageEvent
[`MessagePort`]: worker_threads.md#class-messageport
[`ReadableByteStreamController`]: (/api/webstreams#class-readablebytestreamcontroller)
[`ReadableStreamBYOBReader`]: (/api/webstreams#class-readablestreambyobreader)
[`ReadableStreamBYOBRequest`]: (/api/webstreams#class-readablestreambyobrequest)
[`ReadableStreamDefaultController`]: (/api/webstreams#class-readablestreamdefaultcontroller)
[`ReadableStreamDefaultReader`]: (/api/webstreams#class-readablestreamdefaultreader)
[`ReadableStream`]: (/api/webstreams#class-readablestream)
[`TextDecoderStream`]: (/api/webstreams#class-textdecoderstream)
[`TextDecoder`]: (/api/util#class-utiltextdecoder)
[`TextEncoderStream`]: (/api/webstreams#class-textencoderstream)
[`TextEncoder`]: (/api/util#class-utiltextencoder)
[`TransformStreamDefaultController`]: (/api/webstreams#class-transformstreamdefaultcontroller)
[`TransformStream`]: (/api/webstreams#class-transformstream)
[`URLSearchParams`]: (/api/url#class-urlsearchparams)
[`URL`]: (/api/url#class-url)
[`WritableStreamDefaultController`]: (/api/webstreams#class-writablestreamdefaultcontroller)
[`WritableStreamDefaultWriter`]: (/api/webstreams#class-writablestreamdefaultwriter)
[`WritableStream`]: (/api/webstreams#class-writablestream)
[`__dirname`]: (/api/modules#__dirname)
[`__filename`]: (/api/modules#__filename)
[`buffer.atob()`]: (/api/buffer#bufferatobdata)
[`buffer.btoa()`]: (/api/buffer#bufferbtoadata)
[`clearImmediate`]: (/api/timers#clearimmediateimmediate)
[`clearInterval`]: (/api/timers#clearintervaltimeout)
[`clearTimeout`]: (/api/timers#cleartimeouttimeout)
[`console`]: (/api/console)
[`exports`]: (/api/modules#exports)
[`fetch()`]: https://developer.mozilla.org/en-US/docs/Web/API/fetch
[`module`]: (/api/modules#module)
[`perf_hooks.performance`]: perf_hooks.md#perf_hooksperformance
[`process.nextTick()`]: (/api/process#processnexttickcallback-args)
[`process` object]: (/api/process#process)
[`require()`]: (/api/modules#requireid)
[`setImmediate`]: (/api/timers#setimmediatecallback-args)
[`setInterval`]: (/api/timers#setintervalcallback-delay-args)
[`setTimeout`]: (/api/timers#settimeoutcallback-delay-args)
[`structuredClone`]: https://developer.mozilla.org/en-US/docs/Web/API/structuredClone
[buffer section]: (/api/buffer)
[built-in objects]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects
[module system documentation]: (/api/modules)
[timers]: (/api/timers)
[webassembly-mdn]: https://developer.mozilla.org/en-US/docs/WebAssembly
[webassembly-org]: https://webassembly.org
