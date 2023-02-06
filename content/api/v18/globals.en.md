---
title: 'globals'
displayTitle: 'Global objects'
category: 'api'
version: 'v18'
---

<Metadata data={{"update":{"type":"introduced_in","version":["v0.10.0"]}}} />

<Metadata data={{"type":"misc"}} />

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

### <DataTag tag="C" /> `AbortController`

<Metadata data={{"changes":[{"version":"v15.4.0","pr-url":"https://github.com/nodejs/node/pull/35949","description":"No longer experimental."}],"update":{"type":"added","version":["v15.0.0","v14.17.0"]}}} />

<Metadata data={{"type":"global"}} />

A utility class used to signal cancelation in selected `Promise`-based APIs.
The API is based on the Web API [`AbortController`][].

```js
const ac = new AbortController();

ac.signal.addEventListener('abort', () => console.log('Aborted!'),
                           { once: true });

ac.abort();

console.log(ac.signal.aborted);  // Prints True
```

#### <DataTag tag="M" /> `abortController.abort([reason])`

<Metadata data={{"changes":[{"version":["v17.2.0","v16.14.0"],"pr-url":"https://github.com/nodejs/node/pull/40807","description":"Added the new optional reason argument."}],"update":{"type":"added","version":["v15.0.0","v14.17.0"]}}} />

* `reason` [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types) An optional reason, retrievable on the `AbortSignal`'s
  `reason` property.

Triggers the abort signal, causing the `abortController.signal` to emit
the `'abort'` event.

#### <DataTag tag="M" /> `abortController.signal`

<Metadata data={{"update":{"type":"added","version":["v15.0.0","v14.17.0"]}}} />

