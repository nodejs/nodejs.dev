---
title: June 2020 Security Releases
blogAuthors: ['node-js-website']
category: 'vulnerabilities'
---

## _(Update 2-June-2020)_ Security releases available

Updates are now available for all supported Node.js release lines for the following
issues.

### TLS session reuse can lead to host certificate verification bypass (High) (CVE-2020-8172)

The 'session' event could be emitted before the 'secureConnect' event. It should not be, because the connection may fail to be authorized. If it was saved an authorized connection could be established later with the session ticket. Note that the `https` agent caches sessions, so is vulnerable to this.

The 'session' event will now only be emitted after the 'secureConnect' event, and only for authorized connections.

Affects Node.js 12.x, and 14.x. Does _not_ affect Node.js 10.x.

### HTTP/2 Large Settings Frame DoS (Low) (CVE-2020-11080)

Receiving unreasonably large HTTP/2 SETTINGS frames can consume 100% CPU to process all the settings, blocking all other activities until complete.

The HTTP/2 session frame is limited to 32 settings by default. This can be configured if necessary using the `maxSettings` option.

Thank you to Jordan Zebor and Adam Cabrey of F5 Networks for reporting this.

Affects Node.js 10.x, 12.x, and 14.x.

### `napi_get_value_string_*()` allows various kinds of memory corruption (High) (CVE-2020-8174)

Calling `napi_get_value_string_latin1()`, `napi_get_value_string_utf8()`, or `napi_get_value_string_utf16()` with a non-NULL `buf`, and a `bufsize` of `0` will cause the entire string value to be written to `buf`, probably overrunning the length of the buffer.

A exploit has not been reported and it may be difficult but the following is suggested:

* All users of LTS Node.js versions should update to the versions announced in this security post. This will address the issue for any non pre-built add-on.
* Maintainers who support EOL Node.js versions and/or build against a version of Node.js that did not support N-API internally should update to use the new versions of node-addon-api 1.x and 2.x that will be released soon after this announcement.

Affects Node.js 10.x, 12.x, and 14.x.

Affects <https://www.npmjs.com/package/node-addon-api> 1.x, 2.x when a native add-on is/was built using a version of Node.js that did not support N-API internally.  The [N-API version matrix](https://github.com/nodejs/node/blob/master/doc/api/n-api.md#n-api-version-matrix) shows which versions of Node.js in which this support was added.

### `ICU-20958 Prevent SEGV_MAPERR in append` (High) (CVE-2020-10531)

An issue was discovered in International Components for Unicode (ICU) for C/C++
through 66.1. An integer overflow, leading to a heap-based buffer overflow,
exists in the UnicodeString::doAppend() function in common/unistr.cpp.

Fix was applied to 10.x in an abundance of caution, even though there is no
known way to trigger the overflow in 10.x.

Does not affect 12.x or 14.x, they do not include an affected version of ICU.

## Downloads & release details

* [Node.js v10.21.0 (LTS)](https://nodejs.org/en/blog/release/v10.21.0/)
* [Node.js v12.18.0 (LTS)](https://nodejs.org/en/blog/release/v12.18.0/)
* [Node.js v14.4.0 (Current)](https://nodejs.org/en/blog/release/v14.4.0/)

***

## Summary

The Node.js project will release security updates to all supported release lines on or shortly after Tuesday, June 2nd, 2020.

The highest severity fix will be "High".

## Impact

All supported versions (10.x, 12.x, and 14.x) of Node.js are vulnerable. Note that 13.x will be end-of-life on June 1st, before the security release date, and according to policy it will _**not**_ receive any more updates.

## Release timing

Releases will be available on or shortly after Tuesday, June 2nd, 2020.

## Contact and future updates

The current Node.js security policy can be found at <https://github.com/nodejs/node/blob/HEAD/SECURITY.md#security>. Please follow the process outlined in <https://github.com/nodejs/node/blob/master/SECURITY.md> if you wish to report a vulnerability in Node.js.

Subscribe to the low-volume announcement-only nodejs-sec mailing list at <https://groups.google.com/forum/#!forum/nodejs-sec> to stay up to date on security vulnerabilities and security-related releases of Node.js and the projects maintained in the nodejs GitHub organization.
