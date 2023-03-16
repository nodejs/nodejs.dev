---
title: accept-input-from-the-command-line-in-nodejs
displayTitle: 'Aceitar entrada a partir da linha de comando na Node.js'
description: 'Como criar um programa interativo de interface da linha de comando da Node.js usando o módulo embutido readline da Node.js'
authors: flaviocopes, MylesBorins, fhemberger, LaRuaNa, ahmadawais, nazarepiedady
category: learn
---

Como criar um programa interativo de interface da linha de comando da Node.js?

Desde a versão 7 a Node.js fornece o [módulo `readline`](https://nodejs.org/api/readline.html) para realizar exatamente isto: receber a entrada a partir de uma corrente legível tal como a corrente de `process.stdin`, que durante a execução de um programa de Node.js é a entrada de terminal, em uma linha de cada vez:

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

Este pedaço de código pede o _nome_ do utilizador, e uma vez introduzido o texto e pressionada a tecla `enter` pelo utilizador, enviamos uma saudação.

O método `question()` mostra o primeiro parâmetro (uma questão) e espera pela entrada do utilizador. Ele chama uma função de resposta uma vez pressionada a tecla `enter`.

Na função de resposta, fechamos a interface de `readline`.

O `readline` oferece vários outros métodos, consulte-os na documentação do pacote cuja ligação foi apresentada acima.

Se precisares de exigir uma senha, é melhor não ecoá-la de volta, mas invés disso mostrar um símbolo `*`.

O maneira mais simples é usar o [pacote `readline-sync`](https://www.npmjs.com/package/readline-sync) que é muito similar em termos de API e manipula isto fora da caixa.

Uma solução mais completa e abstrata é fornecida pelo [pacote `inquirer.js`](https://github.com/SBoudrias/Inquirer.js).

Tu podes instalá-lo usando `npm install inquirer`, e então podes replicar o código acima desta maneira:

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

O `inquirer.js` permite-te fazer muitas coisas como pedir várias escolhas, ter botões de rádio, confirmações, e muito mais.

Vale a pena conhecer todas as alternativas, especialmente aquelas embutidas fornecidas pela Node.js, mas se planeias levar a entrada da interface da linha de comando para o próximo nível, `inquirer.js` é uma escolha ótima.
