---
title: 'webstreams'
displayTitle: 'Web Streams API'
category: 'api'
version: 'v18'
---

<MC data={{"update":{"type":"introduced_in","version":["v16.5.0"]}}} />

<MC data={{"changes":[{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/42225","description":"Use of this API no longer emit a runtime warning."}],"update":{"type":"added","version":["v16.5.0"]}}} />

<MC data={{"stability":{"level":1,"text":" - Experimental."}}} />

An implementation of the [WHATWG Streams Standard][].

### Overview

The [WHATWG Streams Standard][] (or "web streams") defines an API for handling
streaming data. It is similar to the Node.js [Streams][] API but emerged later
and has become the "standard" API for streaming data across many JavaScript
environments.

There are three primary types of objects:

* `ReadableStream` - Represents a source of streaming data.
* `WritableStream` - Represents a destination for streaming data.
* `TransformStream` - Represents an algorithm for transforming streaming data.

#### Example `ReadableStream`

This example creates a simple `ReadableStream` that pushes the current
`performance.now()` timestamp once every second forever. An async iterable
is used to read the data from the stream.

```mjs
import {
  ReadableStream
} from 'node:stream/web';

import {
  setInterval as every
} from 'node:timers/promises';

import {
  performance
} from 'node:perf_hooks';

const SECOND = 1000;

const stream = new ReadableStream({
  async start(controller) {
    for await (const _ of every(SECOND))
      controller.enqueue(performance.now());
  }
});

for await (const value of stream)
  console.log(value);
```

```cjs
const {
  ReadableStream
} = require('node:stream/web');

const {
  setInterval: every
} = require('node:timers/promises');

const {
  performance
} = require('node:perf_hooks');

const SECOND = 1000;

const stream = new ReadableStream({
  async start(controller) {
    for await (const _ of every(SECOND))
      controller.enqueue(performance.now());
  }
});

(async () => {
  for await (const value of stream)
    console.log(value);
})();
```

### API

#### <Tag tag="C" /> `ReadableStream`

<MC data={{"changes":[{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/42225","description":"This class is now exposed on the global object."}],"update":{"type":"added","version":["v16.5.0"]}}} />

##### <Tag tag="M" /> `new ReadableStream([underlyingSource [, strategy]])`

<MC data={{"update":{"type":"added","version":["v16.5.0"]}}} />



* `underlyingSource` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `start` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) A user-defined function that is invoked immediately when
    the `ReadableStream` is created.
    * `controller` [`ReadableStreamDefaultController`](/api/webstreams#readablestreamdefaultcontroller) | [`ReadableByteStreamController`](/api/webstreams#readablebytestreamcontroller)
    * Returns: `undefined` or a promise fulfilled with `undefined`.
  * `pull` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) A user-defined function that is called repeatedly when the
    `ReadableStream` internal queue is not full. The operation may be sync or
    async. If async, the function will not be called again until the previously
    returned promise is fulfilled.
    * `controller` [`ReadableStreamDefaultController`](/api/webstreams#readablestreamdefaultcontroller) | [`ReadableByteStreamController`](/api/webstreams#readablebytestreamcontroller)
    * Returns: A promise fulfilled with `undefined`.
  * `cancel` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) A user-defined function that is called when the
    `ReadableStream` is canceled.
    * `reason` [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types)
    * Returns: A promise fulfilled with `undefined`.
  * `type` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Must be `'bytes'` or `undefined`.
  * `autoAllocateChunkSize` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) Used only when `type` is equal to
    `'bytes'`.
* `strategy` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `highWaterMark` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The maximum internal queue size before backpressure
    is applied.
  * `size` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) A user-defined function used to identify the size of each
    chunk of data.
    * `chunk` [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types)
    * Returns: [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)



##### <Tag tag="M" /> `readableStream.locked`

<MC data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* Type: [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) Set to `true` if there is an active reader for this
  [`ReadableStream`](/api/webstreams#readablestream).

The `readableStream.locked` property is `false` by default, and is
switched to `true` while there is an active reader consuming the
stream's data.

##### <Tag tag="M" /> `readableStream.cancel([reason])`

<MC data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* `reason` [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types)
* Returns: A promise fulfilled with `undefined` once cancelation has
  been completed.

##### <Tag tag="M" /> `readableStream.getReader([options])`

<MC data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `mode` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) `'byob'` or `undefined`
* Returns: [`ReadableStreamDefaultReader`](/api/webstreams#readablestreamdefaultreader) | [`ReadableStreamBYOBReader`](/api/webstreams#readablestreambyobreader)

```mjs
import { ReadableStream } from 'node:stream/web';

const stream = new ReadableStream();

const reader = stream.getReader();

console.log(await reader.read());
```

```cjs
const { ReadableStream } = require('node:stream/web');

const stream = new ReadableStream();

const reader = stream.getReader();

reader.read().then(console.log);
```

Causes the `readableStream.locked` to be `true`.

##### <Tag tag="M" /> `readableStream.pipeThrough(transform[, options])`

<MC data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* `transform` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `readable` [`ReadableStream`](/api/webstreams#readablestream) The `ReadableStream` to which
    `transform.writable` will push the potentially modified data
    is receives from this `ReadableStream`.
  * `writable` [`WritableStream`](/api/webstreams#writablestream) The `WritableStream` to which this
    `ReadableStream`'s data will be written.
* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `preventAbort` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) When `true`, errors in this `ReadableStream`
    will not cause `transform.writable` to be aborted.
  * `preventCancel` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) When `true`, errors in the destination
    `transform.writable` do not cause this `ReadableStream` to be
    canceled.
  * `preventClose` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) When `true`, closing this `ReadableStream`
    does not cause `transform.writable` to be closed.
  * `signal` [`AbortSignal`](/api/globals#abortsignal) Allows the transfer of data to be canceled
    using an [`AbortController`](/api/globals#abortcontroller).
* Returns: [`ReadableStream`](/api/webstreams#readablestream) From `transform.readable`.

Connects this [`ReadableStream`](/api/webstreams#readablestream) to the pair of [`ReadableStream`](/api/webstreams#readablestream) and
[`WritableStream`](/api/webstreams#writablestream) provided in the `transform` argument such that the
data from this [`ReadableStream`](/api/webstreams#readablestream) is written in to `transform.writable`,
possibly transformed, then pushed to `transform.readable`. Once the
pipeline is configured, `transform.readable` is returned.

Causes the `readableStream.locked` to be `true` while the pipe operation
is active.

```mjs
import {
  ReadableStream,
  TransformStream,
} from 'node:stream/web';

const stream = new ReadableStream({
  start(controller) {
    controller.enqueue('a');
  },
});

const transform = new TransformStream({
  transform(chunk, controller) {
    controller.enqueue(chunk.toUpperCase());
  }
});

const transformedStream = stream.pipeThrough(transform);

for await (const chunk of transformedStream)
  console.log(chunk);
```

```cjs
const {
  ReadableStream,
  TransformStream,
} = require('node:stream/web');

const stream = new ReadableStream({
  start(controller) {
    controller.enqueue('a');
  },
});

const transform = new TransformStream({
  transform(chunk, controller) {
    controller.enqueue(chunk.toUpperCase());
  }
});

const transformedStream = stream.pipeThrough(transform);

(async () => {
  for await (const chunk of transformedStream)
    console.log(chunk);
})();
```

##### <Tag tag="M" /> `readableStream.pipeTo(destination, options)`

<MC data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* `destination` [`WritableStream`](/api/webstreams#writablestream) A [`WritableStream`](/api/webstreams#writablestream) to which this
  `ReadableStream`'s data will be written.
* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `preventAbort` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) When `true`, errors in this `ReadableStream`
    will not cause `destination` to be aborted.
  * `preventCancel` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) When `true`, errors in the `destination`
    will not cause this `ReadableStream` to be canceled.
  * `preventClose` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) When `true`, closing this `ReadableStream`
    does not cause `destination` to be closed.
  * `signal` [`AbortSignal`](/api/globals#abortsignal) Allows the transfer of data to be canceled
    using an [`AbortController`](/api/globals#abortcontroller).
* Returns: A promise fulfilled with `undefined`

Causes the `readableStream.locked` to be `true` while the pipe operation
is active.

##### <Tag tag="M" /> `readableStream.tee()`

<MC data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* Returns: ReadableStream\[]

Returns a pair of new [`ReadableStream`](/api/webstreams#readablestream) instances to which this
`ReadableStream`'s data will be forwarded. Each will receive the
same data.

Causes the `readableStream.locked` to be `true`.

##### <Tag tag="M" /> `readableStream.values([options])`

<MC data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `preventCancel` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) When `true`, prevents the [`ReadableStream`](/api/webstreams#readablestream)
    from being closed when the async iterator abruptly terminates.
    **Default**: `false`.

Creates and returns an async iterator usable for consuming this
`ReadableStream`'s data.

Causes the `readableStream.locked` to be `true` while the async iterator
is active.

```mjs
import { Buffer } from 'node:buffer';

const stream = new ReadableStream(getSomeSource());

for await (const chunk of stream.values({ preventCancel: true }))
  console.log(Buffer.from(chunk).toString());
```

##### Async Iteration

The [`ReadableStream`](/api/webstreams#readablestream) object supports the async iterator protocol using
`for await` syntax.

```mjs
import { Buffer } from 'node:buffer';

const stream = new ReadableStream(getSomeSource());

for await (const chunk of stream)
  console.log(Buffer.from(chunk).toString());
```

The async iterator will consume the [`ReadableStream`](/api/webstreams#readablestream) until it terminates.

By default, if the async iterator exits early (via either a `break`,
`return`, or a `throw`), the [`ReadableStream`](/api/webstreams#readablestream) will be closed. To prevent
automatic closing of the [`ReadableStream`](/api/webstreams#readablestream), use the `readableStream.values()`
method to acquire the async iterator and set the `preventCancel` option to
`true`.

The [`ReadableStream`](/api/webstreams#readablestream) must not be locked (that is, it must not have an existing
active reader). During the async iteration, the [`ReadableStream`](/api/webstreams#readablestream) will be locked.

##### Transferring with `postMessage()`

A [`ReadableStream`](/api/webstreams#readablestream) instance can be transferred using a [`MessagePort`](/api/worker_threads#messageport).

```js
const stream = new ReadableStream(getReadableSourceSomehow());

const { port1, port2 } = new MessageChannel();

port1.onmessage = ({ data }) => {
  data.getReader().read().then((chunk) => {
    console.log(chunk);
  });
};

port2.postMessage(stream, [stream]);
```

#### <Tag tag="C" /> `ReadableStreamDefaultReader`

<MC data={{"changes":[{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/42225","description":"This class is now exposed on the global object."}],"update":{"type":"added","version":["v16.5.0"]}}} />

By default, calling `readableStream.getReader()` with no arguments
will return an instance of `ReadableStreamDefaultReader`. The default
reader treats the chunks of data passed through the stream as opaque
values, which allows the [`ReadableStream`](/api/webstreams#readablestream) to work with generally any
JavaScript value.

##### <Tag tag="M" /> `new ReadableStreamDefaultReader(stream)`

<MC data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* `stream` [`ReadableStream`](/api/webstreams#readablestream)

Creates a new [`ReadableStreamDefaultReader`](/api/webstreams#readablestreamdefaultreader) that is locked to the
given [`ReadableStream`](/api/webstreams#readablestream).

##### <Tag tag="M" /> `readableStreamDefaultReader.cancel([reason])`

<MC data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* `reason` [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types)
* Returns: A promise fulfilled with `undefined`.

Cancels the [`ReadableStream`](/api/webstreams#readablestream) and returns a promise that is fulfilled
when the underlying stream has been canceled.

##### <Tag tag="M" /> `readableStreamDefaultReader.closed`

<MC data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* Type: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfilled with `undefined` when the associated
  [`ReadableStream`](/api/webstreams#readablestream) is closed or rejected if the stream errors or the reader's
  lock is released before the stream finishes closing.

##### <Tag tag="M" /> `readableStreamDefaultReader.read()`

<MC data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* Returns: A promise fulfilled with an object:
  * `value` [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)
  * `done` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Requests the next chunk of data from the underlying [`ReadableStream`](/api/webstreams#readablestream)
and returns a promise that is fulfilled with the data once it is
available.

##### <Tag tag="M" /> `readableStreamDefaultReader.releaseLock()`

<MC data={{"update":{"type":"added","version":["v16.5.0"]}}} />

Releases this reader's lock on the underlying [`ReadableStream`](/api/webstreams#readablestream).

#### <Tag tag="C" /> `ReadableStreamBYOBReader`

<MC data={{"changes":[{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/42225","description":"This class is now exposed on the global object."}],"update":{"type":"added","version":["v16.5.0"]}}} />

The `ReadableStreamBYOBReader` is an alternative consumer for
byte-oriented [`ReadableStream`](/api/webstreams#readablestream)s (those that are created with
`underlyingSource.type` set equal to `'bytes'` when the
`ReadableStream` was created).

The `BYOB` is short for "bring your own buffer". This is a
pattern that allows for more efficient reading of byte-oriented
data that avoids extraneous copying.

```mjs
import {
  open
} from 'node:fs/promises';

import {
  ReadableStream
} from 'node:stream/web';

import { Buffer } from 'node:buffer';

class Source {
  type = 'bytes';
  autoAllocateChunkSize = 1024;

  async start(controller) {
    this.file = await open(new URL(import.meta.url));
    this.controller = controller;
  }

  async pull(controller) {
    const view = controller.byobRequest?.view;
    const {
      bytesRead,
    } = await this.file.read({
      buffer: view,
      offset: view.byteOffset,
      length: view.byteLength
    });

    if (bytesRead === 0) {
      await this.file.close();
      this.controller.close();
    }
    controller.byobRequest.respond(bytesRead);
  }
}

const stream = new ReadableStream(new Source());

async function read(stream) {
  const reader = stream.getReader({ mode: 'byob' });

  const chunks = [];
  let result;
  do {
    result = await reader.read(Buffer.alloc(100));
    if (result.value !== undefined)
      chunks.push(Buffer.from(result.value));
  } while (!result.done);

  return Buffer.concat(chunks);
}

const data = await read(stream);
console.log(Buffer.from(data).toString());
```

##### <Tag tag="M" /> `new ReadableStreamBYOBReader(stream)`

<MC data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* `stream` [`ReadableStream`](/api/webstreams#readablestream)

Creates a new `ReadableStreamBYOBReader` that is locked to the
given [`ReadableStream`](/api/webstreams#readablestream).

##### <Tag tag="M" /> `readableStreamBYOBReader.cancel([reason])`

<MC data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* `reason` [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types)
* Returns: A promise fulfilled with `undefined`.

Cancels the [`ReadableStream`](/api/webstreams#readablestream) and returns a promise that is fulfilled
when the underlying stream has been canceled.

##### <Tag tag="M" /> `readableStreamBYOBReader.closed`

<MC data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* Type: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfilled with `undefined` when the associated
  [`ReadableStream`](/api/webstreams#readablestream) is closed or rejected if the stream errors or the reader's
  lock is released before the stream finishes closing.

##### <Tag tag="M" /> `readableStreamBYOBReader.read(view)`

<MC data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* `view` [`Buffer`](/api/buffer#buffer) | [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`DataView`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView)
* Returns: A promise fulfilled with an object:
  * `value` [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)
  * `done` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Requests the next chunk of data from the underlying [`ReadableStream`](/api/webstreams#readablestream)
and returns a promise that is fulfilled with the data once it is
available.

Do not pass a pooled [`Buffer`](/api/buffer#buffer) object instance in to this method.
Pooled `Buffer` objects are created using `Buffer.allocUnsafe()`,
or `Buffer.from()`, or are often returned by various `node:fs` module
callbacks. These types of `Buffer`s use a shared underlying
[`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) object that contains all of the data from all of
the pooled `Buffer` instances. When a `Buffer`, [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray),
or [`DataView`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView) is passed in to `readableStreamBYOBReader.read()`,
the view's underlying `ArrayBuffer` is _detached_, invalidating
all existing views that may exist on that `ArrayBuffer`. This
can have disastrous consequences for your application.

##### <Tag tag="M" /> `readableStreamBYOBReader.releaseLock()`

<MC data={{"update":{"type":"added","version":["v16.5.0"]}}} />

Releases this reader's lock on the underlying [`ReadableStream`](/api/webstreams#readablestream).

#### <Tag tag="C" /> `ReadableStreamDefaultController`

<MC data={{"update":{"type":"added","version":["v16.5.0"]}}} />

Every [`ReadableStream`](/api/webstreams#readablestream) has a controller that is responsible for
the internal state and management of the stream's queue. The
`ReadableStreamDefaultController` is the default controller
implementation for `ReadableStream`s that are not byte-oriented.

##### <Tag tag="M" /> `readableStreamDefaultController.close()`

<MC data={{"update":{"type":"added","version":["v16.5.0"]}}} />

Closes the [`ReadableStream`](/api/webstreams#readablestream) to which this controller is associated.

##### <Tag tag="M" /> `readableStreamDefaultController.desiredSize`

<MC data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* Type: [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

Returns the amount of data remaining to fill the [`ReadableStream`](/api/webstreams#readablestream)'s
queue.

##### <Tag tag="M" /> `readableStreamDefaultController.enqueue(chunk)`

<MC data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* `chunk` [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types)

Appends a new chunk of data to the [`ReadableStream`](/api/webstreams#readablestream)'s queue.

##### <Tag tag="M" /> `readableStreamDefaultController.error(error)`

<MC data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* `error` [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types)

Signals an error that causes the [`ReadableStream`](/api/webstreams#readablestream) to error and close.

#### <Tag tag="C" /> `ReadableByteStreamController`

<MC data={{"update":{"type":"added","version":["v16.5.0"]}}} />

Every [`ReadableStream`](/api/webstreams#readablestream) has a controller that is responsible for
the internal state and management of the stream's queue. The
`ReadableByteStreamController` is for byte-oriented `ReadableStream`s.

##### <Tag tag="M" /> `readableByteStreamController.byobRequest`

<MC data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* Type: [`ReadableStreamBYOBRequest`](/api/webstreams#readablestreambyobrequest)

##### <Tag tag="M" /> `readableByteStreamController.close()`

<MC data={{"update":{"type":"added","version":["v16.5.0"]}}} />

Closes the [`ReadableStream`](/api/webstreams#readablestream) to which this controller is associated.

##### <Tag tag="M" /> `readableByteStreamController.desiredSize`

<MC data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* Type: [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

Returns the amount of data remaining to fill the [`ReadableStream`](/api/webstreams#readablestream)'s
queue.

##### <Tag tag="M" /> `readableByteStreamController.enqueue(chunk)`

<MC data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* `chunk`: [`Buffer`](/api/buffer#buffer) | [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`DataView`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView)

Appends a new chunk of data to the [`ReadableStream`](/api/webstreams#readablestream)'s queue.

##### <Tag tag="M" /> `readableByteStreamController.error(error)`

<MC data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* `error` [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types)

Signals an error that causes the [`ReadableStream`](/api/webstreams#readablestream) to error and close.

#### <Tag tag="C" /> `ReadableStreamBYOBRequest`

<MC data={{"changes":[{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/42225","description":"This class is now exposed on the global object."}],"update":{"type":"added","version":["v16.5.0"]}}} />

When using `ReadableByteStreamController` in byte-oriented
streams, and when using the `ReadableStreamBYOBReader`,
the `readableByteStreamController.byobRequest` property
provides access to a `ReadableStreamBYOBRequest` instance
that represents the current read request. The object
is used to gain access to the `ArrayBuffer`/`TypedArray`
that has been provided for the read request to fill,
and provides methods for signaling that the data has
been provided.

##### <Tag tag="M" /> `readableStreamBYOBRequest.respond(bytesWritten)`

<MC data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* `bytesWritten` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

Signals that a `bytesWritten` number of bytes have been written
to `readableStreamBYOBRequest.view`.

##### <Tag tag="M" /> `readableStreamBYOBRequest.respondWithNewView(view)`

<MC data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* `view` [`Buffer`](/api/buffer#buffer) | [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`DataView`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView)

Signals that the request has been fulfilled with bytes written
to a new `Buffer`, `TypedArray`, or `DataView`.

##### <Tag tag="M" /> `readableStreamBYOBRequest.view`

<MC data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* Type: [`Buffer`](/api/buffer#buffer) | [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`DataView`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView)

#### <Tag tag="C" /> `WritableStream`

<MC data={{"changes":[{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/42225","description":"This class is now exposed on the global object."}],"update":{"type":"added","version":["v16.5.0"]}}} />

The `WritableStream` is a destination to which stream data is sent.

```mjs
import {
  WritableStream
} from 'node:stream/web';

const stream = new WritableStream({
  write(chunk) {
    console.log(chunk);
  }
});

await stream.getWriter().write('Hello World');
```

##### <Tag tag="M" /> `new WritableStream([underlyingSink[, strategy]])`

<MC data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* `underlyingSink` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `start` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) A user-defined function that is invoked immediately when
    the `WritableStream` is created.
    * `controller` [`WritableStreamDefaultController`](/api/webstreams#writablestreamdefaultcontroller)
    * Returns: `undefined` or a promise fulfilled with `undefined`.
  * `write` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) A user-defined function that is invoked when a chunk of
    data has been written to the `WritableStream`.
    * `chunk` [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types)
    * `controller` [`WritableStreamDefaultController`](/api/webstreams#writablestreamdefaultcontroller)
    * Returns: A promise fulfilled with `undefined`.
  * `close` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) A user-defined function that is called when the
    `WritableStream` is closed.
    * Returns: A promise fulfilled with `undefined`.
  * `abort` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) A user-defined function that is called to abruptly close
    the `WritableStream`.
    * `reason` [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types)
    * Returns: A promise fulfilled with `undefined`.
  * `type` [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types) The `type` option is reserved for future use and _must_ be
    undefined.
* `strategy` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `highWaterMark` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The maximum internal queue size before backpressure
    is applied.
  * `size` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) A user-defined function used to identify the size of each
    chunk of data.
    * `chunk` [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types)
    * Returns: [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

##### <Tag tag="M" /> `writableStream.abort([reason])`

<MC data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* `reason` [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types)
* Returns: A promise fulfilled with `undefined`.

Abruptly terminates the `WritableStream`. All queued writes will be
canceled with their associated promises rejected.

##### <Tag tag="M" /> `writableStream.close()`

<MC data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* Returns: A promise fulfilled with `undefined`.

Closes the `WritableStream` when no additional writes are expected.

##### <Tag tag="M" /> `writableStream.getWriter()`

<MC data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* Returns: [`WritableStreamDefaultWriter`](/api/webstreams#writablestreamdefaultwriter)

Creates and creates a new writer instance that can be used to write
data into the `WritableStream`.

##### <Tag tag="M" /> `writableStream.locked`

<MC data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* Type: [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

The `writableStream.locked` property is `false` by default, and is
switched to `true` while there is an active writer attached to this
`WritableStream`.

##### Transferring with postMessage()

A [`WritableStream`](/api/webstreams#writablestream) instance can be transferred using a [`MessagePort`](/api/worker_threads#messageport).

```js
const stream = new WritableStream(getWritableSinkSomehow());

const { port1, port2 } = new MessageChannel();

port1.onmessage = ({ data }) => {
  data.getWriter().write('hello');
};

port2.postMessage(stream, [stream]);
```

#### <Tag tag="C" /> `WritableStreamDefaultWriter`

<MC data={{"changes":[{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/42225","description":"This class is now exposed on the global object."}],"update":{"type":"added","version":["v16.5.0"]}}} />

##### <Tag tag="M" /> `new WritableStreamDefaultWriter(stream)`

<MC data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* `stream` [`WritableStream`](/api/webstreams#writablestream)

Creates a new `WritableStreamDefaultWriter` that is locked to the given
`WritableStream`.

##### <Tag tag="M" /> `writableStreamDefaultWriter.abort([reason])`

<MC data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* `reason` [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types)
* Returns: A promise fulfilled with `undefined`.

Abruptly terminates the `WritableStream`. All queued writes will be
canceled with their associated promises rejected.

##### <Tag tag="M" /> `writableStreamDefaultWriter.close()`

<MC data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* Returns: A promise fulfilled with `undefined`.

Closes the `WritableStream` when no additional writes are expected.

##### <Tag tag="M" /> `writableStreamDefaultWriter.closed`

<MC data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* Type: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfilled with `undefined` when the associated
  [`WritableStream`](/api/webstreams#writablestream) is closed or rejected if the stream errors or the writer's
  lock is released before the stream finishes closing.

##### <Tag tag="M" /> `writableStreamDefaultWriter.desiredSize`

<MC data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* Type: [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

The amount of data required to fill the [`WritableStream`](/api/webstreams#writablestream)'s queue.

##### <Tag tag="M" /> `writableStreamDefaultWriter.ready`

<MC data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* type: A promise that is fulfilled with `undefined` when the
  writer is ready to be used.

##### <Tag tag="M" /> `writableStreamDefaultWriter.releaseLock()`

<MC data={{"update":{"type":"added","version":["v16.5.0"]}}} />

Releases this writer's lock on the underlying [`ReadableStream`](/api/webstreams#readablestream).

##### <Tag tag="M" /> `writableStreamDefaultWriter.write([chunk])`

<MC data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* `chunk`: [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types)
* Returns: A promise fulfilled with `undefined`.

Appends a new chunk of data to the [`WritableStream`](/api/webstreams#writablestream)'s queue.

#### <Tag tag="C" /> `WritableStreamDefaultController`

<MC data={{"changes":[{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/42225","description":"This class is now exposed on the global object."}],"update":{"type":"added","version":["v16.5.0"]}}} />

The `WritableStreamDefaultController` manage's the [`WritableStream`](/api/webstreams#writablestream)'s
internal state.

##### <Tag tag="M" /> `writableStreamDefaultController.abortReason`

* Type: [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types) The `reason` value passed to `writableStream.abort()`.

##### <Tag tag="M" /> `writableStreamDefaultController.error(error)`

<MC data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* `error` [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types)

Called by user-code to signal that an error has occurred while processing
the `WritableStream` data. When called, the [`WritableStream`](/api/webstreams#writablestream) will be aborted,
with currently pending writes canceled.

##### <Tag tag="M" /> `writableStreamDefaultController.signal`

* Type: [`AbortSignal`](/api/globals#abortsignal) An `AbortSignal` that can be used to cancel pending
  write or close operations when a [`WritableStream`](/api/webstreams#writablestream) is aborted.

#### <Tag tag="C" /> `TransformStream`

<MC data={{"changes":[{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/42225","description":"This class is now exposed on the global object."}],"update":{"type":"added","version":["v16.5.0"]}}} />

A `TransformStream` consists of a [`ReadableStream`](/api/webstreams#readablestream) and a [`WritableStream`](/api/webstreams#writablestream) that
are connected such that the data written to the `WritableStream` is received,
and potentially transformed, before being pushed into the `ReadableStream`'s
queue.

```mjs
import {
  TransformStream
} from 'node:stream/web';

const transform = new TransformStream({
  transform(chunk, controller) {
    controller.enqueue(chunk.toUpperCase());
  }
});

await Promise.all([
  transform.writable.getWriter().write('A'),
  transform.readable.getReader().read(),
]);
```

##### <Tag tag="M" /> `new TransformStream([transformer[, writableStrategy[, readableStrategy]]])`

<MC data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* `transformer` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `start` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) A user-defined function that is invoked immediately when
    the `TransformStream` is created.
    * `controller` [`TransformStreamDefaultController`](/api/webstreams#transformstreamdefaultcontroller)
    * Returns: `undefined` or a promise fulfilled with `undefined`
  * `transform` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) A user-defined function that receives, and
    potentially modifies, a chunk of data written to `transformStream.writable`,
    before forwarding that on to `transformStream.readable`.
    * `chunk` [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types)
    * `controller` [`TransformStreamDefaultController`](/api/webstreams#transformstreamdefaultcontroller)
    * Returns: A promise fulfilled with `undefined`.
  * `flush` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) A user-defined function that is called immediately before
    the writable side of the `TransformStream` is closed, signaling the end of
    the transformation process.
    * `controller` [`TransformStreamDefaultController`](/api/webstreams#transformstreamdefaultcontroller)
    * Returns: A promise fulfilled with `undefined`.
  * `readableType` [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types) the `readableType` option is reserved for future use
    and _must_ be `undefined`.
  * `writableType` [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types) the `writableType` option is reserved for future use
    and _must_ be `undefined`.
* `writableStrategy` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `highWaterMark` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The maximum internal queue size before backpressure
    is applied.
  * `size` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) A user-defined function used to identify the size of each
    chunk of data.
    * `chunk` [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types)
    * Returns: [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
* `readableStrategy` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `highWaterMark` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The maximum internal queue size before backpressure
    is applied.
  * `size` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) A user-defined function used to identify the size of each
    chunk of data.
    * `chunk` [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types)
    * Returns: [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

##### <Tag tag="M" /> `transformStream.readable`

<MC data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* Type: [`ReadableStream`](/api/webstreams#readablestream)

##### <Tag tag="M" /> `transformStream.writable`

<MC data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* Type: [`WritableStream`](/api/webstreams#writablestream)

##### Transferring with postMessage()

A [`TransformStream`](/api/webstreams#transformstream) instance can be transferred using a [`MessagePort`](/api/worker_threads#messageport).

```js
const stream = new TransformStream();

const { port1, port2 } = new MessageChannel();

port1.onmessage = ({ data }) => {
  const { writable, readable } = data;
  // ...
};

port2.postMessage(stream, [stream]);
```

#### <Tag tag="C" /> `TransformStreamDefaultController`

<MC data={{"changes":[{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/42225","description":"This class is now exposed on the global object."}],"update":{"type":"added","version":["v16.5.0"]}}} />

The `TransformStreamDefaultController` manages the internal state
of the `TransformStream`.

##### <Tag tag="M" /> `transformStreamDefaultController.desiredSize`

<MC data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* Type: [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

The amount of data required to fill the readable side's queue.

##### <Tag tag="M" /> `transformStreamDefaultController.enqueue([chunk])`

<MC data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* `chunk` [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types)

Appends a chunk of data to the readable side's queue.

##### <Tag tag="M" /> `transformStreamDefaultController.error([reason])`

<MC data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* `reason` [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types)

Signals to both the readable and writable side that an error has occurred
while processing the transform data, causing both sides to be abruptly
closed.

##### <Tag tag="M" /> `transformStreamDefaultController.terminate()`

<MC data={{"update":{"type":"added","version":["v16.5.0"]}}} />

Closes the readable side of the transport and causes the writable side
to be abruptly closed with an error.

#### <Tag tag="C" /> `ByteLengthQueuingStrategy`

<MC data={{"changes":[{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/42225","description":"This class is now exposed on the global object."}],"update":{"type":"added","version":["v16.5.0"]}}} />

##### <Tag tag="M" /> `new ByteLengthQueuingStrategy(options)`

<MC data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `highWaterMark` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

##### <Tag tag="M" /> `byteLengthQueuingStrategy.highWaterMark`

<MC data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* Type: [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

##### <Tag tag="M" /> `byteLengthQueuingStrategy.size`

<MC data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* Type: [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `chunk` [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types)
  * Returns: [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

#### <Tag tag="C" /> `CountQueuingStrategy`

<MC data={{"changes":[{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/42225","description":"This class is now exposed on the global object."}],"update":{"type":"added","version":["v16.5.0"]}}} />

##### <Tag tag="M" /> `new CountQueuingStrategy(options)`

<MC data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `highWaterMark` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

##### <Tag tag="M" /> `countQueuingStrategy.highWaterMark`

<MC data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* Type: [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

##### <Tag tag="M" /> `countQueuingStrategy.size`

<MC data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* Type: [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `chunk` [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types)
  * Returns: [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

#### <Tag tag="C" /> `TextEncoderStream`

<MC data={{"changes":[{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/42225","description":"This class is now exposed on the global object."}],"update":{"type":"added","version":["v16.6.0"]}}} />

##### <Tag tag="M" /> `new TextEncoderStream()`

<MC data={{"update":{"type":"added","version":["v16.6.0"]}}} />

Creates a new `TextEncoderStream` instance.

##### <Tag tag="M" /> `textEncoderStream.encoding`

<MC data={{"update":{"type":"added","version":["v16.6.0"]}}} />

* Type: [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

The encoding supported by the `TextEncoderStream` instance.

##### <Tag tag="M" /> `textEncoderStream.readable`

<MC data={{"update":{"type":"added","version":["v16.6.0"]}}} />

* Type: [`ReadableStream`](/api/webstreams#readablestream)

##### <Tag tag="M" /> `textEncoderStream.writable`

<MC data={{"update":{"type":"added","version":["v16.6.0"]}}} />

* Type: [`WritableStream`](/api/webstreams#writablestream)

#### <Tag tag="C" /> `TextDecoderStream`

<MC data={{"changes":[{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/42225","description":"This class is now exposed on the global object."}],"update":{"type":"added","version":["v16.6.0"]}}} />

##### <Tag tag="M" /> `new TextDecoderStream([encoding[, options]])`

<MC data={{"update":{"type":"added","version":["v16.6.0"]}}} />

* `encoding` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Identifies the `encoding` that this `TextDecoder` instance
  supports. **Default:** `'utf-8'`.
* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `fatal` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) `true` if decoding failures are fatal.
  * `ignoreBOM` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) When `true`, the `TextDecoderStream` will include the
    byte order mark in the decoded result. When `false`, the byte order mark
    will be removed from the output. This option is only used when `encoding` is
    `'utf-8'`, `'utf-16be'`, or `'utf-16le'`. **Default:** `false`.

Creates a new `TextDecoderStream` instance.

##### <Tag tag="M" /> `textDecoderStream.encoding`

<MC data={{"update":{"type":"added","version":["v16.6.0"]}}} />

* Type: [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

The encoding supported by the `TextDecoderStream` instance.

##### <Tag tag="M" /> `textDecoderStream.fatal`

<MC data={{"update":{"type":"added","version":["v16.6.0"]}}} />

* Type: [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

The value will be `true` if decoding errors result in a `TypeError` being
thrown.

##### <Tag tag="M" /> `textDecoderStream.ignoreBOM`

<MC data={{"update":{"type":"added","version":["v16.6.0"]}}} />

* Type: [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

The value will be `true` if the decoding result will include the byte order
mark.

##### <Tag tag="M" /> `textDecoderStream.readable`

<MC data={{"update":{"type":"added","version":["v16.6.0"]}}} />

* Type: [`ReadableStream`](/api/webstreams#readablestream)

##### <Tag tag="M" /> `textDecoderStream.writable`

<MC data={{"update":{"type":"added","version":["v16.6.0"]}}} />

* Type: [`WritableStream`](/api/webstreams#writablestream)

#### <Tag tag="C" /> `CompressionStream`

<MC data={{"changes":[{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/42225","description":"This class is now exposed on the global object."}],"update":{"type":"added","version":["v17.0.0"]}}} />

##### <Tag tag="M" /> `new CompressionStream(format)`

<MC data={{"update":{"type":"added","version":["v17.0.0"]}}} />

* `format` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) One of either `'deflate'` or `'gzip'`.

##### <Tag tag="M" /> `compressionStream.readable`

<MC data={{"update":{"type":"added","version":["v17.0.0"]}}} />

* Type: [`ReadableStream`](/api/webstreams#readablestream)

##### <Tag tag="M" /> `compressionStream.writable`

<MC data={{"update":{"type":"added","version":["v17.0.0"]}}} />

* Type: [`WritableStream`](/api/webstreams#writablestream)

#### <Tag tag="C" /> `DecompressionStream`

<MC data={{"changes":[{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/42225","description":"This class is now exposed on the global object."}],"update":{"type":"added","version":["v17.0.0"]}}} />

##### <Tag tag="M" /> `new DecompressionStream(format)`

<MC data={{"update":{"type":"added","version":["v17.0.0"]}}} />

* `format` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) One of either `'deflate'` or `'gzip'`.

##### <Tag tag="M" /> `decompressionStream.readable`

<MC data={{"update":{"type":"added","version":["v17.0.0"]}}} />

* Type: [`ReadableStream`](/api/webstreams#readablestream)

##### <Tag tag="M" /> `decompressionStream.writable`

<MC data={{"update":{"type":"added","version":["v17.0.0"]}}} />

* Type: [`WritableStream`](/api/webstreams#writablestream)

#### Utility Consumers

<MC data={{"update":{"type":"added","version":["v16.7.0"]}}} />

The utility consumer functions provide common options for consuming
streams.

They are accessed using:

```mjs
import {
  arrayBuffer,
  blob,
  buffer,
  json,
  text,
} from 'node:stream/consumers';
```

```cjs
const {
  arrayBuffer,
  blob,
  buffer,
  json,
  text,
} = require('node:stream/consumers');
```

##### <Tag tag="M" /> `streamConsumers.arrayBuffer(stream)`

<MC data={{"update":{"type":"added","version":["v16.7.0"]}}} />

* `stream` [`ReadableStream`](/api/webstreams#readablestream) | [`stream.Readable`](/api/stream#streamreadable) | [`AsyncIterator`](https://tc39.github.io/ecma262/#sec-asynciterator-interface)
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with an `ArrayBuffer` containing the full
  contents of the stream.

##### <Tag tag="M" /> `streamConsumers.blob(stream)`

<MC data={{"update":{"type":"added","version":["v16.7.0"]}}} />

* `stream` [`ReadableStream`](/api/webstreams#readablestream) | [`stream.Readable`](/api/stream#streamreadable) | [`AsyncIterator`](https://tc39.github.io/ecma262/#sec-asynciterator-interface)
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with a [`Blob`](/api/buffer#blob) containing the full contents
  of the stream.

##### <Tag tag="M" /> `streamConsumers.buffer(stream)`

<MC data={{"update":{"type":"added","version":["v16.7.0"]}}} />

* `stream` [`ReadableStream`](/api/webstreams#readablestream) | [`stream.Readable`](/api/stream#streamreadable) | [`AsyncIterator`](https://tc39.github.io/ecma262/#sec-asynciterator-interface)
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with a [`Buffer`](/api/buffer#buffer) containing the full
  contents of the stream.

##### <Tag tag="M" /> `streamConsumers.json(stream)`

<MC data={{"update":{"type":"added","version":["v16.7.0"]}}} />

* `stream` [`ReadableStream`](/api/webstreams#readablestream) | [`stream.Readable`](/api/stream#streamreadable) | [`AsyncIterator`](https://tc39.github.io/ecma262/#sec-asynciterator-interface)
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with the contents of the stream parsed as a
  UTF-8 encoded string that is then passed through `JSON.parse()`.

##### <Tag tag="M" /> `streamConsumers.text(stream)`

<MC data={{"update":{"type":"added","version":["v16.7.0"]}}} />

* `stream` [`ReadableStream`](/api/webstreams#readablestream) | [`stream.Readable`](/api/stream#streamreadable) | [`AsyncIterator`](https://tc39.github.io/ecma262/#sec-asynciterator-interface)
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with the contents of the stream parsed as a
  UTF-8 encoded string.

[Streams]: (/api/stream)
[WHATWG Streams Standard]: https://streams.spec.whatwg.org/
