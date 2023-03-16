---
title: reading-files-with-nodejs
displayTitle: 'Lendo ficheiros com a Node.js'
description: 'Como ler ficheiros usando a Node.js'
authors: flaviocopes, MylesBorins, fhemberger, LaRuaNa, ahmadawais, clean99, nazarepiedady
category: learn
---

A maneira mais simples de ler um ficheiro na Node.js é com o uso do método `fs.readFile()`, passando-o o caminho do ficheiro, a codificação e uma função de resposta que será chamada com os dados do ficheiro (e o erro):

```js
const fs = require('fs');

fs.readFile('/Users/joe/test.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});
```

De maneira alternativa, podes usar a versão síncrona `fs.readFileSync()`:

```js
const fs = require('fs');

try {
  const data = fs.readFileSync('/Users/joe/test.txt', 'utf8');
  console.log(data);
} catch (err) {
  console.error(err);
}
```

Tu podes também usar o método `fsPromises.readFile()` baseado em promessas oferecido pelo módulo `fs/promises`:

```js
const fs = require('fs/promises');

async function example() {
  try {
    const data = await fs.readFile('/Users/joe/test.txt', { encoding: 'utf8' });
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}
example();
```

Todos os três, `fs.readFile()`, `fs.readFileSync()` e `fsPromises.readFile()` lêm o conteúdo inteiro do ficheiro na memória antes de retornar os dados.

Isto significa que ficheiros grandes terão um grande impacto no consumo da tua memória e velocidade da execução do programa.

Neste caso, uma opção melhor é ler o conteúdo do ficheiro usando as correntes de informação (mais conhecidas em Inglês como `streams`).
