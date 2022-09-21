---
title: Understanding JavaScript Promises
displayTitle: 'Comprendre les promesses JavaScript'
description: 'Promises are one way to deal with asynchronous code in JavaScript, without writing too many callbacks in your code.'
authors: flaviocopes, potch, MylesBorins, LaRuaNa, bdharrington7, amiller-gh, ahmadawais, AugustinMauroy
category: learn
---

## Introduction aux promesses

<iframe title="Introduction to promises" src="https://stackblitz.com/edit/nodejs-dev-0006-01?index.js&zenmode=1&view=editor" alt="nodejs-dev-0006-01 on StackBlitz" style="height: 400px; width: 100%; border: 0;" />

Une promesse est généralement définie comme **un proxy pour une valeur qui deviendra éventuellement disponible**.

Les promesses sont un moyen de gérer le code asynchrone, sans se retrouver coincé dans [l'enfer des callbacks] (http://callbackhell.com/).

Les promesses font partie du langage depuis des années (elles ont été normalisées et introduites dans l'ES2015), et ont récemment été mieux intégrées, avec **async** et **await** dans l'ES2017.

Les fonctions **Async** utilisent les promesses en coulisse, donc comprendre comment les promesses fonctionnent est fondamental pour comprendre comment `async` et `await` fonctionnent.

### Comment fonctionnent les promesses, en bref

Une fois qu'une promesse a été appelée, elle démarre dans un **état d'attente**. Cela signifie que la fonction appelante continue à s'exécuter, tandis que la promesse est en attente jusqu'à ce qu'elle soit résolue, donnant à la fonction appelante les données demandées.

La promesse créée se terminera finalement dans un **état résolu**, ou dans un **état rejeté**, appelant les fonctions de rappel respectives (passées à `then` et `catch`) à la fin.

### Quelles API JS utilisent les promesses ?

En plus de votre propre code et de celui des bibliothèques, les promesses sont utilisées par les API Web modernes standard telles que :

* l'API Battery
* l'API Fetch
* Service Workers

Il est peu probable qu'en JavaScript moderne, vous ne vous trouviez _pas_ en train d'utiliser des promesses, alors commençons à nous y plonger.

***

## Créer une promesse

L'API Promise expose un constructeur Promise, que vous initialisez en utilisant `new Promise()` :

```js
const done = true;

const isItDoneYet = new Promise((resolve, reject) => {
  if (done) {
    const workDone = 'Here is the thing I built';
    resolve(workDone);
  } else {
    const why = 'Still working on something else';
    reject(why);
  }
});
```

Comme vous pouvez le voir, la promesse vérifie la constante globale `done`, et si c'est vrai, la promesse passe dans un état **résolu** (puisque la callback `resolve` a été appelée) ; sinon, la callback `reject` est exécutée, mettant la promesse dans un état rejeté. (Si aucune de ces fonctions n'est appelée dans le chemin d'exécution, la promesse restera dans un état d'attente).

En utilisant `resolve` et `reject`, nous pouvons communiquer à l'appelant l'état de la promesse et ce qu'il doit en faire. Dans le cas ci-dessus, nous avons juste retourné une chaîne de caractères, mais cela pourrait être un objet, ou `null` également. Parce que nous avons créé la promesse dans le snippet ci-dessus, elle a **déjà commencé à s'exécuter**. C'est important pour comprendre ce qui se passe dans la section [Consommer une promesse](#consuming-a-promise) ci-dessous.

Un exemple plus courant que vous pouvez rencontrer est une technique appelée **Promisifying**. Cette technique permet d'utiliser une fonction JavaScript classique qui prend un callback et renvoie une promesse :

```js
const fs = require('fs');

const getFile = fileName => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, (err, data) => {
      if (err) {
        reject(err); // appeler `reject` fera échouer la promesse avec ou sans l'erreur passée en argument.
        return; // et nous ne voulons pas aller plus loin
      }
      resolve(data);
    });
  });
};

getFile('/etc/passwd')
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

> Dans les versions récentes de Node.js, vous n'aurez pas à effectuer cette conversion manuelle pour une grande partie de l'API. Il existe une fonction de promesse disponible dans le module [util] (https://nodejs.org/docs/latest-v11.x/api/util.html#util_util_promisify_original) qui le fera pour vous, à condition que la fonction que vous promettez ait la bonne signature.

***

## Consommer une promesse

Dans la dernière section, nous avons présenté comment une promesse est créée.

Maintenant, voyons comment la promesse peut être _consommée_ ou utilisée.

```js
const isItDoneYet = new Promise(/* ... as above ... */);
// ...

const checkIfItsDone = () => {
  isItDoneYet
    .then(ok => {
      console.log(ok);
    })
    .catch(err => {
      console.error(err);
    });
};
```

L'exécution de `checkIfItsDone()` spécifiera les fonctions à exécuter lorsque la promesse `isItDoneYet` est résolue (dans l'appel `then`) ou rejetée (dans l'appel `catch`).

***

## Chaîner des promesses

Une promesse peut être retournée à une autre promesse, créant ainsi une chaîne de promesses.

Un excellent exemple d'enchaînement de promesses est l'API Fetch, que nous pouvons utiliser pour obtenir une ressource et mettre en file d'attente une chaîne de promesses à exécuter lorsque la ressource est extraite.

L'API Fetch est un mécanisme basé sur les promesses, et appeler `fetch()` est équivalent à définir notre propre promesse en utilisant `new Promise()`.

### Exemple d'enchaînement de promesses

```js
const status = response => {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  }
  return Promise.reject(new Error(response.statusText));
};

const json = response => response.json();

