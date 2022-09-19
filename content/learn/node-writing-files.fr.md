---
title: 'Writing files with Node.js'
description: 'How to write files using Node.js'
authors: flaviocopes, MylesBorins, fhemberger, LaRuaNa, ahmadawais, clean99, AugustinMauroy
category: learn
---

La façon la plus simple d'écrire dans des fichiers en Node.js est d'utiliser l'API `fs.writeFile()`.

Exemple :

```js
const fs = require('fs');

const content = 'Some content!';

fs.writeFile('/Users/joe/test.txt', content, err => {
  if (err) {
    console.error(err);
  }
  // le fichier a été écrit avec succès
});
```

Alternativement, vous pouvez utiliser la version synchrone `fs.writeFileSync()` :

```js
const fs = require('fs');

const content = 'Some content!';

try {
  fs.writeFileSync('/Users/joe/test.txt', content);
  // le fichier a été écrit avec succès
} catch (err) {
  console.error(err);
}
```

Vous pouvez également utiliser la méthode basée sur les promesses `fsPromises.writeFile()` proposée par le module `fs/promises` :

```js
const fs = require('fs/promises');

async function example() {
  try {
    const content = 'Some content!';
    await fs.writeFile('/Users/joe/test.txt', content);
  } catch (err) {
    console.log(err);
  }
}
example();
```

Par défaut, cette API **remplacera le contenu du fichier** s'il existe déjà.

Vous pouvez modifier cette valeur par défaut en spécifiant un indicateur :

```js
fs.writeFile('/Users/joe/test.txt', content, { flag: 'a+' }, err => {});
```

Les drapeaux que vous utiliserez probablement sont

* `r+` ouvre le fichier pour la lecture et l'écriture
* `w+` ouvre le fichier pour la lecture et l'écriture, en positionnant le flux au début du fichier. Le fichier est créé s'il n'existe pas
* `a` ouvre le fichier en écriture, en positionnant le flux à la fin du fichier. Le fichier est créé s'il n'existe pas
* `a+` ouvre le fichier en lecture et en écriture, en positionnant le flux à la fin du fichier. Le fichier est créé s'il n'existe pas.

(vous trouverez d'autres drapeaux sur [https://nodejs.org/api/fs.html#fs_file_system_flags](https://nodejs.org/api/fs.html#fs_file_system_flags))

## Ajouter à un fichier

Une méthode pratique pour ajouter du contenu à la fin d'un fichier est `fs.appendFile()` (et son équivalent `fs.appendFileSync()`) :

```js
const fs = require('fs');

const content = 'Some content!';

fs.appendFile('file.log', content, err => {
  if (err) {
    console.error(err);
  }
  // Fait!
});
```

Voici un exemple de `fsPromises.appendFile()` :

```js
const fs = require('fs/promises');

async function example() {
  try {
    const content = 'Some content!';
    await fs.appendFile('/Users/joe/test.txt', content);
  } catch (err) {
    console.log(err);
  }
}
example();
```

## Utilisation des flux

Toutes ces méthodes écrivent le contenu complet du fichier avant de renvoyer le contrôle à votre programme (dans la version async, cela signifie exécuter la callback).

Dans ce cas, une meilleure option est d'écrire le contenu du fichier en utilisant des flux.
