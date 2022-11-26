---
title: the-nodejs-event-emitter
displayTitle: "L'émetteur d'événements de Node.js"
description: 'Comment travailler avec des événements personnalisés dans Node.js ?'
authors: flaviocopes, MylesBorins, fhemberger, LaRuaNa, ahmadawais, ovflowd, thomasbnt
category: learn
---

Si vous avez travaillé avec JavaScript dans le navigateur, vous savez qu'une grande partie de l'interaction de l'utilisateur est gérée par des événements : clics de souris, pressions sur les boutons du clavier, réaction aux mouvements de la souris, etc.

Du côté du backend, Node.js nous offre la possibilité de construire un système similaire en utilisant le module [`events`](/api/events/).

Ce module, en particulier, offre la classe `EventEmitter`, que nous utiliserons pour gérer nos événements.

Vous l'initialisez en utilisant

```js
const EventEmitter = require('events');

const eventEmitter = new EventEmitter();
```

Cet objet expose, parmi beaucoup d'autres, les méthodes `on` et `emit`.

* `emit` est utilisé pour déclencher un événement.
* `on` est utilisé pour ajouter une fonction de rappel qui sera exécutée lorsque l'événement sera déclenché.

Par exemple, créons un événement `start` et, à titre d'exemple, nous réagissons à cet événement par un simple enregistrement dans la console :

```js
eventEmitter.on('start', () => {
  console.log('commencé');
});
```

Quand nous exécutons

```js
eventEmitter.emit('start');
```

la fonction du gestionnaire d'événement est déclenchée, et nous obtenons le journal de la console.

Vous pouvez passer des arguments au gestionnaire d'événement en les passant comme arguments supplémentaires à `emit()` :

```js
eventEmitter.on('start', number => {
  console.log(`started ${number}`);
});

eventEmitter.emit('start', 23);
```

Arguments multiples :

```js
eventEmitter.on('start', (start, end) => {
  console.log(`à partir de ${start} à ${end}`);
});

eventEmitter.emit('start', 1, 100);
```

L'objet EventEmitter expose également plusieurs autres méthodes permettant d'interagir avec les événements, telles que

* `once()` : ajoute un écouteur ponctuel
* `removeListener()` / `off()` : supprime l'écouteur d'un événement.
* `removeAllListeners()` : supprime tous les écouteurs d'un événement.

Vous pouvez en savoir plus sur ces méthodes dans la [documentation officielle](/api/events/).