---
title: run-nodejs-scripts-from-the-command-line
displayTitle: 'Exécuter des scripts Node.js à partir de la ligne de commande'
description: "Comment exécuter n'importe quel script Node.js à partir du CLI"
authors: flaviocopes, MylesBorins, fhemberger, LaRuaNa, ahmadawais, akazyti, AugustinMauroy
category: learn
---

La façon habituelle d'exécuter un programme Node.js est de lancer la commande `node` disponible dans le monde entier (une fois que vous avez installé Node.js) et de passer le nom du fichier que vous voulez exécuter.

Si votre fichier principal d'application Node.js est `app.js`, vous pouvez l'appeler en tapant :

```bash
node app.js
```

Ci-dessus, vous dites explicitement au shell d'exécuter votre script avec `node`. Vous pouvez également intégrer cette information dans votre fichier JavaScript avec une ligne "shebang". Le "shebang" est la première ligne du fichier, et indique au système d'exploitation quel interpréteur utiliser pour exécuter le script. Voici la première ligne de JavaScript :

```js
#!/usr/bin/node
```

Ci-dessus, nous donnons explicitement le chemin absolu de l'interpréteur. Tous les systèmes d'exploitation n'ont pas `node` dans le dossier bin, mais tous devraient avoir `env`. Vous pouvez demander au système d'exploitation de lancer `env` avec node comme paramètre :

```js
#!/usr/bin/env node

// votre code
```

Pour utiliser un shebang, votre fichier doit avoir la permission d'être exécutable. Vous pouvez donner à `app.js` la permission d'être exécuté en exécutant :

```bash
chmod u+x app.js
```

En exécutant la commande, assurez-vous que vous êtes dans le même répertoire que celui qui contient le fichier `app.js`.

## Passer la chaîne comme argument à `node` au lieu du chemin du fichier

Pour exécuter une chaîne de caractères comme argument, vous pouvez utiliser `-e`, `--eval "script"`. Evaluer l'argument suivant en tant que JavaScript. Les modules qui sont prédéfinis dans le REPL peuvent également être utilisés dans le script.

Sous Windows, en utilisant cmd.exe, un guillemet simple ne fonctionnera pas correctement car il ne reconnaît que le double `"` pour la citation. Dans Powershell ou Git bash, les deux guillemets `'` et `"` sont utilisables.

```bash
node -e "console.log(123)"
```

## Redémarrer l'application automatiquement

La commande `node` doit être ré-exécutée dans bash à chaque fois qu'il y a un changement dans l'application. Pour redémarrer l'application automatiquement, utilisez le module `nodemon`.

Installer le module nodemon globalement dans le chemin du système :

```bash
npm i -g nodemon
```

Vous pouvez également installer nodemon en tant que dépendance de développement :

```bash
npm i --save-dev nodemon
```

Cette installation locale de nodemon peut être exécutée en l'appelant depuis un script npm tel que npm start ou en utilisant npx nodemon.

Exécutez l'application en utilisant la commande `nodemon` suivie du nom du fichier de l'application :

```bash
nodemon app.js
```
