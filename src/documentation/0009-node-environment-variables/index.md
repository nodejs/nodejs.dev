---
title: How to read environment variables from Node.js
description: 'Learn how to read and make use of environment variables in a Node.js program'
authors: flaviocopes, MylesBorins, fhemberger, LaRuaNa, ahmadawais
section: Getting Started
category: learn
---

The `process` core module of Node.js provides the `env` property which hosts all the environment variables that were set at the moment the process was started.

Here is an example that accesses the NODE_ENV environment variable, which is set to `development` by default.

> Note: `process` does not require a "require", it's automatically available.

```js
process.env.NODE_ENV // "development"
```

Setting it to "production" before the script runs will tell Node.js that this is a production environment.

In the same way you can access any custom environment variable you set.
