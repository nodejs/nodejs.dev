---
title: 'wasi'
displayTitle: 'WebAssembly System Interface (WASI)'
category: 'api'
version: 'v18'
---

<Metadata data={{"update":{"type":"introduced_in","version":["v12.16.0"]}}} />

<Stability stability={1}>

Experimental

</Stability>

<Metadata version="v18.16.1" data={{"source_link":"lib/wasi.js"}} />

The WASI API provides an implementation of the [WebAssembly System Interface][]
specification. WASI gives sandboxed WebAssembly applications access to the
underlying operating system via a collection of POSIX-like functions.

```mjs|cjs
import { readFile } from 'node:fs/promises';
import { WASI } from 'wasi';
import { argv, env } from 'node:process';

const wasi = new WASI({
  args: argv,
  env,
  preopens: {
    '/sandbox': '/some/real/path/that/wasm/can/access',
  },
});

// Some WASI binaries require:
//   const importObject = { wasi_unstable: wasi.wasiImport };
const importObject = { wasi_snapshot_preview1: wasi.wasiImport };

const wasm = await WebAssembly.compile(
  await readFile(new URL('./demo.wasm', import.meta.url)),
);
const instance = await WebAssembly.instantiate(wasm, importObject);

wasi.start(instance);
--------------
'use strict';
const { readFile } = require('node:fs/promises');
const { WASI } = require('wasi');
const { argv, env } = require('node:process');
const { join } = require('node:path');

const wasi = new WASI({
  args: argv,
  env,
  preopens: {
    '/sandbox': '/some/real/path/that/wasm/can/access',
  },
});

// Some WASI binaries require:
//   const importObject = { wasi_unstable: wasi.wasiImport };
const importObject = { wasi_snapshot_preview1: wasi.wasiImport };

(async () => {
  const wasm = await WebAssembly.compile(
    await readFile(join(__dirname, 'demo.wasm')),
  );
  const instance = await WebAssembly.instantiate(wasm, importObject);

  wasi.start(instance);
})();
```

To run the above example, create a new WebAssembly text format file named
`demo.wat`:

```text
(module
    ;; Import the required fd_write WASI function which will write the given io vectors to stdout
    ;; The function signature for fd_write is:
    ;; (File Descriptor, *iovs, iovs_len, nwritten) -> Returns number of bytes written
    (import "wasi_snapshot_preview1" "fd_write" (func $fd_write (param i32 i32 i32 i32) (result i32)))

    (memory 1)
    (export "memory" (memory 0))

    ;; Write 'hello world\n' to memory at an offset of 8 bytes
    ;; Note the trailing newline which is required for the text to appear
    (data (i32.const 8) "hello world\n")

    (func $main (export "_start")
        ;; Creating a new io vector within linear memory
        (i32.store (i32.const 0) (i32.const 8))  ;; iov.iov_base - This is a pointer to the start of the 'hello world\n' string
        (i32.store (i32.const 4) (i32.const 12))  ;; iov.iov_len - The length of the 'hello world\n' string

        (call $fd_write
            (i32.const 1) ;; file_descriptor - 1 for stdout
            (i32.const 0) ;; *iovs - The pointer to the iov array, which is stored at memory location 0
            (i32.const 1) ;; iovs_len - We're printing 1 string stored in an iov - so one.
            (i32.const 20) ;; nwritten - A place in memory to store the number of bytes written
        )
        drop ;; Discard the number of bytes written from the top of the stack
    )
)
```

Use [wabt](https://github.com/WebAssembly/wabt) to compile `.wat` to `.wasm`

```console
$ wat2wasm demo.wat
```

The `--experimental-wasi-unstable-preview1` CLI argument is needed for this
example to run.

### <DataTag tag="C" /> `WASI`

<Metadata data={{"update":{"type":"added","version":["v13.3.0","v12.16.0"]}}} />

The `WASI` class provides the WASI system call API and additional convenience
methods for working with WASI-based applications. Each `WASI` instance
represents a distinct sandbox environment. For security purposes, each `WASI`
instance must have its command-line arguments, environment variables, and
sandbox directory structure configured explicitly.

#### <DataTag tag="M" /> `new WASI([options])`

<Metadata data={{"update":{"type":"added","version":["v13.3.0","v12.16.0"]}}} />

* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `args` [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) An array of strings that the WebAssembly application will
    see as command-line arguments. The first argument is the virtual path to the
    WASI command itself. **Default:** `[]`.
  * `env` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) An object similar to `process.env` that the WebAssembly
    application will see as its environment. **Default:** `{}`.
  * `preopens` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) This object represents the WebAssembly application's
    sandbox directory structure. The string keys of `preopens` are treated as
    directories within the sandbox. The corresponding values in `preopens` are
    the real paths to those directories on the host machine.
  * `returnOnExit` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) By default, WASI applications terminate the Node.js
    process via the `__wasi_proc_exit()` function. Setting this option to `true`
    causes `wasi.start()` to return the exit code rather than terminate the
    process. **Default:** `false`.
  * `stdin` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The file descriptor used as standard input in the
    WebAssembly application. **Default:** `0`.
  * `stdout` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The file descriptor used as standard output in the
    WebAssembly application. **Default:** `1`.
  * `stderr` [`integer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The file descriptor used as standard error in the
    WebAssembly application. **Default:** `2`.

#### <DataTag tag="M" /> `wasi.start(instance)`

<Metadata data={{"update":{"type":"added","version":["v13.3.0","v12.16.0"]}}} />

* `instance` [`WebAssembly.Instance`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/Instance)

Attempt to begin execution of `instance` as a WASI command by invoking its
`_start()` export. If `instance` does not contain a `_start()` export, or if
`instance` contains an `_initialize()` export, then an exception is thrown.

`start()` requires that `instance` exports a [`WebAssembly.Memory`][] named
`memory`. If `instance` does not have a `memory` export an exception is thrown.

If `start()` is called more than once, an exception is thrown.

#### <DataTag tag="M" /> `wasi.initialize(instance)`

<Metadata data={{"update":{"type":"added","version":["v14.6.0","v12.19.0"]}}} />

* `instance` [`WebAssembly.Instance`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/Instance)

Attempt to initialize `instance` as a WASI reactor by invoking its
`_initialize()` export, if it is present. If `instance` contains a `_start()`
export, then an exception is thrown.

`initialize()` requires that `instance` exports a [`WebAssembly.Memory`][] named
`memory`. If `instance` does not have a `memory` export an exception is thrown.

If `initialize()` is called more than once, an exception is thrown.

#### <DataTag tag="M" /> `wasi.wasiImport`

<Metadata data={{"update":{"type":"added","version":["v13.3.0","v12.16.0"]}}} />

* [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

`wasiImport` is an object that implements the WASI system call API. This object
should be passed as the `wasi_snapshot_preview1` import during the instantiation
of a [`WebAssembly.Instance`][].

[WebAssembly System Interface]: https://wasi.dev/
[`WebAssembly.Instance`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/Instance
[`WebAssembly.Memory`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/Memory
