---
title: esm-cjs
displayTitle: 'Differences between ESM and CJS'
description: 'What are the differences between ESM and CJS?'
authors: AugustinMauroy
category: learn
---

To understand the difference between ESM and CJS, we need to understand the difference between the two module systems.

## Bit of History

CJS was introduced in Node.js `V0.1.90`. ESM was introduced in Node.js `V12.17` It was introduced as an experimental feature. It was made stable in Node.js `V14`.

The IO.js project was created in 2014, it's a fork of node.js. The goal of this project was to add new features to node.js. The ESM feature was added to the IO.js project in 2015. The ESM feature was added to the Node.js project in 2019.

## What is ESM ?

ESM is the acronym for ECMAScript Modules. It is a module system that is part of the ECMAScript standard. It is the default module system in Node.js `V14` and above.

## What is CommonJS (_CJS_) ?

CJS is the acronym for CommonJS. It is a module system that is not part of the ECMAScript standard. It is the default module system in Node.js 12 and below.

## What is a module system?

A module system is a way to organize code. It allows you to split your code into multiple files and to share code between them.

## What is the difference between ESM and CJS?

The main difference between ESM and CJS is that ESM is asynchronous by default and CJS is synchronous by default.

## ESM is asynchronous by default

ESM is asynchronous by default. This means that when you import a module, you get a promise. This promise resolves to the module exports.

```js
import { readFile } from 'fs/promises'

const file = await readFile('file.txt')
```

## CJS is synchronous by default

CJS is synchronous by default. This means that when you import a module, you get the module exports.

```js
const { readFile } = require('fs/promises')

const file = readFile('file.txt')
```

## What is the difference between ESM and CJS in Node.js?

In Node.js, the difference between ESM and CJS is that ESM is asynchronous by default and CJS is synchronous by default.

## What is the difference between ESM and CJS in the browser?

In the browser, the difference between ESM and CJS is that ESM is asynchronous by default and CJS is synchronous by default.

## How to use ESM or CJS in Node.js?

You have the choice between ESM and CJS in Node.js. You can use ESM or CJS in Node.js.

**To use `CJS`:** you have to use the `.cjs` extension at your file(s).

**To use `ESM`:** you have to use the `.mjs` extension at your file(s).

### Selecting the module system

You can select the module system you want to use in Node.js by using the `--input-type` flag.

```bash
node --input-type=module index.js
```

### Using the `package.json` file

You can also select the module system you want to use in Node.js by using the `type` field in the `package.json` file.

```json
{
  "type": "module"
}
```

**Tips:** to create a package.json file, you can use the command `npm init`.
