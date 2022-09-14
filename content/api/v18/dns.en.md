---
title: 'dns'
displayTitle: 'DNS'
category: 'api'
version: 'v18'
---

<Metadata version="v18.9.0" data={{"update":{"type":"introduced_in","version":["v0.10.0"]}}} />

<Metadata version="v18.9.0" data={{"stability":{"level":2,"text":" - Stable"}}} />

<Metadata version="v18.9.0" data={{"source_link":"lib/dns.js"}} />

The `node:dns` module enables name resolution. For example, use it to look up IP
addresses of host names.

Although named for the [Domain Name System (DNS)][], it does not always use the
DNS protocol for lookups. [`dns.lookup()`][] uses the operating system
facilities to perform name resolution. It may not need to perform any network
communication. To perform name resolution the way other applications on the same
system do, use [`dns.lookup()`][].

```js
const dns = require('node:dns');

dns.lookup('example.org', (err, address, family) => {
  console.log('address: %j family: IPv%s', address, family);
});
// address: "93.184.216.34" family: IPv4
```

All other functions in the `node:dns` module connect to an actual DNS server to
perform name resolution. They will always use the network to perform DNS
queries. These functions do not use the same set of configuration files used by
[`dns.lookup()`][] (e.g. `/etc/hosts`). Use these functions to always perform
DNS queries, bypassing other name-resolution facilities.

```js
const dns = require('node:dns');

dns.resolve4('archive.org', (err, addresses) => {
  if (err) throw err;

  console.log(`addresses: ${JSON.stringify(addresses)}`);

  addresses.forEach((a) => {
    dns.reverse(a, (err, hostnames) => {
      if (err) {
        throw err;
      }
      console.log(`reverse for ${a}: ${JSON.stringify(hostnames)}`);
    });
  });
});
```

See the [Implementation considerations section][] for more information.

### <DataTag tag="C" /> `dns.Resolver`

<Metadata version="v18.9.0" data={{"update":{"type":"added","version":["v8.3.0"]}}} />

An independent resolver for DNS requests.

Creating a new resolver uses the default server settings. Setting
the servers used for a resolver using
[`resolver.setServers()`][`dns.setServers()`] does not affect
other resolvers:

```js
const { Resolver } = require('node:dns');
const resolver = new Resolver();
resolver.setServers(['4.4.4.4']);

// This request will use the server at 4.4.4.4, independent of global settings.
resolver.resolve4('example.org', (err, addresses) => {
  // ...
});
```

The following methods from the `node:dns` module are available:

* [`resolver.getServers()`][`dns.getServers()`]
* [`resolver.resolve()`][`dns.resolve()`]
* [`resolver.resolve4()`][`dns.resolve4()`]
* [`resolver.resolve6()`][`dns.resolve6()`]
* [`resolver.resolveAny()`][`dns.resolveAny()`]
* [`resolver.resolveCaa()`][`dns.resolveCaa()`]
* [`resolver.resolveCname()`][`dns.resolveCname()`]
* [`resolver.resolveMx()`][`dns.resolveMx()`]
* [`resolver.resolveNaptr()`][`dns.resolveNaptr()`]
* [`resolver.resolveNs()`][`dns.resolveNs()`]
* [`resolver.resolvePtr()`][`dns.resolvePtr()`]
* [`resolver.resolveSoa()`][`dns.resolveSoa()`]
* [`resolver.resolveSrv()`][`dns.resolveSrv()`]
* [`resolver.resolveTxt()`][`dns.resolveTxt()`]
* [`resolver.reverse()`][`dns.reverse()`]
* [`resolver.setServers()`][`dns.setServers()`]

#### <DataTag tag="M" /> `Resolver([options])`

<Metadata version="v18.9.0" data={{"changes":[{"version":["v16.7.0","v14.18.0"],"pr-url":"https://github.com/nodejs/node/pull/39610","description":"The `options` object now accepts a `tries` option."},{"version":"v12.18.3","pr-url":"https://github.com/nodejs/node/pull/33472","description":"The constructor now accepts an `options` object. The single supported option is `timeout`."}],"update":{"type":"added","version":["v8.3.0"]}}} />

Create a new resolver.

* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `timeout` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) Query timeout in milliseconds, or `-1` to use the
    default timeout.
  * `tries` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The number of tries the resolver will try contacting
    each name server before giving up. **Default:** `4`

#### <DataTag tag="M" /> `resolver.cancel()`

<Metadata version="v18.9.0" data={{"update":{"type":"added","version":["v8.3.0"]}}} />

Cancel all outstanding DNS queries made by this resolver. The corresponding
callbacks will be called with an error with code `ECANCELLED`.

#### <DataTag tag="M" /> `resolver.setLocalAddress([ipv4][, ipv6])`

<Metadata version="v18.9.0" data={{"update":{"type":"added","version":["v15.1.0","v14.17.0"]}}} />

* `ipv4` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) A string representation of an IPv4 address.
  **Default:** `'0.0.0.0'`
* `ipv6` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) A string representation of an IPv6 address.
  **Default:** `'::0'`

The resolver instance will send its requests from the specified IP address.
This allows programs to specify outbound interfaces when used on multi-homed
systems.

If a v4 or v6 address is not specified, it is set to the default and the
operating system will choose a local address automatically.

The resolver will use the v4 local address when making requests to IPv4 DNS
servers, and the v6 local address when making requests to IPv6 DNS servers.
The `rrtype` of resolution requests has no impact on the local address used.

### <DataTag tag="M" /> `dns.getServers()`

<Metadata version="v18.9.0" data={{"update":{"type":"added","version":["v0.11.3"]}}} />

* Returns: string\[]

Returns an array of IP address strings, formatted according to [RFC 5952][],
that are currently configured for DNS resolution. A string will include a port
section if a custom port is used.



```js
[
  '4.4.4.4',
  '2001:4860:4860::8888',
  '4.4.4.4:1053',
  '[2001:4860:4860::8888]:1053',
]
```

### <DataTag tag="M" /> `dns.lookup(hostname[, options], callback)`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v18.4.0","pr-url":"https://github.com/nodejs/node/pull/43054","description":"For compatibility with `node:net`, when passing an option object the `family` option can be the string `'IPv4'` or the string `'IPv6'`."},{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/41678","description":"Passing an invalid callback to the `callback` argument now throws `ERR_INVALID_ARG_TYPE` instead of `ERR_INVALID_CALLBACK`."},{"version":"v17.0.0","pr-url":"https://github.com/nodejs/node/pull/39987","description":"The `verbatim` options defaults to `true` now."},{"version":"v8.5.0","pr-url":"https://github.com/nodejs/node/pull/14731","description":"The `verbatim` option is supported now."},{"version":"v1.2.0","pr-url":"https://github.com/nodejs/node/pull/744","description":"The `all` option is supported now."}],"update":{"type":"added","version":["v0.1.90"]}}} />

