---
title: August 2018 Security Releases
blogAuthors: ['rvagg']
category: 'vulnerabilities'
---

_(Update 16-August-2018)_ Security releases available

## Summary

Updates are now available for all active Node.js release lines. These include upgrades for OpenSSL and fixes for the vulnerabilities identified in the initial announcement (below).

We recommend that all users upgrade as soon as practical.

## Downloads & release details

Downloads are available for the following versions. Details of code changes can also be found on each release page.

* [Node.js 10.9.0 (Current)](https://nodejs.org/en/blog/release/v10.9.0)
* [Node.js 8.11.4 (LTS "Carbon")](https://nodejs.org/en/blog/release/v8.11.4)
* [Node.js 6.14.4 (LTS "Boron")](https://nodejs.org/en/blog/release/v6.14.4)

## OpenSSL: Client DoS due to large DH parameter ([CVE-2018-0732](https://www.openssl.org/news/secadv/20180612.txt))

All actively supported release lines of Node.js are impacted by this flaw. Patches are included in both OpenSSL 1.1.0i (Node.js 10) and 1.0.2p (Node.js 6 LTS "Boron" and Node.js 8 LTS "Carbon").

This fixes a potential denial of service (DoS) attack against _client_ connections by a malicious server. During a TLS communication handshake, where both client and server agree to use a cipher-suite using DH or DHE (Diffie–Hellman, in both ephemeral and non-ephemeral modes), a malicious server can send a very large prime value to the client. Because this has been unbounded in OpenSSL, the client can be forced to spend an unreasonably long period of time to generate a key, potentially causing a denial of service.

**Impact:**

* All previous versions of Node.js 6.x (LTS "Boron") **are** vulnerable
* All previous versions of Node.js 8.x (LTS "Carbon") **are** vulnerable
* All previous versions of Node.js 10.x (Current) **are** vulnerable

## Cache timing vulnerability in RSA Key Generation ([CVE-2018-0737](https://www.openssl.org/news/secadv/20180416.txt))

Node.js does not expose RSA key generation functionality. Therefore, **Node.js is not impacted by this vulnerability**.

## OpenSSL: ECDSA key extraction via local side-channel (CVE not assigned)

All actively supported release lines of Node.js are impacted by this flaw. Patches are included in both OpenSSL 1.1.0i (Node.js 10) and 1.0.2p (Node.js 6 LTS "Boron" and Node.js 8 LTS "Carbon").

Attackers with access to observe cache-timing may be able to extract DSA or ECDSA private keys by causing the victim to create several signatures and watching responses. This flaw does not have a CVE due to OpenSSL policy to not assign itself CVEs for local-only vulnerabilities that are more academic than practical. This vulnerability was discovered by [Keegan Ryan at NCC Group](https://www.nccgroup.trust/us/our-research/technical-advisory-return-of-the-hidden-number-problem/) and impacts many cryptographic libraries including OpenSSL.

**Impact:**

* All previous versions of Node.js 6.x (LTS "Boron") **are** vulnerable
* All previous versions of Node.js 8.x (LTS "Carbon") **are** vulnerable
* All previous versions of Node.js 10.x (Current) **are** vulnerable

## Unintentional exposure of uninitialized memory (CVE-2018-7166)

**Only Node.js 10 is impacted by this flaw. Our previous announcement wrongly stated that all release lines were vulnerable.**

Node.js TSC member Сковорода Никита Андреевич (Nikita Skovoroda / [@ChALkeR](https://github.com/chalker)) discovered an argument processing flaw that causes `Buffer.alloc()` to return uninitialized memory. This method is intended to be safe and only return initialized, or cleared, memory. The third argument specifying `encoding` can be passed as a number, this is misinterpreted by `Buffer`'s internal "fill" method as the `start` to a fill operation. This flaw may be abused where `Buffer.alloc()` arguments are derived from user input to return uncleared memory blocks that may contain sensitive information.

**Impact:**

* All versions of Node.js 6.x (LTS "Boron") **are NOT** vulnerable
* All versions of Node.js 8.x (LTS "Carbon") **are NOT** vulnerable
* All previous versions of Node.js 10.x (Current) **are** vulnerable

## Out of bounds (OOB) write (CVE-2018-12115)

All actively supported release lines of Node.js are impacted by this flaw.

Node.js TSC member Сковорода Никита Андреевич (Nikita Skovoroda / [@ChALkeR](https://github.com/chalker)) discovered an OOB write in `Buffer` that can be used to write to memory outside of a `Buffer`'s memory space. This can corrupt unrelated `Buffer` objects or cause the Node.js process to crash.

When used with UCS-2 encoding (recognized by Node.js under the names `'ucs2'`, `'ucs-2'`, `'utf16le'` and `'utf-16le'`), `Buffer#write()` can be abused to write outside of the bounds of a single `Buffer`. Writes that start from the second-to-last position of a buffer cause a miscalculation of the maximum length of the input bytes to be written.

**Impact:**

* All previous versions of Node.js 6.x (LTS "Boron") **are** vulnerable
* All previous versions of Node.js 8.x (LTS "Carbon") **are** vulnerable
* All previous versions of Node.js 10.x (Current) **are** vulnerable

_**Original post is included below**_

## Summary

The Node.js project will be releasing new versions for each of its supported release lines on, or shortly after, the 15th of August, 2018 (UTC). These releases will incorporate a number of security fixes and an upgraded version of OpenSSL.

We consider all of the flaws being addressed in these releases to be _low severity_. However, users should assess the severity of the impact on their own applications using the information disclosed here and the additional disclosure that will come with the releases.

## OpenSSL 1.1.0i and 1.0.2p

The OpenSSL team [have announced](https://mta.openssl.org/pipermail/openssl-announce/2018-August/000129.html) that OpenSSL 1.1.0i and 1.0.2p will be made available on the 14th of August, 2018. There will be three "LOW severity" security fixes in this release that have already been disclosed, and the fixes made available on the OpenSSL git repository. Two of these items are relevant to Node.js users:

* OpenSSL: Client DoS due to large DH parameter ([CVE-2018-0732](https://www.openssl.org/news/secadv/20180612.txt))
* OpenSSL: ECDSA key extraction via local side-channel (CVE not assigned)

**Impact:**

* All versions of Node.js 6.x (LTS "Boron") **are** impacted via OpenSSL 1.0.2
* All versions of Node.js 8.x (LTS "Carbon") **are** impacted via OpenSSL 1.0.2
* All versions of Node.js 10.x (Current) **are** impacted via OpenSSL 1.1.0

## Node.js security inclusions

* Unintentional exposure of uninitialized memory (CVE-2018-7166)
* Out of bounds (OOB) write (CVE-2018-12115)

**All actively supported release lines of Node.js are impacted by these flaws.**

## Additional inclusions

We will also be including the following items in these releases for LTS release lines:

* [inspector: don't bind to 0.0.0.0 by default (v6.x) #21376](https://github.com/nodejs/node/pull/21376): impacts Node.js 6.x (LTS "Boron") only
* [test: update keys/Makefile to clean and build all #19975](https://github.com/nodejs/node/pull/19975): impacts the test suite for all actively supported release lines of Node.js

The Node.js 10 "Current" release will _not_ be limited to only security-related updates, as per policy for non-LTS release lines.

## Release timing

Releases will be available at, or shortly after, the 15th of August, 2018 (UTC), along with disclosure of details of the flaws addressed in order to allow for complete impact assessment by users.

## Contact and future updates

The current Node.js security policy can be found at <https://github.com/nodejs/node/blob/HEAD/SECURITY.md#security>.

Please contact <security@nodejs.org> if you wish to report a vulnerability in Node.js.

Subscribe to the low-volume announcement-only nodejs-sec mailing list at <https://groups.google.com/forum/#!forum/nodejs-sec> to stay up to date on security vulnerabilities and security-related releases of Node.js and the projects maintained in the [nodejs GitHub organization](https://github.com/nodejs/).
