---
title: 'Build an HTTP Server'
description: 'How to build an HTTP server with Node.js'
authors: flaviocopes, potch, MylesBorins, LaRuaNa, ahmadawais, dogafincan, AugustinMauroy
category: learn
---

Voici un exemple de serveur web HTTP Hello World :

<iframe
  title="Build an HTTP Server"
  src="https://stackblitz.com/edit/nodejs-dev-0009-01?index.js&zenmode=1"
  alt="nodejs-dev-0009-01 on StackBlitz"
  style="height: 400px; width: 100%; border: 0;">
</iframe>

Analysons-la brièvement. Nous incluons le module [`http`](https://nodejs.org/api/http.html).

Nous utilisons ce module pour créer un serveur HTTP.

Le serveur est configuré pour écouter sur le port spécifié, `3000`. Quand le serveur est prêt, la fonction callback `listen` est appelée.

La fonction de callback que nous passons est celle qui sera exécutée à chaque requête entrante. Lorsqu'une nouvelle demande est reçue, l'événement [`request`](https://nodejs.org/api/http.html#http_event_request) est appelé, fournissant deux objets : une demande (un objet [`http.IncomingMessage`](https://nodejs.org/api/http.html#http_class_http_incomingmessage)) et une réponse (un objet [`http.ServerResponse`](https://nodejs.org/api/http.html#http_class_http_serverresponse)).

`request` fournit les détails de la requête. Grâce à lui, nous accédons aux en-têtes et aux données de la requête.

`response` est utilisé pour remplir les données que nous allons retourner au client.

Dans ce cas, avec

```js
res.statusCode = 200;
```

nous définissons la propriété statusCode à 200, pour indiquer une réponse réussie.

Nous définissons également l'en-tête Content-Type :

```js
res.setHeader('Content-Type', 'text/html');
```

et nous fermons la réponse, en ajoutant le contenu comme argument à `end()` :

```js
res.end('<h1>Hello, World!</h1>');
```
