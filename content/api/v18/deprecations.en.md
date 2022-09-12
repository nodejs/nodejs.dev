---
title: 'deprecations'
displayTitle: 'Deprecated APIs'
category: 'api'
version: 'v18'
---

<Metadata version="v18.9.0" data={{"update":{"type":"introduced_in","version":["v7.7.0"]}}} />

<Metadata version="v18.9.0" data={{"type":"misc"}} />

Node.js APIs might be deprecated for any of the following reasons:

* Use of the API is unsafe.
* An improved alternative API is available.
* Breaking changes to the API are expected in a future major release.

Node.js uses three kinds of Deprecations:

* Documentation-only
* Runtime
* End-of-Life

A Documentation-only deprecation is one that is expressed only within the
Node.js API docs. These generate no side-effects while running Node.js.
Some Documentation-only deprecations trigger a runtime warning when launched
with [`--pending-deprecation`][] flag (or its alternative,
`NODE_PENDING_DEPRECATION=1` environment variable), similarly to Runtime
deprecations below. Documentation-only deprecations that support that flag
are explicitly labeled as such in the
[list of Deprecated APIs](#list-of-deprecated-apis).

A Runtime deprecation will, by default, generate a process warning that will
be printed to `stderr` the first time the deprecated API is used. When the
[`--throw-deprecation`][] command-line flag is used, a Runtime deprecation will
cause an error to be thrown.

An End-of-Life deprecation is used when functionality is or will soon be removed
from Node.js.

### Revoking deprecations

Occasionally, the deprecation of an API might be reversed. In such situations,
this document will be updated with information relevant to the decision.
However, the deprecation identifier will not be modified.

### List of deprecated APIs

#### DEP0001: `http.OutgoingMessage.prototype.flush`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v14.0.0","pr-url":"https://github.com/nodejs/node/pull/31164","description":"End-of-Life."},{"version":["v6.12.0","v4.8.6"],"pr-url":"https://github.com/nodejs/node/pull/10116","description":"A deprecation code has been assigned."},{"version":"v1.6.0","pr-url":"https://github.com/nodejs/node/pull/1156","description":"Runtime deprecation."}]}} />

Type: End-of-Life

`OutgoingMessage.prototype.flush()` has been removed. Use
`OutgoingMessage.prototype.flushHeaders()` instead.

#### DEP0002: `require('_linklist')`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v8.0.0","pr-url":"https://github.com/nodejs/node/pull/12113","description":"End-of-Life."},{"version":"v6.12.0","pr-url":"https://github.com/nodejs/node/pull/10116","description":"A deprecation code has been assigned."},{"version":"v5.0.0","pr-url":"https://github.com/nodejs/node/pull/3078","description":"Runtime deprecation."}]}} />

Type: End-of-Life

The `_linklist` module is deprecated. Please use a userland alternative.

#### DEP0003: `_writableState.buffer`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v14.0.0","pr-url":"https://github.com/nodejs/node/pull/31165","description":"End-of-Life."},{"version":["v6.12.0","v4.8.6"],"pr-url":"https://github.com/nodejs/node/pull/10116","description":"A deprecation code has been assigned."},{"version":"v0.11.15","pr-url":"https://github.com/nodejs/node-v0.x-archive/pull/8826","description":"Runtime deprecation."}]}} />

Type: End-of-Life

The `_writableState.buffer` has been removed. Use `_writableState.getBuffer()`
instead.

#### DEP0004: `CryptoStream.prototype.readyState`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/17882","description":"End-of-Life."},{"version":["v6.12.0","v4.8.6"],"pr-url":"https://github.com/nodejs/node/pull/10116","description":"A deprecation code has been assigned."},{"version":"v0.4.0","commit":"9c7f89bf56abd37a796fea621ad2e47dd33d2b82","description":"Documentation-only deprecation."}]}} />

Type: End-of-Life

The `CryptoStream.prototype.readyState` property was removed.

#### DEP0005: `Buffer()` constructor

<Metadata version="v18.9.0" data={{"changes":[{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/19524","description":"Runtime deprecation."},{"version":"v6.12.0","pr-url":"https://github.com/nodejs/node/pull/10116","description":"A deprecation code has been assigned."},{"version":"v6.0.0","pr-url":"https://github.com/nodejs/node/pull/4682","description":"Documentation-only deprecation."}]}} />

Type: Runtime (supports [`--pending-deprecation`][])

The `Buffer()` function and `new Buffer()` constructor are deprecated due to
API usability issues that can lead to accidental security issues.

As an alternative, use one of the following methods of constructing `Buffer`
objects:

* [`Buffer.alloc(size[, fill[, encoding]])`][alloc]: Create a `Buffer` with
  _initialized_ memory.
* [`Buffer.allocUnsafe(size)`][alloc_unsafe_size]: Create a `Buffer` with
  _uninitialized_ memory.
* [`Buffer.allocUnsafeSlow(size)`][]: Create a `Buffer` with _uninitialized_
  memory.
* [`Buffer.from(array)`][]: Create a `Buffer` with a copy of `array`
* [`Buffer.from(arrayBuffer[, byteOffset[, length]])`][from_arraybuffer] -
  Create a `Buffer` that wraps the given `arrayBuffer`.
* [`Buffer.from(buffer)`][]: Create a `Buffer` that copies `buffer`.
* [`Buffer.from(string[, encoding])`][from_string_encoding]: Create a `Buffer`
  that copies `string`.

Without `--pending-deprecation`, runtime warnings occur only for code not in
`node_modules`. This means there will not be deprecation warnings for
`Buffer()` usage in dependencies. With `--pending-deprecation`, a runtime
warning results no matter where the `Buffer()` usage occurs.

#### DEP0006: `child_process` `options.customFds`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v12.0.0","pr-url":"https://github.com/nodejs/node/pull/25279","description":"End-of-Life."},{"version":["v6.12.0","v4.8.6"],"pr-url":"https://github.com/nodejs/node/pull/10116","description":"A deprecation code has been assigned."},{"version":"v0.11.14","description":"Runtime deprecation."},{"version":"v0.5.10","description":"Documentation-only deprecation."}]}} />

Type: End-of-Life

Within the [`child_process`][] module's `spawn()`, `fork()`, and `exec()`
methods, the `options.customFds` option is deprecated. The `options.stdio`
option should be used instead.

#### DEP0007: Replace `cluster` `worker.suicide` with `worker.exitedAfterDisconnect`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v9.0.0","pr-url":"https://github.com/nodejs/node/pull/13702","description":"End-of-Life."},{"version":"v7.0.0","pr-url":"https://github.com/nodejs/node/pull/3747","description":"Runtime deprecation."},{"version":"v6.12.0","pr-url":"https://github.com/nodejs/node/pull/10116","description":"A deprecation code has been assigned."},{"version":"v6.0.0","pr-url":"https://github.com/nodejs/node/pull/3743","description":"Documentation-only deprecation."}]}} />

Type: End-of-Life

In an earlier version of the Node.js `cluster`, a boolean property with the name
`suicide` was added to the `Worker` object. The intent of this property was to
provide an indication of how and why the `Worker` instance exited. In Node.js
6.0.0, the old property was deprecated and replaced with a new
[`worker.exitedAfterDisconnect`][] property. The old property name did not
precisely describe the actual semantics and was unnecessarily emotion-laden.

#### DEP0008: `require('node:constants')`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v6.12.0","pr-url":"https://github.com/nodejs/node/pull/10116","description":"A deprecation code has been assigned."},{"version":"v6.3.0","pr-url":"https://github.com/nodejs/node/pull/6534","description":"Documentation-only deprecation."}]}} />

Type: Documentation-only

The `node:constants` module is deprecated. When requiring access to constants
relevant to specific Node.js builtin modules, developers should instead refer
to the `constants` property exposed by the relevant module. For instance,
`require('node:fs').constants` and `require('node:os').constants`.

#### DEP0009: `crypto.pbkdf2` without digest

<Metadata version="v18.9.0" data={{"changes":[{"version":"v14.0.0","pr-url":"https://github.com/nodejs/node/pull/31166","description":"End-of-Life (for `digest === null`)."},{"version":"v11.0.0","pr-url":"https://github.com/nodejs/node/pull/22861","description":"Runtime deprecation (for `digest === null`)."},{"version":"v8.0.0","pr-url":"https://github.com/nodejs/node/pull/11305","description":"End-of-Life (for `digest === undefined`)."},{"version":"v6.12.0","pr-url":"https://github.com/nodejs/node/pull/10116","description":"A deprecation code has been assigned."},{"version":"v6.0.0","pr-url":"https://github.com/nodejs/node/pull/4047","description":"Runtime deprecation (for `digest === undefined`)."}]}} />

Type: End-of-Life

Use of the [`crypto.pbkdf2()`][] API without specifying a digest was deprecated
in Node.js 6.0 because the method defaulted to using the non-recommended
`'SHA1'` digest. Previously, a deprecation warning was printed. Starting in
Node.js 8.0.0, calling `crypto.pbkdf2()` or `crypto.pbkdf2Sync()` with
`digest` set to `undefined` will throw a `TypeError`.

Beginning in Node.js v11.0.0, calling these functions with `digest` set to
`null` would print a deprecation warning to align with the behavior when `digest`
is `undefined`.

Now, however, passing either `undefined` or `null` will throw a `TypeError`.

#### DEP0010: `crypto.createCredentials`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v11.0.0","pr-url":"https://github.com/nodejs/node/pull/21153","description":"End-of-Life."},{"version":["v6.12.0","v4.8.6"],"pr-url":"https://github.com/nodejs/node/pull/10116","description":"A deprecation code has been assigned."},{"version":"v0.11.13","pr-url":"https://github.com/nodejs/node-v0.x-archive/pull/7265","description":"Runtime deprecation."}]}} />

Type: End-of-Life

The `crypto.createCredentials()` API was removed. Please use
[`tls.createSecureContext()`][] instead.

#### DEP0011: `crypto.Credentials`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v11.0.0","pr-url":"https://github.com/nodejs/node/pull/21153","description":"End-of-Life."},{"version":["v6.12.0","v4.8.6"],"pr-url":"https://github.com/nodejs/node/pull/10116","description":"A deprecation code has been assigned."},{"version":"v0.11.13","pr-url":"https://github.com/nodejs/node-v0.x-archive/pull/7265","description":"Runtime deprecation."}]}} />

Type: End-of-Life

The `crypto.Credentials` class was removed. Please use [`tls.SecureContext`][]
instead.

#### DEP0012: `Domain.dispose`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v9.0.0","pr-url":"https://github.com/nodejs/node/pull/15412","description":"End-of-Life."},{"version":["v6.12.0","v4.8.6"],"pr-url":"https://github.com/nodejs/node/pull/10116","description":"A deprecation code has been assigned."},{"version":"v0.11.7","pr-url":"https://github.com/nodejs/node-v0.x-archive/pull/5021","description":"Runtime deprecation."}]}} />

Type: End-of-Life

`Domain.dispose()` has been removed. Recover from failed I/O actions
explicitly via error event handlers set on the domain instead.

#### DEP0013: `fs` asynchronous function without callback

<Metadata version="v18.9.0" data={{"changes":[{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/18668","description":"End-of-Life."},{"version":"v7.0.0","pr-url":"https://github.com/nodejs/node/pull/7897","description":"Runtime deprecation."}]}} />

Type: End-of-Life

Calling an asynchronous function without a callback throws a `TypeError`
in Node.js 10.0.0 onwards. See <https://github.com/nodejs/node/pull/12562>.

#### DEP0014: `fs.read` legacy String interface

<Metadata version="v18.9.0" data={{"changes":[{"version":"v8.0.0","pr-url":"https://github.com/nodejs/node/pull/9683","description":"End-of-Life."},{"version":["v6.12.0","v4.8.6"],"pr-url":"https://github.com/nodejs/node/pull/10116","description":"A deprecation code has been assigned."},{"version":"v6.0.0","pr-url":"https://github.com/nodejs/node/pull/4525","description":"Runtime deprecation."},{"version":"v0.1.96","commit":"c93e0aaf062081db3ec40ac45b3e2c979d5759d6","description":"Documentation-only deprecation."}]}} />

Type: End-of-Life

The [`fs.read()`][] legacy `String` interface is deprecated. Use the `Buffer`
API as mentioned in the documentation instead.

#### DEP0015: `fs.readSync` legacy String interface

<Metadata version="v18.9.0" data={{"changes":[{"version":"v8.0.0","pr-url":"https://github.com/nodejs/node/pull/9683","description":"End-of-Life."},{"version":["v6.12.0","v4.8.6"],"pr-url":"https://github.com/nodejs/node/pull/10116","description":"A deprecation code has been assigned."},{"version":"v6.0.0","pr-url":"https://github.com/nodejs/node/pull/4525","description":"Runtime deprecation."},{"version":"v0.1.96","commit":"c93e0aaf062081db3ec40ac45b3e2c979d5759d6","description":"Documentation-only deprecation."}]}} />

Type: End-of-Life

The [`fs.readSync()`][] legacy `String` interface is deprecated. Use the
`Buffer` API as mentioned in the documentation instead.

#### DEP0016: `GLOBAL`/`root`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v14.0.0","pr-url":"https://github.com/nodejs/node/pull/31167","description":"End-of-Life."},{"version":"v6.12.0","pr-url":"https://github.com/nodejs/node/pull/10116","description":"A deprecation code has been assigned."},{"version":"v6.0.0","pr-url":"https://github.com/nodejs/node/pull/1838","description":"Runtime deprecation."}]}} />

Type: End-of-Life

The `GLOBAL` and `root` aliases for the `global` property were deprecated
in Node.js 6.0.0 and have since been removed.

#### DEP0017: `Intl.v8BreakIterator`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v9.0.0","pr-url":"https://github.com/nodejs/node/pull/15238","description":"End-of-Life."},{"version":"v7.0.0","pr-url":"https://github.com/nodejs/node/pull/8908","description":"Runtime deprecation."}]}} />

Type: End-of-Life

`Intl.v8BreakIterator` was a non-standard extension and has been removed.
See [`Intl.Segmenter`](https://github.com/tc39/proposal-intl-segmenter).

#### DEP0018: Unhandled promise rejections

<Metadata version="v18.9.0" data={{"changes":[{"version":"v15.0.0","pr-url":"https://github.com/nodejs/node/pull/35316","description":"End-of-Life."},{"version":"v7.0.0","pr-url":"https://github.com/nodejs/node/pull/8217","description":"Runtime deprecation."}]}} />

Type: End-of-Life

Unhandled promise rejections are deprecated. By default, promise rejections
that are not handled terminate the Node.js process with a non-zero exit
code. To change the way Node.js treats unhandled rejections, use the
[`--unhandled-rejections`][] command-line option.

#### DEP0019: `require('.')` resolved outside directory

<Metadata version="v18.9.0" data={{"changes":[{"version":"v12.0.0","pr-url":"https://github.com/nodejs/node/pull/26973","description":"Removed functionality."},{"version":["v6.12.0","v4.8.6"],"pr-url":"https://github.com/nodejs/node/pull/10116","description":"A deprecation code has been assigned."},{"version":"v1.8.1","pr-url":"https://github.com/nodejs/node/pull/1363","description":"Runtime deprecation."}]}} />

Type: End-of-Life

In certain cases, `require('.')` could resolve outside the package directory.
This behavior has been removed.

#### DEP0020: `Server.connections`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v15.0.0","pr-url":"https://github.com/nodejs/node/pull/33647","description":"Server.connections has been removed."},{"version":["v6.12.0","v4.8.6"],"pr-url":"https://github.com/nodejs/node/pull/10116","description":"A deprecation code has been assigned."},{"version":"v0.9.7","pr-url":"https://github.com/nodejs/node-v0.x-archive/pull/4595","description":"Runtime deprecation."}]}} />

Type: End-of-Life

The `Server.connections` property was deprecated in Node.js v0.9.7 and has
been removed. Please use the [`Server.getConnections()`][] method instead.

#### DEP0021: `Server.listenFD`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v12.0.0","pr-url":"https://github.com/nodejs/node/pull/27127","description":"End-of-Life."},{"version":["v6.12.0","v4.8.6"],"pr-url":"https://github.com/nodejs/node/pull/10116","description":"A deprecation code has been assigned."},{"version":"v0.7.12","commit":"41421ff9da1288aa241a5e9dcf915b685ade1c23","description":"Runtime deprecation."}]}} />

Type: End-of-Life

The `Server.listenFD()` method was deprecated and removed. Please use
[`Server.listen({fd: <number>})`][] instead.

#### DEP0022: `os.tmpDir()`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v14.0.0","pr-url":"https://github.com/nodejs/node/pull/31169","description":"End-of-Life."},{"version":"v7.0.0","pr-url":"https://github.com/nodejs/node/pull/6739","description":"Runtime deprecation."}]}} />

Type: End-of-Life

The `os.tmpDir()` API was deprecated in Node.js 7.0.0 and has since been
removed. Please use [`os.tmpdir()`][] instead.

#### DEP0023: `os.getNetworkInterfaces()`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v12.0.0","pr-url":"https://github.com/nodejs/node/pull/25280","description":"End-of-Life."},{"version":["v6.12.0","v4.8.6"],"pr-url":"https://github.com/nodejs/node/pull/10116","description":"A deprecation code has been assigned."},{"version":"v0.6.0","commit":"37bb37d151fb6ee4696730e63ff28bb7a4924f97","description":"Runtime deprecation."}]}} />

Type: End-of-Life

The `os.getNetworkInterfaces()` method is deprecated. Please use the
[`os.networkInterfaces()`][] method instead.

#### DEP0024: `REPLServer.prototype.convertToContext()`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v9.0.0","pr-url":"https://github.com/nodejs/node/pull/13434","description":"End-of-Life."},{"version":"v7.0.0","pr-url":"https://github.com/nodejs/node/pull/7829","description":"Runtime deprecation."}]}} />

Type: End-of-Life

The `REPLServer.prototype.convertToContext()` API has been removed.

#### DEP0025: `require('node:sys')`

<Metadata version="v18.9.0" data={{"changes":[{"version":["v6.12.0","v4.8.6"],"pr-url":"https://github.com/nodejs/node/pull/10116","description":"A deprecation code has been assigned."},{"version":"v1.0.0","pr-url":"https://github.com/nodejs/node/pull/317","description":"Runtime deprecation."}]}} />

Type: Runtime

The `node:sys` module is deprecated. Please use the [`util`][] module instead.

#### DEP0026: `util.print()`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v12.0.0","pr-url":"https://github.com/nodejs/node/pull/25377","description":"End-of-Life."},{"version":["v6.12.0","v4.8.6"],"pr-url":"https://github.com/nodejs/node/pull/10116","description":"A deprecation code has been assigned."},{"version":"v0.11.3","commit":"896b2aa7074fc886efd7dd0a397d694763cac7ce","description":"Runtime deprecation."}]}} />

Type: End-of-Life

`util.print()` has been removed. Please use [`console.log()`][] instead.

#### DEP0027: `util.puts()`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v12.0.0","pr-url":"https://github.com/nodejs/node/pull/25377","description":"End-of-Life."},{"version":["v6.12.0","v4.8.6"],"pr-url":"https://github.com/nodejs/node/pull/10116","description":"A deprecation code has been assigned."},{"version":"v0.11.3","commit":"896b2aa7074fc886efd7dd0a397d694763cac7ce","description":"Runtime deprecation."}]}} />

Type: End-of-Life

`util.puts()` has been removed. Please use [`console.log()`][] instead.

#### DEP0028: `util.debug()`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v12.0.0","pr-url":"https://github.com/nodejs/node/pull/25377","description":"End-of-Life."},{"version":["v6.12.0","v4.8.6"],"pr-url":"https://github.com/nodejs/node/pull/10116","description":"A deprecation code has been assigned."},{"version":"v0.11.3","commit":"896b2aa7074fc886efd7dd0a397d694763cac7ce","description":"Runtime deprecation."}]}} />

Type: End-of-Life

`util.debug()` has been removed. Please use [`console.error()`][] instead.

#### DEP0029: `util.error()`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v12.0.0","pr-url":"https://github.com/nodejs/node/pull/25377","description":"End-of-Life."},{"version":["v6.12.0","v4.8.6"],"pr-url":"https://github.com/nodejs/node/pull/10116","description":"A deprecation code has been assigned."},{"version":"v0.11.3","commit":"896b2aa7074fc886efd7dd0a397d694763cac7ce","description":"Runtime deprecation."}]}} />

Type: End-of-Life

`util.error()` has been removed. Please use [`console.error()`][] instead.

#### DEP0030: `SlowBuffer`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v6.12.0","pr-url":"https://github.com/nodejs/node/pull/10116","description":"A deprecation code has been assigned."},{"version":"v6.0.0","pr-url":"https://github.com/nodejs/node/pull/5833","description":"Documentation-only deprecation."}]}} />

Type: Documentation-only

The [`SlowBuffer`][] class is deprecated. Please use
[`Buffer.allocUnsafeSlow(size)`][] instead.

#### DEP0031: `ecdh.setPublicKey()`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v6.12.0","pr-url":"https://github.com/nodejs/node/pull/10116","description":"A deprecation code has been assigned."},{"version":"v5.2.0","pr-url":"https://github.com/nodejs/node/pull/3511","description":"Documentation-only deprecation."}]}} />

Type: Documentation-only

The [`ecdh.setPublicKey()`][] method is now deprecated as its inclusion in the
API is not useful.

#### DEP0032: `node:domain` module

<Metadata version="v18.9.0" data={{"changes":[{"version":["v6.12.0","v4.8.6"],"pr-url":"https://github.com/nodejs/node/pull/10116","description":"A deprecation code has been assigned."},{"version":"v1.4.2","pr-url":"https://github.com/nodejs/node/pull/943","description":"Documentation-only deprecation."}]}} />

Type: Documentation-only

The [`domain`][] module is deprecated and should not be used.

#### DEP0033: `EventEmitter.listenerCount()`

<Metadata version="v18.9.0" data={{"changes":[{"version":["v6.12.0","v4.8.6"],"pr-url":"https://github.com/nodejs/node/pull/10116","description":"A deprecation code has been assigned."},{"version":"v3.2.0","pr-url":"https://github.com/nodejs/node/pull/2349","description":"Documentation-only deprecation."}]}} />

Type: Documentation-only

The [`events.listenerCount(emitter, eventName)`][] API is
deprecated. Please use [`emitter.listenerCount(eventName)`][] instead.

#### DEP0034: `fs.exists(path, callback)`

<Metadata version="v18.9.0" data={{"changes":[{"version":["v6.12.0","v4.8.6"],"pr-url":"https://github.com/nodejs/node/pull/10116","description":"A deprecation code has been assigned."},{"version":"v1.0.0","pr-url":"https://github.com/nodejs/node/pull/166","description":"Documentation-only deprecation."}]}} />

Type: Documentation-only

The [`fs.exists(path, callback)`][] API is deprecated. Please use
[`fs.stat()`][] or [`fs.access()`][] instead.

#### DEP0035: `fs.lchmod(path, mode, callback)`

<Metadata version="v18.9.0" data={{"changes":[{"version":["v6.12.0","v4.8.6"],"pr-url":"https://github.com/nodejs/node/pull/10116","description":"A deprecation code has been assigned."},{"version":"v0.4.7","description":"Documentation-only deprecation."}]}} />

Type: Documentation-only

The [`fs.lchmod(path, mode, callback)`][] API is deprecated.

#### DEP0036: `fs.lchmodSync(path, mode)`

<Metadata version="v18.9.0" data={{"changes":[{"version":["v6.12.0","v4.8.6"],"pr-url":"https://github.com/nodejs/node/pull/10116","description":"A deprecation code has been assigned."},{"version":"v0.4.7","description":"Documentation-only deprecation."}]}} />

Type: Documentation-only

The [`fs.lchmodSync(path, mode)`][] API is deprecated.

#### DEP0037: `fs.lchown(path, uid, gid, callback)`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v10.6.0","pr-url":"https://github.com/nodejs/node/pull/21498","description":"Deprecation revoked."},{"version":["v6.12.0","v4.8.6"],"pr-url":"https://github.com/nodejs/node/pull/10116","description":"A deprecation code has been assigned."},{"version":"v0.4.7","description":"Documentation-only deprecation."}]}} />

Type: Deprecation revoked

The [`fs.lchown(path, uid, gid, callback)`][] API was deprecated. The
deprecation was revoked because the requisite supporting APIs were added in
libuv.

#### DEP0038: `fs.lchownSync(path, uid, gid)`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v10.6.0","pr-url":"https://github.com/nodejs/node/pull/21498","description":"Deprecation revoked."},{"version":["v6.12.0","v4.8.6"],"pr-url":"https://github.com/nodejs/node/pull/10116","description":"A deprecation code has been assigned."},{"version":"v0.4.7","description":"Documentation-only deprecation."}]}} />

Type: Deprecation revoked

The [`fs.lchownSync(path, uid, gid)`][] API was deprecated. The deprecation was
revoked because the requisite supporting APIs were added in libuv.

#### DEP0039: `require.extensions`

<Metadata version="v18.9.0" data={{"changes":[{"version":["v6.12.0","v4.8.6"],"pr-url":"https://github.com/nodejs/node/pull/10116","description":"A deprecation code has been assigned."},{"version":"v0.10.6","commit":"7bd8a5a2a60b75266f89f9a32877d55294a3881c","description":"Documentation-only deprecation."}]}} />

Type: Documentation-only

The [`require.extensions`][] property is deprecated.

#### DEP0040: `node:punycode` module

<Metadata version="v18.9.0" data={{"changes":[{"version":"v16.6.0","pr-url":"https://github.com/nodejs/node/pull/38444","description":"Added support for `--pending-deprecation`."},{"version":"v7.0.0","pr-url":"https://github.com/nodejs/node/pull/7941","description":"Documentation-only deprecation."}]}} />

Type: Documentation-only (supports [`--pending-deprecation`][])

The [`punycode`][] module is deprecated. Please use a userland alternative
instead.

#### DEP0041: `NODE_REPL_HISTORY_FILE` environment variable

<Metadata version="v18.9.0" data={{"changes":[{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/13876","description":"End-of-Life."},{"version":["v6.12.0","v4.8.6"],"pr-url":"https://github.com/nodejs/node/pull/10116","description":"A deprecation code has been assigned."},{"version":"v3.0.0","pr-url":"https://github.com/nodejs/node/pull/2224","description":"Documentation-only deprecation."}]}} />

Type: End-of-Life

The `NODE_REPL_HISTORY_FILE` environment variable was removed. Please use
`NODE_REPL_HISTORY` instead.

#### DEP0042: `tls.CryptoStream`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/17882","description":"End-of-Life."},{"version":["v6.12.0","v4.8.6"],"pr-url":"https://github.com/nodejs/node/pull/10116","description":"A deprecation code has been assigned."},{"version":"v0.11.3","commit":"af80e7bc6e6f33c582eb1f7d37c7f5bbe9f910f7","description":"Documentation-only deprecation."}]}} />

Type: End-of-Life

The [`tls.CryptoStream`][] class was removed. Please use
[`tls.TLSSocket`][] instead.

#### DEP0043: `tls.SecurePair`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v8.0.0","pr-url":"https://github.com/nodejs/node/pull/11349","description":"Runtime deprecation."},{"version":"v6.12.0","pr-url":"https://github.com/nodejs/node/pull/10116","description":"A deprecation code has been assigned."},{"version":"v6.0.0","pr-url":"https://github.com/nodejs/node/pull/6063","description":"Documentation-only deprecation."},{"version":"v0.11.15","pr-url":["https://github.com/nodejs/node-v0.x-archive/pull/8695","https://github.com/nodejs/node-v0.x-archive/pull/8700"],"description":"Deprecation revoked."},{"version":"v0.11.3","commit":"af80e7bc6e6f33c582eb1f7d37c7f5bbe9f910f7","description":"Runtime deprecation."}]}} />

Type: Documentation-only

The [`tls.SecurePair`][] class is deprecated. Please use
[`tls.TLSSocket`][] instead.

#### DEP0044: `util.isArray()`

<Metadata version="v18.9.0" data={{"changes":[{"version":["v6.12.0","v4.8.6"],"pr-url":"https://github.com/nodejs/node/pull/10116","description":"A deprecation code has been assigned."},{"version":["v4.0.0","v3.3.1"],"pr-url":"https://github.com/nodejs/node/pull/2447","description":"Documentation-only deprecation."}]}} />

Type: Documentation-only

The [`util.isArray()`][] API is deprecated. Please use `Array.isArray()`
instead.

#### DEP0045: `util.isBoolean()`

<Metadata version="v18.9.0" data={{"changes":[{"version":["v6.12.0","v4.8.6"],"pr-url":"https://github.com/nodejs/node/pull/10116","description":"A deprecation code has been assigned."},{"version":["v4.0.0","v3.3.1"],"pr-url":"https://github.com/nodejs/node/pull/2447","description":"Documentation-only deprecation."}]}} />

Type: Documentation-only

The [`util.isBoolean()`][] API is deprecated.

#### DEP0046: `util.isBuffer()`

<Metadata version="v18.9.0" data={{"changes":[{"version":["v6.12.0","v4.8.6"],"pr-url":"https://github.com/nodejs/node/pull/10116","description":"A deprecation code has been assigned."},{"version":["v4.0.0","v3.3.1"],"pr-url":"https://github.com/nodejs/node/pull/2447","description":"Documentation-only deprecation."}]}} />

Type: Documentation-only

The [`util.isBuffer()`][] API is deprecated. Please use
[`Buffer.isBuffer()`][] instead.

#### DEP0047: `util.isDate()`

<Metadata version="v18.9.0" data={{"changes":[{"version":["v6.12.0","v4.8.6"],"pr-url":"https://github.com/nodejs/node/pull/10116","description":"A deprecation code has been assigned."},{"version":["v4.0.0","v3.3.1"],"pr-url":"https://github.com/nodejs/node/pull/2447","description":"Documentation-only deprecation."}]}} />

Type: Documentation-only

The [`util.isDate()`][] API is deprecated.

#### DEP0048: `util.isError()`

<Metadata version="v18.9.0" data={{"changes":[{"version":["v6.12.0","v4.8.6"],"pr-url":"https://github.com/nodejs/node/pull/10116","description":"A deprecation code has been assigned."},{"version":["v4.0.0","v3.3.1"],"pr-url":"https://github.com/nodejs/node/pull/2447","description":"Documentation-only deprecation."}]}} />

Type: Documentation-only

The [`util.isError()`][] API is deprecated.

#### DEP0049: `util.isFunction()`

<Metadata version="v18.9.0" data={{"changes":[{"version":["v6.12.0","v4.8.6"],"pr-url":"https://github.com/nodejs/node/pull/10116","description":"A deprecation code has been assigned."},{"version":["v4.0.0","v3.3.1"],"pr-url":"https://github.com/nodejs/node/pull/2447","description":"Documentation-only deprecation."}]}} />

Type: Documentation-only

The [`util.isFunction()`][] API is deprecated.

#### DEP0050: `util.isNull()`

<Metadata version="v18.9.0" data={{"changes":[{"version":["v6.12.0","v4.8.6"],"pr-url":"https://github.com/nodejs/node/pull/10116","description":"A deprecation code has been assigned."},{"version":["v4.0.0","v3.3.1"],"pr-url":"https://github.com/nodejs/node/pull/2447","description":"Documentation-only deprecation."}]}} />

Type: Documentation-only

The [`util.isNull()`][] API is deprecated.

#### DEP0051: `util.isNullOrUndefined()`

<Metadata version="v18.9.0" data={{"changes":[{"version":["v6.12.0","v4.8.6"],"pr-url":"https://github.com/nodejs/node/pull/10116","description":"A deprecation code has been assigned."},{"version":["v4.0.0","v3.3.1"],"pr-url":"https://github.com/nodejs/node/pull/2447","description":"Documentation-only deprecation."}]}} />

Type: Documentation-only

The [`util.isNullOrUndefined()`][] API is deprecated.

#### DEP0052: `util.isNumber()`

<Metadata version="v18.9.0" data={{"changes":[{"version":["v6.12.0","v4.8.6"],"pr-url":"https://github.com/nodejs/node/pull/10116","description":"A deprecation code has been assigned."},{"version":["v4.0.0","v3.3.1"],"pr-url":"https://github.com/nodejs/node/pull/2447","description":"Documentation-only deprecation."}]}} />

Type: Documentation-only

The [`util.isNumber()`][] API is deprecated.

#### DEP0053: `util.isObject()`

<Metadata version="v18.9.0" data={{"changes":[{"version":["v6.12.0","v4.8.6"],"pr-url":"https://github.com/nodejs/node/pull/10116","description":"A deprecation code has been assigned."},{"version":["v4.0.0","v3.3.1"],"pr-url":"https://github.com/nodejs/node/pull/2447","description":"Documentation-only deprecation."}]}} />

Type: Documentation-only

The [`util.isObject()`][] API is deprecated.

#### DEP0054: `util.isPrimitive()`

<Metadata version="v18.9.0" data={{"changes":[{"version":["v6.12.0","v4.8.6"],"pr-url":"https://github.com/nodejs/node/pull/10116","description":"A deprecation code has been assigned."},{"version":["v4.0.0","v3.3.1"],"pr-url":"https://github.com/nodejs/node/pull/2447","description":"Documentation-only deprecation."}]}} />

Type: Documentation-only

The [`util.isPrimitive()`][] API is deprecated.

#### DEP0055: `util.isRegExp()`

<Metadata version="v18.9.0" data={{"changes":[{"version":["v6.12.0","v4.8.6"],"pr-url":"https://github.com/nodejs/node/pull/10116","description":"A deprecation code has been assigned."},{"version":["v4.0.0","v3.3.1"],"pr-url":"https://github.com/nodejs/node/pull/2447","description":"Documentation-only deprecation."}]}} />

Type: Documentation-only

The [`util.isRegExp()`][] API is deprecated.

#### DEP0056: `util.isString()`

<Metadata version="v18.9.0" data={{"changes":[{"version":["v6.12.0","v4.8.6"],"pr-url":"https://github.com/nodejs/node/pull/10116","description":"A deprecation code has been assigned."},{"version":["v4.0.0","v3.3.1"],"pr-url":"https://github.com/nodejs/node/pull/2447","description":"Documentation-only deprecation."}]}} />

Type: Documentation-only

The [`util.isString()`][] API is deprecated.

#### DEP0057: `util.isSymbol()`

<Metadata version="v18.9.0" data={{"changes":[{"version":["v6.12.0","v4.8.6"],"pr-url":"https://github.com/nodejs/node/pull/10116","description":"A deprecation code has been assigned."},{"version":["v4.0.0","v3.3.1"],"pr-url":"https://github.com/nodejs/node/pull/2447","description":"Documentation-only deprecation."}]}} />

Type: Documentation-only

The [`util.isSymbol()`][] API is deprecated.

#### DEP0058: `util.isUndefined()`

<Metadata version="v18.9.0" data={{"changes":[{"version":["v6.12.0","v4.8.6"],"pr-url":"https://github.com/nodejs/node/pull/10116","description":"A deprecation code has been assigned."},{"version":["v4.0.0","v3.3.1"],"pr-url":"https://github.com/nodejs/node/pull/2447","description":"Documentation-only deprecation."}]}} />

Type: Documentation-only

The [`util.isUndefined()`][] API is deprecated.

#### DEP0059: `util.log()`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v6.12.0","pr-url":"https://github.com/nodejs/node/pull/10116","description":"A deprecation code has been assigned."},{"version":"v6.0.0","pr-url":"https://github.com/nodejs/node/pull/6161","description":"Documentation-only deprecation."}]}} />

Type: Documentation-only

The [`util.log()`][] API is deprecated.

#### DEP0060: `util._extend()`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v6.12.0","pr-url":"https://github.com/nodejs/node/pull/10116","description":"A deprecation code has been assigned."},{"version":"v6.0.0","pr-url":"https://github.com/nodejs/node/pull/4903","description":"Documentation-only deprecation."}]}} />

Type: Documentation-only

The [`util._extend()`][] API is deprecated.

#### DEP0061: `fs.SyncWriteStream`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v11.0.0","pr-url":"https://github.com/nodejs/node/pull/20735","description":"End-of-Life."},{"version":"v8.0.0","pr-url":"https://github.com/nodejs/node/pull/10467","description":"Runtime deprecation."},{"version":"v7.0.0","pr-url":"https://github.com/nodejs/node/pull/6749","description":"Documentation-only deprecation."}]}} />

Type: End-of-Life

The `fs.SyncWriteStream` class was never intended to be a publicly accessible
API and has been removed. No alternative API is available. Please use a userland
alternative.

#### DEP0062: `node --debug`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v12.0.0","pr-url":"https://github.com/nodejs/node/pull/25828","description":"End-of-Life."},{"version":"v8.0.0","pr-url":"https://github.com/nodejs/node/pull/10970","description":"Runtime deprecation."}]}} />

Type: End-of-Life

`--debug` activates the legacy V8 debugger interface, which was removed as
of V8 5.8. It is replaced by Inspector which is activated with `--inspect`
instead.

#### DEP0063: `ServerResponse.prototype.writeHeader()`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v8.0.0","pr-url":"https://github.com/nodejs/node/pull/11355","description":"Documentation-only deprecation."}]}} />

Type: Documentation-only

The `node:http` module `ServerResponse.prototype.writeHeader()` API is
deprecated. Please use `ServerResponse.prototype.writeHead()` instead.

The `ServerResponse.prototype.writeHeader()` method was never documented as an
officially supported API.

#### DEP0064: `tls.createSecurePair()`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v8.0.0","pr-url":"https://github.com/nodejs/node/pull/11349","description":"Runtime deprecation."},{"version":"v6.12.0","pr-url":"https://github.com/nodejs/node/pull/10116","description":"A deprecation code has been assigned."},{"version":"v6.0.0","pr-url":"https://github.com/nodejs/node/pull/6063","description":"Documentation-only deprecation."},{"version":"v0.11.15","pr-url":["https://github.com/nodejs/node-v0.x-archive/pull/8695","https://github.com/nodejs/node-v0.x-archive/pull/8700"],"description":"Deprecation revoked."},{"version":"v0.11.3","commit":"af80e7bc6e6f33c582eb1f7d37c7f5bbe9f910f7","description":"Runtime deprecation."}]}} />

Type: Runtime

The `tls.createSecurePair()` API was deprecated in documentation in Node.js
0.11.3. Users should use `tls.Socket` instead.

#### DEP0065: `repl.REPL_MODE_MAGIC` and `NODE_REPL_MODE=magic`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/19187","description":"End-of-Life."},{"version":"v8.0.0","pr-url":"https://github.com/nodejs/node/pull/11599","description":"Documentation-only deprecation."}]}} />

Type: End-of-Life

The `node:repl` module's `REPL_MODE_MAGIC` constant, used for `replMode` option,
has been removed. Its behavior has been functionally identical to that of
`REPL_MODE_SLOPPY` since Node.js 6.0.0, when V8 5.0 was imported. Please use
`REPL_MODE_SLOPPY` instead.

The `NODE_REPL_MODE` environment variable is used to set the underlying
`replMode` of an interactive `node` session. Its value, `magic`, is also
removed. Please use `sloppy` instead.

#### DEP0066: `OutgoingMessage.prototype._headers, OutgoingMessage.prototype._headerNames`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v12.0.0","pr-url":"https://github.com/nodejs/node/pull/24167","description":"Runtime deprecation."},{"version":"v8.0.0","pr-url":"https://github.com/nodejs/node/pull/10941","description":"Documentation-only deprecation."}]}} />

Type: Runtime

The `node:http` module `OutgoingMessage.prototype._headers` and
`OutgoingMessage.prototype._headerNames` properties are deprecated. Use one of
the public methods (e.g. `OutgoingMessage.prototype.getHeader()`,
`OutgoingMessage.prototype.getHeaders()`,
`OutgoingMessage.prototype.getHeaderNames()`,
`OutgoingMessage.prototype.getRawHeaderNames()`,
`OutgoingMessage.prototype.hasHeader()`,
`OutgoingMessage.prototype.removeHeader()`,
`OutgoingMessage.prototype.setHeader()`) for working with outgoing headers.

The `OutgoingMessage.prototype._headers` and
`OutgoingMessage.prototype._headerNames` properties were never documented as
officially supported properties.

#### DEP0067: `OutgoingMessage.prototype._renderHeaders`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v8.0.0","pr-url":"https://github.com/nodejs/node/pull/10941","description":"Documentation-only deprecation."}]}} />

Type: Documentation-only

The `node:http` module `OutgoingMessage.prototype._renderHeaders()` API is
deprecated.

The `OutgoingMessage.prototype._renderHeaders` property was never documented as
an officially supported API.

#### DEP0068: `node debug`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v15.0.0","pr-url":"https://github.com/nodejs/node/pull/33648","description":"The legacy `node debug` command was removed."},{"version":"v8.0.0","pr-url":"https://github.com/nodejs/node/pull/11441","description":"Runtime deprecation."}]}} />

Type: End-of-Life

`node debug` corresponds to the legacy CLI debugger which has been replaced with
a V8-inspector based CLI debugger available through `node inspect`.

#### DEP0069: `vm.runInDebugContext(string)`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/13295","description":"End-of-Life."},{"version":"v9.0.0","pr-url":"https://github.com/nodejs/node/pull/12815","description":"Runtime deprecation."},{"version":"v8.0.0","pr-url":"https://github.com/nodejs/node/pull/12243","description":"Documentation-only deprecation."}]}} />

Type: End-of-Life

DebugContext has been removed in V8 and is not available in Node.js 10+.

DebugContext was an experimental API.

#### DEP0070: `async_hooks.currentId()`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v9.0.0","pr-url":"https://github.com/nodejs/node/pull/14414","description":"End-of-Life."},{"version":"v8.2.0","pr-url":"https://github.com/nodejs/node/pull/13490","description":"Runtime deprecation."}]}} />

Type: End-of-Life

`async_hooks.currentId()` was renamed to `async_hooks.executionAsyncId()` for
clarity.

This change was made while `async_hooks` was an experimental API.

#### DEP0071: `async_hooks.triggerId()`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v9.0.0","pr-url":"https://github.com/nodejs/node/pull/14414","description":"End-of-Life."},{"version":"v8.2.0","pr-url":"https://github.com/nodejs/node/pull/13490","description":"Runtime deprecation."}]}} />

Type: End-of-Life

`async_hooks.triggerId()` was renamed to `async_hooks.triggerAsyncId()` for
clarity.

This change was made while `async_hooks` was an experimental API.

#### DEP0072: `async_hooks.AsyncResource.triggerId()`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v9.0.0","pr-url":"https://github.com/nodejs/node/pull/14414","description":"End-of-Life."},{"version":"v8.2.0","pr-url":"https://github.com/nodejs/node/pull/13490","description":"Runtime deprecation."}]}} />

Type: End-of-Life

`async_hooks.AsyncResource.triggerId()` was renamed to
`async_hooks.AsyncResource.triggerAsyncId()` for clarity.

This change was made while `async_hooks` was an experimental API.

#### DEP0073: Several internal properties of `net.Server`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/17141","description":"End-of-Life."},{"version":"v9.0.0","pr-url":"https://github.com/nodejs/node/pull/14449","description":"Runtime deprecation."}]}} />

Type: End-of-Life

Accessing several internal, undocumented properties of `net.Server` instances
with inappropriate names is deprecated.

As the original API was undocumented and not generally useful for non-internal
code, no replacement API is provided.

#### DEP0074: `REPLServer.bufferedCommand`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v15.0.0","pr-url":"https://github.com/nodejs/node/pull/33286","description":"End-of-Life."},{"version":"v9.0.0","pr-url":"https://github.com/nodejs/node/pull/13687","description":"Runtime deprecation."}]}} />

Type: End-of-Life

The `REPLServer.bufferedCommand` property was deprecated in favor of
[`REPLServer.clearBufferedCommand()`][].

#### DEP0075: `REPLServer.parseREPLKeyword()`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v15.0.0","pr-url":"https://github.com/nodejs/node/pull/33286","description":"End-of-Life."},{"version":"v9.0.0","pr-url":"https://github.com/nodejs/node/pull/14223","description":"Runtime deprecation."}]}} />

Type: End-of-Life

`REPLServer.parseREPLKeyword()` was removed from userland visibility.

#### DEP0076: `tls.parseCertString()`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/41479","description":"End-of-Life."},{"version":"v9.0.0","pr-url":"https://github.com/nodejs/node/pull/14249","description":"Runtime deprecation."},{"version":"v8.6.0","pr-url":"https://github.com/nodejs/node/pull/14245","description":"Documentation-only deprecation."}]}} />

Type: End-of-Life

`tls.parseCertString()` was a trivial parsing helper that was made public by
mistake. While it was supposed to parse certificate subject and issuer strings,
it never handled multi-value Relative Distinguished Names correctly.

Earlier versions of this document suggested using `querystring.parse()` as an
alternative to `tls.parseCertString()`. However, `querystring.parse()` also does
not handle all certificate subjects correctly and should not be used.

#### DEP0077: `Module._debug()`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v9.0.0","pr-url":"https://github.com/nodejs/node/pull/13948","description":"Runtime deprecation."}]}} />

Type: Runtime

`Module._debug()` is deprecated.

The `Module._debug()` function was never documented as an officially
supported API.

#### DEP0078: `REPLServer.turnOffEditorMode()`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v15.0.0","pr-url":"https://github.com/nodejs/node/pull/33286","description":"End-of-Life."},{"version":"v9.0.0","pr-url":"https://github.com/nodejs/node/pull/15136","description":"Runtime deprecation."}]}} />

Type: End-of-Life

`REPLServer.turnOffEditorMode()` was removed from userland visibility.

#### DEP0079: Custom inspection function on objects via `.inspect()`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v11.0.0","pr-url":"https://github.com/nodejs/node/pull/20722","description":"End-of-Life."},{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/16393","description":"Runtime deprecation."},{"version":"v8.7.0","pr-url":"https://github.com/nodejs/node/pull/15631","description":"Documentation-only deprecation."}]}} />

Type: End-of-Life

Using a property named `inspect` on an object to specify a custom inspection
function for [`util.inspect()`][] is deprecated. Use [`util.inspect.custom`][]
instead. For backward compatibility with Node.js prior to version 6.4.0, both
can be specified.

#### DEP0080: `path._makeLong()`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v9.0.0","pr-url":"https://github.com/nodejs/node/pull/14956","description":"Documentation-only deprecation."}]}} />

Type: Documentation-only

The internal `path._makeLong()` was not intended for public use. However,
userland modules have found it useful. The internal API is deprecated
and replaced with an identical, public `path.toNamespacedPath()` method.

#### DEP0081: `fs.truncate()` using a file descriptor

<Metadata version="v18.9.0" data={{"changes":[{"version":"v9.0.0","pr-url":"https://github.com/nodejs/node/pull/15990","description":"Runtime deprecation."}]}} />

Type: Runtime

`fs.truncate()` `fs.truncateSync()` usage with a file descriptor is
deprecated. Please use `fs.ftruncate()` or `fs.ftruncateSync()` to work with
file descriptors.

#### DEP0082: `REPLServer.prototype.memory()`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v15.0.0","pr-url":"https://github.com/nodejs/node/pull/33286","description":"End-of-Life."},{"version":"v9.0.0","pr-url":"https://github.com/nodejs/node/pull/16242","description":"Runtime deprecation."}]}} />

Type: End-of-Life

`REPLServer.prototype.memory()` is only necessary for the internal mechanics of
the `REPLServer` itself. Do not use this function.

#### DEP0083: Disabling ECDH by setting `ecdhCurve` to `false`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/19794","description":"End-of-Life."},{"version":"v9.2.0","pr-url":"https://github.com/nodejs/node/pull/16130","description":"Runtime deprecation."}]}} />

Type: End-of-Life.

The `ecdhCurve` option to `tls.createSecureContext()` and `tls.TLSSocket` could
be set to `false` to disable ECDH entirely on the server only. This mode was
deprecated in preparation for migrating to OpenSSL 1.1.0 and consistency with
the client and is now unsupported. Use the `ciphers` parameter instead.

#### DEP0084: requiring bundled internal dependencies

<Metadata version="v18.9.0" data={{"changes":[{"version":"v12.0.0","pr-url":"https://github.com/nodejs/node/pull/25138","description":"This functionality has been removed."},{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/16392","description":"Runtime deprecation."}]}} />

Type: End-of-Life

Since Node.js versions 4.4.0 and 5.2.0, several modules only intended for
internal usage were mistakenly exposed to user code through `require()`. These
modules were:

* `v8/tools/codemap`
* `v8/tools/consarray`
* `v8/tools/csvparser`
* `v8/tools/logreader`
* `v8/tools/profile_view`
* `v8/tools/profile`
* `v8/tools/SourceMap`
* `v8/tools/splaytree`
* `v8/tools/tickprocessor-driver`
* `v8/tools/tickprocessor`
* `node-inspect/lib/_inspect` (from 7.6.0)
* `node-inspect/lib/internal/inspect_client` (from 7.6.0)
* `node-inspect/lib/internal/inspect_repl` (from 7.6.0)

The `v8/*` modules do not have any exports, and if not imported in a specific
order would in fact throw errors. As such there are virtually no legitimate use
cases for importing them through `require()`.

On the other hand, `node-inspect` can be installed locally through a package
manager, as it is published on the npm registry under the same name. No source
code modification is necessary if that is done.

#### DEP0085: AsyncHooks sensitive API

<Metadata version="v18.9.0" data={{"changes":[{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/17147","description":"End-of-Life."},{"version":["v9.4.0","v8.10.0"],"pr-url":"https://github.com/nodejs/node/pull/16972","description":"Runtime deprecation."}]}} />

Type: End-of-Life

The AsyncHooks sensitive API was never documented and had various minor issues.
Use the `AsyncResource` API instead. See
<https://github.com/nodejs/node/issues/15572>.

#### DEP0086: Remove `runInAsyncIdScope`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/17147","description":"End-of-Life."},{"version":["v9.4.0","v8.10.0"],"pr-url":"https://github.com/nodejs/node/pull/16972","description":"Runtime deprecation."}]}} />

Type: End-of-Life

`runInAsyncIdScope` doesn't emit the `'before'` or `'after'` event and can thus
cause a lot of issues. See <https://github.com/nodejs/node/issues/14328>.





#### DEP0089: `require('node:assert')`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v12.8.0","pr-url":"https://github.com/nodejs/node/pull/28892","description":"Deprecation revoked."},{"version":["v9.9.0","v8.13.0"],"pr-url":"https://github.com/nodejs/node/pull/17002","description":"Documentation-only deprecation."}]}} />

Type: Deprecation revoked

Importing assert directly was not recommended as the exposed functions use
loose equality checks. The deprecation was revoked because use of the
`node:assert` module is not discouraged, and the deprecation caused developer
confusion.

#### DEP0090: Invalid GCM authentication tag lengths

<Metadata version="v18.9.0" data={{"changes":[{"version":"v11.0.0","pr-url":"https://github.com/nodejs/node/pull/17825","description":"End-of-Life."},{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/18017","description":"Runtime deprecation."}]}} />

Type: End-of-Life

Node.js used to support all GCM authentication tag lengths which are accepted by
OpenSSL when calling [`decipher.setAuthTag()`][]. Beginning with Node.js
v11.0.0, only authentication tag lengths of 128, 120, 112, 104, 96, 64, and 32
bits are allowed. Authentication tags of other lengths are invalid per
[NIST SP 800-38D][].

#### DEP0091: `crypto.DEFAULT_ENCODING`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/18333","description":"Runtime deprecation."}]}} />

Type: Runtime

The [`crypto.DEFAULT_ENCODING`][] property is deprecated.

#### DEP0092: Top-level `this` bound to `module.exports`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/16878","description":"Documentation-only deprecation."}]}} />

Type: Documentation-only

Assigning properties to the top-level `this` as an alternative
to `module.exports` is deprecated. Developers should use `exports`
or `module.exports` instead.

#### DEP0093: `crypto.fips` is deprecated and replaced

<Metadata version="v18.9.0" data={{"changes":[{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/18335","description":"Documentation-only deprecation."}]}} />

Type: Documentation-only

The [`crypto.fips`][] property is deprecated. Please use `crypto.setFips()`
and `crypto.getFips()` instead.

#### DEP0094: Using `assert.fail()` with more than one argument

<Metadata version="v18.9.0" data={{"changes":[{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/18418","description":"Runtime deprecation."}]}} />

Type: Runtime

Using `assert.fail()` with more than one argument is deprecated. Use
`assert.fail()` with only one argument or use a different `node:assert` module
method.

#### DEP0095: `timers.enroll()`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/18066","description":"Runtime deprecation."}]}} />

Type: Runtime

`timers.enroll()` is deprecated. Please use the publicly documented
[`setTimeout()`][] or [`setInterval()`][] instead.

#### DEP0096: `timers.unenroll()`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/18066","description":"Runtime deprecation."}]}} />

Type: Runtime

`timers.unenroll()` is deprecated. Please use the publicly documented
[`clearTimeout()`][] or [`clearInterval()`][] instead.

#### DEP0097: `MakeCallback` with `domain` property

<Metadata version="v18.9.0" data={{"changes":[{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/17417","description":"Runtime deprecation."}]}} />

Type: Runtime

Users of `MakeCallback` that add the `domain` property to carry context,
should start using the `async_context` variant of `MakeCallback` or
`CallbackScope`, or the high-level `AsyncResource` class.

#### DEP0098: AsyncHooks embedder `AsyncResource.emitBefore` and `AsyncResource.emitAfter` APIs

<Metadata version="v18.9.0" data={{"changes":[{"version":"v12.0.0","pr-url":"https://github.com/nodejs/node/pull/26530","description":"End-of-Life."},{"version":["v10.0.0","v9.6.0","v8.12.0"],"pr-url":"https://github.com/nodejs/node/pull/18632","description":"Runtime deprecation."}]}} />

Type: End-of-Life

The embedded API provided by AsyncHooks exposes `.emitBefore()` and
`.emitAfter()` methods which are very easy to use incorrectly which can lead
to unrecoverable errors.

Use [`asyncResource.runInAsyncScope()`][] API instead which provides a much
safer, and more convenient, alternative. See
<https://github.com/nodejs/node/pull/18513>.

#### DEP0099: Async context-unaware `node::MakeCallback` C++ APIs

<Metadata version="v18.9.0" data={{"changes":[{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/18632","description":"Compile-time deprecation."}]}} />

Type: Compile-time

Certain versions of `node::MakeCallback` APIs available to native addons are
deprecated. Please use the versions of the API that accept an `async_context`
parameter.

#### DEP0100: `process.assert()`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/18666","description":"Runtime deprecation."},{"version":"v0.3.7","description":"Documentation-only deprecation."}]}} />

Type: Runtime

`process.assert()` is deprecated. Please use the [`assert`][] module instead.

This was never a documented feature.

#### DEP0101: `--with-lttng`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/18982","description":"End-of-Life."}]}} />

Type: End-of-Life

The `--with-lttng` compile-time option has been removed.

#### DEP0102: Using `noAssert` in `Buffer#(read|write)` operations

<Metadata version="v18.9.0" data={{"changes":[{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/18395","description":"End-of-Life."}]}} />

Type: End-of-Life

Using the `noAssert` argument has no functionality anymore. All input is
verified regardless of the value of `noAssert`. Skipping the verification
could lead to hard-to-find errors and crashes.

#### DEP0103: `process.binding('util').is[...]` typechecks

<Metadata version="v18.9.0" data={{"changes":[{"version":"v10.9.0","pr-url":"https://github.com/nodejs/node/pull/22004","description":"Superseded by [DEP0111](#DEP0111)."},{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/18415","description":"Documentation-only deprecation."}]}} />

Type: Documentation-only (supports [`--pending-deprecation`][])

Using `process.binding()` in general should be avoided. The type checking
methods in particular can be replaced by using [`util.types`][].

This deprecation has been superseded by the deprecation of the
`process.binding()` API ([DEP0111](#DEP0111)).

#### DEP0104: `process.env` string coercion

<Metadata version="v18.9.0" data={{"changes":[{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/18990","description":"Documentation-only deprecation."}]}} />

Type: Documentation-only (supports [`--pending-deprecation`][])

When assigning a non-string property to [`process.env`][], the assigned value is
implicitly converted to a string. This behavior is deprecated if the assigned
value is not a string, boolean, or number. In the future, such assignment might
result in a thrown error. Please convert the property to a string before
assigning it to `process.env`.

#### DEP0105: `decipher.finaltol`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v11.0.0","pr-url":"https://github.com/nodejs/node/pull/19941","description":"End-of-Life."},{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/19353","description":"Runtime deprecation."}]}} />

Type: End-of-Life

`decipher.finaltol()` has never been documented and was an alias for
[`decipher.final()`][]. This API has been removed, and it is recommended to use
[`decipher.final()`][] instead.

#### DEP0106: `crypto.createCipher` and `crypto.createDecipher`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v11.0.0","pr-url":"https://github.com/nodejs/node/pull/22089","description":"Runtime deprecation."},{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/19343","description":"Documentation-only deprecation."}]}} />

Type: Runtime

Using [`crypto.createCipher()`][] and [`crypto.createDecipher()`][] should be
avoided as they use a weak key derivation function (MD5 with no salt) and static
initialization vectors. It is recommended to derive a key using
[`crypto.pbkdf2()`][] or [`crypto.scrypt()`][] and to use
[`crypto.createCipheriv()`][] and [`crypto.createDecipheriv()`][] to obtain the
[`Cipher`][] and [`Decipher`][] objects respectively.

#### DEP0107: `tls.convertNPNProtocols()`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v11.0.0","pr-url":"https://github.com/nodejs/node/pull/20736","description":"End-of-Life."},{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/19403","description":"Runtime deprecation."}]}} />

Type: End-of-Life

This was an undocumented helper function not intended for use outside Node.js
core and obsoleted by the removal of NPN (Next Protocol Negotiation) support.

#### DEP0108: `zlib.bytesRead`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v11.0.0","pr-url":"https://github.com/nodejs/node/pull/23308","description":"Runtime deprecation."},{"version":"v10.0.0","pr-url":"https://github.com/nodejs/node/pull/19414","description":"Documentation-only deprecation."}]}} />

Type: Runtime

Deprecated alias for [`zlib.bytesWritten`][]. This original name was chosen
because it also made sense to interpret the value as the number of bytes
read by the engine, but is inconsistent with other streams in Node.js that
expose values under these names.

#### DEP0109: `http`, `https`, and `tls` support for invalid URLs

<Metadata version="v18.9.0" data={{"changes":[{"version":"v16.0.0","pr-url":"https://github.com/nodejs/node/pull/36853","description":"End-of-Life."},{"version":"v11.0.0","pr-url":"https://github.com/nodejs/node/pull/20270","description":"Runtime deprecation."}]}} />

Type: End-of-Life

Some previously supported (but strictly invalid) URLs were accepted through the
[`http.request()`][], [`http.get()`][], [`https.request()`][],
[`https.get()`][], and [`tls.checkServerIdentity()`][] APIs because those were
accepted by the legacy `url.parse()` API. The mentioned APIs now use the WHATWG
URL parser that requires strictly valid URLs. Passing an invalid URL is
deprecated and support will be removed in the future.

#### DEP0110: `vm.Script` cached data

<Metadata version="v18.9.0" data={{"changes":[{"version":"v10.6.0","pr-url":"https://github.com/nodejs/node/pull/20300","description":"Documentation-only deprecation."}]}} />

Type: Documentation-only

The `produceCachedData` option is deprecated. Use
[`script.createCachedData()`][] instead.

#### DEP0111: `process.binding()`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v11.12.0","pr-url":"https://github.com/nodejs/node/pull/26500","description":"Added support for `--pending-deprecation`."},{"version":"v10.9.0","pr-url":"https://github.com/nodejs/node/pull/22004","description":"Documentation-only deprecation."}]}} />

Type: Documentation-only (supports [`--pending-deprecation`][])

`process.binding()` is for use by Node.js internal code only.

#### DEP0112: `dgram` private APIs

<Metadata version="v18.9.0" data={{"changes":[{"version":"v11.0.0","pr-url":"https://github.com/nodejs/node/pull/22011","description":"Runtime deprecation."}]}} />

Type: Runtime

The `node:dgram` module previously contained several APIs that were never meant
to accessed outside of Node.js core: `Socket.prototype._handle`,
`Socket.prototype._receiving`, `Socket.prototype._bindState`,
`Socket.prototype._queue`, `Socket.prototype._reuseAddr`,
`Socket.prototype._healthCheck()`, `Socket.prototype._stopReceiving()`, and
`dgram._createSocketHandle()`.

#### DEP0113: `Cipher.setAuthTag()`, `Decipher.getAuthTag()`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v12.0.0","pr-url":"https://github.com/nodejs/node/pull/26249","description":"End-of-Life."},{"version":"v11.0.0","pr-url":"https://github.com/nodejs/node/pull/22126","description":"Runtime deprecation."}]}} />

Type: End-of-Life

`Cipher.setAuthTag()` and `Decipher.getAuthTag()` are no longer available. They
were never documented and would throw when called.

#### DEP0114: `crypto._toBuf()`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v12.0.0","pr-url":"https://github.com/nodejs/node/pull/25338","description":"End-of-Life."},{"version":"v11.0.0","pr-url":"https://github.com/nodejs/node/pull/22501","description":"Runtime deprecation."}]}} />

Type: End-of-Life

The `crypto._toBuf()` function was not designed to be used by modules outside
of Node.js core and was removed.



#### DEP0115: `crypto.prng()`, `crypto.pseudoRandomBytes()`, `crypto.rng()`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v11.0.0","pr-url":["https://github.com/nodejs/node/pull/22519","https://github.com/nodejs/node/pull/23017"],"description":"Added documentation-only deprecation with `--pending-deprecation` support."}]}} />

Type: Documentation-only (supports [`--pending-deprecation`][])



In recent versions of Node.js, there is no difference between
[`crypto.randomBytes()`][] and `crypto.pseudoRandomBytes()`. The latter is
deprecated along with the undocumented aliases `crypto.prng()` and
`crypto.rng()` in favor of [`crypto.randomBytes()`][] and might be removed in a
future release.

#### DEP0116: Legacy URL API

<Metadata version="v18.9.0" data={{"changes":[{"version":["v15.13.0","v14.17.0"],"pr-url":"https://github.com/nodejs/node/pull/37784","description":"Deprecation revoked. Status changed to \"Legacy\"."},{"version":"v11.0.0","pr-url":"https://github.com/nodejs/node/pull/22715","description":"Documentation-only deprecation."}]}} />

Type: Deprecation revoked

The [Legacy URL API][] is deprecated. This includes [`url.format()`][],
[`url.parse()`][], [`url.resolve()`][], and the [legacy `urlObject`][]. Please
use the [WHATWG URL API][] instead.

#### DEP0117: Native crypto handles

<Metadata version="v18.9.0" data={{"changes":[{"version":"v12.0.0","pr-url":"https://github.com/nodejs/node/pull/27011","description":"End-of-Life."},{"version":"v11.0.0","pr-url":"https://github.com/nodejs/node/pull/22747","description":"Runtime deprecation."}]}} />

Type: End-of-Life

Previous versions of Node.js exposed handles to internal native objects through
the `_handle` property of the `Cipher`, `Decipher`, `DiffieHellman`,
`DiffieHellmanGroup`, `ECDH`, `Hash`, `Hmac`, `Sign`, and `Verify` classes.
The `_handle` property has been removed because improper use of the native
object can lead to crashing the application.

#### DEP0118: `dns.lookup()` support for a falsy host name

<Metadata version="v18.9.0" data={{"changes":[{"version":"v11.0.0","pr-url":"https://github.com/nodejs/node/pull/23173","description":"Runtime deprecation."}]}} />

Type: Runtime

Previous versions of Node.js supported `dns.lookup()` with a falsy host name
like `dns.lookup(false)` due to backward compatibility.
This behavior is undocumented and is thought to be unused in real world apps.
It will become an error in future versions of Node.js.

#### DEP0119: `process.binding('uv').errname()` private API

<Metadata version="v18.9.0" data={{"changes":[{"version":"v11.0.0","pr-url":"https://github.com/nodejs/node/pull/23597","description":"Documentation-only deprecation."}]}} />

Type: Documentation-only (supports [`--pending-deprecation`][])

`process.binding('uv').errname()` is deprecated. Please use
[`util.getSystemErrorName()`][] instead.

#### DEP0120: Windows Performance Counter support

<Metadata version="v18.9.0" data={{"changes":[{"version":"v12.0.0","pr-url":"https://github.com/nodejs/node/pull/24862","description":"End-of-Life."},{"version":"v11.0.0","pr-url":"https://github.com/nodejs/node/pull/22485","description":"Runtime deprecation."}]}} />

Type: End-of-Life

Windows Performance Counter support has been removed from Node.js. The
undocumented `COUNTER_NET_SERVER_CONNECTION()`,
`COUNTER_NET_SERVER_CONNECTION_CLOSE()`, `COUNTER_HTTP_SERVER_REQUEST()`,
`COUNTER_HTTP_SERVER_RESPONSE()`, `COUNTER_HTTP_CLIENT_REQUEST()`, and
`COUNTER_HTTP_CLIENT_RESPONSE()` functions have been deprecated.

#### DEP0121: `net._setSimultaneousAccepts()`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v12.0.0","pr-url":"https://github.com/nodejs/node/pull/23760","description":"Runtime deprecation."}]}} />

Type: Runtime

The undocumented `net._setSimultaneousAccepts()` function was originally
intended for debugging and performance tuning when using the
`node:child_process` and `node:cluster` modules on Windows. The function is not
generally useful and is being removed. See discussion here:
<https://github.com/nodejs/node/issues/18391>

#### DEP0122: `tls` `Server.prototype.setOptions()`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v12.0.0","pr-url":"https://github.com/nodejs/node/pull/23820","description":"Runtime deprecation."}]}} />

Type: Runtime

Please use `Server.prototype.setSecureContext()` instead.

#### DEP0123: setting the TLS ServerName to an IP address

<Metadata version="v18.9.0" data={{"changes":[{"version":"v12.0.0","pr-url":"https://github.com/nodejs/node/pull/23329","description":"Runtime deprecation."}]}} />

Type: Runtime

Setting the TLS ServerName to an IP address is not permitted by
[RFC 6066][]. This will be ignored in a future version.

#### DEP0124: using `REPLServer.rli`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v15.0.0","pr-url":"https://github.com/nodejs/node/pull/33286","description":"End-of-Life."},{"version":"v12.0.0","pr-url":"https://github.com/nodejs/node/pull/26260","description":"Runtime deprecation."}]}} />

Type: End-of-Life

This property is a reference to the instance itself.

#### DEP0125: `require('node:_stream_wrap')`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v12.0.0","pr-url":"https://github.com/nodejs/node/pull/26245","description":"Runtime deprecation."}]}} />

Type: Runtime

The `node:_stream_wrap` module is deprecated.

#### DEP0126: `timers.active()`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v11.14.0","pr-url":"https://github.com/nodejs/node/pull/26760","description":"Runtime deprecation."}]}} />

Type: Runtime

The previously undocumented `timers.active()` is deprecated.
Please use the publicly documented [`timeout.refresh()`][] instead.
If re-referencing the timeout is necessary, [`timeout.ref()`][] can be used
with no performance impact since Node.js 10.

#### DEP0127: `timers._unrefActive()`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v11.14.0","pr-url":"https://github.com/nodejs/node/pull/26760","description":"Runtime deprecation."}]}} />

Type: Runtime

The previously undocumented and "private" `timers._unrefActive()` is deprecated.
Please use the publicly documented [`timeout.refresh()`][] instead.
If unreferencing the timeout is necessary, [`timeout.unref()`][] can be used
with no performance impact since Node.js 10.

#### DEP0128: modules with an invalid `main` entry and an `index.js` file

<Metadata version="v18.9.0" data={{"changes":[{"version":"v16.0.0","pr-url":"https://github.com/nodejs/node/pull/37204","description":"Runtime deprecation."},{"version":"v12.0.0","pr-url":"https://github.com/nodejs/node/pull/26823","description":"Documentation-only."}]}} />

Type: Runtime

Modules that have an invalid `main` entry (e.g., `./does-not-exist.js`) and
also have an `index.js` file in the top level directory will resolve the
`index.js` file. That is deprecated and is going to throw an error in future
Node.js versions.

#### DEP0129: `ChildProcess._channel`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v13.0.0","pr-url":"https://github.com/nodejs/node/pull/27949","description":"Runtime deprecation."},{"version":"v11.14.0","pr-url":"https://github.com/nodejs/node/pull/26982","description":"Documentation-only."}]}} />

Type: Runtime

The `_channel` property of child process objects returned by `spawn()` and
similar functions is not intended for public use. Use `ChildProcess.channel`
instead.

#### DEP0130: `Module.createRequireFromPath()`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v16.0.0","pr-url":"https://github.com/nodejs/node/pull/37201","description":"End-of-life."},{"version":"v13.0.0","pr-url":"https://github.com/nodejs/node/pull/27951","description":"Runtime deprecation."},{"version":"v12.2.0","pr-url":"https://github.com/nodejs/node/pull/27405","description":"Documentation-only."}]}} />

Type: End-of-Life

Use [`module.createRequire()`][] instead.

#### DEP0131: Legacy HTTP parser

<Metadata version="v18.9.0" data={{"changes":[{"version":"v13.0.0","pr-url":"https://github.com/nodejs/node/pull/29589","description":"This feature has been removed."},{"version":"v12.22.0","pr-url":"https://github.com/nodejs/node/pull/37603","description":"Runtime deprecation."},{"version":"v12.3.0","pr-url":"https://github.com/nodejs/node/pull/27498","description":"Documentation-only."}]}} />

Type: End-of-Life

The legacy HTTP parser, used by default in versions of Node.js prior to 12.0.0,
is deprecated and has been removed in v13.0.0. Prior to v13.0.0, the
`--http-parser=legacy` command-line flag could be used to revert to using the
legacy parser.

#### DEP0132: `worker.terminate()` with callback

<Metadata version="v18.9.0" data={{"changes":[{"version":"v12.5.0","pr-url":"https://github.com/nodejs/node/pull/28021","description":"Runtime deprecation."}]}} />

Type: Runtime

Passing a callback to [`worker.terminate()`][] is deprecated. Use the returned
`Promise` instead, or a listener to the worker's `'exit'` event.

#### DEP0133: `http` `connection`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v12.12.0","pr-url":"https://github.com/nodejs/node/pull/29015","description":"Documentation-only deprecation."}]}} />

Type: Documentation-only

Prefer [`response.socket`][] over [`response.connection`][] and
[`request.socket`][] over [`request.connection`][].

#### DEP0134: `process._tickCallback`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v12.12.0","pr-url":"https://github.com/nodejs/node/pull/29781","description":"Documentation-only deprecation."}]}} />

Type: Documentation-only (supports [`--pending-deprecation`][])

The `process._tickCallback` property was never documented as
an officially supported API.

#### DEP0135: `WriteStream.open()` and `ReadStream.open()` are internal

<Metadata version="v18.9.0" data={{"changes":[{"version":"v13.0.0","pr-url":"https://github.com/nodejs/node/pull/29061","description":"Runtime deprecation."}]}} />

Type: Runtime

[`WriteStream.open()`][] and [`ReadStream.open()`][] are undocumented internal
APIs that do not make sense to use in userland. File streams should always be
opened through their corresponding factory methods [`fs.createWriteStream()`][]
and [`fs.createReadStream()`][]) or by passing a file descriptor in options.

#### DEP0136: `http` `finished`

<Metadata version="v18.9.0" data={{"changes":[{"version":["v13.4.0","v12.16.0"],"pr-url":"https://github.com/nodejs/node/pull/28679","description":"Documentation-only deprecation."}]}} />

Type: Documentation-only

[`response.finished`][] indicates whether [`response.end()`][] has been
called, not whether `'finish'` has been emitted and the underlying data
is flushed.

Use [`response.writableFinished`][] or [`response.writableEnded`][]
accordingly instead to avoid the ambiguity.

To maintain existing behavior `response.finished` should be replaced with
`response.writableEnded`.

#### DEP0137: Closing fs.FileHandle on garbage collection

<Metadata version="v18.9.0" data={{"changes":[{"version":"v14.0.0","pr-url":"https://github.com/nodejs/node/pull/28396","description":"Runtime deprecation."}]}} />

Type: Runtime

Allowing a [`fs.FileHandle`][] object to be closed on garbage collection is
deprecated. In the future, doing so might result in a thrown error that will
terminate the process.

Please ensure that all `fs.FileHandle` objects are explicitly closed using
`FileHandle.prototype.close()` when the `fs.FileHandle` is no longer needed:

```js
const fsPromises = require('node:fs').promises;
async function openAndClose() {
  let filehandle;
  try {
    filehandle = await fsPromises.open('thefile.txt', 'r');
  } finally {
    if (filehandle !== undefined)
      await filehandle.close();
  }
}
```

#### DEP0138: `process.mainModule`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v14.0.0","pr-url":"https://github.com/nodejs/node/pull/32232","description":"Documentation-only deprecation."}]}} />

Type: Documentation-only

[`process.mainModule`][] is a CommonJS-only feature while `process` global
object is shared with non-CommonJS environment. Its use within ECMAScript
modules is unsupported.

It is deprecated in favor of [`require.main`][], because it serves the same
purpose and is only available on CommonJS environment.

#### DEP0139: `process.umask()` with no arguments

<Metadata version="v18.9.0" data={{"changes":[{"version":["v14.0.0","v12.19.0"],"pr-url":"https://github.com/nodejs/node/pull/32499","description":"Documentation-only deprecation."}]}} />

Type: Documentation-only

Calling `process.umask()` with no argument causes the process-wide umask to be
written twice. This introduces a race condition between threads, and is a
potential security vulnerability. There is no safe, cross-platform alternative
API.

#### DEP0140: Use `request.destroy()` instead of `request.abort()`

<Metadata version="v18.9.0" data={{"changes":[{"version":["v14.1.0","v13.14.0"],"pr-url":"https://github.com/nodejs/node/pull/32807","description":"Documentation-only deprecation."}]}} />

Type: Documentation-only

Use [`request.destroy()`][] instead of [`request.abort()`][].

#### DEP0141: `repl.inputStream` and `repl.outputStream`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v14.3.0","pr-url":"https://github.com/nodejs/node/pull/33294","description":"Documentation-only (supports [`--pending-deprecation`][])."}]}} />

Type: Documentation-only (supports [`--pending-deprecation`][])

The `node:repl` module exported the input and output stream twice. Use `.input`
instead of `.inputStream` and `.output` instead of `.outputStream`.

#### DEP0142: `repl._builtinLibs`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v14.3.0","pr-url":"https://github.com/nodejs/node/pull/33294","description":"Documentation-only (supports [`--pending-deprecation`][])."}]}} />

Type: Documentation-only

The `node:repl` module exports a `_builtinLibs` property that contains an array
of built-in modules. It was incomplete so far and instead it's better to rely
upon `require('node:module').builtinModules`.

#### DEP0143: `Transform._transformState`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v14.5.0","pr-url":"https://github.com/nodejs/node/pull/33126","description":"Runtime deprecation."}]}} />

Type: Runtime
`Transform._transformState` will be removed in future versions where it is
no longer required due to simplification of the implementation.

#### DEP0144: `module.parent`

<Metadata version="v18.9.0" data={{"changes":[{"version":["v14.6.0","v12.19.0"],"pr-url":"https://github.com/nodejs/node/pull/32217","description":"Documentation-only deprecation."}]}} />

Type: Documentation-only (supports [`--pending-deprecation`][])

A CommonJS module can access the first module that required it using
`module.parent`. This feature is deprecated because it does not work
consistently in the presence of ECMAScript modules and because it gives an
inaccurate representation of the CommonJS module graph.

Some modules use it to check if they are the entry point of the current process.
Instead, it is recommended to compare `require.main` and `module`:

```js
if (require.main === module) {
  // Code section that will run only if current file is the entry point.
}
```

When looking for the CommonJS modules that have required the current one,
`require.cache` and `module.children` can be used:

```js
const moduleParents = Object.values(require.cache)
  .filter((m) => m.children.includes(module));
```

#### DEP0145: `socket.bufferSize`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v14.6.0","pr-url":"https://github.com/nodejs/node/pull/34088","description":"Documentation-only deprecation."}]}} />

Type: Documentation-only

[`socket.bufferSize`][] is just an alias for [`writable.writableLength`][].

#### DEP0146: `new crypto.Certificate()`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v14.9.0","pr-url":"https://github.com/nodejs/node/pull/34697","description":"Documentation-only deprecation."}]}} />

Type: Documentation-only

The [`crypto.Certificate()` constructor][] is deprecated. Use
[static methods of `crypto.Certificate()`][] instead.

#### DEP0147: `fs.rmdir(path, { recursive: true })`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v16.0.0","pr-url":"https://github.com/nodejs/node/pull/37302","description":"Runtime deprecation."},{"version":"v15.0.0","pr-url":"https://github.com/nodejs/node/pull/35562","description":"Runtime deprecation for permissive behavior."},{"version":"v14.14.0","pr-url":"https://github.com/nodejs/node/pull/35579","description":"Documentation-only deprecation."}]}} />

Type: Runtime

In future versions of Node.js, `recursive` option will be ignored for
`fs.rmdir`, `fs.rmdirSync`, and `fs.promises.rmdir`.

Use `fs.rm(path, { recursive: true, force: true })`,
`fs.rmSync(path, { recursive: true, force: true })` or
`fs.promises.rm(path, { recursive: true, force: true })` instead.

#### DEP0148: Folder mappings in `"exports"` (trailing `"/"`)

<Metadata version="v18.9.0" data={{"changes":[{"version":"v17.0.0","pr-url":"https://github.com/nodejs/node/pull/40121","description":"End-of-Life."},{"version":"v16.0.0","pr-url":"https://github.com/nodejs/node/pull/37215","description":"Runtime deprecation."},{"version":"v15.1.0","pr-url":"https://github.com/nodejs/node/pull/35747","description":"Runtime deprecation for self-referencing imports."},{"version":"v14.13.0","pr-url":"https://github.com/nodejs/node/pull/34718","description":"Documentation-only deprecation."}]}} />

Type: Runtime

Using a trailing `"/"` to define subpath folder mappings in the
[subpath exports][] or [subpath imports][] fields is deprecated. Use
[subpath patterns][] instead.

#### DEP0149: `http.IncomingMessage#connection`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v16.0.0","pr-url":"https://github.com/nodejs/node/pull/33768","description":"Documentation-only deprecation."}]}} />

Type: Documentation-only.

Prefer [`message.socket`][] over [`message.connection`][].

#### DEP0150: Changing the value of `process.config`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v16.0.0","pr-url":"https://github.com/nodejs/node/pull/36902","description":"Runtime deprecation."}]}} />

Type: Runtime

The `process.config` property provides access to Node.js compile-time settings.
However, the property is mutable and therefore subject to tampering. The ability
to change the value will be removed in a future version of Node.js.

#### DEP0151: Main index lookup and extension searching

<Metadata version="v18.9.0" data={{"changes":[{"version":"v16.0.0","pr-url":"https://github.com/nodejs/node/pull/37206","description":"Runtime deprecation."},{"version":["v15.8.0","v14.18.0"],"pr-url":"https://github.com/nodejs/node/pull/36918","description":"Documentation-only deprecation with `--pending-deprecation` support."}]}} />

Type: Runtime

Previously, `index.js` and extension searching lookups would apply to
`import 'pkg'` main entry point resolution, even when resolving ES modules.

With this deprecation, all ES module main entry point resolutions require
an explicit [`"exports"` or `"main"` entry][] with the exact file extension.

#### DEP0152: Extension PerformanceEntry properties

<Metadata version="v18.9.0" data={{"changes":[{"version":"v16.0.0","pr-url":"https://github.com/nodejs/node/pull/37136","description":"Runtime deprecation."}]}} />

Type: Runtime

The `'gc'`, `'http2'`, and `'http'` [`PerformanceEntry`](/api/perf_hooks#performanceentry) object types have
additional properties assigned to them that provide additional information.
These properties are now available within the standard `detail` property
of the `PerformanceEntry` object. The existing accessors have been
deprecated and should no longer be used.

#### DEP0153: `dns.lookup` and `dnsPromises.lookup` options type coercion

<Metadata version="v18.9.0" data={{"changes":[{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/41431","description":"End-of-Life."},{"version":"v17.0.0","pr-url":"https://github.com/nodejs/node/pull/39793","description":"Runtime deprecation."},{"version":"v16.8.0","pr-url":"https://github.com/nodejs/node/pull/38906","description":"Documentation-only deprecation."}]}} />

Type: End-of-Life

Using a non-nullish non-integer value for `family` option, a non-nullish
non-number value for `hints` option, a non-nullish non-boolean value for `all`
option, or a non-nullish non-boolean value for `verbatim` option in
[`dns.lookup()`][] and [`dnsPromises.lookup()`][] throws an
`ERR_INVALID_ARG_TYPE` error.

#### DEP0154: RSA-PSS generate key pair options

<Metadata version="v18.9.0" data={{"changes":[{"version":"v16.10.0","pr-url":"https://github.com/nodejs/node/pull/39927","description":"Documentation-only deprecation."}]}} />

Type: Documentation-only (supports [`--pending-deprecation`][])

The `'hash'` and `'mgf1Hash'` options are replaced with `'hashAlgorithm'`
and `'mgf1HashAlgorithm'`.

#### DEP0155: Trailing slashes in pattern specifier resolutions

<Metadata version="v18.9.0" data={{"changes":[{"version":"v17.0.0","pr-url":"https://github.com/nodejs/node/pull/40117","description":"Runtime deprecation."},{"version":"v16.10.0","pr-url":"https://github.com/nodejs/node/pull/40039","description":"Documentation-only deprecation with `--pending-deprecation` support."}]}} />

Type: Runtime

The remapping of specifiers ending in `"/"` like `import 'pkg/x/'` is deprecated
for package `"exports"` and `"imports"` pattern resolutions.

#### DEP0156: `.aborted` property and `'abort'`, `'aborted'` event in `http`

<Metadata version="v18.9.0" data={{"changes":[{"version":["v17.0.0","v16.12.0"],"pr-url":"https://github.com/nodejs/node/pull/36670","description":"Documentation-only deprecation."}]}} />

Type: Documentation-only

Move to [`Stream`](/api/stream#stream) API instead, as the [`http.ClientRequest`][],
[`http.ServerResponse`][], and [`http.IncomingMessage`][] are all stream-based.
Check `stream.destroyed` instead of the `.aborted` property, and listen for
`'close'` instead of `'abort'`, `'aborted'` event.

The `.aborted` property and `'abort'` event are only useful for detecting
`.abort()` calls. For closing a request early, use the Stream
`.destroy([error])` then check the `.destroyed` property and `'close'` event
should have the same effect. The receiving end should also check the
[`readable.readableEnded`][] value on [`http.IncomingMessage`][] to get whether
it was an aborted or graceful destroy.

#### DEP0157: Thenable support in streams

<Metadata version="v18.9.0" data={{"changes":[{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/40773","description":"End-of-life."},{"version":["v17.2.0","v16.14.0"],"pr-url":"https://github.com/nodejs/node/pull/40860","description":"Documentation-only deprecation."}]}} />

Type: End-of-Life

An undocumented feature of Node.js streams was to support thenables in
implementation methods. This is now deprecated, use callbacks instead and avoid
use of async function for streams implementation methods.

This feature caused users to encounter unexpected problems where the user
implements the function in callback style but uses e.g. an async method which
would cause an error since mixing promise and callback semantics is not valid.

```js
const w = new Writable({
  async final(callback) {
    await someOp();
    callback();
  }
});
```

#### DEP0158: `buffer.slice(start, end)`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v17.5.0","pr-url":"https://github.com/nodejs/node/pull/41596","description":"Documentation-only deprecation."}]}} />

Type: Documentation-only

This method was deprecated because it is not compatible with
`Uint8Array.prototype.slice()`, which is a superclass of `Buffer`.

Use [`buffer.subarray`][] which does the same thing instead.

#### DEP0159: `ERR_INVALID_CALLBACK`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/41678","description":"End-of-Life."}]}} />

Type: End-of-Life

This error code was removed due to adding more confusion to
the errors used for value type validation.

#### DEP0160: `process.on('multipleResolves', handler)`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/41896","description":"Runtime deprecation."},{"version":"v17.6.0","pr-url":"https://github.com/nodejs/node/pull/41872","description":"Documentation-only deprecation."}]}} />

Type: Runtime.

This event was deprecated because it did not work with V8 promise combinators
which diminished its usefulness.

#### DEP0161: `process._getActiveRequests()` and `process._getActiveHandles()`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v17.6.0","pr-url":"https://github.com/nodejs/node/pull/41587","description":"Documentation-only deprecation."}]}} />

Type: Documentation-only

The `process._getActiveHandles()` and `process._getActiveRequests()`
functions are not intended for public use and can be removed in future
releases.

Use [`process.getActiveResourcesInfo()`][] to get a list of types of active
resources and not the actual references.

#### DEP0162: `fs.write()`, `fs.writeFileSync()` coercion to string

<Metadata version="v18.9.0" data={{"changes":[{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/42607","description":"Runtime deprecation."},{"version":"v17.8.0","pr-url":"https://github.com/nodejs/node/pull/42149","description":"Documentation-only deprecation."}]}} />

Type: Runtime

Implicit coercion of objects with own `toString` property, passed as second
parameter in [`fs.write()`][], [`fs.writeFile()`][], [`fs.appendFile()`][],
[`fs.writeFileSync()`][], and [`fs.appendFileSync()`][] is deprecated.
Convert them to primitive strings.

#### DEP0163: `channel.subscribe(onMessage)`, `channel.unsubscribe(onMessage)`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v18.7.0","pr-url":"https://github.com/nodejs/node/pull/42714","description":"Documentation-only deprecation."}]}} />

Type: Documentation-only

These methods were deprecated because they can be used in a way which does not
hold the channel reference alive long enough to receive the events.

Use [`diagnostics_channel.subscribe(name, onMessage)`][] or
[`diagnostics_channel.unsubscribe(name, onMessage)`][] which does the same
thing instead.

#### DEP0164: `process.exit([code])` coercion to integer

<Metadata version="v18.9.0" data={{"changes":[{"version":"v18.7.0","pr-url":"https://github.com/nodejs/node/pull/43738","description":"Documentation-only deprecation."}]}} />

Type: Documentation-only

`code` values other than `undefined`, `null`, integer numbers and integer
strings (e.g., '1') are deprecated as parameter in [`process.exit()`][].

#### DEP0165: `--trace-atomics-wait`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v18.8.0","pr-url":"https://github.com/nodejs/node/pull/44093","description":"Documentation-only deprecation."}]}} />

Type: Documentation-only

The [`--trace-atomics-wait`][] flag is deprecated.

[Legacy URL API]: (/api/url#legacy-url-api)
[NIST SP 800-38D]: https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-38d.pdf
[RFC 6066]: https://tools.ietf.org/html/rfc6066#section-3
[WHATWG URL API]: (/api/url#the-whatwg-url-api)
[`"exports"` or `"main"` entry]: (/api/packages#main-entry-point-export)
[`--pending-deprecation`]: (/api/cli#--pending-deprecation)
[`--throw-deprecation`]: (/api/cli#--throw-deprecation)
[`--trace-atomics-wait`]: (/api/cli#--trace-atomics-wait)
[`--unhandled-rejections`]: (/api/cli#--unhandled-rejectionsmode)
[`Buffer.allocUnsafeSlow(size)`]: (/api/buffer#static-method-bufferallocunsafeslowsize)
[`Buffer.from(array)`]: (/api/buffer#static-method-bufferfromarray)
[`Buffer.from(buffer)`]: (/api/buffer#static-method-bufferfrombuffer)
[`Buffer.isBuffer()`]: (/api/buffer#static-method-bufferisbufferobj)
[`Cipher`]: (/api/crypto#class-cipher)
[`Decipher`]: (/api/crypto#class-decipher)
[`REPLServer.clearBufferedCommand()`]: (/api/repl#replserverclearbufferedcommand)
[`ReadStream.open()`]: (/api/fs#class-fsreadstream)
[`Server.getConnections()`]: (/api/net#servergetconnectionscallback)
[`Server.listen({fd: <number>})`]: (/api/net#serverlistenhandle-backlog-callback)
[`SlowBuffer`]: (/api/buffer#class-slowbuffer)
[`WriteStream.open()`]: (/api/fs#class-fswritestream)
[`assert`]: (/api/assert)
[`asyncResource.runInAsyncScope()`]: async_context.md#asyncresourceruninasyncscopefn-thisarg-args
[`buffer.subarray`]: (/api/buffer#bufsubarraystart-end)
[`child_process`]: child_process.md
[`clearInterval()`]: (/api/timers#clearintervaltimeout)
[`clearTimeout()`]: (/api/timers#cleartimeouttimeout)
[`console.error()`]: (/api/console#consoleerrordata-args)
[`console.log()`]: (/api/console#consolelogdata-args)
[`crypto.Certificate()` constructor]: (/api/crypto#legacy-api)
[`crypto.DEFAULT_ENCODING`]: (/api/crypto#cryptodefault_encoding)
[`crypto.createCipher()`]: (/api/crypto#cryptocreatecipheralgorithm-password-options)
[`crypto.createCipheriv()`]: (/api/crypto#cryptocreatecipherivalgorithm-key-iv-options)
[`crypto.createDecipher()`]: (/api/crypto#cryptocreatedecipheralgorithm-password-options)
[`crypto.createDecipheriv()`]: (/api/crypto#cryptocreatedecipherivalgorithm-key-iv-options)
[`crypto.fips`]: (/api/crypto#cryptofips)
[`crypto.pbkdf2()`]: (/api/crypto#cryptopbkdf2password-salt-iterations-keylen-digest-callback)
[`crypto.randomBytes()`]: (/api/crypto#cryptorandombytessize-callback)
[`crypto.scrypt()`]: (/api/crypto#cryptoscryptpassword-salt-keylen-options-callback)
[`decipher.final()`]: (/api/crypto#decipherfinaloutputencoding)
[`decipher.setAuthTag()`]: (/api/crypto#deciphersetauthtagbuffer-encoding)
[`diagnostics_channel.subscribe(name, onMessage)`]: diagnostics_channel.md#diagnostics_channelsubscribename-onmessage
[`diagnostics_channel.unsubscribe(name, onMessage)`]: diagnostics_channel.md#diagnostics_channelunsubscribename-onmessage
[`dns.lookup()`]: (/api/dns#dnslookuphostname-options-callback)
[`dnsPromises.lookup()`]: (/api/dns#dnspromiseslookuphostname-options)
[`domain`]: (/api/domain)
[`ecdh.setPublicKey()`]: (/api/crypto#ecdhsetpublickeypublickey-encoding)
[`emitter.listenerCount(eventName)`]: (/api/events#emitterlistenercounteventname)
[`events.listenerCount(emitter, eventName)`]: (/api/events#eventslistenercountemitter-eventname)
[`fs.FileHandle`]: (/api/fs#class-filehandle)
[`fs.access()`]: (/api/fs#fsaccesspath-mode-callback)
[`fs.appendFile()`]: (/api/fs#fsappendfilepath-data-options-callback)
[`fs.appendFileSync()`]: (/api/fs#fsappendfilesyncpath-data-options)
[`fs.createReadStream()`]: (/api/fs#fscreatereadstreampath-options)
[`fs.createWriteStream()`]: (/api/fs#fscreatewritestreampath-options)
[`fs.exists(path, callback)`]: (/api/fs#fsexistspath-callback)
[`fs.lchmod(path, mode, callback)`]: (/api/fs#fslchmodpath-mode-callback)
[`fs.lchmodSync(path, mode)`]: (/api/fs#fslchmodsyncpath-mode)
[`fs.lchown(path, uid, gid, callback)`]: (/api/fs#fslchownpath-uid-gid-callback)
[`fs.lchownSync(path, uid, gid)`]: (/api/fs#fslchownsyncpath-uid-gid)
[`fs.read()`]: (/api/fs#fsreadfd-buffer-offset-length-position-callback)
[`fs.readSync()`]: (/api/fs#fsreadsyncfd-buffer-offset-length-position)
[`fs.stat()`]: (/api/fs#fsstatpath-options-callback)
[`fs.write()`]: (/api/fs#fswritefd-buffer-offset-length-position-callback)
[`fs.writeFile()`]: (/api/fs#fswritefilefile-data-options-callback)
[`fs.writeFileSync()`]: (/api/fs#fswritefilesyncfile-data-options)
[`http.ClientRequest`]: (/api/http#class-httpclientrequest)
[`http.IncomingMessage`]: (/api/http#class-httpincomingmessage)
[`http.ServerResponse`]: (/api/http#class-httpserverresponse)
[`http.get()`]: (/api/http#httpgetoptions-callback)
[`http.request()`]: (/api/http#httprequestoptions-callback)
[`https.get()`]: (/api/https#httpsgetoptions-callback)
[`https.request()`]: (/api/https#httpsrequestoptions-callback)
[`message.connection`]: (/api/http#messageconnection)
[`message.socket`]: (/api/http#messagesocket)
[`module.createRequire()`]: (/api/module#modulecreaterequirefilename)
[`os.networkInterfaces()`]: (/api/os#osnetworkinterfaces)
[`os.tmpdir()`]: (/api/os#ostmpdir)
[`process.env`]: (/api/process#processenv)
[`process.exit()`]: (/api/process#processexitcode)
[`process.getActiveResourcesInfo()`]: (/api/process#processgetactiveresourcesinfo)
[`process.mainModule`]: (/api/process#processmainmodule)
[`punycode`]: (/api/punycode)
[`readable.readableEnded`]: (/api/stream#readablereadableended)
[`request.abort()`]: (/api/http#requestabort)
[`request.connection`]: (/api/http#requestconnection)
[`request.destroy()`]: (/api/http#requestdestroyerror)
[`request.socket`]: (/api/http#requestsocket)
[`require.extensions`]: (/api/modules#requireextensions)
[`require.main`]: (/api/modules#accessing-the-main-module)
[`response.connection`]: (/api/http#responseconnection)
[`response.end()`]: (/api/http#responseenddata-encoding-callback)
[`response.finished`]: (/api/http#responsefinished)
[`response.socket`]: (/api/http#responsesocket)
[`response.writableEnded`]: (/api/http#responsewritableended)
[`response.writableFinished`]: (/api/http#responsewritablefinished)
[`script.createCachedData()`]: (/api/vm#scriptcreatecacheddata)
[`setInterval()`]: (/api/timers#setintervalcallback-delay-args)
[`setTimeout()`]: (/api/timers#settimeoutcallback-delay-args)
[`socket.bufferSize`]: (/api/net#socketbuffersize)
[`timeout.ref()`]: (/api/timers#timeoutref)
[`timeout.refresh()`]: (/api/timers#timeoutrefresh)
[`timeout.unref()`]: (/api/timers#timeoutunref)
[`tls.CryptoStream`]: (/api/tls#class-tlscryptostream)
[`tls.SecureContext`]: (/api/tls#tlscreatesecurecontextoptions)
[`tls.SecurePair`]: (/api/tls#class-tlssecurepair)
[`tls.TLSSocket`]: (/api/tls#class-tlstlssocket)
[`tls.checkServerIdentity()`]: (/api/tls#tlscheckserveridentityhostname-cert)
[`tls.createSecureContext()`]: (/api/tls#tlscreatesecurecontextoptions)
[`url.format()`]: (/api/url#urlformaturlobject)
[`url.parse()`]: (/api/url#urlparseurlstring-parsequerystring-slashesdenotehost)
[`url.resolve()`]: (/api/url#urlresolvefrom-to)
[`util._extend()`]: (/api/util#util_extendtarget-source)
[`util.getSystemErrorName()`]: (/api/util#utilgetsystemerrornameerr)
[`util.inspect()`]: (/api/util#utilinspectobject-options)
[`util.inspect.custom`]: (/api/util#utilinspectcustom)
[`util.isArray()`]: (/api/util#utilisarrayobject)
[`util.isBoolean()`]: (/api/util#utilisbooleanobject)
[`util.isBuffer()`]: (/api/util#utilisbufferobject)
[`util.isDate()`]: (/api/util#utilisdateobject)
[`util.isError()`]: (/api/util#utiliserrorobject)
[`util.isFunction()`]: (/api/util#utilisfunctionobject)
[`util.isNull()`]: (/api/util#utilisnullobject)
[`util.isNullOrUndefined()`]: (/api/util#utilisnullorundefinedobject)
[`util.isNumber()`]: (/api/util#utilisnumberobject)
[`util.isObject()`]: (/api/util#utilisobjectobject)
[`util.isPrimitive()`]: (/api/util#utilisprimitiveobject)
[`util.isRegExp()`]: (/api/util#utilisregexpobject)
[`util.isString()`]: (/api/util#utilisstringobject)
[`util.isSymbol()`]: (/api/util#utilissymbolobject)
[`util.isUndefined()`]: (/api/util#utilisundefinedobject)
[`util.log()`]: (/api/util#utillogstring)
[`util.types`]: (/api/util#utiltypes)
[`util`]: (/api/util)
[`worker.exitedAfterDisconnect`]: (/api/cluster#workerexitedafterdisconnect)
[`worker.terminate()`]: worker_threads.md#workerterminate
[`writable.writableLength`]: (/api/stream#writablewritablelength)
[`zlib.bytesWritten`]: (/api/zlib#zlibbyteswritten)
[alloc]: (/api/buffer#static-method-bufferallocsize-fill-encoding)
[alloc_unsafe_size]: (/api/buffer#static-method-bufferallocunsafesize)
[from_arraybuffer]: (/api/buffer#static-method-bufferfromarraybuffer-byteoffset-length)
[from_string_encoding]: (/api/buffer#static-method-bufferfromstring-encoding)
[legacy `urlObject`]: (/api/url#legacy-urlobject)
[static methods of `crypto.Certificate()`]: (/api/crypto#class-certificate)
[subpath exports]: (/api/packages#subpath-exports)
[subpath imports]: (/api/packages#subpath-imports)
[subpath patterns]: (/api/packages#subpath-patterns)
