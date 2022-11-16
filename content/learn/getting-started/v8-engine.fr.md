---
title: the-v8-javascript-engine
displayTitle: 'Le moteur JavaScript V8'
description: "V8 est le nom du moteur JavaScript qui équipe Google Chrome. C'est lui qui prend notre JavaScript et l'exécute lorsque nous naviguons avec Chrome. V8 fournit l'environnement d'exécution dans lequel JavaScript s'exécute. Le DOM et les autres API de la plate-forme Web sont fournis par le navigateur."
authors: flaviocopes, smfoote, co16353sidak, MylesBorins, LaRuaNa, andys8, ahmadawais, karlhorky, aymen94, AugustinMAuroy
category: learn
---

V8 est le nom du moteur JavaScript qui équipe Google Chrome. C'est lui qui prend notre JavaScript et l'exécute lorsque vous naviguez avec Chrome.

V8 est le moteur JavaScript, c'est-à-dire qu'il analyse et exécute le code JavaScript. Le DOM et les autres API de la plate-forme Web (ils constituent tous un environnement d'exécution) sont fournis par le navigateur.

Ce qui est génial, c'est que le moteur JavaScript est indépendant du navigateur dans lequel il est hébergé. Cette caractéristique clé a permis l'essor de Node.js. V8 a été choisi pour être le moteur qui alimente Node.js en 2009, et comme la popularité de Node.js a explosé, V8 est devenu le moteur qui alimente maintenant une quantité incroyable de code côté serveur écrit en JavaScript.

L'écosystème Node.js est énorme et grâce à V8, il alimente également des applications de bureau, avec des projets comme Electron.

## Autres moteurs JS

D'autres navigateurs ont leur propre moteur JavaScript :

* Firefox possède [**SpiderMonkey**](https://spidermonkey.dev)
* Safari possède [**JavaScriptCore**](https://developer.apple.com/documentation/javascriptcore) (également appelé Nitro).
* Edge était à l'origine basé sur [**Chakra**](https://github.com/Microsoft/ChakraCore) mais a été plus récemment [reconstruit en utilisant Chromium](https://support.microsoft.com/en-us/help/4501095/download-the-new-microsoft-edge-based-on-chromium) et le moteur V8.

et de nombreux autres existent également.

Tous ces moteurs mettent en œuvre la [norme ECMA ES-262](https://www.ecma-international.org/publications/standards/Ecma-262.htm), également appelée ECMAScript, la norme utilisée par JavaScript.

## La quête de la performance

V8 est écrit en C++, et il est continuellement amélioré. Il est portable et fonctionne sur Mac, Windows, Linux et plusieurs autres systèmes.

Dans cette introduction à V8, nous ignorerons les détails d'implémentation de V8 : ils peuvent être trouvés sur des sites faisant plus autorité (par exemple le [site officiel de V8](https://v8.dev/)), et ils changent avec le temps, souvent radicalement.

V8 est en constante évolution, tout comme les autres moteurs JavaScript, pour accélérer le Web et l'écosystème Node.js.

Sur le Web, il y a une course à la performance qui dure depuis des années, et nous (en tant qu'utilisateurs et développeurs) profitons beaucoup de cette compétition car nous obtenons des machines plus rapides et plus optimisées année après année.

## Compilation

JavaScript est généralement considéré comme un langage interprété, mais les moteurs JavaScript modernes ne se contentent plus d'interpréter JavaScript, ils le compilent.

Cela se produit depuis 2009, lorsque le compilateur JavaScript SpiderMonkey a été ajouté à Firefox 3.5, et que tout le monde a suivi cette idée.

JavaScript est compilé en interne par V8 avec une compilation **juste à temps** (JIT) **pour accélérer l'exécution.

Cela peut sembler contre-intuitif, mais depuis l'introduction de Google Maps en 2004, JavaScript est passé d'un langage qui exécutait généralement quelques dizaines de lignes de code à des applications complètes avec des milliers à des centaines de milliers de lignes s'exécutant dans le navigateur.

Nos applications peuvent désormais fonctionner pendant des heures dans un navigateur, au lieu de se résumer à quelques règles de validation de formulaires ou à de simples scripts.

Dans ce _nouveau monde_, la compilation de JavaScript est parfaitement logique car, même si cela peut prendre un peu plus de temps pour que JavaScript soit _prêt_, une fois fait, il sera beaucoup plus performant que du code purement interprété.
