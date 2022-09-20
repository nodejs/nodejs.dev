---
title: Get HTTP request body data using Node.js
description: 'Find out how to extract the data sent as JSON through an HTTP request body using Node.js'
authors: flaviocopes, MylesBorins, fhemberger, LaRuaNa, ahmadawais, rodion-arr, AugustinMauroy
category: learn
---

Voici comment vous pouvez extraire les données qui ont été envoyées en JSON dans le corps de la requête.

Si vous utilisez Express, c'est très simple : utilisez le middleware `express.json()` qui est disponible à partir de la version 4.16.0 d'Express.

Par exemple, pour obtenir le corps de cette requête :

```js
const axios = require('axios');

axios.post('https://whatever.com/todos', {
  todo: 'Buy the milk',
});
```

C'est le code correspondant côté serveur :

```js
const express = require('express');

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.post('/todos', (req, res) => {
  console.log(req.body.todo);
});
```

Si vous n'utilisez pas Express et que vous voulez faire cela dans Node.js classique, vous devez faire un peu plus de travail, bien sûr, car Express fait abstraction de beaucoup de choses pour vous.

La chose essentielle à comprendre est que lorsque vous initialisez le serveur HTTP en utilisant `http.createServer()`, le callback est appelé lorsque le serveur reçoit tous les en-têtes HTTP, mais pas le corps de la requête.

L'objet `request` passé dans le callback de connexion est un flux.

Donc, nous devons écouter le contenu du corps de la requête pour le traiter, et il est traité par morceaux.

Nous obtenons d'abord les données en écoutant les événements `data` du flux, et quand les données se terminent, l'événement `end` du flux est appelé, une fois :

```js
const server = http.createServer((req, res) => {
  // nous pouvons accéder aux en-têtes HTTP
  req.on('data', chunk => {
    console.log(`Data chunk available: ${chunk}`);
  });
  req.on('end', () => {
    // fin des données
  });
});
```

Ainsi, pour accéder aux données, en supposant que nous nous attendons à recevoir une chaîne, nous devons concaténer les morceaux en une chaîne lors de l'écoute du flux `data`, et lorsque le flux `end`, nous analysons la chaîne en JSON :

```js
const server = http.createServer((req, res) => {
  let data = '';
  req.on('data', chunk => {
    data += chunk;
  });
  req.on('end', () => {
    console.log(JSON.parse(data).todo); // 'Buy the milk'
    res.end();
  });
});
```

A partir de Node.js v10, une syntaxe `for await ... of` est disponible. Elle simplifie l'exemple ci-dessus et le rend plus linéaire :

```js
const server = http.createServer(async (req, res) => {
  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  const data = Buffer.concat(buffers).toString();

  console.log(JSON.parse(data).todo); // 'Buy the milk'
  res.end();
});
```
