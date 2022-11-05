---
title: 'fs'
displayTitle: 'File system'
category: 'api'
version: 'v16'
---

<Metadata version="v16.18.1" data={{"update":{"type":"introduced_in","version":["v0.10.0"]}}} />

<Metadata version="v16.18.1" data={{"stability":{"level":2,"text":" - Stable"}}} />

<Metadata version="v16.18.1" data={{"name":"fs"}} />

<Metadata version="v16.18.1" data={{"source_link":"lib/fs.js"}} />

The `node:fs` module enables interacting with the file system in a
way modeled on standard POSIX functions.

To use the promise-based APIs:

```mjs
import * as fs from 'node:fs/promises';
```

```cjs
const fs = require('node:fs/promises');
```

To use the callback and sync APIs:

```mjs
import * as fs from 'node:fs';
```

```cjs
const fs = require('node:fs');
```

All file system operations have synchronous, callback, and promise-based
forms, and are accessible using both CommonJS syntax and ES6 Modules (ESM).

### Promise example

Promise-based operations return a promise that is fulfilled when the
asynchronous operation is complete.

```mjs
import { unlink } from 'node:fs/promises';

try {
  await unlink('/tmp/hello');
  console.log('successfully deleted /tmp/hello');
} catch (error) {
  console.error('there was an error:', error.message);
}
```

```cjs
const { unlink } = require('node:fs/promises');

(async function(path) {
  try {
    await unlink(path);
    console.log(`successfully deleted ${path}`);
  } catch (error) {
    console.error('there was an error:', error.message);
  }
})('/tmp/hello');
```

### Callback example

The callback form takes a completion callback function as its last
argument and invokes the operation asynchronously. The arguments passed to
the completion callback depend on the method, but the first argument is always
reserved for an exception. If the operation is completed successfully, then
the first argument is `null` or `undefined`.

```mjs
import { unlink } from 'node:fs';

unlink('/tmp/hello', (err) => {
  if (err) throw err;
  console.log('successfully deleted /tmp/hello');
});
```

```cjs
const { unlink } = require('node:fs');

unlink('/tmp/hello', (err) => {
  if (err) throw err;
  console.log('successfully deleted /tmp/hello');
});
```

The callback-based versions of the `node:fs` module APIs are preferable over
the use of the promise APIs when maximal performance (both in terms of
execution time and memory allocation) is required.

### Synchronous example

The synchronous APIs block the Node.js event loop and further JavaScript
execution until the operation is complete. Exceptions are thrown immediately
and can be handled using `try…catch`, or can be allowed to bubble up.

```mjs
import { unlinkSync } from 'node:fs';

try {
  unlinkSync('/tmp/hello');
  console.log('successfully deleted /tmp/hello');
} catch (err) {
  // handle the error
}
```

```cjs
const { unlinkSync } = require('node:fs');

try {
  unlinkSync('/tmp/hello');
  console.log('successfully deleted /tmp/hello');
} catch (err) {
  // handle the error
}
```

### Promises API

<Metadata version="v16.18.1" data={{"changes":[{"version":"v14.0.0","pr-url":"https://github.com/nodejs/node/pull/31553","description":"Exposed as `require('fs/promises')`."},{"version":["v11.14.0","v10.17.0"],"pr-url":"https://github.com/nodejs/node/pull/26581","description":"This API is no longer experimental."},{"version":"v10.1.0","pr-url":"https://github.com/nodejs/node/pull/20504","description":"The API is accessible via `require('fs').promises` only."}],"update":{"type":"added","version":["v10.0.0"]}}} />

The `fs/promises` API provides asynchronous file system methods that return
promises.

The promise APIs use the underlying Node.js threadpool to perform file
system operations off the event loop thread. These operations are not
synchronized or threadsafe. Care must be taken when performing multiple
concurrent modifications on the same file or data corruption may occur.

#### <DataTag tag="C" /> `FileHandle`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v10.0.0"]}}} />

A [`FileHandle`](/api/fs#filehandle) object is an object wrapper for a numeric file descriptor.

Instances of the [`FileHandle`](/api/fs#filehandle) object are created by the `fsPromises.open()`
method.

All [`FileHandle`](/api/fs#filehandle) objects are [`EventEmitter`](/api/events#eventemitter)s.

If a [`FileHandle`](/api/fs#filehandle) is not closed using the `filehandle.close()` method, it will
try to automatically close the file descriptor and emit a process warning,
helping to prevent memory leaks. Please do not rely on this behavior because
it can be unreliable and the file may not be closed. Instead, always explicitly
close [`FileHandle`](/api/fs#filehandle)s. Node.js may change this behavior in the future.

##### <DataTag tag="E" /> `'close'`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v15.4.0"]}}} />

The `'close'` event is emitted when the [`FileHandle`](/api/fs#filehandle) has been closed and can no
longer be used.

##### <DataTag tag="M" /> `filehandle.appendFile(data[, options])`

<Metadata version="v16.18.1" data={{"changes":[{"version":["v15.14.0","v14.18.0"],"pr-url":"https://github.com/nodejs/node/pull/37490","description":"The `data` argument supports `AsyncIterable`, `Iterable`, and `Stream`."},{"version":"v14.0.0","pr-url":"https://github.com/nodejs/node/pull/31030","description":"The `data` parameter won't coerce unsupported input to strings anymore."}],"update":{"type":"added","version":["v10.0.0"]}}} />

* `data` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`DataView`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView) | [`AsyncIterable`](https://tc39.github.io/ecma262/#sec-asynciterable-interface) | [`Iterable`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol) | [`Stream`](/api/stream#stream)
* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
  * `encoding` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type) **Default:** `'utf8'`
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with `undefined` upon success.

Alias of [`filehandle.writeFile()`][].

When operating on file handles, the mode cannot be changed from what it was set
to with [`fsPromises.open()`][]. Therefore, this is equivalent to
[`filehandle.writeFile()`][].

##### <DataTag tag="M" /> `filehandle.chmod(mode)`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v10.0.0"]}}} />

* `mode` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) the file mode bit mask.
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with `undefined` upon success.

Modifies the permissions on the file. See chmod(2).

##### <DataTag tag="M" /> `filehandle.chown(uid, gid)`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v10.0.0"]}}} />

* `uid` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The file's new owner's user id.
* `gid` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The file's new group's group id.
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with `undefined` upon success.

Changes the ownership of the file. A wrapper for chown(2).

##### <DataTag tag="M" /> `filehandle.close()`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v10.0.0"]}}} />

* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with `undefined` upon success.

Closes the file handle after waiting for any pending operation on the handle to
complete.

```mjs
import { open } from 'node:fs/promises';

let filehandle;
try {
  filehandle = await open('thefile.txt', 'r');
} finally {
  await filehandle?.close();
}
```

##### <DataTag tag="M" /> `filehandle.createReadStream([options])`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v16.11.0"]}}} />

* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `encoding` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) **Default:** `null`
  * `autoClose` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) **Default:** `true`
  * `emitClose` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) **Default:** `true`
  * `start` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
  * `end` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `Infinity`
  * `highWaterMark` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `64 * 1024`
* Returns: [`fs.ReadStream`](/api/fs#fsreadstream)

Unlike the 16 KiB default `highWaterMark` for a [`stream.Readable`](/api/stream#streamreadable), the stream
returned by this method has a default `highWaterMark` of 64 KiB.

`options` can include `start` and `end` values to read a range of bytes from
the file instead of the entire file. Both `start` and `end` are inclusive and
start counting at 0, allowed values are in the
\[0, [`Number.MAX_SAFE_INTEGER`][]] range. If `start` is
omitted or `undefined`, `filehandle.createReadStream()` reads sequentially from
the current file position. The `encoding` can be any one of those accepted by
[`Buffer`](/api/buffer#buffer).

If the `FileHandle` points to a character device that only supports blocking
reads (such as keyboard or sound card), read operations do not finish until data
is available. This can prevent the process from exiting and the stream from
closing naturally.

By default, the stream will emit a `'close'` event after it has been
destroyed.  Set the `emitClose` option to `false` to change this behavior.

```mjs
import { open } from 'node:fs/promises';

const fd = await open('/dev/input/event0');
// Create a stream from some character device.
const stream = fd.createReadStream();
setTimeout(() => {
  stream.close(); // This may not close the stream.
  // Artificially marking end-of-stream, as if the underlying resource had
  // indicated end-of-file by itself, allows the stream to close.
  // This does not cancel pending read operations, and if there is such an
  // operation, the process may still not be able to exit successfully
  // until it finishes.
  stream.push(null);
  stream.read(0);
}, 100);
```

If `autoClose` is false, then the file descriptor won't be closed, even if
there's an error. It is the application's responsibility to close it and make
sure there's no file descriptor leak. If `autoClose` is set to true (default
behavior), on `'error'` or `'end'` the file descriptor will be closed
automatically.

An example to read the last 10 bytes of a file which is 100 bytes long:

```mjs
import { open } from 'node:fs/promises';

const fd = await open('sample.txt');
fd.createReadStream({ start: 90, end: 99 });
```

##### <DataTag tag="M" /> `filehandle.createWriteStream([options])`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v16.11.0"]}}} />

* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `encoding` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) **Default:** `'utf8'`
  * `autoClose` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) **Default:** `true`
  * `emitClose` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) **Default:** `true`
  * `start` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
* Returns: [`fs.WriteStream`](/api/fs#fswritestream)

`options` may also include a `start` option to allow writing data at some
position past the beginning of the file, allowed values are in the
\[0, [`Number.MAX_SAFE_INTEGER`][]] range. Modifying a file rather than
replacing it may require the `flags` `open` option to be set to `r+` rather than
the default `r`. The `encoding` can be any one of those accepted by [`Buffer`](/api/buffer#buffer).

If `autoClose` is set to true (default behavior) on `'error'` or `'finish'`
the file descriptor will be closed automatically. If `autoClose` is false,
then the file descriptor won't be closed, even if there's an error.
It is the application's responsibility to close it and make sure there's no
file descriptor leak.

By default, the stream will emit a `'close'` event after it has been
destroyed.  Set the `emitClose` option to `false` to change this behavior.

##### <DataTag tag="M" /> `filehandle.datasync()`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v10.0.0"]}}} />

* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with `undefined` upon success.

Forces all currently queued I/O operations associated with the file to the
operating system's synchronized I/O completion state. Refer to the POSIX
fdatasync(2) documentation for details.

Unlike `filehandle.sync` this method does not flush modified metadata.

##### <DataTag tag="M" /> `filehandle.fd`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v10.0.0"]}}} />

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The numeric file descriptor managed by the [`FileHandle`](/api/fs#filehandle) object.

##### <DataTag tag="M" /> `filehandle.read(buffer, offset, length, position)`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v10.0.0"]}}} />

* `buffer` [`Buffer`](/api/buffer#buffer) | [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`DataView`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView) A buffer that will be filled with the
  file data read.
* `offset` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The location in the buffer at which to start filling.
* `length` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The number of bytes to read.
* `position` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type) The location where to begin reading data from the
  file. If `null`, data will be read from the current file position, and
  the position will be updated. If `position` is an integer, the current
  file position will remain unchanged.
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills upon success with an object with two properties:
  * `bytesRead` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The number of bytes read
  * `buffer` [`Buffer`](/api/buffer#buffer) | [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`DataView`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView) A reference to the passed in `buffer`
    argument.

Reads data from the file and stores that in the given buffer.

If the file is not modified concurrently, the end-of-file is reached when the
number of bytes read is zero.

##### <DataTag tag="M" /> `filehandle.read([options])`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v13.11.0","v12.17.0"]}}} />

* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `buffer` [`Buffer`](/api/buffer#buffer) | [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`DataView`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView) A buffer that will be filled with the
    file data read. **Default:** `Buffer.alloc(16384)`
  * `offset` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The location in the buffer at which to start filling.
    **Default:** `0`
  * `length` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The number of bytes to read. **Default:**
    `buffer.byteLength - offset`
  * `position` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type) The location where to begin reading data from the
    file. If `null`, data will be read from the current file position, and
    the position will be updated. If `position` is an integer, the current
    file position will remain unchanged. **Default:**: `null`
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills upon success with an object with two properties:
  * `bytesRead` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The number of bytes read
  * `buffer` [`Buffer`](/api/buffer#buffer) | [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`DataView`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView) A reference to the passed in `buffer`
    argument.

Reads data from the file and stores that in the given buffer.

If the file is not modified concurrently, the end-of-file is reached when the
number of bytes read is zero.

##### <DataTag tag="M" /> `filehandle.read(buffer[, options])`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v16.17.0"]}}} />

* `buffer` [`Buffer`](/api/buffer#buffer) | [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`DataView`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView) A buffer that will be filled with the
  file data read.
* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `offset` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The location in the buffer at which to start filling.
    **Default:** `0`
  * `length` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The number of bytes to read. **Default:**
    `buffer.byteLength - offset`
  * `position` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The location where to begin reading data from the
    file. If `null`, data will be read from the current file position, and
    the position will be updated. If `position` is an integer, the current
    file position will remain unchanged. **Default:**: `null`
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills upon success with an object with two properties:
  * `bytesRead` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The number of bytes read
  * `buffer` [`Buffer`](/api/buffer#buffer) | [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`DataView`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView) A reference to the passed in `buffer`
    argument.

Reads data from the file and stores that in the given buffer.

If the file is not modified concurrently, the end-of-file is reached when the
number of bytes read is zero.

##### <DataTag tag="M" /> `filehandle.readFile(options)`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v10.0.0"]}}} />

* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
  * `encoding` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type) **Default:** `null`
  * `signal` [`AbortSignal`](/api/globals#abortsignal) allows aborting an in-progress readFile
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills upon a successful read with the contents of the
  file. If no encoding is specified (using `options.encoding`), the data is
  returned as a [`Buffer`](/api/buffer#buffer) object. Otherwise, the data will be a string.

Asynchronously reads the entire contents of a file.

If `options` is a string, then it specifies the `encoding`.

The [`FileHandle`](/api/fs#filehandle) has to support reading.

If one or more `filehandle.read()` calls are made on a file handle and then a
`filehandle.readFile()` call is made, the data will be read from the current
position till the end of the file. It doesn't always read from the beginning
of the file.

##### <DataTag tag="M" /> `filehandle.readv(buffers[, position])`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v13.13.0","v12.17.0"]}}} />

* `buffers` Buffer\[]|TypedArray\[]|DataView\[]
* `position` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type) The offset from the beginning of the file where
  the data should be read from. If `position` is not a `number`, the data will
  be read from the current position. **Default:** `null`
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills upon success an object containing two properties:
  * `bytesRead` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) the number of bytes read
  * `buffers` Buffer\[]|TypedArray\[]|DataView\[] property containing
    a reference to the `buffers` input.

Read from a file and write to an array of [`ArrayBufferView`](https://developer.mozilla.org/en-US/docs/Web/API/ArrayBufferView)s

##### <DataTag tag="M" /> `filehandle.stat([options])`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v10.5.0","pr-url":"https://github.com/nodejs/node/pull/20220","description":"Accepts an additional `options` object to specify whether the numeric values returned should be bigint."}],"update":{"type":"added","version":["v10.0.0"]}}} />

* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `bigint` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) Whether the numeric values in the returned
    [`fs.Stats`](/api/fs#fsstats) object should be `bigint`. **Default:** `false`.
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with an [`fs.Stats`](/api/fs#fsstats) for the file.

##### <DataTag tag="M" /> `filehandle.sync()`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v10.0.0"]}}} />

* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with `undefined` upon success.

Request that all data for the open file descriptor is flushed to the storage
device. The specific implementation is operating system and device specific.
Refer to the POSIX fsync(2) documentation for more detail.

##### <DataTag tag="M" /> `filehandle.truncate(len)`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v10.0.0"]}}} />

* `len` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `0`
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with `undefined` upon success.

Truncates the file.

If the file was larger than `len` bytes, only the first `len` bytes will be
retained in the file.

The following example retains only the first four bytes of the file:

```mjs
import { open } from 'node:fs/promises';

let filehandle = null;
try {
  filehandle = await open('temp.txt', 'r+');
  await filehandle.truncate(4);
} finally {
  await filehandle?.close();
}
```

If the file previously was shorter than `len` bytes, it is extended, and the
extended part is filled with null bytes (`'\0'`):

If `len` is negative then `0` will be used.

##### <DataTag tag="M" /> `filehandle.utimes(atime, mtime)`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v10.0.0"]}}} />

* `atime` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
* `mtime` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Change the file system timestamps of the object referenced by the [`FileHandle`](/api/fs#filehandle)
then resolves the promise with no arguments upon success.

##### <DataTag tag="M" /> `filehandle.write(buffer, offset[, length[, position]])`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v14.0.0","pr-url":"https://github.com/nodejs/node/pull/31030","description":"The `buffer` parameter won't coerce unsupported input to buffers anymore."}],"update":{"type":"added","version":["v10.0.0"]}}} />

* `buffer` [`Buffer`](/api/buffer#buffer) | [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`DataView`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView)
* `offset` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The start position from within `buffer` where the data
  to write begins.
* `length` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The number of bytes from `buffer` to write. **Default:**
  `buffer.byteLength - offset`
* `position` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type) The offset from the beginning of the file where the
  data from `buffer` should be written. If `position` is not a `number`,
  the data will be written at the current position. See the POSIX pwrite(2)
  documentation for more detail. **Default:** `null`
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Write `buffer` to the file.

The promise is resolved with an object containing two properties:

* `bytesWritten` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) the number of bytes written
* `buffer` [`Buffer`](/api/buffer#buffer) | [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`DataView`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView) a reference to the
  `buffer` written.

It is unsafe to use `filehandle.write()` multiple times on the same file
without waiting for the promise to be resolved (or rejected). For this
scenario, use [`filehandle.createWriteStream()`][].

On Linux, positional writes do not work when the file is opened in append mode.
The kernel ignores the position argument and always appends the data to
the end of the file.

##### <DataTag tag="M" /> `filehandle.write(buffer[, options])`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v16.17.0"]}}} />

* `buffer` [`Buffer`](/api/buffer#buffer) | [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`DataView`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView)
* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `offset` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `0`
  * `length` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `buffer.byteLength - offset`
  * `position` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `null`
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Write `buffer` to the file.

Similar to the above `filehandle.write` function, this version takes an
optional `options` object. If no `options` object is specified, it will
default with the above values.

##### <DataTag tag="M" /> `filehandle.write(string[, position[, encoding]])`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v14.0.0","pr-url":"https://github.com/nodejs/node/pull/31030","description":"The `string` parameter won't coerce unsupported input to strings anymore."}],"update":{"type":"added","version":["v10.0.0"]}}} />

* `string` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
* `position` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type) The offset from the beginning of the file where the
  data from `string` should be written. If `position` is not a `number` the
  data will be written at the current position. See the POSIX pwrite(2)
  documentation for more detail. **Default:** `null`
* `encoding` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) The expected string encoding. **Default:** `'utf8'`
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Write `string` to the file. If `string` is not a string, the promise is
rejected with an error.

The promise is resolved with an object containing two properties:

* `bytesWritten` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) the number of bytes written
* `buffer` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) a reference to the `string` written.

It is unsafe to use `filehandle.write()` multiple times on the same file
without waiting for the promise to be resolved (or rejected). For this
scenario, use [`filehandle.createWriteStream()`][].

On Linux, positional writes do not work when the file is opened in append mode.
The kernel ignores the position argument and always appends the data to
the end of the file.

##### <DataTag tag="M" /> `filehandle.writeFile(data, options)`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v15.14.0","pr-url":"https://github.com/nodejs/node/pull/37490","description":"The `data` argument supports `AsyncIterable`, `Iterable`, and `Stream`."},{"version":"v14.0.0","pr-url":"https://github.com/nodejs/node/pull/31030","description":"The `data` parameter won't coerce unsupported input to strings anymore."}],"update":{"type":"added","version":["v10.0.0"]}}} />

* `data` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`DataView`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView) | [`AsyncIterable`](https://tc39.github.io/ecma262/#sec-asynciterable-interface) | [`Iterable`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol) | [`Stream`](/api/stream#stream)
* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
  * `encoding` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type) The expected character encoding when `data` is a
    string. **Default:** `'utf8'`
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Asynchronously writes data to a file, replacing the file if it already exists.
`data` can be a string, a buffer, an [`AsyncIterable`](https://tc39.github.io/ecma262/#sec-asynciterable-interface), or an [`Iterable`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol) object.
The promise is resolved with no arguments upon success.

If `options` is a string, then it specifies the `encoding`.

The [`FileHandle`](/api/fs#filehandle) has to support writing.

It is unsafe to use `filehandle.writeFile()` multiple times on the same file
without waiting for the promise to be resolved (or rejected).

If one or more `filehandle.write()` calls are made on a file handle and then a
`filehandle.writeFile()` call is made, the data will be written from the
current position till the end of the file. It doesn't always write from the
beginning of the file.

##### <DataTag tag="M" /> `filehandle.writev(buffers[, position])`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v12.9.0"]}}} />

* `buffers` Buffer\[]|TypedArray\[]|DataView\[]
* `position` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type) The offset from the beginning of the file where the
  data from `buffers` should be written. If `position` is not a `number`,
  the data will be written at the current position. **Default:** `null`
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Write an array of [`ArrayBufferView`](https://developer.mozilla.org/en-US/docs/Web/API/ArrayBufferView)s to the file.

The promise is resolved with an object containing a two properties:

* `bytesWritten` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) the number of bytes written
* `buffers` Buffer\[]|TypedArray\[]|DataView\[] a reference to the `buffers`
  input.

It is unsafe to call `writev()` multiple times on the same file without waiting
for the promise to be resolved (or rejected).

On Linux, positional writes don't work when the file is opened in append mode.
The kernel ignores the position argument and always appends the data to
the end of the file.

#### <DataTag tag="M" /> `fsPromises.access(path[, mode])`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v10.0.0"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `mode` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `fs.constants.F_OK`
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with `undefined` upon success.

Tests a user's permissions for the file or directory specified by `path`.
The `mode` argument is an optional integer that specifies the accessibility
checks to be performed. `mode` should be either the value `fs.constants.F_OK`
or a mask consisting of the bitwise OR of any of `fs.constants.R_OK`,
`fs.constants.W_OK`, and `fs.constants.X_OK` (e.g.
`fs.constants.W_OK | fs.constants.R_OK`). Check [File access constants][] for
possible values of `mode`.

If the accessibility check is successful, the promise is resolved with no
value. If any of the accessibility checks fail, the promise is rejected
with an [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) object. The following example checks if the file
`/etc/passwd` can be read and written by the current process.

```mjs
import { access, constants } from 'node:fs/promises';

try {
  await access('/etc/passwd', constants.R_OK | constants.W_OK);
  console.log('can access');
} catch {
  console.error('cannot access');
}
```

Using `fsPromises.access()` to check for the accessibility of a file before
calling `fsPromises.open()` is not recommended. Doing so introduces a race
condition, since other processes may change the file's state between the two
calls. Instead, user code should open/read/write the file directly and handle
the error raised if the file is not accessible.

#### <DataTag tag="M" /> `fsPromises.appendFile(path, data[, options])`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v10.0.0"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api) | [`FileHandle`](/api/fs#filehandle) filename or [`FileHandle`](/api/fs#filehandle)
* `data` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer)
* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
  * `encoding` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type) **Default:** `'utf8'`
  * `mode` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `0o666`
  * `flag` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) See [support of file system `flags`][]. **Default:** `'a'`.
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with `undefined` upon success.

Asynchronously append data to a file, creating the file if it does not yet
exist. `data` can be a string or a [`Buffer`](/api/buffer#buffer).

If `options` is a string, then it specifies the `encoding`.

The `mode` option only affects the newly created file. See [`fs.open()`][]
for more details.

The `path` may be specified as a [`FileHandle`](/api/fs#filehandle) that has been opened
for appending (using `fsPromises.open()`).

#### <DataTag tag="M" /> `fsPromises.chmod(path, mode)`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v10.0.0"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `mode` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with `undefined` upon success.

Changes the permissions of a file.

#### <DataTag tag="M" /> `fsPromises.chown(path, uid, gid)`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v10.0.0"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `uid` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
* `gid` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with `undefined` upon success.

Changes the ownership of a file.

#### <DataTag tag="M" /> `fsPromises.copyFile(src, dest[, mode])`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v14.0.0","pr-url":"https://github.com/nodejs/node/pull/27044","description":"Changed 'flags' argument to 'mode' and imposed stricter type validation."}],"update":{"type":"added","version":["v10.0.0"]}}} />

* `src` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api) source filename to copy
* `dest` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api) destination filename of the copy operation
* `mode` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) Optional modifiers that specify the behavior of the copy
  operation. It is possible to create a mask consisting of the bitwise OR of
  two or more values (e.g.
  `fs.constants.COPYFILE_EXCL | fs.constants.COPYFILE_FICLONE`)
  **Default:** `0`.
  * `fs.constants.COPYFILE_EXCL`: The copy operation will fail if `dest`
    already exists.
  * `fs.constants.COPYFILE_FICLONE`: The copy operation will attempt to create
    a copy-on-write reflink. If the platform does not support copy-on-write,
    then a fallback copy mechanism is used.
  * `fs.constants.COPYFILE_FICLONE_FORCE`: The copy operation will attempt to
    create a copy-on-write reflink. If the platform does not support
    copy-on-write, then the operation will fail.
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with `undefined` upon success.

Asynchronously copies `src` to `dest`. By default, `dest` is overwritten if it
already exists.

No guarantees are made about the atomicity of the copy operation. If an
error occurs after the destination file has been opened for writing, an attempt
will be made to remove the destination.

```mjs
import { copyFile, constants } from 'node:fs/promises';

try {
  await copyFile('source.txt', 'destination.txt');
  console.log('source.txt was copied to destination.txt');
} catch {
  console.log('The file could not be copied');
}

// By using COPYFILE_EXCL, the operation will fail if destination.txt exists.
try {
  await copyFile('source.txt', 'destination.txt', constants.COPYFILE_EXCL);
  console.log('source.txt was copied to destination.txt');
} catch {
  console.log('The file could not be copied');
}
```

#### <DataTag tag="M" /> `fsPromises.cp(src, dest[, options])`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v16.15.0","pr-url":"https://github.com/nodejs/node/pull/41819","description":"Accepts an additional `verbatimSymlinks` option to specify whether to perform path resolution for symlinks."}],"update":{"type":"added","version":["v16.7.0"]}}} />

<Metadata version="v16.18.1" data={{"stability":{"level":1,"text":" - Experimental"}}} />

* `src` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`URL`](/api/url#the-whatwg-url-api) source path to copy.
* `dest` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`URL`](/api/url#the-whatwg-url-api) destination path to copy to.
* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `dereference` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) dereference symlinks. **Default:** `false`.
  * `errorOnExist` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) when `force` is `false`, and the destination
    exists, throw an error. **Default:** `false`.
  * `filter` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) Function to filter copied files/directories. Return
    `true` to copy the item, `false` to ignore it. Can also return a `Promise`
    that resolves to `true` or `false` **Default:** `undefined`.
  * `force` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) overwrite existing file or directory. The copy
    operation will ignore errors if you set this to false and the destination
    exists. Use the `errorOnExist` option to change this behavior.
    **Default:** `true`.
  * `preserveTimestamps` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) When `true` timestamps from `src` will
    be preserved. **Default:** `false`.
  * `recursive` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) copy directories recursively **Default:** `false`
  * `verbatimSymlinks` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) When `true`, path resolution for symlinks will
    be skipped. **Default:** `false`
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with `undefined` upon success.

Asynchronously copies the entire directory structure from `src` to `dest`,
including subdirectories and files.

When copying a directory to another directory, globs are not supported and
behavior is similar to `cp dir1/ dir2/`.

#### <DataTag tag="M" /> `fsPromises.lchmod(path, mode)`

