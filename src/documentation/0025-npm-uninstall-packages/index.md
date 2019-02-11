---
title: Uninstalling npm packages
description: 'How to uninstall an npm Node package, locally or globally'
author: flaviocopes
---

To uninstall a package you have previously installed **locally** (using `npm install <package-name>` in the `node_modules` folder, run

```sh
npm uninstall <package-name>
```

from the project root folder (the folder that contains the node_modules folder).

Using the `-S` flag, or `--save`, this operation will also remove the reference in the `package.json` file.

If the package was a development dependency, listed in the devDependencies of the `package.json` file, you must use the `-D` / `--save-dev` flag to remove it from the file:

```sh
npm uninstall -S <package-name>
npm uninstall -D <package-name>
```

If the package is installed **globally**, you need to add the `-g` / `--global` flag:

```sh
npm uninstall -g <package-name>
```

for example:

```sh
npm uninstall -g webpack
```

and you can run this command from anywhere you want on your system because the folder where you currently are does not matter.
