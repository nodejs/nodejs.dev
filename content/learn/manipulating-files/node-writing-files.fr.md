---
title: writing-files-with-nodejs
displayTitle: 'Écrire des fichiers avec Node.js'
description: 'Comment écrire des fichiers en utilisant Node.js'
authors: flaviocopes, MylesBorins, fhemberger, LaRuaNa, ahmadawais, clean99, ovflowd, augustinmauroy
category: learn
---

## Écriture d'un fichier

La façon la plus simple d'écrire dans des fichiers en Node.js est d'utiliser l'API `fs.writeFile()`.

```js
const fs = require('fs');

const content = 'Some content!';

fs.writeFile('/Users/joe/test.txt', content, err => {
  if (err) {
    console.error(err);
  }
  // fichier écrit avec succès
});
```

### Écrire un fichier de manière synchrone

Alternativement, vous pouvez utiliser la version synchrone `fs.writeFileSync()` :

```js
const fs = require('fs');

const content = 'Some content!';

try {
  fs.writeFileSync('/Users/joe/test.txt', content);
  // fichier écrit avec succès
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

**Vous pouvez modifier la valeur par défaut en spécifiant un indicateur :**.

```js
fs.writeFile('/Users/joe/test.txt', content, { flag: 'a+' }, err => {});
```

#### Les indicateurs que vous utiliserez probablement sont

<table>
  <tr>
    <th>indicateur</th>
    <th>Description</th>
    <th>Le fichier est créé s'il n'existe pas</th>
  </tr>
  <tr>
    <td><code>r+</code></td>
    <td>This flag opens the file for <b>reading</b> and <b>writing</b></td>
    <td style="text-align: center;">❌</td>
  </tr>
  <tr>
    <td><code>w+</code></td>
    <td>Cette option ouvre le fichier pour la <b>lecture</b> et l'*écriture* et positionne également le flux au <b>début</b> du fichier.</td>
    <td style="text-align: center;">✅</td>
  </tr>
  <tr>
    <td><code>a</code></td>
    <td>Cette option ouvre le fichier pour <b>écrire</b> et positionne également le flux à la <b>fin</b> du fichier.</td>
    <td style="text-align: center;">✅</td>
  </tr>
  <tr>
    <td><code>a+</code></td>
    <td>This flag opens the file for <b>reading</b> and *writing* and it also positions the stream at the <b>end</b> of the file</td>
    <td style="text-align: center;">✅</td>
  </tr>
</table>

* Vous pouvez trouver plus d'informations sur les drapeaux dans la [documentation fs](/api/fs/#file-system-flags).

## Ajouter un contenu à la fin d'un fichier

L'ajout aux fichiers est pratique lorsque vous ne voulez pas écraser un fichier avec du nouveau contenu, mais plutôt l'enrichir.

### Exemples

Une méthode pratique pour ajouter du contenu à la fin d'un fichier est `fs.appendFile()` (et son équivalent synchrone `fs.appendFileSync()`) :

```js
const fs = require('fs');

const content = 'Some content!';

fs.appendFile('file.log', content, err => {
  if (err) {
    console.error(err);
  }
  // fait!
});
```

#### Exemple avec des promesses

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