* `hostname` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
* `options` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `family` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) The record family. Must be `4`, `6`, or `0`. For
    backward compatibility reasons,`'IPv4'` and `'IPv6'` are interpreted as `4`
    and `6` respectively. The value `0` indicates that IPv4 and IPv6 addresses
    are both returned. **Default:** `0`.
  * `hints` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) One or more [supported `getaddrinfo` flags][]. Multiple
    flags may be passed by bitwise `OR`ing their values.
  * `all` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) When `true`, the callback returns all resolved addresses in
    an array. Otherwise, returns a single address. **Default:** `false`.
  * `verbatim` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) When `true`, the callback receives IPv4 and IPv6
    addresses in the order the DNS resolver returned them. When `false`,
    IPv4 addresses are placed before IPv6 addresses.
    **Default:** `true` (addresses are not reordered). Default value is
    configurable using [`dns.setDefaultResultOrder()`][] or
    [`--dns-result-order`][].
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `err` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
  * `address` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) A string representation of an IPv4 or IPv6 address.
  * `family` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) `4` or `6`, denoting the family of `address`, or `0` if
    the address is not an IPv4 or IPv6 address. `0` is a likely indicator of a
    bug in the name resolution service used by the operating system.

Resolves a host name (e.g. `'nodejs.org'`) into the first found A (IPv4) or
AAAA (IPv6) record. All `option` properties are optional. If `options` is an
integer, then it must be `4` or `6` – if `options` is `0` or not provided, then
IPv4 and IPv6 addresses are both returned if found.

With the `all` option set to `true`, the arguments for `callback` change to
`(err, addresses)`, with `addresses` being an array of objects with the
properties `address` and `family`.

On error, `err` is an [`Error`][] object, where `err.code` is the error code.
Keep in mind that `err.code` will be set to `'ENOTFOUND'` not only when
the host name does not exist but also when the lookup fails in other ways
such as no available file descriptors.

`dns.lookup()` does not necessarily have anything to do with the DNS protocol.
The implementation uses an operating system facility that can associate names
with addresses and vice versa. This implementation can have subtle but
important consequences on the behavior of any Node.js program. Please take some
time to consult the [Implementation considerations section][] before using
`dns.lookup()`.

Example usage:

```js
const dns = require('node:dns');
const options = {
  family: 6,
  hints: dns.ADDRCONFIG | dns.V4MAPPED,
};
dns.lookup('example.com', options, (err, address, family) =>
  console.log('address: %j family: IPv%s', address, family));
// address: "2606:2800:220:1:248:1893:25c8:1946" family: IPv6

// When options.all is true, the result will be an Array.
options.all = true;
dns.lookup('example.com', options, (err, addresses) =>
  console.log('addresses: %j', addresses));
// addresses: [{"address":"2606:2800:220:1:248:1893:25c8:1946","family":6}]
```

If this method is invoked as its [`util.promisify()`][]ed version, and `all`
is not set to `true`, it returns a `Promise` for an `Object` with `address` and
`family` properties.

#### Supported getaddrinfo flags

<Metadata version="v18.9.0" data={{"changes":[{"version":["v13.13.0","v12.17.0"],"pr-url":"https://github.com/nodejs/node/pull/32183","description":"Added support for the `dns.ALL` flag."}]}} />

The following flags can be passed as hints to [`dns.lookup()`][].

* `dns.ADDRCONFIG`: Limits returned address types to the types of non-loopback
  addresses configured on the system. For example, IPv4 addresses are only
  returned if the current system has at least one IPv4 address configured.
* `dns.V4MAPPED`: If the IPv6 family was specified, but no IPv6 addresses were
  found, then return IPv4 mapped IPv6 addresses. It is not supported
  on some operating systems (e.g. FreeBSD 10.1).
* `dns.ALL`: If `dns.V4MAPPED` is specified, return resolved IPv6 addresses as
  well as IPv4 mapped IPv6 addresses.

### <DataTag tag="M" /> `dns.lookupService(address, port, callback)`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/41678","description":"Passing an invalid callback to the `callback` argument now throws `ERR_INVALID_ARG_TYPE` instead of `ERR_INVALID_CALLBACK`."}],"update":{"type":"added","version":["v0.11.14"]}}} />

* `address` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
* `port` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `err` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
  * `hostname` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) e.g. `example.com`
  * `service` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) e.g. `http`

Resolves the given `address` and `port` into a host name and service using
the operating system's underlying `getnameinfo` implementation.

If `address` is not a valid IP address, a `TypeError` will be thrown.
The `port` will be coerced to a number. If it is not a legal port, a `TypeError`
will be thrown.

On an error, `err` is an [`Error`][] object, where `err.code` is the error code.

```js
const dns = require('node:dns');
dns.lookupService('127.0.0.1', 22, (err, hostname, service) => {
  console.log(hostname, service);
  // Prints: localhost ssh
});
```

If this method is invoked as its [`util.promisify()`][]ed version, it returns a
`Promise` for an `Object` with `hostname` and `service` properties.

### <DataTag tag="M" /> `dns.resolve(hostname[, rrtype], callback)`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/41678","description":"Passing an invalid callback to the `callback` argument now throws `ERR_INVALID_ARG_TYPE` instead of `ERR_INVALID_CALLBACK`."}],"update":{"type":"added","version":["v0.1.27"]}}} />

* `hostname` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Host name to resolve.
* `rrtype` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Resource record type. **Default:** `'A'`.
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `err` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
  * `records` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

Uses the DNS protocol to resolve a host name (e.g. `'nodejs.org'`) into an array
of the resource records. The `callback` function has arguments
`(err, records)`. When successful, `records` will be an array of resource
records. The type and structure of individual results varies based on `rrtype`:

| `rrtype`  | `records` contains             | Result type | Shorthand method         |
| --------- | ------------------------------ | ----------- | ------------------------ |
| `'A'`     | IPv4 addresses (default)       | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)    | [`dns.resolve4()`][]     |
| `'AAAA'`  | IPv6 addresses                 | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)    | [`dns.resolve6()`][]     |
| `'ANY'`   | any records                    | [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)    | [`dns.resolveAny()`][]   |
| `'CAA'`   | CA authorization records       | [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)    | [`dns.resolveCaa()`][]   |
| `'CNAME'` | canonical name records         | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)    | [`dns.resolveCname()`][] |
| `'MX'`    | mail exchange records          | [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)    | [`dns.resolveMx()`][]    |
| `'NAPTR'` | name authority pointer records | [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)    | [`dns.resolveNaptr()`][] |
| `'NS'`    | name server records            | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)    | [`dns.resolveNs()`][]    |
| `'PTR'`   | pointer records                | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)    | [`dns.resolvePtr()`][]   |
| `'SOA'`   | start of authority records     | [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)    | [`dns.resolveSoa()`][]   |
| `'SRV'`   | service records                | [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)    | [`dns.resolveSrv()`][]   |
| `'TXT'`   | text records                   | string\[] | [`dns.resolveTxt()`][]   |

