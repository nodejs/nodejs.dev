---
title: introduction-to-nodejs
displayTitle: 'Introduction à Node.js'
description: "Guide de démarrage de Node.js, l'environnement d'exécution JavaScript côté serveur. Node.js est construit sur le moteur JavaScript V8 de Google Chrome, et il est principalement utilisé pour créer des serveurs Web - mais il n'est pas limité à cela...."
authors: flaviocopes, potch, MylesBorins, RomainLanz, virkt25, Trott, onel0p3z, ollelauribostrom, MarkPieszak, fhemberger, LaRuaNa, FrozenPandaz, mcollina, amiller-gh, ahmadawais, saqibameen, dangen-effy, aymen94, benhalverson, AugustinMauroy
category: learn
---

Node.js est un environnement d'exécution JavaScript open-source et multiplateforme. Il s'agit d'un outil populaire pour presque tous les types de projets !

Node.js exécute le moteur JavaScript V8, le cœur de Google Chrome, en dehors du navigateur. Cela permet à Node.js d'être très performant.

Une application Node.js fonctionne dans un seul processus, sans créer un nouveau thread pour chaque requête. Node.js fournit un ensemble de primitives d'E/S asynchrones dans sa bibliothèque standard qui empêche le code JavaScript de se bloquer et, en général, les bibliothèques de Node.js sont écrites en utilisant des paradigmes non bloquants, ce qui fait du comportement bloquant l'exception plutôt que la norme.

Lorsque Node.js effectue une opération d'E/S, comme la lecture du réseau, l'accès à une base de données ou au système de fichiers, au lieu de bloquer le thread et de gaspiller des cycles de CPU en attendant, Node.js reprendra les opérations lorsque la réponse reviendra.

Cela permet à Node.js de gérer des milliers de connexions simultanées avec un seul serveur sans avoir à gérer la concurrence entre les threads, ce qui pourrait être une source importante de bogues.

Node.js a un avantage unique car des millions de développeurs frontaux qui écrivent du JavaScript pour le navigateur sont maintenant capables d'écrire le code côté serveur en plus du code côté client sans avoir à apprendre un langage complètement différent.

Dans Node.js, les nouvelles normes ECMAScript peuvent être utilisées sans problème, car vous n'avez pas besoin d'attendre que tous vos utilisateurs mettent à jour leurs navigateurs - vous êtes en charge de décider quelle version ECMAScript utiliser en changeant la version de Node.js, et vous pouvez également activer des fonctionnalités expérimentales spécifiques en exécutant Node.js avec des drapeaux.

## Un exemple d'application Node.js

L'exemple le plus courant Hello World de Node.js est un serveur web :

<iframe title="Hello world web server" src="https://stackblitz.com/edit/nodejs-dev-0001-01?embed=1&file=index.js&zenmode=1" alt="nodejs-dev-0001-01 on StackBlitz" style="height: 400px; width: 100%; border: 0;" />

```js
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

Pour exécuter ce code, sauvegardez-le en tant que fichier `server.js` et exécutez `node server.js` dans votre terminal.

Ce code inclut d'abord le [module `http`] de Node.js (https://nodejs.org/api/http.html).

Node.js possède une fantastique [bibliothèque standard](https://nodejs.org/api/), y compris un support de première classe pour les réseaux.

La méthode `createServer()` de `http` crée un nouveau serveur HTTP et le renvoie.

Le serveur est configuré pour écouter sur le port et le nom d'hôte spécifiés. Lorsque le serveur est prêt, la fonction de rappel est appelée, dans ce cas, pour nous informer que le serveur est en cours d'exécution.

Lorsqu'une nouvelle requête est reçue, l'événement [`request`](https://nodejs.org/api/http.html#http_event_request) est appelé, fournissant deux objets : une requête (un objet [`http.IncomingMessage`](https://nodejs.org/api/http.html#http_class_http_incomingmessage)) et une réponse (un objet [`http.ServerResponse`](https://nodejs.org/api/http.html#http_class_http_serverresponse)).

Ces 2 objets sont essentiels pour gérer l'appel HTTP.

Le premier fournit les détails de la requête. Dans cet exemple simple, il n'est pas utilisé, mais vous pouvez accéder aux en-têtes et aux données de la requête.

Le second est utilisé pour retourner les données à l'appelant.

Dans ce cas, avec :

```js
res.statusCode = 200;
```

Nous définissons la propriété statusCode à 200, pour indiquer une réponse réussie.

Nous définissons l'en-tête Content-Type :

```js
res.setHeader('Content-Type', 'text/plain');
```

et nous fermons la réponse, en ajoutant le contenu comme argument à `end()` :

```js
res.end('Hello World\n');
```

### Plus d'exemples

Voir https://github.com/nodejs/examples pour une liste d'exemples Node.js qui vont au-delà de hello world.
