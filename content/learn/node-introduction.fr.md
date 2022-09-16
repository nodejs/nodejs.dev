---
title: Introduction to Node.js
description: "Getting started guide to Node.js, the server-side JavaScript runtime environment. Node.js is built on top of the Google Chrome V8 JavaScript engine, and it's mainly used to create web servers - but it's not limited to just that."
authors: flaviocopes, potch, MylesBorins, RomainLanz, virkt25, Trott, onel0p3z, ollelauribostrom, MarkPieszak, fhemberger, LaRuaNa, FrozenPandaz, mcollina, amiller-gh, ahmadawais, saqibameen, dangen-effy, aymen94, AugustinMauroy
section: Quick Start
category: learn
---

Node.js est un environnement d'exécution JavaScript open-source et multiplateforme. Il s'agit d'un outil populaire pour presque tous les types de projets !

Node.js exécute le moteur JavaScript V8, le cœur de Google Chrome, en dehors du navigateur. Cela permet à Node.js d'être très performant.

Une application Node.js s'exécute dans un seul processus, sans créer un nouveau thread pour chaque requête. Node.js fournit un ensemble de primitives d'E/S asynchrones dans sa bibliothèque standard qui empêche le code JavaScript de se bloquer et, en général, les bibliothèques de Node.js sont écrites en utilisant des paradigmes non bloquants, ce qui fait du comportement bloquant l'exception plutôt que la norme.

Lorsque Node.js effectue une opération d'E/S, comme la lecture du réseau, l'accès à une base de données ou au système de fichiers, au lieu de bloquer le fil et de gaspiller des cycles de CPU en attendant, Node.js reprendra les opérations lorsque la réponse reviendra.

Cela permet à Node.js de gérer des milliers de connexions simultanées avec un seul serveur sans avoir à gérer la concurrence des threads, ce qui pourrait être une source importante de bogues.

Node.js présente un avantage unique car des millions de développeurs frontaux qui écrivent du JavaScript pour le navigateur sont désormais en mesure d'écrire le code côté serveur en plus du code côté client sans avoir à apprendre un langage complètement différent.

Dans Node.js, les nouvelles normes ECMAScript peuvent être utilisées sans problème, car vous n'avez pas besoin d'attendre que tous vos utilisateurs mettent à jour leurs navigateurs - vous êtes en charge de décider quelle version ECMAScript utiliser en changeant la version de Node.js, et vous pouvez également activer des fonctionnalités expérimentales spécifiques en exécutant Node.js avec des drapeaux.

## Un grand nombre de bibliothèques

Avec sa structure simple, npm a contribué à la prolifération de l'écosystème de Node.js. Aujourd'hui, le registre npm héberge plus d'un million de paquets open source que vous pouvez utiliser librement.

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
  res.end('Bonjour touts le mondes!\n');
});

