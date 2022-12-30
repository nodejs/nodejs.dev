---
title: understanding-processnexttick
displayTitle: 'Comprendre process.nextTick()'
description: "La fonction process.nextTick de Node.js interagit avec la boucle d'événement d'une manière particulière."
authors: flaviocopes, MylesBorins, LaRuaNa, ahmadawais, ovflowd, thomasbnt, marksist300
category: learn
---

Lorsque vous essayez de comprendre la boucle d'événements de Node.js, une partie importante de celle-ci est `process.nextTick()`. Chaque fois que la boucle d'événement prend un voyage complet, nous l'appelons un tick.

Lorsque nous passons une fonction à `process.nextTick()`, nous demandons au moteur d'invoquer cette fonction à la fin de l'opération en cours, avant que le prochain tick de la boucle d'événement ne commence :

```js
process.nextTick(() => {
  // faire quelque chose
});
```

La boucle d'événements est occupée à traiter le code de la fonction en cours. Lorsque cette opération se termine, le moteur JS exécute toutes les fonctions passées aux appels `nextTick` pendant cette opération.

C'est le moyen de dire au moteur JS de traiter une fonction de manière asynchrone (après la fonction courante), mais dès que possible, sans la mettre en file d'attente.

L'appel à `setTimeout(() => {}, 0)` exécutera la fonction à la fin du prochain tick, bien plus tard qu'en utilisant `nextTick()` qui donne la priorité à l'appel et l'exécute juste avant le début du prochain tick.

Utilisez `nextTick()` lorsque vous voulez vous assurer que ce code sera déjà exécuté lors de la prochaine itération de la boucle d'événement.

#### Un exemple de l'ordre des événements :
```js
console.log("Bonjour => Numéro 1");

setTimeout(() => {
  console.log("Le timeout s'exécutant en dernier => Numéro 4");
}, 0);

setImmediate(() => {
  console.log("Exécution avant le timeout => Numéro 3");
});

process.nextTick(() => {
  console.log("Exécution au prochain tick => Numéro 2");
});
```
#### Output:
```bash
Bonjour => Numéro 1
Exécution au prochain tick => Numéro 2
Exécution avant le timeout => Numéro 3
Le timeout s'exécutant en dernier => Numéro 4
```
