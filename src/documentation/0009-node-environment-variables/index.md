---
title: How to read environment variables from Node.js
description: 'Learn how to read and make use of environment variables in a Node.js program'
authors: flaviocopes, MylesBorins, fhemberger, LaRuaNa, ahmadawais
section: Getting Started
category: learn
---

The `process` core module of Node.js provides the `env` property which hosts all the environment variables that were set at the moment the process was started.

The below code runs `app.js` and set `USER_ID` and `USER_KEY`.

```js
USER_ID=239482 USER_KEY=foobar node app.js
```

That will pass the user `USER_ID` as **239482** and the `USER_KEY` as **foobar**. This is suitable for testing, however for production, you will probably be configuring some bash scripts to export variables.

> Note: `process` does not require a "require", it's automatically available.

Here is an example that accesses the `USER_ID` and `USER_KEY` environment variables, which we set in above code.

```js
process.env.USER_ID // "239482"
process.env.USER_KEY // "foobar"
```

Here is an example that accesses the NODE_ENV environment variable, which is set to `development` by default.

```js
process.env.NODE_ENV // "development"
```

Setting it to "production" before the script runs will tell Node.js that this is a production environment.

In the same way you can access any custom environment variable you set.
