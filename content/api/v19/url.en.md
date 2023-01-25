---
title: 'url'
displayTitle: 'URL'
category: 'api'
version: 'v19'
---

<Metadata version="v19.5.0" data={{"update":{"type":"introduced_in","version":["v0.10.0"]}}} />

<Metadata version="v19.5.0" data={{"stability":{"level":2,"text":" - Stable"}}} />

<Metadata version="v19.5.0" data={{"source_link":"lib/url.js"}} />

The `node:url` module provides utilities for URL resolution and parsing. It can
be accessed using:

```mjs
import url from 'node:url';
```

```cjs
const url = require('node:url');
```

### URL strings and URL objects

A URL string is a structured string containing multiple meaningful components.
When parsed, a URL object is returned containing properties for each of these
components.

The `node:url` module provides two APIs for working with URLs: a legacy API that
is Node.js specific, and a newer API that implements the same
[WHATWG URL Standard][] used by web browsers.

A comparison between the WHATWG and legacy APIs is provided below. Above the URL
`'https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash'`, properties
of an object returned by the legacy `url.parse()` are shown. Below it are
properties of a WHATWG `URL` object.

WHATWG URL's `origin` property includes `protocol` and `host`, but not
`username` or `password`.

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                              href                                              │
├──────────┬──┬─────────────────────┬────────────────────────┬───────────────────────────┬───────┤
│ protocol │  │        auth         │          host          │           path            │ hash  │
│          │  │                     ├─────────────────┬──────┼──────────┬────────────────┤       │
│          │  │                     │    hostname     │ port │ pathname │     search     │       │
│          │  │                     │                 │      │          ├─┬──────────────┤       │
│          │  │                     │                 │      │          │ │    query     │       │
"  https:   //    user   :   pass   @ sub.example.com : 8080   /p/a/t/h  ?  query=string   #hash "
│          │  │          │          │    hostname     │ port │          │                │       │
│          │  │          │          ├─────────────────┴──────┤          │                │       │
│ protocol │  │ username │ password │          host          │          │                │       │
├──────────┴──┼──────────┴──────────┼────────────────────────┤          │                │       │
│   origin    │                     │         origin         │ pathname │     search     │ hash  │
├─────────────┴─────────────────────┴────────────────────────┴──────────┴────────────────┴───────┤
│                                              href                                              │
└────────────────────────────────────────────────────────────────────────────────────────────────┘
(All spaces in the "" line should be ignored. They are purely for formatting.)
```

Parsing the URL string using the WHATWG API:

```js
const myURL =
  new URL('https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash');
```

Parsing the URL string using the legacy API:

```mjs
import url from 'node:url';
const myURL =
  url.parse('https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash');
```

```cjs
const url = require('node:url');
const myURL =
  url.parse('https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash');
```

#### Constructing a URL from component parts and getting the constructed string

It is possible to construct a WHATWG URL from component parts using either the
property setters or a template literal string:

```js
const myURL = new URL('https://example.org');
myURL.pathname = '/a/b/c';
myURL.search = '?d=e';
myURL.hash = '#fgh';
```

```js
const pathname = '/a/b/c';
const search = '?d=e';
const hash = '#fgh';
const myURL = new URL(`https://example.org${pathname}${search}${hash}`);
```

To get the constructed URL string, use the `href` property accessor:

```js
console.log(myURL.href);
```

### The WHATWG URL API

#### <DataTag tag="C" /> `URL`

<Metadata version="v19.5.0" data={{"changes":[{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/18281","description":"The class is now available on the global object."}],"update":{"type":"added","version":["v7.0.0","v6.13.0"]}}} />

Browser-compatible `URL` class, implemented by following the WHATWG URL
Standard. [Examples of parsed URLs][] may be found in the Standard itself.
The `URL` class is also available on the global object.

In accordance with browser conventions, all properties of `URL` objects
are implemented as getters and setters on the class prototype, rather than as
data properties on the object itself. Thus, unlike [legacy `urlObject`][]s,
using the `delete` keyword on any properties of `URL` objects (e.g. `delete
myURL.protocol`, `delete myURL.pathname`, etc) has no effect but will still
return `true`.

##### <DataTag tag="M" /> `new URL(input[, base])`

* `input` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) The absolute or relative input URL to parse. If `input`
  is relative, then `base` is required. If `input` is absolute, the `base`
  is ignored. If `input` is not a string, it is [converted to a string][] first.
* `base` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) The base URL to resolve against if the `input` is not
  absolute. If `base` is not a string, it is [converted to a string][] first.

Creates a new `URL` object by parsing the `input` relative to the `base`. If
`base` is passed as a string, it will be parsed equivalent to `new URL(base)`.

```js
const myURL = new URL('/foo', 'https://example.org/');
// https://example.org/foo
```

The URL constructor is accessible as a property on the global object.
It can also be imported from the built-in url module:

```mjs
import { URL } from 'node:url';
console.log(URL === globalThis.URL); // Prints 'true'.
```

```cjs
console.log(URL === require('node:url').URL); // Prints 'true'.
```

A `TypeError` will be thrown if the `input` or `base` are not valid URLs. Note
that an effort will be made to coerce the given values into strings. For
instance:

```js
const myURL = new URL({ toString: () => 'https://example.org/' });
// https://example.org/
```

Unicode characters appearing within the host name of `input` will be
automatically converted to ASCII using the [Punycode][] algorithm.

```js
const myURL = new URL('https://測試');
// https://xn--g6w251d/
```

This feature is only available if the `node` executable was compiled with
[ICU][] enabled. If not, the domain names are passed through unchanged.

In cases where it is not known in advance if `input` is an absolute URL
and a `base` is provided, it is advised to validate that the `origin` of
the `URL` object is what is expected.

```js
let myURL = new URL('http://Example.com/', 'https://example.org/');
// http://example.com/

myURL = new URL('https://Example.com/', 'https://example.org/');
// https://example.com/

myURL = new URL('foo://Example.com/', 'https://example.org/');
// foo://Example.com/

myURL = new URL('http:Example.com/', 'https://example.org/');
// http://example.com/

myURL = new URL('https:Example.com/', 'https://example.org/');
// https://example.org/Example.com/

myURL = new URL('foo:Example.com/', 'https://example.org/');
// foo:Example.com/
```

##### <DataTag tag="M" /> `url.hash`

* [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

Gets and sets the fragment portion of the URL.

```js
const myURL = new URL('https://example.org/foo#bar');
console.log(myURL.hash);
// Prints #bar

myURL.hash = 'baz';
console.log(myURL.href);
// Prints https://example.org/foo#baz
```

Invalid URL characters included in the value assigned to the `hash` property
are [percent-encoded][]. The selection of which characters to
percent-encode may vary somewhat from what the [`url.parse()`][] and
[`url.format()`][] methods would produce.

##### <DataTag tag="M" /> `url.host`

* [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

Gets and sets the host portion of the URL.

```js
const myURL = new URL('https://example.org:81/foo');
console.log(myURL.host);
// Prints example.org:81

