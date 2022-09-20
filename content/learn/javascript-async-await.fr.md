---
title: 'Modern Asynchronous JavaScript with Async and Await'
description: 'Discover the modern approach to asynchronous functions in JavaScript. JavaScript evolved in a very short time from callbacks to Promises, and since ES2017 asynchronous JavaScript is even simpler with the async/await syntax'
authors: flaviocopes, potch, MylesBorins, LaRuaNa, amiller-gh, ahmadawais, AugustinMauroy
category: learn
---

## Introduction

JavaScript a évolué en très peu de temps, passant des callbacks aux promesses (ES2015), et depuis ES2017, le JavaScript asynchrone est encore plus simple avec la syntaxe async/await.

Les fonctions asynchrones sont une combinaison de promesses et de générateurs, et fondamentalement, elles sont une abstraction de plus haut niveau sur les promesses. Je le répète : **async/await est construit sur des promesses**.

## Pourquoi async/await ont-ils été introduits ?

Ils réduisent le boilerplate autour des promesses, et la limitation "ne pas briser la chaîne" de l'enchaînement des promesses.

Lorsque les promesses ont été introduites dans l'ES2015, elles étaient censées résoudre un problème avec le code asynchrone, et elles l'ont fait, mais au cours des deux années qui ont séparé l'ES2015 et l'ES2017, il était clair que les _promesses ne pouvaient pas être la solution ultime_.

Les promesses ont été introduites pour résoudre le fameux problème du _callback hell_, mais elles ont introduit une complexité propre, et une complexité syntaxique.

Elles constituaient de bonnes primitives autour desquelles une meilleure syntaxe pouvait être exposée aux développeurs, si bien qu'au moment opportun, nous avons obtenu des **fonctions asynchrones**.

They make the code look like it's synchronous, but it's asynchronous and non-blocking behind the scenes.

## Comment ça marche

Une fonction asynchrone renvoie une promesse, comme dans cet exemple :
```js
const doSomethingAsync = () => {
  return new Promise(resolve => {
    setTimeout(() => resolve('I did something'), 3000);
  });
};
```

Lorsque vous voulez **appeler** cette fonction, vous ajoutez `await`, et **le code d'appel s'arrêtera jusqu'à ce que la promesse soit résolue ou rejetée**. Une réserve : la fonction cliente doit être définie comme `async`. Voici un exemple :

```js
const doSomething = async () => {
  console.log(await doSomethingAsync());
};
```

## Un exemple rapide

Voici un exemple simple d'async/await utilisé pour exécuter une fonction de manière asynchrone :

<iframe
  title="Modern Asynchronous JavaScript with Async and Await"
  src="https://stackblitz.com/edit/nodejs-dev-0007-01?index.js&zenmode=1&view=editor"
  alt="nodejs-dev-0007-01 on StackBlitz"
  style="height: 400px; width: 100%; border: 0;">
</iframe>

## Promise all the things

Prepending the `async` keyword to any function means that the function will return a promise.

Even if it's not doing so explicitly, it will internally make it return a promise.

This is why this code is valid:

```js
const aFunction = async () => {
  return 'test';
};

aFunction().then(alert); // Cela donnera l'alerte à 'test'.
```

and it's the same as:

```js
const aFunction = () => {
  return Promise.resolve('test');
};

aFunction().then(alert); // Cela donnera l'alerte à 'test'.
```

## Le code est beaucoup plus simple à lire

Comme vous pouvez le voir dans l'exemple ci-dessus, notre code semble très simple. Comparez-le au code utilisant des promesses simples, avec des fonctions de chaînage et de rappel.

Et il s'agit d'un exemple très simple, les principaux avantages se présenteront lorsque le code sera beaucoup plus complexe.

Par exemple, voici comment obtenir une ressource JSON et l'analyser en utilisant des promesses :

```js
const getFirstUserData = () => {
  return fetch('/users.json') // obtenir la liste des utilisateurs
    .then(response => response.json()) // parse JSON
    .then(users => users[0]) // choisir le premier utilisateur
    .then(user => fetch(`/users/${user.name}`)) // obtenir les données de l'utilisateur
    .then(userResponse => userResponse.json()); // parse JSON
};

getFirstUserData();
```

Et voici la même fonctionnalité fournie en utilisant await/async :

```js
const getFirstUserData = async () => {
  const response = await fetch('/users.json'); // obtenir la liste des utilisateurs
  const users = await response.json(); // parse JSON
  const user = users[0]; // choisir le premier utilisateur
  const userResponse = await fetch(`/users/${user.name}`); // obtenir les données de l'utilisateur
  const userData = await userResponse.json(); // parse JSON
  return userData;
};

getFirstUserData();
```

## Plusieurs fonctions asynchrones en série

Les fonctions asynchrones peuvent être enchaînées très facilement, et la syntaxe est beaucoup plus lisible qu'avec les simples promesses :

<iframe
  title="Multiple async functions in series"
  src="https://stackblitz.com/edit/nodejs-dev-0008-01?index.js&zenmode=1&view=editor"
  alt="nodejs-dev-0008-01 on StackBlitz"
  style="height: 400px; width: 100%; border: 0;">
</iframe>

## Débogage plus facile

Le débogage des promesses est difficile parce que le débogueur ne passe pas sur le code asynchrone.

Async/await rend cela très facile car pour le compilateur, c'est comme du code synchrone.
