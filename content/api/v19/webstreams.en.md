---
title: 'webstreams'
displayTitle: 'Web Streams API'
category: 'api'
version: 'v19'
---

<Metadata version="v19.0.0" data={{"update":{"type":"introduced_in","version":["v16.5.0"]}}} />

<Metadata version="v19.0.0" data={{"changes":[{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/42225","description":"Use of this API no longer emit a runtime warning."}],"update":{"type":"added","version":["v16.5.0"]}}} />

<Metadata version="v19.0.0" data={{"stability":{"level":1,"text":" - Experimental."}}} />

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

#### <DataTag tag="C" /> `ReadableStream`

<Metadata version="v19.0.0" data={{"changes":[{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/42225","description":"This class is now exposed on the global object."}],"update":{"type":"added","version":["v16.5.0"]}}} />

##### <DataTag tag="M" /> `new ReadableStream([underlyingSource [, strategy]])`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.5.0"]}}} />

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

##### <DataTag tag="M" /> `readableStream.locked`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* Type: [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) Set to `true` if there is an active reader for this
  [`ReadableStream`](/api/webstreams#readablestream).

The `readableStream.locked` property is `false` by default, and is
switched to `true` while there is an active reader consuming the
stream's data.

##### <DataTag tag="M" /> `readableStream.cancel([reason])`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* `reason` [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types)
* Returns: A promise fulfilled with `undefined` once cancelation has
  been completed.

##### <DataTag tag="M" /> `readableStream.getReader([options])`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.5.0"]}}} />

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

##### <DataTag tag="M" /> `readableStream.pipeThrough(transform[, options])`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.5.0"]}}} />

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

##### <DataTag tag="M" /> `readableStream.pipeTo(destination, options)`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.5.0"]}}} />

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

##### <DataTag tag="M" /> `readableStream.tee()`

<Metadata version="v19.0.0" data={{"changes":[{"version":["v18.10.0","v16.18.0"],"pr-url":"https://github.com/nodejs/node/pull/44505","description":"Support teeing a readable byte stream."}],"update":{"type":"added","version":["v16.5.0"]}}} />

* Returns: ReadableStream\[]

Returns a pair of new [`ReadableStream`](/api/webstreams#readablestream) instances to which this
`ReadableStream`'s data will be forwarded. Each will receive the
same data.

Causes the `readableStream.locked` to be `true`.

##### <DataTag tag="M" /> `readableStream.values([options])`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.5.0"]}}} />

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

#### <DataTag tag="C" /> `ReadableStreamDefaultReader`

<Metadata version="v19.0.0" data={{"changes":[{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/42225","description":"This class is now exposed on the global object."}],"update":{"type":"added","version":["v16.5.0"]}}} />

By default, calling `readableStream.getReader()` with no arguments
will return an instance of `ReadableStreamDefaultReader`. The default
reader treats the chunks of data passed through the stream as opaque
values, which allows the [`ReadableStream`](/api/webstreams#readablestream) to work with generally any
JavaScript value.

##### <DataTag tag="M" /> `new ReadableStreamDefaultReader(stream)`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* `stream` [`ReadableStream`](/api/webstreams#readablestream)

Creates a new [`ReadableStreamDefaultReader`](/api/webstreams#readablestreamdefaultreader) that is locked to the
given [`ReadableStream`](/api/webstreams#readablestream).

##### <DataTag tag="M" /> `readableStreamDefaultReader.cancel([reason])`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* `reason` [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types)
* Returns: A promise fulfilled with `undefined`.

Cancels the [`ReadableStream`](/api/webstreams#readablestream) and returns a promise that is fulfilled
when the underlying stream has been canceled.

##### <DataTag tag="M" /> `readableStreamDefaultReader.closed`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* Type: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfilled with `undefined` when the associated
  [`ReadableStream`](/api/webstreams#readablestream) is closed or rejected if the stream errors or the reader's
  lock is released before the stream finishes closing.

##### <DataTag tag="M" /> `readableStreamDefaultReader.read()`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* Returns: A promise fulfilled with an object:
  * `value` [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)
  * `done` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Requests the next chunk of data from the underlying [`ReadableStream`](/api/webstreams#readablestream)
and returns a promise that is fulfilled with the data once it is
available.

##### <DataTag tag="M" /> `readableStreamDefaultReader.releaseLock()`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.5.0"]}}} />

Releases this reader's lock on the underlying [`ReadableStream`](/api/webstreams#readablestream).

#### <DataTag tag="C" /> `ReadableStreamBYOBReader`

<Metadata version="v19.0.0" data={{"changes":[{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/42225","description":"This class is now exposed on the global object."}],"update":{"type":"added","version":["v16.5.0"]}}} />

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

##### <DataTag tag="M" /> `new ReadableStreamBYOBReader(stream)`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* `stream` [`ReadableStream`](/api/webstreams#readablestream)

Creates a new `ReadableStreamBYOBReader` that is locked to the
given [`ReadableStream`](/api/webstreams#readablestream).

##### <DataTag tag="M" /> `readableStreamBYOBReader.cancel([reason])`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* `reason` [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types)
* Returns: A promise fulfilled with `undefined`.

Cancels the [`ReadableStream`](/api/webstreams#readablestream) and returns a promise that is fulfilled
when the underlying stream has been canceled.

##### <DataTag tag="M" /> `readableStreamBYOBReader.closed`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* Type: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfilled with `undefined` when the associated
  [`ReadableStream`](/api/webstreams#readablestream) is closed or rejected if the stream errors or the reader's
  lock is released before the stream finishes closing.

##### <DataTag tag="M" /> `readableStreamBYOBReader.read(view)`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.5.0"]}}} />

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

##### <DataTag tag="M" /> `readableStreamBYOBReader.releaseLock()`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.5.0"]}}} />

Releases this reader's lock on the underlying [`ReadableStream`](/api/webstreams#readablestream).

#### <DataTag tag="C" /> `ReadableStreamDefaultController`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.5.0"]}}} />

Every [`ReadableStream`](/api/webstreams#readablestream) has a controller that is responsible for
the internal state and management of the stream's queue. The
`ReadableStreamDefaultController` is the default controller
implementation for `ReadableStream`s that are not byte-oriented.

##### <DataTag tag="M" /> `readableStreamDefaultController.close()`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.5.0"]}}} />

Closes the [`ReadableStream`](/api/webstreams#readablestream) to which this controller is associated.

##### <DataTag tag="M" /> `readableStreamDefaultController.desiredSize`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* Type: [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

Returns the amount of data remaining to fill the [`ReadableStream`](/api/webstreams#readablestream)'s
queue.

##### <DataTag tag="M" /> `readableStreamDefaultController.enqueue(chunk)`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* `chunk` [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types)

Appends a new chunk of data to the [`ReadableStream`](/api/webstreams#readablestream)'s queue.

##### <DataTag tag="M" /> `readableStreamDefaultController.error(error)`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* `error` [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types)

Signals an error that causes the [`ReadableStream`](/api/webstreams#readablestream) to error and close.

#### <DataTag tag="C" /> `ReadableByteStreamController`

<Metadata version="v19.0.0" data={{"changes":[{"version":"v18.10.0","pr-url":"https://github.com/nodejs/node/pull/44702","description":"Support handling a BYOB pull request from a released reader."}],"update":{"type":"added","version":["v16.5.0"]}}} />

Every [`ReadableStream`](/api/webstreams#readablestream) has a controller that is responsible for
the internal state and management of the stream's queue. The
`ReadableByteStreamController` is for byte-oriented `ReadableStream`s.

##### <DataTag tag="M" /> `readableByteStreamController.byobRequest`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* Type: [`ReadableStreamBYOBRequest`](/api/webstreams#readablestreambyobrequest)

##### <DataTag tag="M" /> `readableByteStreamController.close()`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.5.0"]}}} />

Closes the [`ReadableStream`](/api/webstreams#readablestream) to which this controller is associated.

##### <DataTag tag="M" /> `readableByteStreamController.desiredSize`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* Type: [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

Returns the amount of data remaining to fill the [`ReadableStream`](/api/webstreams#readablestream)'s
queue.

##### <DataTag tag="M" /> `readableByteStreamController.enqueue(chunk)`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* `chunk`: [`Buffer`](/api/buffer#buffer) | [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`DataView`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView)

Appends a new chunk of data to the [`ReadableStream`](/api/webstreams#readablestream)'s queue.

##### <DataTag tag="M" /> `readableByteStreamController.error(error)`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* `error` [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types)

Signals an error that causes the [`ReadableStream`](/api/webstreams#readablestream) to error and close.

#### <DataTag tag="C" /> `ReadableStreamBYOBRequest`

<Metadata version="v19.0.0" data={{"changes":[{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/42225","description":"This class is now exposed on the global object."}],"update":{"type":"added","version":["v16.5.0"]}}} />

When using `ReadableByteStreamController` in byte-oriented
streams, and when using the `ReadableStreamBYOBReader`,
the `readableByteStreamController.byobRequest` property
provides access to a `ReadableStreamBYOBRequest` instance
that represents the current read request. The object
is used to gain access to the `ArrayBuffer`/`TypedArray`
that has been provided for the read request to fill,
and provides methods for signaling that the data has
been provided.

##### <DataTag tag="M" /> `readableStreamBYOBRequest.respond(bytesWritten)`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* `bytesWritten` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

Signals that a `bytesWritten` number of bytes have been written
to `readableStreamBYOBRequest.view`.

##### <DataTag tag="M" /> `readableStreamBYOBRequest.respondWithNewView(view)`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* `view` [`Buffer`](/api/buffer#buffer) | [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`DataView`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView)

Signals that the request has been fulfilled with bytes written
to a new `Buffer`, `TypedArray`, or `DataView`.

##### <DataTag tag="M" /> `readableStreamBYOBRequest.view`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* Type: [`Buffer`](/api/buffer#buffer) | [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`DataView`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView)

#### <DataTag tag="C" /> `WritableStream`

<Metadata version="v19.0.0" data={{"changes":[{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/42225","description":"This class is now exposed on the global object."}],"update":{"type":"added","version":["v16.5.0"]}}} />

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

##### <DataTag tag="M" /> `new WritableStream([underlyingSink[, strategy]])`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.5.0"]}}} />

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

##### <DataTag tag="M" /> `writableStream.abort([reason])`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* `reason` [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types)
* Returns: A promise fulfilled with `undefined`.

Abruptly terminates the `WritableStream`. All queued writes will be
canceled with their associated promises rejected.

##### <DataTag tag="M" /> `writableStream.close()`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* Returns: A promise fulfilled with `undefined`.

Closes the `WritableStream` when no additional writes are expected.

##### <DataTag tag="M" /> `writableStream.getWriter()`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* Returns: [`WritableStreamDefaultWriter`](/api/webstreams#writablestreamdefaultwriter)

Creates and creates a new writer instance that can be used to write
data into the `WritableStream`.

##### <DataTag tag="M" /> `writableStream.locked`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.5.0"]}}} />

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

#### <DataTag tag="C" /> `WritableStreamDefaultWriter`

<Metadata version="v19.0.0" data={{"changes":[{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/42225","description":"This class is now exposed on the global object."}],"update":{"type":"added","version":["v16.5.0"]}}} />

##### <DataTag tag="M" /> `new WritableStreamDefaultWriter(stream)`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* `stream` [`WritableStream`](/api/webstreams#writablestream)

Creates a new `WritableStreamDefaultWriter` that is locked to the given
`WritableStream`.

##### <DataTag tag="M" /> `writableStreamDefaultWriter.abort([reason])`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* `reason` [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types)
* Returns: A promise fulfilled with `undefined`.

Abruptly terminates the `WritableStream`. All queued writes will be
canceled with their associated promises rejected.

##### <DataTag tag="M" /> `writableStreamDefaultWriter.close()`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* Returns: A promise fulfilled with `undefined`.

Closes the `WritableStream` when no additional writes are expected.

##### <DataTag tag="M" /> `writableStreamDefaultWriter.closed`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* Type: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfilled with `undefined` when the associated
  [`WritableStream`](/api/webstreams#writablestream) is closed or rejected if the stream errors or the writer's
  lock is released before the stream finishes closing.

##### <DataTag tag="M" /> `writableStreamDefaultWriter.desiredSize`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* Type: [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

The amount of data required to fill the [`WritableStream`](/api/webstreams#writablestream)'s queue.

##### <DataTag tag="M" /> `writableStreamDefaultWriter.ready`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* type: A promise that is fulfilled with `undefined` when the
  writer is ready to be used.

##### <DataTag tag="M" /> `writableStreamDefaultWriter.releaseLock()`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.5.0"]}}} />

Releases this writer's lock on the underlying [`ReadableStream`](/api/webstreams#readablestream).

##### <DataTag tag="M" /> `writableStreamDefaultWriter.write([chunk])`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* `chunk`: [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types)
* Returns: A promise fulfilled with `undefined`.

Appends a new chunk of data to the [`WritableStream`](/api/webstreams#writablestream)'s queue.

#### <DataTag tag="C" /> `WritableStreamDefaultController`

<Metadata version="v19.0.0" data={{"changes":[{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/42225","description":"This class is now exposed on the global object."}],"update":{"type":"added","version":["v16.5.0"]}}} />

The `WritableStreamDefaultController` manage's the [`WritableStream`](/api/webstreams#writablestream)'s
internal state.

##### <DataTag tag="M" /> `writableStreamDefaultController.error(error)`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* `error` [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types)

Called by user-code to signal that an error has occurred while processing
the `WritableStream` data. When called, the [`WritableStream`](/api/webstreams#writablestream) will be aborted,
with currently pending writes canceled.

##### <DataTag tag="M" /> `writableStreamDefaultController.signal`

* Type: [`AbortSignal`](/api/globals#abortsignal) An `AbortSignal` that can be used to cancel pending
  write or close operations when a [`WritableStream`](/api/webstreams#writablestream) is aborted.

#### <DataTag tag="C" /> `TransformStream`

<Metadata version="v19.0.0" data={{"changes":[{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/42225","description":"This class is now exposed on the global object."}],"update":{"type":"added","version":["v16.5.0"]}}} />

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

##### <DataTag tag="M" /> `new TransformStream([transformer[, writableStrategy[, readableStrategy]]])`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.5.0"]}}} />

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

##### <DataTag tag="M" /> `transformStream.readable`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* Type: [`ReadableStream`](/api/webstreams#readablestream)

##### <DataTag tag="M" /> `transformStream.writable`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.5.0"]}}} />

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

#### <DataTag tag="C" /> `TransformStreamDefaultController`

<Metadata version="v19.0.0" data={{"changes":[{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/42225","description":"This class is now exposed on the global object."}],"update":{"type":"added","version":["v16.5.0"]}}} />

The `TransformStreamDefaultController` manages the internal state
of the `TransformStream`.

##### <DataTag tag="M" /> `transformStreamDefaultController.desiredSize`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* Type: [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

The amount of data required to fill the readable side's queue.

##### <DataTag tag="M" /> `transformStreamDefaultController.enqueue([chunk])`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* `chunk` [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types)

Appends a chunk of data to the readable side's queue.

##### <DataTag tag="M" /> `transformStreamDefaultController.error([reason])`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* `reason` [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types)

Signals to both the readable and writable side that an error has occurred
while processing the transform data, causing both sides to be abruptly
closed.

##### <DataTag tag="M" /> `transformStreamDefaultController.terminate()`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.5.0"]}}} />

Closes the readable side of the transport and causes the writable side
to be abruptly closed with an error.

#### <DataTag tag="C" /> `ByteLengthQueuingStrategy`

<Metadata version="v19.0.0" data={{"changes":[{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/42225","description":"This class is now exposed on the global object."}],"update":{"type":"added","version":["v16.5.0"]}}} />

##### <DataTag tag="M" /> `new ByteLengthQueuingStrategy(options)`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `highWaterMark` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

##### <DataTag tag="M" /> `byteLengthQueuingStrategy.highWaterMark`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* Type: [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

##### <DataTag tag="M" /> `byteLengthQueuingStrategy.size`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* Type: [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `chunk` [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types)
  * Returns: [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

#### <DataTag tag="C" /> `CountQueuingStrategy`

<Metadata version="v19.0.0" data={{"changes":[{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/42225","description":"This class is now exposed on the global object."}],"update":{"type":"added","version":["v16.5.0"]}}} />

##### <DataTag tag="M" /> `new CountQueuingStrategy(options)`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `highWaterMark` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

##### <DataTag tag="M" /> `countQueuingStrategy.highWaterMark`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* Type: [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

##### <DataTag tag="M" /> `countQueuingStrategy.size`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.5.0"]}}} />

* Type: [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `chunk` [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types)
  * Returns: [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

#### <DataTag tag="C" /> `TextEncoderStream`

<Metadata version="v19.0.0" data={{"changes":[{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/42225","description":"This class is now exposed on the global object."}],"update":{"type":"added","version":["v16.6.0"]}}} />

##### <DataTag tag="M" /> `new TextEncoderStream()`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.6.0"]}}} />

Creates a new `TextEncoderStream` instance.

##### <DataTag tag="M" /> `textEncoderStream.encoding`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.6.0"]}}} />

* Type: [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

The encoding supported by the `TextEncoderStream` instance.

##### <DataTag tag="M" /> `textEncoderStream.readable`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.6.0"]}}} />

* Type: [`ReadableStream`](/api/webstreams#readablestream)

##### <DataTag tag="M" /> `textEncoderStream.writable`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.6.0"]}}} />

* Type: [`WritableStream`](/api/webstreams#writablestream)

#### <DataTag tag="C" /> `TextDecoderStream`

<Metadata version="v19.0.0" data={{"changes":[{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/42225","description":"This class is now exposed on the global object."}],"update":{"type":"added","version":["v16.6.0"]}}} />

##### <DataTag tag="M" /> `new TextDecoderStream([encoding[, options]])`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.6.0"]}}} />

* `encoding` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Identifies the `encoding` that this `TextDecoder` instance
  supports. **Default:** `'utf-8'`.
* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `fatal` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) `true` if decoding failures are fatal.
  * `ignoreBOM` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) When `true`, the `TextDecoderStream` will include the
    byte order mark in the decoded result. When `false`, the byte order mark
    will be removed from the output. This option is only used when `encoding` is
    `'utf-8'`, `'utf-16be'`, or `'utf-16le'`. **Default:** `false`.

Creates a new `TextDecoderStream` instance.

##### <DataTag tag="M" /> `textDecoderStream.encoding`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.6.0"]}}} />

* Type: [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

The encoding supported by the `TextDecoderStream` instance.

##### <DataTag tag="M" /> `textDecoderStream.fatal`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.6.0"]}}} />

* Type: [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

The value will be `true` if decoding errors result in a `TypeError` being
thrown.

##### <DataTag tag="M" /> `textDecoderStream.ignoreBOM`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.6.0"]}}} />

* Type: [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

The value will be `true` if the decoding result will include the byte order
mark.

##### <DataTag tag="M" /> `textDecoderStream.readable`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.6.0"]}}} />

* Type: [`ReadableStream`](/api/webstreams#readablestream)

##### <DataTag tag="M" /> `textDecoderStream.writable`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.6.0"]}}} />

* Type: [`WritableStream`](/api/webstreams#writablestream)

#### <DataTag tag="C" /> `CompressionStream`

<Metadata version="v19.0.0" data={{"changes":[{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/42225","description":"This class is now exposed on the global object."}],"update":{"type":"added","version":["v17.0.0"]}}} />

##### <DataTag tag="M" /> `new CompressionStream(format)`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v17.0.0"]}}} />

* `format` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) One of either `'deflate'` or `'gzip'`.

##### <DataTag tag="M" /> `compressionStream.readable`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v17.0.0"]}}} />

* Type: [`ReadableStream`](/api/webstreams#readablestream)

##### <DataTag tag="M" /> `compressionStream.writable`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v17.0.0"]}}} />

* Type: [`WritableStream`](/api/webstreams#writablestream)

#### <DataTag tag="C" /> `DecompressionStream`

<Metadata version="v19.0.0" data={{"changes":[{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/42225","description":"This class is now exposed on the global object."}],"update":{"type":"added","version":["v17.0.0"]}}} />

##### <DataTag tag="M" /> `new DecompressionStream(format)`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v17.0.0"]}}} />

* `format` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) One of either `'deflate'` or `'gzip'`.

##### <DataTag tag="M" /> `decompressionStream.readable`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v17.0.0"]}}} />

* Type: [`ReadableStream`](/api/webstreams#readablestream)

##### <DataTag tag="M" /> `decompressionStream.writable`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v17.0.0"]}}} />

* Type: [`WritableStream`](/api/webstreams#writablestream)

#### Utility Consumers

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.7.0"]}}} />

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

##### <DataTag tag="M" /> `streamConsumers.arrayBuffer(stream)`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.7.0"]}}} />

* `stream` [`ReadableStream`](/api/webstreams#readablestream) | [`stream.Readable`](/api/stream#streamreadable) | [`AsyncIterator`](https://tc39.github.io/ecma262/#sec-asynciterator-interface)
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with an `ArrayBuffer` containing the full
  contents of the stream.

```mjs
import { buffer as arrayBuffer } from 'node:stream/consumers';
import { Readable } from 'node:stream';
import { TextEncoder } from 'node:util';

const encoder = new TextEncoder();
const dataArray = encoder.encode('hello world from consumers!');

const readable = Readable.from(dataArray);
const data = await arrayBuffer(readable);
console.log(`from readable: ${data.byteLength}`);
```

```cjs
const { arrayBuffer } = require('node:stream/consumers');
const { Readable } = require('stream');
const { TextEncoder } = require('util');

const encoder = new TextEncoder();
const dataArray = encoder.encode(['hello world from consumers!']);
const readable = Readable.from(dataArray);
arrayBuffer(readable).then((data) => {
  console.log(`from readable: ${data.byteLength}`);
});
```

##### <DataTag tag="M" /> `streamConsumers.blob(stream)`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.7.0"]}}} />

* `stream` [`ReadableStream`](/api/webstreams#readablestream) | [`stream.Readable`](/api/stream#streamreadable) | [`AsyncIterator`](https://tc39.github.io/ecma262/#sec-asynciterator-interface)
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with a [`Blob`](/api/buffer#blob) containing the full contents
  of the stream.

```mjs
import { blob } from 'node:stream/consumers';

const dataBlob = new Blob(['hello world from consumers!']);

const readable = dataBlob.stream();
const data = await blob(readable);
console.log(`from readable: ${data.size}`);
```

```cjs
const { blob } = require('node:stream/consumers');

const dataBlob = new Blob(['hello world from consumers!']);

const readable = dataBlob.stream();
blob(readable).then((data) => {
  console.log(`from readable: ${data.size}`);
});
```

##### <DataTag tag="M" /> `streamConsumers.buffer(stream)`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.7.0"]}}} />

* `stream` [`ReadableStream`](/api/webstreams#readablestream) | [`stream.Readable`](/api/stream#streamreadable) | [`AsyncIterator`](https://tc39.github.io/ecma262/#sec-asynciterator-interface)
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with a [`Buffer`](/api/buffer#buffer) containing the full
  contents of the stream.

```mjs
import { buffer } from 'node:stream/consumers';
import { Readable } from 'node:stream';
import { Buffer } from 'node:buffer';

const dataBuffer = Buffer.from('hello world from consumers!');

const readable = Readable.from(dataBuffer);
const data = await buffer(readable);
console.log(`from readable: ${data.length}`);
```

```cjs
const { buffer } = require('node:stream/consumers');
const { Readable } = require('node:stream');
const { Buffer } = require('node:buffer');

const dataBuffer = Buffer.from('hello world from consumers!');

const readable = Readable.from(dataBuffer);
buffer(readable).then((data) => {
  console.log(`from readable: ${data.length}`);
});
```

##### <DataTag tag="M" /> `streamConsumers.json(stream)`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.7.0"]}}} />

* `stream` [`ReadableStream`](/api/webstreams#readablestream) | [`stream.Readable`](/api/stream#streamreadable) | [`AsyncIterator`](https://tc39.github.io/ecma262/#sec-asynciterator-interface)
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with the contents of the stream parsed as a
  UTF-8 encoded string that is then passed through `JSON.parse()`.

```mjs
import { json } from 'node:stream/consumers';
import { Readable } from 'node:stream';

const items = Array.from(
  {
    length: 100
  },
  () => ({
    message: 'hello world from consumers!'
  })
);

const readable = Readable.from(JSON.stringify(items));
const data = await json(readable);
console.log(`from readable: ${data.length}`);
```

```cjs
const { json } = require('node:stream/consumers');
const { Readable } = require('node:stream');

const items = Array.from(
  {
    length: 100
  },
  () => ({
    message: 'hello world from consumers!'
  })
);

const readable = Readable.from(JSON.stringify(items));
json(readable).then((data) => {
  console.log(`from readable: ${data.length}`);
});
```

##### <DataTag tag="M" /> `streamConsumers.text(stream)`

<Metadata version="v19.0.0" data={{"update":{"type":"added","version":["v16.7.0"]}}} />

* `stream` [`ReadableStream`](/api/webstreams#readablestream) | [`stream.Readable`](/api/stream#streamreadable) | [`AsyncIterator`](https://tc39.github.io/ecma262/#sec-asynciterator-interface)
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with the contents of the stream parsed as a
  UTF-8 encoded string.

```mjs
import { json, text, blob, buffer } from 'node:stream/consumers';
import { Readable } from 'node:stream';

const readable = Readable.from('Hello world from consumers!');
const data = await text(readable);
console.log(`from readable: ${data.length}`);
```

```cjs
const { text } = require('node:stream/consumers');
const { Readable } = require('node:stream');

const readable = Readable.from('Hello world from consumers!');
text(readable).then((data) => {
  console.log(`from readable: ${data.length}`);
});
```

[Streams]: /api/v19/stream
[WHATWG Streams Standard]: https://streams.spec.whatwg.org/