On error, `err` is an [`Error`][] object, where `err.code` is one of the
[DNS error codes][].

### <DataTag tag="M" /> `dns.resolve4(hostname[, options], callback)`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/41678","description":"Passing an invalid callback to the `callback` argument now throws `ERR_INVALID_ARG_TYPE` instead of `ERR_INVALID_CALLBACK`."},{"version":"v7.2.0","pr-url":"https://github.com/nodejs/node/pull/9296","description":"This method now supports passing `options`, specifically `options.ttl`."}],"update":{"type":"added","version":["v0.1.16"]}}} />

* `hostname` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Host name to resolve.
* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `ttl` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) Retrieves the Time-To-Live value (TTL) of each record.
    When `true`, the callback receives an array of
    `{ address: '1.2.3.4', ttl: 60 }` objects rather than an array of strings,
    with the TTL expressed in seconds.
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `err` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
  * `addresses` string\[] | Object\[]

Uses the DNS protocol to resolve a IPv4 addresses (`A` records) for the
`hostname`. The `addresses` argument passed to the `callback` function
will contain an array of IPv4 addresses (e.g.
`['74.125.79.104', '74.125.79.105', '74.125.79.106']`).

### <DataTag tag="M" /> `dns.resolve6(hostname[, options], callback)`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/41678","description":"Passing an invalid callback to the `callback` argument now throws `ERR_INVALID_ARG_TYPE` instead of `ERR_INVALID_CALLBACK`."},{"version":"v7.2.0","pr-url":"https://github.com/nodejs/node/pull/9296","description":"This method now supports passing `options`, specifically `options.ttl`."}],"update":{"type":"added","version":["v0.1.16"]}}} />

* `hostname` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Host name to resolve.
* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `ttl` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) Retrieve the Time-To-Live value (TTL) of each record.
    When `true`, the callback receives an array of
    `{ address: '0:1:2:3:4:5:6:7', ttl: 60 }` objects rather than an array of
    strings, with the TTL expressed in seconds.
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `err` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
  * `addresses` string\[] | Object\[]

Uses the DNS protocol to resolve IPv6 addresses (`AAAA` records) for the
`hostname`. The `addresses` argument passed to the `callback` function
will contain an array of IPv6 addresses.

### <DataTag tag="M" /> `dns.resolveAny(hostname, callback)`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/41678","description":"Passing an invalid callback to the `callback` argument now throws `ERR_INVALID_ARG_TYPE` instead of `ERR_INVALID_CALLBACK`."}]}} />

* `hostname` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `err` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
  * `ret` Object\[]

Uses the DNS protocol to resolve all records (also known as `ANY` or `*` query).
The `ret` argument passed to the `callback` function will be an array containing
various types of records. Each object has a property `type` that indicates the
type of the current record. And depending on the `type`, additional properties
will be present on the object:

| Type      | Properties                                                                                                                                       |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `'A'`     | `address`/`ttl`                                                                                                                                  |
| `'AAAA'`  | `address`/`ttl`                                                                                                                                  |
| `'CNAME'` | `value`                                                                                                                                          |
| `'MX'`    | Refer to [`dns.resolveMx()`][]                                                                                                                   |
| `'NAPTR'` | Refer to [`dns.resolveNaptr()`][]                                                                                                                |
| `'NS'`    | `value`                                                                                                                                          |
| `'PTR'`   | `value`                                                                                                                                          |
| `'SOA'`   | Refer to [`dns.resolveSoa()`][]                                                                                                                  |
| `'SRV'`   | Refer to [`dns.resolveSrv()`][]                                                                                                                  |
| `'TXT'`   | This type of record contains an array property called `entries` which refers to [`dns.resolveTxt()`][], e.g. `{ entries: ['...'], type: 'TXT' }` |

Here is an example of the `ret` object passed to the callback:



```js
[ { type: 'A', address: '127.0.0.1', ttl: 299 },
  { type: 'CNAME', value: 'example.com' },
  { type: 'MX', exchange: 'alt4.aspmx.l.example.com', priority: 50 },
  { type: 'NS', value: 'ns1.example.com' },
  { type: 'TXT', entries: [ 'v=spf1 include:_spf.example.com ~all' ] },
  { type: 'SOA',
    nsname: 'ns1.example.com',
    hostmaster: 'admin.example.com',
    serial: 156696742,
    refresh: 900,
    retry: 900,
    expire: 1800,
    minttl: 60 } ]
```

DNS server operators may choose not to respond to `ANY`
queries. It may be better to call individual methods like [`dns.resolve4()`][],
[`dns.resolveMx()`][], and so on. For more details, see [RFC 8482][].

### <DataTag tag="M" /> `dns.resolveCname(hostname, callback)`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/41678","description":"Passing an invalid callback to the `callback` argument now throws `ERR_INVALID_ARG_TYPE` instead of `ERR_INVALID_CALLBACK`."}],"update":{"type":"added","version":["v0.3.2"]}}} />

* `hostname` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `err` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
  * `addresses` string\[]

Uses the DNS protocol to resolve `CNAME` records for the `hostname`. The
`addresses` argument passed to the `callback` function
will contain an array of canonical name records available for the `hostname`
(e.g. `['bar.example.com']`).

### <DataTag tag="M" /> `dns.resolveCaa(hostname, callback)`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/41678","description":"Passing an invalid callback to the `callback` argument now throws `ERR_INVALID_ARG_TYPE` instead of `ERR_INVALID_CALLBACK`."}],"update":{"type":"added","version":["v15.0.0","v14.17.0"]}}} />

* `hostname` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `err` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
  * `records` Object\[]

Uses the DNS protocol to resolve `CAA` records for the `hostname`. The
`addresses` argument passed to the `callback` function
will contain an array of certification authority authorization records
available for the `hostname` (e.g. `[{critical: 0, iodef:
'mailto:pki@example.com'}, {critical: 128, issue: 'pki.example.com'}]`).

### <DataTag tag="M" /> `dns.resolveMx(hostname, callback)`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/41678","description":"Passing an invalid callback to the `callback` argument now throws `ERR_INVALID_ARG_TYPE` instead of `ERR_INVALID_CALLBACK`."}],"update":{"type":"added","version":["v0.1.27"]}}} />

* `hostname` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `err` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
  * `addresses` Object\[]

Uses the DNS protocol to resolve mail exchange records (`MX` records) for the
`hostname`. The `addresses` argument passed to the `callback` function will
contain an array of objects containing both a `priority` and `exchange`
property (e.g. `[{priority: 10, exchange: 'mx.example.com'}, ...]`).

