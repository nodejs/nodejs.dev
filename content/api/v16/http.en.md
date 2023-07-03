---
title: 'http'
displayTitle: 'HTTP'
category: 'api'
version: 'v16'
---

<Metadata data={{"update":{"type":"introduced_in","version":["v0.10.0"]}}} />

<Stability stability={2}>

Stable

</Stability>

<Metadata version="v16.20.1" data={{"source_link":"lib/http.js"}} />

To use the HTTP server and client one must `require('node:http')`.

The HTTP interfaces in Node.js are designed to support many features
of the protocol which have been traditionally difficult to use.
In particular, large, possibly chunk-encoded, messages. The interface is
careful to never buffer entire requests or responses, so the
user is able to stream data.

HTTP message headers are represented by an object like this:

```js
{ 'content-length': '123',
  'content-type': 'text/plain',
  'connection': 'keep-alive',
  'host': 'example.com',
  'accept': '*/*' }
```

Keys are lowercased. Values are not modified.

In order to support the full spectrum of possible HTTP applications, the Node.js
HTTP API is very low-level. It deals with stream handling and message
parsing only. It parses a message into headers and body but it does not
parse the actual headers or the body.

See [`message.headers`][] for details on how duplicate headers are handled.

The raw headers as they were received are retained in the `rawHeaders`
property, which is an array of `[key, value, key2, value2, ...]`. For
example, the previous message header object might have a `rawHeaders`
list like the following:

```js
[ 'ConTent-Length', '123456',
  'content-LENGTH', '123',
  'content-type', 'text/plain',
  'CONNECTION', 'keep-alive',
  'Host', 'example.com',
  'accepT', '*/*' ]
```

### <DataTag tag="C" /> `http.Agent`

<Metadata data={{"update":{"type":"added","version":["v0.3.4"]}}} />

An `Agent` is responsible for managing connection persistence
and reuse for HTTP clients. It maintains a queue of pending requests
for a given host and port, reusing a single socket connection for each
until the queue is empty, at which time the socket is either destroyed
or put into a pool where it is kept to be used again for requests to the
same host and port. Whether it is destroyed or pooled depends on the
`keepAlive` [option](#new-agentoptions).

Pooled connections have TCP Keep-Alive enabled for them, but servers may
still close idle connections, in which case they will be removed from the
pool and a new connection will be made when a new HTTP request is made for
that host and port. Servers may also refuse to allow multiple requests
over the same connection, in which case the connection will have to be
remade for every request and cannot be pooled. The `Agent` will still make
the requests to that server, but each one will occur over a new connection.

When a connection is closed by the client or the server, it is removed
from the pool. Any unused sockets in the pool will be unrefed so as not
to keep the Node.js process running when there are no outstanding requests.
(see [`socket.unref()`][]).

It is good practice, to [`destroy()`][] an `Agent` instance when it is no
longer in use, because unused sockets consume OS resources.

Sockets are removed from an agent when the socket emits either
a `'close'` event or an `'agentRemove'` event. When intending to keep one
HTTP request open for a long time without keeping it in the agent, something
like the following may be done:

```js
http.get(options, (res) => {
  // Do stuff
}).on('socket', (socket) => {
  socket.emit('agentRemove');
});
```

An agent may also be used for an individual request. By providing
`{agent: false}` as an option to the `http.get()` or `http.request()`
functions, a one-time use `Agent` with default options will be used
for the client connection.

`agent:false`:

```js
http.get({
  hostname: 'localhost',
  port: 80,
  path: '/',
  agent: false  // Create a new agent just for this one request
}, (res) => {
  // Do stuff with response
});
```

#### <DataTag tag="M" /> `new Agent([options])`

<Metadata data={{"changes":[{"version":"v15.6.0","pr-url":"https://github.com/nodejs/node/pull/36685","description":"Change the default scheduling from 'fifo' to 'lifo'."},{"version":["v14.5.0","v12.19.0"],"pr-url":"https://github.com/nodejs/node/pull/33617","description":"Add `maxTotalSockets` option to agent constructor."},{"version":["v14.5.0","v12.20.0"],"pr-url":"https://github.com/nodejs/node/pull/33278","description":"Add `scheduling` option to specify the free socket scheduling strategy."}],"update":{"type":"added","version":["v0.3.4"]}}} />

* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) Set of configurable options to set on the agent.
  Can have the following fields:
  * `keepAlive` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) Keep sockets around even when there are no
    outstanding requests, so they can be used for future requests without
    having to reestablish a TCP connection. Not to be confused with the
    `keep-alive` value of the `Connection` header. The `Connection: keep-alive`
    header is always sent when using an agent except when the `Connection`
    header is explicitly specified or when the `keepAlive` and `maxSockets`
    options are respectively set to `false` and `Infinity`, in which case
    `Connection: close` will be used. **Default:** `false`.
  * `keepAliveMsecs` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) When using the `keepAlive` option, specifies
    the [initial delay][]
    for TCP Keep-Alive packets. Ignored when the
    `keepAlive` option is `false` or `undefined`. **Default:** `1000`.
  * `maxSockets` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) Maximum number of sockets to allow per host.
    If the same host opens multiple concurrent connections, each request
    will use new socket until the `maxSockets` value is reached.
    If the host attempts to open more connections than `maxSockets`,
    the additional requests will enter into a pending request queue, and
    will enter active connection state when an existing connection terminates.
    This makes sure there are at most `maxSockets` active connections at
    any point in time, from a given host.
    **Default:** `Infinity`.
  * `maxTotalSockets` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) Maximum number of sockets allowed for
    all hosts in total. Each request will use a new socket
    until the maximum is reached.
    **Default:** `Infinity`.
  * `maxFreeSockets` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) Maximum number of sockets per host to leave open
    in a free state. Only relevant if `keepAlive` is set to `true`.
    **Default:** `256`.
  * `scheduling` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Scheduling strategy to apply when picking
    the next free socket to use. It can be `'fifo'` or `'lifo'`.
    The main difference between the two scheduling strategies is that `'lifo'`
    selects the most recently used socket, while `'fifo'` selects
    the least recently used socket.
    In case of a low rate of request per second, the `'lifo'` scheduling
    will lower the risk of picking a socket that might have been closed
    by the server due to inactivity.
    In case of a high rate of request per second,
    the `'fifo'` scheduling will maximize the number of open sockets,
    while the `'lifo'` scheduling will keep it as low as possible.
    **Default:** `'lifo'`.
  * `timeout` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) Socket timeout in milliseconds.
    This will set the timeout when the socket is created.

`options` in [`socket.connect()`][] are also supported.

The default [`http.globalAgent`][] that is used by [`http.request()`][] has all
of these values set to their respective defaults.

To configure any of them, a custom [`http.Agent`][] instance must be created.

```js
const http = require('node:http');
const keepAliveAgent = new http.Agent({ keepAlive: true });
options.agent = keepAliveAgent;
http.request(options, onResponseCallback);
```

#### <DataTag tag="M" /> `agent.createConnection(options[, callback])`

<Metadata data={{"update":{"type":"added","version":["v0.11.4"]}}} />

* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) Options containing connection details. Check
  [`net.createConnection()`][] for the format of the options
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) Callback function that receives the created socket
* Returns: [`stream.Duplex`](/api/v16/stream#streamduplex)

Produces a socket/stream to be used for HTTP requests.

By default, this function is the same as [`net.createConnection()`][]. However,
custom agents may override this method in case greater flexibility is desired.

A socket/stream can be supplied in one of two ways: by returning the
socket/stream from this function, or by passing the socket/stream to `callback`.

This method is guaranteed to return an instance of the [`net.Socket`](/api/v16/net#netsocket) class,
a subclass of [`stream.Duplex`](/api/v16/stream#streamduplex), unless the user specifies a socket
type other than [`net.Socket`](/api/v16/net#netsocket).

`callback` has a signature of `(err, stream)`.

#### <DataTag tag="M" /> `agent.keepSocketAlive(socket)`

<Metadata data={{"update":{"type":"added","version":["v8.1.0"]}}} />

* `socket` [`stream.Duplex`](/api/v16/stream#streamduplex)

Called when `socket` is detached from a request and could be persisted by the
`Agent`. Default behavior is to:

```js
socket.setKeepAlive(true, this.keepAliveMsecs);
socket.unref();
return true;
```

This method can be overridden by a particular `Agent` subclass. If this
method returns a falsy value, the socket will be destroyed instead of persisting
it for use with the next request.

The `socket` argument can be an instance of [`net.Socket`](/api/v16/net#netsocket), a subclass of
[`stream.Duplex`](/api/v16/stream#streamduplex).

#### <DataTag tag="M" /> `agent.reuseSocket(socket, request)`

<Metadata data={{"update":{"type":"added","version":["v8.1.0"]}}} />

* `socket` [`stream.Duplex`](/api/v16/stream#streamduplex)
* `request` [`http.ClientRequest`](/api/v16/http#httpclientrequest)

Called when `socket` is attached to `request` after being persisted because of
the keep-alive options. Default behavior is to:

```js
socket.ref();
```

This method can be overridden by a particular `Agent` subclass.

The `socket` argument can be an instance of [`net.Socket`](/api/v16/net#netsocket), a subclass of
[`stream.Duplex`](/api/v16/stream#streamduplex).

#### <DataTag tag="M" /> `agent.destroy()`

<Metadata data={{"update":{"type":"added","version":["v0.11.4"]}}} />

Destroy any sockets that are currently in use by the agent.

It is usually not necessary to do this. However, if using an
agent with `keepAlive` enabled, then it is best to explicitly shut down
the agent when it is no longer needed. Otherwise,
sockets might stay open for quite a long time before the server
terminates them.

#### <DataTag tag="M" /> `agent.freeSockets`

<Metadata data={{"changes":[{"version":"v16.0.0","pr-url":"https://github.com/nodejs/node/pull/36409","description":"The property now has a `null` prototype."}],"update":{"type":"added","version":["v0.11.4"]}}} />

* [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

An object which contains arrays of sockets currently awaiting use by
the agent when `keepAlive` is enabled. Do not modify.

Sockets in the `freeSockets` list will be automatically destroyed and
removed from the array on `'timeout'`.

#### <DataTag tag="M" /> `agent.getName([options])`

<Metadata data={{"changes":[{"version":"v16.15.0","pr-url":"https://github.com/nodejs/node/pull/41906","description":"The `options` parameter is now optional."}],"update":{"type":"added","version":["v0.11.4"]}}} />

* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) A set of options providing information for name generation
  * `host` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) A domain name or IP address of the server to issue the
    request to
  * `port` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) Port of remote server
  * `localAddress` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Local interface to bind for network connections
    when issuing the request
  * `family` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) Must be 4 or 6 if this doesn't equal `undefined`.
* Returns: [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

Get a unique name for a set of request options, to determine whether a
connection can be reused. For an HTTP agent, this returns
`host:port:localAddress` or `host:port:localAddress:family`. For an HTTPS agent,
the name includes the CA, cert, ciphers, and other HTTPS/TLS-specific options
that determine socket reusability.

#### <DataTag tag="M" /> `agent.maxFreeSockets`

<Metadata data={{"update":{"type":"added","version":["v0.11.7"]}}} />

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

By default set to 256. For agents with `keepAlive` enabled, this
sets the maximum number of sockets that will be left open in the free
state.

#### <DataTag tag="M" /> `agent.maxSockets`

<Metadata data={{"update":{"type":"added","version":["v0.3.6"]}}} />

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

By default set to `Infinity`. Determines how many concurrent sockets the agent
can have open per origin. Origin is the returned value of [`agent.getName()`][].

#### <DataTag tag="M" /> `agent.maxTotalSockets`

<Metadata data={{"update":{"type":"added","version":["v14.5.0","v12.19.0"]}}} />

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

By default set to `Infinity`. Determines how many concurrent sockets the agent
can have open. Unlike `maxSockets`, this parameter applies across all origins.

#### <DataTag tag="M" /> `agent.requests`

<Metadata data={{"changes":[{"version":"v16.0.0","pr-url":"https://github.com/nodejs/node/pull/36409","description":"The property now has a `null` prototype."}],"update":{"type":"added","version":["v0.5.9"]}}} />

* [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

An object which contains queues of requests that have not yet been assigned to
sockets. Do not modify.

#### <DataTag tag="M" /> `agent.sockets`

<Metadata data={{"changes":[{"version":"v16.0.0","pr-url":"https://github.com/nodejs/node/pull/36409","description":"The property now has a `null` prototype."}],"update":{"type":"added","version":["v0.3.6"]}}} />

* [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

An object which contains arrays of sockets currently in use by the
agent. Do not modify.

### <DataTag tag="C" /> `http.ClientRequest`

<Metadata data={{"update":{"type":"added","version":["v0.1.17"]}}} />

* Extends: [`http.OutgoingMessage`](/api/v16/http#httpoutgoingmessage)

This object is created internally and returned from [`http.request()`][]. It
represents an _in-progress_ request whose header has already been queued. The
header is still mutable using the [`setHeader(name, value)`][],
[`getHeader(name)`][], [`removeHeader(name)`][] API. The actual header will
be sent along with the first data chunk or when calling [`request.end()`][].

To get the response, add a listener for [`'response'`][] to the request object.
[`'response'`][] will be emitted from the request object when the response
headers have been received. The [`'response'`][] event is executed with one
argument which is an instance of [`http.IncomingMessage`][].

During the [`'response'`][] event, one can add listeners to the
response object; particularly to listen for the `'data'` event.

If no [`'response'`][] handler is added, then the response will be
entirely discarded. However, if a [`'response'`][] event handler is added,
then the data from the response object **must** be consumed, either by
calling `response.read()` whenever there is a `'readable'` event, or
by adding a `'data'` handler, or by calling the `.resume()` method.
Until the data is consumed, the `'end'` event will not fire. Also, until
the data is read it will consume memory that can eventually lead to a
'process out of memory' error.

For backward compatibility, `res` will only emit `'error'` if there is an
`'error'` listener registered.

Set `Content-Length` header to limit the response body size. Mismatching the
`Content-Length` header value will result in an \[`Error`]\[] being thrown,
identified by `code:` [`'ERR_HTTP_CONTENT_LENGTH_MISMATCH'`][].

`Content-Length` value should be in bytes, not characters. Use
[`Buffer.byteLength()`][] to determine the length of the body in bytes.

#### <DataTag tag="E" /> `'abort'`

<Metadata data={{"update":{"type":"deprecated","version":["v16.12.0"]}}} />

<Stability stability={0}>

Deprecated. Listen for the `'close'` event instead.

</Stability>

Emitted when the request has been aborted by the client. This event is only
emitted on the first call to `abort()`.

#### <DataTag tag="E" /> `'close'`

<Metadata data={{"update":{"type":"added","version":["v0.5.4"]}}} />

Indicates that the request is completed, or its underlying connection was
terminated prematurely (before the response completion).

#### <DataTag tag="E" /> `'connect'`

<Metadata data={{"update":{"type":"added","version":["v0.7.0"]}}} />

* `response` [`http.IncomingMessage`](/api/v16/http#httpincomingmessage)
* `socket` [`stream.Duplex`](/api/v16/stream#streamduplex)
* `head` [`Buffer`](/api/v16/buffer#buffer)

Emitted each time a server responds to a request with a `CONNECT` method. If
this event is not being listened for, clients receiving a `CONNECT` method will
have their connections closed.

This event is guaranteed to be passed an instance of the [`net.Socket`](/api/v16/net#netsocket) class,
a subclass of [`stream.Duplex`](/api/v16/stream#streamduplex), unless the user specifies a socket
type other than [`net.Socket`](/api/v16/net#netsocket).

A client and server pair demonstrating how to listen for the `'connect'` event:

```js
const http = require('node:http');
const net = require('node:net');
const { URL } = require('node:url');

// Create an HTTP tunneling proxy
const proxy = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('okay');
});
proxy.on('connect', (req, clientSocket, head) => {
  // Connect to an origin server
  const { port, hostname } = new URL(`http://${req.url}`);
  const serverSocket = net.connect(port || 80, hostname, () => {
    clientSocket.write('HTTP/1.1 200 Connection Established\r\n' +
                    'Proxy-agent: Node.js-Proxy\r\n' +
                    '\r\n');
    serverSocket.write(head);
    serverSocket.pipe(clientSocket);
    clientSocket.pipe(serverSocket);
  });
});

// Now that proxy is running
proxy.listen(1337, '127.0.0.1', () => {

  // Make a request to a tunneling proxy
  const options = {
    port: 1337,
    host: '127.0.0.1',
    method: 'CONNECT',
    path: 'www.google.com:80'
  };

  const req = http.request(options);
  req.end();

  req.on('connect', (res, socket, head) => {
    console.log('got connected!');

    // Make a request over an HTTP tunnel
    socket.write('GET / HTTP/1.1\r\n' +
                 'Host: www.google.com:80\r\n' +
                 'Connection: close\r\n' +
                 '\r\n');
    socket.on('data', (chunk) => {
      console.log(chunk.toString());
    });
    socket.on('end', () => {
      proxy.close();
    });
  });
});
```

#### <DataTag tag="E" /> `'continue'`

<Metadata data={{"update":{"type":"added","version":["v0.3.2"]}}} />

Emitted when the server sends a '100 Continue' HTTP response, usually because
the request contained 'Expect: 100-continue'. This is an instruction that
the client should send the request body.

#### <DataTag tag="E" /> `'finish'`

<Metadata data={{"update":{"type":"added","version":["v0.3.6"]}}} />

Emitted when the request has been sent. More specifically, this event is emitted
when the last segment of the response headers and body have been handed off to
the operating system for transmission over the network. It does not imply that
the server has received anything yet.

#### <DataTag tag="E" /> `'information'`

<Metadata data={{"update":{"type":"added","version":["v10.0.0"]}}} />

* `info` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `httpVersion` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
  * `httpVersionMajor` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
  * `httpVersionMinor` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
  * `statusCode` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
  * `statusMessage` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
  * `headers` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `rawHeaders` string\[]

Emitted when the server sends a 1xx intermediate response (excluding 101
Upgrade). The listeners of this event will receive an object containing the
HTTP version, status code, status message, key-value headers object,
and array with the raw header names followed by their respective values.

```js
const http = require('node:http');

const options = {
  host: '127.0.0.1',
  port: 8080,
  path: '/length_request'
};

// Make a request
const req = http.request(options);
req.end();

req.on('information', (info) => {
  console.log(`Got information prior to main response: ${info.statusCode}`);
});
```

101 Upgrade statuses do not fire this event due to their break from the
traditional HTTP request/response chain, such as web sockets, in-place TLS
upgrades, or HTTP 2.0. To be notified of 101 Upgrade notices, listen for the
[`'upgrade'`][] event instead.

#### <DataTag tag="E" /> `'response'`

<Metadata data={{"update":{"type":"added","version":["v0.1.0"]}}} />

* `response` [`http.IncomingMessage`](/api/v16/http#httpincomingmessage)

Emitted when a response is received to this request. This event is emitted only
once.

#### <DataTag tag="E" /> `'socket'`

<Metadata data={{"update":{"type":"added","version":["v0.5.3"]}}} />

* `socket` [`stream.Duplex`](/api/v16/stream#streamduplex)

This event is guaranteed to be passed an instance of the [`net.Socket`](/api/v16/net#netsocket) class,
a subclass of [`stream.Duplex`](/api/v16/stream#streamduplex), unless the user specifies a socket
type other than [`net.Socket`](/api/v16/net#netsocket).

#### <DataTag tag="E" /> `'timeout'`

<Metadata data={{"update":{"type":"added","version":["v0.7.8"]}}} />

Emitted when the underlying socket times out from inactivity. This only notifies
that the socket has been idle. The request must be destroyed manually.

See also: [`request.setTimeout()`][].

#### <DataTag tag="E" /> `'upgrade'`

<Metadata data={{"update":{"type":"added","version":["v0.1.94"]}}} />

* `response` [`http.IncomingMessage`](/api/v16/http#httpincomingmessage)
* `socket` [`stream.Duplex`](/api/v16/stream#streamduplex)
* `head` [`Buffer`](/api/v16/buffer#buffer)

Emitted each time a server responds to a request with an upgrade. If this
event is not being listened for and the response status code is 101 Switching
Protocols, clients receiving an upgrade header will have their connections
closed.

This event is guaranteed to be passed an instance of the [`net.Socket`](/api/v16/net#netsocket) class,
a subclass of [`stream.Duplex`](/api/v16/stream#streamduplex), unless the user specifies a socket
type other than [`net.Socket`](/api/v16/net#netsocket).

A client server pair demonstrating how to listen for the `'upgrade'` event.

```js
const http = require('node:http');

// Create an HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('okay');
});
server.on('upgrade', (req, socket, head) => {
  socket.write('HTTP/1.1 101 Web Socket Protocol Handshake\r\n' +
               'Upgrade: WebSocket\r\n' +
               'Connection: Upgrade\r\n' +
               '\r\n');

  socket.pipe(socket); // echo back
});

// Now that server is running
server.listen(1337, '127.0.0.1', () => {

  // make a request
  const options = {
    port: 1337,
    host: '127.0.0.1',
    headers: {
      'Connection': 'Upgrade',
      'Upgrade': 'websocket'
    }
  };

  const req = http.request(options);
  req.end();

  req.on('upgrade', (res, socket, upgradeHead) => {
    console.log('got upgraded!');
    socket.end();
    process.exit(0);
  });
});
```

#### <DataTag tag="M" /> `request.abort()`

<Metadata data={{"update":{"type":"deprecated","version":["v14.1.0","v13.14.0"]}}} />

<Stability stability={0}>

Deprecated: Use [`request.destroy()`][] instead.

</Stability>

Marks the request as aborting. Calling this will cause remaining data
in the response to be dropped and the socket to be destroyed.

#### <DataTag tag="M" /> `request.aborted`

<Metadata data={{"changes":[{"version":"v11.0.0","pr-url":"https://github.com/nodejs/node/pull/20230","description":"The `aborted` property is no longer a timestamp number."}],"update":{"type":"deprecated","version":["v16.12.0"]}}} />

<Stability stability={0}>

Deprecated. Check [`request.destroyed`][] instead.

</Stability>

* [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

The `request.aborted` property will be `true` if the request has
been aborted.

#### <DataTag tag="M" /> `request.connection`

<Metadata data={{"update":{"type":"deprecated","version":["v13.0.0"]}}} />

<Stability stability={0}>

Deprecated. Use [`request.socket`][].

</Stability>

* [`stream.Duplex`](/api/v16/stream#streamduplex)

See [`request.socket`][].

#### <DataTag tag="M" /> `request.cork()`

<Metadata data={{"update":{"type":"added","version":["v13.2.0","v12.16.0"]}}} />

See [`writable.cork()`][].

#### <DataTag tag="M" /> `request.end([data[, encoding]][, callback])`

<Metadata data={{"changes":[{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/18780","description":"This method now returns a reference to `ClientRequest`."}],"update":{"type":"added","version":["v0.1.90"]}}} />

* `data` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/v16/buffer#buffer)
* `encoding` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
* Returns: [`this`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)

Finishes sending the request. If any parts of the body are
unsent, it will flush them to the stream. If the request is
chunked, this will send the terminating `'0\r\n\r\n'`.

If `data` is specified, it is equivalent to calling
[`request.write(data, encoding)`][] followed by `request.end(callback)`.

If `callback` is specified, it will be called when the request stream
is finished.

#### <DataTag tag="M" /> `request.destroy([error])`

<Metadata data={{"changes":[{"version":"v14.5.0","pr-url":"https://github.com/nodejs/node/pull/32789","description":"The function returns `this` for consistency with other Readable streams."}],"update":{"type":"added","version":["v0.3.0"]}}} />

* `error` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) Optional, an error to emit with `'error'` event.
* Returns: [`this`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)

Destroy the request. Optionally emit an `'error'` event,
and emit a `'close'` event. Calling this will cause remaining data
in the response to be dropped and the socket to be destroyed.

See [`writable.destroy()`][] for further details.

##### <DataTag tag="M" /> `request.destroyed`

<Metadata data={{"update":{"type":"added","version":["v14.1.0","v13.14.0"]}}} />

* [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Is `true` after [`request.destroy()`][] has been called.

See [`writable.destroyed`][] for further details.

#### <DataTag tag="M" /> `request.finished`

<Metadata data={{"update":{"type":"deprecated","version":["v13.4.0","v12.16.0"]}}} />

<Stability stability={0}>

Deprecated. Use [`request.writableEnded`][].

</Stability>

* [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

The `request.finished` property will be `true` if [`request.end()`][]
has been called. `request.end()` will automatically be called if the
request was initiated via [`http.get()`][].

#### <DataTag tag="M" /> `request.flushHeaders()`

<Metadata data={{"update":{"type":"added","version":["v1.6.0"]}}} />

Flushes the request headers.

For efficiency reasons, Node.js normally buffers the request headers until
`request.end()` is called or the first chunk of request data is written. It
then tries to pack the request headers and data into a single TCP packet.

That's usually desired (it saves a TCP round-trip), but not when the first
data is not sent until possibly much later. `request.flushHeaders()` bypasses
the optimization and kickstarts the request.

#### <DataTag tag="M" /> `request.getHeader(name)`

<Metadata data={{"update":{"type":"added","version":["v1.6.0"]}}} />

* `name` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
* Returns: [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types)

Reads out a header on the request. The name is case-insensitive.
The type of the return value depends on the arguments provided to
[`request.setHeader()`][].

```js
request.setHeader('content-type', 'text/html');
request.setHeader('Content-Length', Buffer.byteLength(body));
request.setHeader('Cookie', ['type=ninja', 'language=javascript']);
const contentType = request.getHeader('Content-Type');
// 'contentType' is 'text/html'
const contentLength = request.getHeader('Content-Length');
// 'contentLength' is of type number
const cookie = request.getHeader('Cookie');
// 'cookie' is of type string[]
```

#### <DataTag tag="M" /> `request.getHeaderNames()`

<Metadata data={{"update":{"type":"added","version":["v7.7.0"]}}} />

* Returns: string\[]

Returns an array containing the unique names of the current outgoing headers.
All header names are lowercase.

```js
request.setHeader('Foo', 'bar');
request.setHeader('Cookie', ['foo=bar', 'bar=baz']);

const headerNames = request.getHeaderNames();
// headerNames === ['foo', 'cookie']
```

#### <DataTag tag="M" /> `request.getHeaders()`

<Metadata data={{"update":{"type":"added","version":["v7.7.0"]}}} />

* Returns: [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

Returns a shallow copy of the current outgoing headers. Since a shallow copy
is used, array values may be mutated without additional calls to various
header-related http module methods. The keys of the returned object are the
header names and the values are the respective header values. All header names
are lowercase.

The object returned by the `request.getHeaders()` method _does not_
prototypically inherit from the JavaScript `Object`. This means that typical
`Object` methods such as `obj.toString()`, `obj.hasOwnProperty()`, and others
are not defined and _will not work_.

```js
request.setHeader('Foo', 'bar');
request.setHeader('Cookie', ['foo=bar', 'bar=baz']);

const headers = request.getHeaders();
// headers === { foo: 'bar', 'cookie': ['foo=bar', 'bar=baz'] }
```

#### <DataTag tag="M" /> `request.getRawHeaderNames()`

<Metadata data={{"update":{"type":"added","version":["v15.13.0"]}}} />

* Returns: string\[]

Returns an array containing the unique names of the current outgoing raw
headers. Header names are returned with their exact casing being set.

```js
request.setHeader('Foo', 'bar');
request.setHeader('Set-Cookie', ['foo=bar', 'bar=baz']);

const headerNames = request.getRawHeaderNames();
// headerNames === ['Foo', 'Set-Cookie']
```

#### <DataTag tag="M" /> `request.hasHeader(name)`

<Metadata data={{"update":{"type":"added","version":["v7.7.0"]}}} />

* `name` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
* Returns: [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Returns `true` if the header identified by `name` is currently set in the
outgoing headers. The header name matching is case-insensitive.

```js
const hasContentType = request.hasHeader('content-type');
```

#### <DataTag tag="M" /> `request.maxHeadersCount`

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `2000`

Limits maximum response headers count. If set to 0, no limit will be applied.

#### <DataTag tag="M" /> `request.path`

<Metadata data={{"update":{"type":"added","version":["v0.4.0"]}}} />

* [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) The request path.

#### <DataTag tag="M" /> `request.method`

<Metadata data={{"update":{"type":"added","version":["v0.1.97"]}}} />

* [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) The request method.

#### <DataTag tag="M" /> `request.host`

<Metadata data={{"update":{"type":"added","version":["v14.5.0","v12.19.0"]}}} />

* [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) The request host.

#### <DataTag tag="M" /> `request.protocol`

<Metadata data={{"update":{"type":"added","version":["v14.5.0","v12.19.0"]}}} />

* [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) The request protocol.

#### <DataTag tag="M" /> `request.removeHeader(name)`

<Metadata data={{"update":{"type":"added","version":["v1.6.0"]}}} />

* `name` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

Removes a header that's already defined into headers object.

```js
request.removeHeader('Content-Type');
```

#### <DataTag tag="M" /> `request.reusedSocket`

<Metadata data={{"update":{"type":"added","version":["v13.0.0","v12.16.0"]}}} />

* [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) Whether the request is send through a reused socket.

When sending request through a keep-alive enabled agent, the underlying socket
might be reused. But if server closes connection at unfortunate time, client
may run into a 'ECONNRESET' error.

```js
const http = require('node:http');

// Server has a 5 seconds keep-alive timeout by default
http
  .createServer((req, res) => {
    res.write('hello\n');
    res.end();
  })
  .listen(3000);

setInterval(() => {
  // Adapting a keep-alive agent
  http.get('http://localhost:3000', { agent }, (res) => {
    res.on('data', (data) => {
      // Do nothing
    });
  });
}, 5000); // Sending request on 5s interval so it's easy to hit idle timeout
```

By marking a request whether it reused socket or not, we can do
automatic error retry base on it.

```js
const http = require('node:http');
const agent = new http.Agent({ keepAlive: true });

function retriableRequest() {
  const req = http
    .get('http://localhost:3000', { agent }, (res) => {
      // ...
    })
    .on('error', (err) => {
      // Check if retry is needed
      if (req.reusedSocket && err.code === 'ECONNRESET') {
        retriableRequest();
      }
    });
}

retriableRequest();
```

#### <DataTag tag="M" /> `request.setHeader(name, value)`

<Metadata data={{"update":{"type":"added","version":["v1.6.0"]}}} />

* `name` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
* `value` [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types)

Sets a single header value for headers object. If this header already exists in
the to-be-sent headers, its value will be replaced. Use an array of strings
here to send multiple headers with the same name. Non-string values will be
stored without modification. Therefore, [`request.getHeader()`][] may return
non-string values. However, the non-string values will be converted to strings
for network transmission.

```js
request.setHeader('Content-Type', 'application/json');
```

or

```js
request.setHeader('Cookie', ['type=ninja', 'language=javascript']);
```

When the value is a string an exception will be thrown if it contains
characters outside the `latin1` encoding.

If you need to pass UTF-8 characters in the value please encode the value
using the [RFC 8187][] standard.

```js
const filename = 'Rock 🎵.txt';
request.setHeader('Content-Disposition', `attachment; filename*=utf-8''${encodeURIComponent(filename)}`);
```

#### <DataTag tag="M" /> `request.setNoDelay([noDelay])`

<Metadata data={{"update":{"type":"added","version":["v0.5.9"]}}} />

* `noDelay` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Once a socket is assigned to this request and is connected
[`socket.setNoDelay()`][] will be called.

#### <DataTag tag="M" /> `request.setSocketKeepAlive([enable][, initialDelay])`

<Metadata data={{"update":{"type":"added","version":["v0.5.9"]}}} />

* `enable` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)
* `initialDelay` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

Once a socket is assigned to this request and is connected
[`socket.setKeepAlive()`][] will be called.

#### <DataTag tag="M" /> `request.setTimeout(timeout[, callback])`

<Metadata data={{"changes":[{"version":"v9.0.0","pr-url":"https://github.com/nodejs/node/pull/8895","description":"Consistently set socket timeout only when the socket connects."}],"update":{"type":"added","version":["v0.5.9"]}}} />

* `timeout` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) Milliseconds before a request times out.
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) Optional function to be called when a timeout occurs.
  Same as binding to the `'timeout'` event.
* Returns: [`http.ClientRequest`](/api/v16/http#httpclientrequest)

Once a socket is assigned to this request and is connected
[`socket.setTimeout()`][] will be called.

#### <DataTag tag="M" /> `request.socket`

<Metadata data={{"update":{"type":"added","version":["v0.3.0"]}}} />

* [`stream.Duplex`](/api/v16/stream#streamduplex)

Reference to the underlying socket. Usually users will not want to access
this property. In particular, the socket will not emit `'readable'` events
because of how the protocol parser attaches to the socket.

```js
const http = require('node:http');
const options = {
  host: 'www.google.com',
};
const req = http.get(options);
req.end();
req.once('response', (res) => {
  const ip = req.socket.localAddress;
  const port = req.socket.localPort;
  console.log(`Your IP address is ${ip} and your source port is ${port}.`);
  // Consume response object
});
```

This property is guaranteed to be an instance of the [`net.Socket`](/api/v16/net#netsocket) class,
a subclass of [`stream.Duplex`](/api/v16/stream#streamduplex), unless the user specified a socket
type other than [`net.Socket`](/api/v16/net#netsocket).

#### <DataTag tag="M" /> `request.uncork()`

<Metadata data={{"update":{"type":"added","version":["v13.2.0","v12.16.0"]}}} />

See [`writable.uncork()`][].

#### <DataTag tag="M" /> `request.writableEnded`

<Metadata data={{"update":{"type":"added","version":["v12.9.0"]}}} />

* [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Is `true` after [`request.end()`][] has been called. This property
does not indicate whether the data has been flushed, for this use
[`request.writableFinished`][] instead.

#### <DataTag tag="M" /> `request.writableFinished`

<Metadata data={{"update":{"type":"added","version":["v12.7.0"]}}} />

* [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Is `true` if all data has been flushed to the underlying system, immediately
before the [`'finish'`][] event is emitted.

#### <DataTag tag="M" /> `request.write(chunk[, encoding][, callback])`

<Metadata data={{"update":{"type":"added","version":["v0.1.29"]}}} />

* `chunk` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/v16/buffer#buffer)
* `encoding` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
* Returns: [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Sends a chunk of the body. This method can be called multiple times. If no
`Content-Length` is set, data will automatically be encoded in HTTP Chunked
transfer encoding, so that server knows when the data ends. The
`Transfer-Encoding: chunked` header is added. Calling [`request.end()`][]
is necessary to finish sending the request.

The `encoding` argument is optional and only applies when `chunk` is a string.
Defaults to `'utf8'`.

The `callback` argument is optional and will be called when this chunk of data
is flushed, but only if the chunk is non-empty.

Returns `true` if the entire data was flushed successfully to the kernel
buffer. Returns `false` if all or part of the data was queued in user memory.
`'drain'` will be emitted when the buffer is free again.

When `write` function is called with empty string or buffer, it does
nothing and waits for more input.

### <DataTag tag="C" /> `http.Server`

<Metadata data={{"update":{"type":"added","version":["v0.1.17"]}}} />

* Extends: [`net.Server`](/api/v16/net#netserver)

#### <DataTag tag="E" /> `'checkContinue'`

<Metadata data={{"update":{"type":"added","version":["v0.3.0"]}}} />

* `request` [`http.IncomingMessage`](/api/v16/http#httpincomingmessage)
* `response` [`http.ServerResponse`](/api/v16/http#httpserverresponse)

Emitted each time a request with an HTTP `Expect: 100-continue` is received.
If this event is not listened for, the server will automatically respond
with a `100 Continue` as appropriate.

Handling this event involves calling [`response.writeContinue()`][] if the
client should continue to send the request body, or generating an appropriate
HTTP response (e.g. 400 Bad Request) if the client should not continue to send
the request body.

When this event is emitted and handled, the [`'request'`][] event will
not be emitted.

#### <DataTag tag="E" /> `'checkExpectation'`

<Metadata data={{"update":{"type":"added","version":["v5.5.0"]}}} />

* `request` [`http.IncomingMessage`](/api/v16/http#httpincomingmessage)
* `response` [`http.ServerResponse`](/api/v16/http#httpserverresponse)

Emitted each time a request with an HTTP `Expect` header is received, where the
value is not `100-continue`. If this event is not listened for, the server will
automatically respond with a `417 Expectation Failed` as appropriate.

When this event is emitted and handled, the [`'request'`][] event will
not be emitted.

#### <DataTag tag="E" /> `'clientError'`

<Metadata data={{"changes":[{"version":"v12.0.0","pr-url":"https://github.com/nodejs/node/pull/25605","description":"The default behavior will return a 431 Request Header Fields Too Large if a HPE_HEADER_OVERFLOW error occurs."},{"version":"v9.4.0","pr-url":"https://github.com/nodejs/node/pull/17672","description":"The `rawPacket` is the current buffer that just parsed. Adding this buffer to the error object of `'clientError'` event is to make it possible that developers can log the broken packet."},{"version":"v6.0.0","pr-url":"https://github.com/nodejs/node/pull/4557","description":"The default action of calling `.destroy()` on the `socket` will no longer take place if there are listeners attached for `'clientError'`."}],"update":{"type":"added","version":["v0.1.94"]}}} />

* `exception` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
* `socket` [`stream.Duplex`](/api/v16/stream#streamduplex)

If a client connection emits an `'error'` event, it will be forwarded here.
Listener of this event is responsible for closing/destroying the underlying
socket. For example, one may wish to more gracefully close the socket with a
custom HTTP response instead of abruptly severing the connection.

This event is guaranteed to be passed an instance of the [`net.Socket`](/api/v16/net#netsocket) class,
a subclass of [`stream.Duplex`](/api/v16/stream#streamduplex), unless the user specifies a socket
type other than [`net.Socket`](/api/v16/net#netsocket).

Default behavior is to try close the socket with a HTTP '400 Bad Request',
or a HTTP '431 Request Header Fields Too Large' in the case of a
[`HPE_HEADER_OVERFLOW`][] error. If the socket is not writable or has already
written data it is immediately destroyed.

`socket` is the [`net.Socket`][] object that the error originated from.

```js
const http = require('node:http');

const server = http.createServer((req, res) => {
  res.end();
});
server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
server.listen(8000);
```

When the `'clientError'` event occurs, there is no `request` or `response`
object, so any HTTP response sent, including response headers and payload,
_must_ be written directly to the `socket` object. Care must be taken to
ensure the response is a properly formatted HTTP response message.

`err` is an instance of `Error` with two extra columns:

* `bytesParsed`: the bytes count of request packet that Node.js may have parsed
  correctly;
* `rawPacket`: the raw packet of current request.

In some cases, the client has already received the response and/or the socket
has already been destroyed, like in case of `ECONNRESET` errors. Before
trying to send data to the socket, it is better to check that it is still
writable.

```js
server.on('clientError', (err, socket) => {
  if (err.code === 'ECONNRESET' || !socket.writable) {
    return;
  }

  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
```

#### <DataTag tag="E" /> `'close'`

<Metadata data={{"update":{"type":"added","version":["v0.1.4"]}}} />

Emitted when the server closes.

#### <DataTag tag="E" /> `'connect'`

<Metadata data={{"update":{"type":"added","version":["v0.7.0"]}}} />

* `request` [`http.IncomingMessage`](/api/v16/http#httpincomingmessage) Arguments for the HTTP request, as it is in
  the [`'request'`][] event
* `socket` [`stream.Duplex`](/api/v16/stream#streamduplex) Network socket between the server and client
* `head` [`Buffer`](/api/v16/buffer#buffer) The first packet of the tunneling stream (may be empty)

Emitted each time a client requests an HTTP `CONNECT` method. If this event is
not listened for, then clients requesting a `CONNECT` method will have their
connections closed.

This event is guaranteed to be passed an instance of the [`net.Socket`](/api/v16/net#netsocket) class,
a subclass of [`stream.Duplex`](/api/v16/stream#streamduplex), unless the user specifies a socket
type other than [`net.Socket`](/api/v16/net#netsocket).

After this event is emitted, the request's socket will not have a `'data'`
event listener, meaning it will need to be bound in order to handle data
sent to the server on that socket.

#### <DataTag tag="E" /> `'connection'`

<Metadata data={{"update":{"type":"added","version":["v0.1.0"]}}} />

* `socket` [`stream.Duplex`](/api/v16/stream#streamduplex)

This event is emitted when a new TCP stream is established. `socket` is
typically an object of type [`net.Socket`][]. Usually users will not want to
access this event. In particular, the socket will not emit `'readable'` events
because of how the protocol parser attaches to the socket. The `socket` can
also be accessed at `request.socket`.

This event can also be explicitly emitted by users to inject connections
into the HTTP server. In that case, any [`Duplex`][] stream can be passed.

If `socket.setTimeout()` is called here, the timeout will be replaced with
`server.keepAliveTimeout` when the socket has served a request (if
`server.keepAliveTimeout` is non-zero).

This event is guaranteed to be passed an instance of the [`net.Socket`](/api/v16/net#netsocket) class,
a subclass of [`stream.Duplex`](/api/v16/stream#streamduplex), unless the user specifies a socket
type other than [`net.Socket`](/api/v16/net#netsocket).

#### <DataTag tag="E" /> `'dropRequest'`

<Metadata data={{"update":{"type":"added","version":["v16.17.0"]}}} />

* `request` [`http.IncomingMessage`](/api/v16/http#httpincomingmessage) Arguments for the HTTP request, as it is in
  the [`'request'`][] event
* `socket` [`stream.Duplex`](/api/v16/stream#streamduplex) Network socket between the server and client

When the number of requests on a socket reaches the threshold of
`server.maxRequestsPerSocket`, the server will drop new requests
and emit `'dropRequest'` event instead, then send `503` to client.

#### <DataTag tag="E" /> `'request'`

<Metadata data={{"update":{"type":"added","version":["v0.1.0"]}}} />

* `request` [`http.IncomingMessage`](/api/v16/http#httpincomingmessage)
* `response` [`http.ServerResponse`](/api/v16/http#httpserverresponse)

Emitted each time there is a request. There may be multiple requests
per connection (in the case of HTTP Keep-Alive connections).

#### <DataTag tag="E" /> `'upgrade'`

<Metadata data={{"changes":[{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/19981","description":"Not listening to this event no longer causes the socket to be destroyed if a client sends an Upgrade header."}],"update":{"type":"added","version":["v0.1.94"]}}} />

* `request` [`http.IncomingMessage`](/api/v16/http#httpincomingmessage) Arguments for the HTTP request, as it is in
  the [`'request'`][] event
* `socket` [`stream.Duplex`](/api/v16/stream#streamduplex) Network socket between the server and client
* `head` [`Buffer`](/api/v16/buffer#buffer) The first packet of the upgraded stream (may be empty)

Emitted each time a client requests an HTTP upgrade. Listening to this event
is optional and clients cannot insist on a protocol change.

After this event is emitted, the request's socket will not have a `'data'`
event listener, meaning it will need to be bound in order to handle data
sent to the server on that socket.

This event is guaranteed to be passed an instance of the [`net.Socket`](/api/v16/net#netsocket) class,
a subclass of [`stream.Duplex`](/api/v16/stream#streamduplex), unless the user specifies a socket
type other than [`net.Socket`](/api/v16/net#netsocket).

#### <DataTag tag="M" /> `server.close([callback])`

<Metadata data={{"update":{"type":"added","version":["v0.1.90"]}}} />

* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)

Stops the server from accepting new connections. See [`net.Server.close()`][].

#### <DataTag tag="M" /> `server.headersTimeout`

<Metadata data={{"update":{"type":"added","version":["v11.3.0","v10.14.0"]}}} />

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `60000`

Limit the amount of time the parser will wait to receive the complete HTTP
headers.

In case of inactivity, the rules defined in [`server.timeout`][] apply. However,
that inactivity based timeout would still allow the connection to be kept open
if the headers are being sent very slowly (by default, up to a byte per 2
minutes). In order to prevent this, whenever header data arrives an additional
check is made that more than `server.headersTimeout` milliseconds has not
passed since the connection was established. If the check fails, a `'timeout'`
event is emitted on the server object, and (by default) the socket is destroyed.
See [`server.timeout`][] for more information on how timeout behavior can be
customized.

#### <DataTag tag="M" /> `server.listen()`

Starts the HTTP server listening for connections.
This method is identical to [`server.listen()`][] from [`net.Server`][].

#### <DataTag tag="M" /> `server.listening`

<Metadata data={{"update":{"type":"added","version":["v5.7.0"]}}} />

* [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) Indicates whether or not the server is listening for connections.

#### <DataTag tag="M" /> `server.maxHeadersCount`

<Metadata data={{"update":{"type":"added","version":["v0.7.0"]}}} />

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `2000`

Limits maximum incoming headers count. If set to 0, no limit will be applied.

#### <DataTag tag="M" /> `server.requestTimeout`

<Metadata data={{"update":{"type":"added","version":["v14.11.0"]}}} />

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `0`

Sets the timeout value in milliseconds for receiving the entire request from
the client.

If the timeout expires, the server responds with status 408 without
forwarding the request to the request listener and then closes the connection.

It must be set to a non-zero value (e.g. 120 seconds) to protect against
potential Denial-of-Service attacks in case the server is deployed without a
reverse proxy in front.

#### <DataTag tag="M" /> `server.setTimeout([msecs][, callback])`

<Metadata data={{"changes":[{"version":"v13.0.0","pr-url":"https://github.com/nodejs/node/pull/27558","description":"The default timeout changed from 120s to 0 (no timeout)."}],"update":{"type":"added","version":["v0.9.12"]}}} />

* `msecs` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** 0 (no timeout)
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
* Returns: [`http.Server`](/api/v16/http#httpserver)

Sets the timeout value for sockets, and emits a `'timeout'` event on
the Server object, passing the socket as an argument, if a timeout
occurs.

If there is a `'timeout'` event listener on the Server object, then it
will be called with the timed-out socket as an argument.

By default, the Server does not timeout sockets. However, if a callback
is assigned to the Server's `'timeout'` event, timeouts must be handled
explicitly.

#### <DataTag tag="M" /> `server.maxRequestsPerSocket`

<Metadata data={{"update":{"type":"added","version":["v16.10.0"]}}} />

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) Requests per socket. **Default:** 0 (no limit)

The maximum number of requests socket can handle
before closing keep alive connection.

A value of `0` will disable the limit.

When the limit is reached it will set the `Connection` header value to `close`,
but will not actually close the connection, subsequent requests sent
after the limit is reached will get `503 Service Unavailable` as a response.

#### <DataTag tag="M" /> `server.timeout`

<Metadata data={{"changes":[{"version":"v13.0.0","pr-url":"https://github.com/nodejs/node/pull/27558","description":"The default timeout changed from 120s to 0 (no timeout)."}],"update":{"type":"added","version":["v0.9.12"]}}} />

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) Timeout in milliseconds. **Default:** 0 (no timeout)

The number of milliseconds of inactivity before a socket is presumed
to have timed out.

A value of `0` will disable the timeout behavior on incoming connections.

The socket timeout logic is set up on connection, so changing this
value only affects new connections to the server, not any existing connections.

#### <DataTag tag="M" /> `server.keepAliveTimeout`

<Metadata data={{"update":{"type":"added","version":["v8.0.0"]}}} />

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) Timeout in milliseconds. **Default:** `5000` (5 seconds).

The number of milliseconds of inactivity a server needs to wait for additional
incoming data, after it has finished writing the last response, before a socket
will be destroyed. If the server receives new data before the keep-alive
timeout has fired, it will reset the regular inactivity timeout, i.e.,
[`server.timeout`][].

A value of `0` will disable the keep-alive timeout behavior on incoming
connections.
A value of `0` makes the http server behave similarly to Node.js versions prior
to 8.0.0, which did not have a keep-alive timeout.

The socket timeout logic is set up on connection, so changing this value only
affects new connections to the server, not any existing connections.

### <DataTag tag="C" /> `http.ServerResponse`

<Metadata data={{"update":{"type":"added","version":["v0.1.17"]}}} />

* Extends: [`http.OutgoingMessage`](/api/v16/http#httpoutgoingmessage)

This object is created internally by an HTTP server, not by the user. It is
passed as the second parameter to the [`'request'`][] event.

#### <DataTag tag="E" /> `'close'`

<Metadata data={{"update":{"type":"added","version":["v0.6.7"]}}} />

Indicates that the response is completed, or its underlying connection was
terminated prematurely (before the response completion).

#### <DataTag tag="E" /> `'finish'`

<Metadata data={{"update":{"type":"added","version":["v0.3.6"]}}} />

Emitted when the response has been sent. More specifically, this event is
emitted when the last segment of the response headers and body have been
handed off to the operating system for transmission over the network. It
does not imply that the client has received anything yet.

#### <DataTag tag="M" /> `response.addTrailers(headers)`

<Metadata data={{"update":{"type":"added","version":["v0.3.0"]}}} />

* `headers` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

This method adds HTTP trailing headers (a header but at the end of the
message) to the response.

Trailers will **only** be emitted if chunked encoding is used for the
response; if it is not (e.g. if the request was HTTP/1.0), they will
be silently discarded.

HTTP requires the `Trailer` header to be sent in order to
emit trailers, with a list of the header fields in its value. E.g.,

```js
response.writeHead(200, { 'Content-Type': 'text/plain',
                          'Trailer': 'Content-MD5' });
response.write(fileData);
response.addTrailers({ 'Content-MD5': '7895bf4b8828b55ceaf47747b4bca667' });
response.end();
```

Attempting to set a header field name or value that contains invalid characters
will result in a [`TypeError`][] being thrown.

#### <DataTag tag="M" /> `response.connection`

<Metadata data={{"update":{"type":"deprecated","version":["v13.0.0"]}}} />

<Stability stability={0}>

Deprecated. Use [`response.socket`][].

</Stability>

* [`stream.Duplex`](/api/v16/stream#streamduplex)

See [`response.socket`][].

#### <DataTag tag="M" /> `response.cork()`

<Metadata data={{"update":{"type":"added","version":["v13.2.0","v12.16.0"]}}} />

See [`writable.cork()`][].

#### <DataTag tag="M" /> `response.end([data[, encoding]][, callback])`

<Metadata data={{"changes":[{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/18780","description":"This method now returns a reference to `ServerResponse`."}],"update":{"type":"added","version":["v0.1.90"]}}} />

* `data` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/v16/buffer#buffer)
* `encoding` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
* Returns: [`this`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)

This method signals to the server that all of the response headers and body
have been sent; that server should consider this message complete.
The method, `response.end()`, MUST be called on each response.

If `data` is specified, it is similar in effect to calling
[`response.write(data, encoding)`][] followed by `response.end(callback)`.

If `callback` is specified, it will be called when the response stream
is finished.

#### <DataTag tag="M" /> `response.finished`

<Metadata data={{"update":{"type":"deprecated","version":["v13.4.0","v12.16.0"]}}} />

<Stability stability={0}>

Deprecated. Use [`response.writableEnded`][].

</Stability>

* [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

The `response.finished` property will be `true` if [`response.end()`][]
has been called.

#### <DataTag tag="M" /> `response.flushHeaders()`

<Metadata data={{"update":{"type":"added","version":["v1.6.0"]}}} />

Flushes the response headers. See also: [`request.flushHeaders()`][].

#### <DataTag tag="M" /> `response.getHeader(name)`

<Metadata data={{"update":{"type":"added","version":["v0.4.0"]}}} />

* `name` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
* Returns: [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types)

Reads out a header that's already been queued but not sent to the client.
The name is case-insensitive. The type of the return value depends
on the arguments provided to [`response.setHeader()`][].

```js
response.setHeader('Content-Type', 'text/html');
response.setHeader('Content-Length', Buffer.byteLength(body));
response.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);
const contentType = response.getHeader('content-type');
// contentType is 'text/html'
const contentLength = response.getHeader('Content-Length');
// contentLength is of type number
const setCookie = response.getHeader('set-cookie');
// setCookie is of type string[]
```

#### <DataTag tag="M" /> `response.getHeaderNames()`

<Metadata data={{"update":{"type":"added","version":["v7.7.0"]}}} />

* Returns: string\[]

Returns an array containing the unique names of the current outgoing headers.
All header names are lowercase.

```js
response.setHeader('Foo', 'bar');
response.setHeader('Set-Cookie', ['foo=bar', 'bar=baz']);

const headerNames = response.getHeaderNames();
// headerNames === ['foo', 'set-cookie']
```

#### <DataTag tag="M" /> `response.getHeaders()`

<Metadata data={{"update":{"type":"added","version":["v7.7.0"]}}} />

* Returns: [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

Returns a shallow copy of the current outgoing headers. Since a shallow copy
is used, array values may be mutated without additional calls to various
header-related http module methods. The keys of the returned object are the
header names and the values are the respective header values. All header names
are lowercase.

The object returned by the `response.getHeaders()` method _does not_
prototypically inherit from the JavaScript `Object`. This means that typical
`Object` methods such as `obj.toString()`, `obj.hasOwnProperty()`, and others
are not defined and _will not work_.

```js
response.setHeader('Foo', 'bar');
response.setHeader('Set-Cookie', ['foo=bar', 'bar=baz']);

const headers = response.getHeaders();
// headers === { foo: 'bar', 'set-cookie': ['foo=bar', 'bar=baz'] }
```

#### <DataTag tag="M" /> `response.hasHeader(name)`

<Metadata data={{"update":{"type":"added","version":["v7.7.0"]}}} />

* `name` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
* Returns: [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Returns `true` if the header identified by `name` is currently set in the
outgoing headers. The header name matching is case-insensitive.

```js
const hasContentType = response.hasHeader('content-type');
```

#### <DataTag tag="M" /> `response.headersSent`

<Metadata data={{"update":{"type":"added","version":["v0.9.3"]}}} />

* [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Boolean (read-only). True if headers were sent, false otherwise.

#### <DataTag tag="M" /> `response.removeHeader(name)`

<Metadata data={{"update":{"type":"added","version":["v0.4.0"]}}} />

* `name` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

Removes a header that's queued for implicit sending.

```js
response.removeHeader('Content-Encoding');
```

#### <DataTag tag="M" /> `response.req`

<Metadata data={{"update":{"type":"added","version":["v15.7.0"]}}} />

* [`http.IncomingMessage`](/api/v16/http#httpincomingmessage)

A reference to the original HTTP `request` object.

#### <DataTag tag="M" /> `response.sendDate`

<Metadata data={{"update":{"type":"added","version":["v0.7.5"]}}} />

* [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

When true, the Date header will be automatically generated and sent in
the response if it is not already present in the headers. Defaults to true.

This should only be disabled for testing; HTTP requires the Date header
in responses.

#### <DataTag tag="M" /> `response.setHeader(name, value)`

<Metadata data={{"update":{"type":"added","version":["v0.4.0"]}}} />

* `name` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
* `value` [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types)
* Returns: [`http.ServerResponse`](/api/v16/http#httpserverresponse)

Returns the response object.

Sets a single header value for implicit headers. If this header already exists
in the to-be-sent headers, its value will be replaced. Use an array of strings
here to send multiple headers with the same name. Non-string values will be
stored without modification. Therefore, [`response.getHeader()`][] may return
non-string values. However, the non-string values will be converted to strings
for network transmission. The same response object is returned to the caller,
to enable call chaining.

```js
response.setHeader('Content-Type', 'text/html');
```

or

```js
response.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);
```

Attempting to set a header field name or value that contains invalid characters
will result in a [`TypeError`][] being thrown.

When headers have been set with [`response.setHeader()`][], they will be merged
with any headers passed to [`response.writeHead()`][], with the headers passed
to [`response.writeHead()`][] given precedence.

```js
// Returns content-type = text/plain
const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('X-Foo', 'bar');
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('ok');
});
```

If [`response.writeHead()`][] method is called and this method has not been
called, it will directly write the supplied header values onto the network
channel without caching internally, and the [`response.getHeader()`][] on the
header will not yield the expected result. If progressive population of headers
is desired with potential future retrieval and modification, use
[`response.setHeader()`][] instead of [`response.writeHead()`][].

#### <DataTag tag="M" /> `response.setTimeout(msecs[, callback])`

<Metadata data={{"update":{"type":"added","version":["v0.9.12"]}}} />

* `msecs` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
* Returns: [`http.ServerResponse`](/api/v16/http#httpserverresponse)

Sets the Socket's timeout value to `msecs`. If a callback is
provided, then it is added as a listener on the `'timeout'` event on
the response object.

If no `'timeout'` listener is added to the request, the response, or
the server, then sockets are destroyed when they time out. If a handler is
assigned to the request, the response, or the server's `'timeout'` events,
timed out sockets must be handled explicitly.

#### <DataTag tag="M" /> `response.socket`

<Metadata data={{"update":{"type":"added","version":["v0.3.0"]}}} />

* [`stream.Duplex`](/api/v16/stream#streamduplex)

Reference to the underlying socket. Usually users will not want to access
this property. In particular, the socket will not emit `'readable'` events
because of how the protocol parser attaches to the socket. After
`response.end()`, the property is nulled.

```js
const http = require('node:http');
const server = http.createServer((req, res) => {
  const ip = res.socket.remoteAddress;
  const port = res.socket.remotePort;
  res.end(`Your IP address is ${ip} and your source port is ${port}.`);
}).listen(3000);
```

This property is guaranteed to be an instance of the [`net.Socket`](/api/v16/net#netsocket) class,
a subclass of [`stream.Duplex`](/api/v16/stream#streamduplex), unless the user specified a socket
type other than [`net.Socket`](/api/v16/net#netsocket).

#### <DataTag tag="M" /> `response.statusCode`

<Metadata data={{"update":{"type":"added","version":["v0.4.0"]}}} />

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `200`

When using implicit headers (not calling [`response.writeHead()`][] explicitly),
this property controls the status code that will be sent to the client when
the headers get flushed.

```js
response.statusCode = 404;
```

After response header was sent to the client, this property indicates the
status code which was sent out.

#### <DataTag tag="M" /> `response.statusMessage`

<Metadata data={{"update":{"type":"added","version":["v0.11.8"]}}} />

* [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

When using implicit headers (not calling [`response.writeHead()`][] explicitly),
this property controls the status message that will be sent to the client when
the headers get flushed. If this is left as `undefined` then the standard
message for the status code will be used.

```js
response.statusMessage = 'Not found';
```

After response header was sent to the client, this property indicates the
status message which was sent out.

#### <DataTag tag="M" /> `response.uncork()`

<Metadata data={{"update":{"type":"added","version":["v13.2.0","v12.16.0"]}}} />

See [`writable.uncork()`][].

#### <DataTag tag="M" /> `response.writableEnded`

<Metadata data={{"update":{"type":"added","version":["v12.9.0"]}}} />

* [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Is `true` after [`response.end()`][] has been called. This property
does not indicate whether the data has been flushed, for this use
[`response.writableFinished`][] instead.

#### <DataTag tag="M" /> `response.writableFinished`

<Metadata data={{"update":{"type":"added","version":["v12.7.0"]}}} />

* [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Is `true` if all data has been flushed to the underlying system, immediately
before the [`'finish'`][] event is emitted.

#### <DataTag tag="M" /> `response.write(chunk[, encoding][, callback])`

<Metadata data={{"update":{"type":"added","version":["v0.1.29"]}}} />

* `chunk` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/v16/buffer#buffer)
* `encoding` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) **Default:** `'utf8'`
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
* Returns: [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

If this method is called and [`response.writeHead()`][] has not been called,
it will switch to implicit header mode and flush the implicit headers.

This sends a chunk of the response body. This method may
be called multiple times to provide successive parts of the body.

In the `node:http` module, the response body is omitted when the
request is a HEAD request. Similarly, the `204` and `304` responses
_must not_ include a message body.

`chunk` can be a string or a buffer. If `chunk` is a string,
the second parameter specifies how to encode it into a byte stream.
`callback` will be called when this chunk of data is flushed.

This is the raw HTTP body and has nothing to do with higher-level multi-part
body encodings that may be used.

The first time [`response.write()`][] is called, it will send the buffered
header information and the first chunk of the body to the client. The second
time [`response.write()`][] is called, Node.js assumes data will be streamed,
and sends the new data separately. That is, the response is buffered up to the
first chunk of the body.

Returns `true` if the entire data was flushed successfully to the kernel
buffer. Returns `false` if all or part of the data was queued in user memory.
`'drain'` will be emitted when the buffer is free again.

#### <DataTag tag="M" /> `response.writeContinue()`

<Metadata data={{"update":{"type":"added","version":["v0.3.0"]}}} />

Sends a HTTP/1.1 100 Continue message to the client, indicating that
the request body should be sent. See the [`'checkContinue'`][] event on
`Server`.

#### <DataTag tag="M" /> `response.writeHead(statusCode[, statusMessage][, headers])`

<Metadata data={{"changes":[{"version":"v14.14.0","pr-url":"https://github.com/nodejs/node/pull/35274","description":"Allow passing headers as an array."},{"version":["v11.10.0","v10.17.0"],"pr-url":"https://github.com/nodejs/node/pull/25974","description":"Return `this` from `writeHead()` to allow chaining with `end()`."},{"version":["v5.11.0","v4.4.5"],"pr-url":"https://github.com/nodejs/node/pull/6291","description":"A `RangeError` is thrown if `statusCode` is not a number in the range `[100, 999]`."}],"update":{"type":"added","version":["v0.1.30"]}}} />

* `statusCode` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
* `statusMessage` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
* `headers` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) | [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
* Returns: [`http.ServerResponse`](/api/v16/http#httpserverresponse)

Sends a response header to the request. The status code is a 3-digit HTTP
status code, like `404`. The last argument, `headers`, are the response headers.
Optionally one can give a human-readable `statusMessage` as the second
argument.

`headers` may be an `Array` where the keys and values are in the same list.
It is _not_ a list of tuples. So, the even-numbered offsets are key values,
and the odd-numbered offsets are the associated values. The array is in the same
format as `request.rawHeaders`.

Returns a reference to the `ServerResponse`, so that calls can be chained.

```js
const body = 'hello world';
response
  .writeHead(200, {
    'Content-Length': Buffer.byteLength(body),
    'Content-Type': 'text/plain'
  })
  .end(body);
```

This method must only be called once on a message and it must
be called before [`response.end()`][] is called.

If [`response.write()`][] or [`response.end()`][] are called before calling
this, the implicit/mutable headers will be calculated and call this function.

When headers have been set with [`response.setHeader()`][], they will be merged
with any headers passed to [`response.writeHead()`][], with the headers passed
to [`response.writeHead()`][] given precedence.

If this method is called and [`response.setHeader()`][] has not been called,
it will directly write the supplied header values onto the network channel
without caching internally, and the [`response.getHeader()`][] on the header
will not yield the expected result. If progressive population of headers is
desired with potential future retrieval and modification, use
[`response.setHeader()`][] instead.

```js
// Returns content-type = text/plain
const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('X-Foo', 'bar');
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('ok');
});
```

`Content-Length` is read in bytes, not characters. Use
[`Buffer.byteLength()`][] to determine the length of the body in bytes. Node.js
will check whether `Content-Length` and the length of the body which has
been transmitted are equal or not.

Attempting to set a header field name or value that contains invalid characters
will result in a \[`Error`]\[] being thrown.

#### <DataTag tag="M" /> `response.writeProcessing()`

<Metadata data={{"update":{"type":"added","version":["v10.0.0"]}}} />

Sends a HTTP/1.1 102 Processing message to the client, indicating that
the request body should be sent.

### <DataTag tag="C" /> `http.IncomingMessage`

<Metadata data={{"changes":[{"version":"v15.5.0","pr-url":"https://github.com/nodejs/node/pull/33035","description":"The `destroyed` value returns `true` after the incoming data is consumed."},{"version":["v13.1.0","v12.16.0"],"pr-url":"https://github.com/nodejs/node/pull/30135","description":"The `readableHighWaterMark` value mirrors that of the socket."}],"update":{"type":"added","version":["v0.1.17"]}}} />

* Extends: [`stream.Readable`](/api/v16/stream#streamreadable)

An `IncomingMessage` object is created by [`http.Server`][] or
[`http.ClientRequest`][] and passed as the first argument to the [`'request'`][]
and [`'response'`][] event respectively. It may be used to access response
status, headers, and data.

Different from its `socket` value which is a subclass of [`stream.Duplex`](/api/v16/stream#streamduplex), the
`IncomingMessage` itself extends [`stream.Readable`](/api/v16/stream#streamreadable) and is created separately to
parse and emit the incoming HTTP headers and payload, as the underlying socket
may be reused multiple times in case of keep-alive.

#### <DataTag tag="E" /> `'aborted'`

<Metadata data={{"update":{"type":"deprecated","version":["v16.12.0"]}}} />

<Stability stability={0}>

Deprecated. Listen for `'close'` event instead.

</Stability>

Emitted when the request has been aborted.

#### <DataTag tag="E" /> `'close'`

<Metadata data={{"changes":[{"version":"v16.0.0","pr-url":"https://github.com/nodejs/node/pull/33035","description":"The close event is now emitted when the request has been completed and not when the underlying socket is closed."}],"update":{"type":"added","version":["v0.4.2"]}}} />

Emitted when the request has been completed.

#### <DataTag tag="M" /> `message.aborted`

<Metadata data={{"update":{"type":"deprecated","version":["v16.12.0"]}}} />

<Stability stability={0}>

Deprecated. Check `message.destroyed` from {stream.Readable}.

</Stability>

* [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

The `message.aborted` property will be `true` if the request has
been aborted.

#### <DataTag tag="M" /> `message.complete`

<Metadata data={{"update":{"type":"added","version":["v0.3.0"]}}} />

* [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

The `message.complete` property will be `true` if a complete HTTP message has
been received and successfully parsed.

This property is particularly useful as a means of determining if a client or
server fully transmitted a message before a connection was terminated:

```js
const req = http.request({
  host: '127.0.0.1',
  port: 8080,
  method: 'POST'
}, (res) => {
  res.resume();
  res.on('end', () => {
    if (!res.complete)
      console.error(
        'The connection was terminated while the message was still being sent');
  });
});
```

#### <DataTag tag="M" /> `message.connection`

<Metadata data={{"update":{"type":"deprecated","version":["v16.0.0"]}}} />

<Stability stability={0}>

Deprecated. Use [`message.socket`][].

</Stability>

Alias for [`message.socket`][].

#### <DataTag tag="M" /> `message.destroy([error])`

<Metadata data={{"changes":[{"version":["v14.5.0","v12.19.0"],"pr-url":"https://github.com/nodejs/node/pull/32789","description":"The function returns `this` for consistency with other Readable streams."}],"update":{"type":"added","version":["v0.3.0"]}}} />

* `error` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
* Returns: [`this`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)

Calls `destroy()` on the socket that received the `IncomingMessage`. If `error`
is provided, an `'error'` event is emitted on the socket and `error` is passed
as an argument to any listeners on the event.

#### <DataTag tag="M" /> `message.headers`

<Metadata data={{"changes":[{"version":"v15.1.0","pr-url":"https://github.com/nodejs/node/pull/35281","description":"`message.headers` is now lazily computed using an accessor property on the prototype and is no longer enumerable."}],"update":{"type":"added","version":["v0.1.5"]}}} />

* [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

The request/response headers object.

Key-value pairs of header names and values. Header names are lower-cased.

```js
// Prints something like:
//
// { 'user-agent': 'curl/7.22.0',
//   host: '127.0.0.1:8000',
//   accept: '*/*' }
console.log(request.headers);
```

Duplicates in raw headers are handled in the following ways, depending on the
header name:

* Duplicates of `age`, `authorization`, `content-length`, `content-type`,
  `etag`, `expires`, `from`, `host`, `if-modified-since`, `if-unmodified-since`,
  `last-modified`, `location`, `max-forwards`, `proxy-authorization`, `referer`,
  `retry-after`, `server`, or `user-agent` are discarded.
* `set-cookie` is always an array. Duplicates are added to the array.
* For duplicate `cookie` headers, the values are joined together with `; `.
* For all other headers, the values are joined together with `, `.

#### <DataTag tag="M" /> `message.headersDistinct`

<Metadata data={{"update":{"type":"added","version":["v16.17.0"]}}} />

* [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

Similar to [`message.headers`][], but there is no join logic and the values are
always arrays of strings, even for headers received just once.

```js
// Prints something like:
//
// { 'user-agent': ['curl/7.22.0'],
//   host: ['127.0.0.1:8000'],
//   accept: ['*/*'] }
console.log(request.headersDistinct);
```

#### <DataTag tag="M" /> `message.httpVersion`

<Metadata data={{"update":{"type":"added","version":["v0.1.1"]}}} />

* [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

In case of server request, the HTTP version sent by the client. In the case of
client response, the HTTP version of the connected-to server.
Probably either `'1.1'` or `'1.0'`.

Also `message.httpVersionMajor` is the first integer and
`message.httpVersionMinor` is the second.

#### <DataTag tag="M" /> `message.method`

<Metadata data={{"update":{"type":"added","version":["v0.1.1"]}}} />

* [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

**Only valid for request obtained from [`http.Server`][].**

The request method as a string. Read only. Examples: `'GET'`, `'DELETE'`.

#### <DataTag tag="M" /> `message.rawHeaders`

<Metadata data={{"update":{"type":"added","version":["v0.11.6"]}}} />

* string\[]

The raw request/response headers list exactly as they were received.

The keys and values are in the same list. It is _not_ a
list of tuples. So, the even-numbered offsets are key values, and the
odd-numbered offsets are the associated values.

Header names are not lowercased, and duplicates are not merged.

```js
// Prints something like:
//
// [ 'user-agent',
//   'this is invalid because there can be only one',
//   'User-Agent',
//   'curl/7.22.0',
//   'Host',
//   '127.0.0.1:8000',
//   'ACCEPT',
//   '*/*' ]
console.log(request.rawHeaders);
```

#### <DataTag tag="M" /> `message.rawTrailers`

<Metadata data={{"update":{"type":"added","version":["v0.11.6"]}}} />

* string\[]

The raw request/response trailer keys and values exactly as they were
received. Only populated at the `'end'` event.

#### <DataTag tag="M" /> `message.setTimeout(msecs[, callback])`

<Metadata data={{"update":{"type":"added","version":["v0.5.9"]}}} />

* `msecs` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
* Returns: [`http.IncomingMessage`](/api/v16/http#httpincomingmessage)

Calls `message.socket.setTimeout(msecs, callback)`.

#### <DataTag tag="M" /> `message.socket`

<Metadata data={{"update":{"type":"added","version":["v0.3.0"]}}} />

* [`stream.Duplex`](/api/v16/stream#streamduplex)

The [`net.Socket`][] object associated with the connection.

With HTTPS support, use [`request.socket.getPeerCertificate()`][] to obtain the
client's authentication details.

This property is guaranteed to be an instance of the [`net.Socket`](/api/v16/net#netsocket) class,
a subclass of [`stream.Duplex`](/api/v16/stream#streamduplex), unless the user specified a socket
type other than [`net.Socket`](/api/v16/net#netsocket) or internally nulled.

#### <DataTag tag="M" /> `message.statusCode`

<Metadata data={{"update":{"type":"added","version":["v0.1.1"]}}} />

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

**Only valid for response obtained from [`http.ClientRequest`][].**

The 3-digit HTTP response status code. E.G. `404`.

#### <DataTag tag="M" /> `message.statusMessage`

<Metadata data={{"update":{"type":"added","version":["v0.11.10"]}}} />

* [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

**Only valid for response obtained from [`http.ClientRequest`][].**

The HTTP response status message (reason phrase). E.G. `OK` or `Internal Server
Error`.

#### <DataTag tag="M" /> `message.trailers`

<Metadata data={{"update":{"type":"added","version":["v0.3.0"]}}} />

* [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

The request/response trailers object. Only populated at the `'end'` event.

#### <DataTag tag="M" /> `message.trailersDistinct`

<Metadata data={{"update":{"type":"added","version":["v16.17.0"]}}} />

* [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

Similar to [`message.trailers`][], but there is no join logic and the values are
always arrays of strings, even for headers received just once.
Only populated at the `'end'` event.

#### <DataTag tag="M" /> `message.url`

<Metadata data={{"update":{"type":"added","version":["v0.1.90"]}}} />

* [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

**Only valid for request obtained from [`http.Server`][].**

Request URL string. This contains only the URL that is present in the actual
HTTP request. Take the following request:

```http
GET /status?name=ryan HTTP/1.1
Accept: text/plain
```

To parse the URL into its parts:

```js
new URL(request.url, `http://${request.headers.host}`);
```

When `request.url` is `'/status?name=ryan'` and `request.headers.host` is
`'localhost:3000'`:

```console
$ node
> new URL(request.url, `http://${request.headers.host}`)
URL {
  href: 'http://localhost:3000/status?name=ryan',
  origin: 'http://localhost:3000',
  protocol: 'http:',
  username: '',
  password: '',
  host: 'localhost:3000',
  hostname: 'localhost',
  port: '3000',
  pathname: '/status',
  search: '?name=ryan',
  searchParams: URLSearchParams { 'name' => 'ryan' },
  hash: ''
}
```

### <DataTag tag="C" /> `http.OutgoingMessage`

<Metadata data={{"update":{"type":"added","version":["v0.1.17"]}}} />

* Extends: [`Stream`](/api/v16/stream#stream)

This class serves as the parent class of [`http.ClientRequest`][]
and [`http.ServerResponse`][]. It is an abstract outgoing message from
the perspective of the participants of an HTTP transaction.

#### <DataTag tag="E" /> `'drain'`

<Metadata data={{"update":{"type":"added","version":["v0.3.6"]}}} />

Emitted when the buffer of the message is free again.

#### <DataTag tag="E" /> `'finish'`

<Metadata data={{"update":{"type":"added","version":["v0.1.17"]}}} />

Emitted when the transmission is finished successfully.

#### <DataTag tag="E" /> `'prefinish'`

<Metadata data={{"update":{"type":"added","version":["v0.11.6"]}}} />

Emitted after `outgoingMessage.end()` is called.
When the event is emitted, all data has been processed but not necessarily
completely flushed.

#### <DataTag tag="M" /> `outgoingMessage.addTrailers(headers)`

<Metadata data={{"update":{"type":"added","version":["v0.3.0"]}}} />

* `headers` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

Adds HTTP trailers (headers but at the end of the message) to the message.

Trailers will **only** be emitted if the message is chunked encoded. If not,
the trailers will be silently discarded.

HTTP requires the `Trailer` header to be sent to emit trailers,
with a list of header field names in its value, e.g.

```js
message.writeHead(200, { 'Content-Type': 'text/plain',
                         'Trailer': 'Content-MD5' });
message.write(fileData);
message.addTrailers({ 'Content-MD5': '7895bf4b8828b55ceaf47747b4bca667' });
message.end();
```

Attempting to set a header field name or value that contains invalid characters
will result in a `TypeError` being thrown.

#### <DataTag tag="M" /> `outgoingMessage.appendHeader(name, value)`

<Metadata data={{"update":{"type":"added","version":["v16.17.0"]}}} />

* `name` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Header name
* `value` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Header value
* Returns: [`this`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)

Append a single header value for the header object.

If the value is an array, this is equivalent of calling this method multiple
times.

If there were no previous value for the header, this is equivalent of calling
[`outgoingMessage.setHeader(name, value)`][].

Depending of the value of `options.uniqueHeaders` when the client request or the
server were created, this will end up in the header being sent multiple times or
a single time with values joined using `; `.

#### <DataTag tag="M" /> `outgoingMessage.connection`

<Metadata data={{"update":{"type":"deprecated","version":["v15.12.0"]}}} />

<Stability stability={0}>

Deprecated: Use [`outgoingMessage.socket`][] instead.

</Stability>

Alias of [`outgoingMessage.socket`][].

#### <DataTag tag="M" /> `outgoingMessage.cork()`

<Metadata data={{"update":{"type":"added","version":["v13.2.0","v12.16.0"]}}} />

See [`writable.cork()`][].

#### <DataTag tag="M" /> `outgoingMessage.destroy([error])`

<Metadata data={{"update":{"type":"added","version":["v0.3.0"]}}} />

* `error` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) Optional, an error to emit with `error` event
* Returns: [`this`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)

Destroys the message. Once a socket is associated with the message
and is connected, that socket will be destroyed as well.

#### <DataTag tag="M" /> `outgoingMessage.end(chunk[, encoding][, callback])`

<Metadata data={{"changes":[{"version":"v0.11.6","description":"add `callback` argument."}],"update":{"type":"added","version":["v0.1.90"]}}} />

* `chunk` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/v16/buffer#buffer)
* `encoding` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Optional, **Default**: `utf8`
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) Optional
* Returns: [`this`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)

Finishes the outgoing message. If any parts of the body are unsent, it will
flush them to the underlying system. If the message is chunked, it will
send the terminating chunk `0\r\n\r\n`, and send the trailers (if any).

If `chunk` is specified, it is equivalent to calling
`outgoingMessage.write(chunk, encoding)`, followed by
`outgoingMessage.end(callback)`.

If `callback` is provided, it will be called when the message is finished
(equivalent to a listener of the `'finish'` event).

#### <DataTag tag="M" /> `outgoingMessage.flushHeaders()`

<Metadata data={{"update":{"type":"added","version":["v1.6.0"]}}} />

Flushes the message headers.

For efficiency reason, Node.js normally buffers the message headers
until `outgoingMessage.end()` is called or the first chunk of message data
is written. It then tries to pack the headers and data into a single TCP
packet.

It is usually desired (it saves a TCP round-trip), but not when the first
data is not sent until possibly much later. `outgoingMessage.flushHeaders()`
bypasses the optimization and kickstarts the message.

#### <DataTag tag="M" /> `outgoingMessage.getHeader(name)`

<Metadata data={{"update":{"type":"added","version":["v0.4.0"]}}} />

* `name` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Name of header
* Returns [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Undefined_type)

Gets the value of the HTTP header with the given name. If that header is not
set, the returned value will be `undefined`.

#### <DataTag tag="M" /> `outgoingMessage.getHeaderNames()`

<Metadata data={{"update":{"type":"added","version":["v7.7.0"]}}} />

* Returns string\[]

Returns an array containing the unique names of the current outgoing headers.
All names are lowercase.

#### <DataTag tag="M" /> `outgoingMessage.getHeaders()`

<Metadata data={{"update":{"type":"added","version":["v7.7.0"]}}} />

* Returns: [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

Returns a shallow copy of the current outgoing headers. Since a shallow
copy is used, array values may be mutated without additional calls to
various header-related HTTP module methods. The keys of the returned
object are the header names and the values are the respective header
values. All header names are lowercase.

The object returned by the `outgoingMessage.getHeaders()` method does
not prototypically inherit from the JavaScript `Object`. This means that
typical `Object` methods such as `obj.toString()`, `obj.hasOwnProperty()`,
and others are not defined and will not work.

```js
outgoingMessage.setHeader('Foo', 'bar');
outgoingMessage.setHeader('Set-Cookie', ['foo=bar', 'bar=baz']);

const headers = outgoingMessage.getHeaders();
// headers === { foo: 'bar', 'set-cookie': ['foo=bar', 'bar=baz'] }
```

#### <DataTag tag="M" /> `outgoingMessage.hasHeader(name)`

<Metadata data={{"update":{"type":"added","version":["v7.7.0"]}}} />

* `name` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
* Returns [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Returns `true` if the header identified by `name` is currently set in the
outgoing headers. The header name is case-insensitive.

```js
const hasContentType = outgoingMessage.hasHeader('content-type');
```

#### <DataTag tag="M" /> `outgoingMessage.headersSent`

<Metadata data={{"update":{"type":"added","version":["v0.9.3"]}}} />

* [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Read-only. `true` if the headers were sent, otherwise `false`.

#### <DataTag tag="M" /> `outgoingMessage.pipe()`

<Metadata data={{"update":{"type":"added","version":["v9.0.0"]}}} />

Overrides the `stream.pipe()` method inherited from the legacy `Stream` class
which is the parent class of `http.OutgoingMessage`.

Calling this method will throw an `Error` because `outgoingMessage` is a
write-only stream.

#### <DataTag tag="M" /> `outgoingMessage.removeHeader(name)`

<Metadata data={{"update":{"type":"added","version":["v0.4.0"]}}} />

* `name` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Header name

Removes a header that is queued for implicit sending.

```js
outgoingMessage.removeHeader('Content-Encoding');
```

#### <DataTag tag="M" /> `outgoingMessage.setHeader(name, value)`

<Metadata data={{"update":{"type":"added","version":["v0.4.0"]}}} />

* `name` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Header name
* `value` [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types) Header value
* Returns: [`this`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)

Sets a single header value. If the header already exists in the to-be-sent
headers, its value will be replaced. Use an array of strings to send multiple
headers with the same name.

#### <DataTag tag="M" /> `outgoingMessage.setTimeout(msesc[, callback])`

<Metadata data={{"update":{"type":"added","version":["v0.9.12"]}}} />

* `msesc` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) Optional function to be called when a timeout
  occurs. Same as binding to the `timeout` event.
* Returns: [`this`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)

Once a socket is associated with the message and is connected,
[`socket.setTimeout()`][] will be called with `msecs` as the first parameter.

#### <DataTag tag="M" /> `outgoingMessage.socket`

<Metadata data={{"update":{"type":"added","version":["v0.3.0"]}}} />

* [`stream.Duplex`](/api/v16/stream#streamduplex)

Reference to the underlying socket. Usually, users will not want to access
this property.

After calling `outgoingMessage.end()`, this property will be nulled.

#### <DataTag tag="M" /> `outgoingMessage.uncork()`

<Metadata data={{"update":{"type":"added","version":["v13.2.0","v12.16.0"]}}} />

See [`writable.uncork()`][]

#### <DataTag tag="M" /> `outgoingMessage.writableCorked`

<Metadata data={{"update":{"type":"added","version":["v13.2.0","v12.16.0"]}}} />

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

The number of times `outgoingMessage.cork()` has been called.

#### <DataTag tag="M" /> `outgoingMessage.writableEnded`

<Metadata data={{"update":{"type":"added","version":["v12.9.0"]}}} />

* [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Is `true` if `outgoingMessage.end()` has been called. This property does
not indicate whether the data has been flushed. For that purpose, use
`message.writableFinished` instead.

#### <DataTag tag="M" /> `outgoingMessage.writableFinished`

<Metadata data={{"update":{"type":"added","version":["v12.7.0"]}}} />

* [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Is `true` if all data has been flushed to the underlying system.

#### <DataTag tag="M" /> `outgoingMessage.writableHighWaterMark`

<Metadata data={{"update":{"type":"added","version":["v12.9.0"]}}} />

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

The `highWaterMark` of the underlying socket if assigned. Otherwise, the default
buffer level when [`writable.write()`][] starts returning false (`16384`).

#### <DataTag tag="M" /> `outgoingMessage.writableLength`

<Metadata data={{"update":{"type":"added","version":["v12.9.0"]}}} />

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

The number of buffered bytes.

#### <DataTag tag="M" /> `outgoingMessage.writableObjectMode`

<Metadata data={{"update":{"type":"added","version":["v12.9.0"]}}} />

* [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Always `false`.

#### <DataTag tag="M" /> `outgoingMessage.write(chunk[, encoding][, callback])`

<Metadata data={{"changes":[{"version":"v0.11.6","description":"The `callback` argument was added."}],"update":{"type":"added","version":["v0.1.29"]}}} />

* `chunk` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Buffer`](/api/v16/buffer#buffer)
* `encoding` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) **Default**: `utf8`
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
* Returns [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Sends a chunk of the body. This method can be called multiple times.

The `encoding` argument is only relevant when `chunk` is a string. Defaults to
`'utf8'`.

The `callback` argument is optional and will be called when this chunk of data
is flushed.

Returns `true` if the entire data was flushed successfully to the kernel
buffer. Returns `false` if all or part of the data was queued in the user
memory. The `'drain'` event will be emitted when the buffer is free again.

### <DataTag tag="M" /> `http.METHODS`

<Metadata data={{"update":{"type":"added","version":["v0.11.8"]}}} />

* string\[]

A list of the HTTP methods that are supported by the parser.

### <DataTag tag="M" /> `http.STATUS_CODES`

<Metadata data={{"update":{"type":"added","version":["v0.1.22"]}}} />

* [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

A collection of all the standard HTTP response status codes, and the
short description of each. For example, `http.STATUS_CODES[404] === 'Not
Found'`.

### <DataTag tag="M" /> `http.createServer([options][, requestListener])`

<Metadata data={{"changes":[{"version":"v16.15.0","pr-url":"https://github.com/nodejs/node/pull/41310","description":"The `noDelay`, `keepAlive` and `keepAliveInitialDelay` options are supported now."},{"version":["v13.8.0","v12.15.0","v10.19.0"],"pr-url":"https://github.com/nodejs/node/pull/31448","description":"The `insecureHTTPParser` option is supported now."},{"version":"v13.3.0","pr-url":"https://github.com/nodejs/node/pull/30570","description":"The `maxHeaderSize` option is supported now."},{"version":["v9.6.0","v8.12.0"],"pr-url":"https://github.com/nodejs/node/pull/15752","description":"The `options` argument is supported now."}],"update":{"type":"added","version":["v0.1.13"]}}} />

* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `IncomingMessage` [`http.IncomingMessage`](/api/v16/http#httpincomingmessage) Specifies the `IncomingMessage`
    class to be used. Useful for extending the original `IncomingMessage`.
    **Default:** `IncomingMessage`.
  * `ServerResponse` [`http.ServerResponse`](/api/v16/http#httpserverresponse) Specifies the `ServerResponse` class
    to be used. Useful for extending the original `ServerResponse`. **Default:**
    `ServerResponse`.
  * `insecureHTTPParser` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) Use an insecure HTTP parser that accepts
    invalid HTTP headers when `true`. Using the insecure parser should be
    avoided. See [`--insecure-http-parser`][] for more information.
    **Default:** `false`
  * `maxHeaderSize` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) Optionally overrides the value of
    [`--max-http-header-size`][] for requests received by this server, i.e.
    the maximum length of request headers in bytes.
    **Default:** 16384 (16 KiB).
  * `noDelay` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) If set to `true`, it disables the use of Nagle's
    algorithm immediately after a new incoming connection is received.
    **Default:** `false`.
  * `keepAlive` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) If set to `true`, it enables keep-alive functionality
    on the socket immediately after a new incoming connection is received,
    similarly on what is done in \[`socket.setKeepAlive([enable][, initialDelay])`]\[`socket.setKeepAlive(enable, initialDelay)`].
    **Default:** `false`.
  * `keepAliveInitialDelay` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) If set to a positive number, it sets the
    initial delay before the first keepalive probe is sent on an idle socket.
    **Default:** `0`.
  * `uniqueHeaders` [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) A list of response headers that should be sent only
    once. If the header's value is an array, the items will be joined
    using `; `.

* `requestListener` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)

* Returns: [`http.Server`](/api/v16/http#httpserver)

Returns a new instance of [`http.Server`][].

The `requestListener` is a function which is automatically
added to the [`'request'`][] event.

```cjs|cjs
const http = require('node:http');

// Create a local server to receive data from
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    data: 'Hello World!'
  }));
});

server.listen(8000);
--------------
const http = require('node:http');

// Create a local server to receive data from
const server = http.createServer();

// Listen to the request event
server.on('request', (request, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    data: 'Hello World!'
  }));
});

server.listen(8000);
```

### <DataTag tag="M" /> `http.get(options[, callback])`

### <DataTag tag="M" /> `http.get(url[, options][, callback])`

<Metadata data={{"changes":[{"version":"v10.9.0","pr-url":"https://github.com/nodejs/node/pull/21616","description":"The `url` parameter can now be passed along with a separate `options` object."},{"version":"v7.5.0","pr-url":"https://github.com/nodejs/node/pull/10638","description":"The `options` parameter can be a WHATWG `URL` object."}],"update":{"type":"added","version":["v0.3.6"]}}} />

* `url` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`URL`](/api/v16/url#the-whatwg-url-api)
* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) Accepts the same `options` as
  [`http.request()`][], with the `method` always set to `GET`.
  Properties that are inherited from the prototype are ignored.
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
* Returns: [`http.ClientRequest`](/api/v16/http#httpclientrequest)

Since most requests are GET requests without bodies, Node.js provides this
convenience method. The only difference between this method and
[`http.request()`][] is that it sets the method to GET and calls `req.end()`
automatically. The callback must take care to consume the response
data for reasons stated in [`http.ClientRequest`][] section.

The `callback` is invoked with a single argument that is an instance of
[`http.IncomingMessage`][].

JSON fetching example:

```js
http.get('http://localhost:8000/', (res) => {
  const { statusCode } = res;
  const contentType = res.headers['content-type'];

  let error;
  // Any 2xx status code signals a successful response but
  // here we're only checking for 200.
  if (statusCode !== 200) {
    error = new Error('Request Failed.\n' +
                      `Status Code: ${statusCode}`);
  } else if (!/^application\/json/.test(contentType)) {
    error = new Error('Invalid content-type.\n' +
                      `Expected application/json but received ${contentType}`);
  }
  if (error) {
    console.error(error.message);
    // Consume response data to free up memory
    res.resume();
    return;
  }

  res.setEncoding('utf8');
  let rawData = '';
  res.on('data', (chunk) => { rawData += chunk; });
  res.on('end', () => {
    try {
      const parsedData = JSON.parse(rawData);
      console.log(parsedData);
    } catch (e) {
      console.error(e.message);
    }
  });
}).on('error', (e) => {
  console.error(`Got error: ${e.message}`);
});

// Create a local server to receive data from
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    data: 'Hello World!'
  }));
});

server.listen(8000);
```

### <DataTag tag="M" /> `http.globalAgent`

<Metadata data={{"update":{"type":"added","version":["v0.5.9"]}}} />

* [`http.Agent`](/api/v16/http#httpagent)

Global instance of `Agent` which is used as the default for all HTTP client
requests.

### <DataTag tag="M" /> `http.maxHeaderSize`

<Metadata data={{"update":{"type":"added","version":["v11.6.0","v10.15.0"]}}} />

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

Read-only property specifying the maximum allowed size of HTTP headers in bytes.
Defaults to 16 KiB. Configurable using the [`--max-http-header-size`][] CLI
option.

This can be overridden for servers and client requests by passing the
`maxHeaderSize` option.

### <DataTag tag="M" /> `http.request(options[, callback])`

### <DataTag tag="M" /> `http.request(url[, options][, callback])`

<Metadata data={{"changes":[{"version":"v16.7.0","pr-url":"https://github.com/nodejs/node/pull/39310","description":"When using a `URL` object parsed username and password will now be properly URI decoded."},{"version":["v15.3.0","v14.17.0"],"pr-url":"https://github.com/nodejs/node/pull/36048","description":"It is possible to abort a request with an AbortSignal."},{"version":["v13.8.0","v12.15.0","v10.19.0"],"pr-url":"https://github.com/nodejs/node/pull/31448","description":"The `insecureHTTPParser` option is supported now."},{"version":"v13.3.0","pr-url":"https://github.com/nodejs/node/pull/30570","description":"The `maxHeaderSize` option is supported now."},{"version":"v10.9.0","pr-url":"https://github.com/nodejs/node/pull/21616","description":"The `url` parameter can now be passed along with a separate `options` object."},{"version":"v7.5.0","pr-url":"https://github.com/nodejs/node/pull/10638","description":"The `options` parameter can be a WHATWG `URL` object."}],"update":{"type":"added","version":["v0.3.6"]}}} />

* `url` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`URL`](/api/v16/url#the-whatwg-url-api)
* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `agent` [`http.Agent`](/api/v16/http#httpagent) | [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) Controls [`Agent`][] behavior. Possible
    values:
    * `undefined` (default): use [`http.globalAgent`][] for this host and port.
    * `Agent` object: explicitly use the passed in `Agent`.
    * `false`: causes a new `Agent` with default values to be used.
  * `auth` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Basic authentication (`'user:password'`) to compute an
    Authorization header.
  * `createConnection` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) A function that produces a socket/stream to
    use for the request when the `agent` option is not used. This can be used to
    avoid creating a custom `Agent` class just to override the default
    `createConnection` function. See [`agent.createConnection()`][] for more
    details. Any [`Duplex`][] stream is a valid return value.
  * `defaultPort` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) Default port for the protocol. **Default:**
    `agent.defaultPort` if an `Agent` is used, else `undefined`.
  * `family` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) IP address family to use when resolving `host` or
    `hostname`. Valid values are `4` or `6`. When unspecified, both IP v4 and
    v6 will be used.
  * `headers` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) An object containing request headers.
  * `hints` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) Optional [`dns.lookup()` hints][].
  * `host` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) A domain name or IP address of the server to issue the
    request to. **Default:** `'localhost'`.
  * `hostname` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Alias for `host`. To support [`url.parse()`][],
    `hostname` will be used if both `host` and `hostname` are specified.
  * `insecureHTTPParser` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) Use an insecure HTTP parser that accepts
    invalid HTTP headers when `true`. Using the insecure parser should be
    avoided. See [`--insecure-http-parser`][] for more information.
    **Default:** `false`
  * `localAddress` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Local interface to bind for network connections.
  * `localPort` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) Local port to connect from.
  * `lookup` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) Custom lookup function. **Default:** [`dns.lookup()`][].
  * `maxHeaderSize` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) Optionally overrides the value of
    [`--max-http-header-size`][] (the maximum length of response headers in
    bytes) for responses received from the server.
    **Default:** 16384 (16 KiB).
  * `method` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) A string specifying the HTTP request method. **Default:**
    `'GET'`.
  * `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Request path. Should include query string if any.
    E.G. `'/index.html?page=12'`. An exception is thrown when the request path
    contains illegal characters. Currently, only spaces are rejected but that
    may change in the future. **Default:** `'/'`.
  * `port` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) Port of remote server. **Default:** `defaultPort` if set,
    else `80`.
  * `protocol` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Protocol to use. **Default:** `'http:'`.
  * `setHost` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type): Specifies whether or not to automatically add the
    `Host` header. Defaults to `true`.
  * `signal` [`AbortSignal`](/api/v16/globals#abortsignal): An AbortSignal that may be used to abort an ongoing
    request.
  * `socketPath` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Unix domain socket. Cannot be used if one of `host`
    or `port` is specified, as those specify a TCP Socket.
  * `timeout` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type): A number specifying the socket timeout in milliseconds.
    This will set the timeout before the socket is connected.
  * `uniqueHeaders` [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) A list of request headers that should be sent
    only once. If the header's value is an array, the items will be joined
    using `; `.
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
* Returns: [`http.ClientRequest`](/api/v16/http#httpclientrequest)

`options` in [`socket.connect()`][] are also supported.

Node.js maintains several connections per server to make HTTP requests.
This function allows one to transparently issue requests.

`url` can be a string or a [`URL`][] object. If `url` is a
string, it is automatically parsed with [`new URL()`][]. If it is a [`URL`][]
object, it will be automatically converted to an ordinary `options` object.

If both `url` and `options` are specified, the objects are merged, with the
`options` properties taking precedence.

The optional `callback` parameter will be added as a one-time listener for
the [`'response'`][] event.

`http.request()` returns an instance of the [`http.ClientRequest`][]
class. The `ClientRequest` instance is a writable stream. If one needs to
upload a file with a POST request, then write to the `ClientRequest` object.

```js
const http = require('node:http');

