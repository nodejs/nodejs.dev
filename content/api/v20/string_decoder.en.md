---
title: 'string_decoder'
displayTitle: 'String decoder'
category: 'api'
version: 'v20'
---

<Metadata data={{"update":{"type":"introduced_in","version":["v0.10.0"]}}} />

<Stability stability={2}>

Stable

</Stability>

<Metadata version="v20.3.1" data={{"source_link":"lib/string_decoder.js"}} />

The `node:string_decoder` module provides an API for decoding `Buffer` objects
into strings in a manner that preserves encoded multi-byte UTF-8 and UTF-16
characters. It can be accessed using:

```js
const { StringDecoder } = require('node:string_decoder');
```

The following example shows the basic use of the `StringDecoder` class.

```js
const { StringDecoder } = require('node:string_decoder');
const decoder = new StringDecoder('utf8');

const cent = Buffer.from([0xC2, 0xA2]);
console.log(decoder.write(cent));

const euro = Buffer.from([0xE2, 0x82, 0xAC]);
console.log(decoder.write(euro));
```

When a `Buffer` instance is written to the `StringDecoder` instance, an
internal buffer is used to ensure that the decoded string does not contain
any incomplete multibyte characters. These are held in the buffer until the
next call to `stringDecoder.write()` or until `stringDecoder.end()` is called.

In the following example, the three UTF-8 encoded bytes of the European Euro
symbol (`€`) are written over three separate operations:

```js
const { StringDecoder } = require('node:string_decoder');
const decoder = new StringDecoder('utf8');

decoder.write(Buffer.from([0xE2]));
decoder.write(Buffer.from([0x82]));
console.log(decoder.end(Buffer.from([0xAC])));
```

### <DataTag tag="C" /> `StringDecoder`

#### <DataTag tag="M" /> `new StringDecoder([encoding])`

<Metadata data={{"update":{"type":"added","version":["v0.1.99"]}}} />

* `encoding` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) The character [encoding][] the `StringDecoder` will use.
  **Default:** `'utf8'`.

Creates a new `StringDecoder` instance.

#### <DataTag tag="M" /> `stringDecoder.end([buffer])`

<Metadata data={{"update":{"type":"added","version":["v0.9.3"]}}} />

* `buffer` [`Buffer`](/api/v20/buffer#buffer) | [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`DataView`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView) A `Buffer`, or `TypedArray`, or
  `DataView` containing the bytes to decode.
* Returns: [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

Returns any remaining input stored in the internal buffer as a string. Bytes
representing incomplete UTF-8 and UTF-16 characters will be replaced with
substitution characters appropriate for the character encoding.

If the `buffer` argument is provided, one final call to `stringDecoder.write()`
is performed before returning the remaining input.
After `end()` is called, the `stringDecoder` object can be reused for new input.

#### <DataTag tag="M" /> `stringDecoder.write(buffer)`

<Metadata data={{"changes":[{"version":"v8.0.0","pr-url":"https://github.com/nodejs/node/pull/9618","description":"Each invalid character is now replaced by a single replacement character instead of one for each individual byte."}],"update":{"type":"added","version":["v0.1.99"]}}} />

* `buffer` [`Buffer`](/api/v20/buffer#buffer) | [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`DataView`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView) A `Buffer`, or `TypedArray`, or
  `DataView` containing the bytes to decode.
* Returns: [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

Returns a decoded string, ensuring that any incomplete multibyte characters at
the end of the `Buffer`, or `TypedArray`, or `DataView` are omitted from the
returned string and stored in an internal buffer for the next call to
`stringDecoder.write()` or `stringDecoder.end()`.

[encoding]: /api/v20/buffer#buffers-and-character-encodings
