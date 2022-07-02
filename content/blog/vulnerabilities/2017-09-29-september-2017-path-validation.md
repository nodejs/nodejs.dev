---
title: Path validation vulnerability, September 2017
blogAuthors: ['mhdawson']
category: 'vulnerabilities'
---

# Path Validation Vulnerability _(Updated 29-September-2017 - CVE assigned)_

The Node.js project released a new version of 8.x this week which incorporates
a security fix.

## Impact

Version 8.5.0 of Node.js is vulnerable.
4.x and 6.x versions are **NOT** vulnerable.

## Downloads

[Node.js 8 (Current)](https://nodejs.org/en/blog/release/v8.6.0/)

## Node.js-specific security flaws

Node.js version 8.5.0 included a change which caused a security vulnerability
in the checks on paths made by some community modules. As a result, an
attacker may be able to access file system paths other than those intended.

This problem was resolved within Node.js by partially reverting
<https://github.com/nodejs/node/commit/b98e8d995efb426bbdee56ce503017bdcbbc6332>.

A CVE has been assigned as [CVE-2017-14849](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2017-14849)

## Contact and future updates

The current Node.js security policy can be found at <https://github.com/nodejs/node/blob/HEAD/SECURITY.md#security>.

Please contact <security@nodejs.org> if you wish to report a vulnerability in Node.js.

Subscribe to the low-volume announcement-only nodejs-sec mailing list at
<https://groups.google.com/forum/#!forum/nodejs-sec> to stay up to date
on security vulnerabilities and security-related releases of Node.js
and the projects maintained in the [nodejs GitHub organization](https://github.com/nodejs/).
