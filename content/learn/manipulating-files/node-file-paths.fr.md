---
title: nodejs-file-paths
displayTitle: "Chemins d'accès aux fichiers Node.js"
description: 'Comment interagir avec les chemins de fichiers et les manipuler en Node.js ?'
authors: flaviocopes, MylesBorins, fhemberger, LaRuaNa, amiller-gh, ahmadawais AugustinMauroy
category: learn
---

Chaque fichier du système a un chemin d'accès. Sous Linux et macOS, un chemin peut ressembler à : `/utilisateurs/joe/file.txt` tandis que les ordinateurs sous Windows sont différents, et ont une structure de chemin d'accès telle que : `C:\users\joe\file.txt`

Vous devez faire attention lorsque vous utilisez des chemins dans vos applications, car cette différence doit être prise en compte.

Vous incluez ce module dans vos fichiers en utilisant `const path = require('path');` et vous pouvez commencer à utiliser ses méthodes.

## Extraire des informations d'un chemin

Étant donné un chemin, vous pouvez extraire des informations de celui-ci en utilisant ces méthodes :

* `dirname` : récupère le dossier parent d'un fichier
* `basename` : récupère la partie du nom de fichier
* `extname` : récupère l'extension du fichier

### Exemple

```js
const notes = '/users/joe/notes.txt';

path.dirname(notes); // /users/joe
path.basename(notes); // notes.txt
path.extname(notes); // .txt
```

Vous pouvez obtenir le nom du fichier sans l'extension en spécifiant un second argument à `basename` :

```js
path.basename(notes, path.extname(notes)); // notes
```

## Travailler avec des chemins

Vous pouvez joindre deux ou plusieurs parties d'un chemin en utilisant `path.join()` :

```js
const name = 'joe';
path.join('/', 'users', name, 'notes.txt'); // '/users/joe/notes.txt'
```

Vous pouvez obtenir le calcul du chemin absolu d'un chemin relatif en utilisant `path.resolve()` :

```js
path.resolve('joe.txt'); // '/Users/joe/joe.txt' si elle est exécutée à partir de mon dossier courant
```

Dans ce cas, Node.js ajoutera simplement `/joe.txt` au répertoire de travail actuel. Si vous spécifiez un second dossier en paramètre, `resolve` utilisera le premier comme base pour le second :

```js
path.resolve('tmp', 'joe.txt'); // '/Users/joe/tmp/joe.txt' si elle est exécutée à partir de mon dossier courant
```

Si le premier paramètre commence par une barre oblique, cela signifie qu'il s'agit d'un chemin absolu :

```js
path.resolve('/etc', 'joe.txt'); // '/etc/joe.txt'
```

`path.normalize()` est une autre fonction utile, qui essaiera de calculer le chemin réel, quand il contient des spécificateurs relatifs comme `.` ou `..`, ou des doubles barres obliques :

```js
path.normalize('/users/joe/..//test.txt'); // '/users/test.txt'
```

**Ni resolve ni normalize ne vérifieront si le chemin existe**. Ils calculent simplement un chemin basé sur les informations qu'ils ont obtenues.
