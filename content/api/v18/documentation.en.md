---
title: 'documentation'
displayTitle: 'About this documentation'
category: 'api'
version: 'v18'
---

<Metadata version="v18.14.0" data={{"update":{"type":"introduced_in","version":["v0.10.0"]}}} />

<Metadata version="v18.14.0" data={{"type":"misc"}} />

Welcome to the official API reference documentation for Node.js!

Node.js is a JavaScript runtime built on the [V8 JavaScript engine][].

### Contributing

Report errors in this documentation in [the issue tracker][]. See
[the contributing guide][] for directions on how to submit pull requests.

### Stability index

<Metadata version="v18.14.0" data={{"type":"misc"}} />

Throughout the documentation are indications of a section's stability. Some APIs
are so proven and so relied upon that they are unlikely to ever change at all.
Others are brand new and experimental, or known to be hazardous.

The stability indices are as follows:

<Metadata version="v18.14.0" data={{"stability":{"level":0,"text":" - Deprecated. The feature may emit warnings. Backward compatibility is not guaranteed."}}} />

<Metadata version="v18.14.0" data={{"stability":{"level":1,"text":" - Experimental. The feature is not subject to semantic versioning rules. Non-backward compatible changes or removal may occur in any future release. Use of the feature is not recommended in production environments."}}} />

<Metadata version="v18.14.0" data={{"stability":{"level":2,"text":" - Stable. Compatibility with the npm ecosystem is a high priority."}}} />

<Metadata version="v18.14.0" data={{"stability":{"level":3,"text":" - Legacy. Although this feature is unlikely to be removed and is still covered by semantic versioning guarantees, it is no longer actively maintained, and other alternatives are available."}}} />

Features are marked as legacy rather than being deprecated if their use does no
harm, and they are widely relied upon within the npm ecosystem. Bugs found in
legacy features are unlikely to be fixed.

Use caution when making use of Experimental features, particularly within
modules. Users may not be aware that experimental features are being used.
Bugs or behavior changes may surprise users when Experimental API
modifications occur. To avoid surprises, use of an Experimental feature may need
a command-line flag. Experimental features may also emit a [warning][].

### Stability overview

### JSON output

<Metadata version="v18.14.0" data={{"update":{"type":"added","version":["v0.6.12"]}}} />

Every `.html` document has a corresponding `.json` document. This is for IDEs
and other utilities that consume the documentation.

### System calls and man pages

Node.js functions which wrap a system call will document that. The docs link
to the corresponding man pages which describe how the system call works.

Most Unix system calls have Windows analogues. Still, behavior differences may
be unavoidable.

[V8 JavaScript engine]: https://v8.dev/
[semantic versioning]: https://semver.org/
[the contributing guide]: https://github.com/nodejs/node/blob/HEAD/CONTRIBUTING.md
[the issue tracker]: https://github.com/nodejs/node/issues/new
[warning]: /api/v18/process#event-warning
