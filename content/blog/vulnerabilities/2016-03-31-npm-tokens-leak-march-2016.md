---
title: npm security updates v2.15.1 and v3.8.3
blogAuthors: ['node-js-website']
category: 'vulnerabilities'
---

_This announcement is also covered on the npm blog: <http://blog.npmjs.org/post/142036323955/fixing-a-bearer-token-vulnerability>._

The primary npm registry has, since late 2014, used HTTP bearer tokens to authenticate requests from the npm command-line interface. Due to a design flaw in the CLI, these bearer tokens were sent with every request made by the CLI for logged-in users, regardless of the destination of the request. They should instead only be included for requests made against the registry or registries used for the current install.

This flaw allows an attacker to set up an HTTP server that could collect authentication information they could use to impersonate the users whose tokens they collected. This impersonation would allow them to do anything the compromised users could do, including publishing new versions of packages.

This flaw has been fixed in [npm@2.15.1](https://github.com/npm/npm/commit/fea8cc92cee02c720b58f95f14d315507ccad401) (npm LTS) and [npm@3.8.3](https://github.com/npm/npm/commit/f67ecad59e99a03e5aad8e93cd1a086ae087cb29). The npm CLI team believes that the fix won't break any existing registry setups, but due to the large number of registry software suites in the wild, it's possible that this change will be breaking in some cases. If so, please [file an issue](https://github.com/npm/npm/issues/new) describing the software you're using and how it broke, and the team will work with you to mitigate the breakage.

If you believe that your bearer token may have been leaked, it should be sufficient to [invalidate your current npm bearer tokens](https://www.npmjs.com/settings/tokens) and to rerun npm login to generate new tokens. Keep in mind that this may cause continuous integration builds in services like Travis to break, in which case you'll need to update the tokens in your CI server's configuration.

Thanks to Mitar, Will White & the team at Mapbox, Max Motovilov, and James Taylor for reporting this vulnerability to npm.

As Node.js ships with npm, releases for the active lines will be made available shortly for your convenience. Please watch the [Node.js news feed](https://nodejs.org/en/blog/) for the following releases:

* **v0.10 (Maintenance)**: [Node.js v0.10.44](https://nodejs.org/en/blog/release/v0.10.44/) includes npm LTS v2.15.1. This is a major upgrade of npm from v1 which has previously been deprecated. No fix is being made available for npm v1, please upgrade to npm v2 as soon as possible.
* **v0.12 (LTS)**: [Node.js v0.12.13](https://nodejs.org/en/blog/release/v0.12.13/) includes npm LTS v2.15.1.
* **v4 (LTS "Argon")**: [Node.js v4.4.2](https://nodejs.org/en/blog/release/v4.4.2/) includes npm LTS v2.15.1.
* **v5 (Stable)**: [Node.js v5.10.0](https://nodejs.org/en/blog/release/v5.10.0/) includes npm v3.8.3.

**Update:** Unfortunately the version of npm that was bundled with Node.js version v0.10.44, v0.12.13 and v4.4.2 did not include the correct version string, `npm -v` reports `2.15.0`, however the code is v2.15.1.

**Note that you can upgrade your installed version of npm manually** without requiring a Node.js update by using the command `npm install npm@2 -g` for npm LTS v2.15.2 or `npm install npm@3 -g` for npm v3.8.5.
