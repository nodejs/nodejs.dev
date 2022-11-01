---
title: nodejs-file-stats
displayTitle: 'Node.js file stats'
description: 'How to get the details of a file using Node.js'
authors: flaviocopes, ZYSzys, MylesBorins, fhemberger, LaRuaNa, ahmadawais, clean99, ovflowd, vaishnav-mk
category: learn
---

Every file comes with a set of details that we can inspect using Node.js. In particular, using the `stat()` method provided by the [`fs` module](/api/v19/fs).

You call it passing a file path, and once Node.js gets the file details it will call the callback function you pass, with 2 parameters: an error message, and the file stats:

```js
const fs = require('fs');

fs.stat('/Users/joe/test.txt', (err, stats) => {
  if (err) {
    console.error(err);
  }
  // we have access to the file stats in `stats`
});
```

Node.js also provides a sync method, which blocks the thread until the file stats are ready:

```js
const fs = require('fs');

try {
  const stats = fs.statSync('/Users/joe/test.txt');
} catch (err) {
  console.error(err);
}
```

The file information is included in the stats variable. What kind of information can we extract using the stats?

**A lot, including:**

* if the file is a directory or a file, using `stats.isFile()` and `stats.isDirectory()`
* if the file is a symbolic link using `stats.isSymbolicLink()`
* the file size in bytes using `stats.size`.

There are other advanced methods, but the bulk of what you'll use in your day-to-day programming is this.

```js
const fs = require('fs');

fs.stat('/Users/joe/test.txt', (err, stats) => {
  if (err) {
    console.error(err);
    return;
  }

  stats.isFile(); // true
  stats.isDirectory(); // false
  stats.isSymbolicLink(); // false
  stats.size; // 1024000 //= 1MB
});
```

You can also use promise-based `fsPromises.stat()` method offered by the `fs/promises` module if you like:

```js
const fs = require('fs/promises');

async function example() {
  try {
    const stats = await fs.stat('/Users/joe/test.txt');
    stats.isFile(); // true
    stats.isDirectory(); // false
    stats.isSymbolicLink(); // false
    stats.size; // 1024000 //= 1MB
  } catch (err) {
    console.log(err);
  }
}
example();
```

You can read more about the `fs` module in the [official documentation](/api/fs/).
