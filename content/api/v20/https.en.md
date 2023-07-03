---
title: 'https'
displayTitle: 'HTTPS'
category: 'api'
version: 'v20'
---

<Metadata data={{"update":{"type":"introduced_in","version":["v0.10.0"]}}} />

<Stability stability={2}>

Stable

</Stability>

<Metadata version="v20.3.1" data={{"source_link":"lib/https.js"}} />

HTTPS is the HTTP protocol over TLS/SSL. In Node.js this is implemented as a
separate module.

### Determining if crypto support is unavailable

It is possible for Node.js to be built without including support for the
`node:crypto` module. In such cases, attempting to `import` from `https` or
calling `require('node:https')` will result in an error being thrown.

When using CommonJS, the error thrown can be caught using try/catch:

```cjs
let https;
try {
  https = require('node:https');
} catch (err) {
  console.error('https support is disabled!');
}
```

When using the lexical ESM `import` keyword, the error can only be
caught if a handler for `process.on('uncaughtException')` is registered
_before_ any attempt to load the module is made (using, for instance,
a preload module).

When using ESM, if there is a chance that the code may be run on a build
of Node.js where crypto support is not enabled, consider using the
[`import()`][] function instead of the lexical `import` keyword:

```mjs
let https;
try {
  https = await import('node:https');
} catch (err) {
  console.error('https support is disabled!');
}
```

### <DataTag tag="C" /> `https.Agent`

<Metadata data={{"changes":[{"version":"v5.3.0","pr-url":"https://github.com/nodejs/node/pull/4252","description":"support `0` `maxCachedSessions` to disable TLS session caching."},{"version":"v2.5.0","pr-url":"https://github.com/nodejs/node/pull/2228","description":"parameter `maxCachedSessions` added to `options` for TLS sessions reuse."}],"update":{"type":"added","version":["v0.4.5"]}}} />

An [`Agent`][] object for HTTPS similar to [`http.Agent`][]. See
[`https.request()`][] for more information.

#### <DataTag tag="M" /> `new Agent([options])`

<Metadata data={{"changes":[{"version":"v12.5.0","pr-url":"https://github.com/nodejs/node/pull/28209","description":"do not automatically set servername if the target host was specified using an IP address."}]}} />

* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) Set of configurable options to set on the agent.
  Can have the same fields as for [`http.Agent(options)`][], and
  * `maxCachedSessions` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) maximum number of TLS cached sessions.
    Use `0` to disable TLS session caching. **Default:** `100`.
  * `servername` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) the value of
    [Server Name Indication extension][sni wiki] to be sent to the server. Use
    empty string `''` to disable sending the extension.
    **Default:** host name of the target server, unless the target server
    is specified using an IP address, in which case the default is `''` (no
    extension).

    See [`Session Resumption`][] for information about TLS session reuse.

##### <DataTag tag="E" /> `'keylog'`

<Metadata data={{"update":{"type":"added","version":["v13.2.0","v12.16.0"]}}} />

