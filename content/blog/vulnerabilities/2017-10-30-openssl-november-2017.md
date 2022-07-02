---
title: OpenSSL update, 1.0.2m
blogAuthors: ['rvagg']
category: 'vulnerabilities'
---

## _(Update 8-Nov-2017)_ Node.js Releases

Releases were made available for active lines yesterday, each including the OpenSSL 1.0.2m update. As we have not categorized these strictly as _security_ releases they also contain other minor fixes and additions as per our regular release procedures.

While we don't consider OpenSSL 1.0.2m a _critical_ update, you should make plans to upgrade your deployments as soon as practical.

* [Node v4.8.6 "Argon" (Maintenance LTS)](https://nodejs.org/en/blog/release/v4.8.6/)
* [Node v6.12.0 "Boron" (Active LTS)](https://nodejs.org/en/blog/release/v6.12.0/)
* [Node v8.9.1 "Carbon" (Active LTS)](https://nodejs.org/en/blog/release/v8.9.1/)
* [Node v9.1.0 (Current)](https://nodejs.org/en/blog/release/v9.1.0/)

## _(Update 2-Nov-2017)_ Node.js Impact Assessment & Release Plan

The following impact assessment for Node.js of the flaws fixed in OpenSSL 1.0.2m has been provided by Shigeki Ohtsu from our crypto team. Original details about the announcement from the OpenSSL team can be found [below](#original_post).

### [CVE-2017-3735](https://www.openssl.org/news/vulnerabilities.html#2017-3735): OOB read parsing IPAdressFamily in an X.509 certificate

CVE-2017-3735 fixes buffer over-read in parsing X.509 certificates using extensions defined in RFC3779.

Node.js disables RFC3779 support by defining `OPENSSL_NO_RFC3779` during compile. It is therefore **unlikely that Node.js is impacted in any way by this vulnerability**.

### [CVE-2017-3736](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2017-3736): Carry propagating bug in the x86\_64 Montgomery squaring procedure

CVE-2017-3736 fixes a carry propagating bug in the x86\_64 [_Montgomery squaring_](https://en.wikipedia.org/wiki/Exponentiation_by_squaring#Montgomery.27s_ladder_technique) procedure.

> Analysis suggests that attacks against RSA and DSA as a result of this defect would be very difficult to perform and are not believed likely. Attacks against Diffie-Hellman are considered just feasible (although very difficult) because most of the work necessary to deduce information about a private key may be performed offline. The amount of resources required for such an attack would be very significant and likely only accessible to a limited number of attackers. An attacker would additionally need online access to an unpatched system using the target private key in a scenario with persistent Diffie-Hellman parameters and a private key that is shared between multiple clients.
> This only affects processors that support the BMI1, BMI2 and ADX extensions like Intel Broadwell (5th generation) and later or AMD Ryzen.

CVE-2017-3736 impacts Node.js users but the likelihood of successful attack using the flaw is **very low and we therefore deem it to be non-critical**.

### Additional fixes

OpenSSL 1.0.2m also includes two additional fixes that do not have a CVE assigned to them.

1. A [side channel attack of ECDSA](https://github.com/openssl/openssl/commit/23f7e974d59a576ad7d8cfd9f7ac957a883e361f) which appears too difficult to execute and can only obtain limited information about a private key.
2. A fix for [TLS servers with SNI enabled](https://github.com/openssl/openssl/commit/a92ca561bc91f4ebd2f53578e82058efcde61aed). Node.js does not use `SSL_set_SSL_CTX` in this context so is not impacted.

### Release plan

Due to the low impact and low severity of these fixes, we have decided _**not**_ to push urgent releases of Node.js this week. Releases of all active release lines are scheduled for next Tuesday, the 7th of November and these releases will all include OpenSSL 1.0.2m along with other regular Node.js patches and additions.

Our active release lines are:

* Node.js 4 LTS "Argon" (Maintenance LTS)
* Node.js 6 LTS "Boron" (Active LTS)
* Node.js 8 LTS "Carbon" (Active LTS)
* Node.js 9 (Current)

We will include an update here once all releases are made available.

<a id="original_post"></a>

_**Original post is included below**_

***

The OpenSSL project has [announced](https://mta.openssl.org/pipermail/openssl-announce/2017-October/000103.html) _(also see their [correction](https://mta.openssl.org/pipermail/openssl-announce/2017-October/000104.html))_ that they will be releasing versions 1.1.0g and 1.0.2m this week, on **Thursday the 2nd of November 2017, UTC**. The releases will fix one _"low severity security issue"_ and one _"moderate level security issue"_. "Moderate" level security issues for OpenSSL:

> ... includes issues like crashes in client applications, flaws in protocols that are less commonly used (such as DTLS), and local flaws.

Note that Node.js currently does not support or bundle OpenSSL 1.1.0, so we will focus entirely on 1.0.2m in this release.

Information about the "low" severity security issue is already [public](https://www.openssl.org/news/secadv/20170828.txt):

> **Malformed X.509 IPAddressFamily could cause OOB read (CVE-2017-3735)**
>
> If an X.509 certificate has a malformed IPAddressFamily extension, OpenSSL could do a one-byte buffer overread. The most likely result would be an erroneous display of the certificate in text format.
>
> As this is a low severity fix, no release is being made. The fix can be found in the source repository (1.0.2, 1.1.0, and master branches); see <https://github.com/openssl/openssl/pull/4276>. This bug has been present since 2006.

At this stage, due to embargo, it is uncertain what the nature of the "moderate" severity fix is, nor what impact it will have on Node.js users, if any. We will proceed as follows:

Within approximately 24 hours of the OpenSSL 1.0.2m release, our crypto team will make an impact assessment for Node.js users. This information _may_ vary depending for the different active release lines and will be posted here.

As part of that impact assessment we will announce our release plans for each of the active release lines to take into account any impact. **Please be prepared for the possibility of important updates to Node.js 4 "Argon", Node.js 6 "Boron", Node.js 8 "Carbon" and Node.js 9 (Current) as soon as Friday, the 3rd of November, 2017**.

If our assessment concludes that the OpenSSL "moderate" security issue has very low impact for Node.js users, the Node.js release team may decide to bundle this OpenSSL upgrade with the regular, planned Node.js releases for both LTS and Current release lines and not proceed with special security releases.

Please monitor the **nodejs-sec** Google Group for updates, including an impact assessment and updated details on release timing within approximately 24 hours after the OpenSSL release: <https://groups.google.com/forum/#!forum/nodejs-sec>

## Contact and future updates

The current Node.js security policy can be found at <https://github.com/nodejs/node/blob/HEAD/SECURITY.md#security>.

Please contact <security@nodejs.org> if you wish to report a vulnerability in Node.js.

Subscribe to the low-volume announcement-only nodejs-sec mailing list at <https://groups.google.com/forum/#!forum/nodejs-sec> to stay up to date on security vulnerabilities and security-related releases of Node.js and the projects maintained in the [nodejs GitHub organization](https://github.com/nodejs/).