myURL.host = 'example.com:82';
console.log(myURL.href);
// Prints https://example.com:82/foo
```

Invalid host values assigned to the `host` property are ignored.

##### <DataTag tag="M" /> `url.hostname`

* [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

Gets and sets the host name portion of the URL. The key difference between
`url.host` and `url.hostname` is that `url.hostname` does _not_ include the
port.

```js
const myURL = new URL('https://example.org:81/foo');
console.log(myURL.hostname);
// Prints example.org

// Setting the hostname does not change the port
myURL.hostname = 'example.com';
console.log(myURL.href);
// Prints https://example.com:81/foo

// Use myURL.host to change the hostname and port
myURL.host = 'example.org:82';
console.log(myURL.href);
// Prints https://example.org:82/foo
```

Invalid host name values assigned to the `hostname` property are ignored.

##### <DataTag tag="M" /> `url.href`

* [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

Gets and sets the serialized URL.

```js
const myURL = new URL('https://example.org/foo');
console.log(myURL.href);
// Prints https://example.org/foo

myURL.href = 'https://example.com/bar';
console.log(myURL.href);
// Prints https://example.com/bar
```

Getting the value of the `href` property is equivalent to calling
[`url.toString()`][].

Setting the value of this property to a new value is equivalent to creating a
new `URL` object using [`new URL(value)`][`new URL()`]. Each of the `URL`
object's properties will be modified.

If the value assigned to the `href` property is not a valid URL, a `TypeError`
will be thrown.

##### <DataTag tag="M" /> `url.origin`

<Metadata version="v19.5.0" data={{"changes":[{"version":"v15.0.0","pr-url":"https://github.com/nodejs/node/pull/33325","description":"The scheme \"gopher\" is no longer special and `url.origin` now returns `'null'` for it."}]}} />

* [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

Gets the read-only serialization of the URL's origin.

```js
const myURL = new URL('https://example.org/foo/bar?baz');
console.log(myURL.origin);
// Prints https://example.org
```

```js
const idnURL = new URL('https://測試');
console.log(idnURL.origin);
// Prints https://xn--g6w251d

console.log(idnURL.hostname);
// Prints xn--g6w251d
```

##### <DataTag tag="M" /> `url.password`

* [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

Gets and sets the password portion of the URL.

```js
const myURL = new URL('https://abc:xyz@example.com');
console.log(myURL.password);
// Prints xyz

myURL.password = '123';
console.log(myURL.href);
// Prints https://abc:123@example.com/
```

Invalid URL characters included in the value assigned to the `password` property
are [percent-encoded][]. The selection of which characters to
percent-encode may vary somewhat from what the [`url.parse()`][] and
[`url.format()`][] methods would produce.

##### <DataTag tag="M" /> `url.pathname`

* [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

Gets and sets the path portion of the URL.

```js
const myURL = new URL('https://example.org/abc/xyz?123');
console.log(myURL.pathname);
// Prints /abc/xyz

myURL.pathname = '/abcdef';
console.log(myURL.href);
// Prints https://example.org/abcdef?123
```

Invalid URL characters included in the value assigned to the `pathname`
property are [percent-encoded][]. The selection of which characters
to percent-encode may vary somewhat from what the [`url.parse()`][] and
[`url.format()`][] methods would produce.

##### <DataTag tag="M" /> `url.port`

<Metadata version="v19.5.0" data={{"changes":[{"version":"v15.0.0","pr-url":"https://github.com/nodejs/node/pull/33325","description":"The scheme \"gopher\" is no longer special."}]}} />

* [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

Gets and sets the port portion of the URL.

The port value may be a number or a string containing a number in the range
`0` to `65535` (inclusive). Setting the value to the default port of the
`URL` objects given `protocol` will result in the `port` value becoming
the empty string (`''`).

The port value can be an empty string in which case the port depends on
the protocol/scheme:

| protocol | port |
| -------- | ---- |
| "ftp"    | 21   |
| "file"   |      |
| "http"   | 80   |
| "https"  | 443  |
| "ws"     | 80   |
| "wss"    | 443  |

Upon assigning a value to the port, the value will first be converted to a
string using `.toString()`.

If that string is invalid but it begins with a number, the leading number is
assigned to `port`.
If the number lies outside the range denoted above, it is ignored.

```js
const myURL = new URL('https://example.org:8888');
console.log(myURL.port);
// Prints 8888

// Default ports are automatically transformed to the empty string
// (HTTPS protocol's default port is 443)
myURL.port = '443';
console.log(myURL.port);
// Prints the empty string
console.log(myURL.href);
// Prints https://example.org/

myURL.port = 1234;
console.log(myURL.port);
// Prints 1234
console.log(myURL.href);
// Prints https://example.org:1234/

// Completely invalid port strings are ignored
myURL.port = 'abcd';
console.log(myURL.port);
// Prints 1234

// Leading numbers are treated as a port number
myURL.port = '5678abcd';
console.log(myURL.port);
// Prints 5678

// Non-integers are truncated
myURL.port = 1234.5678;
console.log(myURL.port);
// Prints 1234

// Out-of-range numbers which are not represented in scientific notation
// will be ignored.
myURL.port = 1e10; // 10000000000, will be range-checked as described below
console.log(myURL.port);
// Prints 1234
```

Numbers which contain a decimal point,
such as floating-point numbers or numbers in scientific notation,
are not an exception to this rule.
Leading numbers up to the decimal point will be set as the URL's port,
assuming they are valid:

```js
myURL.port = 4.567e21;
console.log(myURL.port);
// Prints 4 (because it is the leading number in the string '4.567e21')
```

##### <DataTag tag="M" /> `url.protocol`

* [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

Gets and sets the protocol portion of the URL.

```js
const myURL = new URL('https://example.org');
console.log(myURL.protocol);
// Prints https:

myURL.protocol = 'ftp';
console.log(myURL.href);
// Prints ftp://example.org/
```

Invalid URL protocol values assigned to the `protocol` property are ignored.

###### Special schemes

<Metadata version="v19.5.0" data={{"changes":[{"version":"v15.0.0","pr-url":"https://github.com/nodejs/node/pull/33325","description":"The scheme \"gopher\" is no longer special."}]}} />

The [WHATWG URL Standard][] considers a handful of URL protocol schemes to be
_special_ in terms of how they are parsed and serialized. When a URL is
parsed using one of these special protocols, the `url.protocol` property
may be changed to another special protocol but cannot be changed to a
non-special protocol, and vice versa.

For instance, changing from `http` to `https` works:

```js
const u = new URL('http://example.org');
u.protocol = 'https';
console.log(u.href);
// https://example.org/
```

However, changing from `http` to a hypothetical `fish` protocol does not
because the new protocol is not special.

```js
const u = new URL('http://example.org');
u.protocol = 'fish';
console.log(u.href);
// http://example.org/
```

Likewise, changing from a non-special protocol to a special protocol is also
not permitted:

```js
const u = new URL('fish://example.org');
u.protocol = 'http';
console.log(u.href);
// fish://example.org
```

According to the WHATWG URL Standard, special protocol schemes are `ftp`,
`file`, `http`, `https`, `ws`, and `wss`.

##### <DataTag tag="M" /> `url.search`

* [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

Gets and sets the serialized query portion of the URL.

```js
const myURL = new URL('https://example.org/abc?123');
console.log(myURL.search);
// Prints ?123