<Metadata version="v16.18.1" data={{"update":{"type":"deprecated","version":["v10.0.0"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `mode` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with `undefined` upon success.

Changes the permissions on a symbolic link.

This method is only implemented on macOS.

#### <DataTag tag="M" /> `fsPromises.lchown(path, uid, gid)`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v10.6.0","pr-url":"https://github.com/nodejs/node/pull/21498","description":"This API is no longer deprecated."}],"update":{"type":"added","version":["v10.0.0"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `uid` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
* `gid` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)  Fulfills with `undefined` upon success.

Changes the ownership on a symbolic link.

#### <DataTag tag="M" /> `fsPromises.lutimes(path, atime, mtime)`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v14.5.0","v12.19.0"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `atime` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
* `mtime` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)  Fulfills with `undefined` upon success.

Changes the access and modification times of a file in the same way as
[`fsPromises.utimes()`][], with the difference that if the path refers to a
symbolic link, then the link is not dereferenced: instead, the timestamps of
the symbolic link itself are changed.

#### <DataTag tag="M" /> `fsPromises.link(existingPath, newPath)`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v10.0.0"]}}} />

* `existingPath` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `newPath` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)  Fulfills with `undefined` upon success.

Creates a new link from the `existingPath` to the `newPath`. See the POSIX
link(2) documentation for more detail.

#### <DataTag tag="M" /> `fsPromises.lstat(path[, options])`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v10.5.0","pr-url":"https://github.com/nodejs/node/pull/20220","description":"Accepts an additional `options` object to specify whether the numeric values returned should be bigint."}],"update":{"type":"added","version":["v10.0.0"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `bigint` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) Whether the numeric values in the returned
    [`fs.Stats`](/api/fs#fsstats) object should be `bigint`. **Default:** `false`.
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)  Fulfills with the [`fs.Stats`](/api/fs#fsstats) object for the given
  symbolic link `path`.

Equivalent to [`fsPromises.stat()`][] unless `path` refers to a symbolic link,
in which case the link itself is stat-ed, not the file that it refers to.
Refer to the POSIX lstat(2) document for more detail.

#### <DataTag tag="M" /> `fsPromises.mkdir(path[, options])`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v10.0.0"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) | [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
  * `recursive` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) **Default:** `false`
  * `mode` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) Not supported on Windows. **Default:** `0o777`.
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) Upon success, fulfills with `undefined` if `recursive`
  is `false`, or the first directory path created if `recursive` is `true`.

Asynchronously creates a directory.

The optional `options` argument can be an integer specifying `mode` (permission
and sticky bits), or an object with a `mode` property and a `recursive`
property indicating whether parent directories should be created. Calling
`fsPromises.mkdir()` when `path` is a directory that exists results in a
rejection only when `recursive` is false.

```mjs
import { mkdir } from 'node:fs/promises';

try {
  const projectFolder = new URL('./test/project/', import.meta.url);
  const createDir = await mkdir(projectFolder, { recursive: true });

  console.log(`created ${createDir}`);
} catch (err) {
  console.error(err.message);
}
```

```cjs
const { mkdir } = require('node:fs/promises');
const { resolve, join } = require('node:path');

async function makeDirectory() {
  const projectFolder = join(__dirname, 'test', 'project');
  const dirCreation = await mkdir(projectFolder, { recursive: true });

  console.log(dirCreation);
  return dirCreation;
}

makeDirectory().catch(console.error);
```

#### <DataTag tag="M" /> `fsPromises.mkdtemp(prefix[, options])`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v16.5.0","pr-url":"https://github.com/nodejs/node/pull/39028","description":"The `prefix` parameter now accepts an empty string."}],"update":{"type":"added","version":["v10.0.0"]}}} />

* `prefix` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
* `options` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `encoding` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) **Default:** `'utf8'`
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)  Fulfills with a string containing the filesystem path
  of the newly created temporary directory.

Creates a unique temporary directory. A unique directory name is generated by
appending six random characters to the end of the provided `prefix`. Due to
platform inconsistencies, avoid trailing `X` characters in `prefix`. Some
platforms, notably the BSDs, can return more than six random characters, and
replace trailing `X` characters in `prefix` with random characters.

The optional `options` argument can be a string specifying an encoding, or an
object with an `encoding` property specifying the character encoding to use.

```mjs
import { mkdtemp } from 'node:fs/promises';

try {
  await mkdtemp(path.join(os.tmpdir(), 'foo-'));
} catch (err) {
  console.error(err);
}
```

The `fsPromises.mkdtemp()` method will append the six randomly selected
characters directly to the `prefix` string. For instance, given a directory
`/tmp`, if the intention is to create a temporary directory _within_ `/tmp`, the
`prefix` must end with a trailing platform-specific path separator
(`require('node:path').sep`).

#### <DataTag tag="M" /> `fsPromises.open(path, flags[, mode])`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v11.1.0","pr-url":"https://github.com/nodejs/node/pull/23767","description":"The `flags` argument is now optional and defaults to `'r'`."}],"update":{"type":"added","version":["v10.0.0"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `flags` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) See [support of file system `flags`][].
  **Default:** `'r'`.
* `mode` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) Sets the file mode (permission and sticky bits)
  if the file is created. **Default:** `0o666` (readable and writable)
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with a [`FileHandle`](/api/fs#filehandle) object.

Opens a [`FileHandle`](/api/fs#filehandle).

Refer to the POSIX open(2) documentation for more detail.

Some characters (`< > : " / \ | ? *`) are reserved under Windows as documented
by [Naming Files, Paths, and Namespaces][]. Under NTFS, if the filename contains
a colon, Node.js will open a file system stream, as described by
[this MSDN page][MSDN-Using-Streams].

#### <DataTag tag="M" /> `fsPromises.opendir(path[, options])`

<Metadata version="v16.18.1" data={{"changes":[{"version":["v13.1.0","v12.16.0"],"pr-url":"https://github.com/nodejs/node/pull/30114","description":"The `bufferSize` option was introduced."}],"update":{"type":"added","version":["v12.12.0"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `encoding` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type) **Default:** `'utf8'`
  * `bufferSize` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) Number of directory entries that are buffered
    internally when reading from the directory. Higher values lead to better
    performance but higher memory usage. **Default:** `32`
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)  Fulfills with an [`fs.Dir`](/api/fs#fsdir).

Asynchronously open a directory for iterative scanning. See the POSIX
opendir(3) documentation for more detail.

Creates an [`fs.Dir`](/api/fs#fsdir), which contains all further functions for reading from
and cleaning up the directory.

The `encoding` option sets the encoding for the `path` while opening the
directory and subsequent read operations.

Example using async iteration:

```mjs
import { opendir } from 'node:fs/promises';

try {
  const dir = await opendir('./');
  for await (const dirent of dir)
    console.log(dirent.name);
} catch (err) {
  console.error(err);
}
```

When using the async iterator, the [`fs.Dir`](/api/fs#fsdir) object will be automatically
closed after the iterator exits.

#### <DataTag tag="M" /> `fsPromises.readdir(path[, options])`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v10.11.0","pr-url":"https://github.com/nodejs/node/pull/22020","description":"New option `withFileTypes` was added."}],"update":{"type":"added","version":["v10.0.0"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `options` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `encoding` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) **Default:** `'utf8'`
  * `withFileTypes` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) **Default:** `false`
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)  Fulfills with an array of the names of the files in
  the directory excluding `'.'` and `'..'`.

Reads the contents of a directory.

The optional `options` argument can be a string specifying an encoding, or an
object with an `encoding` property specifying the character encoding to use for
the filenames. If the `encoding` is set to `'buffer'`, the filenames returned
will be passed as [`Buffer`](/api/buffer#buffer) objects.

If `options.withFileTypes` is set to `true`, the resolved array will contain
[`fs.Dirent`](/api/fs#fsdirent) objects.

```mjs
import { readdir } from 'node:fs/promises';

try {
  const files = await readdir(path);
  for (const file of files)
    console.log(file);
} catch (err) {
  console.error(err);
}
```

#### <DataTag tag="M" /> `fsPromises.readFile(path[, options])`

<Metadata version="v16.18.1" data={{"changes":[{"version":["v15.2.0","v14.17.0"],"pr-url":"https://github.com/nodejs/node/pull/35911","description":"The options argument may include an AbortSignal to abort an ongoing readFile request."}],"update":{"type":"added","version":["v10.0.0"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api) | [`FileHandle`](/api/fs#filehandle) filename or `FileHandle`
* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
  * `encoding` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type) **Default:** `null`
  * `flag` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) See [support of file system `flags`][]. **Default:** `'r'`.
  * `signal` [`AbortSignal`](/api/globals#abortsignal) allows aborting an in-progress readFile
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)  Fulfills with the contents of the file.

Asynchronously reads the entire contents of a file.

If no encoding is specified (using `options.encoding`), the data is returned
as a [`Buffer`](/api/buffer#buffer) object. Otherwise, the data will be a string.

If `options` is a string, then it specifies the encoding.

When the `path` is a directory, the behavior of `fsPromises.readFile()` is
platform-specific. On macOS, Linux, and Windows, the promise will be rejected
with an error. On FreeBSD, a representation of the directory's contents will be
returned.

It is possible to abort an ongoing `readFile` using an [`AbortSignal`](/api/globals#abortsignal). If a
request is aborted the promise returned is rejected with an `AbortError`:

```mjs
import { readFile } from 'node:fs/promises';

try {
  const controller = new AbortController();
  const { signal } = controller;
  const promise = readFile(fileName, { signal });

  // Abort the request before the promise settles.
  controller.abort();

  await promise;
} catch (err) {
  // When a request is aborted - err is an AbortError
  console.error(err);
}
```

Aborting an ongoing request does not abort individual operating
system requests but rather the internal buffering `fs.readFile` performs.

Any specified [`FileHandle`](/api/fs#filehandle) has to support reading.

#### <DataTag tag="M" /> `fsPromises.readlink(path[, options])`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v10.0.0"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `options` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `encoding` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) **Default:** `'utf8'`
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with the `linkString` upon success.

Reads the contents of the symbolic link referred to by `path`. See the POSIX
readlink(2) documentation for more detail. The promise is resolved with the
`linkString` upon success.

The optional `options` argument can be a string specifying an encoding, or an
object with an `encoding` property specifying the character encoding to use for
the link path returned. If the `encoding` is set to `'buffer'`, the link path
returned will be passed as a [`Buffer`](/api/buffer#buffer) object.

#### <DataTag tag="M" /> `fsPromises.realpath(path[, options])`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v10.0.0"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `options` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `encoding` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) **Default:** `'utf8'`
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)  Fulfills with the resolved path upon success.

Determines the actual location of `path` using the same semantics as the
`fs.realpath.native()` function.

Only paths that can be converted to UTF8 strings are supported.

The optional `options` argument can be a string specifying an encoding, or an
object with an `encoding` property specifying the character encoding to use for
the path. If the `encoding` is set to `'buffer'`, the path returned will be
passed as a [`Buffer`](/api/buffer#buffer) object.

On Linux, when Node.js is linked against musl libc, the procfs file system must
be mounted on `/proc` in order for this function to work. Glibc does not have
this restriction.

#### <DataTag tag="M" /> `fsPromises.rename(oldPath, newPath)`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v10.0.0"]}}} />

* `oldPath` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `newPath` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with `undefined` upon success.

Renames `oldPath` to `newPath`.

#### <DataTag tag="M" /> `fsPromises.rmdir(path[, options])`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v16.0.0","pr-url":"https://github.com/nodejs/node/pull/37216","description":"Using `fsPromises.rmdir(path, { recursive: true })` on a `path` that is a file is no longer permitted and results in an `ENOENT` error on Windows and an `ENOTDIR` error on POSIX."},{"version":"v16.0.0","pr-url":"https://github.com/nodejs/node/pull/37216","description":"Using `fsPromises.rmdir(path, { recursive: true })` on a `path` that does not exist is no longer permitted and results in a `ENOENT` error."},{"version":"v16.0.0","pr-url":"https://github.com/nodejs/node/pull/37302","description":"The `recursive` option is deprecated, using it triggers a deprecation warning."},{"version":"v14.14.0","pr-url":"https://github.com/nodejs/node/pull/35579","description":"The `recursive` option is deprecated, use `fsPromises.rm` instead."},{"version":["v13.3.0","v12.16.0"],"pr-url":"https://github.com/nodejs/node/pull/30644","description":"The `maxBusyTries` option is renamed to `maxRetries`, and its default is 0. The `emfileWait` option has been removed, and `EMFILE` errors use the same retry logic as other errors. The `retryDelay` option is now supported. `ENFILE` errors are now retried."},{"version":"v12.10.0","pr-url":"https://github.com/nodejs/node/pull/29168","description":"The `recursive`, `maxBusyTries`, and `emfileWait` options are now supported."}],"update":{"type":"added","version":["v10.0.0"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `maxRetries` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) If an `EBUSY`, `EMFILE`, `ENFILE`, `ENOTEMPTY`, or
    `EPERM` error is encountered, Node.js retries the operation with a linear
    backoff wait of `retryDelay` milliseconds longer on each try. This option
    represents the number of retries. This option is ignored if the `recursive`
    option is not `true`. **Default:** `0`.
  * `recursive` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) If `true`, perform a recursive directory removal. In
    recursive mode, operations are retried on failure. **Default:** `false`.
    **Deprecated.**
  * `retryDelay` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The amount of time in milliseconds to wait between
    retries. This option is ignored if the `recursive` option is not `true`.
    **Default:** `100`.
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with `undefined` upon success.

Removes the directory identified by `path`.

Using `fsPromises.rmdir()` on a file (not a directory) results in the
promise being rejected with an `ENOENT` error on Windows and an `ENOTDIR`
error on POSIX.

To get a behavior similar to the `rm -rf` Unix command, use
[`fsPromises.rm()`][] with options `{ recursive: true, force: true }`.

#### <DataTag tag="M" /> `fsPromises.rm(path[, options])`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v14.14.0"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `force` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) When `true`, exceptions will be ignored if `path` does
    not exist. **Default:** `false`.
  * `maxRetries` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) If an `EBUSY`, `EMFILE`, `ENFILE`, `ENOTEMPTY`, or
    `EPERM` error is encountered, Node.js will retry the operation with a linear
    backoff wait of `retryDelay` milliseconds longer on each try. This option
    represents the number of retries. This option is ignored if the `recursive`
    option is not `true`. **Default:** `0`.
  * `recursive` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) If `true`, perform a recursive directory removal. In
    recursive mode operations are retried on failure. **Default:** `false`.
  * `retryDelay` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The amount of time in milliseconds to wait between
    retries. This option is ignored if the `recursive` option is not `true`.
    **Default:** `100`.
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with `undefined` upon success.

Removes files and directories (modeled on the standard POSIX `rm` utility).

#### <DataTag tag="M" /> `fsPromises.stat(path[, options])`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v10.5.0","pr-url":"https://github.com/nodejs/node/pull/20220","description":"Accepts an additional `options` object to specify whether the numeric values returned should be bigint."}],"update":{"type":"added","version":["v10.0.0"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `bigint` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) Whether the numeric values in the returned
    [`fs.Stats`](/api/fs#fsstats) object should be `bigint`. **Default:** `false`.
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)  Fulfills with the [`fs.Stats`](/api/fs#fsstats) object for the
  given `path`.

#### <DataTag tag="M" /> `fsPromises.symlink(target, path[, type])`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v10.0.0"]}}} />

* `target` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `type` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) **Default:** `'file'`
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with `undefined` upon success.

Creates a symbolic link.

The `type` argument is only used on Windows platforms and can be one of `'dir'`,
`'file'`, or `'junction'`. Windows junction points require the destination path
to be absolute. When using `'junction'`, the `target` argument will
automatically be normalized to absolute path.

#### <DataTag tag="M" /> `fsPromises.truncate(path[, len])`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v10.0.0"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `len` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `0`
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with `undefined` upon success.

Truncates (shortens or extends the length) of the content at `path` to `len`
bytes.

#### <DataTag tag="M" /> `fsPromises.unlink(path)`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v10.0.0"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with `undefined` upon success.

If `path` refers to a symbolic link, then the link is removed without affecting
the file or directory to which that link refers. If the `path` refers to a file
path that is not a symbolic link, the file is deleted. See the POSIX unlink(2)
documentation for more detail.

#### <DataTag tag="M" /> `fsPromises.utimes(path, atime, mtime)`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v10.0.0"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `atime` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
* `mtime` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with `undefined` upon success.

Change the file system timestamps of the object referenced by `path`.

The `atime` and `mtime` arguments follow these rules:

* Values can be either numbers representing Unix epoch time, `Date`s, or a
  numeric string like `'123456789.0'`.
* If the value can not be converted to a number, or is `NaN`, `Infinity`, or
  `-Infinity`, an `Error` will be thrown.

#### <DataTag tag="M" /> `fsPromises.watch(filename[, options])`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v15.9.0"]}}} />

* `filename` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `options` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `persistent` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) Indicates whether the process should continue to run
    as long as files are being watched. **Default:** `true`.
  * `recursive` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) Indicates whether all subdirectories should be
    watched, or only the current directory. This applies when a directory is
    specified, and only on supported platforms (See [caveats][]). **Default:**
    `false`.
  * `encoding` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Specifies the character encoding to be used for the
    filename passed to the listener. **Default:** `'utf8'`.
  * `signal` [`AbortSignal`](/api/globals#abortsignal) An [`AbortSignal`](/api/globals#abortsignal) used to signal when the watcher
    should stop.
* Returns: [`AsyncIterator`](https://tc39.github.io/ecma262/#sec-asynciterator-interface) of objects with the properties:
  * `eventType` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) The type of change
  * `filename` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) The name of the file changed.

Returns an async iterator that watches for changes on `filename`, where `filename`
is either a file or a directory.

```js
const { watch } = require('node:fs/promises');

const ac = new AbortController();
const { signal } = ac;
setTimeout(() => ac.abort(), 10000);

(async () => {
  try {
    const watcher = watch(__filename, { signal });
    for await (const event of watcher)
      console.log(event);
  } catch (err) {
    if (err.name === 'AbortError')
      return;
    throw err;
  }
})();
```

On most platforms, `'rename'` is emitted whenever a filename appears or
disappears in the directory.

All the [caveats][] for `fs.watch()` also apply to `fsPromises.watch()`.

#### <DataTag tag="M" /> `fsPromises.writeFile(file, data[, options])`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v15.14.0","pr-url":"https://github.com/nodejs/node/pull/37490","description":"The `data` argument supports `AsyncIterable`, `Iterable`, and `Stream`."},{"version":["v15.2.0","v14.17.0"],"pr-url":"https://github.com/nodejs/node/pull/35993","description":"The options argument may include an AbortSignal to abort an ongoing writeFile request."},{"version":"v14.0.0","pr-url":"https://github.com/nodejs/node/pull/31030","description":"The `data` parameter won't coerce unsupported input to strings anymore."}],"update":{"type":"added","version":["v10.0.0"]}}} />

* `file` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api) | [`FileHandle`](/api/fs#filehandle) filename or `FileHandle`
* `data` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`DataView`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView) | [`AsyncIterable`](https://tc39.github.io/ecma262/#sec-asynciterable-interface) | [`Iterable`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol) | [`Stream`](/api/stream#stream)
* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
  * `encoding` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type) **Default:** `'utf8'`
  * `mode` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `0o666`
  * `flag` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) See [support of file system `flags`][]. **Default:** `'w'`.
  * `signal` [`AbortSignal`](/api/globals#abortsignal) allows aborting an in-progress writeFile
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with `undefined` upon success.

Asynchronously writes data to a file, replacing the file if it already exists.
`data` can be a string, a buffer, an [`AsyncIterable`](https://tc39.github.io/ecma262/#sec-asynciterable-interface), or an [`Iterable`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol) object.

The `encoding` option is ignored if `data` is a buffer.

If `options` is a string, then it specifies the encoding.

The `mode` option only affects the newly created file. See [`fs.open()`][]
for more details.

Any specified [`FileHandle`](/api/fs#filehandle) has to support writing.

It is unsafe to use `fsPromises.writeFile()` multiple times on the same file
without waiting for the promise to be settled.

Similarly to `fsPromises.readFile` - `fsPromises.writeFile` is a convenience
method that performs multiple `write` calls internally to write the buffer
passed to it. For performance sensitive code consider using
[`fs.createWriteStream()`][] or [`filehandle.createWriteStream()`][].

It is possible to use an [`AbortSignal`](/api/globals#abortsignal) to cancel an `fsPromises.writeFile()`.
Cancelation is "best effort", and some amount of data is likely still
to be written.

```mjs
import { writeFile } from 'node:fs/promises';
import { Buffer } from 'node:buffer';

try {
  const controller = new AbortController();
  const { signal } = controller;
  const data = new Uint8Array(Buffer.from('Hello Node.js'));
  const promise = writeFile('message.txt', data, { signal });

  // Abort the request before the promise settles.
  controller.abort();

  await promise;
} catch (err) {
  // When a request is aborted - err is an AbortError
  console.error(err);
}
```

Aborting an ongoing request does not abort individual operating
system requests but rather the internal buffering `fs.writeFile` performs.

#### <DataTag tag="M" /> `fsPromises.constants`

* [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

Returns an object containing commonly used constants for file system
operations. The object is the same as `fs.constants`. See [FS constants][]
for more details.

### Callback API

The callback APIs perform all operations asynchronously, without blocking the
event loop, then invoke a callback function upon completion or error.

The callback APIs use the underlying Node.js threadpool to perform file
system operations off the event loop thread. These operations are not
synchronized or threadsafe. Care must be taken when performing multiple
concurrent modifications on the same file or data corruption may occur.

#### <DataTag tag="M" /> `fs.access(path[, mode], callback)`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v7.6.0","pr-url":"https://github.com/nodejs/node/pull/10739","description":"The `path` parameter can be a WHATWG `URL` object using `file:` protocol."},{"version":"v6.3.0","pr-url":"https://github.com/nodejs/node/pull/6534","description":"The constants like `fs.R_OK`, etc which were present directly on `fs` were moved into `fs.constants` as a soft deprecation. Thus for Node.js `< v6.3.0` use `fs` to access those constants, or do something like `(fs.constants || fs).R_OK` to work with all versions."}],"update":{"type":"added","version":["v0.11.15"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `mode` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `fs.constants.F_OK`
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `err` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

Tests a user's permissions for the file or directory specified by `path`.
The `mode` argument is an optional integer that specifies the accessibility
checks to be performed. `mode` should be either the value `fs.constants.F_OK`
or a mask consisting of the bitwise OR of any of `fs.constants.R_OK`,
`fs.constants.W_OK`, and `fs.constants.X_OK` (e.g.
`fs.constants.W_OK | fs.constants.R_OK`). Check [File access constants][] for
possible values of `mode`.

The final argument, `callback`, is a callback function that is invoked with
a possible error argument. If any of the accessibility checks fail, the error
argument will be an `Error` object. The following examples check if
`package.json` exists, and if it is readable or writable.

```mjs
import { access, constants } from 'node:fs';

const file = 'package.json';

// Check if the file exists in the current directory.
access(file, constants.F_OK, (err) => {
  console.log(`${file} ${err ? 'does not exist' : 'exists'}`);
});

// Check if the file is readable.
access(file, constants.R_OK, (err) => {
  console.log(`${file} ${err ? 'is not readable' : 'is readable'}`);
});

// Check if the file is writable.
access(file, constants.W_OK, (err) => {
  console.log(`${file} ${err ? 'is not writable' : 'is writable'}`);
});

// Check if the file is readable and writable.
access(file, constants.R_OK | constants.W_OK, (err) => {
  console.log(`${file} ${err ? 'is not' : 'is'} readable and writable`);
});
```

Do not use `fs.access()` to check for the accessibility of a file before calling
`fs.open()`, `fs.readFile()`, or `fs.writeFile()`. Doing
so introduces a race condition, since other processes may change the file's
state between the two calls. Instead, user code should open/read/write the
file directly and handle the error raised if the file is not accessible.

**write (NOT RECOMMENDED)**

```mjs
import { access, open, close } from 'node:fs';

access('myfile', (err) => {
  if (!err) {
    console.error('myfile already exists');
    return;
  }

  open('myfile', 'wx', (err, fd) => {
    if (err) throw err;

    try {
      writeMyData(fd);
    } finally {
      close(fd, (err) => {
        if (err) throw err;
      });
    }
  });
});
```

**write (RECOMMENDED)**

```mjs
import { open, close } from 'node:fs';

open('myfile', 'wx', (err, fd) => {
  if (err) {
    if (err.code === 'EEXIST') {
      console.error('myfile already exists');
      return;
    }

    throw err;
  }

  try {
    writeMyData(fd);
  } finally {
    close(fd, (err) => {
      if (err) throw err;
    });
  }
});
```

**read (NOT RECOMMENDED)**

```mjs
import { access, open, close } from 'node:fs';
access('myfile', (err) => {
  if (err) {
    if (err.code === 'ENOENT') {
      console.error('myfile does not exist');
      return;
    }

    throw err;
  }

  open('myfile', 'r', (err, fd) => {
    if (err) throw err;

    try {
      readMyData(fd);
    } finally {
      close(fd, (err) => {
        if (err) throw err;
      });
    }
  });
});
```

**read (RECOMMENDED)**

```mjs
import { open, close } from 'node:fs';

open('myfile', 'r', (err, fd) => {
  if (err) {
    if (err.code === 'ENOENT') {
      console.error('myfile does not exist');
      return;
    }

    throw err;
  }

  try {
    readMyData(fd);
  } finally {
    close(fd, (err) => {
      if (err) throw err;
    });
  }
});
```

The "not recommended" examples above check for accessibility and then use the
file; the "recommended" examples are better because they use the file directly
and handle the error, if any.

In general, check for the accessibility of a file only if the file will not be
used directly, for example when its accessibility is a signal from another
process.

On Windows, access-control policies (ACLs) on a directory may limit access to
a file or directory. The `fs.access()` function, however, does not check the
ACL and therefore may report that a path is accessible even if the ACL restricts
the user from reading or writing to it.

#### <DataTag tag="M" /> `fs.appendFile(path, data[, options], callback)`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/12562","description":"The `callback` parameter is no longer optional. Not passing it will throw a `TypeError` at runtime."},{"version":"v7.0.0","pr-url":"https://github.com/nodejs/node/pull/7897","description":"The `callback` parameter is no longer optional. Not passing it will emit a deprecation warning with id DEP0013."},{"version":"v7.0.0","pr-url":"https://github.com/nodejs/node/pull/7831","description":"The passed `options` object will never be modified."},{"version":"v5.0.0","pr-url":"https://github.com/nodejs/node/pull/3163","description":"The `file` parameter can be a file descriptor now."}],"update":{"type":"added","version":["v0.6.7"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api) | [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) filename or file descriptor
* `data` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer)
* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
  * `encoding` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type) **Default:** `'utf8'`
  * `mode` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `0o666`
  * `flag` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) See [support of file system `flags`][]. **Default:** `'a'`.
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `err` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

Asynchronously append data to a file, creating the file if it does not yet
exist. `data` can be a string or a [`Buffer`](/api/buffer#buffer).

The `mode` option only affects the newly created file. See [`fs.open()`][]
for more details.

```mjs
import { appendFile } from 'node:fs';

appendFile('message.txt', 'data to append', (err) => {
  if (err) throw err;
  console.log('The "data to append" was appended to file!');
});
```

If `options` is a string, then it specifies the encoding:

```mjs
import { appendFile } from 'node:fs';

appendFile('message.txt', 'data to append', 'utf8', callback);
```

The `path` may be specified as a numeric file descriptor that has been opened
for appending (using `fs.open()` or `fs.openSync()`). The file descriptor will
not be closed automatically.

```mjs
import { open, close, appendFile } from 'node:fs';

function closeFd(fd) {
  close(fd, (err) => {
    if (err) throw err;
  });
}

open('message.txt', 'a', (err, fd) => {
  if (err) throw err;

  try {
    appendFile(fd, 'data to append', 'utf8', (err) => {
      closeFd(fd);
      if (err) throw err;
    });
  } catch (err) {
    closeFd(fd);
    throw err;
  }
});
```

#### <DataTag tag="M" /> `fs.chmod(path, mode, callback)`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/12562","description":"The `callback` parameter is no longer optional. Not passing it will throw a `TypeError` at runtime."},{"version":"v7.6.0","pr-url":"https://github.com/nodejs/node/pull/10739","description":"The `path` parameter can be a WHATWG `URL` object using `file:` protocol."},{"version":"v7.0.0","pr-url":"https://github.com/nodejs/node/pull/7897","description":"The `callback` parameter is no longer optional. Not passing it will emit a deprecation warning with id DEP0013."}],"update":{"type":"added","version":["v0.1.30"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `mode` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `err` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

Asynchronously changes the permissions of a file. No arguments other than a
possible exception are given to the completion callback.

See the POSIX chmod(2) documentation for more detail.

```mjs
import { chmod } from 'node:fs';

chmod('my_file.txt', 0o775, (err) => {
  if (err) throw err;
  console.log('The permissions for file "my_file.txt" have been changed!');
});
```

##### File modes

The `mode` argument used in both the `fs.chmod()` and `fs.chmodSync()`
methods is a numeric bitmask created using a logical OR of the following
constants:

| Constant               | Octal   | Description              |
| ---------------------- | ------- | ------------------------ |
| `fs.constants.S_IRUSR` | `0o400` | read by owner            |
| `fs.constants.S_IWUSR` | `0o200` | write by owner           |
| `fs.constants.S_IXUSR` | `0o100` | execute/search by owner  |
| `fs.constants.S_IRGRP` | `0o40`  | read by group            |
| `fs.constants.S_IWGRP` | `0o20`  | write by group           |
| `fs.constants.S_IXGRP` | `0o10`  | execute/search by group  |
| `fs.constants.S_IROTH` | `0o4`   | read by others           |
| `fs.constants.S_IWOTH` | `0o2`   | write by others          |
| `fs.constants.S_IXOTH` | `0o1`   | execute/search by others |

An easier method of constructing the `mode` is to use a sequence of three
octal digits (e.g. `765`). The left-most digit (`7` in the example), specifies
the permissions for the file owner. The middle digit (`6` in the example),
specifies permissions for the group. The right-most digit (`5` in the example),
specifies the permissions for others.

| Number | Description              |
| ------ | ------------------------ |
| `7`    | read, write, and execute |
| `6`    | read and write           |
| `5`    | read and execute         |
| `4`    | read only                |
| `3`    | write and execute        |
| `2`    | write only               |
| `1`    | execute only             |
| `0`    | no permission            |

For example, the octal value `0o765` means:

* The owner may read, write, and execute the file.
* The group may read and write the file.
* Others may read and execute the file.

When using raw numbers where file modes are expected, any value larger than
`0o777` may result in platform-specific behaviors that are not supported to work
consistently. Therefore constants like `S_ISVTX`, `S_ISGID`, or `S_ISUID` are
not exposed in `fs.constants`.

Caveats: on Windows only the write permission can be changed, and the
distinction among the permissions of group, owner, or others is not
implemented.

#### <DataTag tag="M" /> `fs.chown(path, uid, gid, callback)`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/12562","description":"The `callback` parameter is no longer optional. Not passing it will throw a `TypeError` at runtime."},{"version":"v7.6.0","pr-url":"https://github.com/nodejs/node/pull/10739","description":"The `path` parameter can be a WHATWG `URL` object using `file:` protocol."},{"version":"v7.0.0","pr-url":"https://github.com/nodejs/node/pull/7897","description":"The `callback` parameter is no longer optional. Not passing it will emit a deprecation warning with id DEP0013."}],"update":{"type":"added","version":["v0.1.97"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `uid` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
* `gid` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `err` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

Asynchronously changes owner and group of a file. No arguments other than a
possible exception are given to the completion callback.

See the POSIX chown(2) documentation for more detail.

#### <DataTag tag="M" /> `fs.close(fd[, callback])`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v15.9.0","pr-url":"https://github.com/nodejs/node/pull/37174","description":"A default callback is now used if one is not provided."},{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/12562","description":"The `callback` parameter is no longer optional. Not passing it will throw a `TypeError` at runtime."},{"version":"v7.0.0","pr-url":"https://github.com/nodejs/node/pull/7897","description":"The `callback` parameter is no longer optional. Not passing it will emit a deprecation warning with id DEP0013."}],"update":{"type":"added","version":["v0.0.2"]}}} />

* `fd` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `err` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

Closes the file descriptor. No arguments other than a possible exception are
given to the completion callback.

Calling `fs.close()` on any file descriptor (`fd`) that is currently in use
through any other `fs` operation may lead to undefined behavior.

See the POSIX close(2) documentation for more detail.

#### <DataTag tag="M" /> `fs.copyFile(src, dest[, mode], callback)`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v14.0.0","pr-url":"https://github.com/nodejs/node/pull/27044","description":"Changed 'flags' argument to 'mode' and imposed stricter type validation."}],"update":{"type":"added","version":["v8.5.0"]}}} />

* `src` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api) source filename to copy
* `dest` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api) destination filename of the copy operation
* `mode` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) modifiers for copy operation. **Default:** `0`.
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)

Asynchronously copies `src` to `dest`. By default, `dest` is overwritten if it
already exists. No arguments other than a possible exception are given to the
callback function. Node.js makes no guarantees about the atomicity of the copy
operation. If an error occurs after the destination file has been opened for
writing, Node.js will attempt to remove the destination.

`mode` is an optional integer that specifies the behavior
of the copy operation. It is possible to create a mask consisting of the bitwise
OR of two or more values (e.g.
`fs.constants.COPYFILE_EXCL | fs.constants.COPYFILE_FICLONE`).

* `fs.constants.COPYFILE_EXCL`: The copy operation will fail if `dest` already
  exists.
* `fs.constants.COPYFILE_FICLONE`: The copy operation will attempt to create a
  copy-on-write reflink. If the platform does not support copy-on-write, then a
  fallback copy mechanism is used.
* `fs.constants.COPYFILE_FICLONE_FORCE`: The copy operation will attempt to
  create a copy-on-write reflink. If the platform does not support
  copy-on-write, then the operation will fail.

```mjs
import { copyFile, constants } from 'node:fs';

function callback(err) {
  if (err) throw err;
  console.log('source.txt was copied to destination.txt');
}

// destination.txt will be created or overwritten by default.
copyFile('source.txt', 'destination.txt', callback);

// By using COPYFILE_EXCL, the operation will fail if destination.txt exists.
copyFile('source.txt', 'destination.txt', constants.COPYFILE_EXCL, callback);
```

#### <DataTag tag="M" /> `fs.cp(src, dest[, options], callback)`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v16.15.0","pr-url":"https://github.com/nodejs/node/pull/41819","description":"Accepts an additional `verbatimSymlinks` option to specify whether to perform path resolution for symlinks."}],"update":{"type":"added","version":["v16.7.0"]}}} />

<Metadata version="v16.18.1" data={{"stability":{"level":1,"text":" - Experimental"}}} />

* `src` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`URL`](/api/url#the-whatwg-url-api) source path to copy.
* `dest` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`URL`](/api/url#the-whatwg-url-api) destination path to copy to.
* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `dereference` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) dereference symlinks. **Default:** `false`.
  * `errorOnExist` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) when `force` is `false`, and the destination
    exists, throw an error. **Default:** `false`.
  * `filter` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) Function to filter copied files/directories. Return
    `true` to copy the item, `false` to ignore it. Can also return a `Promise`
    that resolves to `true` or `false` **Default:** `undefined`.
  * `force` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) overwrite existing file or directory. The copy
    operation will ignore errors if you set this to false and the destination
    exists. Use the `errorOnExist` option to change this behavior.
    **Default:** `true`.
  * `preserveTimestamps` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) When `true` timestamps from `src` will
    be preserved. **Default:** `false`.
  * `recursive` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) copy directories recursively **Default:** `false`
  * `verbatimSymlinks` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) When `true`, path resolution for symlinks will
    be skipped. **Default:** `false`
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)

