---
title: January 2021 Security Releases
blogAuthors: ['mhdawson']
category: 'vulnerabilities'
---

## _(Update 4-Jan-2021)_ Security releases available

Updates are now available for v10,x, v12.x, v14.x and v15.x Node.js release lines for the following issues.

In addition to the vulnerabilities listed below, these releases also include an update to npm in order to resolve an issue that was reported against npm by security scanners even though it was not vulnerable.

### use-after-free in TLSWrap (High) (CVE-2020-8265)

Affected Node.js versions are vulnerable to a use-after-free bug in its TLS implementation.
When writing to a TLS enabled socket, node::StreamBase::Write calls node::TLSWrap::DoWrite
with a freshly allocated WriteWrap object as first argument. If the DoWrite method
does not return an error, this object is passed back to the caller as part of a
StreamWriteResult structure. This may be exploited to corrupt memory leading to a Denial of Service or potentially other exploits.

Impacts:

* All versions of the 15.x, 14.x, 12.x and 10.x releases lines

Thank you to Felix Wilhelm from Google Project Zero for reporting this vulnerability.

### HTTP Request Smuggling in nodejs (Low) (CVE-2020-8287)

Affected versions of Node.js allow two copies of a header field in a http request. For example, two Transfer-Encoding header fields. In this case Node.js identifies the first header field and ignores the second. This can lead to HTTP Request Smuggling (<https://cwe.mitre.org/data/definitions/444.html>).

Impacts:

* All versions of the 15.x, 14.x, 12.x and 10.x releases lines

Thank you to niubl who works at TSRC(Tencent Security Response Center) for reporting this vulnerability

### OpenSSL - EDIPARTYNAME NULL pointer de-reference (CVE-2020-1971)

This is a vulnerability in OpenSSL which may be exploited through Node.js. You can read more about it in
<https://www.openssl.org/news/secadv/20201208.txt>

Impacts:

* All versions of the 14.x, 12.x and 10.x release lines
* Versions of the 15.x line before 15.5.0 which included an update to the latest OpenSSL.

## Downloads and release details

* [Node.js v10.23.1 (LTS)](https://nodejs.org/en/blog/release/v10.23.1/)
* [Node.js v12.20.1 (LTS)](https://nodejs.org/en/blog/release/v12.20.1/)
* [Node.js v14.15.4 (LTS)](https://nodejs.org/en/blog/release/v14.15.4/)
* [Node.js v15.5.1 (Current)](https://nodejs.org/en/blog/release/v15.5.1/)

***

## Summary

The Node.js project will release new versions of all supported release lines on or shortly after Monday January 4th, 2021.
These releases will fix:

* Two high severity issues
* One low severity issue

## Impact

The 15.x release line of Node.js is vulnerable to two high severity issues and one low severity issue.

The 14.x release line of Node.js is vulnerable to two high severity issues and one low severity issue.

The 12.x release line of Node.js is vulnerable to two high severity issues and one low severity issue.

The 10.x release line of Node.js is vulnerable to two high severity issues and one low severity issue.

## Release timing

Releases will be available at, or shortly after, Monday January 4th, 2021

## Contact and future updates

The current Node.js security policy can be found at <https://github.com/nodejs/node/blob/HEAD/SECURITY.md#security>. Please follow the process outlined in <https://github.com/nodejs/node/blob/master/SECURITY.md> if you wish to report a vulnerability in Node.js.

Subscribe to the low-volume announcement-only nodejs-sec mailing list at <https://groups.google.com/forum/#!forum/nodejs-sec> to stay up to date on security vulnerabilities and security-related releases of Node.js and the projects maintained in the nodejs GitHub organization.
