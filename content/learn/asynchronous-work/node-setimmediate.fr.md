---
title: understanding-setimmediate
displayTitle: 'Comprendre setImmediate()'
description: "La fonction setImmediate de Node.js interagit avec la boucle d'événements d'une manière particulière."
authors: flaviocopes, MylesBorins, LaRuaNa, ahmadawais, clean99, ovflowd, thomasbnt
category: learn
---

Lorsque vous souhaitez exécuter un morceau de code de manière asynchrone, mais dès que possible, une option consiste à utiliser la fonction `setImmediate()` fournie par Node.js :

```js
setImmediate(() => {
  // exécuter quelque chose
});
```

Toute fonction transmise comme argument setImmediate() est une fonction de rappel qui est exécutée lors de l'itération suivante de la boucle d'événement.

En quoi `setImmediate()` est-il différent de `setTimeout() => {}, 0)` (passage d'un délai de 0ms), et de `process.nextTick()` et `Promise.then()` ?

Une fonction passée à `process.nextTick()` va être exécutée à l'itération courante de la boucle d'événement, après la fin de l'opération courante. Cela signifie qu'elle sera toujours exécutée avant `setTimeout` et `setImmediate`.

Un callback `setTimeout()` avec un délai de 0ms est très similaire à `setImmediate()`. L'ordre d'exécution dépendra de divers facteurs, mais ils seront tous deux exécutés lors de l'itération suivante de la boucle d'événement.

Un callback `process.nextTick` est ajouté à la queue `process.nextTick`. Un callback `Promise.then()` est ajouté à la queue `promises microtask`. Un callback `setTimeout`, `setImmediate` est ajouté à la queue `macrotask`.

La boucle d'événement exécute d'abord les tâches dans la file d'attente `process.nextTick`, puis exécute la file d'attente `promises microtask`, et enfin exécute la file d'attente `macrotask`.

Voici un exemple pour montrer l'ordre entre `setImmediate()`, `process.nextTick()` et `Promise.then()` :

<iframe
  title="Un exemple simple pour montrer la différence entre setImmediate nextTick Promise"
  src="https://stackblitz.com/edit/nodejs-dev-setimmediate?file=index.js&zenmode=1&view=editor"
  alt="nodejs-dev-setimmediate-example sur StackBlitz"
  style="height: 500px; width: 100%; border: 0;">
</iframe>

Ce code va d'abord appeler `start()`, puis appeler `foo()` dans la file d'attente `process.nextTick`. Après cela, il va gérer la file d'attente des microtâches `promises`, qui imprime `bar` et ajoute `zoo()` dans la file d'attente `process.nextTick` en même temps. Ensuite, il appellera `zoo()` qui vient d'être ajouté. A la fin, le `baz()` de la `macrotask queue` est appelé.