Asynchronously copies the entire directory structure from `src` to `dest`,
including subdirectories and files.

When copying a directory to another directory, globs are not supported and
behavior is similar to `cp dir1/ dir2/`.

#### <DataTag tag="M" /> `fs.createReadStream(path[, options])`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v16.10.0","pr-url":"https://github.com/nodejs/node/pull/40013","description":"The `fs` option does not need `open` method if an `fd` was provided."},{"version":"v16.10.0","pr-url":"https://github.com/nodejs/node/pull/40013","description":"The `fs` option does not need `close` method if `autoClose` is `false`."},{"version":["v15.4.0"],"pr-url":"https://github.com/nodejs/node/pull/35922","description":"The `fd` option accepts FileHandle arguments."},{"version":"v14.0.0","pr-url":"https://github.com/nodejs/node/pull/31408","description":"Change `emitClose` default to `true`."},{"version":["v13.6.0","v12.17.0"],"pr-url":"https://github.com/nodejs/node/pull/29083","description":"The `fs` options allow overriding the used `fs` implementation."},{"version":"v12.10.0","pr-url":"https://github.com/nodejs/node/pull/29212","description":"Enable `emitClose` option."},{"version":"v11.0.0","pr-url":"https://github.com/nodejs/node/pull/19898","description":"Impose new restrictions on `start` and `end`, throwing more appropriate errors in cases when we cannot reasonably handle the input values."},{"version":"v7.6.0","pr-url":"https://github.com/nodejs/node/pull/10739","description":"The `path` parameter can be a WHATWG `URL` object using `file:` protocol."},{"version":"v7.0.0","pr-url":"https://github.com/nodejs/node/pull/7831","description":"The passed `options` object will never be modified."},{"version":"v2.3.0","pr-url":"https://github.com/nodejs/node/pull/1845","description":"The passed `options` object can be a string now."}],"update":{"type":"added","version":["v0.1.31"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `options` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `flags` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) See [support of file system `flags`][]. **Default:**
    `'r'`.
  * `encoding` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) **Default:** `null`
  * `fd` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [`FileHandle`](/api/fs#filehandle) **Default:** `null`
  * `mode` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `0o666`
  * `autoClose` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) **Default:** `true`
  * `emitClose` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) **Default:** `true`
  * `start` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
  * `end` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `Infinity`
  * `highWaterMark` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `64 * 1024`
  * `fs` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) | [`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type) **Default:** `null`
* Returns: [`fs.ReadStream`](/api/fs#fsreadstream)

Unlike the 16 KiB default `highWaterMark` for a [`stream.Readable`](/api/stream#streamreadable), the stream
returned by this method has a default `highWaterMark` of 64 KiB.

`options` can include `start` and `end` values to read a range of bytes from
the file instead of the entire file. Both `start` and `end` are inclusive and
start counting at 0, allowed values are in the
\[0, [`Number.MAX_SAFE_INTEGER`][]] range. If `fd` is specified and `start` is
omitted or `undefined`, `fs.createReadStream()` reads sequentially from the
current file position. The `encoding` can be any one of those accepted by
[`Buffer`](/api/buffer#buffer).

If `fd` is specified, `ReadStream` will ignore the `path` argument and will use
the specified file descriptor. This means that no `'open'` event will be
emitted. `fd` should be blocking; non-blocking `fd`s should be passed to
[`net.Socket`](/api/net#netsocket).

If `fd` points to a character device that only supports blocking reads
(such as keyboard or sound card), read operations do not finish until data is
available. This can prevent the process from exiting and the stream from
closing naturally.

By default, the stream will emit a `'close'` event after it has been
destroyed.  Set the `emitClose` option to `false` to change this behavior.

By providing the `fs` option, it is possible to override the corresponding `fs`
implementations for `open`, `read`, and `close`. When providing the `fs` option,
an override for `read` is required. If no `fd` is provided, an override for
`open` is also required. If `autoClose` is `true`, an override for `close` is
also required.

```mjs
import { createReadStream } from 'node:fs';

// Create a stream from some character device.
const stream = createReadStream('/dev/input/event0');
setTimeout(() => {
  stream.close(); // This may not close the stream.
  // Artificially marking end-of-stream, as if the underlying resource had
  // indicated end-of-file by itself, allows the stream to close.
  // This does not cancel pending read operations, and if there is such an
  // operation, the process may still not be able to exit successfully
  // until it finishes.
  stream.push(null);
  stream.read(0);
}, 100);
```

If `autoClose` is false, then the file descriptor won't be closed, even if
there's an error. It is the application's responsibility to close it and make
sure there's no file descriptor leak. If `autoClose` is set to true (default
behavior), on `'error'` or `'end'` the file descriptor will be closed
automatically.

`mode` sets the file mode (permission and sticky bits), but only if the
file was created.

An example to read the last 10 bytes of a file which is 100 bytes long:

```mjs
import { createReadStream } from 'node:fs';

createReadStream('sample.txt', { start: 90, end: 99 });
```

If `options` is a string, then it specifies the encoding.

#### <DataTag tag="M" /> `fs.createWriteStream(path[, options])`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v16.10.0","pr-url":"https://github.com/nodejs/node/pull/40013","description":"The `fs` option does not need `open` method if an `fd` was provided."},{"version":"v16.10.0","pr-url":"https://github.com/nodejs/node/pull/40013","description":"The `fs` option does not need `close` method if `autoClose` is `false`."},{"version":["v15.4.0"],"pr-url":"https://github.com/nodejs/node/pull/35922","description":"The `fd` option accepts FileHandle arguments."},{"version":"v14.0.0","pr-url":"https://github.com/nodejs/node/pull/31408","description":"Change `emitClose` default to `true`."},{"version":["v13.6.0","v12.17.0"],"pr-url":"https://github.com/nodejs/node/pull/29083","description":"The `fs` options allow overriding the used `fs` implementation."},{"version":"v12.10.0","pr-url":"https://github.com/nodejs/node/pull/29212","description":"Enable `emitClose` option."},{"version":"v7.6.0","pr-url":"https://github.com/nodejs/node/pull/10739","description":"The `path` parameter can be a WHATWG `URL` object using `file:` protocol."},{"version":"v7.0.0","pr-url":"https://github.com/nodejs/node/pull/7831","description":"The passed `options` object will never be modified."},{"version":"v5.5.0","pr-url":"https://github.com/nodejs/node/pull/3679","description":"The `autoClose` option is supported now."},{"version":"v2.3.0","pr-url":"https://github.com/nodejs/node/pull/1845","description":"The passed `options` object can be a string now."}],"update":{"type":"added","version":["v0.1.31"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `options` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `flags` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) See [support of file system `flags`][]. **Default:**
    `'w'`.
  * `encoding` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) **Default:** `'utf8'`
  * `fd` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [`FileHandle`](/api/fs#filehandle) **Default:** `null`
  * `mode` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `0o666`
  * `autoClose` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) **Default:** `true`
  * `emitClose` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) **Default:** `true`
  * `start` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
  * `fs` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) | [`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type) **Default:** `null`
