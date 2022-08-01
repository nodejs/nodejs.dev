---
title: Uninstalling npm packages
description: 'How to uninstall an npm Node.js package, locally or globally'
authors: flaviocopes, MylesBorins, fhemberger, LaRuaNa, ahmadawais, shajanjp
section: Getting Started
category: learn
---

To uninstall a package you have previously installed **locally** (using `npm install <package-name>`), run

```bash
npm uninstall <package-name>
```

from the project root folder (the folder that contains the `node_modules` folder). This will update `dependencies`, `devDependencies`, `optionalDependencies`, and `peerDependencies` in both `package.json` and `package-lock.json` files.

Use `--no-save` option if you don't want to update the `package.json` and `package-lock.json` files.

If the package is installed **globally**, you need to add the `-g` / `--global` flag:

```bash
npm uninstall -g <package-name>
```

for example:

```bash
npm uninstall -g webpack
```

and you can run this command from anywhere you want on your system because, for global packages the current directory doesn't matter.
