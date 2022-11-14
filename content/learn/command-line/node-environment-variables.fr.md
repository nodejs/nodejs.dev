---
title: how-to-read-environment-variables-from-nodejs
displayTitle: "Comment lire les variables d'environnement de Node.js"
description: "Apprenez à lire et à utiliser les variables d'environnement dans un programme Node.js."
authors: flaviocopes, MylesBorins, fhemberger, LaRuaNa, ahmadawais, manishprivet, augustinmauroy
category: learn
---

Le module central `process` de Node.js fournit la propriété `env` qui héberge toutes les variables d'environnement qui ont été définies au moment où le processus a été lancé.

Le code ci-dessous exécute `app.js` et définit `USER_ID` et `USER_KEY`.

```bash
USER_ID=239482 USER_KEY=foobar node app.js
```

Cela passera l'utilisateur `USER_ID` comme **239482** et le `USER_KEY` comme **foobar**. Cela convient pour les tests, mais en production, vous devrez probablement configurer des scripts bash pour exporter des variables.

> Note : `process` ne nécessite pas de "require", il est automatiquement disponible.

Voici un exemple qui accède aux variables d'environnement `USER_ID` et `USER_KEY`, que nous avons définies dans le code ci-dessus.

```js
process.env.USER_ID; // "239482"
process.env.USER_KEY; // "foobar"
```

De la même manière, vous pouvez accéder à toute variable d'environnement personnalisée que vous avez définie.

Si vous avez plusieurs variables d'environnement dans votre projet node, vous pouvez également créer un fichier `.env` dans le répertoire racine de votre projet, puis utiliser le paquet [dotenv](https://www.npmjs.com/package/dotenv) pour les charger pendant l'exécution.

```bash
# .env file
USER_ID="239482"
USER_KEY="foobar"
NODE_ENV="development"
```

Dans votre fichier js

```js
require('dotenv').config();

process.env.USER_ID; // "239482"
process.env.USER_KEY; // "foobar"
process.env.NODE_ENV; // "development"
```

> Vous pouvez également exécuter votre fichier js avec la commande `node -r dotenv/config index.js` si vous ne voulez pas importer le paquet dans votre code.
