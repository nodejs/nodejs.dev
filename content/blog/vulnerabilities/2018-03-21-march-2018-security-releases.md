---
title: March 2018 Security Releases
blogAuthors: ['rvagg']
category: 'vulnerabilities'
---

# _(Update 28-March-2018)_ Security releases available

## Summary

Updates are now available for all active Node.js release lines. These include the fix for the vulnerabilities identified in the initial announcement (below).

In addition to the vulnerabilities in the initial announcement, we have also included a fix for a vulnerability in the Node.js inspector functionality. This is described in detail below.

We recommend that all users upgrade as soon as possible.

## Downloads & release details

* [Node.js 9.10.0 (Current)](https://nodejs.org/en/blog/release/v9.10.0)
* [Node.js 8.11.0 (LTS "Carbon")](https://nodejs.org/en/blog/release/v8.11.0)
* [Node.js 6.14.0 (LTS "Boron")](https://nodejs.org/en/blog/release/v6.14.0)
* [Node.js 4.9.0 (LTS "Argon")](https://nodejs.org/en/blog/release/v4.9.0)

## OpenSSL 1.0.2o

OpenSSL version 1.0.2o was released this week. It fixed a [flaw that primarily relates to PKCS#7](https://www.openssl.org/news/vulnerabilities.html#CVE-2018-0739) that may be used to cause a denial of service (DoS) attack (CVE-2018-0739). As PKCS#7 is not currently supported by Node.js and this flaw does not impact SSL/TLS functionality, our crypto team do not believe this has any impact on Node.js users.

OpenSSL 1.0.2o also contains a small number of code changes that are part of the OpenSSL project's continued code cleanup efforts. It is included in the releases for all Node.js release lines regardless of security impact.

## Node.js Inspector DNS rebinding vulnerability (CVE-2018-7160)

Node.js 6.x and later include a [debugger protocol](https://nodejs.org/en/docs/inspector/) (also known as "inspector") that can be activated by the `--inspect` and related command line flags. This debugger service was vulnerable to a [DNS rebinding attack](https://en.wikipedia.org/wiki/DNS_rebinding) which could be exploited to perform remote code execution.

The attack was possible from malicious websites open in a web browser on the same computer, or another computer with network access to the computer running the Node.js process. A malicious website could use a DNS rebinding attack to trick the web browser to bypass [same-origin-policy](https://en.wikipedia.org/wiki/Same-origin_policy) checks and to allow HTTP connections to localhost or to hosts on the local network. If a Node.js process with the debug port active is running on localhost or on a host on the local network, the malicious website could connect to it as a debugger, and get full code execution access.

We updated the inspector implementation with an additional check for the browser provided `Host` header. If the connection is via a hostname, i.e. subject to DNS resolution, we ensure that the connection is to either `localhost` or `localhost6` precisely.

Note that this mitigation may affect some remote debugging scenarios. For example it may no longer be possible to debug a remote computer by using a hostname. Either connect using the IP address or use an ssh-tunnel to work around this additional security check. This change is therefore a _"breaking change"_, however, as per the [Node.js release plan](https://github.com/nodejs/release#release-plan), we are including this as a security fix on all impacted release lines as a **semver-minor** rather than semver-major increment.

Node.js versions 4.x were _not_ vulnerable as the inspector debug protocol is not available in that release line.

The severity of this vulnerability is HIGH due to remote code execution risk. However, the impact should be limited to environments (e.g. development) where debuggers are typically used.

This vulnerability was reported by Timo Schmid.

## `'path'` module regular expression denial of service (CVE-2018-7158)

The `'path'` module in the **Node.js 4.x** release line contains a potential regular expression denial of service ([ReDoS](https://en.wikipedia.org/wiki/ReDoS)) vector. The code in question was replaced in Node.js 6.x and later so this vulnerability only impacts all versions of Node.js 4.x.

The regular expression, `splitPathRe`, used within the `'path'` module for the various path parsing functions, including `path.dirname()`, `path.extname()` and `path.parse()` was structured in such a way as to allow an attacker to craft a string, that when passed through one of these functions, could take a significant amount of time to evaluate, potentially leading to a full denial of service.

We have determined the security risk of this vulnerability to Node.js users to be HIGH and recommend upgrading your Node.js 4.x installations as soon as possible.

This vulnerability was reported by James Davis of Virginia Tech.

## Spaces in HTTP `Content-Length` header values are ignored (CVE-2018-7159)

The HTTP parser in all current versions of Node.js ignores spaces in the `Content-Length` header, allowing input such as `Content-Length: 1 2` to be interpreted as having a value of `12`. The HTTP specification does not allow for spaces in the `Content-Length` value and the Node.js HTTP parser has been brought into line on this particular difference.

We have determined the security risk of this flaw to Node.js users to be VERY LOW as it is difficult, and may be impossible, to craft an attack that makes use of this flaw in a way that could not already be achieved by supplying an incorrect value for `Content-Length`. Vulnerabilities may exist in user-code that make incorrect assumptions about the potential accuracy of this value compared to the actual length of the data supplied. Node.js users crafting lower-level HTTP utilities are advised to re-check the length of any input supplied after parsing is complete.

This change is a _"breaking change"_ as `Content-Length` values containing internal spaces are now rejected in the same way that non-numeric values are rejected. However, as per the [Node.js release plan](https://github.com/nodejs/release#release-plan), we are including this as a security fix on all release lines as a **semver-minor** rather than semver-major increment.

This flaw was reported by Сковорода Никита Андреевич (Nikita Skovoroda / [@ChALkeR](https://github.com/chalker))

## Update root certificates

All releases also include an update to the root certificates that are bundled in the Node.js binary. This includes 8 new additional certificates and the removal of 30 certificates. Details are available in on the public Node.js repository at <https://github.com/nodejs/node/pull/19322>.

Node.js uses Mozilla's [NSS](https://wiki.mozilla.org/NSS) root certificate database. Certificates are regularly added to and removed from this database. Occasionally, certificates are revoked due to compliance or trust concerns, as is the case for the [WoSign / StartCom](https://wiki.mozilla.org/CA:WoSign_Issues) certificates that are being removed in this update.

Please note that the [`NODE_EXTRA_CA_CERTS`](https://nodejs.org/docs/latest-v4.x/api/cli.html#cli_node_extra_ca_certs_file) environment variable may be used to add back in certificates that have been removed if required (although this is not advised). In addition the `ca` option may be used when creating TLS or HTTPS servers to provide a custom list of trusted certificates.

This update was submitted by Ben Noordhuis.

_**Original post is included below**_

***

## Summary

The Node.js project will be releasing new versions for each of its supported release lines on, or shortly after, the 27th of March, 2018 (UTC). These releases will incorporate a number of security fixes and will also likely include an upgraded version of OpenSSL.

## Inclusions

### OpenSSL 1.0.2o

The OpenSSL team [have announced](https://mta.openssl.org/pipermail/openssl-announce/2018-March/000116.html) that OpenSSL 1.0.2o will be made available on the 27th of March, 2018. The highest severity issue fixed in these releases is MODERATE. According to the [OpenSSL Security Policy](https://www.openssl.org/policies/secpolicy.html), this classification is defined as follows:

> MODERATE Severity. This includes issues like crashes in client applications, flaws in protocols that are less commonly used (such as DTLS), and local flaws. These will in general be kept private until the next release, and that release will be scheduled so that it can roll up several such flaws at one time.

This post will be updated with a Node.js impact assessment for the flaws addressed in this OpenSSL release. However, regardless of severity, all actively supported Node.js release lines will likely receive an upgrade from OpenSSL 1.0.2n to 1.0.2o.

**Impact:**

* All versions of Node.js 4.x (LTS "Argon") **are** impacted
* All versions of Node.js 6.x (LTS "Boron") **are** impacted
* All versions of Node.js 8.x (LTS "Carbon") **are** impacted
* All versions of Node.js 9.x (Current) **are** impacted

### Denial of service (DoS) vulnerability

All versions of 4.x are vulnerable to a flaw that can be used by an external attacker to cause a denial of service (DoS). The severity of this vulnerability is HIGH, users of the impacted versions should plan to upgrade when a fix is made available.

**Impact:**

* All versions of Node.js 4.x (LTS "Argon") **are** vulnerable
* All versions of Node.js 6.x (LTS "Boron") **are NOT** vulnerable
* All versions of Node.js 8.x (LTS "Carbon") **are NOT** vulnerable
* All versions of Node.js 9.x (Current) **are NOT** vulnerable

### HTTP parsing flaw

All versions of Node.js contain a flaw in their HTTP parser whereby a malformed HTTP request may be misinterpreted. The security impact of this flaw is minimal and therefore the severity is VERY LOW. The impact relates to usability concerns but we are currently not aware of practical uses of this flaw to attack well-constructed HTTP servers.

**Impact:**

* All versions of Node.js 4.x (LTS "Argon") **are** vulnerable
* All versions of Node.js 6.x (LTS "Boron") **are** vulnerable
* All versions of Node.js 8.x (LTS "Carbon") **are** vulnerable
* All versions of Node.js 9.x (Current) **are** vulnerable

### Update root certificates

All releases will also include an update to the root certificates that are bundled in the Node.js binary. This includes 5 new additional certificates and the removal of 30 certificates. Details are available in on the public Node.js repository at <https://github.com/nodejs/node/pull/19322>.

Please note that the [`NODE_EXTRA_CA_CERTS`](https://nodejs.org/docs/latest-v4.x/api/cli.html#cli_node_extra_ca_certs_file) environment variable may be used to add back in certificates that have been removed if required (although this is not advised). In addition, the `ca` option may be used when creating TLS or HTTPS servers to provide a custom list of trusted certificates.

## Regarding Node.js 4.x (LTS "Argon")

Please be aware that according to the Node.js [release schedule](https://github.com/nodejs/release#release-schedule), support for Node.js 4.x (LTS "Argon") will cease on the 30th of April. As this release line is in "Maintenance" and therefore receives minimal updates, this upcoming release of Node.js 4.x may be the final version for that release line.

If you have not already migrated from Node.js 4.x to a later release line, please do so at your earliest convenience. The Node.js team recommends adopting either Node.js 6.x (LTS "Boron") or Node.js 8.x (LTS "Carbon").

## Release timing

Releases will be available at, or shortly after, the 27th of March, 2018 (UTC), along with disclosure of the details for the flaws addressed in each release in order to allow for complete impact assessment by users.

## Contact and future updates

The current Node.js security policy can be found at <https://github.com/nodejs/node/blob/HEAD/SECURITY.md#security>.

Please contact <security@nodejs.org> if you wish to report a vulnerability in Node.js.

Subscribe to the low-volume announcement-only nodejs-sec mailing list at <https://groups.google.com/forum/#!forum/nodejs-sec> to stay up to date on security vulnerabilities and security-related releases of Node.js and the projects maintained in the [nodejs GitHub organization](https://github.com/nodejs/).
