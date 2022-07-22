---
title: February 2019 Security Releases
blogAuthors: ['rvagg']
category: 'vulnerabilities'
---

_(Update 28-February-2018)_ **Security releases available**

## Summary

Updates are now available for all active Node.js release lines. In addition to fixes for security flaws in Node.js, they also include upgrades of Node.js 6 and 8 to OpenSSL 1.0.2r which contains a fix for a moderate severity security vulnerability. The original announcement is included below.

For these releases, we have decided to withhold the fix for the Misinterpretation of Input ([CWE-115](https://cwe.mitre.org/data/definitions/115.html)) flaw mentioned in the original announcement. This flaw is very low severity and we are not satisfied that we had a complete and stable fix ready for release. We will be seeking to address this flaw via alternate mechanisms in the near future. In addition, we have introduced an additional CVE for a change in Node.js 6 that we have decided to classify as a Denial of Service ([CWE-400](https://cwe.mitre.org/data/definitions/400.html)) flaw.

We recommend that all Node.js users upgrade to a version listed below as soon as possible.

## Downloads & release details

Downloads are available for the following versions. Details of code changes can also be found on each release page.

* [Node.js 11.10.1 (Current)](https://nodejs.org/en/blog/release/v11.10.1)
* [Node.js 10.15.2 (LTS "Dubnium")](https://nodejs.org/en/blog/release/v10.15.2)
* [Node.js 8.15.1 (LTS "Carbon")](https://nodejs.org/en/blog/release/v8.15.1)
* [Node.js 6.17.0 (LTS "Boron")](https://nodejs.org/en/blog/release/v6.17.0)

## Node.js: Slowloris HTTP Denial of Service with keep-alive (CVE-2019-5737)

_Categorization: Uncontrolled Resource Consumption / Denial of Service ([CWE-400](https://cwe.mitre.org/data/definitions/400.html))_

All actively supported release lines are vulnerable and the severity is LOW. An attacker can cause a Denial of Service (DoS) by establishing an HTTP or HTTPS connection in keep-alive mode and by sending headers very slowly thereby keeping the connection and associated resources alive for a long period of time. Attack potential is mitigated by the use of a load balancer or other proxy layer.

This vulnerability is an extension of CVE-2018-12122, addressed in [November, 2018](https://nodejs.org/en/blog/vulnerability/november-2018-security-releases/). The 40 second timeout and its adjustment by `server.headersTimeout` apply to this fix as in CVE-2018-12122.

CVE-2018-12122 originally reported by Jan Maybach ([liebdich.com](https://liebdich.com)), keep-alive variant reported by [Marco Pracucci](https://twitter.com/pracucci) ([Voxnest](https://voxnest.com)), fixed by [Matteo Collina](https://twitter.com/matteocollina).

**Impact:**

* All versions of Node.js 6 (LTS "Boron") **are** vulnerable
* All versions of Node.js 8 (LTS "Carbon") **are** vulnerable
* All versions of Node.js 10 (LTS "Dubnium") **are** vulnerable
* All versions of Node.js 11 (Current) **are** vulnerable

## Node.js: Denial of Service with keep-alive HTTP connections (CVE-2019-5739)

_Categorization: Uncontrolled Resource Consumption / Denial of Service ([CWE-400](https://cwe.mitre.org/data/definitions/400.html))_

Keep-alive HTTP and HTTPS connections can remain open and inactive for up to 2 minutes in Node.js 6.16.0 and earlier. Node.js 8.0.0 introduced a dedicated [`server.keepAliveTimeout`](https://nodejs.org/api/http.html#http_server_keepalivetimeout) which defaults to 5 seconds. The behavior in Node.js 6.16.0 and earlier is a potential Denial of Service (DoS) attack vector. Node.js 6.17.0 introduces `server.keepAliveTimeout` and the 5-second default.

The original fix was submitted by [Timur Shemsedinov](https://github.com/tshemsedinov) ([nodejs/node#2534](https://github.com/nodejs/node/pull/2534)) and backported by [Matteo Collina](https://twitter.com/matteocollina).

**Impact:**

* All versions of Node.js 6 (LTS "Boron") **are** vulnerable
* All versions of Node.js 8 (LTS "Carbon") **are NOT** vulnerable
* All versions of Node.js 10 (LTS "Dubnium") **are NOT** vulnerable
* All versions of Node.js 11 (Current) **are NOT** vulnerable

## OpenSSL: 0-byte record padding oracle (CVE-2019-1559)

_Severity: MODERATE_

OpenSSL 1.0.2r contains a fix for [CVE-2019-1559](https://www.openssl.org/news/secadv/20190226.txt) and is included in the releases for Node.js versions 6 and 8 only. Node.js 10 and 11 are not impacted by this vulnerability as they use newer versions of OpenSSL which do not contain the flaw.

Under certain circumstances, a TLS server can be forced to respond differently to a client if a zero-byte record is received with an invalid _padding_ compared to a zero-byte record with an invalid _MAC_. This can be used as the basis of a [padding oracle attack](https://en.wikipedia.org/wiki/Padding_oracle_attack) to decrypt data.

Only TLS connections using certain ciphersuites executing under certain conditions are exploitable. We are currently unable to determine whether the use of OpenSSL in Node.js exposes this vulnerability. We are taking a cautionary approach and recommend the same for users. For more information, see the [advisory](https://www.openssl.org/news/secadv/20190226.txt) and a [detailed write-up](https://github.com/RUB-NDS/TLS-Padding-Oracles) by the reporters of the vulnerability.

**Impact:**

* All versions of Node.js 6 (LTS "Boron") **are** vulnerable
* All versions of Node.js 8 (LTS "Carbon") **are** vulnerable
* All versions of Node.js 10 (LTS "Dubnium") **are NOT** vulnerable
* All versions of Node.js 11 (Current) **are NOT** vulnerable

## Acknowledgements

Matteo Collina for vulnerability fixes.

Shigeki Ohtsu and Sam Roberts for the OpenSSL upgrade.

Jan Maybach and Marco Pracucci for reporting vulnerabilities via the appropriate channels (see below).

Other members of the Node.js security team for reviews and discussion.

_**Original post is included below**_

## Summary

The Node.js project will release new versions of all supported release lines on, or shortly after, Wednesday, February 27th, 2019 UTC. These releases will incorporate at least two security fixes specific to Node.js, the highest severity of which is 'low'.

The OpenSSL project has announced [releases](https://mta.openssl.org/pipermail/openssl-announce/2019-February/000145.html) for the 26th which may impact some release lines of Node.js and require inclusion in our security releases. The highest severity indicated by OpenSSL is ['moderate'](https://www.openssl.org/policies/secpolicy.html#moderate) and impacts OpenSSL 1.0.2 which is used by Node.js 6.x and 8.x. A bug-fix release for OpenSSL 1.1.1 will also be made available and we will assess the impact, if any, on Node.js 11.x which uses this version. Node.js 10.x will not be impacted by the OpenSSL releases.

## Impact

Releases for all actively supported release lines will be made available to fix the following vulnerabilities.

All versions of **Node.js 6 (LTS "Boron")** are vulnerable to:

* 1 Uncontrolled Resource Consumption / Denial of Service ([CWE-400](https://cwe.mitre.org/data/definitions/400.html)) vulnerability
* 1 Misinterpretation of Input ([CWE-115](https://cwe.mitre.org/data/definitions/115.html)) vulnerability
* Possible update to OpenSSL 1.0.2r depending on assessed impact

All versions of **Node.js 8 (LTS "Carbon")** are vulnerable to:

* 1 Uncontrolled Resource Consumption / Denial of Service ([CWE-400](https://cwe.mitre.org/data/definitions/400.html)) vulnerability
* 1 Misinterpretation of Input ([CWE-115](https://cwe.mitre.org/data/definitions/115.html)) vulnerability
* Possible update to OpenSSL 1.0.2r depending on assessed impact

All versions of **Node.js 10 (LTS "Dubnium")** are vulnerable to:

* 1 Uncontrolled Resource Consumption / Denial of Service ([CWE-400](https://cwe.mitre.org/data/definitions/400.html)) vulnerability
* 1 Misinterpretation of Input ([CWE-115](https://cwe.mitre.org/data/definitions/115.html)) vulnerability

All versions of **Node.js 11 (Current)** are vulnerable to:

* 1 Uncontrolled Resource Consumption / Denial of Service ([CWE-400](https://cwe.mitre.org/data/definitions/400.html)) vulnerability
* 1 Misinterpretation of Input ([CWE-115](https://cwe.mitre.org/data/definitions/115.html)) vulnerability
* Possible update to OpenSSL 1.1.1b depending on assessed impact

## Release timing

Releases will be available at, or shortly after, Wednesday, February 27th, 2019 UTC, along with disclosure of the details for the flaws addressed in each release in order to allow for complete impact assessment by users.

## Contact and future updates

The current Node.js security policy can be found at <https://github.com/nodejs/node/blob/HEAD/SECURITY.md#security>.

Please contact <security@nodejs.org> if you wish to report a vulnerability in Node.js.

Subscribe to the low-volume announcement-only nodejs-sec mailing list at <https://groups.google.com/forum/#!forum/nodejs-sec> to stay up to date on security vulnerabilities and security-related releases of Node.js and the projects maintained in the [nodejs GitHub organization](https://github.com/nodejs/).
