---
title: Security updates for all active release lines, September 2016
blogAuthors: ['rvagg']
category: 'vulnerabilities'
---

## _(Update 27-September-2016)_ Releases available

Updates are now available for all active Node.js release lines. These include the recently published versions of OpenSSL 1.0.1 and 1.0.2 as well as fixes for some Node.js-specific security-related defects.

The OpenSSL security fixes included in these updates that impact Node.js are:

* [CVE-2016-6304](#CVE-2016-6304): "OCSP Status Request extension unbounded memory growth"
* [CVE-2016-2183](#CVE-2016-2183): "SWEET32 Mitigation"
* [CVE-2016-6303](#CVE-2016-6303): "OOB write in MDC2\_Update()"
* [CVE-2016-2178](#CVE-2016-2178): "Constant time flag not preserved in DSA signing"
* [CVE-2016-6306](#CVE-2016-6306): "Certificate message OOB reads"

Details on each of these can be found in the original post below.

Additionally, OpenSSL 1.0.2j was released yesterday and included a fix for [CVE-2016-7052](https://www.openssl.org/news/vulnerabilities.html#2016-7052). This flaw was introduced in last week's 1.0.2i release, and therefore does not directly impact Node.js.

## Node.js-specific security flaws

Also included, are a number of fixes unrelated to the recent OpenSSL releases.

### CVE-2016-7099: Wildcard certificates not properly validated

This is a high severity defect that would allow a malicious TLS server to serve an invalid wildcard certificate for its hostname and be improperly validated by a Node.js client. This is due to a flaw in the validation of `*.` in the wildcard name string.

Originally reported by Alexander Minozhenko and James Bunton (Atlassian).

All versions of Node.js are **affected**.

### CVE-2016-5325: `reason` argument in `ServerResponse#writeHead()` not properly validated

This is a low severity security defect that may make [HTTP response splitting](https://en.wikipedia.org/wiki/HTTP_response_splitting) possible under certain circumstances. If user-input is passed to the `reason` argument to `writeHead()` on an HTTP response, a new-line character may be used to inject additional responses.

The fix for this defect introduces a new case where `throw` may occur when configuring HTTP responses. Users should already be adopting try/catch here.

This was originally reported independently by Evan Lucas and Romain Gaucher.

All versions of Node.js are **affected**.

### Remove support for loading dynamic third-party engine modules

This is a low severity security defect. By default, OpenSSL will load a list of third-party engine modules when the `ENGINE_load_builtin_engines()` function is used. These are normally not present on a user's system. An attacker may be able to make Node.js load malicious code by masquerading it as one of the dynamic engine modules.

This defect primarily impacts Windows due to the standard DLL search paths. However, Unix users may also be at risk with a poorly configured `LD_LIBRARY_PATH` environment variable or /etc/ld.so.conf path list.

Originally reported by Ahmed Zaki (Skype).

* Node.js v6 (Current) _**is affected**_
* Node.js v4 (LTS "Argon") _**is affected**_
* Node.js v0.12 (Maintenance) _**is affected**_
* Node.js v0.10 (Maintenance) _**is not affected**_

### Downloads

* [Node.js v6.7.0](https://nodejs.org/en/blog/release/v6.7.0/)
* [Node.js v4.6.0 (LTS "Argon")](https://nodejs.org/en/blog/release/v4.6.0/)
* [Node.js v0.12.16 (Maintenance)](https://nodejs.org/en/blog/release/v0.12.16/)
* [Node.js v0.10.47 (Maintenance)](https://nodejs.org/en/blog/release/v0.10.47/)

Please note that this may be the final release of the v0.10 line as support ends in October. Please upgrade to v4 or above if you have not already done so.

_**Original post is included below**_

***

The Node.js project has scheduled updates for all of its active release lines to patch a number of security flaws. These flaws include some of those [announced](https://www.openssl.org/news/secadv/20160922.txt) by the OpenSSL project as well as a number of Node.js-specific issues. We do not consider any of these updates to be critical. However, it is strongly recommended that all production instances of Node.js be upgraded when the releases are made available.

We intend to make releases available on or soon after the evening of **Tuesday, the 27th of September, 2016, UTC** (midday US time).

We consider some of the patches in these releases to be API _breaking_ changes which would normally warrant an increase in the major-version number of Node.js. However, in accordance with our security procedures, we will be delivering these changes in minor-version increases (the _y_ in _x.y.z_) where appropriate, and patch-version increases in v0.10 an v0.12 releases.

These are the expected version numbers for the releases:

* Node.js v6.7.0 (Current)
* Node.js v4.6.0 (LTS "Argon")
* Node.js v0.12.16 (Maintenance)
* Node.js v0.10.47 (Maintenance)

Additional notes:

* As per our [LTS schedule](https://github.com/nodejs/LTS), support for Node.js v0.10 will cease in October. Therefore, this may be the final release of Node.js v0.10. If you are still using v0.10 in production, it is essential that you plan for a migration to v4 (LTS "Argon") or v6 (LTS to be announced in October) as soon as possible.
* In accordance with our security release procedures, we will be limiting changes included in the LTS and Maintenance lines (v4, v0.12, and v0.10) _for these updates_ to only security-related and other critical fixes that provide for maximum stability for users.

## Node.js-specific security flaws

Included in these releases will be a number of fixes unrelated to the recent OpenSSL releases. These include:

* A high-severity flaw relating to the processing of TLS certificates, impacting all versions of Node.js
* A low-severity native code injection vulnerability on Windows, impacting all versions of Node.js
* A low-severity HTTP validation error, impacting all versions of Node.js

Full disclosure of fixed vulnerabilities will be provided after all releases are made available for download.

## September OpenSSL Releases

The OpenSSL project has [announced](https://www.openssl.org/news/secadv/20160922.txt) the general availability of versions [1.0.2i](https://www.openssl.org/news/openssl-1.0.2-notes.html) (to be included in Node.js v4 and above) and [1.0.1u](https://www.openssl.org/news/openssl-1.0.1-notes.html) (to be included in Node.js v0.10 and v0.12). Our crypto team (Shigeki Ohtsu, Fedor Indutny, and Ben Noordhuis) have performed an analysis of the defects addressed in the OpenSSL releases to determine their impact on Node.js. The results of this analysis are included below.

<a id="CVE-2016-6304"></a>

### [CVE-2016-6304](https://www.openssl.org/news/vulnerabilities.html#2016-6304): OCSP Status Request extension unbounded memory growth

A malicious client can exhaust a server's memory, resulting in a denial of service (DoS) by sending very large OCSP Status Request extensions in a single session.

This flaw is labelled _high_ severity due to the ease of use for a DoS attack and Node.js servers using TLS are vulnerable.

**Assessment**: All versions of Node.js are **affected** by this vulnerability.

<a id="CVE-2016-6305"></a>

### [CVE-2016-6305](https://www.openssl.org/news/vulnerabilities.html#2016-6305): SSL\_peek() hang on empty record

OpenSSL 1.1.0 SSL/TLS will hang during a call to `SSL_peek()` if the peer sends an empty record.

Node.js is not yet dependent on OpenSSL 1.1.0 so it is not impacted by this flaw.

**Assessment**: All versions of Node.js are believed to be **unaffected** by this vulnerability.

<a id="CVE-2016-2183"></a>

### [CVE-2016-2183](https://www.openssl.org/news/vulnerabilities.html#2016-2183): SWEET32 Mitigation

[SWEET32](https://sweet32.info) is a new attack on older block cipher algorithms that use a block size of 64 bits.

As mitigation, OpenSSL has moved DES-based ciphers from the `HIGH` to `MEDIUM` group. As Node.js includes `HIGH`, but not `MEDIUM`, in its default suite, affected ciphers are no longer included unless the default suite is not used. Node's default TLS cipher suite can be found in the [API documentation](https://nodejs.org/api/tls.html#tls_modifying_the_default_tls_cipher_suite).

**Assessment**: All versions of Node.js are **affected** by this vulnerability.

<a id="CVE-2016-6303"></a>

### [CVE-2016-6303](https://www.openssl.org/news/vulnerabilities.html#2016-6303): OOB write in MDC2\_Update()

An overflow can occur in `MDC2_Update()` under certain circumstances resulting in an out of bounds (OOB) error. This attack is impractical on most platforms due to the size of data required to trigger the OOB error.

Node.js is impacted by this flaw but due to the impracticalities of exploiting it and the very low usage of MDC-2, it is _very low_ severity for Node.js users.

**Assessment**: All versions of Node.js are **affected** by this vulnerability.

<a id="CVE-2016-6302"></a>

### [CVE-2016-6302](https://www.openssl.org/news/vulnerabilities.html#2016-6302): Malformed SHA512 ticket DoS

If a server uses SHA512 for TLS session ticket HMAC, it is vulnerable to a denial of service (DoS) attack via crash upon receiving a malformed ticket.

Node.js does not use SHA512 for session tickets and is therefore not impacted by this flaw.

**Assessment**: All versions of Node.js are believed to be **unaffected** by this vulnerability.

<a id="CVE-2016-2182"></a>

### [CVE-2016-2182](https://www.openssl.org/news/vulnerabilities.html#2016-2182): OOB write in BN\_bn2dec()

An out of bounds (OOB) write can occur in `BN_bn2dec()` if an application uses this function with an overly large `BIGNUM`. TLS is not affected because record limits will reject an oversized certificate before it is parsed.

**Assessment**: All versions of Node.js are believed to be **unaffected** by this vulnerability.

<a id="CVE-2016-2180"></a>

### [CVE-2016-2180](https://www.openssl.org/news/vulnerabilities.html#2016-2180): OOB read in TS\_OBJ\_print\_bio()

An out of bounds (OOB) read can occur when large OIDs are presented via `TS_OBJ_print_bio()`.

Node.js does not make use of the Time Stamp Authority functionality in OpenSSL and is therefore believed to be unaffected by this flaw.

**Assessment**: All versions of Node.js are believed to be **unaffected** by this vulnerability.

<a id="CVE-2016-2177"></a>

### [CVE-2016-2177](https://www.openssl.org/news/vulnerabilities.html#2016-2177): Pointer arithmetic undefined behavior

This programming flaw is described in the post at <https://www.openssl.org/blog/blog/2016/06/27/undefined-pointer-arithmetic/>.

It is unlikely that Node.js users are directly impacted by this.

**Assessment**: All versions of Node.js are believed to be **unaffected** by this vulnerability.

<a id="CVE-2016-2178"></a>

### [CVE-2016-2178](https://www.openssl.org/news/vulnerabilities.html#2016-2178): Constant time flag not preserved in DSA signing

A flaw in the OpenSSL DSA implementation means that a non-constant time codepath is followed for certain operations. This has been demonstrated through a cache-timing attack to be sufficient for an attacker to recover the private DSA key.

This is _very low_ severity for Node.js users due to the difficulty in taking advantage of this attack and because DSA is very rarely used.

**Assessment**: All versions of Node.js are **affected** by this vulnerability.

<a id="CVE-2016-2179"></a>

### [CVE-2016-2179](https://www.openssl.org/news/vulnerabilities.html#2016-2179): DTLS buffered message DoS

In a DTLS connection where handshake messages are delivered out-of-order, those messages that OpenSSL is not yet ready to process will be buffered for later use. This can be exploited to cause a denial of service (DoS) via memory exhaustion.

As Node.js does not support DTLS, users are not impacted by this flaw.

**Assessment**: All versions of Node.js are believed to be **unaffected** by this vulnerability.

<a id="CVE-2016-2179-1"></a>

### [CVE-2016-2179](https://www.openssl.org/news/vulnerabilities.html#2016-2179): DTLS replay protection DoS

A flaw in the DTLS replay attack protection mechanism that would allow an attacker to force a server to drop legitimate packets for a DTLS connection, resulting in a denial of service (DoS) for that connection.

As Node.js does not support DTLS, users are not impacted by this flaw.

**Assessment**: All versions of Node.js are believed to be **unaffected** by this vulnerability.

<a id="CVE-2016-6306"></a>

### [CVE-2016-6306](https://www.openssl.org/news/vulnerabilities.html#2016-6306): Certificate message OOB reads

Some missing message length checks can result in out of bounds (OOB) reads of up to 2 bytes beyond an allocated buffer. There is a theoretical denial of service (DoS) risk. This only impacts a client or a server which enables client authentication.

Node.js is impacted by this _low_ severity flaw.

**Assessment**: All versions of Node.js are **affected** by this vulnerability.

<a id="CVE-2016-6307"></a>

### [CVE-2016-6307](https://www.openssl.org/news/vulnerabilities.html#2016-6307): Excessive allocation of memory in tls\_get\_message\_header()

Excessive allocation of memory in OpenSSL 1.1.0 can be achieved by manipulating the length component of a TLS header.

Node.js is not yet dependent on OpenSSL 1.1.0 so it is not impacted by this flaw.

**Assessment**: All versions of Node.js are believed to be **unaffected** by this vulnerability.

<a id="CVE-2016-6308"></a>

### [CVE-2016-6308](https://www.openssl.org/news/vulnerabilities.html#2016-6308): Excessive allocation of memory in dtls1\_preprocess\_fragment()

A flaw that is similar to CVE-2016-6307 but impacting DTLS.

Node.js is not yet dependent on OpenSSL 1.1.0, nor does it implement DTLS, so it is not impacted by this flaw.

**Assessment**: All versions of Node.js are believed to be **unaffected** by this vulnerability.

## Contact and future updates

Please monitor the nodejs-sec Google Group for updates: <https://groups.google.com/forum/#!forum/nodejs-sec> or the Node.js website for release announcements: <https://nodejs.org/en/blog/>

The current Node.js security policy can be found at <https://github.com/nodejs/node/blob/HEAD/SECURITY.md#security>.

Please contact <security@nodejs.org> if you wish to report a vulnerability in Node.js.

Subscribe to the low-volume announcement-only nodejs-sec mailing list at <https://groups.google.com/forum/#!forum/nodejs-sec> to stay up to date on security vulnerabilities and security-related releases of Node.js and the projects maintained in the [nodejs GitHub organization](http://github.com/nodejs/).
