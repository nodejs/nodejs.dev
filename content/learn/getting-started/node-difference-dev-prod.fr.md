---
title: nodejs-the-difference-between-development-and-production
displayTitle: 'Node.js, la différence entre le développement et la production'
description: 'Apprenez à mettre en place différentes configurations pour les environnements de production et de développement.'
authors: flaviocopes, MylesBorins, fhemberger, LaRuaNa, ahmadawais, RenanTKN, AugustinMauroy
category: learn
---

Vous pouvez avoir des configurations différentes pour les environnements de production et de développement.

Node.js suppose qu'il fonctionne toujours dans un environnement de développement.
Vous pouvez signaler à Node.js que vous êtes en production en définissant la variable d'environnement `NODE_ENV=production`.

Cela se fait généralement en exécutant la commande

```bash
export NODE_ENV=production
```

dans l'interpréteur de commandes, mais il est préférable de le mettre dans le fichier de configuration de votre interpréteur de commandes (par exemple `.bash_profile` avec l'interpréteur de commandes Bash) car sinon le paramètre ne persiste pas en cas de redémarrage du système.

Vous pouvez également appliquer la variable d'environnement en la faisant précéder de la commande d'initialisation de votre application :

```bash
NODE_ENV=production node app.js
```

Cette variable d'environnement est une convention qui est largement utilisée dans les bibliothèques externes également.

Définir l'environnement à `production` assure généralement que

* la journalisation est maintenue à un niveau minimal et essentiel
* davantage de niveaux de cache sont mis en place pour optimiser les performances.

Par exemple, Pug, la bibliothèque de templating utilisée par Express, se compile en mode débogage si `NODE_ENV` n'est pas défini comme `production`. Les vues Express sont compilées à chaque requête en mode développement, alors qu'en production elles sont mises en cache. Il existe de nombreux autres exemples.

Vous pouvez utiliser des instructions conditionnelles pour exécuter du code dans différents environnements :

```js
if (process.env.NODE_ENV === 'development') {
  // ...
}

if (process.env.NODE_ENV === 'production') {
  // ...
}

if (['production', 'staging'].includes(process.env.NODE_ENV)) {
  // ...
}
```

Par exemple, dans une application Express, vous pouvez l'utiliser pour définir différents gestionnaires d'erreurs par environnement :

```js
if (process.env.NODE_ENV === 'development') {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
}

if (process.env.NODE_ENV === 'production') {
  app.use(express.errorHandler());
}
```
