---
title: 'The Node.js http module'
description: 'The http module of Node.js provides useful functions and classes to build an HTTP server'
authors: flaviocopes, MylesBorins, fhemberger, LaRuaNa, BeniCheni, amiller-gh, ahmadawais
section: Getting Started
category: learn
---

The HTTP core module is a key module to Node.js networking.

It can be included using

```js
const http = require('http')
```

The module provides some properties and methods, and some classes.

## Properties

### `http.METHODS`

This property lists all the HTTP methods supported:

```js
> require('http').METHODS
[ 'ACL',
  'BIND',
  'CHECKOUT',
  'CONNECT',
  'COPY',
  'DELETE',
  'GET',
  'HEAD',
  'LINK',
  'LOCK',
  'M-SEARCH',
  'MERGE',
  'MKACTIVITY',
  'MKCALENDAR',
  'MKCOL',
  'MOVE',
  'NOTIFY',
  'OPTIONS',
  'PATCH',
  'POST',
  'PROPFIND',
  'PROPPATCH',
  'PURGE',
  'PUT',
  'REBIND',
  'REPORT',
  'SEARCH',
  'SUBSCRIBE',
  'TRACE',
  'UNBIND',
  'UNLINK',
  'UNLOCK',
  'UNSUBSCRIBE' ]
```

### `http.STATUS_CODES`

This property lists all the HTTP status codes and their description:

```js
> require('http').STATUS_CODES
{ '100': 'Continue',
  '101': 'Switching Protocols',
  '102': 'Processing',
  '200': 'OK',
  '201': 'Created',
  '202': 'Accepted',
  '203': 'Non-Authoritative Information',
  '204': 'No Content',
  '205': 'Reset Content',
  '206': 'Partial Content',
  '207': 'Multi-Status',
  '208': 'Already Reported',
  '226': 'IM Used',
  '300': 'Multiple Choices',
  '301': 'Moved Permanently',
  '302': 'Found',
  '303': 'See Other',
  '304': 'Not Modified',
  '305': 'Use Proxy',
  '307': 'Temporary Redirect',
  '308': 'Permanent Redirect',
  '400': 'Bad Request',
  '401': 'Unauthorized',
  '402': 'Payment Required',
  '403': 'Forbidden',
  '404': 'Not Found',
  '405': 'Method Not Allowed',
  '406': 'Not Acceptable',
  '407': 'Proxy Authentication Required',
  '408': 'Request Timeout',
  '409': 'Conflict',
  '410': 'Gone',
  '411': 'Length Required',
  '412': 'Precondition Failed',
  '413': 'Payload Too Large',
  '414': 'URI Too Long',
  '415': 'Unsupported Media Type',
  '416': 'Range Not Satisfiable',
  '417': 'Expectation Failed',
  '418': 'I\'m a teapot',
  '421': 'Misdirected Request',
  '422': 'Unprocessable Entity',
  '423': 'Locked',
  '424': 'Failed Dependency',
  '425': 'Unordered Collection',
  '426': 'Upgrade Required',
  '428': 'Precondition Required',
  '429': 'Too Many Requests',
  '431': 'Request Header Fields Too Large',
  '451': 'Unavailable For Legal Reasons',
  '500': 'Internal Server Error',
  '501': 'Not Implemented',
  '502': 'Bad Gateway',
  '503': 'Service Unavailable',
  '504': 'Gateway Timeout',
  '505': 'HTTP Version Not Supported',
  '506': 'Variant Also Negotiates',
  '507': 'Insufficient Storage',
  '508': 'Loop Detected',
  '509': 'Bandwidth Limit Exceeded',
  '510': 'Not Extended',
  '511': 'Network Authentication Required' }
```

### `http.globalAgent`

Points to the global instance of the Agent object, which is an instance of the `http.Agent` class.

It's used to manage connections persistence and reuse for HTTP clients, and it's a key component of Node.js HTTP networking.

More in the `http.Agent` class description later on.

## Methods

### `http.createServer()`

Return a new instance of the `http.Server` class.

Usage:

```js
const server = http.createServer((req, res) => {
  //handle every single request with this callback
})
```

### `http.request()`

Makes an HTTP request to a server, creating an instance of the `http.ClientRequest` class.

### `http.get()`

Similar to `http.request()`, but automatically sets the HTTP method to GET, and calls `req.end()` automatically.

## Classes

The HTTP module provides 5 classes:

* `http.Agent`
* `http.ClientRequest`
* `http.Server`
* `http.ServerResponse`
* `http.IncomingMessage`

### `http.Agent`

Node.js creates a global instance of the `http.Agent` class to manage connections persistence and reuse for HTTP clients, a key component of Node.js HTTP networking.

This object makes sure that every request made to a server is queued and a single socket is reused.

It also maintains a pool of sockets. This is key for performance reasons.

### `http.ClientRequest`

An `http.ClientRequest` object is created when `http.request()` or `http.get()` is called.

When a response is received, the `response` event is called with the response, with an `http.IncomingMessage` instance as argument.

The returned data of a response can be read in 2 ways:

* you can call the `response.read()` method
* in the `response` event handler you can setup an event listener for the `data` event, so you can listen for the data streamed into.

### `http.Server`

This class is commonly instantiated and returned when creating a new server using `http.createServer()`.

Once you have a server object, you have access to its methods:

* `close()` stops the server from accepting new connections
* `listen()` starts the HTTP server and listens for connections

### `http.ServerResponse`

Created by an `http.Server` and passed as the second parameter to the `request` event it fires.

Commonly known and used in code as `res`:

```js
const server = http.createServer((req, res) => {
  //res is an http.ServerResponse object
})
```

The method you'll always call in the handler is `end()`, which closes the response, the message is complete and the server can send it to the client. It must be called on each response.

These methods are used to interact with HTTP headers:

* `getHeaderNames()` get the list of the names of the HTTP headers already set
* `getHeaders()` get a copy of the HTTP headers already set
* `setHeader('headername', value)` sets an HTTP header value
* `getHeader('headername')` gets an HTTP header already set
* `removeHeader('headername')` removes an HTTP header already set
* `hasHeader('headername')` return true if the response has that header set
* `headersSent()` return true if the headers have already been sent to the client

After processing the headers you can send them to the client by calling `response.writeHead()`, which accepts the statusCode as the first parameter, the optional status message, and the headers object.

To send data to the client in the response body, you use `write()`. It will send buffered data to the HTTP response stream.

If the headers were not sent yet using `response.writeHead()`, it will send the headers first, with the status code and message that's set in the request, which you can edit by setting the `statusCode` and `statusMessage` properties values:

```js
response.statusCode = 500
response.statusMessage = 'Internal Server Error'
```

### `http.IncomingMessage`

An `http.IncomingMessage` object is created by:

* `http.Server` when listening to the `request` event
* `http.ClientRequest` when listening to the `response` event

It can be used to access the response:

* status using its `statusCode` and `statusMessage` methods
* headers using its `headers` method or `rawHeaders`
* HTTP method using its `method` method
* HTTP version using the `httpVersion` method
* URL using the `url` method
* underlying socket using the `socket` method

The data is accessed using streams, since `http.IncomingMessage` implements the Readable Stream interface.