myURL.search = 'abc=xyz';
console.log(myURL.href);
// Prints https://example.org/abc?abc=xyz
```

Any invalid URL characters appearing in the value assigned the `search`
property will be [percent-encoded][]. The selection of which
characters to percent-encode may vary somewhat from what the [`url.parse()`][]
and [`url.format()`][] methods would produce.

##### <DataTag tag="M" /> `url.searchParams`

* [`URLSearchParams`](/api/url#urlsearchparams)

Gets the [`URLSearchParams`][] object representing the query parameters of the
URL. This property is read-only but the `URLSearchParams` object it provides
can be used to mutate the URL instance; to replace the entirety of query
parameters of the URL, use the [`url.search`][] setter. See
[`URLSearchParams`][] documentation for details.

Use care when using `.searchParams` to modify the `URL` because,
per the WHATWG specification, the `URLSearchParams` object uses
different rules to determine which characters to percent-encode. For
instance, the `URL` object will not percent encode the ASCII tilde (`~`)
character, while `URLSearchParams` will always encode it:

```js
const myUrl = new URL('https://example.org/abc?foo=~bar');

console.log(myUrl.search);  // prints ?foo=~bar

// Modify the URL via searchParams...
myUrl.searchParams.sort();

console.log(myUrl.search);  // prints ?foo=%7Ebar
```

##### <DataTag tag="M" /> `url.username`

* [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

Gets and sets the username portion of the URL.

```js
const myURL = new URL('https://abc:xyz@example.com');
console.log(myURL.username);
// Prints abc

myURL.username = '123';
console.log(myURL.href);
// Prints https://123:xyz@example.com/
```

Any invalid URL characters appearing in the value assigned the `username`
property will be [percent-encoded][]. The selection of which
characters to percent-encode may vary somewhat from what the [`url.parse()`][]
and [`url.format()`][] methods would produce.

##### <DataTag tag="M" /> `url.toString()`

* Returns: [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

The `toString()` method on the `URL` object returns the serialized URL. The
value returned is equivalent to that of [`url.href`][] and [`url.toJSON()`][].

##### <DataTag tag="M" /> `url.toJSON()`

* Returns: [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

The `toJSON()` method on the `URL` object returns the serialized URL. The
value returned is equivalent to that of [`url.href`][] and
[`url.toString()`][].

This method is automatically called when an `URL` object is serialized
with [`JSON.stringify()`][].

```js
const myURLs = [
  new URL('https://www.example.com'),
  new URL('https://test.example.org'),
];
console.log(JSON.stringify(myURLs));
// Prints ["https://www.example.com/","https://test.example.org/"]
```

##### <DataTag tag="M" /> `URL.createObjectURL(blob)`

<Metadata version="v19.5.0" data={{"update":{"type":"added","version":["v16.7.0"]}}} />

<Metadata version="v19.5.0" data={{"stability":{"level":1,"text":" - Experimental"}}} />

* `blob` [`Blob`](/api/buffer#blob)
* Returns: [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

Creates a `'blob:nodedata:...'` URL string that represents the given [`Blob`](/api/buffer#blob)
object and can be used to retrieve the `Blob` later.

```js
const {
  Blob,
  resolveObjectURL,
} = require('node:buffer');

const blob = new Blob(['hello']);
const id = URL.createObjectURL(blob);

// later...

const otherBlob = resolveObjectURL(id);
console.log(otherBlob.size);
```

The data stored by the registered [`Blob`](/api/buffer#blob) will be retained in memory until
`URL.revokeObjectURL()` is called to remove it.

`Blob` objects are registered within the current thread. If using Worker
Threads, `Blob` objects registered within one Worker will not be available
to other workers or the main thread.

##### <DataTag tag="M" /> `URL.revokeObjectURL(id)`

<Metadata version="v19.5.0" data={{"update":{"type":"added","version":["v16.7.0"]}}} />

<Metadata version="v19.5.0" data={{"stability":{"level":1,"text":" - Experimental"}}} />

* `id` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) A `'blob:nodedata:...` URL string returned by a prior call to
  `URL.createObjectURL()`.

