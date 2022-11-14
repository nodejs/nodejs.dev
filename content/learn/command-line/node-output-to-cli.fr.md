---
title: output-to-the-command-line-using-nodejs
displayTitle: 'Sortie vers la ligne de commande en utilisant Node.js'
description: "Comment imprimer sur la console de la ligne de commande en utilisant Node.js, de la console.log de base à des scénarios plus complexes."
authors: flaviocopes, potch, MylesBorins, fhemberger, LaRuaNa, amiller-gh, ahmadawais, AugustinMauroy
category: learn
---

### Sortie de base en utilisant le module de console

Node.js fournit un module [`console`](/api/console/) qui offre des tonnes de moyens très utiles pour interagir avec la ligne de commande.

Il est fondamentalement le même que l'objet `console` que vous trouvez dans le navigateur.

La méthode la plus basique et la plus utilisée est `console.log()`, qui imprime la chaîne de caractères que vous lui passez dans la console.

Si vous passez un objet, il le rendra sous forme de chaîne.

Vous pouvez passer plusieurs arguments à `console.log`, par exemple :

```js
const x = 'x';
const y = 'y';
console.log(x, y);
```

et Node.js affichera les deux.

Nous pouvons également formater de jolies phrases en passant des variables et un spécificateur de format.

Par exemple :

```js
console.log('My %s has %d ears', 'cat', 2);
```

* `%s` formate une variable comme une chaîne de caractères
* `%d` format d'une variable comme un nombre
* `%i` formatera une variable en tant que partie entière seulement
* `%o` formate une variable en tant qu'objet

Exemple :

```js
console.log('%o', Number);
```

### Effacer la console

`console.clear()` efface la console (le comportement peut dépendre de la console utilisée)

### Compter les éléments

`console.count()` est une méthode pratique.

Prenez ce code :

<iframe
  title="Output to the command line using Node.js"
  src="https://stackblitz.com/edit/nodejs-dev-0002-01?index.js&zenmode=1&view=editor"
  alt="nodejs-dev-0002-01 on StackBlitz"
  style="height: 400px; width: 100%; border: 0;">
</iframe>

Ce qui se passe, c'est que `console.count()` comptera le nombre de fois qu'une chaîne est imprimée, et imprimera le compte à côté :

Tu peux juste compter les pommes et les oranges :

```js
const oranges = ['orange', 'orange'];
const apples = ['just one apple'];
oranges.forEach(fruit => {
  console.count(fruit);
});
apples.forEach(fruit => {
  console.count(fruit);
});
```

### Remise à zéro du comptage

La méthode `console.countReset()` remet à zéro le compteur utilisé avec console.count().

Nous utiliserons l'exemple des pommes et des oranges pour le démontrer.

```js
const oranges = ['orange', 'orange'];
const apples = ['just one apple'];
oranges.forEach(fruit => {
  console.count(fruit);
});
apples.forEach(fruit => {
  console.count(fruit);
});

console.countReset('orange');

oranges.forEach(fruit => {
  console.count(fruit);
});
```

Remarquez comment l'appel à `console.countReset('orange')` remet le compteur de valeurs à zéro.

### Imprimer la trace de la pile

Il peut y avoir des cas où il est utile d'imprimer la trace de la pile d'appels d'une fonction, peut-être pour répondre à la question _comment avez-vous atteint cette partie du code ?_

Vous pouvez le faire en utilisant `console.trace()` :

```js
const function2 = () => console.trace();
const function1 = () => function2();
function1();
```

Cela imprimera la trace de la pile. C'est ce qui est imprimé si nous essayons ceci dans le REPL de Node.js :

```bash
Trace
    at function2 (repl:1:33)
    at function1 (repl:1:25)
    at repl:1:1
    at ContextifyScript.Script.runInThisContext (vm.js:44:33)
    at REPLServer.defaultEval (repl.js:239:29)
    at bound (domain.js:301:14)
    at REPLServer.runBound [as eval] (domain.js:314:12)
    at REPLServer.onLine (repl.js:440:10)
    at emitOne (events.js:120:20)
    at REPLServer.emit (events.js:210:7)
```

### Calculer le temps passé

Vous pouvez facilement calculer le temps d'exécution d'une fonction, en utilisant `time()` et `timeEnd()`.

```js
const doSomething = () => console.log('test');
const measureDoingSomething = () => {
  console.time('doSomething()');
  // do something, and measure the time it takes
  doSomething();
  console.timeEnd('doSomething()');
};
measureDoingSomething();
```

### stdout et stderr

Comme nous l'avons vu, console.log permet d'imprimer des messages dans la Console. C'est ce que l'on appelle la sortie standard, ou `stdout`.

`console.error` s'imprime sur le flux `stderr`.

Il n'apparaîtra pas dans la console, mais il apparaîtra dans le journal des erreurs.

### Colorier la sortie

Vous pouvez colorer la sortie de votre texte dans la console en utilisant des [séquences d'échappement](https://gist.github.com/iamnewton/8754917). Une séquence d'échappement est un ensemble de caractères qui identifie une couleur.

Example:

```js
console.log('\x1b[33m%s\x1b[0m', 'hi!');
```

Vous pouvez essayer cela dans le REPL de Node.js, et il imprimera `hi!` en jaune.

Cependant, il s'agit d'une méthode de bas niveau. La façon la plus simple de colorer la sortie de la console est d'utiliser une bibliothèque. [Chalk](https://github.com/chalk/chalk) est une telle bibliothèque, et en plus de la coloration, elle permet également d'autres fonctions de style, comme mettre le texte en gras, en italique ou souligné.

Vous l'installez avec `npm install chalk@4`, puis vous pouvez l'utiliser :

```js
const chalk = require('chalk');

console.log(chalk.yellow('hi!'));
```

Utiliser `chalk.yellow` est beaucoup plus pratique que d'essayer de se souvenir des codes d'échappement, et le code est beaucoup plus lisible.

Consultez le lien du projet affiché ci-dessus pour plus d'exemples d'utilisation.

### Créer une barre de progression

[Progress](https://www.npmjs.com/package/progress) est un paquet génial pour créer une barre de progression dans la console. Installez-le en utilisant `npm install progress`.

Ce bout de code crée une barre de progression de 10 étapes, et toutes les 100 ms une étape est complétée. Lorsque la barre est terminée, nous supprimons l'action répétée :

```js
const ProgressBar = require('progress');

const bar = new ProgressBar(':bar', { total: 10 });
const timer = setInterval(() => {
  bar.tick();
  if (bar.complete) {
    clearInterval(timer);
  }
}, 100);
```