### <DataTag tag="M" /> `dns.resolveNaptr(hostname, callback)`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/41678","description":"Passing an invalid callback to the `callback` argument now throws `ERR_INVALID_ARG_TYPE` instead of `ERR_INVALID_CALLBACK`."}],"update":{"type":"added","version":["v0.9.12"]}}} />

* `hostname` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `err` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
  * `addresses` Object\[]

Uses the DNS protocol to resolve regular expression-based records (`NAPTR`
records) for the `hostname`. The `addresses` argument passed to the `callback`
function will contain an array of objects with the following properties:

* `flags`
* `service`
* `regexp`
* `replacement`
* `order`
* `preference`



```js
{
  flags: 's',
  service: 'SIP+D2U',
  regexp: '',
  replacement: '_sip._udp.example.com',
  order: 30,
  preference: 100
}
```

### <DataTag tag="M" /> `dns.resolveNs(hostname, callback)`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/41678","description":"Passing an invalid callback to the `callback` argument now throws `ERR_INVALID_ARG_TYPE` instead of `ERR_INVALID_CALLBACK`."}],"update":{"type":"added","version":["v0.1.90"]}}} />

* `hostname` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `err` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
  * `addresses` string\[]

Uses the DNS protocol to resolve name server records (`NS` records) for the
`hostname`. The `addresses` argument passed to the `callback` function will
contain an array of name server records available for `hostname`
(e.g. `['ns1.example.com', 'ns2.example.com']`).

### <DataTag tag="M" /> `dns.resolvePtr(hostname, callback)`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/41678","description":"Passing an invalid callback to the `callback` argument now throws `ERR_INVALID_ARG_TYPE` instead of `ERR_INVALID_CALLBACK`."}],"update":{"type":"added","version":["v6.0.0"]}}} />

* `hostname` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `err` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
  * `addresses` string\[]

Uses the DNS protocol to resolve pointer records (`PTR` records) for the
`hostname`. The `addresses` argument passed to the `callback` function will
be an array of strings containing the reply records.

### <DataTag tag="M" /> `dns.resolveSoa(hostname, callback)`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/41678","description":"Passing an invalid callback to the `callback` argument now throws `ERR_INVALID_ARG_TYPE` instead of `ERR_INVALID_CALLBACK`."}],"update":{"type":"added","version":["v0.11.10"]}}} />

* `hostname` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `err` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
  * `address` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

Uses the DNS protocol to resolve a start of authority record (`SOA` record) for
the `hostname`. The `address` argument passed to the `callback` function will
be an object with the following properties:

* `nsname`
* `hostmaster`
* `serial`
* `refresh`
* `retry`
* `expire`
* `minttl`



```js
{
  nsname: 'ns.example.com',
  hostmaster: 'root.example.com',
  serial: 2013101809,
  refresh: 10000,
  retry: 2400,
  expire: 604800,
  minttl: 3600
}
```

### <DataTag tag="M" /> `dns.resolveSrv(hostname, callback)`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/41678","description":"Passing an invalid callback to the `callback` argument now throws `ERR_INVALID_ARG_TYPE` instead of `ERR_INVALID_CALLBACK`."}],"update":{"type":"added","version":["v0.1.27"]}}} />

* `hostname` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `err` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
  * `addresses` Object\[]

Uses the DNS protocol to resolve service records (`SRV` records) for the
`hostname`. The `addresses` argument passed to the `callback` function will
be an array of objects with the following properties:

* `priority`
* `weight`
* `port`
* `name`



```js
{
  priority: 10,
  weight: 5,
  port: 21223,
  name: 'service.example.com'
}
```

### <DataTag tag="M" /> `dns.resolveTxt(hostname, callback)`