Removes the stored [`Blob`](/api/buffer#blob) identified by the given ID. Attempting to revoke a
ID that isn't registered will silently fail.

#### <DataTag tag="C" /> `URLSearchParams`

<Metadata version="v19.5.0" data={{"changes":[{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/18281","description":"The class is now available on the global object."}],"update":{"type":"added","version":["v7.5.0","v6.13.0"]}}} />

The `URLSearchParams` API provides read and write access to the query of a
`URL`. The `URLSearchParams` class can also be used standalone with one of the
four following constructors.
The `URLSearchParams` class is also available on the global object.

The WHATWG `URLSearchParams` interface and the [`querystring`][] module have
similar purpose, but the purpose of the [`querystring`][] module is more
general, as it allows the customization of delimiter characters (`&` and `=`).
On the other hand, this API is designed purely for URL query strings.

```js
const myURL = new URL('https://example.org/?abc=123');
console.log(myURL.searchParams.get('abc'));
// Prints 123

myURL.searchParams.append('abc', 'xyz');
console.log(myURL.href);
// Prints https://example.org/?abc=123&abc=xyz

myURL.searchParams.delete('abc');
myURL.searchParams.set('a', 'b');
console.log(myURL.href);
// Prints https://example.org/?a=b

const newSearchParams = new URLSearchParams(myURL.searchParams);
// The above is equivalent to
// const newSearchParams = new URLSearchParams(myURL.search);

newSearchParams.append('a', 'c');
console.log(myURL.href);
// Prints https://example.org/?a=b
console.log(newSearchParams.toString());
// Prints a=b&a=c

// newSearchParams.toString() is implicitly called
myURL.search = newSearchParams;
console.log(myURL.href);
// Prints https://example.org/?a=b&a=c
newSearchParams.delete('a');
console.log(myURL.href);
// Prints https://example.org/?a=b&a=c
```

##### <DataTag tag="M" /> `new URLSearchParams()`

Instantiate a new empty `URLSearchParams` object.

##### <DataTag tag="M" /> `new URLSearchParams(string)`

* `string` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) A query string

Parse the `string` as a query string, and use it to instantiate a new
`URLSearchParams` object. A leading `'?'`, if present, is ignored.

```js
let params;

params = new URLSearchParams('user=abc&query=xyz');
console.log(params.get('user'));
// Prints 'abc'
console.log(params.toString());
// Prints 'user=abc&query=xyz'

params = new URLSearchParams('?user=abc&query=xyz');
console.log(params.toString());
// Prints 'user=abc&query=xyz'
```

##### <DataTag tag="M" /> `new URLSearchParams(obj)`

<Metadata version="v19.5.0" data={{"update":{"type":"added","version":["v7.10.0","v6.13.0"]}}} />

* `obj` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) An object representing a collection of key-value pairs

Instantiate a new `URLSearchParams` object with a query hash map. The key and
value of each property of `obj` are always coerced to strings.

Unlike [`querystring`][] module, duplicate keys in the form of array values are
not allowed. Arrays are stringified using [`array.toString()`][], which simply
joins all array elements with commas.

```js
const params = new URLSearchParams({
  user: 'abc',
  query: ['first', 'second'],
});
console.log(params.getAll('query'));
// Prints [ 'first,second' ]
console.log(params.toString());
// Prints 'user=abc&query=first%2Csecond'
```

##### <DataTag tag="M" /> `new URLSearchParams(iterable)`

<Metadata version="v19.5.0" data={{"update":{"type":"added","version":["v7.10.0","v6.13.0"]}}} />

* `iterable` [`Iterable`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol) An iterable object whose elements are key-value pairs

Instantiate a new `URLSearchParams` object with an iterable map in a way that
is similar to [`Map`][]'s constructor. `iterable` can be an `Array` or any
iterable object. That means `iterable` can be another `URLSearchParams`, in
which case the constructor will simply create a clone of the provided
`URLSearchParams`. Elements of `iterable` are key-value pairs, and can
themselves be any iterable object.

Duplicate keys are allowed.

```js
let params;

// Using an array
params = new URLSearchParams([
  ['user', 'abc'],
  ['query', 'first'],
  ['query', 'second'],
]);
console.log(params.toString());
// Prints 'user=abc&query=first&query=second'

// Using a Map object
const map = new Map();
map.set('user', 'abc');
map.set('query', 'xyz');
params = new URLSearchParams(map);
console.log(params.toString());
// Prints 'user=abc&query=xyz'

// Using a generator function
function* getQueryPairs() {
  yield ['user', 'abc'];
  yield ['query', 'first'];
  yield ['query', 'second'];
}
params = new URLSearchParams(getQueryPairs());
console.log(params.toString());
// Prints 'user=abc&query=first&query=second'

// Each key-value pair must have exactly two elements
new URLSearchParams([
  ['user', 'abc', 'error'],
]);
// Throws TypeError [ERR_INVALID_TUPLE]:
//        Each query pair must be an iterable [name, value] tuple
```

##### <DataTag tag="M" /> `urlSearchParams.append(name, value)`

* `name` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
* `value` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

Append a new name-value pair to the query string.

##### <DataTag tag="M" /> `urlSearchParams.delete(name)`

* `name` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

Remove all name-value pairs whose name is `name`.

##### <DataTag tag="M" /> `urlSearchParams.entries()`

* Returns: [`Iterator`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol)

Returns an ES6 `Iterator` over each of the name-value pairs in the query.
Each item of the iterator is a JavaScript `Array`. The first item of the `Array`
is the `name`, the second item of the `Array` is the `value`.

Alias for [`urlSearchParams[@@iterator]()`][`urlSearchParams@@iterator()`].

##### <DataTag tag="M" /> `urlSearchParams.forEach(fn[, thisArg])`

<Metadata version="v19.5.0" data={{"changes":[{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/41678","description":"Passing an invalid callback to the `fn` argument now throws `ERR_INVALID_ARG_TYPE` instead of `ERR_INVALID_CALLBACK`."}]}} />

* `fn` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) Invoked for each name-value pair in the query
* `thisArg` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) To be used as `this` value for when `fn` is called

Iterates over each name-value pair in the query and invokes the given function.

```js
const myURL = new URL('https://example.org/?a=b&c=d');
myURL.searchParams.forEach((value, name, searchParams) => {
  console.log(name, value, myURL.searchParams === searchParams);
});
// Prints:
//   a b true
//   c d true
```

##### <DataTag tag="M" /> `urlSearchParams.get(name)`

* `name` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
* Returns: [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) or `null` if there is no name-value pair with the given
  `name`.

Returns the value of the first name-value pair whose name is `name`. If there
are no such pairs, `null` is returned.

##### <DataTag tag="M" /> `urlSearchParams.getAll(name)`

* `name` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
* Returns: string\[]

Returns the values of all name-value pairs whose name is `name`. If there are
no such pairs, an empty array is returned.

##### <DataTag tag="M" /> `urlSearchParams.has(name)`

* `name` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
* Returns: [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Returns `true` if there is at least one name-value pair whose name is `name`.

##### <DataTag tag="M" /> `urlSearchParams.keys()`

* Returns: [`Iterator`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol)

Returns an ES6 `Iterator` over the names of each name-value pair.

```js
const params = new URLSearchParams('foo=bar&foo=baz');
for (const name of params.keys()) {
  console.log(name);
}
// Prints:
//   foo
//   foo
```

##### <DataTag tag="M" /> `urlSearchParams.set(name, value)`

* `name` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
* `value` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

Sets the value in the `URLSearchParams` object associated with `name` to
`value`. If there are any pre-existing name-value pairs whose names are `name`,
set the first such pair's value to `value` and remove all others. If not,
append the name-value pair to the query string.

```js
const params = new URLSearchParams();
params.append('foo', 'bar');
params.append('foo', 'baz');
params.append('abc', 'def');
console.log(params.toString());
// Prints foo=bar&foo=baz&abc=def

params.set('foo', 'def');
params.set('xyz', 'opq');
console.log(params.toString());
// Prints foo=def&abc=def&xyz=opq
```

##### <DataTag tag="M" /> `urlSearchParams.sort()`

<Metadata version="v19.5.0" data={{"update":{"type":"added","version":["v7.7.0","v6.13.0"]}}} />

Sort all existing name-value pairs in-place by their names. Sorting is done
with a [stable sorting algorithm][], so relative order between name-value pairs
with the same name is preserved.

This method can be used, in particular, to increase cache hits.

```js
const params = new URLSearchParams('query[]=abc&type=search&query[]=123');
params.sort();
console.log(params.toString());
// Prints query%5B%5D=abc&query%5B%5D=123&type=search
```

##### <DataTag tag="M" /> `urlSearchParams.toString()`

* Returns: [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

Returns the search parameters serialized as a string, with characters
percent-encoded where necessary.

##### <DataTag tag="M" /> `urlSearchParams.values()`

* Returns: [`Iterator`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol)

Returns an ES6 `Iterator` over the values of each name-value pair.

##### <DataTag tag="M" /> `urlSearchParams[Symbol.iterator]()`

* Returns: [`Iterator`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol)

Returns an ES6 `Iterator` over each of the name-value pairs in the query string.
Each item of the iterator is a JavaScript `Array`. The first item of the `Array`
is the `name`, the second item of the `Array` is the `value`.

Alias for [`urlSearchParams.entries()`][].

```js
const params = new URLSearchParams('foo=bar&xyz=baz');
for (const [name, value] of params) {
  console.log(name, value);
}
// Prints:
//   foo bar
//   xyz baz
```

#### <DataTag tag="M" /> `url.domainToASCII(domain)`

<Metadata version="v19.5.0" data={{"update":{"type":"added","version":["v7.4.0","v6.13.0"]}}} />

* `domain` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
* Returns: [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

Returns the [Punycode][] ASCII serialization of the `domain`. If `domain` is an
invalid domain, the empty string is returned.

It performs the inverse operation to [`url.domainToUnicode()`][].

This feature is only available if the `node` executable was compiled with
[ICU][] enabled. If not, the domain names are passed through unchanged.

```mjs
import url from 'node:url';

console.log(url.domainToASCII('español.com'));
// Prints xn--espaol-zwa.com
console.log(url.domainToASCII('中文.com'));
// Prints xn--fiq228c.com
console.log(url.domainToASCII('xn--iñvalid.com'));
// Prints an empty string
```

```cjs
const url = require('node:url');

console.log(url.domainToASCII('español.com'));
// Prints xn--espaol-zwa.com
console.log(url.domainToASCII('中文.com'));
// Prints xn--fiq228c.com
console.log(url.domainToASCII('xn--iñvalid.com'));
// Prints an empty string
```

#### <DataTag tag="M" /> `url.domainToUnicode(domain)`

<Metadata version="v19.5.0" data={{"update":{"type":"added","version":["v7.4.0","v6.13.0"]}}} />

* `domain` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
* Returns: [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

Returns the Unicode serialization of the `domain`. If `domain` is an invalid
domain, the empty string is returned.

It performs the inverse operation to [`url.domainToASCII()`][].

This feature is only available if the `node` executable was compiled with
[ICU][] enabled. If not, the domain names are passed through unchanged.

```mjs
import url from 'node:url';

console.log(url.domainToUnicode('xn--espaol-zwa.com'));
// Prints español.com
console.log(url.domainToUnicode('xn--fiq228c.com'));
// Prints 中文.com
console.log(url.domainToUnicode('xn--iñvalid.com'));
// Prints an empty string
```

```cjs
const url = require('node:url');

console.log(url.domainToUnicode('xn--espaol-zwa.com'));
// Prints español.com
console.log(url.domainToUnicode('xn--fiq228c.com'));
// Prints 中文.com
console.log(url.domainToUnicode('xn--iñvalid.com'));
// Prints an empty string
```

#### <DataTag tag="M" /> `url.fileURLToPath(url)`

<Metadata version="v19.5.0" data={{"update":{"type":"added","version":["v10.12.0"]}}} />

* `url` [`URL`](/api/url#the-whatwg-url-api) | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) The file URL string or URL object to convert to a path.
* Returns: [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) The fully-resolved platform-specific Node.js file path.

This function ensures the correct decodings of percent-encoded characters as
well as ensuring a cross-platform valid absolute path string.

```mjs
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);

new URL('file:///C:/path/').pathname;      // Incorrect: /C:/path/
fileURLToPath('file:///C:/path/');         // Correct:   C:\path\ (Windows)

new URL('file://nas/foo.txt').pathname;    // Incorrect: /foo.txt
fileURLToPath('file://nas/foo.txt');       // Correct:   \\nas\foo.txt (Windows)

new URL('file:///你好.txt').pathname;      // Incorrect: /%E4%BD%A0%E5%A5%BD.txt
fileURLToPath('file:///你好.txt');         // Correct:   /你好.txt (POSIX)

new URL('file:///hello world').pathname;   // Incorrect: /hello%20world
fileURLToPath('file:///hello world');      // Correct:   /hello world (POSIX)
```

```cjs
const { fileURLToPath } = require('node:url');
new URL('file:///C:/path/').pathname;      // Incorrect: /C:/path/
fileURLToPath('file:///C:/path/');         // Correct:   C:\path\ (Windows)

new URL('file://nas/foo.txt').pathname;    // Incorrect: /foo.txt
fileURLToPath('file://nas/foo.txt');       // Correct:   \\nas\foo.txt (Windows)

new URL('file:///你好.txt').pathname;      // Incorrect: /%E4%BD%A0%E5%A5%BD.txt
fileURLToPath('file:///你好.txt');         // Correct:   /你好.txt (POSIX)

new URL('file:///hello world').pathname;   // Incorrect: /hello%20world
fileURLToPath('file:///hello world');      // Correct:   /hello world (POSIX)
```

#### <DataTag tag="M" /> `url.format(URL[, options])`

<Metadata version="v19.5.0" data={{"update":{"type":"added","version":["v7.6.0"]}}} />

* `URL` [`URL`](/api/url#the-whatwg-url-api) A [WHATWG URL][] object
* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `auth` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) `true` if the serialized URL string should include the
    username and password, `false` otherwise. **Default:** `true`.
  * `fragment` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) `true` if the serialized URL string should include the
    fragment, `false` otherwise. **Default:** `true`.
  * `search` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) `true` if the serialized URL string should include the
    search query, `false` otherwise. **Default:** `true`.
  * `unicode` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) `true` if Unicode characters appearing in the host
    component of the URL string should be encoded directly as opposed to being
    Punycode encoded. **Default:** `false`.
* Returns: [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

Returns a customizable serialization of a URL `String` representation of a
[WHATWG URL][] object.

The URL object has both a `toString()` method and `href` property that return
string serializations of the URL. These are not, however, customizable in
any way. The `url.format(URL[, options])` method allows for basic customization
of the output.

```mjs
import url from 'node:url';
const myURL = new URL('https://a:b@測試?abc#foo');

console.log(myURL.href);
// Prints https://a:b@xn--g6w251d/?abc#foo

console.log(myURL.toString());
// Prints https://a:b@xn--g6w251d/?abc#foo

console.log(url.format(myURL, { fragment: false, unicode: true, auth: false }));
// Prints 'https://測試/?abc'
```

```cjs
const url = require('node:url');
const myURL = new URL('https://a:b@測試?abc#foo');

console.log(myURL.href);
// Prints https://a:b@xn--g6w251d/?abc#foo

console.log(myURL.toString());
// Prints https://a:b@xn--g6w251d/?abc#foo

console.log(url.format(myURL, { fragment: false, unicode: true, auth: false }));
// Prints 'https://測試/?abc'
```

#### <DataTag tag="M" /> `url.pathToFileURL(path)`

<Metadata version="v19.5.0" data={{"update":{"type":"added","version":["v10.12.0"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) The path to convert to a File URL.
* Returns: [`URL`](/api/url#the-whatwg-url-api) The file URL object.

This function ensures that `path` is resolved absolutely, and that the URL
control characters are correctly encoded when converting into a File URL.

```mjs
import { pathToFileURL } from 'node:url';

new URL('/foo#1', 'file:');           // Incorrect: file:///foo#1
pathToFileURL('/foo#1');              // Correct:   file:///foo%231 (POSIX)

new URL('/some/path%.c', 'file:');    // Incorrect: file:///some/path%.c
pathToFileURL('/some/path%.c');       // Correct:   file:///some/path%25.c (POSIX)
```

```cjs
const { pathToFileURL } = require('node:url');
new URL(__filename);                  // Incorrect: throws (POSIX)
new URL(__filename);                  // Incorrect: C:\... (Windows)
pathToFileURL(__filename);            // Correct:   file:///... (POSIX)
pathToFileURL(__filename);            // Correct:   file:///C:/... (Windows)

new URL('/foo#1', 'file:');           // Incorrect: file:///foo#1
pathToFileURL('/foo#1');              // Correct:   file:///foo%231 (POSIX)

new URL('/some/path%.c', 'file:');    // Incorrect: file:///some/path%.c
pathToFileURL('/some/path%.c');       // Correct:   file:///some/path%25.c (POSIX)
```

#### <DataTag tag="M" /> `url.urlToHttpOptions(url)`

<Metadata version="v19.5.0" data={{"update":{"type":"added","version":["v15.7.0","v14.18.0"]}}} />

* `url` [`URL`](/api/url#the-whatwg-url-api) The [WHATWG URL][] object to convert to an options object.
* Returns: [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) Options object
  * `protocol` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Protocol to use.
  * `hostname` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) A domain name or IP address of the server to issue the
    request to.
  * `hash` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) The fragment portion of the URL.
  * `search` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) The serialized query portion of the URL.
  * `pathname` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) The path portion of the URL.
  * `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Request path. Should include query string if any.
    E.G. `'/index.html?page=12'`. An exception is thrown when the request path
    contains illegal characters. Currently, only spaces are rejected but that
    may change in the future.
  * `href` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) The serialized URL.
  * `port` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) Port of remote server.
  * `auth` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Basic authentication i.e. `'user:password'` to compute an
    Authorization header.

This utility function converts a URL object into an ordinary options object as
expected by the [`http.request()`][] and [`https.request()`][] APIs.

```mjs
import { urlToHttpOptions } from 'node:url';
const myURL = new URL('https://a:b@測試?abc#foo');

console.log(urlToHttpOptions(myURL));
/*
{
  protocol: 'https:',
  hostname: 'xn--g6w251d',
  hash: '#foo',
  search: '?abc',
  pathname: '/',
  path: '/?abc',
  href: 'https://a:b@xn--g6w251d/?abc#foo',
  auth: 'a:b'
}
*/
```

```cjs
const { urlToHttpOptions } = require('node:url');
const myURL = new URL('https://a:b@測試?abc#foo');

console.log(urlToHttpOptions(myUrl));
/*
{
  protocol: 'https:',
  hostname: 'xn--g6w251d',
  hash: '#foo',
  search: '?abc',
  pathname: '/',
  path: '/?abc',
  href: 'https://a:b@xn--g6w251d/?abc#foo',
  auth: 'a:b'
}
*/
```

### Legacy URL API

<Metadata version="v19.5.0" data={{"changes":[{"version":["v15.13.0","v14.17.0"],"pr-url":"https://github.com/nodejs/node/pull/37784","description":"Deprecation revoked. Status changed to \"Legacy\"."},{"version":"v11.0.0","pr-url":"https://github.com/nodejs/node/pull/22715","description":"This API is deprecated."}]}} />

<Metadata version="v19.5.0" data={{"stability":{"level":3,"text":" - Legacy: Use the WHATWG URL API instead."}}} />

#### Legacy `urlObject`

<Metadata version="v19.5.0" data={{"changes":[{"version":["v15.13.0","v14.17.0"],"pr-url":"https://github.com/nodejs/node/pull/37784","description":"Deprecation revoked. Status changed to \"Legacy\"."},{"version":"v11.0.0","pr-url":"https://github.com/nodejs/node/pull/22715","description":"The Legacy URL API is deprecated. Use the WHATWG URL API."}]}} />

<Metadata version="v19.5.0" data={{"stability":{"level":3,"text":" - Legacy: Use the WHATWG URL API instead."}}} />

The legacy `urlObject` (`require('node:url').Url` or
`import { Url } from 'node:url'`) is
created and returned by the `url.parse()` function.

##### <DataTag tag="M" /> `urlObject.auth`

The `auth` property is the username and password portion of the URL, also
referred to as _userinfo_. This string subset follows the `protocol` and
double slashes (if present) and precedes the `host` component, delimited by `@`.
The string is either the username, or it is the username and password separated
by `:`.

For example: `'user:pass'`.

##### <DataTag tag="M" /> `urlObject.hash`

The `hash` property is the fragment identifier portion of the URL including the
leading `#` character.

For example: `'#hash'`.

##### <DataTag tag="M" /> `urlObject.host`

The `host` property is the full lower-cased host portion of the URL, including
the `port` if specified.

For example: `'sub.example.com:8080'`.

##### <DataTag tag="M" /> `urlObject.hostname`

The `hostname` property is the lower-cased host name portion of the `host`
component _without_ the `port` included.

For example: `'sub.example.com'`.

##### <DataTag tag="M" /> `urlObject.href`

The `href` property is the full URL string that was parsed with both the
`protocol` and `host` components converted to lower-case.

For example: `'http://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash'`.

##### <DataTag tag="M" /> `urlObject.path`

The `path` property is a concatenation of the `pathname` and `search`
components.

For example: `'/p/a/t/h?query=string'`.

No decoding of the `path` is performed.

##### <DataTag tag="M" /> `urlObject.pathname`

The `pathname` property consists of the entire path section of the URL. This
is everything following the `host` (including the `port`) and before the start
of the `query` or `hash` components, delimited by either the ASCII question
mark (`?`) or hash (`#`) characters.

For example: `'/p/a/t/h'`.

No decoding of the path string is performed.

##### <DataTag tag="M" /> `urlObject.port`

The `port` property is the numeric port portion of the `host` component.

For example: `'8080'`.

##### <DataTag tag="M" /> `urlObject.protocol`

The `protocol` property identifies the URL's lower-cased protocol scheme.

For example: `'http:'`.

##### <DataTag tag="M" /> `urlObject.query`

The `query` property is either the query string without the leading ASCII
question mark (`?`), or an object returned by the [`querystring`][] module's
`parse()` method. Whether the `query` property is a string or object is
determined by the `parseQueryString` argument passed to `url.parse()`.

For example: `'query=string'` or `{'query': 'string'}`.

If returned as a string, no decoding of the query string is performed. If
returned as an object, both keys and values are decoded.

##### <DataTag tag="M" /> `urlObject.search`

The `search` property consists of the entire "query string" portion of the
URL, including the leading ASCII question mark (`?`) character.

For example: `'?query=string'`.

No decoding of the query string is performed.

##### <DataTag tag="M" /> `urlObject.slashes`

The `slashes` property is a `boolean` with a value of `true` if two ASCII
forward-slash characters (`/`) are required following the colon in the
`protocol`.

#### <DataTag tag="M" /> `url.format(urlObject)`

<Metadata version="v19.5.0" data={{"changes":[{"version":"v17.0.0","pr-url":"https://github.com/nodejs/node/pull/38631","description":"Now throws an `ERR_INVALID_URL` exception when Punycode conversion of a hostname introduces changes that could cause the URL to be re-parsed differently."},{"version":["v15.13.0","v14.17.0"],"pr-url":"https://github.com/nodejs/node/pull/37784","description":"Deprecation revoked. Status changed to \"Legacy\"."},{"version":"v11.0.0","pr-url":"https://github.com/nodejs/node/pull/22715","description":"The Legacy URL API is deprecated. Use the WHATWG URL API."},{"version":"v7.0.0","pr-url":"https://github.com/nodejs/node/pull/7234","description":"URLs with a `file:` scheme will now always use the correct number of slashes regardless of `slashes` option. A falsy `slashes` option with no protocol is now also respected at all times."}],"update":{"type":"added","version":["v0.1.25"]}}} />

<Metadata version="v19.5.0" data={{"stability":{"level":3,"text":" - Legacy: Use the WHATWG URL API instead."}}} />

* `urlObject` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) A URL object (as returned by `url.parse()` or
  constructed otherwise). If a string, it is converted to an object by passing
  it to `url.parse()`.

The `url.format()` method returns a formatted URL string derived from
`urlObject`.

```js
const url = require('node:url');
url.format({
  protocol: 'https',
  hostname: 'example.com',
  pathname: '/some/path',
  query: {
    page: 1,
    format: 'json',
  },
});

// => 'https://example.com/some/path?page=1&format=json'
```

If `urlObject` is not an object or a string, `url.format()` will throw a
[`TypeError`][].

The formatting process operates as follows:

* A new empty string `result` is created.
* If `urlObject.protocol` is a string, it is appended as-is to `result`.
* Otherwise, if `urlObject.protocol` is not `undefined` and is not a string, an
  [`Error`][] is thrown.
* For all string values of `urlObject.protocol` that _do not end_ with an ASCII
  colon (`:`) character, the literal string `:` will be appended to `result`.
* If either of the following conditions is true, then the literal string `//`
  will be appended to `result`:
  * `urlObject.slashes` property is true;
  * `urlObject.protocol` begins with `http`, `https`, `ftp`, `gopher`, or
    `file`;
* If the value of the `urlObject.auth` property is truthy, and either
  `urlObject.host` or `urlObject.hostname` are not `undefined`, the value of
  `urlObject.auth` will be coerced into a string and appended to `result`
  followed by the literal string `@`.
* If the `urlObject.host` property is `undefined` then:
  * If the `urlObject.hostname` is a string, it is appended to `result`.
  * Otherwise, if `urlObject.hostname` is not `undefined` and is not a string,
    an [`Error`][] is thrown.
  * If the `urlObject.port` property value is truthy, and `urlObject.hostname`
    is not `undefined`:
    * The literal string `:` is appended to `result`, and
    * The value of `urlObject.port` is coerced to a string and appended to
      `result`.
* Otherwise, if the `urlObject.host` property value is truthy, the value of
  `urlObject.host` is coerced to a string and appended to `result`.
* If the `urlObject.pathname` property is a string that is not an empty string:
  * If the `urlObject.pathname` _does not start_ with an ASCII forward slash
    (`/`), then the literal string `'/'` is appended to `result`.
  * The value of `urlObject.pathname` is appended to `result`.
* Otherwise, if `urlObject.pathname` is not `undefined` and is not a string, an
  [`Error`][] is thrown.
* If the `urlObject.search` property is `undefined` and if the `urlObject.query`
  property is an `Object`, the literal string `?` is appended to `result`
  followed by the output of calling the [`querystring`][] module's `stringify()`
  method passing the value of `urlObject.query`.
* Otherwise, if `urlObject.search` is a string:
  * If the value of `urlObject.search` _does not start_ with the ASCII question
    mark (`?`) character, the literal string `?` is appended to `result`.
  * The value of `urlObject.search` is appended to `result`.
* Otherwise, if `urlObject.search` is not `undefined` and is not a string, an
  [`Error`][] is thrown.
* If the `urlObject.hash` property is a string:
  * If the value of `urlObject.hash` _does not start_ with the ASCII hash (`#`)
    character, the literal string `#` is appended to `result`.
  * The value of `urlObject.hash` is appended to `result`.
* Otherwise, if the `urlObject.hash` property is not `undefined` and is not a
  string, an [`Error`][] is thrown.
* `result` is returned.

#### <DataTag tag="M" /> `url.parse(urlString[, parseQueryString[, slashesDenoteHost]])`

<Metadata version="v19.5.0" data={{"changes":[{"version":"v19.0.0","pr-url":"https://github.com/nodejs/node/pull/44919","description":"Documentation-only deprecation."},{"version":["v15.13.0","v14.17.0"],"pr-url":"https://github.com/nodejs/node/pull/37784","description":"Deprecation revoked. Status changed to \"Legacy\"."},{"version":"v11.14.0","pr-url":"https://github.com/nodejs/node/pull/26941","description":"The `pathname` property on the returned URL object is now `/` when there is no path and the protocol scheme is `ws:` or `wss:`."},{"version":"v11.0.0","pr-url":"https://github.com/nodejs/node/pull/22715","description":"The Legacy URL API is deprecated. Use the WHATWG URL API."},{"version":"v9.0.0","pr-url":"https://github.com/nodejs/node/pull/13606","description":"The `search` property on the returned URL object is now `null` when no query string is present."}],"update":{"type":"added","version":["v0.1.25"]}}} />

<Metadata version="v19.5.0" data={{"stability":{"level":0,"text":" - Deprecated: Use the WHATWG URL API instead."}}} />

* `urlString` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) The URL string to parse.
* `parseQueryString` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) If `true`, the `query` property will always
  be set to an object returned by the [`querystring`][] module's `parse()`
  method. If `false`, the `query` property on the returned URL object will be an
  unparsed, undecoded string. **Default:** `false`.
* `slashesDenoteHost` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) If `true`, the first token after the literal
  string `//` and preceding the next `/` will be interpreted as the `host`.
  For instance, given `//foo/bar`, the result would be
  `{host: 'foo', pathname: '/bar'}` rather than `{pathname: '//foo/bar'}`.
  **Default:** `false`.

The `url.parse()` method takes a URL string, parses it, and returns a URL
object.

A `TypeError` is thrown if `urlString` is not a string.

A `URIError` is thrown if the `auth` property is present but cannot be decoded.

`url.parse()` uses a lenient, non-standard algorithm for parsing URL
strings. It is prone to security issues such as [host name spoofing][]
and incorrect handling of usernames and passwords. Do not use with untrusted
input. CVEs are not issued for `url.parse()` vulnerabilities. Use the
[WHATWG URL][] API instead.

#### <DataTag tag="M" /> `url.resolve(from, to)`

<Metadata version="v19.5.0" data={{"changes":[{"version":["v15.13.0","v14.17.0"],"pr-url":"https://github.com/nodejs/node/pull/37784","description":"Deprecation revoked. Status changed to \"Legacy\"."},{"version":"v11.0.0","pr-url":"https://github.com/nodejs/node/pull/22715","description":"The Legacy URL API is deprecated. Use the WHATWG URL API."},{"version":"v6.6.0","pr-url":"https://github.com/nodejs/node/pull/8215","description":"The `auth` fields are now kept intact when `from` and `to` refer to the same host."},{"version":["v6.5.0","v4.6.2"],"pr-url":"https://github.com/nodejs/node/pull/8214","description":"The `port` field is copied correctly now."},{"version":"v6.0.0","pr-url":"https://github.com/nodejs/node/pull/1480","description":"The `auth` fields is cleared now the `to` parameter contains a hostname."}],"update":{"type":"added","version":["v0.1.25"]}}} />

<Metadata version="v19.5.0" data={{"stability":{"level":3,"text":" - Legacy: Use the WHATWG URL API instead."}}} />

* `from` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) The base URL to use if `to` is a relative URL.
* `to` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) The target URL to resolve.

The `url.resolve()` method resolves a target URL relative to a base URL in a
manner similar to that of a web browser resolving an anchor tag.

```js
const url = require('node:url');
url.resolve('/one/two/three', 'four');         // '/one/two/four'
url.resolve('http://example.com/', '/one');    // 'http://example.com/one'
url.resolve('http://example.com/one', '/two'); // 'http://example.com/two'
```

To achieve the same result using the WHATWG URL API:

```js
function resolve(from, to) {
  const resolvedUrl = new URL(to, new URL(from, 'resolve://'));
  if (resolvedUrl.protocol === 'resolve:') {
    // `from` is a relative URL.
    const { pathname, search, hash } = resolvedUrl;
    return pathname + search + hash;
  }
  return resolvedUrl.toString();
}

resolve('/one/two/three', 'four');         // '/one/two/four'
resolve('http://example.com/', '/one');    // 'http://example.com/one'
resolve('http://example.com/one', '/two'); // 'http://example.com/two'
```

<a id="whatwg-percent-encoding"></a>

### Percent-encoding in URLs

URLs are permitted to only contain a certain range of characters. Any character
falling outside of that range must be encoded. How such characters are encoded,
and which characters to encode depends entirely on where the character is
located within the structure of the URL.

#### Legacy API

Within the Legacy API, spaces (`' '`) and the following characters will be
automatically escaped in the properties of URL objects:

```text
< > " ` \r \n \t { } | \ ^ '
```

For example, the ASCII space character (`' '`) is encoded as `%20`. The ASCII
forward slash (`/`) character is encoded as `%3C`.

#### WHATWG API

The [WHATWG URL Standard][] uses a more selective and fine grained approach to
selecting encoded characters than that used by the Legacy API.

The WHATWG algorithm defines four "percent-encode sets" that describe ranges
of characters that must be percent-encoded:

* The _C0 control percent-encode set_ includes code points in range U+0000 to
  U+001F (inclusive) and all code points greater than U+007E.

* The _fragment percent-encode set_ includes the _C0 control percent-encode set_
  and code points U+0020, U+0022, U+003C, U+003E, and U+0060.

* The _path percent-encode set_ includes the _C0 control percent-encode set_
  and code points U+0020, U+0022, U+0023, U+003C, U+003E, U+003F, U+0060,
  U+007B, and U+007D.

* The _userinfo encode set_ includes the _path percent-encode set_ and code
  points U+002F, U+003A, U+003B, U+003D, U+0040, U+005B, U+005C, U+005D,
  U+005E, and U+007C.

The _userinfo percent-encode set_ is used exclusively for username and
passwords encoded within the URL. The _path percent-encode set_ is used for the
path of most URLs. The _fragment percent-encode set_ is used for URL fragments.
The _C0 control percent-encode set_ is used for host and path under certain
specific conditions, in addition to all other cases.

When non-ASCII characters appear within a host name, the host name is encoded
using the [Punycode][] algorithm. Note, however, that a host name _may_ contain
_both_ Punycode encoded and percent-encoded characters:

```js
const myURL = new URL('https://%CF%80.example.com/foo');
console.log(myURL.href);
// Prints https://xn--1xa.example.com/foo
console.log(myURL.origin);
// Prints https://xn--1xa.example.com
```

[ICU]: /api/v19/intl#options-for-building-nodejs
[Punycode]: https://tools.ietf.org/html/rfc5891#section-4.4
[WHATWG URL]: #the-whatwg-url-api
[WHATWG URL Standard]: https://url.spec.whatwg.org/
[`Error`]: /api/v19/errors#class-error
[`JSON.stringify()`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
[`Map`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
[`TypeError`]: /api/v19/errors#class-typeerror
[`URLSearchParams`]: #class-urlsearchparams
[`array.toString()`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toString
[`http.request()`]: /api/v19/http#httprequestoptions-callback
[`https.request()`]: /api/v19/https#httpsrequestoptions-callback
[`new URL()`]: #new-urlinput-base
[`querystring`]: /api/v19/querystring
[`url.domainToASCII()`]: #urldomaintoasciidomain
[`url.domainToUnicode()`]: #urldomaintounicodedomain
[`url.format()`]: #urlformaturlobject
[`url.href`]: #urlhref
[`url.parse()`]: #urlparseurlstring-parsequerystring-slashesdenotehost
[`url.search`]: #urlsearch
[`url.toJSON()`]: #urltojson
[`url.toString()`]: #urltostring
[`urlSearchParams.entries()`]: #urlsearchparamsentries
[`urlSearchParams@@iterator()`]: #urlsearchparamssymboliterator
[converted to a string]: https://tc39.es/ecma262/#sec-tostring
[examples of parsed URLs]: https://url.spec.whatwg.org/#example-url-parsing
[host name spoofing]: https://hackerone.com/reports/678487
[legacy `urlObject`]: #legacy-urlobject
[percent-encoded]: #percent-encoding-in-urls
[stable sorting algorithm]: https://en.wikipedia.org/wiki/Sorting_algorithm#Stability
