---
title: differences-between-nodejs-and-the-browser
displayTitle: "Différences entre Node.js et le navigateur"
description: "En quoi l'écriture d'une application JavaScript dans Node.js diffère de la programmation pour le Web à l'intérieur du navigateur."
authors: flaviocopes, ollelauribostrom, MylesBorins, fhemberger, LaRuaNa, ahmadawais, karlhorky, AugustinMauroy
category: learn
---

Le navigateur et Node.js utilisent tous deux JavaScript comme langage de programmation. Construire des applications qui fonctionnent dans le navigateur est une chose complètement différente de la construction d'une application Node.js. Malgré le fait qu'il s'agit toujours de JavaScript, il y a quelques différences clés qui rendent l'expérience radicalement différente.

Du point de vue d'un développeur frontal qui utilise intensivement JavaScript, les applications Node.js présentent un avantage énorme : le confort de pouvoir tout programmer - le frontal et le backend - dans un seul langage.

Vous avez une énorme opportunité car nous savons à quel point il est difficile d'apprendre complètement, profondément un langage de programmation, et en utilisant le même langage pour effectuer tout votre travail sur le web - à la fois sur le client et sur le serveur, vous êtes dans une position unique d'avantage.

**Ce qui change, c'est l'écosystème.**

Dans le navigateur, la plupart du temps, ce que vous faites, c'est interagir avec le DOM, ou d'autres API de la plate-forme Web comme les cookies. Ceux-ci n'existent pas dans Node.js, bien sûr. Vous n'avez pas le `document`, `window` et tous les autres objets qui sont fournis par le navigateur.

Et dans le navigateur, nous n'avons pas toutes les belles API que Node.js fournit à travers ses modules, comme la fonctionnalité d'accès au système de fichiers.

Une autre grande différence est que dans Node.js vous contrôlez l'environnement. À moins que vous ne construisiez une application open source que tout le monde peut déployer n'importe où, vous savez sur quelle version de Node.js vous allez exécuter l'application. Comparé à l'environnement du navigateur, où vous n'avez pas le luxe de choisir quel navigateur vos visiteurs utiliseront, ceci est très pratique.

Cela signifie que vous pouvez écrire tout le JavaScript moderne ES2015+ que votre version de Node.js supporte. Puisque JavaScript évolue si rapidement, mais que les navigateurs peuvent être un peu lents à se mettre à jour, il arrive que sur le web, vous soyez coincé avec l'utilisation d'anciennes versions de JavaScript / ECMAScript. Vous pouvez utiliser Babel pour transformer votre code afin qu'il soit compatible avec ES5 avant de l'envoyer au navigateur, mais avec Node.js, vous n'en aurez pas besoin.

Une autre différence est que Node.js prend en charge les systèmes de modules CommonJS et ES (depuis Node.js v12), tandis que dans le navigateur, nous commençons à voir la norme des modules ES mise en œuvre.

En pratique, cela signifie que vous pouvez utiliser à la fois `require()` et `import` dans Node.js, alors que vous êtes limité à `import` dans le navigateur.