<Metadata version="v18.9.0" data={{"changes":[{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/41678","description":"Passing an invalid callback to the `callback` argument now throws `ERR_INVALID_ARG_TYPE` instead of `ERR_INVALID_CALLBACK`."}],"update":{"type":"added","version":["v0.1.27"]}}} />



* `hostname` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `err` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
  * `records` <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type" class="type">\<string\[]\[]></a>



Uses the DNS protocol to resolve text queries (`TXT` records) for the
`hostname`. The `records` argument passed to the `callback` function is a
two-dimensional array of the text records available for `hostname` (e.g.
`[ ['v=spf1 ip4:0.0.0.0 ', '~all' ] ]`). Each sub-array contains TXT chunks of
one record. Depending on the use case, these could be either joined together or
treated separately.

### <DataTag tag="M" /> `dns.reverse(ip, callback)`

<Metadata version="v18.9.0" data={{"update":{"type":"added","version":["v0.1.16"]}}} />

* `ip` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `err` [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
  * `hostnames` string\[]

Performs a reverse DNS query that resolves an IPv4 or IPv6 address to an
array of host names.

On error, `err` is an [`Error`][] object, where `err.code` is
one of the [DNS error codes][].

### <DataTag tag="M" /> `dns.setDefaultResultOrder(order)`

<Metadata version="v18.9.0" data={{"update":{"type":"added","version":["v16.4.0","v14.18.0"]}}} />

* `order` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) must be `'ipv4first'` or `'verbatim'`.

Set the default value of `verbatim` in [`dns.lookup()`][] and
[`dnsPromises.lookup()`][]. The value could be:

* `ipv4first`: sets default `verbatim` `false`.
* `verbatim`: sets default `verbatim` `true`.

The default is `ipv4first` and [`dns.setDefaultResultOrder()`][] have higher
priority than [`--dns-result-order`][]. When using [worker threads][],
[`dns.setDefaultResultOrder()`][] from the main thread won't affect the default
dns orders in workers.

### <DataTag tag="M" /> `dns.setServers(servers)`

<Metadata version="v18.9.0" data={{"update":{"type":"added","version":["v0.11.3"]}}} />

* `servers` string\[] array of [RFC 5952][] formatted addresses

Sets the IP address and port of servers to be used when performing DNS
resolution. The `servers` argument is an array of [RFC 5952][] formatted
addresses. If the port is the IANA default DNS port (53) it can be omitted.

```js
dns.setServers([
  '4.4.4.4',
  '[2001:4860:4860::8888]',
  '4.4.4.4:1053',
  '[2001:4860:4860::8888]:1053',
]);
```

An error will be thrown if an invalid address is provided.

The `dns.setServers()` method must not be called while a DNS query is in
progress.

The [`dns.setServers()`][] method affects only [`dns.resolve()`][],
`dns.resolve*()` and [`dns.reverse()`][] (and specifically _not_
[`dns.lookup()`][]).

This method works much like
[resolve.conf](https://man7.org/linux/man-pages/man5/resolv.conf.5.html).
That is, if attempting to resolve with the first server provided results in a
`NOTFOUND` error, the `resolve()` method will _not_ attempt to resolve with
subsequent servers provided. Fallback DNS servers will only be used if the
earlier ones time out or result in some other error.

### DNS promises API

<Metadata version="v18.9.0" data={{"changes":[{"version":"v15.0.0","pr-url":"https://github.com/nodejs/node/pull/32953","description":"Exposed as `require('dns/promises')`."},{"version":["v11.14.0","v10.17.0"],"pr-url":"https://github.com/nodejs/node/pull/26592","description":"This API is no longer experimental."}],"update":{"type":"added","version":["v10.6.0"]}}} />

The `dns.promises` API provides an alternative set of asynchronous DNS methods
that return `Promise` objects rather than using callbacks. The API is accessible
via `require('node:dns').promises` or `require('node:dns/promises')`.

#### <DataTag tag="C" /> `dnsPromises.Resolver`

<Metadata version="v18.9.0" data={{"update":{"type":"added","version":["v10.6.0"]}}} />

An independent resolver for DNS requests.

Creating a new resolver uses the default server settings. Setting
the servers used for a resolver using
[`resolver.setServers()`][`dnsPromises.setServers()`] does not affect
other resolvers:

```js
const { Resolver } = require('node:dns').promises;
const resolver = new Resolver();
resolver.setServers(['4.4.4.4']);

// This request will use the server at 4.4.4.4, independent of global settings.
resolver.resolve4('example.org').then((addresses) => {
  // ...
});

// Alternatively, the same code can be written using async-await style.
(async function() {
  const addresses = await resolver.resolve4('example.org');
})();
```

The following methods from the `dnsPromises` API are available:

* [`resolver.getServers()`][`dnsPromises.getServers()`]
* [`resolver.resolve()`][`dnsPromises.resolve()`]
* [`resolver.resolve4()`][`dnsPromises.resolve4()`]
* [`resolver.resolve6()`][`dnsPromises.resolve6()`]
* [`resolver.resolveAny()`][`dnsPromises.resolveAny()`]
* [`resolver.resolveCaa()`][`dnsPromises.resolveCaa()`]
* [`resolver.resolveCname()`][`dnsPromises.resolveCname()`]
* [`resolver.resolveMx()`][`dnsPromises.resolveMx()`]
* [`resolver.resolveNaptr()`][`dnsPromises.resolveNaptr()`]
* [`resolver.resolveNs()`][`dnsPromises.resolveNs()`]
* [`resolver.resolvePtr()`][`dnsPromises.resolvePtr()`]
* [`resolver.resolveSoa()`][`dnsPromises.resolveSoa()`]
* [`resolver.resolveSrv()`][`dnsPromises.resolveSrv()`]
* [`resolver.resolveTxt()`][`dnsPromises.resolveTxt()`]
* [`resolver.reverse()`][`dnsPromises.reverse()`]
* [`resolver.setServers()`][`dnsPromises.setServers()`]

#### <DataTag tag="M" /> `resolver.cancel()`

<Metadata version="v18.9.0" data={{"update":{"type":"added","version":["v15.3.0","v14.17.0"]}}} />

Cancel all outstanding DNS queries made by this resolver. The corresponding
promises will be rejected with an error with the code `ECANCELLED`.

#### <DataTag tag="M" /> `dnsPromises.getServers()`

<Metadata version="v18.9.0" data={{"update":{"type":"added","version":["v10.6.0"]}}} />

* Returns: string\[]

Returns an array of IP address strings, formatted according to [RFC 5952][],
that are currently configured for DNS resolution. A string will include a port
section if a custom port is used.



```js
[
  '4.4.4.4',
  '2001:4860:4860::8888',
  '4.4.4.4:1053',
  '[2001:4860:4860::8888]:1053',
]
```

#### <DataTag tag="M" /> `dnsPromises.lookup(hostname[, options])`

<Metadata version="v18.9.0" data={{"update":{"type":"added","version":["v10.6.0"]}}} />

* `hostname` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
* `options` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `family` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The record family. Must be `4`, `6`, or `0`. The value
    `0` indicates that IPv4 and IPv6 addresses are both returned. **Default:**
    `0`.
  * `hints` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) One or more [supported `getaddrinfo` flags][]. Multiple
    flags may be passed by bitwise `OR`ing their values.
  * `all` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) When `true`, the `Promise` is resolved with all addresses in
    an array. Otherwise, returns a single address. **Default:** `false`.
  * `verbatim` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) When `true`, the `Promise` is resolved with IPv4 and
    IPv6 addresses in the order the DNS resolver returned them. When `false`,
    IPv4 addresses are placed before IPv6 addresses.
    **Default:** currently `false` (addresses are reordered) but this is
    expected to change in the not too distant future. Default value is
    configurable using [`dns.setDefaultResultOrder()`][] or
    [`--dns-result-order`][]. New code should use `{ verbatim: true }`.

Resolves a host name (e.g. `'nodejs.org'`) into the first found A (IPv4) or
AAAA (IPv6) record. All `option` properties are optional. If `options` is an
integer, then it must be `4` or `6` – if `options` is not provided, then IPv4
and IPv6 addresses are both returned if found.

With the `all` option set to `true`, the `Promise` is resolved with `addresses`
being an array of objects with the properties `address` and `family`.

On error, the `Promise` is rejected with an [`Error`][] object, where `err.code`
is the error code.
Keep in mind that `err.code` will be set to `'ENOTFOUND'` not only when
the host name does not exist but also when the lookup fails in other ways
such as no available file descriptors.

[`dnsPromises.lookup()`][] does not necessarily have anything to do with the DNS
protocol. The implementation uses an operating system facility that can
associate names with addresses and vice versa. This implementation can have
subtle but important consequences on the behavior of any Node.js program. Please
take some time to consult the [Implementation considerations section][] before
using `dnsPromises.lookup()`.

Example usage:

```js
const dns = require('node:dns');
const dnsPromises = dns.promises;
const options = {
  family: 6,
  hints: dns.ADDRCONFIG | dns.V4MAPPED,
};

dnsPromises.lookup('example.com', options).then((result) => {
  console.log('address: %j family: IPv%s', result.address, result.family);
  // address: "2606:2800:220:1:248:1893:25c8:1946" family: IPv6
});

// When options.all is true, the result will be an Array.
options.all = true;
dnsPromises.lookup('example.com', options).then((result) => {
  console.log('addresses: %j', result);
  // addresses: [{"address":"2606:2800:220:1:248:1893:25c8:1946","family":6}]
});
```

#### <DataTag tag="M" /> `dnsPromises.lookupService(address, port)`

<Metadata version="v18.9.0" data={{"update":{"type":"added","version":["v10.6.0"]}}} />

* `address` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
* `port` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

Resolves the given `address` and `port` into a host name and service using
the operating system's underlying `getnameinfo` implementation.

If `address` is not a valid IP address, a `TypeError` will be thrown.
The `port` will be coerced to a number. If it is not a legal port, a `TypeError`
will be thrown.

On error, the `Promise` is rejected with an [`Error`][] object, where `err.code`
is the error code.

```js
const dnsPromises = require('node:dns').promises;
dnsPromises.lookupService('127.0.0.1', 22).then((result) => {
  console.log(result.hostname, result.service);
  // Prints: localhost ssh
});
```

#### <DataTag tag="M" /> `dnsPromises.resolve(hostname[, rrtype])`

<Metadata version="v18.9.0" data={{"update":{"type":"added","version":["v10.6.0"]}}} />

* `hostname` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Host name to resolve.
* `rrtype` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Resource record type. **Default:** `'A'`.

Uses the DNS protocol to resolve a host name (e.g. `'nodejs.org'`) into an array
of the resource records. When successful, the `Promise` is resolved with an
array of resource records. The type and structure of individual results vary
based on `rrtype`:

| `rrtype`  | `records` contains             | Result type | Shorthand method                 |
| --------- | ------------------------------ | ----------- | -------------------------------- |
| `'A'`     | IPv4 addresses (default)       | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)    | [`dnsPromises.resolve4()`][]     |
| `'AAAA'`  | IPv6 addresses                 | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)    | [`dnsPromises.resolve6()`][]     |
| `'ANY'`   | any records                    | [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)    | [`dnsPromises.resolveAny()`][]   |
| `'CAA'`   | CA authorization records       | [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)    | [`dnsPromises.resolveCaa()`][]   |
| `'CNAME'` | canonical name records         | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)    | [`dnsPromises.resolveCname()`][] |
| `'MX'`    | mail exchange records          | [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)    | [`dnsPromises.resolveMx()`][]    |
| `'NAPTR'` | name authority pointer records | [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)    | [`dnsPromises.resolveNaptr()`][] |
| `'NS'`    | name server records            | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)    | [`dnsPromises.resolveNs()`][]    |
| `'PTR'`   | pointer records                | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)    | [`dnsPromises.resolvePtr()`][]   |
| `'SOA'`   | start of authority records     | [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)    | [`dnsPromises.resolveSoa()`][]   |
| `'SRV'`   | service records                | [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)    | [`dnsPromises.resolveSrv()`][]   |
| `'TXT'`   | text records                   | string\[] | [`dnsPromises.resolveTxt()`][]   |

