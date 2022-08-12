---
title: à propos de
description: "à propos de | Node.js"
authors: XhmikosR, mikeal, fhemberger, Fishrock123, yous, tomgco, tniessen, SMcCandlish, saadq, Trott, Gornstats, piperchester, naoufal,  lpinca, j9t, bnoordhuis, harshadsabne, Chris911, benhalverson, AugustinMauroy
category: à propos de
---

En tant que moteur d'exécution JavaScript asynchrone piloté par les événements, Node.js est conçu pour construire
des applications réseau évolutives. Dans l'exemple suivant de "hello world", de nombreuses
connexions peuvent être traitées simultanément. A chaque connexion, le callback est
déclenchée, mais s'il n'y a pas de travail à faire, Node.js se met en veille.

```js
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Bonjour tout le monde!'); // fin de la réponse http
});

server.listen(port, hostname, () => {
  console.log(`Le serveur fonctionne à http://${hostname}:${port}/`);
});
```

Cela contraste avec le modèle de concurrence le plus courant aujourd'hui, dans lequel les threads de l'OS
sont utilisés. La mise en réseau basée sur les threads est relativement inefficace et très difficile à utiliser.
difficile à utiliser. En outre, les utilisateurs de Node.js n'ont pas à se soucier du blocage du processus, puisqu'il n'y a pas de verrous.
blocage du processus, puisqu'il n'y a pas de verrous. Presque aucune fonction de
Node.js n'effectue directement des E/S, de sorte que le processus ne se bloque jamais. Parce que rien ne bloque, les systèmes évolutifs sont très raisonnables à développer en Node.js.

Si certains de ces termes ne vous sont pas familiers, vous trouverez un article complet sur le site suivant
[Blocage vs. non-blocage][].

***

Node.js est similaire dans sa conception à, et influencé par, des systèmes comme Ruby's [Event Machine][] et Python [Twisted][].
[Event Machine][] de Ruby et [Twisted][] de Python. Node.js prend le modèle d'événement un peu plus loin.
un peu plus loin. Il présente une [boucle d'événement][] comme une construction d'exécution plutôt que comme une bibliothèque. Dans d'autres systèmes, il y a toujours un appel bloquant pour démarrer la [boucle d'événement][].
boucle d'événement.
Typiquement, le comportement est défini par des callbacks au début d'un script, et
à la fin, un serveur est démarré par un appel bloquant tel que
`EventMachine::run()`. Dans Node.js, il n'y a pas d'appel bloquant comme "start-the-event-loop".
Node.js entre simplement dans la boucle d'événement après avoir exécuté le script d'entrée. Node.js
sort de la boucle d'événement lorsqu'il n'y a plus de callbacks à exécuter. Ce comportement
est comme le JavaScript du navigateur - la boucle d'événements est cachée à l'utilisateur.

HTTP est un citoyen de première classe dans Node.js, conçu avec le streaming et une faible latence à l'esprit.
faible latence à l'esprit. Cela rend Node.js bien adapté pour la fondation d'un web
bibliothèque ou d'un cadre.

Le fait que Node.js soit conçu sans threads ne veut pas dire que vous ne pouvez pas
profiter de plusieurs cœurs dans votre environnement. Des processus enfants peuvent être créés
en utilisant notre API [`child_process.fork()`][], et sont conçus pour être faciles à communiquer.
communiquer avec. Construit sur cette même interface, le module [`cluster`][],
qui vous permet de partager des sockets entre les processus pour permettre l'équilibrage de la charge
sur vos cœurs.

[Blocage vs. non-blocage]: https://nodejs.org/en/docs/guides/blocking-vs-non-blocking/
[Event Machine]: https://github.com/eventmachine/eventmachine
[Twisted]: https://twistedmatrix.com/trac/
[`child_process.fork()`]: https://nodejs.org/api/child_process.html#child_process_child_process_fork_modulepath_args_options
[`cluster`]: https://nodejs.org/api/cluster.html
[boucle d'événement]: https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/
