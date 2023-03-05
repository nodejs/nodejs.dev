---
title: understanding-processnexttick
displayTitle: 'Entendendo process.nextTick()'
description: 'A função process.nextTick da Node.js interage com o laço de evento de uma maneira especial'
authors: flaviocopes, MylesBorins, LaRuaNa, ahmadawais, ovflowd, marksist300, nazarepiedady
category: learn
---

A medida que tentas entender o laço de evento da Node.js, uma parte importante deste é a `process.nextTick()`. Toda vez que o laço de evento demorar uma viagem completa, chamamos isto de um tiquetaque.

Quando passamos uma função para `process.nextTick()`, instruímos o motor a invocar esta função no final da operação atual, antes do próximo tiquetaque do laço de evento começar:

```js
process.nextTick(() => {
  // fazer alguma coisa
});
```

O laço de evento está ocupado processando o código da função atual. Quando este operação terminar, o motor de JavaScript executam todas as funções passadas para `nextTick` executam durante esta operação.

É a maneira que podemos dizer ao motor de JavaScript para processar uma função de maneira assíncrona (depois da função atual), mas o mais cedo possível, não enfileirá-lo.

A chamada de `setTimeout(() => {}, 0)` executará a função no final do próximo tiquetaque, muito depois de quando usares `nextTick()` que prioriza a chamada e executa-a apenas depois do início do próximo tiquetaque.

Use `nextTick()` quando quiseres certificar-te de que na próxima iteração do laço de evento este código já foi executado.

#### Um exemplo da ordem de eventos:

```js
console.log("Hello => number 1");

setTimeout(() => {
  console.log("The timeout running last => number 4");
}, 0);

setImmediate(() => {
  console.log("Running before the timeout => number 3");
});

process.nextTick(() => {
  console.log("Running at next tick => number 2");
});

```

#### Saída:

```bash
Hello => number 1
Running at next tick => number 2
Running before the timeout => number 3
The timeout running last => number 4
```
