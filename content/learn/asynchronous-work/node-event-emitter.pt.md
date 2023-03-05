---
title: the-nodejs-event-emitter
displayTitle: 'O emissor de evento da Node.js'
description: 'Como trabalhar com eventos personalizados na Node.js'
authors: flaviocopes, MylesBorins, fhemberger, LaRuaNa, ahmadawais, ovflowd, nazarepiedady
category: learn
---

Se trabalhaste com a JavaScript no navegador, sabes o quanto de interação do utilizador é manipulada através de eventos: cliques de rato, pressões de botão de teclado, reações aos movimentos do rato, e por aí fora.

No lado do backend, a Node.js oferece-nos a opção para construir um sistema parecido usando o [módulo de `events`](/api/events/).

Este módulo, em particular, oferece a classe `EventEmitter`, que usaremos para manipular os nossos eventos.

Tu o inicializas usando:

```js
const EventEmitter = require('events');

const eventEmitter = new EventEmitter();
```

Este objeto expõe, entre muito outros, os métodos `on` e `emit`.

* `emit` é usado para acionar um evento.
* `on` é usado para adicionar uma função de resposta que será executara quando o evento for acionado.

Por exemplo, vamos criar um evento `start`, e por uma questão de fornecer uma amostra, reagimos a isto apenas registando na consola:

```js
eventEmitter.on('start', () => {
  console.log('started');
});
```

Quando executamos:

```js
eventEmitter.emit('start');
```

a função do manipulador de evento é acionado, e recebemos o registo da consola.

Tu podes passar argumentos para o manipulador de evento passando-os como argumentos adicionais ao `emit()`:

```js
eventEmitter.on('start', number => {
  console.log(`started ${number}`);
});

eventEmitter.emit('start', 23);
```

Vários argumentos:

```js
eventEmitter.on('start', (start, end) => {
  console.log(`started from ${start} to ${end}`);
});

eventEmitter.emit('start', 1, 100);
```

O objeto `EventEmitter` também expõe vários outros métodos para interagir com os eventos, como:

* `once()`: adiciona um ouvinte de uma vez.
* `removeListener()` / `off()`: remove um ouvinte de evento de um evento.
* `removeAllListeners()`: remove todos os ouvintes para um evento.

Tu podes ler mais sobre estes métodos na [documentação oficial](/api/events/).
