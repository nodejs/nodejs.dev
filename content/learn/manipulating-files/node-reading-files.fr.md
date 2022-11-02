---
title: reading-files-with-nodejs
displayTitle: 'Lire des fichiers avec Node.js'
description: 'Comment lire les fichiers en utilisant Node.js'
authors: flaviocopes, MylesBorins, fhemberger, LaRuaNa, ahmadawais, clean99, AugustinMauroy
category: learn
---

La façon la plus simple de lire un fichier dans Node.js est d'utiliser la méthode `fs.readFile()`, en lui passant le chemin du fichier, l'encodage et une fonction de rappel qui sera appelée avec les données du fichier (et l'erreur le cas échéant) :

```js
const fs = require('fs');

fs.readFile('/Users/joe/test.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});
```

Alternativement, vous pouvez utiliser la version synchrone `fs.readFileSync()` :

```js
const fs = require('fs');

try {
  const data = fs.readFileSync('/Users/joe/test.txt', 'utf8');
  console.log(data);
} catch (err) {
  console.error(err);
}
```

Vous pouvez également utiliser la méthode basée sur les promesses `fsPromises.readFile()` proposée par le module `fs/promises` :

```js
const fs = require('fs/promises');

async function example() {
  try {
    const data = await fs.readFile('/Users/joe/test.txt', { encoding: 'utf8' });
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}
example();
```

Les trois fonctions `fs.readFile()`, `fs.readFileSync()` et `fsPromises.readFile()` lisent le contenu complet du fichier en mémoire avant de retourner les données.

Cela signifie que les gros fichiers vont avoir un impact majeur sur votre consommation de mémoire et sur la vitesse d'exécution du programme.

Dans ce cas, une meilleure option consiste à lire le contenu du fichier en utilisant des flux.
