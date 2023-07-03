---
title: 'globals'
displayTitle: 'Global objects'
category: 'api'
version: 'v20'
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

console.log(ac.signal.aborted);  // Prints true
```

#### <DataTag tag="M" /> `abortController.abort([reason])`

<Metadata data={{"changes":[{"version":["v17.2.0","v16.14.0"],"pr-url":"https://github.com/nodejs/node/pull/40807","description":"Added the new optional reason argument."}],"update":{"type":"added","version":["v15.0.0","v14.17.0"]}}} />

* `reason` [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types) An optional reason, retrievable on the `AbortSignal`'s
  `reason` property.

Triggers the abort signal, causing the `abortController.signal` to emit
the `'abort'` event.

#### <DataTag tag="M" /> `abortController.signal`

<Metadata data={{"update":{"type":"added","version":["v15.0.0","v14.17.0"]}}} />

* Type: [`AbortSignal`](/api/v20/globals#abortsignal)

#### <DataTag tag="C" /> `AbortSignal`

<Metadata data={{"update":{"type":"added","version":["v15.0.0","v14.17.0"]}}} />

* Extends: [`EventTarget`](/api/v20/events#eventtarget)

The `AbortSignal` is used to notify observers when the
`abortController.abort()` method is called.

##### Static method: `AbortSignal.abort([reason])`

<Metadata data={{"changes":[{"version":["v17.2.0","v16.14.0"],"pr-url":"https://github.com/nodejs/node/pull/40807","description":"Added the new optional reason argument."}],"update":{"type":"added","version":["v15.12.0","v14.17.0"]}}} />

* `reason`: [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types)
* Returns: [`AbortSignal`](/api/v20/globals#abortsignal)

Returns a new already aborted `AbortSignal`.

##### Static method: `AbortSignal.timeout(delay)`

<Metadata data={{"update":{"type":"added","version":["v17.3.0","v16.14.0"]}}} />

* `delay` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The number of milliseconds to wait before triggering
  the AbortSignal.

Returns a new `AbortSignal` which will be aborted in `delay` milliseconds.

##### Static method: `AbortSignal.any(signals)`

<Metadata data={{"update":{"type":"added","version":["v20.3.0"]}}} />

* `signals` AbortSignal\[] The `AbortSignal`s of which to compose a new `AbortSignal`.

Returns a new `AbortSignal` which will be aborted if any of the provided
signals are aborted. Its [`abortSignal.reason`][] will be set to whichever
one of the `signals` caused it to be aborted.

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
console.log(ac.signal.reason);  // Error: boom!
```

##### <DataTag tag="M" /> `abortSignal.throwIfAborted()`

<Metadata data={{"update":{"type":"added","version":["v17.3.0","v16.17.0"]}}} />

If `abortSignal.aborted` is `true`, throws `abortSignal.reason`.

### <DataTag tag="C" /> `Blob`

<Metadata data={{"update":{"type":"added","version":["v18.0.0"]}}} />

<Metadata data={{"type":"global"}} />

