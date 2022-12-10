---
title: working-with-file-descriptors-in-nodejs
displayTitle: 'Travailler avec des descripteurs de fichiers dans Node.js'
description: "Comment interagir avec les descripteurs de fichiers à l'aide de Node.js ?"
authors: flaviocopes, MylesBorins, fhemberger, LaRuaNa, ahmadawais, clean99, AugustinMauroy
category: learn
---

Avant de pouvoir interagir avec un fichier qui se trouve dans votre système de fichiers, vous devez obtenir un descripteur de fichier.

Un descripteur de fichier est une référence à un fichier ouvert, un numéro (fd) renvoyé par l'ouverture du fichier en utilisant la méthode `open()` proposée par le module `fs`. Ce numéro (`fd`) identifie de façon unique un fichier ouvert dans le système d'exploitation :

```js
const fs = require('fs');

fs.open('/Users/joe/test.txt', 'r', (err, fd) => {
  // fd est notre descripteur de fichier
});
```

Remarquez le `r` que nous avons utilisé comme second paramètre de l'appel `fs.open()`.

Cet indicateurs signifie que nous ouvrons le fichier en lecture.

**Les autres indicateurs que vous utiliserez couramment sont:**

* `r+` ouvre le fichier pour la lecture et l'écriture, si le fichier n'existe pas, il ne sera pas créé.
* `w+` ouvre le fichier pour la lecture et l'écriture, en positionnant le flux au début du fichier. Le fichier est créé s'il n'existe pas.
* `a` ouvre le fichier en écriture, en positionnant le flux à la fin du fichier. Le fichier est créé s'il n'existe pas.
* `a+` ouvre le fichier pour la lecture et l'écriture, en positionnant le flux à la fin du fichier. Le fichier est créé s'il n'existe pas.

Vous pouvez également ouvrir le fichier en utilisant la méthode `fs.openSync`, qui renvoie le descripteur de fichier, au lieu de le fournir dans une fonction de rappel :

```js
const fs = require('fs');

try {
  const fd = fs.openSync('/Users/joe/test.txt', 'r');
} catch (err) {
  console.error(err);
}
```

Une fois que vous avez obtenu le descripteur de fichier, de quelque manière que ce soit, vous pouvez effectuer toutes les opérations qui le nécessitent, comme appeler `fs.close()` et de nombreuses autres opérations qui interagissent avec le système de fichiers.

Vous pouvez également ouvrir le fichier en utilisant la méthode `fsPromises.open`, basée sur les promesses, proposée par le module `fs/promises`.

Le module `fs/promises` n'est disponible qu'à partir de Node.js v14. Avant la v14, après la v10, vous pouvez utiliser `require('fs').promises` à la place. Avant la v10, après la v8, vous pouvez utiliser `util.promisify` pour convertir les méthodes `fs` en méthodes basées sur des promesses.

```js
const fs = require('fs/promises');
// Ou const fs = require('fs').promises avant v14.
async function example() {
  let filehandle;
  try {
    filehandle = await fs.open('/Users/joe/test.txt', 'r');
    console.log(filehandle.fd);
    console.log(await filehandle.readFile({ encoding: 'utf8' }));
  } finally {
    if (filehandle) await filehandle.close();
  }
}
example();
```

Voici un exemple de `util.promisify` :

```js
const fs = require('fs');
const util = require('util');

async function example() {
  const open = util.promisify(fs.open);
  const fd = await open('/Users/joe/test.txt', 'r');
}
example();
```

Pour plus de détails sur le module `fs/promises`, veuillez consulter [fs/promises API](https://nodejs.org/docs/latest-v17.x/api/fs.html#promises-api).