const postData = JSON.stringify({
  'msg': 'Hello World!'
});

const options = {
  hostname: 'www.google.com',
  port: 80,
  path: '/upload',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
  res.on('end', () => {
    console.log('No more data in response.');
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

// Write data to request body
req.write(postData);
req.end();
```

In the example `req.end()` was called. With `http.request()` one
must always call `req.end()` to signify the end of the request -
even if there is no data being written to the request body.

If any error is encountered during the request (be that with DNS resolution,
TCP level errors, or actual HTTP parse errors) an `'error'` event is emitted
on the returned request object. As with all `'error'` events, if no listeners
are registered the error will be thrown.

There are a few special headers that should be noted.

* Sending a 'Connection: keep-alive' will notify Node.js that the connection to
  the server should be persisted until the next request.

* Sending a 'Content-Length' header will disable the default chunked encoding.

* Sending an 'Expect' header will immediately send the request headers.
  Usually, when sending 'Expect: 100-continue', both a timeout and a listener
  for the `'continue'` event should be set. See RFC 2616 Section 8.2.3 for more
  information.

* Sending an Authorization header will override using the `auth` option
  to compute basic authentication.

Example using a [`URL`][] as `options`:

```js
const options = new URL('http://abc:xyz@example.com');

const req = http.request(options, (res) => {
  // ...
});
```

In a successful request, the following events will be emitted in the following
order:

* `'socket'`
* `'response'`
  * `'data'` any number of times, on the `res` object
    (`'data'` will not be emitted at all if the response body is empty, for
    instance, in most redirects)
  * `'end'` on the `res` object
* `'close'`

In the case of a connection error, the following events will be emitted:

* `'socket'`
* `'error'`
* `'close'`

In the case of a premature connection close before the response is received,
the following events will be emitted in the following order:

* `'socket'`
* `'error'` with an error with message `'Error: socket hang up'` and code
  `'ECONNRESET'`
* `'close'`

In the case of a premature connection close after the response is received,
the following events will be emitted in the following order:

* `'socket'`
* `'response'`
  * `'data'` any number of times, on the `res` object
* (connection closed here)
* `'aborted'` on the `res` object
* `'error'` on the `res` object with an error with message
  `'Error: aborted'` and code `'ECONNRESET'`.
* `'close'`
* `'close'` on the `res` object

If `req.destroy()` is called before a socket is assigned, the following
events will be emitted in the following order:

* (`req.destroy()` called here)
* `'error'` with an error with message `'Error: socket hang up'` and code
  `'ECONNRESET'`
* `'close'`

If `req.destroy()` is called before the connection succeeds, the following
events will be emitted in the following order:

* `'socket'`
* (`req.destroy()` called here)
* `'error'` with an error with message `'Error: socket hang up'` and code
  `'ECONNRESET'`
* `'close'`

If `req.destroy()` is called after the response is received, the following
events will be emitted in the following order:

* `'socket'`
* `'response'`
  * `'data'` any number of times, on the `res` object
* (`req.destroy()` called here)
* `'aborted'` on the `res` object
* `'error'` on the `res` object with an error with message
  `'Error: aborted'` and code `'ECONNRESET'`.
* `'close'`
* `'close'` on the `res` object

If `req.abort()` is called before a socket is assigned, the following
events will be emitted in the following order:

* (`req.abort()` called here)
* `'abort'`
* `'close'`

If `req.abort()` is called before the connection succeeds, the following
events will be emitted in the following order:

* `'socket'`
* (`req.abort()` called here)
* `'abort'`
* `'error'` with an error with message `'Error: socket hang up'` and code
  `'ECONNRESET'`
* `'close'`

If `req.abort()` is called after the response is received, the following
events will be emitted in the following order:

* `'socket'`
* `'response'`
  * `'data'` any number of times, on the `res` object
* (`req.abort()` called here)
* `'abort'`
* `'aborted'` on the `res` object
* `'error'` on the `res` object with an error with message
  `'Error: aborted'` and code `'ECONNRESET'`.
* `'close'`
* `'close'` on the `res` object

Setting the `timeout` option or using the `setTimeout()` function will
not abort the request or do anything besides add a `'timeout'` event.

Passing an `AbortSignal` and then calling `abort` on the corresponding
`AbortController` will behave the same way as calling `.destroy()` on the
request itself.

### <DataTag tag="M" /> `http.validateHeaderName(name)`

<Metadata data={{"update":{"type":"added","version":["v14.3.0"]}}} />

* `name` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

Performs the low-level validations on the provided `name` that are done when
`res.setHeader(name, value)` is called.

Passing illegal value as `name` will result in a [`TypeError`][] being thrown,
identified by `code: 'ERR_INVALID_HTTP_TOKEN'`.

It is not necessary to use this method before passing headers to an HTTP request
or response. The HTTP module will automatically validate such headers.
Examples:

Example:

```js
const { validateHeaderName } = require('node:http');

try {
  validateHeaderName('');
} catch (err) {
  err instanceof TypeError; // --> true
  err.code; // --> 'ERR_INVALID_HTTP_TOKEN'
  err.message; // --> 'Header name must be a valid HTTP token [""]'
}
```

### <DataTag tag="M" /> `http.validateHeaderValue(name, value)`

<Metadata data={{"update":{"type":"added","version":["v14.3.0"]}}} />

* `name` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
* `value` [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types)

Performs the low-level validations on the provided `value` that are done when
`res.setHeader(name, value)` is called.

Passing illegal value as `value` will result in a [`TypeError`][] being thrown.

* Undefined value error is identified by `code: 'ERR_HTTP_INVALID_HEADER_VALUE'`.
* Invalid value character error is identified by `code: 'ERR_INVALID_CHAR'`.

It is not necessary to use this method before passing headers to an HTTP request
or response. The HTTP module will automatically validate such headers.

Examples:

```js
const { validateHeaderValue } = require('node:http');

try {
  validateHeaderValue('x-my-header', undefined);
} catch (err) {
  err instanceof TypeError; // --> true
  err.code === 'ERR_HTTP_INVALID_HEADER_VALUE'; // --> true
  err.message; // --> 'Invalid value "undefined" for header "x-my-header"'
}

try {
  validateHeaderValue('x-my-header', 'oʊmɪɡə');
} catch (err) {
  err instanceof TypeError; // --> true
  err.code === 'ERR_INVALID_CHAR'; // --> true
  err.message; // --> 'Invalid character in header content ["x-my-header"]'
}
```

### <DataTag tag="M" /> `http.setMaxIdleHTTPParsers`

<Metadata data={{"update":{"type":"added","version":["v16.18.0"]}}} />

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

Set the maximum number of idle HTTP parsers. **Default:** `1000`.

[RFC 8187]: https://www.rfc-editor.org/rfc/rfc8187.txt
[`'ERR_HTTP_CONTENT_LENGTH_MISMATCH'`]: /api/v16/errors#err_http_content_length_mismatch
[`'checkContinue'`]: #event-checkcontinue
[`'finish'`]: #event-finish
[`'request'`]: #event-request
[`'response'`]: #event-response
[`'upgrade'`]: #event-upgrade
[`--insecure-http-parser`]: /api/v16/cli#--insecure-http-parser
[`--max-http-header-size`]: /api/v16/cli#--max-http-header-sizesize
[`Agent`]: #class-httpagent
[`Buffer.byteLength()`]: /api/v16/buffer#static-method-bufferbytelengthstring-encoding
[`Duplex`]: /api/v16/stream#class-streamduplex
[`HPE_HEADER_OVERFLOW`]: /api/v16/errors#hpe_header_overflow
[`TypeError`]: /api/v16/errors#class-typeerror
[`URL`]: /api/v16/url#the-whatwg-url-api
[`agent.createConnection()`]: #agentcreateconnectionoptions-callback
[`agent.getName()`]: #agentgetnameoptions
[`destroy()`]: #agentdestroy
[`dns.lookup()`]: /api/v16/dns#dnslookuphostname-options-callback
[`dns.lookup()` hints]: /api/v16/dns#supported-getaddrinfo-flags
[`getHeader(name)`]: #requestgetheadername
[`http.Agent`]: #class-httpagent
[`http.ClientRequest`]: #class-httpclientrequest
[`http.IncomingMessage`]: #class-httpincomingmessage
[`http.ServerResponse`]: #class-httpserverresponse
[`http.Server`]: #class-httpserver
[`http.get()`]: #httpgetoptions-callback
[`http.globalAgent`]: #httpglobalagent
[`http.request()`]: #httprequestoptions-callback
[`message.headers`]: #messageheaders
[`message.socket`]: #messagesocket
[`message.trailers`]: #messagetrailers
[`net.Server.close()`]: /api/v16/net#serverclosecallback
[`net.Server`]: /api/v16/net#class-netserver
[`net.Socket`]: /api/v16/net#class-netsocket
[`net.createConnection()`]: /api/v16/net#netcreateconnectionoptions-connectlistener
[`new URL()`]: /api/v16/url#new-urlinput-base
[`outgoingMessage.setHeader(name, value)`]: #outgoingmessagesetheadername-value
[`outgoingMessage.socket`]: #outgoingmessagesocket
[`removeHeader(name)`]: #requestremoveheadername
[`request.destroy()`]: #requestdestroyerror
[`request.destroyed`]: #requestdestroyed
[`request.end()`]: #requestenddata-encoding-callback
[`request.flushHeaders()`]: #requestflushheaders
[`request.getHeader()`]: #requestgetheadername
[`request.setHeader()`]: #requestsetheadername-value
[`request.setTimeout()`]: #requestsettimeouttimeout-callback
[`request.socket.getPeerCertificate()`]: /api/v16/tls#tlssocketgetpeercertificatedetailed
[`request.socket`]: #requestsocket
[`request.writableEnded`]: #requestwritableended
[`request.writableFinished`]: #requestwritablefinished
[`request.write(data, encoding)`]: #requestwritechunk-encoding-callback
[`response.end()`]: #responseenddata-encoding-callback
[`response.getHeader()`]: #responsegetheadername
[`response.setHeader()`]: #responsesetheadername-value
[`response.socket`]: #responsesocket
[`response.writableEnded`]: #responsewritableended
[`response.writableFinished`]: #responsewritablefinished
[`response.write()`]: #responsewritechunk-encoding-callback
[`response.write(data, encoding)`]: #responsewritechunk-encoding-callback
[`response.writeContinue()`]: #responsewritecontinue
[`response.writeHead()`]: #responsewriteheadstatuscode-statusmessage-headers
[`server.listen()`]: /api/v16/net#serverlisten
[`server.timeout`]: #servertimeout
[`setHeader(name, value)`]: #requestsetheadername-value
[`socket.connect()`]: /api/v16/net#socketconnectoptions-connectlistener
[`socket.setKeepAlive()`]: /api/v16/net#socketsetkeepaliveenable-initialdelay
[`socket.setNoDelay()`]: /api/v16/net#socketsetnodelaynodelay
[`socket.setTimeout()`]: /api/v16/net#socketsettimeouttimeout-callback
[`socket.unref()`]: /api/v16/net#socketunref
[`url.parse()`]: /api/v16/url#urlparseurlstring-parsequerystring-slashesdenotehost
[`writable.cork()`]: /api/v16/stream#writablecork
[`writable.destroy()`]: /api/v16/stream#writabledestroyerror
[`writable.destroyed`]: /api/v16/stream#writabledestroyed
[`writable.uncork()`]: /api/v16/stream#writableuncork
[`writable.write()`]: /api/v16/stream#writablewritechunk-encoding-callback
[initial delay]: /api/v16/net#socketsetkeepaliveenable-initialdelay