* Returns: [`fs.WriteStream`](/api/fs#fswritestream)

`options` may also include a `start` option to allow writing data at some
position past the beginning of the file, allowed values are in the
\[0, [`Number.MAX_SAFE_INTEGER`][]] range. Modifying a file rather than
replacing it may require the `flags` option to be set to `r+` rather than the
default `w`. The `encoding` can be any one of those accepted by [`Buffer`](/api/buffer#buffer).

If `autoClose` is set to true (default behavior) on `'error'` or `'finish'`
the file descriptor will be closed automatically. If `autoClose` is false,
then the file descriptor won't be closed, even if there's an error.
It is the application's responsibility to close it and make sure there's no
file descriptor leak.

By default, the stream will emit a `'close'` event after it has been
destroyed.  Set the `emitClose` option to `false` to change this behavior.

By providing the `fs` option it is possible to override the corresponding `fs`
implementations for `open`, `write`, `writev`, and `close`. Overriding `write()`
without `writev()` can reduce performance as some optimizations (`_writev()`)
will be disabled. When providing the `fs` option, overrides for at least one of
`write` and `writev` are required. If no `fd` option is supplied, an override
for `open` is also required. If `autoClose` is `true`, an override for `close`
is also required.

Like [`fs.ReadStream`](/api/fs#fsreadstream), if `fd` is specified, [`fs.WriteStream`](/api/fs#fswritestream) will ignore the
`path` argument and will use the specified file descriptor. This means that no
`'open'` event will be emitted. `fd` should be blocking; non-blocking `fd`s
should be passed to [`net.Socket`](/api/net#netsocket).

If `options` is a string, then it specifies the encoding.

#### <DataTag tag="M" /> `fs.exists(path, callback)`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v7.6.0","pr-url":"https://github.com/nodejs/node/pull/10739","description":"The `path` parameter can be a WHATWG `URL` object using `file:` protocol."}],"update":{"type":"deprecated","version":["v1.0.0"]}}} />

<Metadata version="v16.18.1" data={{"stability":{"level":0,"text":" - Deprecated: Use `fs.stat()`][] or [`fs.access()` instead."}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `exists` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Test whether or not the given path exists by checking with the file system.
Then call the `callback` argument with either true or false:

```mjs
import { exists } from 'node:fs';

exists('/etc/passwd', (e) => {
  console.log(e ? 'it exists' : 'no passwd!');
});
```

**The parameters for this callback are not consistent with other Node.js
callbacks.** Normally, the first parameter to a Node.js callback is an `err`
parameter, optionally followed by other parameters. The `fs.exists()` callback
has only one boolean parameter. This is one reason `fs.access()` is recommended
instead of `fs.exists()`.

Using `fs.exists()` to check for the existence of a file before calling
`fs.open()`, `fs.readFile()`, or `fs.writeFile()` is not recommended. Doing
so introduces a race condition, since other processes may change the file's
state between the two calls. Instead, user code should open/read/write the
file directly and handle the error raised if the file does not exist.

**write (NOT RECOMMENDED)**

```mjs
import { exists, open, close } from 'node:fs';

exists('myfile', (e) => {
  if (e) {
    console.error('myfile already exists');
  } else {
    open('myfile', 'wx', (err, fd) => {
      if (err) throw err;

      try {
        writeMyData(fd);
      } finally {
        close(fd, (err) => {
          if (err) throw err;
        });
      }
    });
  }
});
```

**write (RECOMMENDED)**

```mjs
import { open, close } from 'node:fs';
open('myfile', 'wx', (err, fd) => {
  if (err) {
    if (err.code === 'EEXIST') {
      console.error('myfile already exists');
      return;
    }

    throw err;
  }

  try {
    writeMyData(fd);
  } finally {
    close(fd, (err) => {
      if (err) throw err;
    });
  }
});
```

**read (NOT RECOMMENDED)**

```mjs
import { open, close, exists } from 'node:fs';

exists('myfile', (e) => {
  if (e) {
    open('myfile', 'r', (err, fd) => {
      if (err) throw err;

      try {
        readMyData(fd);
      } finally {
        close(fd, (err) => {
          if (err) throw err;
        });
      }
    });
  } else {
    console.error('myfile does not exist');
  }
});
```

**read (RECOMMENDED)**

```mjs
import { open, close } from 'node:fs';

open('myfile', 'r', (err, fd) => {
  if (err) {
    if (err.code === 'ENOENT') {
      console.error('myfile does not exist');
      return;
    }

    throw err;
  }

  try {
    readMyData(fd);
  } finally {
    close(fd, (err) => {
      if (err) throw err;
    });
  }
});
```

The "not recommended" examples above check for existence and then use the
file; the "recommended" examples are better because they use the file directly
and handle the error, if any.

In general, check for the existence of a file only if the file won't be
used directly, for example when its existence is a signal from another
process.

#### <DataTag tag="M" /> `fs.fchmod(fd, mode, callback)`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/12562","description":"The `callback` parameter is no longer optional. Not passing it will throw a `TypeError` at runtime."},{"version":"v7.0.0","pr-url":"https://github.com/nodejs/node/pull/7897","description":"The `callback` parameter is no longer optional. Not passing it will emit a deprecation warning with id DEP0013."}],"update":{"type":"added","version":["v0.4.7"]}}} />

* `fd` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
* `mode` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `err` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

Sets the permissions on the file. No arguments other than a possible exception
are given to the completion callback.

See the POSIX fchmod(2) documentation for more detail.

#### <DataTag tag="M" /> `fs.fchown(fd, uid, gid, callback)`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/12562","description":"The `callback` parameter is no longer optional. Not passing it will throw a `TypeError` at runtime."},{"version":"v7.0.0","pr-url":"https://github.com/nodejs/node/pull/7897","description":"The `callback` parameter is no longer optional. Not passing it will emit a deprecation warning with id DEP0013."}],"update":{"type":"added","version":["v0.4.7"]}}} />

* `fd` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
* `uid` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
* `gid` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `err` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

Sets the owner of the file. No arguments other than a possible exception are
given to the completion callback.

See the POSIX fchown(2) documentation for more detail.

#### <DataTag tag="M" /> `fs.fdatasync(fd, callback)`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/12562","description":"The `callback` parameter is no longer optional. Not passing it will throw a `TypeError` at runtime."},{"version":"v7.0.0","pr-url":"https://github.com/nodejs/node/pull/7897","description":"The `callback` parameter is no longer optional. Not passing it will emit a deprecation warning with id DEP0013."}],"update":{"type":"added","version":["v0.1.96"]}}} />

* `fd` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `err` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

Forces all currently queued I/O operations associated with the file to the
operating system's synchronized I/O completion state. Refer to the POSIX
fdatasync(2) documentation for details. No arguments other than a possible
exception are given to the completion callback.

#### <DataTag tag="M" /> `fs.fstat(fd[, options], callback)`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v10.5.0","pr-url":"https://github.com/nodejs/node/pull/20220","description":"Accepts an additional `options` object to specify whether the numeric values returned should be bigint."},{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/12562","description":"The `callback` parameter is no longer optional. Not passing it will throw a `TypeError` at runtime."},{"version":"v7.0.0","pr-url":"https://github.com/nodejs/node/pull/7897","description":"The `callback` parameter is no longer optional. Not passing it will emit a deprecation warning with id DEP0013."}],"update":{"type":"added","version":["v0.1.95"]}}} />

* `fd` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `bigint` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) Whether the numeric values in the returned
    [`fs.Stats`](/api/fs#fsstats) object should be `bigint`. **Default:** `false`.
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `err` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
  * `stats` [`fs.Stats`](/api/fs#fsstats)

Invokes the callback with the [`fs.Stats`](/api/fs#fsstats) for the file descriptor.

See the POSIX fstat(2) documentation for more detail.

#### <DataTag tag="M" /> `fs.fsync(fd, callback)`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/12562","description":"The `callback` parameter is no longer optional. Not passing it will throw a `TypeError` at runtime."},{"version":"v7.0.0","pr-url":"https://github.com/nodejs/node/pull/7897","description":"The `callback` parameter is no longer optional. Not passing it will emit a deprecation warning with id DEP0013."}],"update":{"type":"added","version":["v0.1.96"]}}} />

* `fd` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `err` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

Request that all data for the open file descriptor is flushed to the storage
device. The specific implementation is operating system and device specific.
Refer to the POSIX fsync(2) documentation for more detail. No arguments other
than a possible exception are given to the completion callback.

#### <DataTag tag="M" /> `fs.ftruncate(fd[, len], callback)`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/12562","description":"The `callback` parameter is no longer optional. Not passing it will throw a `TypeError` at runtime."},{"version":"v7.0.0","pr-url":"https://github.com/nodejs/node/pull/7897","description":"The `callback` parameter is no longer optional. Not passing it will emit a deprecation warning with id DEP0013."}],"update":{"type":"added","version":["v0.8.6"]}}} />

* `fd` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
* `len` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `0`
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `err` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

Truncates the file descriptor. No arguments other than a possible exception are
given to the completion callback.

See the POSIX ftruncate(2) documentation for more detail.

If the file referred to by the file descriptor was larger than `len` bytes, only
the first `len` bytes will be retained in the file.

For example, the following program retains only the first four bytes of the
file:

```mjs
import { open, close, ftruncate } from 'node:fs';

function closeFd(fd) {
  close(fd, (err) => {
    if (err) throw err;
  });
}

open('temp.txt', 'r+', (err, fd) => {
  if (err) throw err;

  try {
    ftruncate(fd, 4, (err) => {
      closeFd(fd);
      if (err) throw err;
    });
  } catch (err) {
    closeFd(fd);
    if (err) throw err;
  }
});
```

If the file previously was shorter than `len` bytes, it is extended, and the
extended part is filled with null bytes (`'\0'`):

If `len` is negative then `0` will be used.

#### <DataTag tag="M" /> `fs.futimes(fd, atime, mtime, callback)`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/12562","description":"The `callback` parameter is no longer optional. Not passing it will throw a `TypeError` at runtime."},{"version":"v7.0.0","pr-url":"https://github.com/nodejs/node/pull/7897","description":"The `callback` parameter is no longer optional. Not passing it will emit a deprecation warning with id DEP0013."},{"version":"v4.1.0","pr-url":"https://github.com/nodejs/node/pull/2387","description":"Numeric strings, `NaN`, and `Infinity` are now allowed time specifiers."}],"update":{"type":"added","version":["v0.4.2"]}}} />

* `fd` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
* `atime` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
* `mtime` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `err` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

Change the file system timestamps of the object referenced by the supplied file
descriptor. See [`fs.utimes()`][].

#### <DataTag tag="M" /> `fs.lchmod(path, mode, callback)`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v16.0.0","pr-url":"https://github.com/nodejs/node/pull/37460","description":"The error returned may be an `AggregateError` if more than one error is returned."},{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/12562","description":"The `callback` parameter is no longer optional. Not passing it will throw a `TypeError` at runtime."},{"version":"v7.0.0","pr-url":"https://github.com/nodejs/node/pull/7897","description":"The `callback` parameter is no longer optional. Not passing it will emit a deprecation warning with id DEP0013."}],"update":{"type":"deprecated","version":["v0.4.7"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `mode` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `err` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) | [`AggregateError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AggregateError)

Changes the permissions on a symbolic link. No arguments other than a possible
exception are given to the completion callback.

This method is only implemented on macOS.

See the POSIX lchmod(2) documentation for more detail.

#### <DataTag tag="M" /> `fs.lchown(path, uid, gid, callback)`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v10.6.0","pr-url":"https://github.com/nodejs/node/pull/21498","description":"This API is no longer deprecated."},{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/12562","description":"The `callback` parameter is no longer optional. Not passing it will throw a `TypeError` at runtime."},{"version":"v7.0.0","pr-url":"https://github.com/nodejs/node/pull/7897","description":"The `callback` parameter is no longer optional. Not passing it will emit a deprecation warning with id DEP0013."},{"version":"v0.4.7","description":"Documentation-only deprecation."}]}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `uid` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
* `gid` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `err` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

Set the owner of the symbolic link. No arguments other than a possible
exception are given to the completion callback.

See the POSIX lchown(2) documentation for more detail.

#### <DataTag tag="M" /> `fs.lutimes(path, atime, mtime, callback)`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v14.5.0","v12.19.0"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `atime` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
* `mtime` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `err` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

Changes the access and modification times of a file in the same way as
[`fs.utimes()`][], with the difference that if the path refers to a symbolic
link, then the link is not dereferenced: instead, the timestamps of the
symbolic link itself are changed.

No arguments other than a possible exception are given to the completion
callback.

#### <DataTag tag="M" /> `fs.link(existingPath, newPath, callback)`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/12562","description":"The `callback` parameter is no longer optional. Not passing it will throw a `TypeError` at runtime."},{"version":"v7.6.0","pr-url":"https://github.com/nodejs/node/pull/10739","description":"The `existingPath` and `newPath` parameters can be WHATWG `URL` objects using `file:` protocol. Support is currently still *experimental*."},{"version":"v7.0.0","pr-url":"https://github.com/nodejs/node/pull/7897","description":"The `callback` parameter is no longer optional. Not passing it will emit a deprecation warning with id DEP0013."}],"update":{"type":"added","version":["v0.1.31"]}}} />

* `existingPath` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `newPath` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `err` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

Creates a new link from the `existingPath` to the `newPath`. See the POSIX
link(2) documentation for more detail. No arguments other than a possible
exception are given to the completion callback.

#### <DataTag tag="M" /> `fs.lstat(path[, options], callback)`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v10.5.0","pr-url":"https://github.com/nodejs/node/pull/20220","description":"Accepts an additional `options` object to specify whether the numeric values returned should be bigint."},{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/12562","description":"The `callback` parameter is no longer optional. Not passing it will throw a `TypeError` at runtime."},{"version":"v7.6.0","pr-url":"https://github.com/nodejs/node/pull/10739","description":"The `path` parameter can be a WHATWG `URL` object using `file:` protocol."},{"version":"v7.0.0","pr-url":"https://github.com/nodejs/node/pull/7897","description":"The `callback` parameter is no longer optional. Not passing it will emit a deprecation warning with id DEP0013."}],"update":{"type":"added","version":["v0.1.30"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `bigint` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) Whether the numeric values in the returned
    [`fs.Stats`](/api/fs#fsstats) object should be `bigint`. **Default:** `false`.
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `err` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
  * `stats` [`fs.Stats`](/api/fs#fsstats)

Retrieves the [`fs.Stats`](/api/fs#fsstats) for the symbolic link referred to by the path.
The callback gets two arguments `(err, stats)` where `stats` is a [`fs.Stats`](/api/fs#fsstats)
object. `lstat()` is identical to `stat()`, except that if `path` is a symbolic
link, then the link itself is stat-ed, not the file that it refers to.

See the POSIX lstat(2) documentation for more details.

#### <DataTag tag="M" /> `fs.mkdir(path[, options], callback)`

<Metadata version="v16.18.1" data={{"changes":[{"version":["v13.11.0","v12.17.0"],"pr-url":"https://github.com/nodejs/node/pull/31530","description":"In `recursive` mode, the callback now receives the first created path as an argument."},{"version":"v10.12.0","pr-url":"https://github.com/nodejs/node/pull/21875","description":"The second argument can now be an `options` object with `recursive` and `mode` properties."},{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/12562","description":"The `callback` parameter is no longer optional. Not passing it will throw a `TypeError` at runtime."},{"version":"v7.6.0","pr-url":"https://github.com/nodejs/node/pull/10739","description":"The `path` parameter can be a WHATWG `URL` object using `file:` protocol."},{"version":"v7.0.0","pr-url":"https://github.com/nodejs/node/pull/7897","description":"The `callback` parameter is no longer optional. Not passing it will emit a deprecation warning with id DEP0013."}],"update":{"type":"added","version":["v0.1.8"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) | [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
  * `recursive` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) **Default:** `false`
  * `mode` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) Not supported on Windows. **Default:** `0o777`.
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `err` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
  * `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Undefined_type) Present only if a directory is created with
    `recursive` set to `true`.

Asynchronously creates a directory.

The callback is given a possible exception and, if `recursive` is `true`, the
first directory path created, `(err[, path])`.
`path` can still be `undefined` when `recursive` is `true`, if no directory was
created.

The optional `options` argument can be an integer specifying `mode` (permission
and sticky bits), or an object with a `mode` property and a `recursive`
property indicating whether parent directories should be created. Calling
`fs.mkdir()` when `path` is a directory that exists results in an error only
when `recursive` is false.

```mjs
import { mkdir } from 'node:fs';

// Creates /tmp/a/apple, regardless of whether `/tmp` and /tmp/a exist.
mkdir('/tmp/a/apple', { recursive: true }, (err) => {
  if (err) throw err;
});
```

On Windows, using `fs.mkdir()` on the root directory even with recursion will
result in an error:

```mjs
import { mkdir } from 'node:fs';

mkdir('/', { recursive: true }, (err) => {
  // => [Error: EPERM: operation not permitted, mkdir 'C:\']
});
```

See the POSIX mkdir(2) documentation for more details.

#### <DataTag tag="M" /> `fs.mkdtemp(prefix[, options], callback)`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v16.5.0","pr-url":"https://github.com/nodejs/node/pull/39028","description":"The `prefix` parameter now accepts an empty string."},{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/12562","description":"The `callback` parameter is no longer optional. Not passing it will throw a `TypeError` at runtime."},{"version":"v7.0.0","pr-url":"https://github.com/nodejs/node/pull/7897","description":"The `callback` parameter is no longer optional. Not passing it will emit a deprecation warning with id DEP0013."},{"version":"v6.2.1","pr-url":"https://github.com/nodejs/node/pull/6828","description":"The `callback` parameter is optional now."}],"update":{"type":"added","version":["v5.10.0"]}}} />

* `prefix` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
* `options` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `encoding` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) **Default:** `'utf8'`
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `err` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
  * `directory` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

Creates a unique temporary directory.

Generates six random characters to be appended behind a required
`prefix` to create a unique temporary directory. Due to platform
inconsistencies, avoid trailing `X` characters in `prefix`. Some platforms,
notably the BSDs, can return more than six random characters, and replace
trailing `X` characters in `prefix` with random characters.

The created directory path is passed as a string to the callback's second
parameter.

The optional `options` argument can be a string specifying an encoding, or an
object with an `encoding` property specifying the character encoding to use.

```mjs
import { mkdtemp } from 'node:fs';

mkdtemp(path.join(os.tmpdir(), 'foo-'), (err, directory) => {
  if (err) throw err;
  console.log(directory);
  // Prints: /tmp/foo-itXde2 or C:\Users\...\AppData\Local\Temp\foo-itXde2
});
```

The `fs.mkdtemp()` method will append the six randomly selected characters
directly to the `prefix` string. For instance, given a directory `/tmp`, if the
intention is to create a temporary directory _within_ `/tmp`, the `prefix`
must end with a trailing platform-specific path separator
(`require('node:path').sep`).

```mjs
import { tmpdir } from 'node:os';
import { mkdtemp } from 'node:fs';

// The parent directory for the new temporary directory
const tmpDir = tmpdir();

// This method is *INCORRECT*:
mkdtemp(tmpDir, (err, directory) => {
  if (err) throw err;
  console.log(directory);
  // Will print something similar to `/tmpabc123`.
  // A new temporary directory is created at the file system root
  // rather than *within* the /tmp directory.
});

// This method is *CORRECT*:
import { sep } from 'node:path';
mkdtemp(`${tmpDir}${sep}`, (err, directory) => {
  if (err) throw err;
  console.log(directory);
  // Will print something similar to `/tmp/abc123`.
  // A new temporary directory is created within
  // the /tmp directory.
});
```

#### <DataTag tag="M" /> `fs.open(path[, flags[, mode]], callback)`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v11.1.0","pr-url":"https://github.com/nodejs/node/pull/23767","description":"The `flags` argument is now optional and defaults to `'r'`."},{"version":"v9.9.0","pr-url":"https://github.com/nodejs/node/pull/18801","description":"The `as` and `as+` flags are supported now."},{"version":"v7.6.0","pr-url":"https://github.com/nodejs/node/pull/10739","description":"The `path` parameter can be a WHATWG `URL` object using `file:` protocol."}],"update":{"type":"added","version":["v0.0.2"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `flags` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) See [support of file system `flags`][].
  **Default:** `'r'`.
* `mode` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `0o666` (readable and writable)
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `err` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
  * `fd` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

Asynchronous file open. See the POSIX open(2) documentation for more details.

`mode` sets the file mode (permission and sticky bits), but only if the file was
created. On Windows, only the write permission can be manipulated; see
[`fs.chmod()`][].

The callback gets two arguments `(err, fd)`.

Some characters (`< > : " / \ | ? *`) are reserved under Windows as documented
by [Naming Files, Paths, and Namespaces][]. Under NTFS, if the filename contains
a colon, Node.js will open a file system stream, as described by
[this MSDN page][MSDN-Using-Streams].

Functions based on `fs.open()` exhibit this behavior as well:
`fs.writeFile()`, `fs.readFile()`, etc.

#### <DataTag tag="M" /> `fs.opendir(path[, options], callback)`

<Metadata version="v16.18.1" data={{"changes":[{"version":["v13.1.0","v12.16.0"],"pr-url":"https://github.com/nodejs/node/pull/30114","description":"The `bufferSize` option was introduced."}],"update":{"type":"added","version":["v12.12.0"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `encoding` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type) **Default:** `'utf8'`
  * `bufferSize` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) Number of directory entries that are buffered
    internally when reading from the directory. Higher values lead to better
    performance but higher memory usage. **Default:** `32`
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `err` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
  * `dir` [`fs.Dir`](/api/fs#fsdir)

Asynchronously open a directory. See the POSIX opendir(3) documentation for
more details.

Creates an [`fs.Dir`](/api/fs#fsdir), which contains all further functions for reading from
and cleaning up the directory.

The `encoding` option sets the encoding for the `path` while opening the
directory and subsequent read operations.

#### <DataTag tag="M" /> `fs.read(fd, buffer, offset, length, position, callback)`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v10.10.0","pr-url":"https://github.com/nodejs/node/pull/22150","description":"The `buffer` parameter can now be any `TypedArray`, or a `DataView`."},{"version":"v7.4.0","pr-url":"https://github.com/nodejs/node/pull/10382","description":"The `buffer` parameter can now be a `Uint8Array`."},{"version":"v6.0.0","pr-url":"https://github.com/nodejs/node/pull/4518","description":"The `length` parameter can now be `0`."}],"update":{"type":"added","version":["v0.0.2"]}}} />

* `fd` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
* `buffer` [`Buffer`](/api/buffer#buffer) | [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`DataView`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView) The buffer that the data will be
  written to.
* `offset` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The position in `buffer` to write the data to.
* `length` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The number of bytes to read.
* `position` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [`bigint`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) | [`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type) Specifies where to begin reading from in the
  file. If `position` is `null` or `-1 `, data will be read from the current
  file position, and the file position will be updated. If `position` is an
  integer, the file position will be unchanged.
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `err` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
  * `bytesRead` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
  * `buffer` [`Buffer`](/api/buffer#buffer)

Read data from the file specified by `fd`.

The callback is given the three arguments, `(err, bytesRead, buffer)`.

If the file is not modified concurrently, the end-of-file is reached when the
number of bytes read is zero.

If this method is invoked as its [`util.promisify()`][]ed version, it returns
a promise for an `Object` with `bytesRead` and `buffer` properties.

#### <DataTag tag="M" /> `fs.read(fd[, options], callback)`

<Metadata version="v16.18.1" data={{"changes":[{"version":["v13.11.0","v12.17.0"],"pr-url":"https://github.com/nodejs/node/pull/31402","description":"Options object can be passed in to make buffer, offset, length, and position optional."}],"update":{"type":"added","version":["v13.11.0","v12.17.0"]}}} />

* `fd` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `buffer` [`Buffer`](/api/buffer#buffer) | [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`DataView`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView) **Default:** `Buffer.alloc(16384)`
  * `offset` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `0`
  * `length` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `buffer.byteLength - offset`
  * `position` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [`bigint`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) | [`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type) **Default:** `null`
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `err` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
  * `bytesRead` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
  * `buffer` [`Buffer`](/api/buffer#buffer)

Similar to the [`fs.read()`][] function, this version takes an optional
`options` object. If no `options` object is specified, it will default with the
above values.

#### <DataTag tag="M" /> `fs.read(fd, buffer[, options], callback)`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v16.17.0"]}}} />

* `fd` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
* `buffer` [`Buffer`](/api/buffer#buffer) | [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`DataView`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView) The buffer that the data will be
  written to.
* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `offset` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `0`
  * `length` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `buffer.byteLength - offset`
  * `position` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [`bigint`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) **Default:** `null`
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `err` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
  * `bytesRead` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
  * `buffer` [`Buffer`](/api/buffer#buffer)

Similar to the [`fs.read()`][] function, this version takes an optional
`options` object. If no `options` object is specified, it will default with the
above values.

#### <DataTag tag="M" /> `fs.readdir(path[, options], callback)`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v10.10.0","pr-url":"https://github.com/nodejs/node/pull/22020","description":"New option `withFileTypes` was added."},{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/12562","description":"The `callback` parameter is no longer optional. Not passing it will throw a `TypeError` at runtime."},{"version":"v7.6.0","pr-url":"https://github.com/nodejs/node/pull/10739","description":"The `path` parameter can be a WHATWG `URL` object using `file:` protocol."},{"version":"v7.0.0","pr-url":"https://github.com/nodejs/node/pull/7897","description":"The `callback` parameter is no longer optional. Not passing it will emit a deprecation warning with id DEP0013."},{"version":"v6.0.0","pr-url":"https://github.com/nodejs/node/pull/5616","description":"The `options` parameter was added."}],"update":{"type":"added","version":["v0.1.8"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `options` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `encoding` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) **Default:** `'utf8'`
  * `withFileTypes` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) **Default:** `false`
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `err` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
  * `files` string\[]|Buffer\[]|fs.Dirent\[]

Reads the contents of a directory. The callback gets two arguments `(err, files)`
where `files` is an array of the names of the files in the directory excluding
`'.'` and `'..'`.

See the POSIX readdir(3) documentation for more details.

The optional `options` argument can be a string specifying an encoding, or an
object with an `encoding` property specifying the character encoding to use for
the filenames passed to the callback. If the `encoding` is set to `'buffer'`,
the filenames returned will be passed as [`Buffer`](/api/buffer#buffer) objects.

If `options.withFileTypes` is set to `true`, the `files` array will contain
[`fs.Dirent`](/api/fs#fsdirent) objects.

#### <DataTag tag="M" /> `fs.readFile(path[, options], callback)`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v16.0.0","pr-url":"https://github.com/nodejs/node/pull/37460","description":"The error returned may be an `AggregateError` if more than one error is returned."},{"version":"v15.2.0","pr-url":"https://github.com/nodejs/node/pull/35911","description":"The options argument may include an AbortSignal to abort an ongoing readFile request."},{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/12562","description":"The `callback` parameter is no longer optional. Not passing it will throw a `TypeError` at runtime."},{"version":"v7.6.0","pr-url":"https://github.com/nodejs/node/pull/10739","description":"The `path` parameter can be a WHATWG `URL` object using `file:` protocol."},{"version":"v7.0.0","pr-url":"https://github.com/nodejs/node/pull/7897","description":"The `callback` parameter is no longer optional. Not passing it will emit a deprecation warning with id DEP0013."},{"version":"v5.1.0","pr-url":"https://github.com/nodejs/node/pull/3740","description":"The `callback` will always be called with `null` as the `error` parameter in case of success."},{"version":"v5.0.0","pr-url":"https://github.com/nodejs/node/pull/3163","description":"The `path` parameter can be a file descriptor now."}],"update":{"type":"added","version":["v0.1.29"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api) | [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) filename or file descriptor
* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
  * `encoding` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type) **Default:** `null`
  * `flag` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) See [support of file system `flags`][]. **Default:** `'r'`.
  * `signal` [`AbortSignal`](/api/globals#abortsignal) allows aborting an in-progress readFile
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `err` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) | [`AggregateError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AggregateError)
  * `data` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer)

Asynchronously reads the entire contents of a file.

```mjs
import { readFile } from 'node:fs';

readFile('/etc/passwd', (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

The callback is passed two arguments `(err, data)`, where `data` is the
contents of the file.

If no encoding is specified, then the raw buffer is returned.

If `options` is a string, then it specifies the encoding:

```mjs
import { readFile } from 'node:fs';

readFile('/etc/passwd', 'utf8', callback);
```

When the path is a directory, the behavior of `fs.readFile()` and
[`fs.readFileSync()`][] is platform-specific. On macOS, Linux, and Windows, an
error will be returned. On FreeBSD, a representation of the directory's contents
will be returned.

```mjs
import { readFile } from 'node:fs';

// macOS, Linux, and Windows
readFile('<directory>', (err, data) => {
  // => [Error: EISDIR: illegal operation on a directory, read <directory>]
});

//  FreeBSD
readFile('<directory>', (err, data) => {
  // => null, <data>
});
```

It is possible to abort an ongoing request using an `AbortSignal`. If a
request is aborted the callback is called with an `AbortError`:

```mjs
import { readFile } from 'node:fs';

const controller = new AbortController();
const signal = controller.signal;
readFile(fileInfo[0].name, { signal }, (err, buf) => {
  // ...
});
// When you want to abort the request
controller.abort();
```

The `fs.readFile()` function buffers the entire file. To minimize memory costs,
when possible prefer streaming via `fs.createReadStream()`.

Aborting an ongoing request does not abort individual operating
system requests but rather the internal buffering `fs.readFile` performs.

##### File descriptors

1. Any specified file descriptor has to support reading.
2. If a file descriptor is specified as the `path`, it will not be closed
   automatically.
3. The reading will begin at the current position. For example, if the file
   already had `'Hello World`' and six bytes are read with the file descriptor,
   the call to `fs.readFile()` with the same file descriptor, would give
   `'World'`, rather than `'Hello World'`.

##### Performance Considerations

The `fs.readFile()` method asynchronously reads the contents of a file into
memory one chunk at a time, allowing the event loop to turn between each chunk.
This allows the read operation to have less impact on other activity that may
be using the underlying libuv thread pool but means that it will take longer
to read a complete file into memory.

The additional read overhead can vary broadly on different systems and depends
on the type of file being read. If the file type is not a regular file (a pipe
for instance) and Node.js is unable to determine an actual file size, each read
operation will load on 64 KiB of data. For regular files, each read will process
512 KiB of data.

For applications that require as-fast-as-possible reading of file contents, it
is better to use `fs.read()` directly and for application code to manage
reading the full contents of the file itself.

The Node.js GitHub issue [#25741][] provides more information and a detailed
analysis on the performance of `fs.readFile()` for multiple file sizes in
different Node.js versions.

#### <DataTag tag="M" /> `fs.readlink(path[, options], callback)`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/12562","description":"The `callback` parameter is no longer optional. Not passing it will throw a `TypeError` at runtime."},{"version":"v7.6.0","pr-url":"https://github.com/nodejs/node/pull/10739","description":"The `path` parameter can be a WHATWG `URL` object using `file:` protocol."},{"version":"v7.0.0","pr-url":"https://github.com/nodejs/node/pull/7897","description":"The `callback` parameter is no longer optional. Not passing it will emit a deprecation warning with id DEP0013."}],"update":{"type":"added","version":["v0.1.31"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `options` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `encoding` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) **Default:** `'utf8'`
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `err` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
  * `linkString` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer)

Reads the contents of the symbolic link referred to by `path`. The callback gets
two arguments `(err, linkString)`.

See the POSIX readlink(2) documentation for more details.

The optional `options` argument can be a string specifying an encoding, or an
object with an `encoding` property specifying the character encoding to use for
the link path passed to the callback. If the `encoding` is set to `'buffer'`,
the link path returned will be passed as a [`Buffer`](/api/buffer#buffer) object.

#### <DataTag tag="M" /> `fs.readv(fd, buffers[, position], callback)`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v13.13.0","v12.17.0"]}}} />

* `fd` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
* `buffers` ArrayBufferView\[]
* `position` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type) **Default:** `null`
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `err` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
  * `bytesRead` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
  * `buffers` ArrayBufferView\[]

Read from a file specified by `fd` and write to an array of `ArrayBufferView`s
using `readv()`.

`position` is the offset from the beginning of the file from where data
should be read. If `typeof position !== 'number'`, the data will be read
from the current position.

The callback will be given three arguments: `err`, `bytesRead`, and
`buffers`. `bytesRead` is how many bytes were read from the file.

If this method is invoked as its [`util.promisify()`][]ed version, it returns
a promise for an `Object` with `bytesRead` and `buffers` properties.

#### <DataTag tag="M" /> `fs.realpath(path[, options], callback)`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/12562","description":"The `callback` parameter is no longer optional. Not passing it will throw a `TypeError` at runtime."},{"version":"v8.0.0","pr-url":"https://github.com/nodejs/node/pull/13028","description":"Pipe/Socket resolve support was added."},{"version":"v7.6.0","pr-url":"https://github.com/nodejs/node/pull/10739","description":"The `path` parameter can be a WHATWG `URL` object using `file:` protocol."},{"version":"v7.0.0","pr-url":"https://github.com/nodejs/node/pull/7897","description":"The `callback` parameter is no longer optional. Not passing it will emit a deprecation warning with id DEP0013."},{"version":"v6.4.0","pr-url":"https://github.com/nodejs/node/pull/7899","description":"Calling `realpath` now works again for various edge cases on Windows."},{"version":"v6.0.0","pr-url":"https://github.com/nodejs/node/pull/3594","description":"The `cache` parameter was removed."}],"update":{"type":"added","version":["v0.1.31"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `options` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `encoding` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) **Default:** `'utf8'`
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `err` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
  * `resolvedPath` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer)

Asynchronously computes the canonical pathname by resolving `.`, `..`, and
symbolic links.

A canonical pathname is not necessarily unique. Hard links and bind mounts can
expose a file system entity through many pathnames.

This function behaves like realpath(3), with some exceptions:

1. No case conversion is performed on case-insensitive file systems.

2. The maximum number of symbolic links is platform-independent and generally
   (much) higher than what the native realpath(3) implementation supports.

The `callback` gets two arguments `(err, resolvedPath)`. May use `process.cwd`
to resolve relative paths.

Only paths that can be converted to UTF8 strings are supported.

The optional `options` argument can be a string specifying an encoding, or an
object with an `encoding` property specifying the character encoding to use for
the path passed to the callback. If the `encoding` is set to `'buffer'`,
the path returned will be passed as a [`Buffer`](/api/buffer#buffer) object.

If `path` resolves to a socket or a pipe, the function will return a system
dependent name for that object.

#### <DataTag tag="M" /> `fs.realpath.native(path[, options], callback)`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v9.2.0"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `options` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `encoding` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) **Default:** `'utf8'`
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `err` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
  * `resolvedPath` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer)

Asynchronous realpath(3).

The `callback` gets two arguments `(err, resolvedPath)`.

Only paths that can be converted to UTF8 strings are supported.

The optional `options` argument can be a string specifying an encoding, or an
object with an `encoding` property specifying the character encoding to use for
the path passed to the callback. If the `encoding` is set to `'buffer'`,
the path returned will be passed as a [`Buffer`](/api/buffer#buffer) object.

On Linux, when Node.js is linked against musl libc, the procfs file system must
be mounted on `/proc` in order for this function to work. Glibc does not have
this restriction.

#### <DataTag tag="M" /> `fs.rename(oldPath, newPath, callback)`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/12562","description":"The `callback` parameter is no longer optional. Not passing it will throw a `TypeError` at runtime."},{"version":"v7.6.0","pr-url":"https://github.com/nodejs/node/pull/10739","description":"The `oldPath` and `newPath` parameters can be WHATWG `URL` objects using `file:` protocol. Support is currently still *experimental*."},{"version":"v7.0.0","pr-url":"https://github.com/nodejs/node/pull/7897","description":"The `callback` parameter is no longer optional. Not passing it will emit a deprecation warning with id DEP0013."}],"update":{"type":"added","version":["v0.0.2"]}}} />

* `oldPath` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `newPath` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `err` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

Asynchronously rename file at `oldPath` to the pathname provided
as `newPath`. In the case that `newPath` already exists, it will
be overwritten. If there is a directory at `newPath`, an error will
be raised instead. No arguments other than a possible exception are
given to the completion callback.

See also: rename(2).

```mjs
import { rename } from 'node:fs';

rename('oldFile.txt', 'newFile.txt', (err) => {
  if (err) throw err;
  console.log('Rename complete!');
});
```

#### <DataTag tag="M" /> `fs.rmdir(path[, options], callback)`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v16.0.0","pr-url":"https://github.com/nodejs/node/pull/37216","description":"Using `fs.rmdir(path, { recursive: true })` on a `path` that is a file is no longer permitted and results in an `ENOENT` error on Windows and an `ENOTDIR` error on POSIX."},{"version":"v16.0.0","pr-url":"https://github.com/nodejs/node/pull/37216","description":"Using `fs.rmdir(path, { recursive: true })` on a `path` that does not exist is no longer permitted and results in a `ENOENT` error."},{"version":"v16.0.0","pr-url":"https://github.com/nodejs/node/pull/37302","description":"The `recursive` option is deprecated, using it triggers a deprecation warning."},{"version":"v14.14.0","pr-url":"https://github.com/nodejs/node/pull/35579","description":"The `recursive` option is deprecated, use `fs.rm` instead."},{"version":["v13.3.0","v12.16.0"],"pr-url":"https://github.com/nodejs/node/pull/30644","description":"The `maxBusyTries` option is renamed to `maxRetries`, and its default is 0. The `emfileWait` option has been removed, and `EMFILE` errors use the same retry logic as other errors. The `retryDelay` option is now supported. `ENFILE` errors are now retried."},{"version":"v12.10.0","pr-url":"https://github.com/nodejs/node/pull/29168","description":"The `recursive`, `maxBusyTries`, and `emfileWait` options are now supported."},{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/12562","description":"The `callback` parameter is no longer optional. Not passing it will throw a `TypeError` at runtime."},{"version":"v7.6.0","pr-url":"https://github.com/nodejs/node/pull/10739","description":"The `path` parameters can be a WHATWG `URL` object using `file:` protocol."},{"version":"v7.0.0","pr-url":"https://github.com/nodejs/node/pull/7897","description":"The `callback` parameter is no longer optional. Not passing it will emit a deprecation warning with id DEP0013."}],"update":{"type":"added","version":["v0.0.2"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `maxRetries` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) If an `EBUSY`, `EMFILE`, `ENFILE`, `ENOTEMPTY`, or
    `EPERM` error is encountered, Node.js retries the operation with a linear
    backoff wait of `retryDelay` milliseconds longer on each try. This option
    represents the number of retries. This option is ignored if the `recursive`
    option is not `true`. **Default:** `0`.
  * `recursive` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) If `true`, perform a recursive directory removal. In
    recursive mode, operations are retried on failure. **Default:** `false`.
    **Deprecated.**
  * `retryDelay` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The amount of time in milliseconds to wait between
    retries. This option is ignored if the `recursive` option is not `true`.
    **Default:** `100`.
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `err` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

Asynchronous rmdir(2). No arguments other than a possible exception are given
to the completion callback.

Using `fs.rmdir()` on a file (not a directory) results in an `ENOENT` error on
Windows and an `ENOTDIR` error on POSIX.

To get a behavior similar to the `rm -rf` Unix command, use [`fs.rm()`][]
with options `{ recursive: true, force: true }`.

#### <DataTag tag="M" /> `fs.rm(path[, options], callback)`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v16.14.0","pr-url":"https://github.com/nodejs/node/pull/41132","description":"The `path` parameter can be a WHATWG `URL` object using `file:` protocol."}],"update":{"type":"added","version":["v14.14.0"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `force` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) When `true`, exceptions will be ignored if `path` does
    not exist. **Default:** `false`.
  * `maxRetries` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) If an `EBUSY`, `EMFILE`, `ENFILE`, `ENOTEMPTY`, or
    `EPERM` error is encountered, Node.js will retry the operation with a linear
    backoff wait of `retryDelay` milliseconds longer on each try. This option
    represents the number of retries. This option is ignored if the `recursive`
    option is not `true`. **Default:** `0`.
  * `recursive` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) If `true`, perform a recursive removal. In
    recursive mode operations are retried on failure. **Default:** `false`.
  * `retryDelay` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The amount of time in milliseconds to wait between
    retries. This option is ignored if the `recursive` option is not `true`.
    **Default:** `100`.
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `err` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

Asynchronously removes files and directories (modeled on the standard POSIX `rm`
utility). No arguments other than a possible exception are given to the
completion callback.

#### <DataTag tag="M" /> `fs.stat(path[, options], callback)`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v10.5.0","pr-url":"https://github.com/nodejs/node/pull/20220","description":"Accepts an additional `options` object to specify whether the numeric values returned should be bigint."},{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/12562","description":"The `callback` parameter is no longer optional. Not passing it will throw a `TypeError` at runtime."},{"version":"v7.6.0","pr-url":"https://github.com/nodejs/node/pull/10739","description":"The `path` parameter can be a WHATWG `URL` object using `file:` protocol."},{"version":"v7.0.0","pr-url":"https://github.com/nodejs/node/pull/7897","description":"The `callback` parameter is no longer optional. Not passing it will emit a deprecation warning with id DEP0013."}],"update":{"type":"added","version":["v0.0.2"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `bigint` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) Whether the numeric values in the returned
    [`fs.Stats`](/api/fs#fsstats) object should be `bigint`. **Default:** `false`.
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `err` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
  * `stats` [`fs.Stats`](/api/fs#fsstats)

Asynchronous stat(2). The callback gets two arguments `(err, stats)` where
`stats` is an [`fs.Stats`](/api/fs#fsstats) object.

In case of an error, the `err.code` will be one of [Common System Errors][].

Using `fs.stat()` to check for the existence of a file before calling
`fs.open()`, `fs.readFile()`, or `fs.writeFile()` is not recommended.
Instead, user code should open/read/write the file directly and handle the
error raised if the file is not available.

To check if a file exists without manipulating it afterwards, [`fs.access()`][]
is recommended.

For example, given the following directory structure:

```text
- txtDir
-- file.txt
- app.js
```

The next program will check for the stats of the given paths:

```mjs
import { stat } from 'node:fs';

const pathsToCheck = ['./txtDir', './txtDir/file.txt'];

for (let i = 0; i < pathsToCheck.length; i++) {
  stat(pathsToCheck[i], (err, stats) => {
    console.log(stats.isDirectory());
    console.log(stats);
  });
}
```

The resulting output will resemble:

```console
true
Stats {
  dev: 16777220,
  mode: 16877,
  nlink: 3,
  uid: 501,
  gid: 20,
  rdev: 0,
  blksize: 4096,
  ino: 14214262,
  size: 96,
  blocks: 0,
  atimeMs: 1561174653071.963,
  mtimeMs: 1561174614583.3518,
  ctimeMs: 1561174626623.5366,
  birthtimeMs: 1561174126937.2893,
  atime: 2019-06-22T03:37:33.072Z,
  mtime: 2019-06-22T03:36:54.583Z,
  ctime: 2019-06-22T03:37:06.624Z,
  birthtime: 2019-06-22T03:28:46.937Z
}
false
Stats {
  dev: 16777220,
  mode: 33188,
  nlink: 1,
  uid: 501,
  gid: 20,
  rdev: 0,
  blksize: 4096,
  ino: 14214074,
  size: 8,
  blocks: 8,
  atimeMs: 1561174616618.8555,
  mtimeMs: 1561174614584,
  ctimeMs: 1561174614583.8145,
  birthtimeMs: 1561174007710.7478,
  atime: 2019-06-22T03:36:56.619Z,
  mtime: 2019-06-22T03:36:54.584Z,
  ctime: 2019-06-22T03:36:54.584Z,
  birthtime: 2019-06-22T03:26:47.711Z
}
```

#### <DataTag tag="M" /> `fs.symlink(target, path[, type], callback)`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v12.0.0","pr-url":"https://github.com/nodejs/node/pull/23724","description":"If the `type` argument is left undefined, Node will autodetect `target` type and automatically select `dir` or `file`."},{"version":"v7.6.0","pr-url":"https://github.com/nodejs/node/pull/10739","description":"The `target` and `path` parameters can be WHATWG `URL` objects using `file:` protocol. Support is currently still *experimental*."}],"update":{"type":"added","version":["v0.1.31"]}}} />

* `target` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `type` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type) **Default:** `null`
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `err` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

Creates the link called `path` pointing to `target`. No arguments other than a
possible exception are given to the completion callback.

See the POSIX symlink(2) documentation for more details.

The `type` argument is only available on Windows and ignored on other platforms.
It can be set to `'dir'`, `'file'`, or `'junction'`. If the `type` argument is
not a string, Node.js will autodetect `target` type and use `'file'` or `'dir'`.
If the `target` does not exist, `'file'` will be used. Windows junction points
require the destination path to be absolute. When using `'junction'`, the
`target` argument will automatically be normalized to absolute path.

Relative targets are relative to the link's parent directory.

```mjs
import { symlink } from 'node:fs';

symlink('./mew', './mewtwo', callback);
```

The above example creates a symbolic link `mewtwo` which points to `mew` in the
same directory:

```bash
$ tree .
.
├── mew
└── mewtwo -> ./mew
```

#### <DataTag tag="M" /> `fs.truncate(path[, len], callback)`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v16.0.0","pr-url":"https://github.com/nodejs/node/pull/37460","description":"The error returned may be an `AggregateError` if more than one error is returned."},{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/12562","description":"The `callback` parameter is no longer optional. Not passing it will throw a `TypeError` at runtime."},{"version":"v7.0.0","pr-url":"https://github.com/nodejs/node/pull/7897","description":"The `callback` parameter is no longer optional. Not passing it will emit a deprecation warning with id DEP0013."}],"update":{"type":"added","version":["v0.8.6"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `len` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `0`
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `err` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) | [`AggregateError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AggregateError)

Truncates the file. No arguments other than a possible exception are
given to the completion callback. A file descriptor can also be passed as the
first argument. In this case, `fs.ftruncate()` is called.

```mjs
import { truncate } from 'node:fs';
// Assuming that 'path/file.txt' is a regular file.
truncate('path/file.txt', (err) => {
  if (err) throw err;
  console.log('path/file.txt was truncated');
});
```

```cjs
const { truncate } = require('node:fs');
// Assuming that 'path/file.txt' is a regular file.
truncate('path/file.txt', (err) => {
  if (err) throw err;
  console.log('path/file.txt was truncated');
});
```

Passing a file descriptor is deprecated and may result in an error being thrown
in the future.

See the POSIX truncate(2) documentation for more details.

#### <DataTag tag="M" /> `fs.unlink(path, callback)`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/12562","description":"The `callback` parameter is no longer optional. Not passing it will throw a `TypeError` at runtime."},{"version":"v7.6.0","pr-url":"https://github.com/nodejs/node/pull/10739","description":"The `path` parameter can be a WHATWG `URL` object using `file:` protocol."},{"version":"v7.0.0","pr-url":"https://github.com/nodejs/node/pull/7897","description":"The `callback` parameter is no longer optional. Not passing it will emit a deprecation warning with id DEP0013."}],"update":{"type":"added","version":["v0.0.2"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `err` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

Asynchronously removes a file or symbolic link. No arguments other than a
possible exception are given to the completion callback.

```mjs
import { unlink } from 'node:fs';
// Assuming that 'path/file.txt' is a regular file.
unlink('path/file.txt', (err) => {
  if (err) throw err;
  console.log('path/file.txt was deleted');
});
```

`fs.unlink()` will not work on a directory, empty or otherwise. To remove a
directory, use [`fs.rmdir()`][].

See the POSIX unlink(2) documentation for more details.

#### <DataTag tag="M" /> `fs.unwatchFile(filename[, listener])`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v0.1.31"]}}} />

* `filename` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `listener` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) Optional, a listener previously attached using
  `fs.watchFile()`

Stop watching for changes on `filename`. If `listener` is specified, only that
particular listener is removed. Otherwise, _all_ listeners are removed,
effectively stopping watching of `filename`.

Calling `fs.unwatchFile()` with a filename that is not being watched is a
no-op, not an error.

Using [`fs.watch()`][] is more efficient than `fs.watchFile()` and
`fs.unwatchFile()`. `fs.watch()` should be used instead of `fs.watchFile()`
and `fs.unwatchFile()` when possible.

#### <DataTag tag="M" /> `fs.utimes(path, atime, mtime, callback)`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/12562","description":"The `callback` parameter is no longer optional. Not passing it will throw a `TypeError` at runtime."},{"version":"v8.0.0","pr-url":"https://github.com/nodejs/node/pull/11919","description":"`NaN`, `Infinity`, and `-Infinity` are no longer valid time specifiers."},{"version":"v7.6.0","pr-url":"https://github.com/nodejs/node/pull/10739","description":"The `path` parameter can be a WHATWG `URL` object using `file:` protocol."},{"version":"v7.0.0","pr-url":"https://github.com/nodejs/node/pull/7897","description":"The `callback` parameter is no longer optional. Not passing it will emit a deprecation warning with id DEP0013."},{"version":"v4.1.0","pr-url":"https://github.com/nodejs/node/pull/2387","description":"Numeric strings, `NaN`, and `Infinity` are now allowed time specifiers."}],"update":{"type":"added","version":["v0.4.2"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `atime` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
* `mtime` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `err` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

Change the file system timestamps of the object referenced by `path`.

The `atime` and `mtime` arguments follow these rules:

* Values can be either numbers representing Unix epoch time in seconds,
  `Date`s, or a numeric string like `'123456789.0'`.
* If the value can not be converted to a number, or is `NaN`, `Infinity`, or
  `-Infinity`, an `Error` will be thrown.

#### <DataTag tag="M" /> `fs.watch(filename[, options][, listener])`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v15.9.0","pr-url":"https://github.com/nodejs/node/pull/37190","description":"Added support for closing the watcher with an AbortSignal."},{"version":"v7.6.0","pr-url":"https://github.com/nodejs/node/pull/10739","description":"The `filename` parameter can be a WHATWG `URL` object using `file:` protocol."},{"version":"v7.0.0","pr-url":"https://github.com/nodejs/node/pull/7831","description":"The passed `options` object will never be modified."}],"update":{"type":"added","version":["v0.5.10"]}}} />

* `filename` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `options` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `persistent` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) Indicates whether the process should continue to run
    as long as files are being watched. **Default:** `true`.
  * `recursive` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) Indicates whether all subdirectories should be
    watched, or only the current directory. This applies when a directory is
    specified, and only on supported platforms (See [caveats][]). **Default:**
    `false`.
  * `encoding` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Specifies the character encoding to be used for the
    filename passed to the listener. **Default:** `'utf8'`.
  * `signal` [`AbortSignal`](/api/globals#abortsignal) allows closing the watcher with an AbortSignal.
* `listener` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) | [`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Undefined_type) **Default:** `undefined`
  * `eventType` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
  * `filename` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer)
* Returns: [`fs.FSWatcher`](/api/fs#fsfswatcher)

Watch for changes on `filename`, where `filename` is either a file or a
directory.

The second argument is optional. If `options` is provided as a string, it
specifies the `encoding`. Otherwise `options` should be passed as an object.

The listener callback gets two arguments `(eventType, filename)`. `eventType`
is either `'rename'` or `'change'`, and `filename` is the name of the file
which triggered the event.

On most platforms, `'rename'` is emitted whenever a filename appears or
disappears in the directory.

The listener callback is attached to the `'change'` event fired by
[`fs.FSWatcher`](/api/fs#fsfswatcher), but it is not the same thing as the `'change'` value of
`eventType`.

If a `signal` is passed, aborting the corresponding AbortController will close
the returned [`fs.FSWatcher`](/api/fs#fsfswatcher).

##### Caveats

<Metadata version="v16.18.1" data={{"type":"misc"}} />

The `fs.watch` API is not 100% consistent across platforms, and is
unavailable in some situations.

The recursive option is only supported on macOS and Windows.
An `ERR_FEATURE_UNAVAILABLE_ON_PLATFORM` exception will be thrown
when the option is used on a platform that does not support it.

On Windows, no events will be emitted if the watched directory is moved or
renamed. An `EPERM` error is reported when the watched directory is deleted.

###### Availability

<Metadata version="v16.18.1" data={{"type":"misc"}} />

This feature depends on the underlying operating system providing a way
to be notified of filesystem changes.

* On Linux systems, this uses [`inotify(7)`][].
* On BSD systems, this uses [`kqueue(2)`][].
* On macOS, this uses [`kqueue(2)`][] for files and [`FSEvents`][] for
  directories.
* On SunOS systems (including Solaris and SmartOS), this uses [`event ports`][].
* On Windows systems, this feature depends on [`ReadDirectoryChangesW`][].
* On AIX systems, this feature depends on [`AHAFS`][], which must be enabled.
* On IBM i systems, this feature is not supported.

If the underlying functionality is not available for some reason, then
`fs.watch()` will not be able to function and may throw an exception.
For example, watching files or directories can be unreliable, and in some
cases impossible, on network file systems (NFS, SMB, etc) or host file systems
when using virtualization software such as Vagrant or Docker.

It is still possible to use `fs.watchFile()`, which uses stat polling, but
this method is slower and less reliable.

###### Inodes

<Metadata version="v16.18.1" data={{"type":"misc"}} />

On Linux and macOS systems, `fs.watch()` resolves the path to an [inode][] and
watches the inode. If the watched path is deleted and recreated, it is assigned
a new inode. The watch will emit an event for the delete but will continue
watching the _original_ inode. Events for the new inode will not be emitted.
This is expected behavior.

AIX files retain the same inode for the lifetime of a file. Saving and closing a
watched file on AIX will result in two notifications (one for adding new
content, and one for truncation).

###### Filename argument

<Metadata version="v16.18.1" data={{"type":"misc"}} />

Providing `filename` argument in the callback is only supported on Linux,
macOS, Windows, and AIX. Even on supported platforms, `filename` is not always
guaranteed to be provided. Therefore, don't assume that `filename` argument is
always provided in the callback, and have some fallback logic if it is `null`.

```mjs
import { watch } from 'node:fs';
watch('somedir', (eventType, filename) => {
  console.log(`event type is: ${eventType}`);
  if (filename) {
    console.log(`filename provided: ${filename}`);
  } else {
    console.log('filename not provided');
  }
});
```

#### <DataTag tag="M" /> `fs.watchFile(filename[, options], listener)`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v10.5.0","pr-url":"https://github.com/nodejs/node/pull/20220","description":"The `bigint` option is now supported."},{"version":"v7.6.0","pr-url":"https://github.com/nodejs/node/pull/10739","description":"The `filename` parameter can be a WHATWG `URL` object using `file:` protocol."}],"update":{"type":"added","version":["v0.1.31"]}}} />

* `filename` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `bigint` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) **Default:** `false`
  * `persistent` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) **Default:** `true`
  * `interval` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `5007`
* `listener` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `current` [`fs.Stats`](/api/fs#fsstats)
  * `previous` [`fs.Stats`](/api/fs#fsstats)
* Returns: [`fs.StatWatcher`](/api/fs#fsstatwatcher)

Watch for changes on `filename`. The callback `listener` will be called each
time the file is accessed.

The `options` argument may be omitted. If provided, it should be an object. The
`options` object may contain a boolean named `persistent` that indicates
whether the process should continue to run as long as files are being watched.
The `options` object may specify an `interval` property indicating how often the
target should be polled in milliseconds.

The `listener` gets two arguments the current stat object and the previous
stat object:

```mjs
import { watchFile } from 'node:fs';

watchFile('message.text', (curr, prev) => {
  console.log(`the current mtime is: ${curr.mtime}`);
  console.log(`the previous mtime was: ${prev.mtime}`);
});
```

These stat objects are instances of `fs.Stat`. If the `bigint` option is `true`,
the numeric values in these objects are specified as `BigInt`s.

To be notified when the file was modified, not just accessed, it is necessary
to compare `curr.mtimeMs` and `prev.mtimeMs`.

When an `fs.watchFile` operation results in an `ENOENT` error, it
will invoke the listener once, with all the fields zeroed (or, for dates, the
Unix Epoch). If the file is created later on, the listener will be called
again, with the latest stat objects. This is a change in functionality since
v0.10.

Using [`fs.watch()`][] is more efficient than `fs.watchFile` and
`fs.unwatchFile`. `fs.watch` should be used instead of `fs.watchFile` and
`fs.unwatchFile` when possible.

When a file being watched by `fs.watchFile()` disappears and reappears,
then the contents of `previous` in the second callback event (the file's
reappearance) will be the same as the contents of `previous` in the first
callback event (its disappearance).

This happens when:

* the file is deleted, followed by a restore
* the file is renamed and then renamed a second time back to its original name

#### <DataTag tag="M" /> `fs.write(fd, buffer, offset[, length[, position]], callback)`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v14.0.0","pr-url":"https://github.com/nodejs/node/pull/31030","description":"The `buffer` parameter won't coerce unsupported input to strings anymore."},{"version":"v10.10.0","pr-url":"https://github.com/nodejs/node/pull/22150","description":"The `buffer` parameter can now be any `TypedArray` or a `DataView`."},{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/12562","description":"The `callback` parameter is no longer optional. Not passing it will throw a `TypeError` at runtime."},{"version":"v7.4.0","pr-url":"https://github.com/nodejs/node/pull/10382","description":"The `buffer` parameter can now be a `Uint8Array`."},{"version":"v7.2.0","pr-url":"https://github.com/nodejs/node/pull/7856","description":"The `offset` and `length` parameters are optional now."},{"version":"v7.0.0","pr-url":"https://github.com/nodejs/node/pull/7897","description":"The `callback` parameter is no longer optional. Not passing it will emit a deprecation warning with id DEP0013."}],"update":{"type":"added","version":["v0.0.2"]}}} />

* `fd` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
* `buffer` [`Buffer`](/api/buffer#buffer) | [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`DataView`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView)
* `offset` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `0`
* `length` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `buffer.byteLength - offset`
* `position` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type) **Default:** `null`
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `err` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
  * `bytesWritten` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
  * `buffer` [`Buffer`](/api/buffer#buffer) | [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`DataView`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView)

Write `buffer` to the file specified by `fd`.

`offset` determines the part of the buffer to be written, and `length` is
an integer specifying the number of bytes to write.

`position` refers to the offset from the beginning of the file where this data
should be written. If `typeof position !== 'number'`, the data will be written
at the current position. See pwrite(2).

The callback will be given three arguments `(err, bytesWritten, buffer)` where
`bytesWritten` specifies how many _bytes_ were written from `buffer`.

If this method is invoked as its [`util.promisify()`][]ed version, it returns
a promise for an `Object` with `bytesWritten` and `buffer` properties.

It is unsafe to use `fs.write()` multiple times on the same file without waiting
for the callback. For this scenario, [`fs.createWriteStream()`][] is
recommended.

On Linux, positional writes don't work when the file is opened in append mode.
The kernel ignores the position argument and always appends the data to
the end of the file.

#### <DataTag tag="M" /> `fs.write(fd, buffer[, options], callback)`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v16.17.0"]}}} />

* `fd` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
* `buffer` [`Buffer`](/api/buffer#buffer) | [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`DataView`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView)
* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `offset` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `0`
  * `length` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `buffer.byteLength - offset`
  * `position` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `null`
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `err` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
  * `bytesWritten` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
  * `buffer` [`Buffer`](/api/buffer#buffer) | [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`DataView`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView)

Write `buffer` to the file specified by `fd`.

Similar to the above `fs.write` function, this version takes an
optional `options` object. If no `options` object is specified, it will
default with the above values.

#### <DataTag tag="M" /> `fs.write(fd, string[, position[, encoding]], callback)`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v14.12.0","pr-url":"https://github.com/nodejs/node/pull/34993","description":"The `string` parameter will stringify an object with an explicit `toString` function."},{"version":"v14.0.0","pr-url":"https://github.com/nodejs/node/pull/31030","description":"The `string` parameter won't coerce unsupported input to strings anymore."},{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/12562","description":"The `callback` parameter is no longer optional. Not passing it will throw a `TypeError` at runtime."},{"version":"v7.2.0","pr-url":"https://github.com/nodejs/node/pull/7856","description":"The `position` parameter is optional now."},{"version":"v7.0.0","pr-url":"https://github.com/nodejs/node/pull/7897","description":"The `callback` parameter is no longer optional. Not passing it will emit a deprecation warning with id DEP0013."}],"update":{"type":"added","version":["v0.11.5"]}}} />

* `fd` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
* `string` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
* `position` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type) **Default:** `null`
* `encoding` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) **Default:** `'utf8'`
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `err` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
  * `written` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
  * `string` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

Write `string` to the file specified by `fd`. If `string` is not a string, or an
object with an own `toString` function property, then an exception is thrown.

`position` refers to the offset from the beginning of the file where this data
should be written. If `typeof position !== 'number'` the data will be written at
the current position. See pwrite(2).

`encoding` is the expected string encoding.

The callback will receive the arguments `(err, written, string)` where `written`
specifies how many _bytes_ the passed string required to be written. Bytes
written is not necessarily the same as string characters written. See
[`Buffer.byteLength`][].

It is unsafe to use `fs.write()` multiple times on the same file without waiting
for the callback. For this scenario, [`fs.createWriteStream()`][] is
recommended.

On Linux, positional writes don't work when the file is opened in append mode.
The kernel ignores the position argument and always appends the data to
the end of the file.

On Windows, if the file descriptor is connected to the console (e.g. `fd == 1`
or `stdout`) a string containing non-ASCII characters will not be rendered
properly by default, regardless of the encoding used.
It is possible to configure the console to render UTF-8 properly by changing the
active codepage with the `chcp 65001` command. See the [chcp][] docs for more
details.

#### <DataTag tag="M" /> `fs.writeFile(file, data[, options], callback)`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v16.0.0","pr-url":"https://github.com/nodejs/node/pull/37460","description":"The error returned may be an `AggregateError` if more than one error is returned."},{"version":"v15.2.0","pr-url":"https://github.com/nodejs/node/pull/35993","description":"The options argument may include an AbortSignal to abort an ongoing writeFile request."},{"version":"v14.12.0","pr-url":"https://github.com/nodejs/node/pull/34993","description":"The `data` parameter will stringify an object with an explicit `toString` function."},{"version":"v14.0.0","pr-url":"https://github.com/nodejs/node/pull/31030","description":"The `data` parameter won't coerce unsupported input to strings anymore."},{"version":"v10.10.0","pr-url":"https://github.com/nodejs/node/pull/22150","description":"The `data` parameter can now be any `TypedArray` or a `DataView`."},{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/12562","description":"The `callback` parameter is no longer optional. Not passing it will throw a `TypeError` at runtime."},{"version":"v7.4.0","pr-url":"https://github.com/nodejs/node/pull/10382","description":"The `data` parameter can now be a `Uint8Array`."},{"version":"v7.0.0","pr-url":"https://github.com/nodejs/node/pull/7897","description":"The `callback` parameter is no longer optional. Not passing it will emit a deprecation warning with id DEP0013."},{"version":"v5.0.0","pr-url":"https://github.com/nodejs/node/pull/3163","description":"The `file` parameter can be a file descriptor now."}],"update":{"type":"added","version":["v0.1.29"]}}} />

* `file` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api) | [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) filename or file descriptor
* `data` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`DataView`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView) | [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
  * `encoding` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type) **Default:** `'utf8'`
  * `mode` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `0o666`
  * `flag` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) See [support of file system `flags`][]. **Default:** `'w'`.
  * `signal` [`AbortSignal`](/api/globals#abortsignal) allows aborting an in-progress writeFile
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `err` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) | [`AggregateError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AggregateError)

When `file` is a filename, asynchronously writes data to the file, replacing the
file if it already exists. `data` can be a string or a buffer.

When `file` is a file descriptor, the behavior is similar to calling
`fs.write()` directly (which is recommended). See the notes below on using
a file descriptor.

The `encoding` option is ignored if `data` is a buffer.

The `mode` option only affects the newly created file. See [`fs.open()`][]
for more details.

If `data` is a plain object, it must have an own (not inherited) `toString`
function property.

```mjs
import { writeFile } from 'node:fs';
import { Buffer } from 'node:buffer';

const data = new Uint8Array(Buffer.from('Hello Node.js'));
writeFile('message.txt', data, (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});
```

If `options` is a string, then it specifies the encoding:

```mjs
import { writeFile } from 'node:fs';

writeFile('message.txt', 'Hello Node.js', 'utf8', callback);
```

It is unsafe to use `fs.writeFile()` multiple times on the same file without
waiting for the callback. For this scenario, [`fs.createWriteStream()`][] is
recommended.

Similarly to `fs.readFile` - `fs.writeFile` is a convenience method that
performs multiple `write` calls internally to write the buffer passed to it.
For performance sensitive code consider using [`fs.createWriteStream()`][].

It is possible to use an [`AbortSignal`](/api/globals#abortsignal) to cancel an `fs.writeFile()`.
Cancelation is "best effort", and some amount of data is likely still
to be written.

```mjs
import { writeFile } from 'node:fs';
import { Buffer } from 'node:buffer';

const controller = new AbortController();
const { signal } = controller;
const data = new Uint8Array(Buffer.from('Hello Node.js'));
writeFile('message.txt', data, { signal }, (err) => {
  // When a request is aborted - the callback is called with an AbortError
});
// When the request should be aborted
controller.abort();
```

Aborting an ongoing request does not abort individual operating
system requests but rather the internal buffering `fs.writeFile` performs.

##### Using `fs.writeFile()` with file descriptors

When `file` is a file descriptor, the behavior is almost identical to directly
calling `fs.write()` like:

```mjs
import { write } from 'node:fs';
import { Buffer } from 'node:buffer';

write(fd, Buffer.from(data, options.encoding), callback);
```

The difference from directly calling `fs.write()` is that under some unusual
conditions, `fs.write()` might write only part of the buffer and need to be
retried to write the remaining data, whereas `fs.writeFile()` retries until
the data is entirely written (or an error occurs).

The implications of this are a common source of confusion. In
the file descriptor case, the file is not replaced! The data is not necessarily
written to the beginning of the file, and the file's original data may remain
before and/or after the newly written data.

For example, if `fs.writeFile()` is called twice in a row, first to write the
string `'Hello'`, then to write the string `', World'`, the file would contain
`'Hello, World'`, and might contain some of the file's original data (depending
on the size of the original file, and the position of the file descriptor). If
a file name had been used instead of a descriptor, the file would be guaranteed
to contain only `', World'`.

#### <DataTag tag="M" /> `fs.writev(fd, buffers[, position], callback)`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v12.9.0"]}}} />

* `fd` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
* `buffers` ArrayBufferView\[]
* `position` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type) **Default:** `null`
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `err` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
  * `bytesWritten` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
  * `buffers` ArrayBufferView\[]

Write an array of `ArrayBufferView`s to the file specified by `fd` using
`writev()`.

`position` is the offset from the beginning of the file where this data
should be written. If `typeof position !== 'number'`, the data will be written
at the current position.

The callback will be given three arguments: `err`, `bytesWritten`, and
`buffers`. `bytesWritten` is how many bytes were written from `buffers`.

If this method is [`util.promisify()`][]ed, it returns a promise for an
`Object` with `bytesWritten` and `buffers` properties.

It is unsafe to use `fs.writev()` multiple times on the same file without
waiting for the callback. For this scenario, use [`fs.createWriteStream()`][].

On Linux, positional writes don't work when the file is opened in append mode.
The kernel ignores the position argument and always appends the data to
the end of the file.

### Synchronous API

The synchronous APIs perform all operations synchronously, blocking the
event loop until the operation completes or fails.

#### <DataTag tag="M" /> `fs.accessSync(path[, mode])`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v7.6.0","pr-url":"https://github.com/nodejs/node/pull/10739","description":"The `path` parameter can be a WHATWG `URL` object using `file:` protocol."}],"update":{"type":"added","version":["v0.11.15"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `mode` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `fs.constants.F_OK`

Synchronously tests a user's permissions for the file or directory specified
by `path`. The `mode` argument is an optional integer that specifies the
accessibility checks to be performed. `mode` should be either the value
`fs.constants.F_OK` or a mask consisting of the bitwise OR of any of
`fs.constants.R_OK`, `fs.constants.W_OK`, and `fs.constants.X_OK` (e.g.
`fs.constants.W_OK | fs.constants.R_OK`). Check [File access constants][] for
possible values of `mode`.

If any of the accessibility checks fail, an `Error` will be thrown. Otherwise,
the method will return `undefined`.

```mjs
import { accessSync, constants } from 'node:fs';

try {
  accessSync('etc/passwd', constants.R_OK | constants.W_OK);
  console.log('can read/write');
} catch (err) {
  console.error('no access!');
}
```

#### <DataTag tag="M" /> `fs.appendFileSync(path, data[, options])`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v7.0.0","pr-url":"https://github.com/nodejs/node/pull/7831","description":"The passed `options` object will never be modified."},{"version":"v5.0.0","pr-url":"https://github.com/nodejs/node/pull/3163","description":"The `file` parameter can be a file descriptor now."}],"update":{"type":"added","version":["v0.6.7"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api) | [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) filename or file descriptor
* `data` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer)
* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
  * `encoding` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type) **Default:** `'utf8'`
  * `mode` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `0o666`
  * `flag` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) See [support of file system `flags`][]. **Default:** `'a'`.

Synchronously append data to a file, creating the file if it does not yet
exist. `data` can be a string or a [`Buffer`](/api/buffer#buffer).

The `mode` option only affects the newly created file. See [`fs.open()`][]
for more details.

```mjs
import { appendFileSync } from 'node:fs';

try {
  appendFileSync('message.txt', 'data to append');
  console.log('The "data to append" was appended to file!');
} catch (err) {
  /* Handle the error */
}
```

If `options` is a string, then it specifies the encoding:

```mjs
import { appendFileSync } from 'node:fs';

appendFileSync('message.txt', 'data to append', 'utf8');
```

The `path` may be specified as a numeric file descriptor that has been opened
for appending (using `fs.open()` or `fs.openSync()`). The file descriptor will
not be closed automatically.

```mjs
import { openSync, closeSync, appendFileSync } from 'node:fs';

let fd;

try {
  fd = openSync('message.txt', 'a');
  appendFileSync(fd, 'data to append', 'utf8');
} catch (err) {
  /* Handle the error */
} finally {
  if (fd !== undefined)
    closeSync(fd);
}
```

#### <DataTag tag="M" /> `fs.chmodSync(path, mode)`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v7.6.0","pr-url":"https://github.com/nodejs/node/pull/10739","description":"The `path` parameter can be a WHATWG `URL` object using `file:` protocol."}],"update":{"type":"added","version":["v0.6.7"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `mode` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

For detailed information, see the documentation of the asynchronous version of
this API: [`fs.chmod()`][].

See the POSIX chmod(2) documentation for more detail.

#### <DataTag tag="M" /> `fs.chownSync(path, uid, gid)`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v7.6.0","pr-url":"https://github.com/nodejs/node/pull/10739","description":"The `path` parameter can be a WHATWG `URL` object using `file:` protocol."}],"update":{"type":"added","version":["v0.1.97"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `uid` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
* `gid` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

Synchronously changes owner and group of a file. Returns `undefined`.
This is the synchronous version of [`fs.chown()`][].

See the POSIX chown(2) documentation for more detail.

#### <DataTag tag="M" /> `fs.closeSync(fd)`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v0.1.21"]}}} />

* `fd` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

Closes the file descriptor. Returns `undefined`.

Calling `fs.closeSync()` on any file descriptor (`fd`) that is currently in use
through any other `fs` operation may lead to undefined behavior.

See the POSIX close(2) documentation for more detail.

#### <DataTag tag="M" /> `fs.copyFileSync(src, dest[, mode])`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v14.0.0","pr-url":"https://github.com/nodejs/node/pull/27044","description":"Changed 'flags' argument to 'mode' and imposed stricter type validation."}],"update":{"type":"added","version":["v8.5.0"]}}} />

* `src` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api) source filename to copy
* `dest` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api) destination filename of the copy operation
* `mode` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) modifiers for copy operation. **Default:** `0`.

Synchronously copies `src` to `dest`. By default, `dest` is overwritten if it
already exists. Returns `undefined`. Node.js makes no guarantees about the
atomicity of the copy operation. If an error occurs after the destination file
has been opened for writing, Node.js will attempt to remove the destination.

`mode` is an optional integer that specifies the behavior
of the copy operation. It is possible to create a mask consisting of the bitwise
OR of two or more values (e.g.
`fs.constants.COPYFILE_EXCL | fs.constants.COPYFILE_FICLONE`).

* `fs.constants.COPYFILE_EXCL`: The copy operation will fail if `dest` already
  exists.
* `fs.constants.COPYFILE_FICLONE`: The copy operation will attempt to create a
  copy-on-write reflink. If the platform does not support copy-on-write, then a
  fallback copy mechanism is used.
* `fs.constants.COPYFILE_FICLONE_FORCE`: The copy operation will attempt to
  create a copy-on-write reflink. If the platform does not support
  copy-on-write, then the operation will fail.

```mjs
import { copyFileSync, constants } from 'node:fs';

// destination.txt will be created or overwritten by default.
copyFileSync('source.txt', 'destination.txt');
console.log('source.txt was copied to destination.txt');

// By using COPYFILE_EXCL, the operation will fail if destination.txt exists.
copyFileSync('source.txt', 'destination.txt', constants.COPYFILE_EXCL);
```

#### <DataTag tag="M" /> `fs.cpSync(src, dest[, options])`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v16.15.0","pr-url":"https://github.com/nodejs/node/pull/41819","description":"Accepts an additional `verbatimSymlinks` option to specify whether to perform path resolution for symlinks."}],"update":{"type":"added","version":["v16.7.0"]}}} />

<Metadata version="v16.18.1" data={{"stability":{"level":1,"text":" - Experimental"}}} />

* `src` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`URL`](/api/url#the-whatwg-url-api) source path to copy.
* `dest` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`URL`](/api/url#the-whatwg-url-api) destination path to copy to.
* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `dereference` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) dereference symlinks. **Default:** `false`.
  * `errorOnExist` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) when `force` is `false`, and the destination
    exists, throw an error. **Default:** `false`.
  * `filter` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) Function to filter copied files/directories. Return
    `true` to copy the item, `false` to ignore it. **Default:** `undefined`
  * `force` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) overwrite existing file or directory. The copy
    operation will ignore errors if you set this to false and the destination
    exists. Use the `errorOnExist` option to change this behavior.
    **Default:** `true`.
  * `preserveTimestamps` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) When `true` timestamps from `src` will
    be preserved. **Default:** `false`.
  * `recursive` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) copy directories recursively **Default:** `false`
  * `verbatimSymlinks` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) When `true`, path resolution for symlinks will
    be skipped. **Default:** `false`

Synchronously copies the entire directory structure from `src` to `dest`,
including subdirectories and files.

When copying a directory to another directory, globs are not supported and
behavior is similar to `cp dir1/ dir2/`.

#### <DataTag tag="M" /> `fs.existsSync(path)`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v7.6.0","pr-url":"https://github.com/nodejs/node/pull/10739","description":"The `path` parameter can be a WHATWG `URL` object using `file:` protocol."}],"update":{"type":"added","version":["v0.1.21"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* Returns: [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Returns `true` if the path exists, `false` otherwise.

For detailed information, see the documentation of the asynchronous version of
this API: [`fs.exists()`][].

`fs.exists()` is deprecated, but `fs.existsSync()` is not. The `callback`
parameter to `fs.exists()` accepts parameters that are inconsistent with other
Node.js callbacks. `fs.existsSync()` does not use a callback.

```mjs
import { existsSync } from 'node:fs';

if (existsSync('/etc/passwd'))
  console.log('The path exists.');
```

#### <DataTag tag="M" /> `fs.fchmodSync(fd, mode)`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v0.4.7"]}}} />

* `fd` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
* `mode` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

Sets the permissions on the file. Returns `undefined`.

See the POSIX fchmod(2) documentation for more detail.

#### <DataTag tag="M" /> `fs.fchownSync(fd, uid, gid)`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v0.4.7"]}}} />

* `fd` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
* `uid` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The file's new owner's user id.
* `gid` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The file's new group's group id.

Sets the owner of the file. Returns `undefined`.

See the POSIX fchown(2) documentation for more detail.

#### <DataTag tag="M" /> `fs.fdatasyncSync(fd)`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v0.1.96"]}}} />

* `fd` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

Forces all currently queued I/O operations associated with the file to the
operating system's synchronized I/O completion state. Refer to the POSIX
fdatasync(2) documentation for details. Returns `undefined`.

#### <DataTag tag="M" /> `fs.fstatSync(fd[, options])`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v10.5.0","pr-url":"https://github.com/nodejs/node/pull/20220","description":"Accepts an additional `options` object to specify whether the numeric values returned should be bigint."}],"update":{"type":"added","version":["v0.1.95"]}}} />

* `fd` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `bigint` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) Whether the numeric values in the returned
    [`fs.Stats`](/api/fs#fsstats) object should be `bigint`. **Default:** `false`.
* Returns: [`fs.Stats`](/api/fs#fsstats)

Retrieves the [`fs.Stats`](/api/fs#fsstats) for the file descriptor.

See the POSIX fstat(2) documentation for more detail.

#### <DataTag tag="M" /> `fs.fsyncSync(fd)`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v0.1.96"]}}} />

* `fd` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

Request that all data for the open file descriptor is flushed to the storage
device. The specific implementation is operating system and device specific.
Refer to the POSIX fsync(2) documentation for more detail. Returns `undefined`.

#### <DataTag tag="M" /> `fs.ftruncateSync(fd[, len])`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v0.8.6"]}}} />

* `fd` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
* `len` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `0`

Truncates the file descriptor. Returns `undefined`.

For detailed information, see the documentation of the asynchronous version of
this API: [`fs.ftruncate()`][].

#### <DataTag tag="M" /> `fs.futimesSync(fd, atime, mtime)`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v4.1.0","pr-url":"https://github.com/nodejs/node/pull/2387","description":"Numeric strings, `NaN`, and `Infinity` are now allowed time specifiers."}],"update":{"type":"added","version":["v0.4.2"]}}} />

* `fd` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
* `atime` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
* `mtime` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)

Synchronous version of [`fs.futimes()`][]. Returns `undefined`.

#### <DataTag tag="M" /> `fs.lchmodSync(path, mode)`

<Metadata version="v16.18.1" data={{"update":{"type":"deprecated","version":["v0.4.7"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `mode` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

Changes the permissions on a symbolic link. Returns `undefined`.

This method is only implemented on macOS.

See the POSIX lchmod(2) documentation for more detail.

#### <DataTag tag="M" /> `fs.lchownSync(path, uid, gid)`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v10.6.0","pr-url":"https://github.com/nodejs/node/pull/21498","description":"This API is no longer deprecated."},{"version":"v0.4.7","description":"Documentation-only deprecation."}]}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `uid` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The file's new owner's user id.
* `gid` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The file's new group's group id.

Set the owner for the path. Returns `undefined`.

See the POSIX lchown(2) documentation for more details.

#### <DataTag tag="M" /> `fs.lutimesSync(path, atime, mtime)`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v14.5.0","v12.19.0"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `atime` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
* `mtime` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)

Change the file system timestamps of the symbolic link referenced by `path`.
Returns `undefined`, or throws an exception when parameters are incorrect or
the operation fails. This is the synchronous version of [`fs.lutimes()`][].

#### <DataTag tag="M" /> `fs.linkSync(existingPath, newPath)`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v7.6.0","pr-url":"https://github.com/nodejs/node/pull/10739","description":"The `existingPath` and `newPath` parameters can be WHATWG `URL` objects using `file:` protocol. Support is currently still *experimental*."}],"update":{"type":"added","version":["v0.1.31"]}}} />

* `existingPath` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `newPath` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)

Creates a new link from the `existingPath` to the `newPath`. See the POSIX
link(2) documentation for more detail. Returns `undefined`.

#### <DataTag tag="M" /> `fs.lstatSync(path[, options])`

<Metadata version="v16.18.1" data={{"changes":[{"version":["v15.3.0","v14.17.0"],"pr-url":"https://github.com/nodejs/node/pull/33716","description":"Accepts a `throwIfNoEntry` option to specify whether an exception should be thrown if the entry does not exist."},{"version":"v10.5.0","pr-url":"https://github.com/nodejs/node/pull/20220","description":"Accepts an additional `options` object to specify whether the numeric values returned should be bigint."},{"version":"v7.6.0","pr-url":"https://github.com/nodejs/node/pull/10739","description":"The `path` parameter can be a WHATWG `URL` object using `file:` protocol."}],"update":{"type":"added","version":["v0.1.30"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `bigint` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) Whether the numeric values in the returned
    [`fs.Stats`](/api/fs#fsstats) object should be `bigint`. **Default:** `false`.
  * `throwIfNoEntry` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) Whether an exception will be thrown
    if no file system entry exists, rather than returning `undefined`.
    **Default:** `true`.
* Returns: [`fs.Stats`](/api/fs#fsstats)

Retrieves the [`fs.Stats`](/api/fs#fsstats) for the symbolic link referred to by `path`.

See the POSIX lstat(2) documentation for more details.

#### <DataTag tag="M" /> `fs.mkdirSync(path[, options])`

<Metadata version="v16.18.1" data={{"changes":[{"version":["v13.11.0","v12.17.0"],"pr-url":"https://github.com/nodejs/node/pull/31530","description":"In `recursive` mode, the first created path is returned now."},{"version":"v10.12.0","pr-url":"https://github.com/nodejs/node/pull/21875","description":"The second argument can now be an `options` object with `recursive` and `mode` properties."},{"version":"v7.6.0","pr-url":"https://github.com/nodejs/node/pull/10739","description":"The `path` parameter can be a WHATWG `URL` object using `file:` protocol."}],"update":{"type":"added","version":["v0.1.21"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) | [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
  * `recursive` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) **Default:** `false`
  * `mode` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) Not supported on Windows. **Default:** `0o777`.
* Returns: [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Undefined_type)

Synchronously creates a directory. Returns `undefined`, or if `recursive` is
`true`, the first directory path created.
This is the synchronous version of [`fs.mkdir()`][].

See the POSIX mkdir(2) documentation for more details.

#### <DataTag tag="M" /> `fs.mkdtempSync(prefix[, options])`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v16.5.0","pr-url":"https://github.com/nodejs/node/pull/39028","description":"The `prefix` parameter now accepts an empty string."}],"update":{"type":"added","version":["v5.10.0"]}}} />

* `prefix` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
* `options` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `encoding` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) **Default:** `'utf8'`
* Returns: [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

Returns the created directory path.

For detailed information, see the documentation of the asynchronous version of
this API: [`fs.mkdtemp()`][].

The optional `options` argument can be a string specifying an encoding, or an
object with an `encoding` property specifying the character encoding to use.

#### <DataTag tag="M" /> `fs.opendirSync(path[, options])`

<Metadata version="v16.18.1" data={{"changes":[{"version":["v13.1.0","v12.16.0"],"pr-url":"https://github.com/nodejs/node/pull/30114","description":"The `bufferSize` option was introduced."}],"update":{"type":"added","version":["v12.12.0"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `encoding` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type) **Default:** `'utf8'`
  * `bufferSize` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) Number of directory entries that are buffered
    internally when reading from the directory. Higher values lead to better
    performance but higher memory usage. **Default:** `32`
* Returns: [`fs.Dir`](/api/fs#fsdir)

Synchronously open a directory. See opendir(3).

Creates an [`fs.Dir`](/api/fs#fsdir), which contains all further functions for reading from
and cleaning up the directory.

The `encoding` option sets the encoding for the `path` while opening the
directory and subsequent read operations.

#### <DataTag tag="M" /> `fs.openSync(path[, flags[, mode]])`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v11.1.0","pr-url":"https://github.com/nodejs/node/pull/23767","description":"The `flags` argument is now optional and defaults to `'r'`."},{"version":"v9.9.0","pr-url":"https://github.com/nodejs/node/pull/18801","description":"The `as` and `as+` flags are supported now."},{"version":"v7.6.0","pr-url":"https://github.com/nodejs/node/pull/10739","description":"The `path` parameter can be a WHATWG `URL` object using `file:` protocol."}],"update":{"type":"added","version":["v0.1.21"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `flags` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `'r'`.
  See [support of file system `flags`][].
* `mode` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `0o666`
* Returns: [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

Returns an integer representing the file descriptor.

For detailed information, see the documentation of the asynchronous version of
this API: [`fs.open()`][].

#### <DataTag tag="M" /> `fs.readdirSync(path[, options])`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v10.10.0","pr-url":"https://github.com/nodejs/node/pull/22020","description":"New option `withFileTypes` was added."},{"version":"v7.6.0","pr-url":"https://github.com/nodejs/node/pull/10739","description":"The `path` parameter can be a WHATWG `URL` object using `file:` protocol."}],"update":{"type":"added","version":["v0.1.21"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `options` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `encoding` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) **Default:** `'utf8'`
  * `withFileTypes` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) **Default:** `false`
* Returns: string\[]|Buffer\[]|fs.Dirent\[]

Reads the contents of the directory.

See the POSIX readdir(3) documentation for more details.

The optional `options` argument can be a string specifying an encoding, or an
object with an `encoding` property specifying the character encoding to use for
the filenames returned. If the `encoding` is set to `'buffer'`,
the filenames returned will be passed as [`Buffer`](/api/buffer#buffer) objects.

If `options.withFileTypes` is set to `true`, the result will contain
[`fs.Dirent`](/api/fs#fsdirent) objects.

#### <DataTag tag="M" /> `fs.readFileSync(path[, options])`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v7.6.0","pr-url":"https://github.com/nodejs/node/pull/10739","description":"The `path` parameter can be a WHATWG `URL` object using `file:` protocol."},{"version":"v5.0.0","pr-url":"https://github.com/nodejs/node/pull/3163","description":"The `path` parameter can be a file descriptor now."}],"update":{"type":"added","version":["v0.1.8"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api) | [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) filename or file descriptor
* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
  * `encoding` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type) **Default:** `null`
  * `flag` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) See [support of file system `flags`][]. **Default:** `'r'`.
* Returns: [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer)

Returns the contents of the `path`.

For detailed information, see the documentation of the asynchronous version of
this API: [`fs.readFile()`][].

If the `encoding` option is specified then this function returns a
string. Otherwise it returns a buffer.

Similar to [`fs.readFile()`][], when the path is a directory, the behavior of
`fs.readFileSync()` is platform-specific.

```mjs
import { readFileSync } from 'node:fs';

// macOS, Linux, and Windows
readFileSync('<directory>');
// => [Error: EISDIR: illegal operation on a directory, read <directory>]

//  FreeBSD
readFileSync('<directory>'); // => <data>
```

#### <DataTag tag="M" /> `fs.readlinkSync(path[, options])`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v7.6.0","pr-url":"https://github.com/nodejs/node/pull/10739","description":"The `path` parameter can be a WHATWG `URL` object using `file:` protocol."}],"update":{"type":"added","version":["v0.1.31"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `options` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `encoding` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) **Default:** `'utf8'`
* Returns: [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer)

Returns the symbolic link's string value.

See the POSIX readlink(2) documentation for more details.

The optional `options` argument can be a string specifying an encoding, or an
object with an `encoding` property specifying the character encoding to use for
the link path returned. If the `encoding` is set to `'buffer'`,
the link path returned will be passed as a [`Buffer`](/api/buffer#buffer) object.

#### <DataTag tag="M" /> `fs.readSync(fd, buffer, offset, length[, position])`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v10.10.0","pr-url":"https://github.com/nodejs/node/pull/22150","description":"The `buffer` parameter can now be any `TypedArray` or a `DataView`."},{"version":"v6.0.0","pr-url":"https://github.com/nodejs/node/pull/4518","description":"The `length` parameter can now be `0`."}],"update":{"type":"added","version":["v0.1.21"]}}} />

* `fd` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
* `buffer` [`Buffer`](/api/buffer#buffer) | [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`DataView`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView)
* `offset` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
* `length` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
* `position` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [`bigint`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) | [`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type) **Default:** `null`
* Returns: [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

Returns the number of `bytesRead`.

For detailed information, see the documentation of the asynchronous version of
this API: [`fs.read()`][].

#### <DataTag tag="M" /> `fs.readSync(fd, buffer[, options])`

<Metadata version="v16.18.1" data={{"changes":[{"version":["v13.13.0","v12.17.0"],"pr-url":"https://github.com/nodejs/node/pull/32460","description":"Options object can be passed in to make offset, length, and position optional."}],"update":{"type":"added","version":["v13.13.0","v12.17.0"]}}} />

* `fd` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
* `buffer` [`Buffer`](/api/buffer#buffer) | [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`DataView`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView)
* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `offset` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `0`
  * `length` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `buffer.byteLength - offset`
  * `position` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [`bigint`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) | [`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type) **Default:** `null`
* Returns: [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

Returns the number of `bytesRead`.

Similar to the above `fs.readSync` function, this version takes an optional `options` object.
If no `options` object is specified, it will default with the above values.

For detailed information, see the documentation of the asynchronous version of
this API: [`fs.read()`][].

#### <DataTag tag="M" /> `fs.readvSync(fd, buffers[, position])`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v13.13.0","v12.17.0"]}}} />

* `fd` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
* `buffers` ArrayBufferView\[]
* `position` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type) **Default:** `null`
* Returns: [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The number of bytes read.

For detailed information, see the documentation of the asynchronous version of
this API: [`fs.readv()`][].

#### <DataTag tag="M" /> `fs.realpathSync(path[, options])`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v8.0.0","pr-url":"https://github.com/nodejs/node/pull/13028","description":"Pipe/Socket resolve support was added."},{"version":"v7.6.0","pr-url":"https://github.com/nodejs/node/pull/10739","description":"The `path` parameter can be a WHATWG `URL` object using `file:` protocol."},{"version":"v6.4.0","pr-url":"https://github.com/nodejs/node/pull/7899","description":"Calling `realpathSync` now works again for various edge cases on Windows."},{"version":"v6.0.0","pr-url":"https://github.com/nodejs/node/pull/3594","description":"The `cache` parameter was removed."}],"update":{"type":"added","version":["v0.1.31"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `options` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `encoding` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) **Default:** `'utf8'`
* Returns: [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer)

Returns the resolved pathname.

For detailed information, see the documentation of the asynchronous version of
this API: [`fs.realpath()`][].

#### <DataTag tag="M" /> `fs.realpathSync.native(path[, options])`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v9.2.0"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `options` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `encoding` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) **Default:** `'utf8'`
* Returns: [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer)

Synchronous realpath(3).

Only paths that can be converted to UTF8 strings are supported.

The optional `options` argument can be a string specifying an encoding, or an
object with an `encoding` property specifying the character encoding to use for
the path returned. If the `encoding` is set to `'buffer'`,
the path returned will be passed as a [`Buffer`](/api/buffer#buffer) object.

On Linux, when Node.js is linked against musl libc, the procfs file system must
be mounted on `/proc` in order for this function to work. Glibc does not have
this restriction.

#### <DataTag tag="M" /> `fs.renameSync(oldPath, newPath)`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v7.6.0","pr-url":"https://github.com/nodejs/node/pull/10739","description":"The `oldPath` and `newPath` parameters can be WHATWG `URL` objects using `file:` protocol. Support is currently still *experimental*."}],"update":{"type":"added","version":["v0.1.21"]}}} />

* `oldPath` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `newPath` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)

Renames the file from `oldPath` to `newPath`. Returns `undefined`.

See the POSIX rename(2) documentation for more details.

#### <DataTag tag="M" /> `fs.rmdirSync(path[, options])`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v16.0.0","pr-url":"https://github.com/nodejs/node/pull/37216","description":"Using `fs.rmdirSync(path, { recursive: true })` on a `path` that is a file is no longer permitted and results in an `ENOENT` error on Windows and an `ENOTDIR` error on POSIX."},{"version":"v16.0.0","pr-url":"https://github.com/nodejs/node/pull/37216","description":"Using `fs.rmdirSync(path, { recursive: true })` on a `path` that does not exist is no longer permitted and results in a `ENOENT` error."},{"version":"v16.0.0","pr-url":"https://github.com/nodejs/node/pull/37302","description":"The `recursive` option is deprecated, using it triggers a deprecation warning."},{"version":"v14.14.0","pr-url":"https://github.com/nodejs/node/pull/35579","description":"The `recursive` option is deprecated, use `fs.rmSync` instead."},{"version":["v13.3.0","v12.16.0"],"pr-url":"https://github.com/nodejs/node/pull/30644","description":"The `maxBusyTries` option is renamed to `maxRetries`, and its default is 0. The `emfileWait` option has been removed, and `EMFILE` errors use the same retry logic as other errors. The `retryDelay` option is now supported. `ENFILE` errors are now retried."},{"version":"v12.10.0","pr-url":"https://github.com/nodejs/node/pull/29168","description":"The `recursive`, `maxBusyTries`, and `emfileWait` options are now supported."},{"version":"v7.6.0","pr-url":"https://github.com/nodejs/node/pull/10739","description":"The `path` parameters can be a WHATWG `URL` object using `file:` protocol."}],"update":{"type":"added","version":["v0.1.21"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `maxRetries` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) If an `EBUSY`, `EMFILE`, `ENFILE`, `ENOTEMPTY`, or
    `EPERM` error is encountered, Node.js retries the operation with a linear
    backoff wait of `retryDelay` milliseconds longer on each try. This option
    represents the number of retries. This option is ignored if the `recursive`
    option is not `true`. **Default:** `0`.
  * `recursive` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) If `true`, perform a recursive directory removal. In
    recursive mode, operations are retried on failure. **Default:** `false`.
    **Deprecated.**
  * `retryDelay` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The amount of time in milliseconds to wait between
    retries. This option is ignored if the `recursive` option is not `true`.
    **Default:** `100`.

Synchronous rmdir(2). Returns `undefined`.

Using `fs.rmdirSync()` on a file (not a directory) results in an `ENOENT` error
on Windows and an `ENOTDIR` error on POSIX.

To get a behavior similar to the `rm -rf` Unix command, use [`fs.rmSync()`][]
with options `{ recursive: true, force: true }`.

#### <DataTag tag="M" /> `fs.rmSync(path[, options])`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v16.14.0","pr-url":"https://github.com/nodejs/node/pull/41132","description":"The `path` parameter can be a WHATWG `URL` object using `file:` protocol."}],"update":{"type":"added","version":["v14.14.0"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `force` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) When `true`, exceptions will be ignored if `path` does
    not exist. **Default:** `false`.
  * `maxRetries` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) If an `EBUSY`, `EMFILE`, `ENFILE`, `ENOTEMPTY`, or
    `EPERM` error is encountered, Node.js will retry the operation with a linear
    backoff wait of `retryDelay` milliseconds longer on each try. This option
    represents the number of retries. This option is ignored if the `recursive`
    option is not `true`. **Default:** `0`.
  * `recursive` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) If `true`, perform a recursive directory removal. In
    recursive mode operations are retried on failure. **Default:** `false`.
  * `retryDelay` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The amount of time in milliseconds to wait between
    retries. This option is ignored if the `recursive` option is not `true`.
    **Default:** `100`.

Synchronously removes files and directories (modeled on the standard POSIX `rm`
utility). Returns `undefined`.

#### <DataTag tag="M" /> `fs.statSync(path[, options])`

<Metadata version="v16.18.1" data={{"changes":[{"version":["v15.3.0","v14.17.0"],"pr-url":"https://github.com/nodejs/node/pull/33716","description":"Accepts a `throwIfNoEntry` option to specify whether an exception should be thrown if the entry does not exist."},{"version":"v10.5.0","pr-url":"https://github.com/nodejs/node/pull/20220","description":"Accepts an additional `options` object to specify whether the numeric values returned should be bigint."},{"version":"v7.6.0","pr-url":"https://github.com/nodejs/node/pull/10739","description":"The `path` parameter can be a WHATWG `URL` object using `file:` protocol."}],"update":{"type":"added","version":["v0.1.21"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `bigint` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) Whether the numeric values in the returned
    [`fs.Stats`](/api/fs#fsstats) object should be `bigint`. **Default:** `false`.
  * `throwIfNoEntry` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) Whether an exception will be thrown
    if no file system entry exists, rather than returning `undefined`.
    **Default:** `true`.
* Returns: [`fs.Stats`](/api/fs#fsstats)

Retrieves the [`fs.Stats`](/api/fs#fsstats) for the path.

#### <DataTag tag="M" /> `fs.symlinkSync(target, path[, type])`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v12.0.0","pr-url":"https://github.com/nodejs/node/pull/23724","description":"If the `type` argument is left undefined, Node will autodetect `target` type and automatically select `dir` or `file`."},{"version":"v7.6.0","pr-url":"https://github.com/nodejs/node/pull/10739","description":"The `target` and `path` parameters can be WHATWG `URL` objects using `file:` protocol. Support is currently still *experimental*."}],"update":{"type":"added","version":["v0.1.31"]}}} />

* `target` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `type` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type) **Default:** `null`

Returns `undefined`.

For detailed information, see the documentation of the asynchronous version of
this API: [`fs.symlink()`][].

#### <DataTag tag="M" /> `fs.truncateSync(path[, len])`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v0.8.6"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `len` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `0`

Truncates the file. Returns `undefined`. A file descriptor can also be
passed as the first argument. In this case, `fs.ftruncateSync()` is called.

Passing a file descriptor is deprecated and may result in an error being thrown
in the future.

#### <DataTag tag="M" /> `fs.unlinkSync(path)`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v7.6.0","pr-url":"https://github.com/nodejs/node/pull/10739","description":"The `path` parameter can be a WHATWG `URL` object using `file:` protocol."}],"update":{"type":"added","version":["v0.1.21"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)

Synchronous unlink(2). Returns `undefined`.

#### <DataTag tag="M" /> `fs.utimesSync(path, atime, mtime)`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v8.0.0","pr-url":"https://github.com/nodejs/node/pull/11919","description":"`NaN`, `Infinity`, and `-Infinity` are no longer valid time specifiers."},{"version":"v7.6.0","pr-url":"https://github.com/nodejs/node/pull/10739","description":"The `path` parameter can be a WHATWG `URL` object using `file:` protocol."},{"version":"v4.1.0","pr-url":"https://github.com/nodejs/node/pull/2387","description":"Numeric strings, `NaN`, and `Infinity` are now allowed time specifiers."}],"update":{"type":"added","version":["v0.4.2"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api)
* `atime` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
* `mtime` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)

Returns `undefined`.

For detailed information, see the documentation of the asynchronous version of
this API: [`fs.utimes()`][].

#### <DataTag tag="M" /> `fs.writeFileSync(file, data[, options])`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v14.12.0","pr-url":"https://github.com/nodejs/node/pull/34993","description":"The `data` parameter will stringify an object with an explicit `toString` function."},{"version":"v14.0.0","pr-url":"https://github.com/nodejs/node/pull/31030","description":"The `data` parameter won't coerce unsupported input to strings anymore."},{"version":"v10.10.0","pr-url":"https://github.com/nodejs/node/pull/22150","description":"The `data` parameter can now be any `TypedArray` or a `DataView`."},{"version":"v7.4.0","pr-url":"https://github.com/nodejs/node/pull/10382","description":"The `data` parameter can now be a `Uint8Array`."},{"version":"v5.0.0","pr-url":"https://github.com/nodejs/node/pull/3163","description":"The `file` parameter can be a file descriptor now."}],"update":{"type":"added","version":["v0.1.29"]}}} />

* `file` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`URL`](/api/url#the-whatwg-url-api) | [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) filename or file descriptor
* `data` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) | [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`DataView`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView) | [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
  * `encoding` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type) **Default:** `'utf8'`
  * `mode` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `0o666`
  * `flag` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) See [support of file system `flags`][]. **Default:** `'w'`.

Returns `undefined`.

If `data` is a plain object, it must have an own (not inherited) `toString`
function property.

The `mode` option only affects the newly created file. See [`fs.open()`][]
for more details.

For detailed information, see the documentation of the asynchronous version of
this API: [`fs.writeFile()`][].

#### <DataTag tag="M" /> `fs.writeSync(fd, buffer, offset[, length[, position]])`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v14.0.0","pr-url":"https://github.com/nodejs/node/pull/31030","description":"The `buffer` parameter won't coerce unsupported input to strings anymore."},{"version":"v10.10.0","pr-url":"https://github.com/nodejs/node/pull/22150","description":"The `buffer` parameter can now be any `TypedArray` or a `DataView`."},{"version":"v7.4.0","pr-url":"https://github.com/nodejs/node/pull/10382","description":"The `buffer` parameter can now be a `Uint8Array`."},{"version":"v7.2.0","pr-url":"https://github.com/nodejs/node/pull/7856","description":"The `offset` and `length` parameters are optional now."}],"update":{"type":"added","version":["v0.1.21"]}}} />

* `fd` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
* `buffer` [`Buffer`](/api/buffer#buffer) | [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`DataView`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView)
* `offset` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `0`
* `length` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `buffer.byteLength - offset`
* `position` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type) **Default:** `null`
* Returns: [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The number of bytes written.

For detailed information, see the documentation of the asynchronous version of
this API: [`fs.write(fd, buffer...)`][].

#### <DataTag tag="M" /> `fs.writeSync(fd, buffer[, options])`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v16.17.0"]}}} />

* `fd` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
* `buffer` [`Buffer`](/api/buffer#buffer) | [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`DataView`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView)
* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `offset` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `0`
  * `length` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `buffer.byteLength - offset`
  * `position` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `null`
* Returns: [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The number of bytes written.

For detailed information, see the documentation of the asynchronous version of
this API: [`fs.write(fd, buffer...)`][].

#### <DataTag tag="M" /> `fs.writeSync(fd, string[, position[, encoding]])`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v14.0.0","pr-url":"https://github.com/nodejs/node/pull/31030","description":"The `string` parameter won't coerce unsupported input to strings anymore."},{"version":"v7.2.0","pr-url":"https://github.com/nodejs/node/pull/7856","description":"The `position` parameter is optional now."}],"update":{"type":"added","version":["v0.11.5"]}}} />

* `fd` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
* `string` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
* `position` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type) **Default:** `null`
* `encoding` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) **Default:** `'utf8'`
* Returns: [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The number of bytes written.

For detailed information, see the documentation of the asynchronous version of
this API: [`fs.write(fd, string...)`][].

#### <DataTag tag="M" /> `fs.writevSync(fd, buffers[, position])`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v12.9.0"]}}} />

* `fd` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
* `buffers` ArrayBufferView\[]
* `position` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type) **Default:** `null`
* Returns: [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The number of bytes written.

For detailed information, see the documentation of the asynchronous version of
this API: [`fs.writev()`][].

### Common Objects

The common objects are shared by all of the file system API variants
(promise, callback, and synchronous).

#### <DataTag tag="C" /> `fs.Dir`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v12.12.0"]}}} />

A class representing a directory stream.

Created by [`fs.opendir()`][], [`fs.opendirSync()`][], or
[`fsPromises.opendir()`][].

```mjs
import { opendir } from 'node:fs/promises';

try {
  const dir = await opendir('./');
  for await (const dirent of dir)
    console.log(dirent.name);
} catch (err) {
  console.error(err);
}
```

When using the async iterator, the [`fs.Dir`](/api/fs#fsdir) object will be automatically
closed after the iterator exits.

##### <DataTag tag="M" /> `dir.close()`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v12.12.0"]}}} />

* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Asynchronously close the directory's underlying resource handle.
Subsequent reads will result in errors.

A promise is returned that will be resolved after the resource has been
closed.

##### <DataTag tag="M" /> `dir.close(callback)`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v12.12.0"]}}} />

* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `err` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

Asynchronously close the directory's underlying resource handle.
Subsequent reads will result in errors.

The `callback` will be called after the resource handle has been closed.

##### <DataTag tag="M" /> `dir.closeSync()`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v12.12.0"]}}} />

Synchronously close the directory's underlying resource handle.
Subsequent reads will result in errors.

##### <DataTag tag="M" /> `dir.path`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v12.12.0"]}}} />

* [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

The read-only path of this directory as was provided to [`fs.opendir()`][],
[`fs.opendirSync()`][], or [`fsPromises.opendir()`][].

##### <DataTag tag="M" /> `dir.read()`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v12.12.0"]}}} />

* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) containing [`fs.Dirent`](/api/fs#fsdirent) | [`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type)

Asynchronously read the next directory entry via readdir(3) as an
[`fs.Dirent`](/api/fs#fsdirent).

A promise is returned that will be resolved with an [`fs.Dirent`](/api/fs#fsdirent), or `null`
if there are no more directory entries to read.

Directory entries returned by this function are in no particular order as
provided by the operating system's underlying directory mechanisms.
Entries added or removed while iterating over the directory might not be
included in the iteration results.

##### <DataTag tag="M" /> `dir.read(callback)`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v12.12.0"]}}} />

* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `err` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
  * `dirent` [`fs.Dirent`](/api/fs#fsdirent) | [`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type)

Asynchronously read the next directory entry via readdir(3) as an
[`fs.Dirent`](/api/fs#fsdirent).

After the read is completed, the `callback` will be called with an
[`fs.Dirent`](/api/fs#fsdirent), or `null` if there are no more directory entries to read.

Directory entries returned by this function are in no particular order as
provided by the operating system's underlying directory mechanisms.
Entries added or removed while iterating over the directory might not be
included in the iteration results.

##### <DataTag tag="M" /> `dir.readSync()`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v12.12.0"]}}} />

* Returns: [`fs.Dirent`](/api/fs#fsdirent) | [`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type)

Synchronously read the next directory entry as an [`fs.Dirent`](/api/fs#fsdirent). See the
POSIX readdir(3) documentation for more detail.

If there are no more directory entries to read, `null` will be returned.

Directory entries returned by this function are in no particular order as
provided by the operating system's underlying directory mechanisms.
Entries added or removed while iterating over the directory might not be
included in the iteration results.

##### <DataTag tag="M" /> `dir[Symbol.asyncIterator]()`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v12.12.0"]}}} />

* Returns: [`AsyncIterator`](https://tc39.github.io/ecma262/#sec-asynciterator-interface) of [`fs.Dirent`](/api/fs#fsdirent)

Asynchronously iterates over the directory until all entries have
been read. Refer to the POSIX readdir(3) documentation for more detail.

Entries returned by the async iterator are always an [`fs.Dirent`](/api/fs#fsdirent).
The `null` case from `dir.read()` is handled internally.

See [`fs.Dir`](/api/fs#fsdir) for an example.

Directory entries returned by this iterator are in no particular order as
provided by the operating system's underlying directory mechanisms.
Entries added or removed while iterating over the directory might not be
included in the iteration results.

#### <DataTag tag="C" /> `fs.Dirent`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v10.10.0"]}}} />

A representation of a directory entry, which can be a file or a subdirectory
within the directory, as returned by reading from an [`fs.Dir`](/api/fs#fsdir). The
directory entry is a combination of the file name and file type pairs.

Additionally, when [`fs.readdir()`][] or [`fs.readdirSync()`][] is called with
the `withFileTypes` option set to `true`, the resulting array is filled with
[`fs.Dirent`](/api/fs#fsdirent) objects, rather than strings or [`Buffer`](/api/buffer#buffer)s.

##### <DataTag tag="M" /> `dirent.isBlockDevice()`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v10.10.0"]}}} />

* Returns: [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Returns `true` if the [`fs.Dirent`](/api/fs#fsdirent) object describes a block device.

##### <DataTag tag="M" /> `dirent.isCharacterDevice()`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v10.10.0"]}}} />

* Returns: [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Returns `true` if the [`fs.Dirent`](/api/fs#fsdirent) object describes a character device.

##### <DataTag tag="M" /> `dirent.isDirectory()`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v10.10.0"]}}} />

* Returns: [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Returns `true` if the [`fs.Dirent`](/api/fs#fsdirent) object describes a file system
directory.

##### <DataTag tag="M" /> `dirent.isFIFO()`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v10.10.0"]}}} />

* Returns: [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Returns `true` if the [`fs.Dirent`](/api/fs#fsdirent) object describes a first-in-first-out
(FIFO) pipe.

##### <DataTag tag="M" /> `dirent.isFile()`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v10.10.0"]}}} />

* Returns: [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Returns `true` if the [`fs.Dirent`](/api/fs#fsdirent) object describes a regular file.

##### <DataTag tag="M" /> `dirent.isSocket()`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v10.10.0"]}}} />

* Returns: [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Returns `true` if the [`fs.Dirent`](/api/fs#fsdirent) object describes a socket.

##### <DataTag tag="M" /> `dirent.isSymbolicLink()`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v10.10.0"]}}} />

* Returns: [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Returns `true` if the [`fs.Dirent`](/api/fs#fsdirent) object describes a symbolic link.

##### <DataTag tag="M" /> `dirent.name`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v10.10.0"]}}} />

* [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer)

The file name that this [`fs.Dirent`](/api/fs#fsdirent) object refers to. The type of this
value is determined by the `options.encoding` passed to [`fs.readdir()`][] or
[`fs.readdirSync()`][].

#### <DataTag tag="C" /> `fs.FSWatcher`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v0.5.8"]}}} />

* Extends [`EventEmitter`](/api/events#eventemitter)

A successful call to [`fs.watch()`][] method will return a new [`fs.FSWatcher`](/api/fs#fsfswatcher)
object.

All [`fs.FSWatcher`](/api/fs#fsfswatcher) objects emit a `'change'` event whenever a specific watched
file is modified.

##### <DataTag tag="E" /> `'change'`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v0.5.8"]}}} />

* `eventType` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) The type of change event that has occurred
* `filename` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer) The filename that changed (if relevant/available)

Emitted when something changes in a watched directory or file.
See more details in [`fs.watch()`][].

The `filename` argument may not be provided depending on operating system
support. If `filename` is provided, it will be provided as a [`Buffer`](/api/buffer#buffer) if
`fs.watch()` is called with its `encoding` option set to `'buffer'`, otherwise
`filename` will be a UTF-8 string.

```mjs
import { watch } from 'node:fs';
// Example when handled through fs.watch() listener
watch('./tmp', { encoding: 'buffer' }, (eventType, filename) => {
  if (filename) {
    console.log(filename);
    // Prints: <Buffer ...>
  }
});
```

##### <DataTag tag="E" /> `'close'`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v10.0.0"]}}} />

Emitted when the watcher stops watching for changes. The closed
[`fs.FSWatcher`](/api/fs#fsfswatcher) object is no longer usable in the event handler.

##### <DataTag tag="E" /> `'error'`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v0.5.8"]}}} />

* `error` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

Emitted when an error occurs while watching the file. The errored
[`fs.FSWatcher`](/api/fs#fsfswatcher) object is no longer usable in the event handler.

##### <DataTag tag="M" /> `watcher.close()`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v0.5.8"]}}} />

Stop watching for changes on the given [`fs.FSWatcher`](/api/fs#fsfswatcher). Once stopped, the
[`fs.FSWatcher`](/api/fs#fsfswatcher) object is no longer usable.

##### <DataTag tag="M" /> `watcher.ref()`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v14.3.0","v12.20.0"]}}} />

* Returns: [`fs.FSWatcher`](/api/fs#fsfswatcher)

When called, requests that the Node.js event loop _not_ exit so long as the
[`fs.FSWatcher`](/api/fs#fsfswatcher) is active. Calling `watcher.ref()` multiple times will have
no effect.

By default, all [`fs.FSWatcher`](/api/fs#fsfswatcher) objects are "ref'ed", making it normally
unnecessary to call `watcher.ref()` unless `watcher.unref()` had been
called previously.

##### <DataTag tag="M" /> `watcher.unref()`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v14.3.0","v12.20.0"]}}} />

* Returns: [`fs.FSWatcher`](/api/fs#fsfswatcher)

When called, the active [`fs.FSWatcher`](/api/fs#fsfswatcher) object will not require the Node.js
event loop to remain active. If there is no other activity keeping the
event loop running, the process may exit before the [`fs.FSWatcher`](/api/fs#fsfswatcher) object's
callback is invoked. Calling `watcher.unref()` multiple times will have
no effect.

#### <DataTag tag="C" /> `fs.StatWatcher`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v14.3.0","v12.20.0"]}}} />

* Extends [`EventEmitter`](/api/events#eventemitter)

A successful call to `fs.watchFile()` method will return a new [`fs.StatWatcher`](/api/fs#fsstatwatcher)
object.

##### <DataTag tag="M" /> `watcher.ref()`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v14.3.0","v12.20.0"]}}} />

* Returns: [`fs.StatWatcher`](/api/fs#fsstatwatcher)

When called, requests that the Node.js event loop _not_ exit so long as the
[`fs.StatWatcher`](/api/fs#fsstatwatcher) is active. Calling `watcher.ref()` multiple times will have
no effect.

By default, all [`fs.StatWatcher`](/api/fs#fsstatwatcher) objects are "ref'ed", making it normally
unnecessary to call `watcher.ref()` unless `watcher.unref()` had been
called previously.

##### <DataTag tag="M" /> `watcher.unref()`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v14.3.0","v12.20.0"]}}} />

* Returns: [`fs.StatWatcher`](/api/fs#fsstatwatcher)

When called, the active [`fs.StatWatcher`](/api/fs#fsstatwatcher) object will not require the Node.js
event loop to remain active. If there is no other activity keeping the
event loop running, the process may exit before the [`fs.StatWatcher`](/api/fs#fsstatwatcher) object's
callback is invoked. Calling `watcher.unref()` multiple times will have
no effect.

#### <DataTag tag="C" /> `fs.ReadStream`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v0.1.93"]}}} />

* Extends: [`stream.Readable`](/api/stream#streamreadable)

Instances of [`fs.ReadStream`](/api/fs#fsreadstream) are created and returned using the
[`fs.createReadStream()`][] function.

##### <DataTag tag="E" /> `'close'`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v0.1.93"]}}} />

Emitted when the [`fs.ReadStream`](/api/fs#fsreadstream)'s underlying file descriptor has been closed.

##### <DataTag tag="E" /> `'open'`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v0.1.93"]}}} />

* `fd` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) Integer file descriptor used by the [`fs.ReadStream`](/api/fs#fsreadstream).

Emitted when the [`fs.ReadStream`](/api/fs#fsreadstream)'s file descriptor has been opened.

##### <DataTag tag="E" /> `'ready'`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v9.11.0"]}}} />

Emitted when the [`fs.ReadStream`](/api/fs#fsreadstream) is ready to be used.

Fires immediately after `'open'`.

##### <DataTag tag="M" /> `readStream.bytesRead`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v6.4.0"]}}} />

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

The number of bytes that have been read so far.

##### <DataTag tag="M" /> `readStream.path`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v0.1.93"]}}} />

* [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/buffer#buffer)

The path to the file the stream is reading from as specified in the first
argument to `fs.createReadStream()`. If `path` is passed as a string, then
`readStream.path` will be a string. If `path` is passed as a [`Buffer`](/api/buffer#buffer), then
`readStream.path` will be a [`Buffer`](/api/buffer#buffer). If `fd` is specified, then
`readStream.path` will be `undefined`.

##### <DataTag tag="M" /> `readStream.pending`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v11.2.0","v10.16.0"]}}} />

* [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

This property is `true` if the underlying file has not been opened yet,
i.e. before the `'ready'` event is emitted.

#### <DataTag tag="C" /> `fs.Stats`

<Metadata version="v16.18.1" data={{"changes":[{"version":"v8.1.0","pr-url":"https://github.com/nodejs/node/pull/13173","description":"Added times as numbers."}],"update":{"type":"added","version":["v0.1.21"]}}} />

A [`fs.Stats`](/api/fs#fsstats) object provides information about a file.

Objects returned from [`fs.stat()`][], [`fs.lstat()`][], [`fs.fstat()`][], and
their synchronous counterparts are of this type.
If `bigint` in the `options` passed to those methods is true, the numeric values
will be `bigint` instead of `number`, and the object will contain additional
nanosecond-precision properties suffixed with `Ns`.

```console
Stats {
  dev: 2114,
  ino: 48064969,
  mode: 33188,
  nlink: 1,
  uid: 85,
  gid: 100,
  rdev: 0,
  size: 527,
  blksize: 4096,
  blocks: 8,
  atimeMs: 1318289051000.1,
  mtimeMs: 1318289051000.1,
  ctimeMs: 1318289051000.1,
  birthtimeMs: 1318289051000.1,
  atime: Mon, 10 Oct 2011 23:24:11 GMT,
  mtime: Mon, 10 Oct 2011 23:24:11 GMT,
  ctime: Mon, 10 Oct 2011 23:24:11 GMT,
  birthtime: Mon, 10 Oct 2011 23:24:11 GMT }
```

`bigint` version:

```console
BigIntStats {
  dev: 2114n,
  ino: 48064969n,
  mode: 33188n,
  nlink: 1n,
  uid: 85n,
  gid: 100n,
  rdev: 0n,
  size: 527n,
  blksize: 4096n,
  blocks: 8n,
  atimeMs: 1318289051000n,
  mtimeMs: 1318289051000n,
  ctimeMs: 1318289051000n,
  birthtimeMs: 1318289051000n,
  atimeNs: 1318289051000000000n,
  mtimeNs: 1318289051000000000n,
  ctimeNs: 1318289051000000000n,
  birthtimeNs: 1318289051000000000n,
  atime: Mon, 10 Oct 2011 23:24:11 GMT,
  mtime: Mon, 10 Oct 2011 23:24:11 GMT,
  ctime: Mon, 10 Oct 2011 23:24:11 GMT,
  birthtime: Mon, 10 Oct 2011 23:24:11 GMT }
```

##### <DataTag tag="M" /> `stats.isBlockDevice()`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v0.1.10"]}}} />

* Returns: [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Returns `true` if the [`fs.Stats`](/api/fs#fsstats) object describes a block device.

##### <DataTag tag="M" /> `stats.isCharacterDevice()`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v0.1.10"]}}} />

* Returns: [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Returns `true` if the [`fs.Stats`](/api/fs#fsstats) object describes a character device.

##### <DataTag tag="M" /> `stats.isDirectory()`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v0.1.10"]}}} />

* Returns: [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Returns `true` if the [`fs.Stats`](/api/fs#fsstats) object describes a file system directory.

If the [`fs.Stats`](/api/fs#fsstats) object was obtained from [`fs.lstat()`][], this method will
always return `false`. This is because [`fs.lstat()`][] returns information
about a symbolic link itself and not the path it resolves to.

##### <DataTag tag="M" /> `stats.isFIFO()`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v0.1.10"]}}} />

* Returns: [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Returns `true` if the [`fs.Stats`](/api/fs#fsstats) object describes a first-in-first-out (FIFO)
pipe.

##### <DataTag tag="M" /> `stats.isFile()`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v0.1.10"]}}} />

* Returns: [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Returns `true` if the [`fs.Stats`](/api/fs#fsstats) object describes a regular file.

##### <DataTag tag="M" /> `stats.isSocket()`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v0.1.10"]}}} />

* Returns: [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Returns `true` if the [`fs.Stats`](/api/fs#fsstats) object describes a socket.

##### <DataTag tag="M" /> `stats.isSymbolicLink()`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v0.1.10"]}}} />

* Returns: [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Returns `true` if the [`fs.Stats`](/api/fs#fsstats) object describes a symbolic link.

This method is only valid when using [`fs.lstat()`][].

##### <DataTag tag="M" /> `stats.dev`

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [`bigint`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

The numeric identifier of the device containing the file.

##### <DataTag tag="M" /> `stats.ino`

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [`bigint`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

The file system specific "Inode" number for the file.

##### <DataTag tag="M" /> `stats.mode`

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [`bigint`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

A bit-field describing the file type and mode.

##### <DataTag tag="M" /> `stats.nlink`

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [`bigint`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

The number of hard-links that exist for the file.

##### <DataTag tag="M" /> `stats.uid`

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [`bigint`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

The numeric user identifier of the user that owns the file (POSIX).

##### <DataTag tag="M" /> `stats.gid`

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [`bigint`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

The numeric group identifier of the group that owns the file (POSIX).

##### <DataTag tag="M" /> `stats.rdev`

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [`bigint`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

A numeric device identifier if the file represents a device.

##### <DataTag tag="M" /> `stats.size`

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [`bigint`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

The size of the file in bytes.

If the underlying file system does not support getting the size of the file,
this will be `0`.

##### <DataTag tag="M" /> `stats.blksize`

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [`bigint`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

The file system block size for i/o operations.

##### <DataTag tag="M" /> `stats.blocks`

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [`bigint`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

The number of blocks allocated for this file.

##### <DataTag tag="M" /> `stats.atimeMs`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v8.1.0"]}}} />

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [`bigint`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

The timestamp indicating the last time this file was accessed expressed in
milliseconds since the POSIX Epoch.

##### <DataTag tag="M" /> `stats.mtimeMs`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v8.1.0"]}}} />

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [`bigint`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

The timestamp indicating the last time this file was modified expressed in
milliseconds since the POSIX Epoch.

##### <DataTag tag="M" /> `stats.ctimeMs`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v8.1.0"]}}} />

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [`bigint`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

The timestamp indicating the last time the file status was changed expressed
in milliseconds since the POSIX Epoch.

##### <DataTag tag="M" /> `stats.birthtimeMs`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v8.1.0"]}}} />

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [`bigint`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

The timestamp indicating the creation time of this file expressed in
milliseconds since the POSIX Epoch.

##### <DataTag tag="M" /> `stats.atimeNs`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v12.10.0"]}}} />

* [`bigint`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

Only present when `bigint: true` is passed into the method that generates
the object.
The timestamp indicating the last time this file was accessed expressed in
nanoseconds since the POSIX Epoch.

##### <DataTag tag="M" /> `stats.mtimeNs`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v12.10.0"]}}} />

* [`bigint`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

Only present when `bigint: true` is passed into the method that generates
the object.
The timestamp indicating the last time this file was modified expressed in
nanoseconds since the POSIX Epoch.

##### <DataTag tag="M" /> `stats.ctimeNs`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v12.10.0"]}}} />

* [`bigint`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

Only present when `bigint: true` is passed into the method that generates
the object.
The timestamp indicating the last time the file status was changed expressed
in nanoseconds since the POSIX Epoch.

##### <DataTag tag="M" /> `stats.birthtimeNs`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v12.10.0"]}}} />

* [`bigint`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

Only present when `bigint: true` is passed into the method that generates
the object.
The timestamp indicating the creation time of this file expressed in
nanoseconds since the POSIX Epoch.

##### <DataTag tag="M" /> `stats.atime`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v0.11.13"]}}} />

* [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)

The timestamp indicating the last time this file was accessed.

##### <DataTag tag="M" /> `stats.mtime`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v0.11.13"]}}} />

* [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)

The timestamp indicating the last time this file was modified.

##### <DataTag tag="M" /> `stats.ctime`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v0.11.13"]}}} />

* [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)

The timestamp indicating the last time the file status was changed.

##### <DataTag tag="M" /> `stats.birthtime`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v0.11.13"]}}} />

* [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)

The timestamp indicating the creation time of this file.

##### Stat time values

The `atimeMs`, `mtimeMs`, `ctimeMs`, `birthtimeMs` properties are
numeric values that hold the corresponding times in milliseconds. Their
precision is platform specific. When `bigint: true` is passed into the
method that generates the object, the properties will be [bigints][],
otherwise they will be [numbers][MDN-Number].

The `atimeNs`, `mtimeNs`, `ctimeNs`, `birthtimeNs` properties are
[bigints][] that hold the corresponding times in nanoseconds. They are
only present when `bigint: true` is passed into the method that generates
the object. Their precision is platform specific.

`atime`, `mtime`, `ctime`, and `birthtime` are
[`Date`][MDN-Date] object alternate representations of the various times. The
`Date` and number values are not connected. Assigning a new number value, or
mutating the `Date` value, will not be reflected in the corresponding alternate
representation.

The times in the stat object have the following semantics:

* `atime` "Access Time": Time when file data last accessed. Changed
  by the mknod(2), utimes(2), and read(2) system calls.
* `mtime` "Modified Time": Time when file data last modified.
  Changed by the mknod(2), utimes(2), and write(2) system calls.
* `ctime` "Change Time": Time when file status was last changed
  (inode data modification). Changed by the chmod(2), chown(2),
  link(2), mknod(2), rename(2), unlink(2), utimes(2),
  read(2), and write(2) system calls.
* `birthtime` "Birth Time": Time of file creation. Set once when the
  file is created. On filesystems where birthtime is not available,
  this field may instead hold either the `ctime` or
  `1970-01-01T00:00Z` (ie, Unix epoch timestamp `0`). This value may be greater
  than `atime` or `mtime` in this case. On Darwin and other FreeBSD variants,
  also set if the `atime` is explicitly set to an earlier value than the current
  `birthtime` using the utimes(2) system call.

Prior to Node.js 0.12, the `ctime` held the `birthtime` on Windows systems. As
of 0.12, `ctime` is not "creation time", and on Unix systems, it never was.

#### <DataTag tag="C" /> `fs.WriteStream`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v0.1.93"]}}} />

* Extends [`stream.Writable`](/api/stream#streamwritable)

Instances of [`fs.WriteStream`](/api/fs#fswritestream) are created and returned using the
[`fs.createWriteStream()`][] function.

##### <DataTag tag="E" /> `'close'`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v0.1.93"]}}} />

Emitted when the [`fs.WriteStream`](/api/fs#fswritestream)'s underlying file descriptor has been closed.

##### <DataTag tag="E" /> `'open'`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v0.1.93"]}}} />

* `fd` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) Integer file descriptor used by the [`fs.WriteStream`](/api/fs#fswritestream).

Emitted when the [`fs.WriteStream`](/api/fs#fswritestream)'s file is opened.

##### <DataTag tag="E" /> `'ready'`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v9.11.0"]}}} />

Emitted when the [`fs.WriteStream`](/api/fs#fswritestream) is ready to be used.

Fires immediately after `'open'`.

##### <DataTag tag="M" /> `writeStream.bytesWritten`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v0.4.7"]}}} />

The number of bytes written so far. Does not include data that is still queued
for writing.

##### <DataTag tag="M" /> `writeStream.close([callback])`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v0.9.4"]}}} />

* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `err` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

Closes `writeStream`. Optionally accepts a
callback that will be executed once the `writeStream`
is closed.

##### <DataTag tag="M" /> `writeStream.path`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v0.1.93"]}}} />

The path to the file the stream is writing to as specified in the first
argument to [`fs.createWriteStream()`][]. If `path` is passed as a string, then
`writeStream.path` will be a string. If `path` is passed as a [`Buffer`](/api/buffer#buffer), then
`writeStream.path` will be a [`Buffer`](/api/buffer#buffer).

##### <DataTag tag="M" /> `writeStream.pending`

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v11.2.0"]}}} />

* [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

This property is `true` if the underlying file has not been opened yet,
i.e. before the `'ready'` event is emitted.

#### <DataTag tag="M" /> `fs.constants`

* [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

Returns an object containing commonly used constants for file system
operations.

##### FS constants

The following constants are exported by `fs.constants` and `fsPromises.constants`.

Not every constant will be available on every operating system;
this is especially important for Windows, where many of the POSIX specific
definitions are not available.
For portable applications it is recommended to check for their presence
before use.

To use more than one constant, use the bitwise OR `|` operator.

Example:

```mjs
import { open, constants } from 'node:fs';

const {
  O_RDWR,
  O_CREAT,
  O_EXCL
} = constants;

open('/path/to/my/file', O_RDWR | O_CREAT | O_EXCL, (err, fd) => {
  // ...
});
```

###### File access constants

The following constants are meant for use as the `mode` parameter passed to
[`fsPromises.access()`][], [`fs.access()`][], and [`fs.accessSync()`][].

<table>
  <tr>
    <th>Constant</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>F_OK</code></td>
    <td>Flag indicating that the file is visible to the calling process.
     This is useful for determining if a file exists, but says nothing
     about <code>rwx</code> permissions. Default if no mode is specified.</td>
  </tr>
  <tr>
    <td><code>R_OK</code></td>
    <td>Flag indicating that the file can be read by the calling process.</td>
  </tr>
  <tr>
    <td><code>W_OK</code></td>
    <td>Flag indicating that the file can be written by the calling
    process.</td>
  </tr>
  <tr>
    <td><code>X_OK</code></td>
    <td>Flag indicating that the file can be executed by the calling
    process. This has no effect on Windows
    (will behave like <code>fs.constants.F_OK</code>).</td>
  </tr>
</table>

The definitions are also available on Windows.

###### File copy constants

The following constants are meant for use with [`fs.copyFile()`][].

<table>
  <tr>
    <th>Constant</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>COPYFILE_EXCL</code></td>
    <td>If present, the copy operation will fail with an error if the
    destination path already exists.</td>
  </tr>
  <tr>
    <td><code>COPYFILE_FICLONE</code></td>
    <td>If present, the copy operation will attempt to create a
    copy-on-write reflink. If the underlying platform does not support
    copy-on-write, then a fallback copy mechanism is used.</td>
  </tr>
  <tr>
    <td><code>COPYFILE_FICLONE_FORCE</code></td>
    <td>If present, the copy operation will attempt to create a
    copy-on-write reflink. If the underlying platform does not support
    copy-on-write, then the operation will fail with an error.</td>
  </tr>
</table>

The definitions are also available on Windows.

###### File open constants

The following constants are meant for use with `fs.open()`.

<table>
  <tr>
    <th>Constant</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>O_RDONLY</code></td>
    <td>Flag indicating to open a file for read-only access.</td>
  </tr>
  <tr>
    <td><code>O_WRONLY</code></td>
    <td>Flag indicating to open a file for write-only access.</td>
  </tr>
  <tr>
    <td><code>O_RDWR</code></td>
    <td>Flag indicating to open a file for read-write access.</td>
  </tr>
  <tr>
    <td><code>O_CREAT</code></td>
    <td>Flag indicating to create the file if it does not already exist.</td>
  </tr>
  <tr>
    <td><code>O_EXCL</code></td>
    <td>Flag indicating that opening a file should fail if the
    <code>O_CREAT</code> flag is set and the file already exists.</td>
  </tr>
  <tr>
    <td><code>O_NOCTTY</code></td>
    <td>Flag indicating that if path identifies a terminal device, opening the
    path shall not cause that terminal to become the controlling terminal for
    the process (if the process does not already have one).</td>
  </tr>
  <tr>
    <td><code>O_TRUNC</code></td>
    <td>Flag indicating that if the file exists and is a regular file, and the
    file is opened successfully for write access, its length shall be truncated
    to zero.</td>
  </tr>
  <tr>
    <td><code>O_APPEND</code></td>
    <td>Flag indicating that data will be appended to the end of the file.</td>
  </tr>
  <tr>
    <td><code>O_DIRECTORY</code></td>
    <td>Flag indicating that the open should fail if the path is not a
    directory.</td>
  </tr>
  <tr>
  <td><code>O_NOATIME</code></td>
    <td>Flag indicating reading accesses to the file system will no longer
    result in an update to the <code>atime</code> information associated with
    the file. This flag is available on Linux operating systems only.</td>
  </tr>
  <tr>
    <td><code>O_NOFOLLOW</code></td>
    <td>Flag indicating that the open should fail if the path is a symbolic
    link.</td>
  </tr>
  <tr>
    <td><code>O_SYNC</code></td>
    <td>Flag indicating that the file is opened for synchronized I/O with write
    operations waiting for file integrity.</td>
  </tr>
  <tr>
    <td><code>O_DSYNC</code></td>
    <td>Flag indicating that the file is opened for synchronized I/O with write
    operations waiting for data integrity.</td>
  </tr>
  <tr>
    <td><code>O_SYMLINK</code></td>
    <td>Flag indicating to open the symbolic link itself rather than the
    resource it is pointing to.</td>
  </tr>
  <tr>
    <td><code>O_DIRECT</code></td>
    <td>When set, an attempt will be made to minimize caching effects of file
    I/O.</td>
  </tr>
  <tr>
    <td><code>O_NONBLOCK</code></td>
    <td>Flag indicating to open the file in nonblocking mode when possible.</td>
  </tr>
  <tr>
    <td><code>UV_FS_O_FILEMAP</code></td>
    <td>When set, a memory file mapping is used to access the file. This flag
    is available on Windows operating systems only. On other operating systems,
    this flag is ignored.</td>
  </tr>
</table>

On Windows, only `O_APPEND`, `O_CREAT`, `O_EXCL`, `O_RDONLY`, `O_RDWR`,
`O_TRUNC`, `O_WRONLY`, and `UV_FS_O_FILEMAP` are available.

###### File type constants

The following constants are meant for use with the [`fs.Stats`](/api/fs#fsstats) object's
`mode` property for determining a file's type.

<table>
  <tr>
    <th>Constant</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>S_IFMT</code></td>
    <td>Bit mask used to extract the file type code.</td>
  </tr>
  <tr>
    <td><code>S_IFREG</code></td>
    <td>File type constant for a regular file.</td>
  </tr>
  <tr>
    <td><code>S_IFDIR</code></td>
    <td>File type constant for a directory.</td>
  </tr>
  <tr>
    <td><code>S_IFCHR</code></td>
    <td>File type constant for a character-oriented device file.</td>
  </tr>
  <tr>
    <td><code>S_IFBLK</code></td>
    <td>File type constant for a block-oriented device file.</td>
  </tr>
  <tr>
    <td><code>S_IFIFO</code></td>
    <td>File type constant for a FIFO/pipe.</td>
  </tr>
  <tr>
    <td><code>S_IFLNK</code></td>
    <td>File type constant for a symbolic link.</td>
  </tr>
  <tr>
    <td><code>S_IFSOCK</code></td>
    <td>File type constant for a socket.</td>
  </tr>
</table>

On Windows, only `S_IFCHR`, `S_IFDIR`, `S_IFLNK`, `S_IFMT`, and `S_IFREG`,
are available.

###### File mode constants

The following constants are meant for use with the [`fs.Stats`](/api/fs#fsstats) object's
`mode` property for determining the access permissions for a file.

<table>
  <tr>
    <th>Constant</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>S_IRWXU</code></td>
    <td>File mode indicating readable, writable, and executable by owner.</td>
  </tr>
  <tr>
    <td><code>S_IRUSR</code></td>
    <td>File mode indicating readable by owner.</td>
  </tr>
  <tr>
    <td><code>S_IWUSR</code></td>
    <td>File mode indicating writable by owner.</td>
  </tr>
  <tr>
    <td><code>S_IXUSR</code></td>
    <td>File mode indicating executable by owner.</td>
  </tr>
  <tr>
    <td><code>S_IRWXG</code></td>
    <td>File mode indicating readable, writable, and executable by group.</td>
  </tr>
  <tr>
    <td><code>S_IRGRP</code></td>
    <td>File mode indicating readable by group.</td>
  </tr>
  <tr>
    <td><code>S_IWGRP</code></td>
    <td>File mode indicating writable by group.</td>
  </tr>
  <tr>
    <td><code>S_IXGRP</code></td>
    <td>File mode indicating executable by group.</td>
  </tr>
  <tr>
    <td><code>S_IRWXO</code></td>
    <td>File mode indicating readable, writable, and executable by others.</td>
  </tr>
  <tr>
    <td><code>S_IROTH</code></td>
    <td>File mode indicating readable by others.</td>
  </tr>
  <tr>
    <td><code>S_IWOTH</code></td>
    <td>File mode indicating writable by others.</td>
  </tr>
  <tr>
    <td><code>S_IXOTH</code></td>
    <td>File mode indicating executable by others.</td>
  </tr>
</table>

On Windows, only `S_IRUSR` and `S_IWUSR` are available.

### Notes

#### Ordering of callback and promise-based operations

Because they are executed asynchronously by the underlying thread pool,
there is no guaranteed ordering when using either the callback or
promise-based methods.

For example, the following is prone to error because the `fs.stat()`
operation might complete before the `fs.rename()` operation:

```js
fs.rename('/tmp/hello', '/tmp/world', (err) => {
  if (err) throw err;
  console.log('renamed complete');
});
fs.stat('/tmp/world', (err, stats) => {
  if (err) throw err;
  console.log(`stats: ${JSON.stringify(stats)}`);
});
```

It is important to correctly order the operations by awaiting the results
of one before invoking the other:

```mjs
import { rename, stat } from 'node:fs/promises';

const from = '/tmp/hello';
const to = '/tmp/world';

try {
  await rename(from, to);
  const stats = await stat(to);
  console.log(`stats: ${JSON.stringify(stats)}`);
} catch (error) {
  console.error('there was an error:', error.message);
}
```

```cjs
const { rename, stat } = require('node:fs/promises');

(async function(from, to) {
  try {
    await rename(from, to);
    const stats = await stat(to);
    console.log(`stats: ${JSON.stringify(stats)}`);
  } catch (error) {
    console.error('there was an error:', error.message);
  }
})('/tmp/hello', '/tmp/world');
```

Or, when using the callback APIs, move the `fs.stat()` call into the callback
of the `fs.rename()` operation:

```mjs
import { rename, stat } from 'node:fs';

rename('/tmp/hello', '/tmp/world', (err) => {
  if (err) throw err;
  stat('/tmp/world', (err, stats) => {
    if (err) throw err;
    console.log(`stats: ${JSON.stringify(stats)}`);
  });
});
```

```cjs
const { rename, stat } = require('node:fs/promises');

rename('/tmp/hello', '/tmp/world', (err) => {
  if (err) throw err;
  stat('/tmp/world', (err, stats) => {
    if (err) throw err;
    console.log(`stats: ${JSON.stringify(stats)}`);
  });
});
```

#### File paths

Most `fs` operations accept file paths that may be specified in the form of
a string, a [`Buffer`](/api/buffer#buffer), or a [`URL`](/api/url#the-whatwg-url-api) object using the `file:` protocol.

##### String paths

String paths are interpreted as UTF-8 character sequences identifying
the absolute or relative filename. Relative paths will be resolved relative
to the current working directory as determined by calling `process.cwd()`.

Example using an absolute path on POSIX:

```mjs
import { open } from 'node:fs/promises';

let fd;
try {
  fd = await open('/open/some/file.txt', 'r');
  // Do something with the file
} finally {
  await fd.close();
}
```

Example using a relative path on POSIX (relative to `process.cwd()`):

```mjs
import { open } from 'node:fs/promises';

let fd;
try {
  fd = await open('file.txt', 'r');
  // Do something with the file
} finally {
  await fd.close();
}
```

##### File URL paths

<Metadata version="v16.18.1" data={{"update":{"type":"added","version":["v7.6.0"]}}} />

For most `node:fs` module functions, the `path` or `filename` argument may be
passed as a [`URL`](/api/url#the-whatwg-url-api) object using the `file:` protocol.

```mjs
import { readFileSync } from 'node:fs';

readFileSync(new URL('file:///tmp/hello'));
```

`file:` URLs are always absolute paths.

###### Platform-specific considerations

On Windows, `file:` [`URL`](/api/url#the-whatwg-url-api)s with a host name convert to UNC paths, while `file:`
[`URL`](/api/url#the-whatwg-url-api)s with drive letters convert to local absolute paths. `file:` [`URL`](/api/url#the-whatwg-url-api)s
with no host name and no drive letter will result in an error:

```mjs
import { readFileSync } from 'node:fs';
// On Windows :

// - WHATWG file URLs with hostname convert to UNC path
// file://hostname/p/a/t/h/file => \\hostname\p\a\t\h\file
readFileSync(new URL('file://hostname/p/a/t/h/file'));

// - WHATWG file URLs with drive letters convert to absolute path
// file:///C:/tmp/hello => C:\tmp\hello
readFileSync(new URL('file:///C:/tmp/hello'));

// - WHATWG file URLs without hostname must have a drive letters
readFileSync(new URL('file:///notdriveletter/p/a/t/h/file'));
readFileSync(new URL('file:///c/p/a/t/h/file'));
// TypeError [ERR_INVALID_FILE_URL_PATH]: File URL path must be absolute
```

`file:` [`URL`](/api/url#the-whatwg-url-api)s with drive letters must use `:` as a separator just after
the drive letter. Using another separator will result in an error.

On all other platforms, `file:` [`URL`](/api/url#the-whatwg-url-api)s with a host name are unsupported and
will result in an error:

```mjs
import { readFileSync } from 'node:fs';
// On other platforms:

// - WHATWG file URLs with hostname are unsupported
// file://hostname/p/a/t/h/file => throw!
readFileSync(new URL('file://hostname/p/a/t/h/file'));
// TypeError [ERR_INVALID_FILE_URL_PATH]: must be absolute

// - WHATWG file URLs convert to absolute path
// file:///tmp/hello => /tmp/hello
readFileSync(new URL('file:///tmp/hello'));
```

A `file:` [`URL`](/api/url#the-whatwg-url-api) having encoded slash characters will result in an error on all
platforms:

```mjs
import { readFileSync } from 'node:fs';

// On Windows
readFileSync(new URL('file:///C:/p/a/t/h/%2F'));
readFileSync(new URL('file:///C:/p/a/t/h/%2f'));
/* TypeError [ERR_INVALID_FILE_URL_PATH]: File URL path must not include encoded
\ or / characters */

// On POSIX
readFileSync(new URL('file:///p/a/t/h/%2F'));
readFileSync(new URL('file:///p/a/t/h/%2f'));
/* TypeError [ERR_INVALID_FILE_URL_PATH]: File URL path must not include encoded
/ characters */
```

On Windows, `file:` [`URL`](/api/url#the-whatwg-url-api)s having encoded backslash will result in an error:

```mjs
import { readFileSync } from 'node:fs';

// On Windows
readFileSync(new URL('file:///C:/path/%5C'));
readFileSync(new URL('file:///C:/path/%5c'));
/* TypeError [ERR_INVALID_FILE_URL_PATH]: File URL path must not include encoded
\ or / characters */
```

##### Buffer paths

Paths specified using a [`Buffer`](/api/buffer#buffer) are useful primarily on certain POSIX
operating systems that treat file paths as opaque byte sequences. On such
systems, it is possible for a single file path to contain sub-sequences that
use multiple character encodings. As with string paths, [`Buffer`](/api/buffer#buffer) paths may
be relative or absolute:

Example using an absolute path on POSIX:

```mjs
import { open } from 'node:fs/promises';
import { Buffer } from 'node:buffer';

let fd;
try {
  fd = await open(Buffer.from('/open/some/file.txt'), 'r');
  // Do something with the file
} finally {
  await fd.close();
}
```

##### Per-drive working directories on Windows

On Windows, Node.js follows the concept of per-drive working directory. This
behavior can be observed when using a drive path without a backslash. For
example `fs.readdirSync('C:\\')` can potentially return a different result than
`fs.readdirSync('C:')`. For more information, see
[this MSDN page][MSDN-Rel-Path].

#### File descriptors

On POSIX systems, for every process, the kernel maintains a table of currently
open files and resources. Each open file is assigned a simple numeric
identifier called a _file descriptor_. At the system-level, all file system
operations use these file descriptors to identify and track each specific
file. Windows systems use a different but conceptually similar mechanism for
tracking resources. To simplify things for users, Node.js abstracts away the
differences between operating systems and assigns all open files a numeric file
descriptor.

The callback-based `fs.open()`, and synchronous `fs.openSync()` methods open a
file and allocate a new file descriptor. Once allocated, the file descriptor may
be used to read data from, write data to, or request information about the file.

Operating systems limit the number of file descriptors that may be open
at any given time so it is critical to close the descriptor when operations
are completed. Failure to do so will result in a memory leak that will
eventually cause an application to crash.

```mjs
import { open, close, fstat } from 'node:fs';

function closeFd(fd) {
  close(fd, (err) => {
    if (err) throw err;
  });
}

open('/open/some/file.txt', 'r', (err, fd) => {
  if (err) throw err;
  try {
    fstat(fd, (err, stat) => {
      if (err) {
        closeFd(fd);
        throw err;
      }

      // use stat

      closeFd(fd);
    });
  } catch (err) {
    closeFd(fd);
    throw err;
  }
});
```

The promise-based APIs use a [`FileHandle`](/api/fs#filehandle) object in place of the numeric
file descriptor. These objects are better managed by the system to ensure
that resources are not leaked. However, it is still required that they are
closed when operations are completed:

```mjs
import { open } from 'node:fs/promises';

let file;
try {
  file = await open('/open/some/file.txt', 'r');
  const stat = await file.stat();
  // use stat
} finally {
  await file.close();
}
```

#### Threadpool usage

All callback and promise-based file system APIs (with the exception of
`fs.FSWatcher()`) use libuv's threadpool. This can have surprising and negative
performance implications for some applications. See the
[`UV_THREADPOOL_SIZE`][] documentation for more information.

#### File system flags

The following flags are available wherever the `flag` option takes a
string.

* `'a'`: Open file for appending.
  The file is created if it does not exist.

* `'ax'`: Like `'a'` but fails if the path exists.

* `'a+'`: Open file for reading and appending.
  The file is created if it does not exist.

* `'ax+'`: Like `'a+'` but fails if the path exists.

* `'as'`: Open file for appending in synchronous mode.
  The file is created if it does not exist.

* `'as+'`: Open file for reading and appending in synchronous mode.
  The file is created if it does not exist.

* `'r'`: Open file for reading.
  An exception occurs if the file does not exist.

* `'r+'`: Open file for reading and writing.
  An exception occurs if the file does not exist.

* `'rs+'`: Open file for reading and writing in synchronous mode. Instructs
  the operating system to bypass the local file system cache.

  This is primarily useful for opening files on NFS mounts as it allows
  skipping the potentially stale local cache. It has a very real impact on
  I/O performance so using this flag is not recommended unless it is needed.

  This doesn't turn `fs.open()` or `fsPromises.open()` into a synchronous
  blocking call. If synchronous operation is desired, something like
  `fs.openSync()` should be used.

* `'w'`: Open file for writing.
  The file is created (if it does not exist) or truncated (if it exists).

* `'wx'`: Like `'w'` but fails if the path exists.

* `'w+'`: Open file for reading and writing.
  The file is created (if it does not exist) or truncated (if it exists).

* `'wx+'`: Like `'w+'` but fails if the path exists.

`flag` can also be a number as documented by open(2); commonly used constants
are available from `fs.constants`. On Windows, flags are translated to
their equivalent ones where applicable, e.g. `O_WRONLY` to `FILE_GENERIC_WRITE`,
or `O_EXCL|O_CREAT` to `CREATE_NEW`, as accepted by `CreateFileW`.

The exclusive flag `'x'` (`O_EXCL` flag in open(2)) causes the operation to
return an error if the path already exists. On POSIX, if the path is a symbolic
link, using `O_EXCL` returns an error even if the link is to a path that does
not exist. The exclusive flag might not work with network file systems.

On Linux, positional writes don't work when the file is opened in append mode.
The kernel ignores the position argument and always appends the data to
the end of the file.

Modifying a file rather than replacing it may require the `flag` option to be
set to `'r+'` rather than the default `'w'`.

The behavior of some flags are platform-specific. As such, opening a directory
on macOS and Linux with the `'a+'` flag, as in the example below, will return an
error. In contrast, on Windows and FreeBSD, a file descriptor or a `FileHandle`
will be returned.

```js
// macOS and Linux
fs.open('<directory>', 'a+', (err, fd) => {
  // => [Error: EISDIR: illegal operation on a directory, open <directory>]
});

// Windows and FreeBSD
fs.open('<directory>', 'a+', (err, fd) => {
  // => null, <fd>
});
```

On Windows, opening an existing hidden file using the `'w'` flag (either
through `fs.open()`, `fs.writeFile()`, or `fsPromises.open()`) will fail with
`EPERM`. Existing hidden files can be opened for writing with the `'r+'` flag.

A call to `fs.ftruncate()` or `filehandle.truncate()` can be used to reset
the file contents.

[#25741]: https://github.com/nodejs/node/issues/25741
[Common System Errors]: /api/v16/errors#common-system-errors
[FS constants]: #fs-constants
[File access constants]: #file-access-constants
[MDN-Date]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
[MDN-Number]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type
[MSDN-Rel-Path]: https://docs.microsoft.com/en-us/windows/desktop/FileIO/naming-a-file#fully-qualified-vs-relative-paths
[MSDN-Using-Streams]: https://docs.microsoft.com/en-us/windows/desktop/FileIO/using-streams
[Naming Files, Paths, and Namespaces]: https://docs.microsoft.com/en-us/windows/desktop/FileIO/naming-a-file
[`AHAFS`]: https://developer.ibm.com/articles/au-aix_event_infrastructure/
[`Buffer.byteLength`]: /api/v16/buffer#static-method-bufferbytelengthstring-encoding
[`FSEvents`]: https://developer.apple.com/documentation/coreservices/file_system_events
[`Number.MAX_SAFE_INTEGER`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER
[`ReadDirectoryChangesW`]: https://docs.microsoft.com/en-us/windows/desktop/api/winbase/nf-winbase-readdirectorychangesw
[`UV_THREADPOOL_SIZE`]: /api/v16/cli#uv_threadpool_sizesize
[`event ports`]: https://illumos.org/man/port_create
[`filehandle.createWriteStream()`]: #filehandlecreatewritestreamoptions
[`filehandle.writeFile()`]: #filehandlewritefiledata-options
[`fs.access()`]: #fsaccesspath-mode-callback
[`fs.accessSync()`]: #fsaccesssyncpath-mode
[`fs.chmod()`]: #fschmodpath-mode-callback
[`fs.chown()`]: #fschownpath-uid-gid-callback
[`fs.copyFile()`]: #fscopyfilesrc-dest-mode-callback
[`fs.createReadStream()`]: #fscreatereadstreampath-options
[`fs.createWriteStream()`]: #fscreatewritestreampath-options
[`fs.exists()`]: #fsexistspath-callback
[`fs.fstat()`]: #fsfstatfd-options-callback
[`fs.ftruncate()`]: #fsftruncatefd-len-callback
[`fs.futimes()`]: #fsfutimesfd-atime-mtime-callback
[`fs.lstat()`]: #fslstatpath-options-callback
[`fs.lutimes()`]: #fslutimespath-atime-mtime-callback
[`fs.mkdir()`]: #fsmkdirpath-options-callback
[`fs.mkdtemp()`]: #fsmkdtempprefix-options-callback
[`fs.open()`]: #fsopenpath-flags-mode-callback
[`fs.opendir()`]: #fsopendirpath-options-callback
[`fs.opendirSync()`]: #fsopendirsyncpath-options
[`fs.read()`]: #fsreadfd-buffer-offset-length-position-callback
[`fs.readFile()`]: #fsreadfilepath-options-callback
[`fs.readFileSync()`]: #fsreadfilesyncpath-options
[`fs.readdir()`]: #fsreaddirpath-options-callback
[`fs.readdirSync()`]: #fsreaddirsyncpath-options
[`fs.readv()`]: #fsreadvfd-buffers-position-callback
[`fs.realpath()`]: #fsrealpathpath-options-callback
[`fs.rm()`]: #fsrmpath-options-callback
[`fs.rmSync()`]: #fsrmsyncpath-options
[`fs.rmdir()`]: #fsrmdirpath-options-callback
[`fs.stat()`]: #fsstatpath-options-callback
[`fs.symlink()`]: #fssymlinktarget-path-type-callback
[`fs.utimes()`]: #fsutimespath-atime-mtime-callback
[`fs.watch()`]: #fswatchfilename-options-listener
[`fs.write(fd, buffer...)`]: #fswritefd-buffer-offset-length-position-callback
[`fs.write(fd, string...)`]: #fswritefd-string-position-encoding-callback
[`fs.writeFile()`]: #fswritefilefile-data-options-callback
[`fs.writev()`]: #fswritevfd-buffers-position-callback
[`fsPromises.access()`]: #fspromisesaccesspath-mode
[`fsPromises.open()`]: #fspromisesopenpath-flags-mode
[`fsPromises.opendir()`]: #fspromisesopendirpath-options
[`fsPromises.rm()`]: #fspromisesrmpath-options
[`fsPromises.stat()`]: #fspromisesstatpath-options
[`fsPromises.utimes()`]: #fspromisesutimespath-atime-mtime
[`inotify(7)`]: https://man7.org/linux/man-pages/man7/inotify.7.html
[`kqueue(2)`]: https://www.freebsd.org/cgi/man.cgi?query=kqueue&sektion=2
[`util.promisify()`]: /api/v16/util#utilpromisifyoriginal
[bigints]: https://tc39.github.io/proposal-bigint
[caveats]: #caveats
[chcp]: https://ss64.com/nt/chcp.html
[inode]: https://en.wikipedia.org/wiki/Inode
[support of file system `flags`]: #file-system-flags
