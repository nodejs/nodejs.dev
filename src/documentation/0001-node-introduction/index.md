---
title: Introduction to Node.js
description: "This post is a getting started guide to Node.js, the server-side JavaScript runtime environment. Node.js is built on top of the Google Chrome V8 JavaScript engine, and it's mainly used to create web servers - but it's not limited to that"
author: flaviocopes
section: Quick Start
---

## Overview

Node.js is a **runtime environment for JavaScript** that runs on the **server**.

Node.js is open source, cross-platform, and since its introduction in 2009, it got hugely popular and now plays a significant role in the web development scene. If GitHub stars are one popularity indication factor, having 46000+ stars means being very popular.

Node.js is built on top of the Google Chrome V8 JavaScript engine, and it's mainly used to create web servers - but it's not limited to that.

## The best features of Node.js

### Fast

![Fast](fast.png)

One of the main selling points of Node.js is **speed**. JavaScript code running on Node.js (depending on the benchmark) can be twice as fast than compiled languages like C or Java, and orders of magnitude faster than interpreted languages like Python or Ruby, because of its non-blocking paradigm.

### Simple

Node.js is simple. Extremely simple, actually.

### JavaScript

Node.js runs JavaScript code. This means that millions of frontend developers that already use JavaScript in the browser are able to run the server-side code and frontend-side code using the same programming language without the need to learn a completely different tool.

The paradigms are all the same, and in Node.js the new ECMAScript standards can be used first, as you don't have to wait for all your users to update their browsers - you decide which ECMAScript version to use by changing the Node.js version.

### V8

Running on the Google V8 JavaScript engine, which is Open Source, Node.js is able to leverage the work of thousands of engineers that made (and will continue to make) the Chrome JavaScript runtime blazing fast.

### Asynchronous platform

![Async](async.png)

In traditional programming languages (C, Java, Python, PHP) all instructions are blocking by default unless you explicitly "opt in" to perform asynchronous operations. If you perform a network request to read some JSON, the execution of that particular thread is blocked until the response is ready.

**JavaScript allows to create asynchronous and non-blocking code in a very simple way**, by using a **single thread**, **callback functions** and **event-driven programming**. Every time an expensive operation occurs, we pass a callback function that will be called once we can continue with the processing. We're not waiting for that to finish before going on with the rest of the program.

Such mechanism derives from the browser. We can't wait until something loads from an AJAX request before being able to intercept click events on the page. **It all must happen in real time** to provide a good experience to the user.

> If you've created an onclick handler for a web page you've already used asynchronous programming techniques with event listeners.

This allows Node.js to handle thousands of concurrent connections with a single server without introducing the burden of managing threads concurrency, which would be a major source of bugs.

Node.js provides non-blocking I/O primitives, and generally, libraries in Node.js are written using non-blocking paradigms, making a blocking behavior an exception rather than the normal.

When Node.js needs to perform an I/O operation, like reading from the network, access a database or the filesystem, instead of blocking the thread Node.js will simply resume the operations when the response comes back, instead of wasting CPU cycles waiting.

### A huge number of libraries

npm with its simple structure helped the ecosystem of node.js proliferate and now the npm registry hosts almost 500,000 open source packages you can freely use.

## An example Node.js application

The most common example Hello World of Node.js is a web server:

<iframe
  allow="geolocation; microphone; camera; midi; encrypted-media"
  src="https://glitch.com/embed/#!/embed/nodejs-dev-0001-01?path=server.js&previewSize=30&attributionHidden=true&sidebarCollapsed=true"
  alt="nodejs-dev-0001-01 on Glitch"
  style="height: 400px; width: 100%; border: 0;">
</iframe>

<!--```js
const http = require('http')

const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello World\n')
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
```

To run this snippet, save it as a `server.js` file and run `node server.js` in your terminal.-->

This code first includes the Node.js [`http` module](https://nodejs.org/api/http.html).

Node.js has an amazing [standard library](https://nodejs.org/api/), including a first-class support for networking.

The `createServer()` method of `http` creates a new HTTP server and returns it.

The server is set to listen on the specified port and hostname. When the server is ready, the callback function is called, in this case informing us that the server is running.

Whenever a new request is received, the [`request` event](https://nodejs.org/api/http.html#http_event_request) is called, providing two objects: a request (an [`http.IncomingMessage`](https://nodejs.org/api/http.html#http_class_http_incomingmessage) object) and a response (an [`http.ServerResponse`](https://nodejs.org/api/http.html#http_class_http_serverresponse) object).

Those 2 objects are essential to handle the HTTP call.

The first provides the request details. In this simple example, this is not used, but you could access the request headers and request data.

The second is used to return data to the caller.

In this case with

```js
res.statusCode = 200
```

we set the statusCode property to 200, to indicate a successful response.

We set the Content-Type header:

```js
res.setHeader('Content-Type', 'text/plain')
```

and we end close the response, adding the content as an argument to `end()`:

```js
res.end('Hello World\n')
```

## Node.js frameworks and tools

Node.js is a low-level platform, and to make things easier and more interesting for developers thousands of libraries were built upon Node.js.

Many of those established over time as popular options. Here is a non-comprehensive list of the ones worth learning:

- [**AdonisJs**](https://adonisjs.com/), a full-stack framework highly focused on developer ergonomics, stability and confidence. Adonis is one of the fastest Node.js web frameworks.
- [**Express**](https://expressjs.com/), one of the most simple yet powerful ways to create a web server. Its minimalist approach, unopinionated, focused on the core features of a server, is key to its success.
- [**Fastify**](https://fastify.io/), a web framework highly focused on providing the best developer experience with the least overhead and a powerful plugin architecture. Fastify is one of the fastest Node.js web frameworks.
- [**hapi**](https://hapijs.com), A rich framework for building applications and services that enables developers to focus on writing reusable application logic instead of spending time building infrastructure.
- [**koa**](http://koajs.com/), built by the same team behind Express, aims to be even simpler and smaller, building on top of years of knowledge. The new project born out of the need to create incompatible changes without disrupting the existing community.
- [**Meteor**](https://meteor.com), an incredibly powerful full-stack framework, powering you with an isomorphic approach to building apps with JavaScript, sharing code on the client and the server. Once an off-the-shelf tool that provided everything, now integrates with frontend libs React, [Vue](https://vuejs.org/) and Angular. Can be used to create mobile apps as well.
- [**Micro**](https://github.com/zeit/micro), a very lightweight server to create asynchronous HTTP microservices.
- [**NestJS**](https://nestjs.com/), a TypeScript based progressive Node.js framework for building enterprise-grade efficient, reliable and scalable server-side applications.
- [**Next.js**](https://nextjs.org/), a framework to render server-side rendered [React](https://reactjs.org/) applications.
- [**Nx**](https://nx.dev/), power-ups to the Angular CLI which allows building full-stack applications using NestJS, Express, and [Angular](https://angular.io) and easily share code between backends and frontends.
- [**Socket.io**](https://socket.io/), a real-time communication engine to build network applications.
