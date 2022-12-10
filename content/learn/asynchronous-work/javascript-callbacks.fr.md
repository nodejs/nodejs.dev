---
title: javascript-asynchronous-programming-and-callbacks
displayTitle: 'Programmation asynchrone et Callbacks en JavaScript'
description: "JavaScript est synchrone par défaut, et est exécuté en single threaded. Cela signifie que le code ne peut pas créer de nouveaux threads et s'exécuter en parallèle. Découvrez ce que signifie le code asynchrone et comment il se présente."
authors: flaviocopes, MylesBorins, LaRuaNa, amiller-gh, ahmadawais, ovflowd, thomasbnt
category: learn
---

## L'asynchronisme dans les langages de programmation

Les ordinateurs sont asynchrones par conception.

Asynchrone signifie que les choses peuvent se produire indépendamment du flux principal du programme.

Dans les ordinateurs grand public actuels, chaque programme s'exécute pendant un laps de temps spécifique, puis il arrête son exécution pour laisser un autre programme poursuivre son exécution. Ce cycle est si rapide qu'il est impossible de le remarquer. Nous pensons que nos ordinateurs exécutent plusieurs programmes simultanément, mais c'est une illusion (sauf sur les machines multiprocesseurs).

Les programmes utilisent en interne des _interruptions_, un signal qui est émis vers le processeur pour attirer l'attention du système.

N'entrons pas dans les détails maintenant, mais gardez à l'esprit qu'il est normal pour les programmes d'être asynchrones et d'arrêter leur exécution jusqu'à ce qu'ils aient besoin d'attention, permettant à l'ordinateur d'exécuter d'autres choses pendant ce temps. Lorsqu'un programme attend une réponse du réseau, il ne peut pas arrêter le processeur tant que la demande n'est pas terminée.

Normalement, les langages de programmation sont synchrones et certains offrent un moyen de gérer l'asynchronicité dans le langage ou par le biais de bibliothèques. C, Java, C#, PHP, Go, Ruby, Swift et Python sont tous synchrones par défaut. Certains d'entre eux gèrent les opérations asynchrones en utilisant des threads, en créant un nouveau processus.

## JavaScript

JavaScript est **synchrone** par défaut et est un single thread. Cela signifie que le code ne peut pas créer de nouveaux threads et s'exécuter en parallèle.

Les lignes de code sont exécutées en série, l'une après l'autre, par exemple :

```js
const a = 1;
const b = 2;
const c = a * b;
console.log(c);
doSomething();
```

Mais JavaScript est né à l'intérieur du navigateur, son travail principal, au début, était de répondre aux actions de l'utilisateur, comme `onClick`, `onMouseOver`, `onChange`, `onSubmit` et ainsi de suite. Comment pouvait-il le faire avec un modèle de programmation synchrone ?

La réponse se trouvait dans son environnement. Le **navigateur** offre un moyen de le faire en fournissant un ensemble d'API qui peuvent gérer ce type de fonctionnalité.

Plus récemment, Node.js a introduit un environnement I/O non bloquant pour étendre ce concept à l'accès aux fichiers, aux appels réseau, etc.

## Callbacks

Vous ne pouvez pas savoir quand un utilisateur va cliquer sur un bouton. Donc, vous **définissez un gestionnaire d'événement pour l'événement de clic**. Cet event listener accepte une fonction, qui sera appelée lorsque l'événement est déclenché :

```js
document.getElementById('button').addEventListener('click', () => {
  // élément cliqué
});
```

C'est ce qu'on appelle le **callback**.

Une callback est une fonction simple qui est transmise comme valeur à une autre fonction et qui ne sera exécutée que lorsque l'événement se produira. Nous pouvons le faire parce que JavaScript dispose de fonctions de première classe, qui peuvent être affectées à des variables et transmises à d'autres fonctions (appelées **higher-order functions**).

Il est courant d'envelopper tout votre code client dans un event listener `load` sur l'objet `window`, qui exécute la fonction de rappel uniquement lorsque la page est prête :

```js
window.addEventListener('load', () => {
  // La fenêtre est chargée
  // faites ce que vous voulez
});
```

Les callbacks sont utilisés partout, pas seulement dans les événements DOM.

Un exemple courant est l'utilisation de minuteries :

```js
setTimeout(() => {
  // s'exécute après 2 secondes
}, 2000);
```

Les demandes XHR acceptent également un rappel, dans cet exemple en assignant une fonction à une propriété qui sera appelée lorsqu'un événement particulier se produit (dans ce cas, l'état de la demande change) :

```js
const xhr = new XMLHttpRequest();
xhr.onreadystatechange = () => {
  if (xhr.readyState === 4) {
    xhr.status === 200 ? console.log(xhr.responseText) : console.error('error');
  }
};
xhr.open('GET', 'https://yoursite.com');
xhr.send();
```

### Gestion des erreurs dans les callbacks

Comment gérer les erreurs avec les callbacks ? Une stratégie très courante consiste à utiliser ce que Node.js a adopté : le premier paramètre de toute fonction de callback est l'objet d'erreur : **error-first callbacks**

S'il n'y a pas d'erreur, l'objet est `null`. S'il y a une erreur, il contient une description de l'erreur et d'autres informations.

```js
const fs = require('fs');

fs.readFile('/file.json', (err, data) => {
  if (err) {
    // erreur de traitement
    console.log(err);
    return;
  }

  // pas d'erreurs, traitement des données
  console.log(data);
});
```

### Le problème des callbacks

Les rappels sont parfaits pour les cas simples !

Cependant, chaque callback ajoute un niveau d'imbrication, et lorsque vous avez beaucoup de callbacks, le code commence à être compliqué très rapidement :

```js
window.addEventListener('load', () => {
  document.getElementById('button').addEventListener('click', () => {
    setTimeout(() => {
      items.forEach(item => {
        // votre code ici
      });
    }, 2000);
  });
});
```

Il s'agit juste d'un code simple à 4 niveaux, mais j'ai vu beaucoup plus de niveaux d'imbrication et ce n'est pas amusant.

Comment résoudre ce problème ?

### Alternatives aux callbacks

À partir de l'ES6, JavaScript a introduit plusieurs fonctionnalités qui nous aident avec du code asynchrone qui n'implique pas l'utilisation de callbacks : Promesses (ES6) et Async/Await (ES2017).
