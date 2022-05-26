---
title: Update all the Node.js dependencies to their latest version
description: 'How do you update all the npm dependencies store in the package.json file, to their latest version available?'
authors: flaviocopes, MylesBorins, fhemberger, LaRuaNa, ahmadawais
section: Getting Started
category: learn
---

## How Packages Become Dependencies

When you install a package using `npm install <packagename>`, the latest version is downloaded to the `node_modules` folder. A corresponding entry is added to `package.json` and `package-lock.json` in the current folder.

npm determines the dependencies and installs their latest versions as well.

Let's say you install [`cowsay`](https://www.npmjs.com/package/cowsay), a nifty command-line tool that lets you make a cow say _things_.

When you run `npm install cowsay`, this entry is added to the `package.json` file:

```json
{
  "dependencies": {
    "cowsay": "^1.3.1"
  }
}
```

This is an extract of `package-lock.json` (nested dependencies were removed for clarity):

```json
{
  "requires": true,
  "lockfileVersion": 1,
  "dependencies": {
    "cowsay": {
      "version": "1.3.1",
      "resolved": "https://registry.npmjs.org/cowsay/-/cowsay-1.3.1.tgz",
      "integrity": "sha512-3PVFe6FePVtPj1HTeLin9v8WyLl+VmM1l1H/5P+BTTDkMAjufp+0F9eLjzRnOHzVAYeIYFF5po5NjRrgefnRMQ==",
      "requires": {
        "get-stdin": "^5.0.1",
        "optimist": "~0.6.1",
        "string-width": "~2.1.1",
        "strip-eof": "^1.0.0"
      }
    }
  }
}
```

Now those 2 files tell us that we installed version `1.3.1` of cowsay, and our [npm versioning rule](https://docs.npmjs.com/about-semantic-versioning) for updates is `^1.3.1`. This means npm can update to patch and minor releases: `1.3.2`, `1.4.0` and so on.

If there is a new minor or patch release and we type `npm update`, the installed version is updated, and the `package-lock.json` file diligently filled with the new version.

Since npm version 5.0.0, `npm update` updates `package.json` with newer minor or patch versions. Use `npm update --no-save` to prevent modifying `package.json`.

To discover new package releases, use `npm outdated`.

Here's the list of a few outdated packages in a repository:

![](outdated-packages.png)

Some of those updates are _major_ releases. Running `npm update` won't help here. Major releases are _never_ updated in this way because they (by definition) introduce breaking changes, and `npm` wants to save you trouble.

## Update All Packages to the Latest Version

Leveraging [npm-check-updates](https://www.npmjs.com/package/npm-check-updates), you can upgrade all `package.json` dependencies to the latest version.

1. Install the `npm-check-updates` package globally:

    ```bash
    npm install -g npm-check-updates
    ```

2. Now run `npm-check-updates` to upgrade all version hints in `package.json`, allowing installation of the new major versions:

    ```bash
    ncu -u
    ```

3. Finally, run a standard install:

    ```bash
    npm install
    ```
