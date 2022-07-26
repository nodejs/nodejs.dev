---
title: June 2018 Security Releases
blogAuthors: ['mhdawson']
category: 'vulnerabilities'
---

_(Update 12-June-2018)_ Security releases available

# Summary

Updates are now available for all active Node.js release lines. These include the fix for the vulnerabilities identified in the initial announcement (below).

We recommend that all users upgrade as soon as possible.

## Downloads & release details

* [Node.js 10.4.1 (Current)](https://nodejs.org/en/blog/release/v10.4.1)
* [Node.js 9.11.2](https://nodejs.org/en/blog/release/v9.11.2)
* [Node.js 8.11.3 (LTS "Carbon")](https://nodejs.org/en/blog/release/v8.11.3)
* [Node.js 6.14.3 (LTS "Boron")](https://nodejs.org/en/blog/release/v6.14.3)

## Denial of Service Vulnerability in HTTP/2 (CVE-2018-7161)

All versions of 8.x and later are vulnerable and the severity is HIGH. An attacker can cause a denial of service (DoS) by causing a node server providing an http2 server to crash. This can be accomplished by interacting with the http2 server in a manner that triggers a cleanup bug where objects are used in native code after they are no longer available. This has been addressed by updating the http2 implementation. Thanks to Jordan Zebor at F5 Networks for reporting this issue.

**Impact:**

* All versions of Node.js 6.x (LTS "Boron") **are** NOT vulnerable
* All versions of Node.js 8.x (LTS "Carbon") **are** vulnerable
* All versions of Node.js 9.x **are** vulnerable
* All versions of Node.js 10.x (Current) **are** vulnerable

## Denial of Service, nghttp2 dependency (CVE-2018-1000168)

All versions of 9.x and later are vulnerable and the severity is HIGH. Under certain conditions, a malicious client can trigger an uninitialized read (and a subsequent segfault) by sending a malformed ALTSVC frame. This has been addressed through an by updating nghttp2. For further detail: <https://nghttp2.org/blog/2018/04/12/nghttp2-v1-31-1/>.

**Impact:**

* All versions of Node.js 6.x (LTS "Boron") **are NOT** vulnerable
* Versions of Node.js 8.4.x and higher (LTS "Carbon") **are** vulnerable
* All versions of Node.js 9.x **are** vulnerable
* All versions of Node.js 10.x (Current) **are** vulnerable

## Denial of Service Vulnerability in TLS (CVE-2018-7162)

All versions of 9.x and later are vulnerable and the severity is HIGH. An attacker can cause a denial of service (DoS) by causing a node process which provides an http server supporting TLS server to crash. This can be accomplished by sending duplicate/unexpected messages during the handshake. This vulnerability has been addressed by updating the TLS implementation. Thanks to Jordan Zebor at F5 Networks all of his help investigating this issue with the Node.js team.

**Impact:**

* All versions of Node.js 6.x (LTS "Boron") **are NOT** vulnerable
* All versions of Node.js 8.x (LTS "Carbon") **are NOT** vulnerable
* All versions of Node.js 9.x **are** vulnerable
* All versions of Node.js 10.x (Current) **are** vulnerable

## Memory exhaustion DoS on v9.x (CVE-2018-7164)

Versions 9.7.0 and later are vulnerable and the severity is MEDIUM. A bug introduced in 9.7.0 increases the memory consumed when reading from the network into JavaScript using the net.Socket object directly as a stream. An attacker could use this cause a denial of service by sending tiny chunks of data in short succession. This vulnerability was restored by reverting to the prior behavior.

**Impact:**

* All versions of Node.js 6.x (LTS "Boron") **are NOT** vulnerable
* All versions of Node.js 8.x (LTS "Carbon") **are NOT** vulnerable
* Versions of Node.js 9.7.0 and higher **are** vulnerable
* All versions of Node.js 10.x (Current) **are** vulnerable

## Calls to Buffer.fill() and/or Buffer.alloc() may hang (CVE-2018-7167)

Calling Buffer.fill() or Buffer.alloc() with some parameters can lead to a hang which could result in a Denial of Service. The following examples show the cases which hang:

* `Buffer.alloc(100).fill(Buffer.alloc(0))`
* `Buffer.alloc(100).fill(Buffer.from(''))`
* `Buffer.alloc(100).fill(new Uint8Array([]))`
* `Buffer.alloc(100, Buffer.alloc(0))`
* `Buffer.alloc(100, new Uint8Array([]))`
* `new Buffer(10).fill(new Buffer(''))`

In order to address this vulnerability, the implementations of Buffer.alloc() and Buffer.fill() were updated so that they zero fill instead of hanging in these cases.

* All versions of Node.js 6.x (LTS "Boron") are vulnerable
* All versions of Node.js 8.x (LTS "Carbon") are vulnerable
* All versions of Node.js 9.x are vulnerable
* All versions of Node.js 10.x (Current) are NOT vulnerable

_**Original post is included below**_

## Summary

Node.js will release new versions of all supported release lines on or around June 12th, 2018 (UTC). These releases will incorporate a number of security fixes.

## Impact

* All versions of Node.js 6.x (LTS "Boron") are vulnerable to 1 denial-of-service (DoS) vulnerability with a severity of LOW.
* All versions of Node.js 8.x (LTS "Carbon") are vulnerable to 2 denial-of-service (DoS) vulnerabilities, the highest severity being HIGH (**Note** This should have said 3).
* Versions of Node.js 9.x are vulnerable to 5 denial-of-service (DoS) vulnerabilities, the highest severity being HIGH.
* All versions of Node.js 10.x (Current) are vulnerable to 4 denial-of-service (DoS) vulnerabilities, the highest severity being HIGH.

## Release timing

Releases will be available on or around June 12th, 2018 (UTC), along with disclosure of the details for the flaws addressed in each release in order to allow for complete impact assessment by users.

## Contact and future updates

The current Node.js security policy can be found at <https://github.com/nodejs/node/blob/HEAD/SECURITY.md#security>.

Please contact <security@nodejs.org> if you wish to report a vulnerability in Node.js.

Subscribe to the low-volume announcement-only nodejs-sec mailing list at <https://groups.google.com/forum/#!forum/nodejs-sec> to stay up to date on security vulnerabilities and security-related releases of Node.js and the projects maintained in the [nodejs GitHub organization](https://github.com/nodejs/).
