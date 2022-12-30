---
title: working-with-folders-in-nodejs
displayTitle: 'Travailler avec des dossiers dans Node.js'
description: 'Comment interagir avec les dossiers en utilisant Node.js'
authors: flaviocopes, MylesBorins, fhemberger, liangpeili, LaRuaNa, ahmadawais, clean99, AugustinMauroy
category: learn
---

Le module principal `fs` de Node.js fournit de nombreuses méthodes pratiques que vous pouvez utiliser pour travailler avec des dossiers.

## Vérifier si un dossier existe

Utilisez `fs.access()` (et son équivalent `fsPromises.access()` basé sur les promesses) pour vérifier si le dossier existe et si Node.js peut y accéder avec ses permissions.

## Créer un nouveau dossier

Utilisez `fs.mkdir()` ou `fs.mkdirSync()` ou `fsPromises.mkdir()` pour créer un nouveau dossier.

```js
const fs = require('fs');

const folderName = '/Users/joe/test';

try {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
  }
} catch (err) {
  console.error(err);
}
```

## Lire le contenu d'un répertoire

Utilisez `fs.readdir()` ou `fs.readdirSync()` ou `fsPromises.readdir()` pour lire le contenu d'un répertoire.

Ce morceau de code lit le contenu d'un dossier, à la fois les fichiers et les sous-dossiers, et renvoie leur chemin relatif :

```js
const fs = require('fs');

const folderPath = '/Users/joe';

fs.readdirSync(folderPath);
```

Vous pouvez obtenir le chemin complet :

```js
fs.readdirSync(folderPath).map(fileName => {
  return path.join(folderPath, fileName);
});
```

Vous pouvez également filtrer les résultats pour n'afficher que les fichiers et exclure les dossiers :

```js
const isFile = fileName => {
  return fs.lstatSync(fileName).isFile();
};

fs.readdirSync(folderPath)
  .map(fileName => {
    return path.join(folderPath, fileName);
  })
  .filter(isFile);
```

## Renommer un dossier

Utilisez `fs.rename()` ou `fs.renameSync()` ou `fsPromises.rename()` pour renommer un dossier. Le premier paramètre est le chemin actuel, le second le nouveau chemin :

```js
const fs = require('fs');

fs.rename('/Users/joe', '/Users/roger', err => {
  if (err) {
    console.error(err);
  }
  // Fait
});
```

`fs.renameSync()` est la version synchrone :

```js
const fs = require('fs');

try {
  fs.renameSync('/Users/joe', '/Users/roger');
} catch (err) {
  console.error(err);
}
```

`fsPromises.rename()` est la version basée sur les promesses :

```js
const fs = require('fs/promises');

async function example() {
  try {
    await fs.rename('/Users/joe', '/Users/roger');
  } catch (err) {
    console.log(err);
  }
}
example();
```

## Supprimer un dossier

Utilisez `fs.rmdir()` ou `fs.rmdirSync()` ou `fsPromises.rmdir()` pour supprimer un dossier.

La suppression d'un dossier qui a du contenu peut être plus compliquée que nécessaire. Vous pouvez passer l'option `{ recursive : true }` pour supprimer récursivement le contenu.

```js
const fs = require('fs');

fs.rmdir(dir, { recursive: true }, err => {
  if (err) {
    throw err;
  }

  console.log(`${dir} is deleted!`);
});
```

> **NOTE:** Dans Node `v16.x` l'option `recursive` est **dépréciée** pour `fs.rmdir` de l'API de callback, utilisez plutôt `fs.rm` pour supprimer les dossiers qui ont du contenu dedans :

```js
const fs = require('fs');

fs.rm(dir, { recursive: true, force: true }, err => {
  if (err) {
    throw err;
  }

  console.log(`${dir} is deleted!`);
});
```
