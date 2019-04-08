---
title: Node.js, the difference between development and production
description: 'Learn how to set up different configurations for production and development environments'
authors: flaviocopes, MylesBorins, fhemberger, LaRuaNa, ahmadawais, 19shubham11
section: Getting Started
---

While working on a real project you may want your server to interact with several `outside` systems, that may be databases, messaging queues or even external APIs. In this scenario, a good convention to follow is to always have multiple environment variables and configurations associated with them.

You may have `development`, `QA`, `staging` and `production` environments depending upon your scale and use case, each of these environments should ideally have different configurations (database URLs and passwords, API access keys, etc.), for example, you may not want to pollute your production database while fixing a bug locally! This is where different environments come into play and the most commonly recommended way of doing this in Node.js is setting up an environment variable `NODE_ENV` and trigger different configs based on that.

More on [environment variables](https://en.wikipedia.org/wiki/Environment_variable)

You can signal Node.js that you are running in a particular environment by setting the `NODE_ENV=$environment` environment variable.

This is usually done by executing the command

```sh
export NODE_ENV=production
```

in the shell, but it's better to put it in your shell configuration file (e.g. `.bash_profile` with the Bash shell) because otherwise the setting does not persist in case of a system restart.

You can also apply the environment variable by prepending it to your application initialization command:

```sh
NODE_ENV=production node app.js
```

While setting the environment to `production` it is generally recommended that

- logging is kept to a minimum, essential level
- more caching levels take place to optimize performance

For example Pug, the templating library used by Express, compiles in debug mode if `NODE_ENV` is not set to `production`. Express views are compiled in every request in development mode, while in production they are cached. There are many more examples.

Express provides configuration hooks specific to the environment, which are automatically called based on the NODE_ENV variable value:

```js
app.configure('development', () => {
  //...
})
app.configure('production', () => {
  //...
})
app.configure('production', 'staging', () => {
  //...
})
```

For example you can use this to set different error handlers for different mode:

```js
app.configure('development', () => {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }))
})

app.configure('production', () => {
  app.use(express.errorHandler())
})
```
