---
title: How to read environment variables from Node.js
description: 'Learn how to read and make use of environment variables in a Node.js program'
authors: flaviocopes, MylesBorins, fhemberger, LaRuaNa, ahmadawais, aymen94
section: Getting Started
---

The `process` core module of Node.js provides the `env` property which hosts all the environment variables that were set at the moment the process was started.

## We have two way to set variables:
- using command line
- using a `.env` file

### Using Command Line:

`PORT=8626 node app.js`

### Using a `.env` File:

We need to install [dotenv](https://www.npmjs.com/package/dotenv) module.

Create the .env file in the root of your app and add your variables and values to it.

```
NODE_ENV=development
PORT=8626
```
Here is an example that accesses the NODE_ENV environment variable, which is set to `development` by default.

> Note: `process` does not require a "require", it's automatically available.

```js
process.env.NODE_ENV // "development"
```

Setting it to "production" before the script runs will tell Node.js that this is a production environment.

In the same way you can access any custom environment variable you set.
