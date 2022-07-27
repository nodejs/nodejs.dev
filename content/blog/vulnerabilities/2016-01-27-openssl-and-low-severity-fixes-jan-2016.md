---
title: OpenSSL upgrade low-severity Node.js security fixes
blogAuthors: ['rvagg']
category: 'vulnerabilities'
---

_**(Updates to this post, including a schedule change are included below)**_

### Summary

The Node.js project will be releasing new versions across all of its active release lines early next week (possibly sooner, pending full impact assessment) to incorporate upstream patches from OpenSSL and some additional low-severity fixes relating to HTTP handling. Please read on for full details.

### OpenSSL

The OpenSSL project [announced](https://mta.openssl.org/pipermail/openssl-announce/2016-January/000058.html) this week that they will be releasing versions 1.0.2f and 1.0.1r on the 28th of January, UTC. The releases will fix two security defects that are labelled as "high" severity under their [security policy](https://www.openssl.org/policies/secpolicy.html), meaning they are:

> ... issues that are of a lower risk than critical, perhaps due to affecting less common configurations, or which are less likely to be exploitable.

Node.js v0.10 and v0.12 both use OpenSSL v1.0.1 and Node.js v4 and v5 both use OpenSSL v1.0.2 and are normally statically compiled. Therefore, all active release lines are impacted by this update.

At this stage, due to embargo, the exact nature of these defects is uncertain as well as the impact they will have on Node.js users.

### Low-severity Node.js security fixes

In addition, we have some fixes to release relating to Node.js HTTP processing. We categorise these as low-severity and are not aware of any existing exploits leveraging the defects. Full details are embargoed until new releases are available.

Common Vulnerability Scoring System (CVSS) v3 Base Score:

| Metric                      | Score                                                                                                                                  |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Base Score:**             | **4.8 (Medium)**                                                                                                                       |
| **Base Vector:**            | [CVSS:3.0/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:L/A:N](https://www.first.org/cvss/calculator/3.0#CVSS:3.0/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:L/A:N) |
| **Attack Vector:**          | Network (AV:N)                                                                                                                         |
| **Attack Complexity:**      | High (AC:H)                                                                                                                            |
| **Privileges Required:**    | None (PR:N)                                                                                                                            |
| **User Interaction:**       | None (UI:N)                                                                                                                            |
| **Scope of Impact:**        | Unchanged (S:U)                                                                                                                        |
| **Confidentiality Impact:** | Low (C:L)                                                                                                                              |
| **Integrity Impact:**       | Low (I:L)                                                                                                                              |
| **Availability Impact:**    | None (A:N)                                                                                                                             |

Refer to the [CVSS v3 Specification](https://www.first.org/cvss/specification-document) for details on the meanings and application of the vector components.

### Impact

Both the OpenSSL updates and the Node.js fixes affect all actively maintained release lines of Node.js.

* Versions 0.10.x of Node.js **are affected**.
* Versions 0.12.x of Node.js **are affected**.
* Versions 4.x, including LTS Argon, of Node.js **are affected**.
* Versions 5.x of Node.js **are affected**.

### Release timing

As the OpenSSL release is planned for late in the week, we are currently planning on deferring Node.js releases until early next week due to the complexity of the upgrade process and a preference for not releasing security fixes at the end of the work-week or on the weekend.

Releases will be available at, or shortly after, **Monday the 1st of February, 11pm UTC** _(Monday the 1st of February, 3pm Pacific Time)_ along with disclosure of the details defects to allow for complete impact assessment by users.

However, when details of the OpenSSL defects are released on the 28th, our crypto team will be making a more detailed assessment on the likely severity for Node.js users. In the event that the team determines that the fixes are critical in nature for Node.js users **we may choose to expedite releases for Friday or Saturday** in order to ensure that users have the ability to protect their deployments against a disclosed vulnerability.

Please monitor the **nodejs-sec** Google Group for updates, including a decision within 24 hours after the OpenSSL release regarding release timing, and full details of the defects upon eventual release: <https://groups.google.com/forum/#!forum/nodejs-sec>

### Contact and future updates

The current Node.js security policy can be found at <https://github.com/nodejs/node/blob/HEAD/SECURITY.md#security>.

Please contact <security@nodejs.org> if you wish to report a vulnerability in Node.js.

Subscribe to the low-volume announcement-only **nodejs-sec** mailing list at <https://groups.google.com/forum/#!forum/nodejs-sec> to stay up to date on security vulnerabilities and security-related releases of Node.js and the projects maintained in the [nodejs GitHub organization](https://github.com/nodejs).

## _(Update 29-Jan-2016)_ OpenSSL Impact Assessment

OpenSSL versions 1.0.1r and 1.0.21 have been released, the announcement can be found here: <https://mta.openssl.org/pipermail/openssl-announce/2016-January/000061.html>

Our team has made an assessment of the impact of the disclosed defects and concluded that there is no urgency in releasing patched versions of Node.js in response to this release. Therefore, we will be proceeding as planned and attempt to release new versions of each of our active release lines on or after
**Monday the 1st of February, 11pm UTC** _(Monday the 1st of February, 3pm Pacific Time)_. Please note that this is simply an approximation of release timing. Please tune in to **nodejs-sec** (<https://groups.google.com/forum/#!forum/nodejs-sec>) where we will announce the availability of releases.

### Details

**DH small subgroups (CVE-2016-0701)**

Node.js v0.10 and v0.12 are not affected by this defect.

Node.js v4 and v5 use the `SSL_OP_SINGLE_DH_USE` option already and are therefore not affected by this defect.

**SSLv2 doesn't block disabled ciphers (CVE-2015-3197)**

Node.js v0.10 and v0.12 disable SSLv2 by default and are not affected _unless_ the `--enable-ssl2` command line argument is being used (not recommended).

Node.js v4 and v5 do not support SSLv2.

**An update on DHE man-in-the-middle protection (Logjam)**

Previous releases of OpenSSL (since Node.js v0.10.39, v0.12.5, v4.0.0 and v5.0.0) mitigated against [Logjam](https://en.wikipedia.org/wiki/Logjam_%28computer_security%29) for TLS _clients_ by rejecting connections from servers where Diffie-Hellman parameters were shorter than 768-bits.

The new OpenSSL release, for all Node.js lines, increases this to 1024-bits. The change only impacts TLS clients connecting to servers with weak DH parameter lengths.

<a id="_-update-29-jan-2016-_-openssl-impact-assessment"></a>

## _(Update 30-Jan-2016)_ Release postponement

The announced security releases will not go ahead for the 1st of February as previously announced. Instead, our new target for release will be on or shortly after **Tuesday, the 9th of February, 11pm UTC** _(Tuesday, the 9th of February, 3pm Pacific Time)_.

The planned fixes include a backward-incompatible change that, under normal circumstances, would be deferred until the next major-version of Node.js, v6. However, because the fix addresses a security concern that exists across all release lines (including our LTS lines: v4, v0.12 and v0.10) we require the additional time to further review the changes and consider how best to achieve minimal impact to users.

We apologise for any inconvenience this schedule change may cause.

Please tune in to **nodejs-sec** (<https://groups.google.com/forum/#!forum/nodejs-sec>) to be notified of any further updates.