On error, the `Promise` is rejected with an [`Error`][] object, where `err.code`
is one of the [DNS error codes][].

#### <DataTag tag="M" /> `dnsPromises.resolve4(hostname[, options])`

<Metadata version="v18.9.0" data={{"update":{"type":"added","version":["v10.6.0"]}}} />

* `hostname` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Host name to resolve.
* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `ttl` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) Retrieve the Time-To-Live value (TTL) of each record.
    When `true`, the `Promise` is resolved with an array of
    `{ address: '1.2.3.4', ttl: 60 }` objects rather than an array of strings,
    with the TTL expressed in seconds.

Uses the DNS protocol to resolve IPv4 addresses (`A` records) for the
`hostname`. On success, the `Promise` is resolved with an array of IPv4
addresses (e.g. `['74.125.79.104', '74.125.79.105', '74.125.79.106']`).

#### <DataTag tag="M" /> `dnsPromises.resolve6(hostname[, options])`

<Metadata version="v18.9.0" data={{"update":{"type":"added","version":["v10.6.0"]}}} />

* `hostname` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Host name to resolve.
* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `ttl` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) Retrieve the Time-To-Live value (TTL) of each record.
    When `true`, the `Promise` is resolved with an array of
    `{ address: '0:1:2:3:4:5:6:7', ttl: 60 }` objects rather than an array of
    strings, with the TTL expressed in seconds.

Uses the DNS protocol to resolve IPv6 addresses (`AAAA` records) for the
`hostname`. On success, the `Promise` is resolved with an array of IPv6
addresses.

#### <DataTag tag="M" /> `dnsPromises.resolveAny(hostname)`

<Metadata version="v18.9.0" data={{"update":{"type":"added","version":["v10.6.0"]}}} />

* `hostname` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

Uses the DNS protocol to resolve all records (also known as `ANY` or `*` query).
On success, the `Promise` is resolved with an array containing various types of
records. Each object has a property `type` that indicates the type of the
current record. And depending on the `type`, additional properties will be
present on the object:

| Type      | Properties                                                                                                                                               |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `'A'`     | `address`/`ttl`                                                                                                                                          |
| `'AAAA'`  | `address`/`ttl`                                                                                                                                          |
| `'CNAME'` | `value`                                                                                                                                                  |
| `'MX'`    | Refer to [`dnsPromises.resolveMx()`][]                                                                                                                   |
| `'NAPTR'` | Refer to [`dnsPromises.resolveNaptr()`][]                                                                                                                |
| `'NS'`    | `value`                                                                                                                                                  |
| `'PTR'`   | `value`                                                                                                                                                  |
| `'SOA'`   | Refer to [`dnsPromises.resolveSoa()`][]                                                                                                                  |
| `'SRV'`   | Refer to [`dnsPromises.resolveSrv()`][]                                                                                                                  |
| `'TXT'`   | This type of record contains an array property called `entries` which refers to [`dnsPromises.resolveTxt()`][], e.g. `{ entries: ['...'], type: 'TXT' }` |

Here is an example of the result object:



```js
[ { type: 'A', address: '127.0.0.1', ttl: 299 },
  { type: 'CNAME', value: 'example.com' },
  { type: 'MX', exchange: 'alt4.aspmx.l.example.com', priority: 50 },
  { type: 'NS', value: 'ns1.example.com' },
  { type: 'TXT', entries: [ 'v=spf1 include:_spf.example.com ~all' ] },
  { type: 'SOA',
    nsname: 'ns1.example.com',
    hostmaster: 'admin.example.com',
    serial: 156696742,
    refresh: 900,
    retry: 900,
    expire: 1800,
    minttl: 60 } ]
```

#### <DataTag tag="M" /> `dnsPromises.resolveCaa(hostname)`

<Metadata version="v18.9.0" data={{"update":{"type":"added","version":["v15.0.0","v14.17.0"]}}} />

* `hostname` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

Uses the DNS protocol to resolve `CAA` records for the `hostname`. On success,
the `Promise` is resolved with an array of objects containing available
certification authority authorization records available for the `hostname`
(e.g. `[{critical: 0, iodef: 'mailto:pki@example.com'},{critical: 128, issue:
'pki.example.com'}]`).

#### <DataTag tag="M" /> `dnsPromises.resolveCname(hostname)`

<Metadata version="v18.9.0" data={{"update":{"type":"added","version":["v10.6.0"]}}} />

* `hostname` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

