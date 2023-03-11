---
title: nodejs-file-stats
displayTitle: 'Estatísticas do ficheiro da Node.js'
description: 'Como receber os detalhes de um ficheiro usando a Node.js'
authors: flaviocopes, ZYSzys, MylesBorins, fhemberger, LaRuaNa, ahmadawais, clean99, ovflowd, vaishnav-mk, nazarepiedady
category: learn
---

Cada ficheiro vem com um conjunto de detalhes que podemos inspecionar usando a Node.js. Em especial, usando o método `stat()` fornecido pelo [módulo `fs`](/api/fs/).

Tu o chamas passando um caminho de ficheiro, e uma vez que a Node.js receber os detalhes do ficheiro chamará a função de resposta que passares, com dois parâmetros: uma mensagem de erro, e as estatísticas do ficheiro:

```js
const fs = require('fs');

fs.stat('/Users/joe/test.txt', (err, stats) => {
  if (err) {
    console.error(err);
  }
  // nós temos acesso as estatísticas do ficheiro no `stats`
});
```

A Node.js também fornece um método síncrono, o qual bloqueia a linha de processamento até as estatísticas do ficheiro estiverem prontas:

```js
const fs = require('fs');

try {
  const stats = fs.statSync('/Users/joe/test.txt');
} catch (err) {
  console.error(err);
}
```

A informação do ficheiro é incluída na variável `stats`. Que tipo de informação podemos extrair usando a `stats`?

**Um monte, incluindo:**

* Se o ficheiro é um diretório ou um ficheiro, usando `stats.isFile()` e `stats.isDirectory()`.
* Se o ficheiro é uma ligação simbólica usando `stats.isSymbolicLink()`.
* O tamanho do ficheiro em bytes usando `stats.size`.

Existem outros métodos avançados, mas a proporção daquilo que usarás no teu dia-à-dia de programação é esta:

```js
const fs = require('fs');

fs.stat('/Users/joe/test.txt', (err, stats) => {
  if (err) {
    console.error(err);
    return;
  }

  stats.isFile(); // true
  stats.isDirectory(); // false
  stats.isSymbolicLink(); // false
  stats.size; // 1024000 //= 1MB
});
```

Tu podes também usar o método `fsPromises.stat()` baseado em promessas oferecido pelo módulo `fs/promises` se quiseres:

```js
const fs = require('fs/promises');

async function example() {
  try {
    const stats = await fs.stat('/Users/joe/test.txt');
    stats.isFile(); // true
    stats.isDirectory(); // false
    stats.isSymbolicLink(); // false
    stats.size; // 1024000 //= 1MB
  } catch (err) {
    console.log(err);
  }
}
example();
```

Tu podes ler mais a respeito do módulo `fs` na [documentação oficial](/api/fs/).
