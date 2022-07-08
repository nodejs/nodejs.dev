---
title: OpenSSL security releases do not require Node.js security releases
blogAuthors: ['node-js-website']
category: 'vulnerabilities'
---

### Update

The OpenSSL project has released a description of the issue fixed in the
OpenSSL 1.1.1g update. It only affects a function which is _not called_
by Node.js (or its dependencies), and as such, does not affect Node.js.

No Node.js security releases are required.

For more information, see the OpenSSL
[announcement](https://www.openssl.org/news/secadv/20200421.txt).

The previous Node.js announcement can be found below.

### Summary

The Node.js project may be releasing new versions across all of its supported
release lines early next week to incorporate upstream patches from OpenSSL.
Please read on for full details.

### OpenSSL

The OpenSSL project
[announced](https://mta.openssl.org/pipermail/openssl-announce/2020-April/000170.html)
this week that they will be releasing version 1.1.1g on the 21st of
April. The highest severity issue that will be fixed in the release
is "HIGH" severity under their
[security policy](https://www.openssl.org/policies/secpolicy.html),
meaning they are:

> ... issues that are of a lower risk than critical, perhaps due to affecting
> less common configurations, or which are less likely to be exploitable.

All supported versions of Node.js use OpenSSL v1.1.1, therefore all active
release lines are impacted by this update: v10.x, v12.x, v13.x, and v14.x (
14.0.0 is to be released on the 21st of April, by coincidence).

At this stage, due to embargo, the exact nature of these defects is uncertain
as well as the impact they will have on Node.js users.

After assessing the impact on Node.js, it will be decided whether the issues
fixed require immediate security releases of Node.js, or whether they can be
included in the normally scheduled updates.

Please monitor the **nodejs-sec** Google Group for updates, including a
decision within 24 hours after the OpenSSL release regarding release timing,
and full details of the defects upon eventual release:
<https://groups.google.com/forum/#!forum/nodejs-sec>

### Contact and future updates

The current Node.js security policy can be found at <https://github.com/nodejs/node/blob/HEAD/SECURITY.md#security>,
including information on how to report a vulnerability in Node.js.

Subscribe to the low-volume announcement-only **nodejs-sec** mailing list at
<https://groups.google.com/forum/#!forum/nodejs-sec> to stay up to date on
security vulnerabilities and security-related releases of Node.js and the
projects maintained in the
[nodejs GitHub organization](https://github.com/nodejs).
