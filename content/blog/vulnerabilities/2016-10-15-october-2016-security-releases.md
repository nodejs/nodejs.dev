---
title: October security releases and v6 LTS "Boron" security inclusions
blogAuthors: ['rvagg']
category: 'vulnerabilities'
---

## _(Update 18-October-2016)_ Releases available

Updates are now available for all active Node.js release lines.

The following releases all contain fixes for CVE-2016-5180 "ares\_create\_query single byte out of buffer write":

* [Node.js v0.10.48 (Maintenance)](https://nodejs.org/en/blog/release/v0.10.48/)
* [Node.js v0.12.17 (Maintenance)](https://nodejs.org/en/blog/release/v0.12.17/)
* [Node.js v4.6.1 (LTS "Argon")](https://nodejs.org/en/blog/release/v4.6.1/)

While this is not a critical update, all users of these release lines should upgrade at their earliest convenience.

In addition, our new Node.js v6 LTS "Boron" release line is available beginning with **[Node.js v6.9.0 (LTS "Boron")](https://nodejs.org/en/blog/release/v6.9.0/)**. Along with the transition to Long Term Support, this release also contains the following security fixes, specific to v6.x:

* **Disable auto-loading of openssl.cnf**: Don't automatically attempt to load an OpenSSL configuration file, from the `OPENSSL_CONF` environment variable or from the default location for the current platform. Always triggering a configuration file load attempt may allow an attacker to load compromised OpenSSL configuration into a Node.js process if they are able to place a file in a default location.
* **Patched V8 arbitrary memory read** ([CVE-2016-5172](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2016-5172)): The V8 parser mishandled scopes, potentially allowing an attacker to obtain sensitive information from arbitrary memory locations via crafted JavaScript code. This vulnerability would require an attacker to be able to execute arbitrary JavaScript code in a Node.js process.
* **Create a unique v8\_inspector WebSocket address**: Generate a UUID for each execution of the inspector. This provides additional security to prevent unauthorized clients from connecting to the Node.js process via the v8\_inspector port when running with `--inspect`. Since the debugging protocol allows extensive access to the internals of a running process, and the execution of arbitrary code, it is important to limit connections to authorized tools only. Note that the v8\_inspector protocol in Node.js is still considered an experimental feature. Vulnerability originally reported by Jann Horn.

All of these vulnerabilities are considered low-severity for Node.js users, however, users of Node.js v6.x should upgrade at their earliest convenience.

_**Original post is included below**_

***

### Node.js v6 LTS security inclusions

Next week, on Tuesday the 18th (late evening UTC), the Node.js Foundation will be launching its second new LTS release line, a continuation of the v6.x series of releases. This line will be codenamed "Boron" and the first version will be v6.9.0.

In addition to a change to introduce the `process.release.lts` property, set to `'Boron'`, we will also be including 3 low-severity security patches that only apply to the v6.x release series.

The security vulnerabilities being addressed are all low-severity and arise from Node.js dependencies:

* V8
* OpenSSL when Node.js is built in [FIPS-compliant mode](https://github.com/nodejs/node/blob/master/BUILDING.md#building-nodejs-with-fips-compliant-openssl) (not official builds)
* v8\_inspector, a new experimental debugging protocol

These patches will also be included in the new v7.x _Current_ (non-LTS) release series which is due to be launched later this month.

* Node.js v6 _**is affected**_
* Node.js v4 (LTS "Argon") _**is not affected**_
* Node.js v0.12 (Maintenance) _**is not affected**_
* Node.js v0.10 (Maintenance) _**is not affected**_

### CVE-2016-5180 "ares\_create\_query single byte out of buffer write"

A security vulnerability has been [discovered in the c-ares library](https://c-ares.haxx.se/adv_20160929.html) that is bundled with all versions of Node.js. Due to the difficulty of triggering and making use of this vulnerability we currently consider this a low-severity security flaw for Node.js users.

The patch has already been included in Node.js v6 and we will ensure that patched versions of the remaining affected versions are made available by Tuesday the 18th.

* Node.js v6 _**is not affected**_
* Node.js v4 (LTS "Argon") _**is affected**_
* Node.js v0.12 (Maintenance) _**is affected**_
* Node.js v0.10 (Maintenance) _**is affected**_

We apologise for the short notice of these releases.
