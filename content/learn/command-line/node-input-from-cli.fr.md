---
title: accept-input-from-the-command-line-in-nodejs
displayTitle: 'Accepter les entrées de la ligne de commande dans Node.js'
description: "Comment rendre un programme CLI Node.js interactif à l'aide du module Node.js readline intégré"
authors: flaviocopes, MylesBorins, fhemberger, LaRuaNa, ahmadawais, AugustinMauroy
category: learn
---

Comment rendre un programme Node.js CLI interactif ?

Depuis la version 7 de Node.js, le module [`readline`](https://nodejs.org/api/readline.html) permet de réaliser exactement ceci : obtenir une entrée à partir d'un flux lisible tel que le flux `process.stdin`, qui pendant l'exécution d'un programme Node.js est l'entrée du terminal, une ligne à la fois.

```js
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question(`What's your name?`, name => {
  console.log(`Hi ${name}!`);
  readline.close();
});
```

Ce morceau de code demande le _nom_ de l'utilisateur, et une fois que le texte est saisi et que l'utilisateur appuie sur entrée, nous envoyons un message de bienvenue.

La méthode `question()` affiche le premier paramètre (une question) et attend la saisie de l'utilisateur. Elle appelle la fonction de rappel une fois que l'utilisateur a appuyé sur la touche Entrée.

Dans cette fonction de rappel, nous fermons l'interface readline.

`readline` offre plusieurs autres méthodes, veuillez les vérifier dans la documentation du paquetage liée ci-dessus.

Si vous avez besoin d'un mot de passe, il est préférable de ne pas le renvoyer, mais plutôt d'afficher un symbole `*`.

Le moyen le plus simple est d'utiliser le [paquet `readline-sync`](https://www.npmjs.com/package/readline-sync) qui est très similaire en termes d'API et qui gère cela dès le départ.

Une solution plus complète et plus abstraite est fournie par le paquet [Inquirer.js](https://github.com/SBoudrias/Inquirer.js).

Vous pouvez l'installer en utilisant `npm install inquirer`, et ensuite vous pouvez répliquer le code ci-dessus comme ceci :

```js
const inquirer = require('inquirer');

const questions = [
  {
    type: 'input',
    name: 'name',
    message: "What's your name?",
  },
];

inquirer.prompt(questions).then(answers => {
  console.log(`Hi ${answers.name}!`);
});
```

Inquirer.js vous permet de faire beaucoup de choses comme demander des choix multiples, avoir des boutons radio, des confirmations, et plus encore.

Il vaut la peine de connaître toutes les alternatives, en particulier les alternatives intégrées fournies par Node.js, mais si vous envisagez de faire passer la saisie CLI au niveau supérieur, Inquirer.js est un choix optimal.
