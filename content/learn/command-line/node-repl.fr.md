---
title: how-to-use-the-nodejs-repl
displayTitle: 'Comment utiliser le REPL de Node.js ?'
description: "REPL est l'acronyme de Read-Evaluate-Print-Loop, et c'est un excellent moyen d'explorer rapidement les fonctionnalités de Node.js."
authors: flaviocopes, MylesBorins, fhemberger, LaRuaNa, ahmadawais, vaishnav-mk, augustinmauroy
category: learn
---

La commande `node` est celle que nous utilisons pour exécuter nos scripts Node.js :

```bash
node script.js
```

Si nous lançons la commande `node` sans aucun script à exécuter ou sans aucun argument, nous démarrons une session REPL :

```bash
node
```

> **Remarque :** `REPL` L'acronyme REPL signifie Read Evaluate Print Loop (lecture, évaluation, impression, boucle). Il s'agit d'un environnement de langage de programmation (essentiellement une fenêtre de console) qui prend une seule expression comme entrée utilisateur et renvoie le résultat à la console après exécution. La session REPL offre un moyen pratique de tester rapidement un code JavaScript simple.

Si vous essayez maintenant dans votre terminal, voici ce qui se passe :

```bash
❯ node
>
```

La commande reste en mode inactif et attend que nous entrions quelque chose.

> **Conseil :** si vous n'êtes pas sûr de savoir comment ouvrir votre terminal, cherchez dans Google "Comment ouvrir un terminal sur votre système d'exploitation".

Le REPL attend que nous entrions du code JavaScript, pour être plus précis.

Commencez simplement et entrez

```console
> console.log('test')
test
undefined
>
```

La première valeur, `test`, est la sortie que nous avons demandé à la console d'imprimer, puis nous obtenons `undefined` qui est la valeur de retour de l'exécution de `console.log()`.
Node a lu cette ligne de code, l'a évaluée, a imprimé le résultat, puis est retourné attendre d'autres lignes de code. Node passera en boucle ces trois étapes pour chaque morceau de code que nous exécutons dans le REPL jusqu'à ce que nous quittions la session. C'est de là que le REPL tient son nom.

Node imprime automatiquement le résultat de toute ligne de code JavaScript sans qu'il soit nécessaire de lui en donner l'ordre. Par exemple, tapez la ligne suivante et appuyez sur Entrée :

```console
> 5 === '5'
false
>
```

Notez la différence dans les sorties des deux lignes ci-dessus. Le Node REPL a imprimé `undefined` après avoir exécuté `console.log()`, alors que d'autre part, il a juste imprimé le résultat de `5 === '5'`. Vous devez garder à l'esprit que la première est juste une déclaration en JavaScript, et que la seconde est une expression.

Dans certains cas, le code que vous voulez tester peut nécessiter plusieurs lignes. Par exemple, si vous voulez définir une fonction qui génère un nombre aléatoire, dans la session REPL, tapez la ligne suivante et appuyez sur Entrée :

```console
function generateRandom() {
...
```

Le REPL de Node est suffisamment intelligent pour déterminer que vous n'avez pas encore fini d'écrire votre code, et il passera en mode multi-ligne pour vous permettre de taper plus de code. Maintenant, terminez la définition de votre fonction et appuyez sur la touche Entrée :

```console
function generateRandom() {
...return Math.random()
}
undefined
```

### ### La variable spéciale `_`

Si après un certain code vous tapez `_`, cela va imprimer le résultat de la dernière opération.

### La touche flèche vers le haut

Si vous appuyez sur la flèche `up`, vous aurez accès à l'historique des lignes de code précédentes exécutées dans la session REPL actuelle, et même dans les sessions précédentes.

### Commandes commençant par un point

Le REPL possède quelques commandes spéciales, qui commencent toutes par un point `.`. Elles sont

* `.help` : montre les commandes point help
* `.editor` : active le mode éditeur, pour écrire facilement du code JavaScript multiligne. Une fois que vous êtes dans ce mode, entrez ctrl-D pour exécuter le code que vous avez écrit.
* `.break` : lorsque vous saisissez une expression multi-lignes, la commande .break interrompt la saisie. C'est la même chose que d'appuyer sur ctrl-C.
* `.clear` : réinitialise le contexte REPL à un objet vide et efface toute expression multi-ligne en cours de saisie.
* `.load` : charge un fichier JavaScript, relativement au répertoire de travail actuel.
* `.save` : sauvegarde tout ce que vous avez saisi dans la session REPL dans un fichier (spécifiez le nom du fichier).
* `.exit` : quitte la session REPL (comme si vous aviez appuyé deux fois sur ctrl-C).

Le REPL sait quand vous tapez une déclaration de plusieurs lignes sans avoir besoin d'invoquer `.editor`.

Par exemple, si vous commencez à taper une itération comme ceci :

```console
[1, 2, 3].forEach(num => {
```

et que vous appuyez sur `enter`, le REPL passera à une nouvelle ligne qui commence par 3 points, indiquant que vous pouvez maintenant continuer à travailler sur ce bloc.

```console
... console.log(num)
... })
```

Si vous tapez `.break` à la fin d'une ligne, le mode multiligne s'arrêtera et la déclaration ne sera pas exécutée.

### Exécuter REPL à partir d'un fichier JavaScript

Nous pouvons importer le REPL dans un fichier JavaScript en utilisant `repl`.

```js
const repl = require('repl');
```

En utilisant la variable repl, nous pouvons effectuer diverses opérations.
Pour lancer l'invite de commande REPL, tapez la ligne suivante

```js
repl.start();
```

Exécutez le fichier dans la ligne de commande.

```bash
node repl.js
```

```console
> const n = 10
```

Vous pouvez passer une chaîne qui s'affiche lorsque le REPL démarre. La valeur par défaut est '> ' (avec un espace à la fin), mais nous pouvons définir des invites personnalisées.

```js
// a Unix style prompt
const local = repl.start('$ ');
```

Vous pouvez afficher un message tout en quittant le REPL

```js
local.on('exit', () => {
  console.log('exiting repl');
  process.exit();
});
```

Vous pouvez en savoir plus sur le module REPL dans la [documentation repl](/api/repl/).
