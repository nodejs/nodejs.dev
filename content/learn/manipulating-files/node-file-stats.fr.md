---
title: nodejs-file-stats
displayTitle: 'Statistiques des fichiers Node.js'
description: "Comment obtenir les détails d'un fichier en utilisant Node.js"
authors: flaviocopes, ZYSzys, MylesBorins, fhemberger, LaRuaNa, ahmadawais, clean99, ovflowd, AugustinMauroy
category: learn
---

Chaque fichier est livré avec un ensemble de détails que nous pouvons inspecter en utilisant Node.js. En particulier, en utilisant la méthode `stat()` fournie par le module `fs`.

Vous l'appelez en passant un chemin de fichier, et une fois que Node.js obtient les détails du fichier, il appellera la fonction de rappel que vous passez, avec 2 paramètres : un message d'erreur, et les statistiques du fichier :

```js
const fs = require('fs');

fs.stat('/Users/joe/test.txt', (err, stats) => {
  if (err) {
    console.error(err);
  }
  // Nous avons accès au fichier stats dans `stats`.
});
```

Node.js fournit également une méthode synchrone, qui bloque le fil d'exécution jusqu'à ce que les statistiques du fichier soient prêtes :

```js
const fs = require('fs');

try {
  const stats = fs.statSync('/Users/joe/test.txt');
} catch (err) {
  console.error(err);
}
```

Les informations sur le fichier sont incluses dans la variable `stats`. Quel type d'information peut-on extraire en utilisant `stats` ?

**Beaucoup, notamment :**

* si le fichier est un répertoire ou un fichier, en utilisant `stats.isFile()` et `stats.isDirectory()`
* si le fichier est un lien symbolique en utilisant `stats.isSymbolicLink()`
* la taille du fichier en octets avec `stats.size`.

Il existe d'autres méthodes avancées, mais ceci est l'essentiel de ce que vous utiliserez au quotidien dans votre programmation.

```js
const fs = require('fs');

fs.stat('/Users/joe/test.txt', (err, stats) => {
  if (err) {
    console.error(err);
    return;
  }

  stats.isFile(); // true
  stats.isDirectory(); // false
  stats.isSymbolicLink(); // false
  stats.size; // 1024000 //= 1MB
});
```

Vous pouvez également utiliser la méthode `fsPromises.stat()` basée sur les promesses proposée par le module `fs/promises` si vous le souhaitez :

```js
const fs = require('fs/promises');

async function example() {
  try {
    const stats = await fs.stat('/Users/joe/test.txt');
    stats.isFile(); // true
    stats.isDirectory(); // false
    stats.isSymbolicLink(); // false
    stats.size; // 1024000 //= 1MB
  } catch (err) {
    console.log(err);
  }
}
example();
```
