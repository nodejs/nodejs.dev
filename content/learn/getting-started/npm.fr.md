---
title: an-introduction-to-the-npm-package-manager
displayTitle: 'Introduction au gestionnaire de paquets NPM'
description: "Un guide rapide de npm, le puissant gestionnaire de paquets clé du succès de Node.js. En janvier 2017, plus de 350000 paquets ont été signalés comme étant répertoriés dans le registre npm, ce qui en fait le plus grand dépôt de code monolingue sur Terre, et vous pouvez être sûr qu'il y a un paquet pour (presque !) tout."
authors: flaviocopes, MylesBorins, LaRuaNa, jgb-solutions, amiller-gh, ahmadawais, AugustinMauroy
category: learn
---

<Alert>Gardez à l'esprit qu'il s'agit d'une brève introduction à <code>NPM</code>. Pour un guide plus approfondi, consultez le <a href="https://docs.npmjs.com/">NPM documentation</a>.</Alert>

## Introduction à npm

`npm` est le gestionnaire de paquets standard pour Node.js.

En septembre 2022, plus de 2,1 millions de paquets ont été répertoriés dans le registre npm, ce qui en fait le plus grand dépôt de code monolingue sur Terre, et vous pouvez être sûr qu'il y a un paquet pour (presque !) tout.

Il a commencé comme un moyen de télécharger et de gérer les dépendances des paquets Node.js, mais il est depuis devenu un outil utilisé également dans le JavaScript frontal.

> [**Yarn**](https://yarnpkg.com/en/) et [**pnpm**](https://pnpm.io) sont des alternatives à npm cli. Vous pouvez également les consulter.

## Paquets

`npm` gère les téléchargements des dépendances de votre projet.

### Installer toutes les dépendances

Si un projet a un fichier `package.json`, en exécutant

```bash
npm install
```

il installera tout ce dont le projet a besoin, dans le dossier `node_modules`, en le créant s'il n'existe pas déjà.

### Installation d'un seul paquetage

You can also install a specific package by running

```bash
npm install <package-name>
```

De plus, depuis npm 5, cette commande ajoute `<package-name>` au fichier `package.json` _dependencies_. Avant la version 5, vous deviez ajouter le flag `--save`.

Vous verrez souvent d'autres drapeaux ajoutés à cette commande :

- `--save-dev` installe et ajoute l'entrée au fichier `package.json` _devDependencies_.
- `--no-save` installe mais n'ajoute pas l'entrée au fichier `package.json` _dependencies_.
- `--save-optional` installe et ajoute l'entrée au fichier `package.json` _optionalDependencies_.
- `--no-optional` empêche l'installation des dépendances optionnelles.

Des raccourcis des drapeaux peuvent également être utilisés :

- \-S : `--save`
- \-D : `--save-dev`
- \-O : `--save-optional` (enregistrement facultatif)

La différence entre _devDependencies_ et _dependencies_ est que le premier contient des outils de développement, comme une bibliothèque de test, tandis que le second est fourni avec l'application en production.

Quant à _optionalDependencies_, la différence est que l'échec de la construction de la dépendance ne fera pas échouer l'installation. Mais c'est à votre programme qu'il incombe de gérer l'absence de cette dépendance. En savoir plus sur [dépendances optionnelles](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#optionaldependencies).

### Mise à jour des paquets

La mise à jour est également facilitée par l'exécution de

```bash
npm update
```

`npm` vérifiera tous les paquets pour une version plus récente qui satisfasse vos contraintes de versionnement.

Vous pouvez également spécifier un seul paquet à mettre à jour :

```bash
npm update <package-name>
```

## Versioning

En plus des simples téléchargements, `npm` gère également le **versioning**, de sorte que vous pouvez spécifier une version spécifique d'un paquet, ou demander une version supérieure ou inférieure à celle dont vous avez besoin.

Souvent, vous découvrirez qu'une bibliothèque n'est compatible qu'avec une version majeure d'une autre bibliothèque.

Ou bien un bogue dans la dernière version d'une bibliothèque, toujours non corrigé, cause un problème.

Spécifier une version explicite d'une bibliothèque permet également de garder tout le monde sur la même version exacte d'un paquet, de sorte que toute l'équipe exécute la même version jusqu'à ce que le fichier `package.json` soit mis à jour.

Dans tous ces cas, le versioning est très utile, et `npm` suit le standard du versioning sémantique (semver).

Vous pouvez installer une version spécifique d'un paquet, en exécutant

```bash
npm install <package-name>@<version>
```

## Exécution des tâches

Le fichier package.json prend en charge un format permettant de spécifier des tâches en ligne de commande qui peuvent être exécutées à l'aide de la commande

```bash
npm run <task-name>
```

Par exemple :

```json
{
  "scripts": {
    "start-dev": "node lib/server-development",
    "start": "node lib/server-production"
  }
}
```

Il est très courant d'utiliser cette fonctionnalité pour exécuter Webpack :

```json
{
  "scripts": {
    "watch": "webpack --watch --progress --colors --config webpack.conf.js",
    "dev": "webpack --progress --colors --config webpack.conf.js",
    "prod": "NODE_ENV=production webpack -p --config webpack.conf.js"
  }
}
```

Ainsi, au lieu de taper ces longues commandes, qui sont faciles à oublier ou à mal saisir, vous pouvez exécuter

```console
$ npm run watch
$ npm run dev
$ npm run prod
```