Uses the DNS protocol to resolve `CNAME` records for the `hostname`. On success,
the `Promise` is resolved with an array of canonical name records available for
the `hostname` (e.g. `['bar.example.com']`).

#### <DataTag tag="M" /> `dnsPromises.resolveMx(hostname)`

<Metadata version="v18.9.0" data={{"update":{"type":"added","version":["v10.6.0"]}}} />

* `hostname` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

Uses the DNS protocol to resolve mail exchange records (`MX` records) for the
`hostname`. On success, the `Promise` is resolved with an array of objects
containing both a `priority` and `exchange` property (e.g.
`[{priority: 10, exchange: 'mx.example.com'}, ...]`).

#### <DataTag tag="M" /> `dnsPromises.resolveNaptr(hostname)`

<Metadata version="v18.9.0" data={{"update":{"type":"added","version":["v10.6.0"]}}} />

* `hostname` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

Uses the DNS protocol to resolve regular expression-based records (`NAPTR`
records) for the `hostname`. On success, the `Promise` is resolved with an array
of objects with the following properties:

* `flags`
* `service`
* `regexp`
* `replacement`
* `order`
* `preference`



```js
{
  flags: 's',
  service: 'SIP+D2U',
  regexp: '',
  replacement: '_sip._udp.example.com',
  order: 30,
  preference: 100
}
```

#### <DataTag tag="M" /> `dnsPromises.resolveNs(hostname)`

<Metadata version="v18.9.0" data={{"update":{"type":"added","version":["v10.6.0"]}}} />

* `hostname` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

Uses the DNS protocol to resolve name server records (`NS` records) for the
`hostname`. On success, the `Promise` is resolved with an array of name server
records available for `hostname` (e.g.
`['ns1.example.com', 'ns2.example.com']`).

#### <DataTag tag="M" /> `dnsPromises.resolvePtr(hostname)`

<Metadata version="v18.9.0" data={{"update":{"type":"added","version":["v10.6.0"]}}} />

* `hostname` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

Uses the DNS protocol to resolve pointer records (`PTR` records) for the
`hostname`. On success, the `Promise` is resolved with an array of strings
containing the reply records.

#### <DataTag tag="M" /> `dnsPromises.resolveSoa(hostname)`

<Metadata version="v18.9.0" data={{"update":{"type":"added","version":["v10.6.0"]}}} />

* `hostname` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

Uses the DNS protocol to resolve a start of authority record (`SOA` record) for
the `hostname`. On success, the `Promise` is resolved with an object with the
following properties:

* `nsname`
* `hostmaster`
* `serial`
* `refresh`
* `retry`
* `expire`
* `minttl`



```js
{
  nsname: 'ns.example.com',
  hostmaster: 'root.example.com',
  serial: 2013101809,
  refresh: 10000,
  retry: 2400,
  expire: 604800,
  minttl: 3600
}
```

#### <DataTag tag="M" /> `dnsPromises.resolveSrv(hostname)`

<Metadata version="v18.9.0" data={{"update":{"type":"added","version":["v10.6.0"]}}} />

* `hostname` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

Uses the DNS protocol to resolve service records (`SRV` records) for the
`hostname`. On success, the `Promise` is resolved with an array of objects with
the following properties:

* `priority`
* `weight`
* `port`
* `name`



```js
{
  priority: 10,
  weight: 5,
  port: 21223,
  name: 'service.example.com'
}
```

#### <DataTag tag="M" /> `dnsPromises.resolveTxt(hostname)`

<Metadata version="v18.9.0" data={{"update":{"type":"added","version":["v10.6.0"]}}} />

* `hostname` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

Uses the DNS protocol to resolve text queries (`TXT` records) for the
`hostname`. On success, the `Promise` is resolved with a two-dimensional array
of the text records available for `hostname` (e.g.
`[ ['v=spf1 ip4:0.0.0.0 ', '~all' ] ]`). Each sub-array contains TXT chunks of
one record. Depending on the use case, these could be either joined together or
treated separately.

#### <DataTag tag="M" /> `dnsPromises.reverse(ip)`

<Metadata version="v18.9.0" data={{"update":{"type":"added","version":["v10.6.0"]}}} />

* `ip` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

Performs a reverse DNS query that resolves an IPv4 or IPv6 address to an
array of host names.

On error, the `Promise` is rejected with an [`Error`][] object, where `err.code`
is one of the [DNS error codes][].

#### <DataTag tag="M" /> `dnsPromises.setDefaultResultOrder(order)`

<Metadata version="v18.9.0" data={{"update":{"type":"added","version":["v16.4.0","v14.18.0"]}}} />

* `order` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) must be `'ipv4first'` or `'verbatim'`.

Set the default value of `verbatim` in [`dns.lookup()`][] and
[`dnsPromises.lookup()`][]. The value could be:

* `ipv4first`: sets default `verbatim` `false`.
* `verbatim`: sets default `verbatim` `true`.

The default is `ipv4first` and [`dnsPromises.setDefaultResultOrder()`][] have
higher priority than [`--dns-result-order`][]. When using [worker threads][],
[`dnsPromises.setDefaultResultOrder()`][] from the main thread won't affect the
default dns orders in workers.

#### <DataTag tag="M" /> `dnsPromises.setServers(servers)`

<Metadata version="v18.9.0" data={{"update":{"type":"added","version":["v10.6.0"]}}} />

* `servers` string\[] array of [RFC 5952][] formatted addresses

Sets the IP address and port of servers to be used when performing DNS
resolution. The `servers` argument is an array of [RFC 5952][] formatted
addresses. If the port is the IANA default DNS port (53) it can be omitted.

```js
dnsPromises.setServers([
  '4.4.4.4',
  '[2001:4860:4860::8888]',
  '4.4.4.4:1053',
  '[2001:4860:4860::8888]:1053',
]);
```

An error will be thrown if an invalid address is provided.

The `dnsPromises.setServers()` method must not be called while a DNS query is in
progress.