* `line` [`Buffer`](/api/v20/buffer#buffer) Line of ASCII text, in NSS `SSLKEYLOGFILE` format.
* `tlsSocket` [`tls.TLSSocket`](/api/v20/tls#tlstlssocket) The `tls.TLSSocket` instance on which it was
  generated.

The `keylog` event is emitted when key material is generated or received by a
connection managed by this agent (typically before handshake has completed, but
not necessarily). This keying material can be stored for debugging, as it
allows captured TLS traffic to be decrypted. It may be emitted multiple times
for each socket.

A typical use case is to append received lines to a common text file, which is
later used by software (such as Wireshark) to decrypt the traffic:

```js
// ...
https.globalAgent.on('keylog', (line, tlsSocket) => {
  fs.appendFileSync('/tmp/ssl-keys.log', line, { mode: 0o600 });
});
```

### <DataTag tag="C" /> `https.Server`

<Metadata data={{"update":{"type":"added","version":["v0.3.4"]}}} />

* Extends: [`tls.Server`](/api/v20/tls#tlsserver)

See [`http.Server`][] for more information.

#### <DataTag tag="M" /> `server.close([callback])`

<Metadata data={{"update":{"type":"added","version":["v0.1.90"]}}} />

* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
* Returns: [`https.Server`](/api/v20/https#httpsserver)

See [`server.close()`][] in the `node:http` module.

#### <DataTag tag="M" /> `server.closeAllConnections()`

<Metadata data={{"update":{"type":"added","version":["v18.2.0"]}}} />

See [`server.closeAllConnections()`][] in the `node:http` module.

#### <DataTag tag="M" /> `server.closeIdleConnections()`

<Metadata data={{"update":{"type":"added","version":["v18.2.0"]}}} />

See [`server.closeIdleConnections()`][] in the `node:http` module.

#### <DataTag tag="M" /> `server.headersTimeout`

<Metadata data={{"update":{"type":"added","version":["v11.3.0"]}}} />

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `60000`

See [`server.headersTimeout`][] in the `node:http` module.

#### <DataTag tag="M" /> `server.listen()`

Starts the HTTPS server listening for encrypted connections.
This method is identical to [`server.listen()`][] from [`net.Server`][].

#### <DataTag tag="M" /> `server.maxHeadersCount`

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `2000`

See [`server.maxHeadersCount`][] in the `node:http` module.

#### <DataTag tag="M" /> `server.requestTimeout`

<Metadata data={{"changes":[{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/41263","description":"The default request timeout changed from no timeout to 300s (5 minutes)."}],"update":{"type":"added","version":["v14.11.0"]}}} />

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `300000`

See [`server.requestTimeout`][] in the `node:http` module.

#### <DataTag tag="M" /> `server.setTimeout([msecs][, callback])`

<Metadata data={{"update":{"type":"added","version":["v0.11.2"]}}} />

* `msecs` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `120000` (2 minutes)
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
* Returns: [`https.Server`](/api/v20/https#httpsserver)

See [`server.setTimeout()`][] in the `node:http` module.

#### <DataTag tag="M" /> `server.timeout`

<Metadata data={{"changes":[{"version":"v13.0.0","pr-url":"https://github.com/nodejs/node/pull/27558","description":"The default timeout changed from 120s to 0 (no timeout)."}],"update":{"type":"added","version":["v0.11.2"]}}} />

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** 0 (no timeout)

See [`server.timeout`][] in the `node:http` module.

#### <DataTag tag="M" /> `server.keepAliveTimeout`

<Metadata data={{"update":{"type":"added","version":["v8.0.0"]}}} />

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `5000` (5 seconds)

See [`server.keepAliveTimeout`][] in the `node:http` module.

### <DataTag tag="M" /> `https.createServer([options][, requestListener])`

<Metadata data={{"update":{"type":"added","version":["v0.3.4"]}}} />

* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) Accepts `options` from [`tls.createServer()`][],
  [`tls.createSecureContext()`][] and [`http.createServer()`][].
* `requestListener` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) A listener to be added to the `'request'` event.
* Returns: [`https.Server`](/api/v20/https#httpsserver)

```js
// curl -k https://localhost:8000/
const https = require('node:https');
const fs = require('node:fs');

const options = {
  key: fs.readFileSync('test/fixtures/keys/agent2-key.pem'),
  cert: fs.readFileSync('test/fixtures/keys/agent2-cert.pem'),
};

https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end('hello world\n');
}).listen(8000);
```

Or

```js
const https = require('node:https');
const fs = require('node:fs');

const options = {
  pfx: fs.readFileSync('test/fixtures/test_cert.pfx'),
  passphrase: 'sample',
};

https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end('hello world\n');
}).listen(8000);
```

### <DataTag tag="M" /> `https.get(options[, callback])`

### <DataTag tag="M" /> `https.get(url[, options][, callback])`

<Metadata data={{"changes":[{"version":"v10.9.0","pr-url":"https://github.com/nodejs/node/pull/21616","description":"The `url` parameter can now be passed along with a separate `options` object."},{"version":"v7.5.0","pr-url":"https://github.com/nodejs/node/pull/10638","description":"The `options` parameter can be a WHATWG `URL` object."}],"update":{"type":"added","version":["v0.3.6"]}}} />

* `url` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`URL`](/api/v20/url#the-whatwg-url-api)
* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`URL`](/api/v20/url#the-whatwg-url-api) Accepts the same `options` as
  [`https.request()`][], with the `method` always set to `GET`.
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)

Like [`http.get()`][] but for HTTPS.

`options` can be an object, a string, or a [`URL`][] object. If `options` is a
string, it is automatically parsed with [`new URL()`][]. If it is a [`URL`][]
object, it will be automatically converted to an ordinary `options` object.

```js
const https = require('node:https');

https.get('https://encrypted.google.com/', (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);

  res.on('data', (d) => {
    process.stdout.write(d);
  });

}).on('error', (e) => {
  console.error(e);
});
```

### <DataTag tag="M" /> `https.globalAgent`

<Metadata data={{"changes":[{"version":["v19.0.0"],"pr-url":"https://github.com/nodejs/node/pull/43522","description":"The agent now uses HTTP Keep-Alive by default."}],"update":{"type":"added","version":["v0.5.9"]}}} />

Global instance of [`https.Agent`][] for all HTTPS client requests.

### <DataTag tag="M" /> `https.request(options[, callback])`

### <DataTag tag="M" /> `https.request(url[, options][, callback])`

<Metadata data={{"changes":[{"version":["v16.7.0","v14.18.0"],"pr-url":"https://github.com/nodejs/node/pull/39310","description":"When using a `URL` object parsed username and password will now be properly URI decoded."},{"version":["v14.1.0","v13.14.0"],"pr-url":"https://github.com/nodejs/node/pull/32786","description":"The `highWaterMark` option is accepted now."},{"version":"v10.9.0","pr-url":"https://github.com/nodejs/node/pull/21616","description":"The `url` parameter can now be passed along with a separate `options` object."},{"version":"v9.3.0","pr-url":"https://github.com/nodejs/node/pull/14903","description":"The `options` parameter can now include `clientCertEngine`."},{"version":"v7.5.0","pr-url":"https://github.com/nodejs/node/pull/10638","description":"The `options` parameter can be a WHATWG `URL` object."}],"update":{"type":"added","version":["v0.3.6"]}}} />

* `url` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`URL`](/api/v20/url#the-whatwg-url-api)
* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`URL`](/api/v20/url#the-whatwg-url-api) Accepts all `options` from
  [`http.request()`][], with some differences in default values:
  * `protocol` **Default:** `'https:'`
  * `port` **Default:** `443`
  * `agent` **Default:** `https.globalAgent`
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
* Returns: [`http.ClientRequest`](/api/v20/http#httpclientrequest)

Makes a request to a secure web server.

The following additional `options` from [`tls.connect()`][] are also accepted:
`ca`, `cert`, `ciphers`, `clientCertEngine`, `crl`, `dhparam`, `ecdhCurve`,
`honorCipherOrder`, `key`, `passphrase`, `pfx`, `rejectUnauthorized`,
`secureOptions`, `secureProtocol`, `servername`, `sessionIdContext`,
`highWaterMark`.

`options` can be an object, a string, or a [`URL`][] object. If `options` is a
string, it is automatically parsed with [`new URL()`][]. If it is a [`URL`][]
object, it will be automatically converted to an ordinary `options` object.

`https.request()` returns an instance of the [`http.ClientRequest`][]
class. The `ClientRequest` instance is a writable stream. If one needs to
upload a file with a POST request, then write to the `ClientRequest` object.

```js
const https = require('node:https');

const options = {
  hostname: 'encrypted.google.com',
  port: 443,
  path: '/',
  method: 'GET',
};

const req = https.request(options, (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);

  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (e) => {
  console.error(e);
});
req.end();
```

Example using options from [`tls.connect()`][]:

```js
const options = {
  hostname: 'encrypted.google.com',
  port: 443,
  path: '/',
  method: 'GET',
  key: fs.readFileSync('test/fixtures/keys/agent2-key.pem'),
  cert: fs.readFileSync('test/fixtures/keys/agent2-cert.pem'),
};
options.agent = new https.Agent(options);

const req = https.request(options, (res) => {
  // ...
});
```

Alternatively, opt out of connection pooling by not using an [`Agent`][].

```js
const options = {
  hostname: 'encrypted.google.com',
  port: 443,
  path: '/',
  method: 'GET',
  key: fs.readFileSync('test/fixtures/keys/agent2-key.pem'),
  cert: fs.readFileSync('test/fixtures/keys/agent2-cert.pem'),
  agent: false,
};

const req = https.request(options, (res) => {
  // ...
});
```

Example using a [`URL`][] as `options`:

```js
const options = new URL('https://abc:xyz@example.com');

const req = https.request(options, (res) => {
  // ...
});
```

Example pinning on certificate fingerprint, or the public key (similar to
`pin-sha256`):

```js
const tls = require('node:tls');
const https = require('node:https');
const crypto = require('node:crypto');

function sha256(s) {
  return crypto.createHash('sha256').update(s).digest('base64');
}
const options = {
  hostname: 'github.com',
  port: 443,
  path: '/',
  method: 'GET',
  checkServerIdentity: function(host, cert) {
    // Make sure the certificate is issued to the host we are connected to
    const err = tls.checkServerIdentity(host, cert);
    if (err) {
      return err;
    }

    // Pin the public key, similar to HPKP pin-sha256 pinning
    const pubkey256 = 'pL1+qb9HTMRZJmuC/bB/ZI9d302BYrrqiVuRyW+DGrU=';
    if (sha256(cert.pubkey) !== pubkey256) {
      const msg = 'Certificate verification error: ' +
        `The public key of '${cert.subject.CN}' ` +
        'does not match our pinned fingerprint';
      return new Error(msg);
    }

    // Pin the exact certificate, rather than the pub key
    const cert256 = '25:FE:39:32:D9:63:8C:8A:FC:A1:9A:29:87:' +
      'D8:3E:4C:1D:98:DB:71:E4:1A:48:03:98:EA:22:6A:BD:8B:93:16';
    if (cert.fingerprint256 !== cert256) {
      const msg = 'Certificate verification error: ' +
        `The certificate of '${cert.subject.CN}' ` +
        'does not match our pinned fingerprint';
      return new Error(msg);
    }

    // This loop is informational only.
    // Print the certificate and public key fingerprints of all certs in the
    // chain. Its common to pin the public key of the issuer on the public
    // internet, while pinning the public key of the service in sensitive
    // environments.
    do {
      console.log('Subject Common Name:', cert.subject.CN);
      console.log('  Certificate SHA256 fingerprint:', cert.fingerprint256);

      hash = crypto.createHash('sha256');
      console.log('  Public key ping-sha256:', sha256(cert.pubkey));

      lastprint256 = cert.fingerprint256;
      cert = cert.issuerCertificate;
    } while (cert.fingerprint256 !== lastprint256);

  },
};

options.agent = new https.Agent(options);
const req = https.request(options, (res) => {
  console.log('All OK. Server matched our pinned cert or public key');
  console.log('statusCode:', res.statusCode);
  // Print the HPKP values
  console.log('headers:', res.headers['public-key-pins']);

  res.on('data', (d) => {});
});

req.on('error', (e) => {
  console.error(e.message);
});
req.end();
```

Outputs for example:

```text
Subject Common Name: github.com
  Certificate SHA256 fingerprint: 25:FE:39:32:D9:63:8C:8A:FC:A1:9A:29:87:D8:3E:4C:1D:98:DB:71:E4:1A:48:03:98:EA:22:6A:BD:8B:93:16
  Public key ping-sha256: pL1+qb9HTMRZJmuC/bB/ZI9d302BYrrqiVuRyW+DGrU=
Subject Common Name: DigiCert SHA2 Extended Validation Server CA
  Certificate SHA256 fingerprint: 40:3E:06:2A:26:53:05:91:13:28:5B:AF:80:A0:D4:AE:42:2C:84:8C:9F:78:FA:D0:1F:C9:4B:C5:B8:7F:EF:1A
  Public key ping-sha256: RRM1dGqnDFsCJXBTHky16vi1obOlCgFFn/yOhI/y+ho=
Subject Common Name: DigiCert High Assurance EV Root CA
  Certificate SHA256 fingerprint: 74:31:E5:F4:C3:C1:CE:46:90:77:4F:0B:61:E0:54:40:88:3B:A9:A0:1E:D0:0B:A6:AB:D7:80:6E:D3:B1:18:CF
  Public key ping-sha256: WoiWRyIOVNa9ihaBciRSC7XHjliYS9VwUGOIud4PB18=
All OK. Server matched our pinned cert or public key
statusCode: 200
headers: max-age=0; pin-sha256="WoiWRyIOVNa9ihaBciRSC7XHjliYS9VwUGOIud4PB18="; pin-sha256="RRM1dGqnDFsCJXBTHky16vi1obOlCgFFn/yOhI/y+ho="; pin-sha256="k2v657xBsOVe1PQRwOsHsw3bsGT2VzIqz5K+59sNQws="; pin-sha256="K87oWBWM9UZfyddvDfoxL+8lpNyoUB2ptGtn0fv6G2Q="; pin-sha256="IQBnNBEiFuhj+8x6X8XLgh01V9Ic5/V3IRQLNFFc7v4="; pin-sha256="iie1VXtL7HzAMF+/PVPR9xzT80kQxdZeJ+zduCB3uj0="; pin-sha256="LvRiGEjRqfzurezaWuj8Wie2gyHMrW5Q06LspMnox7A="; includeSubDomains
```

[`Agent`]: #class-httpsagent
[`Session Resumption`]: /api/v20/tls#session-resumption
[`URL`]: /api/v20/url#the-whatwg-url-api
[`http.Agent(options)`]: /api/v20/http#new-agentoptions
[`http.Agent`]: /api/v20/http#class-httpagent
[`http.ClientRequest`]: /api/v20/http#class-httpclientrequest
[`http.Server`]: /api/v20/http#class-httpserver
[`http.createServer()`]: /api/v20/http#httpcreateserveroptions-requestlistener
[`http.get()`]: /api/v20/http#httpgetoptions-callback
[`http.request()`]: /api/v20/http#httprequestoptions-callback
[`https.Agent`]: #class-httpsagent
[`https.request()`]: #httpsrequestoptions-callback
[`import()`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import
[`net.Server`]: /api/v20/net#class-netserver
[`new URL()`]: /api/v20/url#new-urlinput-base
[`server.close()`]: /api/v20/http#serverclosecallback
[`server.closeAllConnections()`]: /api/v20/http#servercloseallconnections
[`server.closeIdleConnections()`]: /api/v20/http#servercloseidleconnections
[`server.headersTimeout`]: /api/v20/http#serverheaderstimeout
[`server.keepAliveTimeout`]: /api/v20/http#serverkeepalivetimeout
[`server.listen()`]: /api/v20/net#serverlisten
[`server.maxHeadersCount`]: /api/v20/http#servermaxheaderscount
[`server.requestTimeout`]: /api/v20/http#serverrequesttimeout
[`server.setTimeout()`]: /api/v20/http#serversettimeoutmsecs-callback
[`server.timeout`]: /api/v20/http#servertimeout
[`tls.connect()`]: /api/v20/tls#tlsconnectoptions-callback
[`tls.createSecureContext()`]: /api/v20/tls#tlscreatesecurecontextoptions
[`tls.createServer()`]: /api/v20/tls#tlscreateserveroptions-secureconnectionlistener
[sni wiki]: https://en.wikipedia.org/wiki/Server_Name_Indication