See [`Blob`](/api/v20/buffer#blob).

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

See [`BroadcastChannel`](/api/v20/worker_threads#broadcastchannel-extends-eventtarget).

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

<Metadata data={{"changes":[{"version":"v19.0.0","pr-url":"https://github.com/nodejs/node/pull/42083","description":"No longer behind `--experimental-global-webcrypto` CLI flag."}],"update":{"type":"added","version":["v17.6.0","v16.15.0"]}}} />

<Stability stability={1}>

Experimental. Disable this API with the [`--no-experimental-global-webcrypto`][] CLI flag.

</Stability>

A browser-compatible implementation of [`Crypto`](/api/v20/webcrypto#crypto). This global is available
only if the Node.js binary was compiled with including support for the
`node:crypto` module.

### <DataTag tag="M" /> `crypto`

<Metadata data={{"changes":[{"version":"v19.0.0","pr-url":"https://github.com/nodejs/node/pull/42083","description":"No longer behind `--experimental-global-webcrypto` CLI flag."}],"update":{"type":"added","version":["v17.6.0","v16.15.0"]}}} />

<Stability stability={1}>

Experimental. Disable this API with the [`--no-experimental-global-webcrypto`][] CLI flag.

</Stability>

A browser-compatible implementation of the [Web Crypto API][].

### <DataTag tag="M" /> `CryptoKey`

<Metadata data={{"changes":[{"version":"v19.0.0","pr-url":"https://github.com/nodejs/node/pull/42083","description":"No longer behind `--experimental-global-webcrypto` CLI flag."}],"update":{"type":"added","version":["v17.6.0","v16.15.0"]}}} />

<Stability stability={1}>

Experimental. Disable this API with the [`--no-experimental-global-webcrypto`][] CLI flag.

</Stability>

A browser-compatible implementation of [`CryptoKey`](/api/v20/webcrypto#cryptokey). This global is available
only if the Node.js binary was compiled with including support for the
`node:crypto` module.

### <DataTag tag="M" /> `CustomEvent`

<Metadata data={{"changes":[{"version":"v19.0.0","pr-url":"https://github.com/nodejs/node/pull/44860","description":"No longer behind `--experimental-global-customevent` CLI flag."}],"update":{"type":"added","version":["v18.7.0","v16.17.0"]}}} />

<Stability stability={1}>

Experimental. Disable this API with the [`--no-experimental-global-customevent`][] CLI flag.

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

<Metadata data={{"changes":[{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/41811","description":"No longer behind `--experimental-global-fetch` CLI flag."}],"update":{"type":"added","version":["v17.5.0","v16.15.0"]}}} />

<Stability stability={1}>

Experimental. Disable this API with the [`--no-experimental-fetch`][] CLI flag.

</Stability>

A browser-compatible implementation of the [`fetch()`][] function.

### <DataTag tag="C" /> `File`

<Metadata data={{"update":{"type":"added","version":["v20.0.0"]}}} />

<Metadata data={{"type":"global"}} />

See File.

### Class `FormData`

<Metadata data={{"changes":[{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/41811","description":"No longer behind `--experimental-global-fetch` CLI flag."}],"update":{"type":"added","version":["v17.6.0","v16.15.0"]}}} />

<Stability stability={1}>

Experimental. Disable this API with the [`--no-experimental-fetch`][] CLI flag.

</Stability>

A browser-compatible implementation of [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData).

### <DataTag tag="M" /> `global`

<Metadata data={{"update":{"type":"added","version":["v0.1.27"]}}} />

<Metadata data={{"type":"global"}} />

<Stability stability={3}>

Legacy. Use [`globalThis`][] instead.

</Stability>

* [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) The global namespace object.

In browsers, the top-level scope has traditionally been the global scope. This
means that `var something` will define a new global variable, except within
ECMAScript modules. In Node.js, this is different. The top-level scope is not
the global scope; `var something` inside a Node.js module will be local to that
module, regardless of whether it is a [CommonJS module][] or an
[ECMAScript module][].

### Class `Headers`

<Metadata data={{"changes":[{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/41811","description":"No longer behind `--experimental-global-fetch` CLI flag."}],"update":{"type":"added","version":["v17.5.0","v16.15.0"]}}} />

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

### <DataTag tag="M" /> `PerformanceEntry`

<Metadata data={{"update":{"type":"added","version":["v19.0.0"]}}} />

<Metadata data={{"type":"global"}} />

The `PerformanceEntry` class. See [`PerformanceEntry`][] for more details.

### <DataTag tag="M" /> `PerformanceMark`

<Metadata data={{"update":{"type":"added","version":["v19.0.0"]}}} />

<Metadata data={{"type":"global"}} />

The `PerformanceMark` class. See [`PerformanceMark`][] for more details.

### <DataTag tag="M" /> `PerformanceMeasure`

<Metadata data={{"update":{"type":"added","version":["v19.0.0"]}}} />

<Metadata data={{"type":"global"}} />

The `PerformanceMeasure` class. See [`PerformanceMeasure`][] for more details.

### <DataTag tag="M" /> `PerformanceObserver`

<Metadata data={{"update":{"type":"added","version":["v19.0.0"]}}} />

<Metadata data={{"type":"global"}} />

The `PerformanceObserver` class. See [`PerformanceObserver`][] for more details.

### <DataTag tag="M" /> `PerformanceObserverEntryList`

<Metadata data={{"update":{"type":"added","version":["v19.0.0"]}}} />

<Metadata data={{"type":"global"}} />

The `PerformanceObserverEntryList` class. See
[`PerformanceObserverEntryList`][] for more details.

### <DataTag tag="M" /> `PerformanceResourceTiming`

<Metadata data={{"update":{"type":"added","version":["v19.0.0"]}}} />

<Metadata data={{"type":"global"}} />

The `PerformanceResourceTiming` class. See [`PerformanceResourceTiming`][] for
more details.

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

<Metadata data={{"changes":[{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/41811","description":"No longer behind `--experimental-global-fetch` CLI flag."}],"update":{"type":"added","version":["v17.5.0","v16.15.0"]}}} />

<Stability stability={1}>

Experimental. Disable this API with the [`--no-experimental-fetch`][] CLI flag.

</Stability>

A browser-compatible implementation of [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response).

### <DataTag tag="M" /> `Request`

<Metadata data={{"changes":[{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/41811","description":"No longer behind `--experimental-global-fetch` CLI flag."}],"update":{"type":"added","version":["v17.5.0","v16.15.0"]}}} />

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

<Metadata data={{"changes":[{"version":"v19.0.0","pr-url":"https://github.com/nodejs/node/pull/42083","description":"No longer behind `--experimental-global-webcrypto` CLI flag."}],"update":{"type":"added","version":["v17.6.0","v16.15.0"]}}} />

<Stability stability={1}>

Experimental. Disable this API with the [`--no-experimental-global-webcrypto`][] CLI flag.

</Stability>

A browser-compatible implementation of [`SubtleCrypto`](/api/v20/webcrypto#subtlecrypto). This global is available
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

[CommonJS module]: /api/v20/modules
[ECMAScript module]: /api/v20/esm
[Web Crypto API]: /api/v20/webcrypto
[`--no-experimental-fetch`]: /api/v20/cli#--no-experimental-fetch
[`--no-experimental-global-customevent`]: /api/v20/cli#--no-experimental-global-customevent
[`--no-experimental-global-webcrypto`]: /api/v20/cli#--no-experimental-global-webcrypto
[`AbortController`]: https://developer.mozilla.org/en-US/docs/Web/API/AbortController
[`ByteLengthQueuingStrategy`]: /api/v20/webstreams#class-bytelengthqueuingstrategy
[`CompressionStream`]: /api/v20/webstreams#class-compressionstream
[`CountQueuingStrategy`]: /api/v20/webstreams#class-countqueuingstrategy
[`CustomEvent` Web API]: https://dom.spec.whatwg.org/#customevent
[`DOMException`]: https://developer.mozilla.org/en-US/docs/Web/API/DOMException
[`DecompressionStream`]: /api/v20/webstreams#class-decompressionstream
[`EventTarget` and `Event` API]: /api/v20/events#eventtarget-and-event-api
[`MessageChannel`]: worker_threads.md#class-messagechannel
[`MessageEvent`]: https://developer.mozilla.org/en-US/docs/Web/API/MessageEvent/MessageEvent
[`MessagePort`]: worker_threads.md#class-messageport
[`PerformanceEntry`]: perf_hooks.md#class-performanceentry
[`PerformanceMark`]: perf_hooks.md#class-performancemark
[`PerformanceMeasure`]: perf_hooks.md#class-performancemeasure
[`PerformanceObserverEntryList`]: perf_hooks.md#class-performanceobserverentrylist
[`PerformanceObserver`]: perf_hooks.md#class-performanceobserver
[`PerformanceResourceTiming`]: perf_hooks.md#class-performanceresourcetiming
[`ReadableByteStreamController`]: /api/v20/webstreams#class-readablebytestreamcontroller
[`ReadableStreamBYOBReader`]: /api/v20/webstreams#class-readablestreambyobreader
[`ReadableStreamBYOBRequest`]: /api/v20/webstreams#class-readablestreambyobrequest
[`ReadableStreamDefaultController`]: /api/v20/webstreams#class-readablestreamdefaultcontroller
[`ReadableStreamDefaultReader`]: /api/v20/webstreams#class-readablestreamdefaultreader
[`ReadableStream`]: /api/v20/webstreams#class-readablestream
[`TextDecoderStream`]: /api/v20/webstreams#class-textdecoderstream
[`TextDecoder`]: /api/v20/util#class-utiltextdecoder
[`TextEncoderStream`]: /api/v20/webstreams#class-textencoderstream
[`TextEncoder`]: /api/v20/util#class-utiltextencoder
[`TransformStreamDefaultController`]: /api/v20/webstreams#class-transformstreamdefaultcontroller
[`TransformStream`]: /api/v20/webstreams#class-transformstream
[`URLSearchParams`]: /api/v20/url#class-urlsearchparams
[`URL`]: /api/v20/url#class-url
[`WritableStreamDefaultController`]: /api/v20/webstreams#class-writablestreamdefaultcontroller
[`WritableStreamDefaultWriter`]: /api/v20/webstreams#class-writablestreamdefaultwriter
[`WritableStream`]: /api/v20/webstreams#class-writablestream
[`__dirname`]: /api/v20/modules#__dirname
[`__filename`]: /api/v20/modules#__filename
[`abortSignal.reason`]: #abortsignalreason
[`buffer.atob()`]: /api/v20/buffer#bufferatobdata
[`buffer.btoa()`]: /api/v20/buffer#bufferbtoadata
[`clearImmediate`]: /api/v20/timers#clearimmediateimmediate
[`clearInterval`]: /api/v20/timers#clearintervaltimeout
[`clearTimeout`]: /api/v20/timers#cleartimeouttimeout
[`console`]: /api/v20/console
[`exports`]: /api/v20/modules#exports
[`fetch()`]: https://developer.mozilla.org/en-US/docs/Web/API/fetch
[`globalThis`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis
[`module`]: /api/v20/modules#module
[`perf_hooks.performance`]: perf_hooks.md#perf_hooksperformance
[`process.nextTick()`]: /api/v20/process#processnexttickcallback-args
[`process` object]: /api/v20/process#process
[`require()`]: /api/v20/modules#requireid
[`setImmediate`]: /api/v20/timers#setimmediatecallback-args
[`setInterval`]: /api/v20/timers#setintervalcallback-delay-args
[`setTimeout`]: /api/v20/timers#settimeoutcallback-delay-args
[`structuredClone`]: https://developer.mozilla.org/en-US/docs/Web/API/structuredClone
[buffer section]: /api/v20/buffer
[built-in objects]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects
[module system documentation]: /api/v20/modules
[timers]: /api/v20/timers
[webassembly-mdn]: https://developer.mozilla.org/en-US/docs/WebAssembly
[webassembly-org]: https://webassembly.org
