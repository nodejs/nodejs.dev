---
title: February 2021 Security Releases
blogAuthors: ['node-js-website']
category: 'vulnerabilities'
---

## _(Update 23-Feb-2021)_ Security releases available

Updates are now available for v10.x, v12.x, v14.x and v15.x Node.js release lines for the following issues.

### HTTP2 'unknownProtocol' cause Denial of Service by resource exhaustion (Critical) (CVE-2021-22883)

Affected Node.js versions are vulnerable to denial of service attacks when too many connection attempts with an 'unknownProtocol' are established. This leads to a leak of file descriptors. If a file descriptor limit is configured on the system, then the server is unable to accept new connections and prevent the process also from opening, e.g. a file. If no file descriptor limit is configured, then this lead to an excessive memory usage and cause the system to run out of memory.

Impacts:

* All versions of the 15.x, 14.x, 12.x and 10.x releases lines

Thank you to OMICRON electronics for reporting this vulnerability.

### DNS rebinding in --inspect (CVE-2021-22884)

Affected Node.js versions are vulnerable to a DNS rebinding attack when the whitelist includes “localhost6”. When “localhost6” is not present in /etc/hosts, it is just an ordinary domain that is resolved via DNS, i.e., over network. If the attacker controls the victim's DNS server or can spoof its responses, the DNS rebinding protection can be bypassed by using the “localhost6” domain. As long as the attacker uses the “localhost6” domain, they can still apply the attack described in CVE-2018-7160.

Impacts:

* All versions of the 15.x, 14.x, 12.x and 10.x releases lines

Thank you to Vít Šesták for reporting this vulnerability

### OpenSSL - Integer overflow in CipherUpdate (CVE-2021-23840)

This is a vulnerability in OpenSSL which may be exploited through Node.js. You can read more about it in
<https://www.openssl.org/news/secadv/20210216.txt>

Impacts:

* All versions of the 15.x, 14.x, 12.x and 10.x releases lines

## Downloads and release details

* [Node.js v10.24.0 (LTS)](https://nodejs.org/en/blog/release/v10.24.0/)
* [Node.js v12.21.0 (LTS)](https://nodejs.org/en/blog/release/v12.21.0/)
* [Node.js v14.16.0 (LTS)](https://nodejs.org/en/blog/release/v14.16.0/)
* [Node.js v15.10.0 (Current)](https://nodejs.org/en/blog/release/v15.10.0/)
