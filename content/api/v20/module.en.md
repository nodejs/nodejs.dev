---
title: 'module'
displayTitle: '`node:module` API'
category: 'api'
version: 'v20'
---

<Metadata data={{"update":{"type":"introduced_in","version":["v12.20.0"]}}} />

<Metadata data={{"update":{"type":"added","version":["v0.3.7"]}}} />

### The `Module` object

* [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

Provides general utility methods when interacting with instances of
`Module`, the [`module`][] variable often seen in [CommonJS][] modules. Accessed
via `import 'node:module'` or `require('node:module')`.

#### <DataTag tag="M" /> `module.builtinModules`

<Metadata data={{"update":{"type":"added","version":["v9.3.0","v8.10.0","v6.13.0"]}}} />

* string\[]

A list of the names of all modules provided by Node.js. Can be used to verify
if a module is maintained by a third party or not.

`module` in this context isn't the same object that's provided
by the [module wrapper][]. To access it, require the `Module` module:

```mjs|cjs
// module.mjs
// In an ECMAScript module
import { builtinModules as builtin } from 'node:module';
--------------
// module.cjs
// In a CommonJS module
const builtin = require('node:module').builtinModules;
```

#### <DataTag tag="M" /> `module.createRequire(filename)`

<Metadata data={{"update":{"type":"added","version":["v12.2.0"]}}} />

* `filename` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`URL`](/api/v20/url#the-whatwg-url-api) Filename to be used to construct the require
  function. Must be a file URL object, file URL string, or absolute path
  string.
* Returns: [`require`](/api/v20/modules#requireid) Require function

```mjs
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

// sibling-module.js is a CommonJS module.
const siblingModule = require('./sibling-module');
```

#### <DataTag tag="M" /> `module.isBuiltin(moduleName)`

<Metadata data={{"update":{"type":"added","version":["v18.6.0","v16.17.0"]}}} />

* `moduleName` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) name of the module
* Returns: [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) returns true if the module is builtin else returns false

```mjs
import { isBuiltin } from 'node:module';
isBuiltin('node:fs'); // true
isBuiltin('fs'); // true
isBuiltin('wss'); // false
```

#### <DataTag tag="M" /> `module.syncBuiltinESMExports()`

<Metadata data={{"update":{"type":"added","version":["v12.12.0"]}}} />

The `module.syncBuiltinESMExports()` method updates all the live bindings for
builtin [ES Modules][] to match the properties of the [CommonJS][] exports. It
does not add or remove exported names from the [ES Modules][].

```js
const fs = require('node:fs');
const assert = require('node:assert');
const { syncBuiltinESMExports } = require('node:module');

fs.readFile = newAPI;

delete fs.readFileSync;

function newAPI() {
  // ...
}

fs.newAPI = newAPI;

syncBuiltinESMExports();

import('node:fs').then((esmFS) => {
  // It syncs the existing readFile property with the new value
  assert.strictEqual(esmFS.readFile, newAPI);
  // readFileSync has been deleted from the required fs
  assert.strictEqual('readFileSync' in fs, false);
  // syncBuiltinESMExports() does not remove readFileSync from esmFS
  assert.strictEqual('readFileSync' in esmFS, true);
  // syncBuiltinESMExports() does not add names
  assert.strictEqual(esmFS.newAPI, undefined);
});
```

### Source map v3 support

<Metadata data={{"update":{"type":"added","version":["v13.7.0","v12.17.0"]}}} />

<Stability stability={1}>

Experimental

</Stability>

Helpers for interacting with the source map cache. This cache is
populated when source map parsing is enabled and
[source map include directives][] are found in a modules' footer.

To enable source map parsing, Node.js must be run with the flag
[`--enable-source-maps`][], or with code coverage enabled by setting
[`NODE_V8_COVERAGE=dir`][].

```mjs|cjs
// module.mjs
// In an ECMAScript module
import { findSourceMap, SourceMap } from 'node:module';
--------------
// module.cjs
// In a CommonJS module
const { findSourceMap, SourceMap } = require('node:module');
```

<a id="module_module_findsourcemap_path_error"></a>

#### <DataTag tag="M" /> `module.findSourceMap(path)`

<Metadata data={{"update":{"type":"added","version":["v13.7.0","v12.17.0"]}}} />

* `path` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
* Returns: [`module.SourceMap`](/api/v20/module#modulesourcemap) | [`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Undefined_type) Returns `module.SourceMap` if a source
  map is found, `undefined` otherwise.

`path` is the resolved path for the file for which a corresponding source map
should be fetched.

#### <DataTag tag="C" /> `module.SourceMap`

<Metadata data={{"update":{"type":"added","version":["v13.7.0","v12.17.0"]}}} />

##### <DataTag tag="M" /> `new SourceMap(payload)`

* `payload` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

Creates a new `sourceMap` instance.

`payload` is an object with keys matching the [Source map v3 format][]:

* `file`: [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
* `version`: [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
* `sources`: string\[]
* `sourcesContent`: string\[]
* `names`: string\[]
* `mappings`: [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
* `sourceRoot`: [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

##### <DataTag tag="M" /> `sourceMap.payload`

* Returns: [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

Getter for the payload used to construct the [`SourceMap`][] instance.

##### <DataTag tag="M" /> `sourceMap.findEntry(lineNumber, columnNumber)`

* `lineNumber` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
* `columnNumber` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
* Returns: [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

Given a line number and column number in the generated source file, returns
an object representing the position in the original file. The object returned
consists of the following keys:

* generatedLine: [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
* generatedColumn: [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
* originalSource: [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
* originalLine: [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
* originalColumn: [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
* name: [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

[CommonJS]: /api/v20/modules
[ES Modules]: /api/v20/esm
[Source map v3 format]: https://sourcemaps.info/spec.html#h.mofvlxcwqzej
[`--enable-source-maps`]: /api/v20/cli#--enable-source-maps
[`NODE_V8_COVERAGE=dir`]: /api/v20/cli#node_v8_coveragedir
[`SourceMap`]: #class-modulesourcemap
[`module`]: /api/v20/modules#the-module-object
[module wrapper]: /api/v20/modules#the-module-wrapper
[source map include directives]: https://sourcemaps.info/spec.html#h.lmz475t4mvbx
