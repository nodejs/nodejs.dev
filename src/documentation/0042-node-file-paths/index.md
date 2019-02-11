---
title: 'Node File Paths'
description: 'How to interact with file paths and manipulate them in Node'
author: flaviocopes
---

<!-- TOC -->

- [Getting information out of a path](#getting-information-out-of-a-path)
- [Working with paths](#working-with-paths)

<!-- /TOC -->

Every file in the system has a path.

On Linux and macOS, a path might look like:

`/users/joe/file.txt`

while Windows computers are different, and have a structure such as:

`C:\users\joe\file.txt`

You need to pay attention when using paths in your applications, as this difference must be taken into account.

You include this module in your files using

```js
const path = require('path')
```

and you can start using its methods.

## Getting information out of a path

Given a path, you can extract information out of it using those methods:

- `dirname`: get the parent folder of a file
- `basename`: get the filename part
- `extname`: get the file extension

Example:

```js
const notes = '/users/joe/notes.txt'

path.dirname(notes) // /users/joe
path.basename(notes) // notes.txt
path.extname(notes) // .txt
```

You can get the file name without the extension by specifying a second argument to `basename`:

```js
path.basename(notes, path.extname(notes)) //notes
```

## Working with paths

You can join two or more parts of a path by using `path.join()`:

```js
const name = 'joe'
path.join('/', 'users', name, 'notes.txt') //'/users/joe/notes.txt'
```

You can get the absolute path calculation of a relative path using `path.resolve()`:

```js
path.resolve('joe.txt') //'/Users/joe/joe.txt' if run from my home folder
```

In this case Node will simply append `/joe.txt` to the current working directory. If you specify a second parameter folder, `resolve` will use the first as a base for the second:

```js
path.resolve('tmp', 'joe.txt') //'/Users/joe/tmp/joe.txt' if run from my home folder
```

If the first parameter starts with a slash, that means it's an absolute path:

```js
path.resolve('/etc', 'joe.txt') //'/etc/joe.txt'
```

`path.normalize()` is another useful function, that will try and calculate the actual path, when it contains relative specifiers like `.` or `..`, or double slashes:

```js
path.normalize('/users/joe/..//test.txt') ///users/test.txt
```

**Both resolve and normalize will not check if the path exists**. They just calculate a path based on the information they got.