server.listen(port, hostname, () => {
  console.log(`Serveur fonctionnant à http://${hostname}:${port}/`);
});
```

Pour exécuter cet extrait, sauvegardez-le en tant que fichier `server.js` et exécutez `node server.js` dans votre terminal.-->

Ce code inclut d'abord le  [`http` module](https://nodejs.org/api/http.html) de Node.js.

Node.js dispose d'une fantastique [bibliothèque standard](https://nodejs.org/api/), y compris un support de première classe pour les réseaux.

La méthode `createServer()` de `http` crée un nouveau serveur HTTP et le renvoie.

Le serveur est configuré pour écouter sur le port et le nom d'hôte spécifiés. Lorsque le serveur est prêt, la fonction de rappel est appelée, dans ce cas, pour nous informer que le serveur est en cours d'exécution.

Chaque fois qu'une nouvelle demande est reçue, l'événement [`request`](https://nodejs.org/api/http.html#http_event_request) est appelé, fournissant deux objets : une demande (un objet [`http.IncomingMessage`](https://nodejs.org/api/http.html#http_class_http_incomingmessage)) et une réponse (un objet [`http.ServerResponse`](https://nodejs.org/api/http.html#http_class_http_serverresponse)).

Ces 2 objets sont essentiels pour gérer l'appel HTTP.

Le premier fournit les détails de la demande. Dans cet exemple simple, il n'est pas utilisé, mais vous pourriez accéder aux en-têtes et aux données de la requête.

La seconde est utilisée pour retourner les données à l'appelant.

Dans ce cas, avec :

```js
res.statusCode = 200;
```

nous définissons la propriété statusCode à 200, pour indiquer une réponse réussie.

Nous définissons l'en-tête Content-Type :

```js
res.setHeader('Content-Type', 'text/plain');
```

et nous fermons la réponse, en ajoutant le contenu comme argument à `end()` :

```js
res.end('Hello World\n');
```

## Frameworks et outils Node.js
Node.js est une plateforme de bas niveau. Afin de rendre les choses faciles et passionnantes pour les développeurs, des milliers de bibliothèques ont été construites sur Node.js par la communauté.

Beaucoup d'entre elles se sont imposées au fil du temps comme des options populaires. Voici une liste non exhaustive de ceux qui méritent d'être appris :

* [**AdonisJS**] (https://adonisjs.com/) : Un framework complet basé sur TypeScript, fortement axé sur l'ergonomie, la stabilité et la confiance des développeurs. Adonis est l'un des frameworks web Node.js les plus rapides.
* [**Egg.js**](https://eggjs.org) : Un cadre pour construire de meilleurs cadres et applications d'entreprise avec Node.js et Koa.
* [**Express**](https://expressjs.com/) : Il fournit l'un des moyens les plus simples et les plus puissants de créer un serveur Web. Son approche minimaliste, sans préjugés, centrée sur les fonctionnalités de base d'un serveur, est la clé de son succès.
* [**Fastify**] (https://fastify.io/) : Un framework web très axé sur la fourniture de la meilleure expérience pour le développeur avec le moins de frais généraux possible et une architecture de plugins puissante. Fastify est l'un des frameworks web Node.js les plus rapides.
* [**FeatherJS**](https://feathersjs.com/) : Feathers est un framework web léger pour créer des applications en temps réel et des API REST en utilisant JavaScript ou TypeScript. Créez des prototypes en quelques minutes et des applications prêtes pour la production en quelques jours.
* [**Gatsby**](https://www.gatsbyjs.com/) : Un générateur de sites statiques basé sur [React](https://reactjs.org/), alimenté par [GraphQL](https://graphql.org/) et doté d'un très riche écosystème de plugins et de modules de démarrage.
* [**hapi**](https://hapi.dev) : Un cadre riche pour la création d'applications et de services qui permet aux développeurs de se concentrer sur l'écriture d'une logique d'application réutilisable au lieu de passer du temps à construire une infrastructure.
* [**koa**](http://koajs.com/) : Construit par la même équipe qu'Express, il se veut encore plus simple et plus petit, en s'appuyant sur des années de connaissances. Ce nouveau projet est né de la nécessité de créer des changements incompatibles sans perturber la communauté existante.
* [**Loopback.io**] (https://loopback.io/) : Facilite la création d'applications modernes qui nécessitent des intégrations complexes.
* [**Meteor**](https://meteor.com) : Un framework full-stack incroyablement puissant, qui vous permet d'adopter une approche isomorphique de la création d'applications avec JavaScript, en partageant le code sur le client et le serveur. Autrefois un outil standard qui fournissait tout, il s'intègre désormais aux librairies frontales [React](https://reactjs.org/), [Vue](https://vuejs.org/) et [Angular](https://angular.io). Peut également être utilisé pour créer des applications mobiles.
* [**Micro**](https://github.com/zeit/micro) : Il fournit un serveur très léger pour créer des microservices HTTP asynchrones.
* [**NestJS**](https://nestjs.com/) : Un framework Node.js progressif basé sur TypeScript pour créer des applications côté serveur efficaces, fiables et évolutives de niveau entreprise.
**Next.js**](https://nextjs.org/) : Framework [React](https://reactjs.org) qui vous offre la meilleure expérience de développement avec toutes les fonctionnalités dont vous avez besoin pour la production : rendu hybride statique et serveur, prise en charge de TypeScript, bundling intelligent, route pre-fetching, et plus encore.
* [**Nx**](https://nx.dev/) : Une boîte à outils pour le développement monorepo complet à l'aide de NestJS, Express, [React](https://reactjs.org/), [Angular](https://angular.io), et plus encore ! Nx vous aide à faire évoluer votre développement d'une équipe créant une application à plusieurs équipes collaborant sur plusieurs applications !
* [**Remix**] (https://remix.run) : Remix est un framework web complet permettant de créer d'excellentes expériences utilisateur sur le web. Il est livré prêt à l'emploi avec tout ce dont vous avez besoin pour créer des applications web modernes (à la fois frontales et dorsales) et les déployer dans n'importe quel environnement d'exécution basé sur JavaScript (y compris Node.js).
* [**Sapper**] (https://sapper.svelte.dev/) : Sapper est un framework pour construire des applications web de toutes tailles, avec une belle expérience de développement et un routage flexible basé sur le système de fichiers. Offre SSR et plus encore !
* [**Socket.io**](https://socket.io/) : Un moteur de communication en temps réel pour construire des applications réseau.
* [**Strapi**](https://strapi.io/) : Strapi est un CMS Headless flexible et open-source qui donne aux développeurs la liberté de choisir leurs outils et frameworks préférés tout en permettant aux éditeurs de gérer et distribuer facilement leur contenu. En rendant le panneau d'administration et l'API extensibles grâce à un système de plugins, Strapi permet aux plus grandes entreprises du monde d'accélérer la diffusion de contenu tout en créant de magnifiques expériences numériques.
