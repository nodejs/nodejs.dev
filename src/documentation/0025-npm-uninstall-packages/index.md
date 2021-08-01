---
title: Uninstalling npm packages
description: 'How to uninstall an npm Node.js package, locally or globally'
authors: flaviocopes, MylesBorins, fhemberger, LaRuaNa, ahmadawais
section: Getting Started
category: learn
---

To uninstall a package you have previously installed **locally** (using `npm install <package-name>` in the `node_modules` folder, run

```bash
npm uninstall <package-name>
```

from the project root folder (the folder that contains the node_modules folder).

Using the `-S` flag, or `--save`, this operation will also remove the reference in the `package.json` file.

package.json will be automatically updated with devDependency and dependency once you uninstall npm package.

If the package is installed **globally**, you need to add the `-g` / `--global` flag:

```bash
npm uninstall -g <package-name>
```

for example:

```bash
npm uninstall -g webpack
```

and you can run this command from anywhere you want on your system because the folder where you currently are does not matter.