This method works much like
[resolve.conf](https://man7.org/linux/man-pages/man5/resolv.conf.5.html).
That is, if attempting to resolve with the first server provided results in a
`NOTFOUND` error, the `resolve()` method will _not_ attempt to resolve with
subsequent servers provided. Fallback DNS servers will only be used if the
earlier ones time out or result in some other error.

### Error codes

Each DNS query can return one of the following error codes:

* `dns.NODATA`: DNS server returned an answer with no data.
* `dns.FORMERR`: DNS server claims query was misformatted.
* `dns.SERVFAIL`: DNS server returned general failure.
* `dns.NOTFOUND`: Domain name not found.
* `dns.NOTIMP`: DNS server does not implement the requested operation.
* `dns.REFUSED`: DNS server refused query.
* `dns.BADQUERY`: Misformatted DNS query.
* `dns.BADNAME`: Misformatted host name.
* `dns.BADFAMILY`: Unsupported address family.
* `dns.BADRESP`: Misformatted DNS reply.
* `dns.CONNREFUSED`: Could not contact DNS servers.
* `dns.TIMEOUT`: Timeout while contacting DNS servers.
* `dns.EOF`: End of file.
* `dns.FILE`: Error reading file.
* `dns.NOMEM`: Out of memory.
* `dns.DESTRUCTION`: Channel is being destroyed.
* `dns.BADSTR`: Misformatted string.
* `dns.BADFLAGS`: Illegal flags specified.
* `dns.NONAME`: Given host name is not numeric.
* `dns.BADHINTS`: Illegal hints flags specified.
* `dns.NOTINITIALIZED`: c-ares library initialization not yet performed.
* `dns.LOADIPHLPAPI`: Error loading `iphlpapi.dll`.
* `dns.ADDRGETNETWORKPARAMS`: Could not find `GetNetworkParams` function.
* `dns.CANCELLED`: DNS query cancelled.

The `dnsPromises` API also exports the above error codes, e.g., `dnsPromises.NODATA`.

### Implementation considerations

Although [`dns.lookup()`][] and the various `dns.resolve*()/dns.reverse()`
functions have the same goal of associating a network name with a network
address (or vice versa), their behavior is quite different. These differences
can have subtle but significant consequences on the behavior of Node.js
programs.

#### <DataTag tag="M" /> `dns.lookup()`

Under the hood, [`dns.lookup()`][] uses the same operating system facilities
as most other programs. For instance, [`dns.lookup()`][] will almost always
resolve a given name the same way as the `ping` command. On most POSIX-like
operating systems, the behavior of the [`dns.lookup()`][] function can be
modified by changing settings in nsswitch.conf(5) and/or resolv.conf(5),
but changing these files will change the behavior of all other
programs running on the same operating system.

Though the call to `dns.lookup()` will be asynchronous from JavaScript's
perspective, it is implemented as a synchronous call to getaddrinfo(3) that runs
on libuv's threadpool. This can have surprising negative performance
implications for some applications, see the [`UV_THREADPOOL_SIZE`][]
documentation for more information.

Various networking APIs will call `dns.lookup()` internally to resolve
host names. If that is an issue, consider resolving the host name to an address
using `dns.resolve()` and using the address instead of a host name. Also, some
networking APIs (such as [`socket.connect()`][] and [`dgram.createSocket()`][])
allow the default resolver, `dns.lookup()`, to be replaced.

#### <DataTag tag="M" /> `dns.resolve()`, `dns.resolve*()`, and `dns.reverse()`

These functions are implemented quite differently than [`dns.lookup()`][]. They
do not use getaddrinfo(3) and they _always_ perform a DNS query on the
network. This network communication is always done asynchronously and does not
use libuv's threadpool.

As a result, these functions cannot have the same negative impact on other
processing that happens on libuv's threadpool that [`dns.lookup()`][] can have.

They do not use the same set of configuration files than what [`dns.lookup()`][]
uses. For instance, _they do not use the configuration from `/etc/hosts`_.

[DNS error codes]: #error-codes
[Domain Name System (DNS)]: https://en.wikipedia.org/wiki/Domain_Name_System
[Implementation considerations section]: #implementation-considerations
[RFC 5952]: https://tools.ietf.org/html/rfc5952#section-6
[RFC 8482]: https://tools.ietf.org/html/rfc8482
[`--dns-result-order`]: (/api/cli#--dns-result-orderorder)
[`Error`]: (/api/errors#class-error)
[`UV_THREADPOOL_SIZE`]: (/api/cli#uv_threadpool_sizesize)
[`dgram.createSocket()`]: (/api/dgram#dgramcreatesocketoptions-callback)
[`dns.getServers()`]: #dnsgetservers
[`dns.lookup()`]: #dnslookuphostname-options-callback
[`dns.resolve()`]: #dnsresolvehostname-rrtype-callback
[`dns.resolve4()`]: #dnsresolve4hostname-options-callback
[`dns.resolve6()`]: #dnsresolve6hostname-options-callback
[`dns.resolveAny()`]: #dnsresolveanyhostname-callback
[`dns.resolveCaa()`]: #dnsresolvecaahostname-callback
[`dns.resolveCname()`]: #dnsresolvecnamehostname-callback
[`dns.resolveMx()`]: #dnsresolvemxhostname-callback
[`dns.resolveNaptr()`]: #dnsresolvenaptrhostname-callback
[`dns.resolveNs()`]: #dnsresolvenshostname-callback
[`dns.resolvePtr()`]: #dnsresolveptrhostname-callback
[`dns.resolveSoa()`]: #dnsresolvesoahostname-callback
[`dns.resolveSrv()`]: #dnsresolvesrvhostname-callback
[`dns.resolveTxt()`]: #dnsresolvetxthostname-callback
[`dns.reverse()`]: #dnsreverseip-callback
[`dns.setDefaultResultOrder()`]: #dnssetdefaultresultorderorder
[`dns.setServers()`]: #dnssetserversservers
[`dnsPromises.getServers()`]: #dnspromisesgetservers
[`dnsPromises.lookup()`]: #dnspromiseslookuphostname-options
[`dnsPromises.resolve()`]: #dnspromisesresolvehostname-rrtype
[`dnsPromises.resolve4()`]: #dnspromisesresolve4hostname-options
[`dnsPromises.resolve6()`]: #dnspromisesresolve6hostname-options
[`dnsPromises.resolveAny()`]: #dnspromisesresolveanyhostname
[`dnsPromises.resolveCaa()`]: #dnspromisesresolvecaahostname
[`dnsPromises.resolveCname()`]: #dnspromisesresolvecnamehostname
[`dnsPromises.resolveMx()`]: #dnspromisesresolvemxhostname
[`dnsPromises.resolveNaptr()`]: #dnspromisesresolvenaptrhostname
[`dnsPromises.resolveNs()`]: #dnspromisesresolvenshostname
[`dnsPromises.resolvePtr()`]: #dnspromisesresolveptrhostname
[`dnsPromises.resolveSoa()`]: #dnspromisesresolvesoahostname
[`dnsPromises.resolveSrv()`]: #dnspromisesresolvesrvhostname
[`dnsPromises.resolveTxt()`]: #dnspromisesresolvetxthostname
[`dnsPromises.reverse()`]: #dnspromisesreverseip
[`dnsPromises.setDefaultResultOrder()`]: #dnspromisessetdefaultresultorderorder
[`dnsPromises.setServers()`]: #dnspromisessetserversservers
[`socket.connect()`]: (/api/net#socketconnectoptions-connectlistener)
[`util.promisify()`]: (/api/util#utilpromisifyoriginal)
[supported `getaddrinfo` flags]: #supported-getaddrinfo-flags
[worker threads]: worker_threads.md
