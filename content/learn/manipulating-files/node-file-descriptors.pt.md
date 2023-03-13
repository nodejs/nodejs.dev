---
title: working-with-file-descriptors-in-nodejs
displayTitle: 'Trabalhando com os descritores de ficheiro na Node.js'
description: 'Como interagir com os descritores de ficheiro usando a Node.js'
authors: flaviocopes, MylesBorins, fhemberger, LaRuaNa, ahmadawais, clean99, vaishnav-mk, nazarepiedady
category: learn
---

Antes de seres capaz de interagir com um ficheiro que encontra-se no teu sistema de ficheiro, deves ter um descritor de ficheiro.

Um descritor de ficheiro é uma referência à um ficheiro aberto, um número (`fd`, descritor de ficheiro) retornado pela abertura do ficheiro usando o método `open()` oferecido pelo módulo `fs`. Este número (`fd`, ou descritor de ficheiro) unicamente identifica um ficheiro aberto no sistema operacional:

```js
const fs = require('fs');

fs.open('/Users/joe/test.txt', 'r', (err, fd) => {
  // `fd` é o nosso descritor de ficheiro
});
```

Repara a opção `r` que usamos como segundo parâmetro para a chamada de `fs.open()`.

Aquela opção significa que abrimos o ficheiro para leitura.

**Outras opções que comummente usarás são:**

<table>
  <tr>
    <th>Opção</th>
    <th>Descrição</th>
    <th>O ficheiro é criado se não existir</th>
  </tr>
  <tr>
    <td><code>r+</code></td>
    <td>Esta opção abre o ficheiro para <b>leitura</b> e <b>escrita</b></td>
    <td style="text-align: center;">❌</td>
  </tr>
  <tr>
    <td><code>w+</code></td>
    <td>Esta opção abre o ficheiro para <b>leitura</b> e <b>escrita</b> e também posiciona a linha no <b>princípio</b> do ficheiro</td>
    <td style="text-align: center;">✅</td>
  </tr>
  <tr>
    <td><code>a</code></td>
    <td>Esta opção abre o ficheiro para <b>escrita</b> e também posiciona a linha no <b>final</b> do ficheiro</td>
    <td style="text-align: center;">✅</td>
  </tr>
  <tr>
    <td><code>a+</code></td>
    <td>Esta opção abre o ficheiro para <b>leitura</b> e <b>escrita</b> e e também posiciona a linha no <b>final</b> do ficheiro</td>
    <td style="text-align: center;">✅</td>
  </tr>
</table>

Tu também podes abrir o ficheiro usando o método `fs.openSync()`, o qual retorna o descritor de ficheiro, no lugar de o fornecer em uma função de resposta:

```js
const fs = require('fs');

try {
  const fd = fs.openSync('/Users/joe/test.txt', 'r');
} catch (err) {
  console.error(err);
}
```

Uma vez que tiveres o descritor de ficheiro, de qualquer maneira que escolheres, podes realizar as operações que precisares, como chamar `fs.close()` e muitas outras operações que interagem com o sistema de ficheiro.

Tu podes também abrir o ficheiro usando o método `fsPromises.open()` baseado em processa oferecido pelo módulo `fs/promises`.

O módulo `fs/promises` está disponível apenas desde a versão 14 da Node.js. Antes da versão 14, depois da versão 10, podes usar `require('fs').promises` para obtê-lo. Antes da versão 10, depois da versão 8, podes usar `util.promisify` para converter os métodos de `fs` em métodos baseados em promessas:

```js
const fs = require('fs/promises');
// Ou const fs = require('fs').promises antes da versão 14.
async function example() {
  let filehandle;
  try {
    filehandle = await fs.open('/Users/joe/test.txt', 'r');
    console.log(filehandle.fd);
    console.log(await filehandle.readFile({ encoding: 'utf8' }));
  } finally {
    if (filehandle) await filehandle.close();
  }
}
example();
```

No bloco abaixo está um exemplo usando o `util.promisify`:

```js
const fs = require('fs');
const util = require('util');

async function example() {
  const open = util.promisify(fs.open);
  const fd = await open('/Users/joe/test.txt', 'r');
}
example();
```

Para veres mais detalhes a respeito do módulo `fs/promises`, consulte a [API `fs/promises`](/api/fs/#promise-example).
