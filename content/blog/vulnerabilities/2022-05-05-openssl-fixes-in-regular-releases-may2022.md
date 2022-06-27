---
title: OpenSSL update assessment, and Node.js project plans
blogAuthors: ['node-js-website']
category: 'vulnerabilities'
---

## Summary

The OpenSSL Security releases of May 3 2022 affects Node.js 17.x and 18.x but highest serverity is "Low"

## Analysis

Our assessment of the [security advisory](https://mta.openssl.org/pipermail/openssl-announce/2022-May/000224.html) is:

### The `c_rehash` script allows command injection (CVE-2022-1292)

Node.js doesn't use or ship the `c_rehash` script. Therefore, Node.js is not affected

### `OCSP_basic_verify` may incorrectly verify the response signing certificate (CVE-2022-1343)

Node.js doesn't call `OCSP_basic_verify` with the custom flag `OCSP_NOCHECKS`. Node.js
is not affected.

### Incorrect MAC key used in the RC4-MD5 ciphersuite (CVE-2022-1434)

Node.js does not compile with `--enable-weak-ssl-ciphers`, therefore, Node.js is not affected.

### Resource leakage when decoding certificates and keys (CVE-2022-1473)

Node.js 17.x and 18.x are affected by this CVE which is rated "Low".

Given this assessment, the OpenSSL updates for Node.js will be delievered through the regular
Node.js release cycle with releases scheduled by the end of May.

### Contact and future updates

The current Node.js security policy can be found at <https://github.com/nodejs/node/blob/HEAD/SECURITY.md#security>,
including information on how to report a vulnerability in Node.js.

Subscribe to the low-volume announcement-only **nodejs-sec** mailing list at
<https://groups.google.com/forum/#!forum/nodejs-sec> to stay up to date on
security vulnerabilities and security-related releases of Node.js and the
projects maintained in the
[nodejs GitHub organization](https://github.com/nodejs).
