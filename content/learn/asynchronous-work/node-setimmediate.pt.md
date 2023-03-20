---
title: understanding-setimmediate
displayTitle: 'Entendendo o setImmediate()'
description: 'A função setImmediate da Node.js interage com o laço de evento de uma maneira especial'
authors: flaviocopes, MylesBorins, LaRuaNa, ahmadawais, clean99, ovflowd, nazarepiedady
category: learn
---

Quando quiseres executar algum pedaço de código de maneira assíncrona, mas o mais cedo possível, uma opção é usar a função `setImmediate()` fornecida pela Node.js:

```js
setImmediate(() => {
  // executar alguma coisa
});
```

Qualquer função passada como argumento de `setImmediate()` é uma função de resposta que é executada na próxima iteração do laço de evento.

Em que a `setImmediate()` difere de `setTimeout(() => {}, 0)` (passando uma pausa de 0ms), e de `process.nextTick()` e `Promise.then()`?

Uma função passada para `process.nextTick()` será executada na iteração atual do laço de evento, depois a operação atual termina. Isto significa que sempre executará antes de `setTimeout` e `setImmediate`.

Uma função de resposta de `setTimeout()` com um atraso de 0ms é muito parecido com `setImmediate()`. A ordem da execução dependerá de vários fatores, mas serão ambos executados na próxima iteração do laço do evento.

Uma função de resposta de `process.nextTick` é adicionada à fila de `process.nextTick`. Uma função de resposta de `Promise.then()` é adicionada à fila de micro tarefa das promessas. Uma função de resposta de `setTimeout` e `setImmediate` é adicionada à fila de macro tarefa.

O laço de evento executa as tarefas na fila de `process.nextTick` em primeiro, e depois executa a fila de micro tarefa das promessas, e depois executa a fila de macro tarefa.

Abaixo está um exemplo para mostrar a ordem entre `setImmediate()`, `process.nextTick()` e `Promise.then()`:

<iframe
  title="Um exemplo simples para mostrar a diferença entre setImmediate, nextTick e Promise"
  src="https://stackblitz.com/edit/nodejs-dev-setimmediate?file=index.js&zenmode=1&view=editor"
  alt="nodejs-dev-setimmediate-example on StackBlitz"
  style="height: 500px; width: 100%; border: 0;">
</iframe>

Este código chamará primeiro `start()`, depois chamará `foo()` na fila de `process.nextTick`. Depois disto, ele lidará com a fila de micro tarefa das promessas, que imprime `bar` e adiciona `zoo()` na fila de `process.nextTick` ao mesmo tempo. Portanto, chamará `zoo()` que tem sido adicionado. No final, o `baz()` na fila de macro tarefa é chamada.