* Type: [`AbortSignal`](/api/v18/globals#abortsignal)

#### <DataTag tag="C" /> `AbortSignal`

<Metadata data={{"update":{"type":"added","version":["v15.0.0","v14.17.0"]}}} />

* Extends: [`EventTarget`](/api/v18/events#eventtarget)

The `AbortSignal` is used to notify observers when the
`abortController.abort()` method is called.

##### Static method: `AbortSignal.abort([reason])`

<Metadata data={{"changes":[{"version":["v17.2.0","v16.14.0"],"pr-url":"https://github.com/nodejs/node/pull/40807","description":"Added the new optional reason argument."}],"update":{"type":"added","version":["v15.12.0","v14.17.0"]}}} />

* `reason`: [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types)
* Returns: [`AbortSignal`](/api/v18/globals#abortsignal)

Returns a new already aborted `AbortSignal`.

##### Static method: `AbortSignal.timeout(delay)`

<Metadata data={{"update":{"type":"added","version":["v17.3.0","v16.14.0"]}}} />

* `delay` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The number of milliseconds to wait before triggering
  the AbortSignal.

Returns a new `AbortSignal` which will be aborted in `delay` milliseconds.

##### <DataTag tag="E" /> `'abort'`

<Metadata data={{"update":{"type":"added","version":["v15.0.0","v14.17.0"]}}} />

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

##### <DataTag tag="M" /> `abortSignal.aborted`

<Metadata data={{"update":{"type":"added","version":["v15.0.0","v14.17.0"]}}} />

* Type: [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) True after the `AbortController` has been aborted.

##### <DataTag tag="M" /> `abortSignal.onabort`

<Metadata data={{"update":{"type":"added","version":["v15.0.0","v14.17.0"]}}} />

* Type: [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)

An optional callback function that may be set by user code to be notified
when the `abortController.abort()` function has been called.

##### <DataTag tag="M" /> `abortSignal.reason`

<Metadata data={{"update":{"type":"added","version":["v17.2.0","v16.14.0"]}}} />

* Type: [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types)

An optional reason specified when the `AbortSignal` was triggered.

```js
const ac = new AbortController();
ac.abort(new Error('boom!'));
console.log(ac.signal.reason);  // Error('boom!');
```

##### <DataTag tag="M" /> `abortSignal.throwIfAborted()`

<Metadata data={{"update":{"type":"added","version":["v17.3.0"]}}} />

If `abortSignal.aborted` is `true`, throws `abortSignal.reason`.

### <DataTag tag="C" /> `Blob`

<Metadata data={{"update":{"type":"added","version":["v18.0.0"]}}} />

<Metadata data={{"type":"global"}} />

See [`Blob`](/api/v18/buffer#blob).

### <DataTag tag="C" /> `Buffer`

<Metadata data={{"update":{"type":"added","version":["v0.1.103"]}}} />

<Metadata data={{"type":"global"}} />

* [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)

Used to handle binary data. See the [buffer section][].

### <DataTag tag="C" /> `ByteLengthQueuingStrategy`

<Metadata data={{"update":{"type":"added","version":["v18.0.0"]}}} />

<Stability stability={1}>

Experimental.

</Stability>

A browser-compatible implementation of [`ByteLengthQueuingStrategy`][].

### <DataTag tag="M" /> `__dirname`

This variable may appear to be global but is not. See [`__dirname`][].

### <DataTag tag="M" /> `__filename`

This variable may appear to be global but is not. See [`__filename`][].

### <DataTag tag="M" /> `atob(data)`

<Metadata data={{"update":{"type":"added","version":["v16.0.0"]}}} />

<Stability stability={3}>

Legacy. Use `Buffer.from(data, 'base64')` instead.

</Stability>

Global alias for [`buffer.atob()`][].

### <DataTag tag="M" /> `BroadcastChannel`

<Metadata data={{"update":{"type":"added","version":["v18.0.0"]}}} />

See [`BroadcastChannel`](/api/v18/worker_threads#broadcastchannel-extends-eventtarget).

### <DataTag tag="M" /> `btoa(data)`

<Metadata data={{"update":{"type":"added","version":["v16.0.0"]}}} />

<Stability stability={3}>

Legacy. Use `buf.toString('base64')` instead.

</Stability>

Global alias for [`buffer.btoa()`][].

### <DataTag tag="M" /> `clearImmediate(immediateObject)`

<Metadata data={{"update":{"type":"added","version":["v0.9.1"]}}} />

<Metadata data={{"type":"global"}} />

[`clearImmediate`][] is described in the [timers][] section.

### <DataTag tag="M" /> `clearInterval(intervalObject)`

<Metadata data={{"update":{"type":"added","version":["v0.0.1"]}}} />

<Metadata data={{"type":"global"}} />

[`clearInterval`][] is described in the [timers][] section.

### <DataTag tag="M" /> `clearTimeout(timeoutObject)`

<Metadata data={{"update":{"type":"added","version":["v0.0.1"]}}} />

<Metadata data={{"type":"global"}} />

[`clearTimeout`][] is described in the [timers][] section.

### <DataTag tag="C" /> `CompressionStream`

<Metadata data={{"update":{"type":"added","version":["v18.0.0"]}}} />

<Stability stability={1}>

Experimental.

</Stability>

A browser-compatible implementation of [`CompressionStream`][].

### <DataTag tag="M" /> `console`

<Metadata data={{"update":{"type":"added","version":["v0.1.100"]}}} />

<Metadata data={{"type":"global"}} />

* [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

Used to print to stdout and stderr. See the [`console`][] section.

### <DataTag tag="C" /> `CountQueuingStrategy`

<Metadata data={{"update":{"type":"added","version":["v18.0.0"]}}} />

<Stability stability={1}>

Experimental.

</Stability>

A browser-compatible implementation of [`CountQueuingStrategy`][].

### <DataTag tag="M" /> `Crypto`

<Metadata data={{"update":{"type":"added","version":["v17.6.0"]}}} />

<Stability stability={1}>

Experimental. Enable this API with the [`--experimental-global-webcrypto`][] CLI flag.

</Stability>

A browser-compatible implementation of [`Crypto`](/api/v18/webcrypto#crypto). This global is available
only if the Node.js binary was compiled with including support for the
`node:crypto` module.

### <DataTag tag="M" /> `crypto`

<Metadata data={{"update":{"type":"added","version":["v17.6.0"]}}} />

<Stability stability={1}>

Experimental. Enable this API with the [`--experimental-global-webcrypto`][] CLI flag.

</Stability>

A browser-compatible implementation of the [Web Crypto API][].

### <DataTag tag="M" /> `CryptoKey`

<Metadata data={{"update":{"type":"added","version":["v17.6.0"]}}} />

<Stability stability={1}>

Experimental. Enable this API with the [`--experimental-global-webcrypto`][] CLI flag.

</Stability>

A browser-compatible implementation of [`CryptoKey`](/api/v18/webcrypto#cryptokey). This global is available
only if the Node.js binary was compiled with including support for the
`node:crypto` module.

### <DataTag tag="M" /> `CustomEvent`

<Metadata data={{"update":{"type":"added","version":["v18.7.0"]}}} />

<Stability stability={1}>

Experimental. Enable this API with the [`--experimental-global-customevent`][] CLI flag.

</Stability>

<Metadata data={{"type":"global"}} />

A browser-compatible implementation of the [`CustomEvent` Web API][].

### <DataTag tag="C" /> `DecompressionStream`

<Metadata data={{"update":{"type":"added","version":["v18.0.0"]}}} />

<Stability stability={1}>

Experimental.

</Stability>

A browser-compatible implementation of [`DecompressionStream`][].

### <DataTag tag="M" /> `Event`

<Metadata data={{"changes":[{"version":"v15.4.0","pr-url":"https://github.com/nodejs/node/pull/35949","description":"No longer experimental."}],"update":{"type":"added","version":["v15.0.0"]}}} />

<Metadata data={{"type":"global"}} />

A browser-compatible implementation of the `Event` class. See
[`EventTarget` and `Event` API][] for more details.

### <DataTag tag="M" /> `EventTarget`

<Metadata data={{"changes":[{"version":"v15.4.0","pr-url":"https://github.com/nodejs/node/pull/35949","description":"No longer experimental."}],"update":{"type":"added","version":["v15.0.0"]}}} />

<Metadata data={{"type":"global"}} />

A browser-compatible implementation of the `EventTarget` class. See
[`EventTarget` and `Event` API][] for more details.

### <DataTag tag="M" /> `exports`

This variable may appear to be global but is not. See [`exports`][].

### <DataTag tag="M" /> `fetch`

<Metadata data={{"changes":[{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/41811","description":"No longer behind `--experimental-global-fetch` CLI flag."}],"update":{"type":"added","version":["v17.5.0"]}}} />

<Stability stability={1}>

Experimental. Disable this API with the [`--no-experimental-fetch`][] CLI flag.

</Stability>

A browser-compatible implementation of the [`fetch()`][] function.

### Class `FormData`

<Metadata data={{"changes":[{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/41811","description":"No longer behind `--experimental-global-fetch` CLI flag."}],"update":{"type":"added","version":["v17.6.0"]}}} />

<Stability stability={1}>

Experimental. Disable this API with the [`--no-experimental-fetch`][] CLI flag.

</Stability>

A browser-compatible implementation of [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData).

### <DataTag tag="M" /> `global`

<Metadata data={{"update":{"type":"added","version":["v0.1.27"]}}} />

<Metadata data={{"type":"global"}} />

* [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) The global namespace object.

In browsers, the top-level scope is the global scope. This means that
within the browser `var something` will define a new global variable. In
Node.js this is different. The top-level scope is not the global scope;
`var something` inside a Node.js module will be local to that module.

### Class `Headers`

<Metadata data={{"changes":[{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/41811","description":"No longer behind `--experimental-global-fetch` CLI flag."}],"update":{"type":"added","version":["v17.5.0"]}}} />

<Stability stability={1}>

Experimental. Disable this API with the [`--no-experimental-fetch`][] CLI flag.

</Stability>

A browser-compatible implementation of [`Headers`](https://developer.mozilla.org/en-US/docs/Web/API/Headers).

### <DataTag tag="M" /> `MessageChannel`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

<Metadata data={{"type":"global"}} />

The `MessageChannel` class. See [`MessageChannel`][] for more details.

### <DataTag tag="M" /> `MessageEvent`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

<Metadata data={{"type":"global"}} />

The `MessageEvent` class. See [`MessageEvent`][] for more details.

### <DataTag tag="M" /> `MessagePort`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

<Metadata data={{"type":"global"}} />

The `MessagePort` class. See [`MessagePort`][] for more details.

### <DataTag tag="M" /> `module`

This variable may appear to be global but is not. See [`module`][].

### <DataTag tag="M" /> `performance`

<Metadata data={{"update":{"type":"added","version":["v16.0.0"]}}} />

The [`perf_hooks.performance`][] object.

### <DataTag tag="M" /> `process`

<Metadata data={{"update":{"type":"added","version":["v0.1.7"]}}} />

<Metadata data={{"type":"global"}} />

* [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

The process object. See the [`process` object][] section.

### <DataTag tag="M" /> `queueMicrotask(callback)`

<Metadata data={{"update":{"type":"added","version":["v11.0.0"]}}} />

<Metadata data={{"type":"global"}} />

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

### <DataTag tag="C" /> `ReadableByteStreamController`

<Metadata data={{"update":{"type":"added","version":["v18.0.0"]}}} />

<Stability stability={1}>

Experimental.

</Stability>

A browser-compatible implementation of [`ReadableByteStreamController`][].

### <DataTag tag="C" /> `ReadableStream`

<Metadata data={{"update":{"type":"added","version":["v18.0.0"]}}} />

<Stability stability={1}>

Experimental.

</Stability>

A browser-compatible implementation of [`ReadableStream`][].

### <DataTag tag="C" /> `ReadableStreamBYOBReader`

<Metadata data={{"update":{"type":"added","version":["v18.0.0"]}}} />

<Stability stability={1}>

Experimental.

</Stability>

A browser-compatible implementation of [`ReadableStreamBYOBReader`][].

### <DataTag tag="C" /> `ReadableStreamBYOBRequest`

<Metadata data={{"update":{"type":"added","version":["v18.0.0"]}}} />

<Stability stability={1}>

Experimental.

</Stability>

A browser-compatible implementation of [`ReadableStreamBYOBRequest`][].

### <DataTag tag="C" /> `ReadableStreamDefaultController`

<Metadata data={{"update":{"type":"added","version":["v18.0.0"]}}} />

<Stability stability={1}>

Experimental.

</Stability>

A browser-compatible implementation of [`ReadableStreamDefaultController`][].

### <DataTag tag="C" /> `ReadableStreamDefaultReader`

<Metadata data={{"update":{"type":"added","version":["v18.0.0"]}}} />

<Stability stability={1}>

Experimental.

</Stability>

A browser-compatible implementation of [`ReadableStreamDefaultReader`][].

### <DataTag tag="M" /> `require()`

This variable may appear to be global but is not. See [`require()`][].

### <DataTag tag="M" /> `Response`

<Metadata data={{"changes":[{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/41811","description":"No longer behind `--experimental-global-fetch` CLI flag."}],"update":{"type":"added","version":["v17.5.0"]}}} />

<Stability stability={1}>

Experimental. Disable this API with the [`--no-experimental-fetch`][] CLI flag.

</Stability>

A browser-compatible implementation of [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response).

### <DataTag tag="M" /> `Request`

<Metadata data={{"changes":[{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/41811","description":"No longer behind `--experimental-global-fetch` CLI flag."}],"update":{"type":"added","version":["v17.5.0"]}}} />

<Stability stability={1}>

Experimental. Disable this API with the [`--no-experimental-fetch`][] CLI flag.

</Stability>

A browser-compatible implementation of [`Request`](https://developer.mozilla.org/en-US/docs/Web/API/Request).

### <DataTag tag="M" /> `setImmediate(callback[, ...args])`

<Metadata data={{"update":{"type":"added","version":["v0.9.1"]}}} />

<Metadata data={{"type":"global"}} />

[`setImmediate`][] is described in the [timers][] section.

### <DataTag tag="M" /> `setInterval(callback, delay[, ...args])`

<Metadata data={{"update":{"type":"added","version":["v0.0.1"]}}} />

<Metadata data={{"type":"global"}} />

[`setInterval`][] is described in the [timers][] section.

### <DataTag tag="M" /> `setTimeout(callback, delay[, ...args])`

<Metadata data={{"update":{"type":"added","version":["v0.0.1"]}}} />

<Metadata data={{"type":"global"}} />

[`setTimeout`][] is described in the [timers][] section.

### <DataTag tag="M" /> `structuredClone(value[, options])`

<Metadata data={{"update":{"type":"added","version":["v17.0.0"]}}} />

<Metadata data={{"type":"global"}} />

The WHATWG [`structuredClone`][] method.

### <DataTag tag="M" /> `SubtleCrypto`

<Metadata data={{"update":{"type":"added","version":["v17.6.0"]}}} />

<Stability stability={1}>

Experimental. Enable this API with the [`--experimental-global-webcrypto`][] CLI flag.

</Stability>

A browser-compatible implementation of [`SubtleCrypto`](/api/v18/webcrypto#subtlecrypto). This global is available
only if the Node.js binary was compiled with including support for the
`node:crypto` module.

### <DataTag tag="M" /> `DOMException`

<Metadata data={{"update":{"type":"added","version":["v17.0.0"]}}} />

<Metadata data={{"type":"global"}} />

The WHATWG `DOMException` class. See [`DOMException`][] for more details.

### <DataTag tag="M" /> `TextDecoder`

<Metadata data={{"update":{"type":"added","version":["v11.0.0"]}}} />

<Metadata data={{"type":"global"}} />

The WHATWG `TextDecoder` class. See the [`TextDecoder`][] section.

### <DataTag tag="C" /> `TextDecoderStream`

<Metadata data={{"update":{"type":"added","version":["v18.0.0"]}}} />

<Stability stability={1}>

Experimental.

</Stability>

A browser-compatible implementation of [`TextDecoderStream`][].

### <DataTag tag="M" /> `TextEncoder`

<Metadata data={{"update":{"type":"added","version":["v11.0.0"]}}} />

<Metadata data={{"type":"global"}} />

The WHATWG `TextEncoder` class. See the [`TextEncoder`][] section.

### <DataTag tag="C" /> `TextEncoderStream`

<Metadata data={{"update":{"type":"added","version":["v18.0.0"]}}} />

<Stability stability={1}>

Experimental.

</Stability>

A browser-compatible implementation of [`TextEncoderStream`][].

### <DataTag tag="C" /> `TransformStream`

<Metadata data={{"update":{"type":"added","version":["v18.0.0"]}}} />

<Stability stability={1}>

Experimental.

</Stability>

A browser-compatible implementation of [`TransformStream`][].

### <DataTag tag="C" /> `TransformStreamDefaultController`

<Metadata data={{"update":{"type":"added","version":["v18.0.0"]}}} />

<Stability stability={1}>

Experimental.

</Stability>

A browser-compatible implementation of [`TransformStreamDefaultController`][].

### <DataTag tag="M" /> `URL`

<Metadata data={{"update":{"type":"added","version":["v10.0.0"]}}} />

<Metadata data={{"type":"global"}} />

The WHATWG `URL` class. See the [`URL`][] section.

### <DataTag tag="M" /> `URLSearchParams`

<Metadata data={{"update":{"type":"added","version":["v10.0.0"]}}} />

<Metadata data={{"type":"global"}} />

The WHATWG `URLSearchParams` class. See the [`URLSearchParams`][] section.

### <DataTag tag="M" /> `WebAssembly`

<Metadata data={{"update":{"type":"added","version":["v8.0.0"]}}} />

<Metadata data={{"type":"global"}} />

* [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

The object that acts as the namespace for all W3C
[WebAssembly][webassembly-org] related functionality. See the
[Mozilla Developer Network][webassembly-mdn] for usage and compatibility.

### <DataTag tag="C" /> `WritableStream`

<Metadata data={{"update":{"type":"added","version":["v18.0.0"]}}} />

<Stability stability={1}>

Experimental.

</Stability>

A browser-compatible implementation of [`WritableStream`][].

### <DataTag tag="C" /> `WritableStreamDefaultController`

<Metadata data={{"update":{"type":"added","version":["v18.0.0"]}}} />

<Stability stability={1}>

Experimental.

</Stability>

A browser-compatible implementation of [`WritableStreamDefaultController`][].

### <DataTag tag="C" /> `WritableStreamDefaultWriter`

<Metadata data={{"update":{"type":"added","version":["v18.0.0"]}}} />

<Stability stability={1}>

Experimental.

</Stability>

A browser-compatible implementation of [`WritableStreamDefaultWriter`][].

[Web Crypto API]: /api/v18/webcrypto
[`--experimental-global-customevent`]: /api/v18/cli#--experimental-global-customevent
[`--experimental-global-webcrypto`]: /api/v18/cli#--experimental-global-webcrypto
[`--no-experimental-fetch`]: /api/v18/cli#--no-experimental-fetch
[`AbortController`]: https://developer.mozilla.org/en-US/docs/Web/API/AbortController
[`ByteLengthQueuingStrategy`]: /api/v18/webstreams#class-bytelengthqueuingstrategy
[`CompressionStream`]: /api/v18/webstreams#class-compressionstream
[`CountQueuingStrategy`]: /api/v18/webstreams#class-countqueuingstrategy
[`CustomEvent` Web API]: https://dom.spec.whatwg.org/#customevent
[`DOMException`]: https://developer.mozilla.org/en-US/docs/Web/API/DOMException
[`DecompressionStream`]: /api/v18/webstreams#class-decompressionstream
[`EventTarget` and `Event` API]: /api/v18/events#eventtarget-and-event-api
[`MessageChannel`]: worker_threads.md#class-messagechannel
[`MessageEvent`]: https://developer.mozilla.org/en-US/docs/Web/API/MessageEvent/MessageEvent
[`MessagePort`]: worker_threads.md#class-messageport
[`ReadableByteStreamController`]: /api/v18/webstreams#class-readablebytestreamcontroller
[`ReadableStreamBYOBReader`]: /api/v18/webstreams#class-readablestreambyobreader
[`ReadableStreamBYOBRequest`]: /api/v18/webstreams#class-readablestreambyobrequest
[`ReadableStreamDefaultController`]: /api/v18/webstreams#class-readablestreamdefaultcontroller
[`ReadableStreamDefaultReader`]: /api/v18/webstreams#class-readablestreamdefaultreader
[`ReadableStream`]: /api/v18/webstreams#class-readablestream
[`TextDecoderStream`]: /api/v18/webstreams#class-textdecoderstream
[`TextDecoder`]: /api/v18/util#class-utiltextdecoder
[`TextEncoderStream`]: /api/v18/webstreams#class-textencoderstream
[`TextEncoder`]: /api/v18/util#class-utiltextencoder
[`TransformStreamDefaultController`]: /api/v18/webstreams#class-transformstreamdefaultcontroller
[`TransformStream`]: /api/v18/webstreams#class-transformstream
[`URLSearchParams`]: /api/v18/url#class-urlsearchparams
[`URL`]: /api/v18/url#class-url
[`WritableStreamDefaultController`]: /api/v18/webstreams#class-writablestreamdefaultcontroller
[`WritableStreamDefaultWriter`]: /api/v18/webstreams#class-writablestreamdefaultwriter
[`WritableStream`]: /api/v18/webstreams#class-writablestream
[`__dirname`]: /api/v18/modules#__dirname
[`__filename`]: /api/v18/modules#__filename
[`buffer.atob()`]: /api/v18/buffer#bufferatobdata
[`buffer.btoa()`]: /api/v18/buffer#bufferbtoadata
[`clearImmediate`]: /api/v18/timers#clearimmediateimmediate
[`clearInterval`]: /api/v18/timers#clearintervaltimeout
[`clearTimeout`]: /api/v18/timers#cleartimeouttimeout
[`console`]: /api/v18/console
[`exports`]: /api/v18/modules#exports
[`fetch()`]: https://developer.mozilla.org/en-US/docs/Web/API/fetch
[`module`]: /api/v18/modules#module
[`perf_hooks.performance`]: perf_hooks.md#perf_hooksperformance
[`process.nextTick()`]: /api/v18/process#processnexttickcallback-args
[`process` object]: /api/v18/process#process
[`require()`]: /api/v18/modules#requireid
[`setImmediate`]: /api/v18/timers#setimmediatecallback-args
[`setInterval`]: /api/v18/timers#setintervalcallback-delay-args
[`setTimeout`]: /api/v18/timers#settimeoutcallback-delay-args
[`structuredClone`]: https://developer.mozilla.org/en-US/docs/Web/API/structuredClone
[buffer section]: /api/v18/buffer
[built-in objects]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects
[module system documentation]: /api/v18/modules
[timers]: /api/v18/timers
[webassembly-mdn]: https://developer.mozilla.org/en-US/docs/WebAssembly
[webassembly-org]: https://webassembly.org