fetch('/todos.json')
  .then(status) // Notez que la fonction `status` est en fait **appelée** ici, et qu'elle **renvoie une promesse***.
  .then(json) // De même, la seule différence ici est que la fonction `json` renvoie une promesse qui se résout avec `data`.
  .then(data => {
    // ... c'est pourquoi `data` apparaît ici comme premier paramètre de la fonction anonyme
    console.log('Request succeeded with JSON response', data);
  })
  .catch(error => {
    console.log('Request failed', error);
  });
```

> [`node-fetch`](https://www.npmjs.com/package/node-fetch) est un code minimal pour l'API compatible avec window.fetch sur le runtime Node.js.

Dans cet exemple, nous appelons `fetch()` pour obtenir une liste d'éléments TODO à partir du fichier `todos.json` trouvé dans la racine du domaine, et nous créons une chaîne de promesses.

L'exécution de `fetch()` renvoie une [response](https://fetch.spec.whatwg.org/#concept-response), qui a de nombreuses propriétés, et parmi celles-ci nous faisons référence :

* `status`, une valeur numérique représentant le code d'état HTTP
* `statusText`, un message d'état, qui est `OK` si la requête a réussi.

`response` possède également une méthode `json()`, qui renvoie une promesse qui sera résolue avec le contenu du corps traité et transformé en JSON.

Donc, étant donné ces promesses, voici ce qui se passe : la première promesse de la chaîne est une fonction que nous avons définie, appelée `status()`, qui vérifie le statut de la réponse et si ce n'est pas une réponse réussie (entre 200 et 299), elle rejette la promesse.

Cette opération fera sauter toutes les promesses chaînées listées et passera directement à l'instruction `catch()` en bas, enregistrant le texte `Request failed` avec le message d'erreur.

Si elle réussit, elle appelle la fonction `json()` que nous avons définie. Puisque la promesse précédente, en cas de succès, a retourné l'objet `response`, nous le récupérons comme entrée pour la seconde promesse.

Dans ce cas, nous retournons les données traitées en JSON, donc la troisième promesse reçoit directement le JSON :

```js
fetch('/todos.json')
  .then(status)
  .then(json)
  .then(data => {
    console.log('Request succeeded with JSON response', data);
  });
```

et nous l'enregistrons simplement sur la console.

***

## Gestion des erreurs

Dans l'exemple, dans la section précédente, nous avions un `catch` qui était ajouté à la chaîne de promesses.

Lorsque quelque chose dans la chaîne de promesses échoue et soulève une erreur ou rejette la promesse, le contrôle va à l'instruction `catch()` la plus proche en bas de la chaîne.

```js
new Promise((resolve, reject) => {
  throw new Error('Error');
}).catch(err => {
  console.error(err);
});

// ou

new Promise((resolve, reject) => {
  reject('Error');
}).catch(err => {
  console.error(err);
});
```

### Erreurs en cascade

Si à l'intérieur du `catch()` vous lève une erreur, vous pouvez ajouter un deuxième `catch()` pour la gérer, et ainsi de suite.

```js
new Promise((resolve, reject) => {
  throw new Error('Error');
})
  .catch(err => {
    throw new Error('Error');
  })
  .catch(err => {
    console.error(err);
  });
```

***

## Orchestrer les promesses

### `Promise.all()`

Si vous avez besoin de synchroniser différentes promesses, `Promise.all()` vous aide à définir une liste de promesses, et à exécuter quelque chose quand elles sont toutes résolues.

Exemple :

```js
const f1 = fetch('/something.json');
const f2 = fetch('/something2.json');

Promise.all([f1, f2])
  .then(res => {
    console.log('Array of results', res);
  })
  .catch(err => {
    console.error(err);
  });
```

La syntaxe d'affectation de déstructuration de l'ES2015 vous permet également d'effectuer les opérations suivantes

```js
Promise.all([f1, f2]).then(([res1, res2]) => {
  console.log('Results', res1, res2);
});
```

Vous n'êtes pas limité à l'utilisation de `fetch` bien sûr, **toute promesse peut être utilisée de cette manière**.

### `Promise.race()`

`Promise.race()` s'exécute lorsque la première des promesses que vous lui passez est réglée (résolue ou rejetée), et il exécute le callback attaché une seule fois, avec le résultat de la première promesse réglée.

Exemple :

```js
const first = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, 'first');
});
const second = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'second');
});

Promise.race([first, second]).then(result => {
  console.log(result); // second
});
```

### `Promise.any()`

`Promise.any()` se résout lorsque l'une des promesses que vous lui passez se réalise ou que toutes les promesses sont rejetées. Elle retourne une seule promesse qui se résout avec la valeur de la première promesse qui s'est réalisée. Si toutes les promesses sont rejetées, alors la promesse retournée est rejetée avec un `AggregateError`.

Exemple :

```js
const first = new Promise((resolve, reject) => {
  setTimeout(reject, 500, 'first');
});
const second = new Promise((resolve, reject) => {
  setTimeout(reject, 100, 'second');
});

Promise.any([first, second]).catch(error => {
  console.log(error); // AggregateError
});
```

### Erreurs communes

### Uncaught TypeError : undefined is not a promise (Erreur de type non détectée : undefined n'est pas une promesse)

Si vous obtenez l'erreur `Uncaught TypeError : undefined is not a promise` dans la console, assurez-vous que vous utilisez `new Promise()` au lieu de simplement `Promise()`.

### UnhandledPromiseRejectionWarning (avertissement de rejet non traité)

Cela signifie qu'une promesse que vous avez appelée a été rejetée, mais qu'aucun `catch` n'a été utilisé pour gérer l'erreur. Ajoutez un `catch` après le `then` incriminé pour gérer cela correctement.
