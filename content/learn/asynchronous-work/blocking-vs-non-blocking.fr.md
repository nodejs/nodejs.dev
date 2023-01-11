---
title: overview-of-blocking-vs-non-blocking
displayTitle: "Vue d'ensemble du blocage et du non-blocage"
authors: ovflowd, thomasbnt, HassanBahati
category: learn
---

Cette présentation couvre la différence entre les appels **bloquants** et **non-bloquants** dans Node.js. Cet aperçu fera référence à la boucle d'événement et à libuv mais aucune connaissance préalable de ces sujets n'est requise. Les lecteurs sont supposés avoir une compréhension de base du langage JavaScript et du [callback pattern](/learn/javascript-asynchronous-programming-and-callbacks/) de Node.js.

> Le terme "I/O" fait principalement référence à l'interaction avec le disque et le réseau du système réseau supporté par [libuv](https://libuv.org/).

## Bloquant

On parle d'opérations **bloquantes** lorsque l'exécution de JavaScript supplémentaire dans le processus Node.js doit attendre qu'une opération non-JavaScript se termine. Cela se produit car la boucle d'événement ne peut pas continuer à exécuter JavaScript pendant qu'une opération **bloquantes** est en cours.

Dans Node.js, le JavaScript qui présente des performances médiocres en raison de l'intensité du CPU plutôt que d'attendre une opération non-JavaScript, comme les I/O, n'est généralement pas généralement pas qualifié de **bloquantes**. Les méthodes synchrones de la bibliothèque standard Node.js qui utilisent libuv sont les opérations **bloquantes** les plus couramment utilisées. Les modules natifs de peuvent aussi avoir des méthodes **bloquantes**.

Toutes les méthodes I/O dans la bibliothèque standard de Node.js fournissent des versions
asynchrones, qui sont **non-bloquantes**, et acceptent des fonctions de rappel. Certaines méthodes de méthodes ont également des équivalents **bloquantes**, dont les noms se terminent par `Sync`.

## Comparaison de code

Les méthodes **bloquantes** s'exécutent de manière **synchrone** et les méthodes **non-bloquantes** s'exécutent de manière **asynchrone**.

En utilisant le module File System comme exemple, il s'agit d'une lecture de fichier **synchrone** :

```js
const fs = require('fs');

const data = fs.readFileSync('/file.md'); // bloque ici jusqu'à ce que le fichier soit lu
```

Voici un exemple équivalent **asynchrone** :

```js
const fs = require('fs');

fs.readFile('/file.md', (err, data) => {
  if (err) throw err;
});
```

Le premier exemple semble plus simple que le second mais présente l'inconvénient de la seconde ligne qui **bloque** l'exécution de tout l'exécution de tout autre JavaScript jusqu'à ce que le fichier entier soit lu. Notez que dans la version synchrone, si une erreur est déclenchée une erreur est lancée, elle devra être capturée ou le processus se plantera. Dans la version asynchrone, c'est à l'auteur de décider si une erreur doit être lancée comme indiqué.

Développons un peu notre exemple :

```js
const fs = require('fs');

const data = fs.readFileSync('/file.md'); // bloque ici jusqu'à ce que le fichier soit lu
console.log(data);
moreWork(); // s'exécutera après console.log
```

Et voici un exemple asynchrone similaire, mais sans équivalent :

```js
const fs = require('fs');

fs.readFile('/file.md', (err, data) => {
  if (err) throw err;
  console.log(data);
});
moreWork(); // s'exécutera avant console.log
```

Dans le premier exemple ci-dessus, `console.log` sera appelé avant `moreWork()`. Dans le deuxième exemple, `fs.readFile()` est **non-bloquantes**, l'exécution de JavaScript peut donc continuer et `moreWork()` sera appelé en premier. La possibilité d'exécuter `moreWork()` sans attendre la fin de la lecture du fichier est un choix de conception clé qui permet d'augmenter le débit.

## Concurrence et capacité de traitement

L'exécution de JavaScript dans Node.js est monofilaire (single threaded), la concurrence se réfère donc à la capacité de la boucle d'événement à exécuter les fonctions de rappel JavaScript après avoir terminé le processus d'exécution. Tout code qui doit s'exécuter de manière concurrente doit permettre la boucle d'événement de continuer à s'exécuter pendant que des opérations non-JavaScript, comme les I/O, se déroulent.

Prenons l'exemple d'une situation où chaque requête adressée à un serveur Web prend 50 ms et où 45 ms de ces 50 ms sont des I/O de base de données qui peuvent être effectuées de manière asynchrone. Le choix d'opérations asynchrones **non-bloquantes** libère ces 45 ms par demande pour traiter d'autres demandes. Il s'agit d'une différence significative en termes de capacité, simplement en choisissant d'utiliser des méthodes **non-bloquantes** au lieu de méthodes **bloquantes**. 

La boucle d'événements est différente des modèles de nombreux autres langages où des threads supplémentaires peuvent être créés pour gérer le travail simultané.

## Les dangers du mélange de codes bloquants et non bloquants

Certains schémas sont à éviter dans le domaine des I/O. Prenons un exemple :

```js
const fs = require('fs');

fs.readFile('/file.md', (err, data) => {
  if (err) throw err;
  console.log(data);
});
fs.unlinkSync('/file.md');
```

Dans l'exemple ci-dessus, `fs.unlinkSync()` est susceptible d'être exécuté avant `fs.readFile()`, ce qui supprimerait `file.md` avant qu'il ne soit réellement lu. Une meilleure façon d'écrire ceci, qui est complètement **non-bloquant** et garantie d'être exécutée dans le bon ordre est :

```js
const fs = require('fs');

fs.readFile('/file.md', (readFileErr, data) => {
  if (readFileErr) throw readFileErr;
  console.log(data);
  fs.unlink('/file.md', unlinkErr => {
    if (unlinkErr) throw unlinkErr;
  });
});
```

Ce qui précède place un appel **non-bloquant** à `fs.unlink()` dans le callback de `fs.readFile()` ce qui garantit l'ordre correct des opérations.

## Ressources supplémentaires

* [libuv](https://libuv.org/)
