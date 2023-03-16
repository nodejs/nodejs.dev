---
title: writing-files-with-nodejs
displayTitle: 'Escrevendo ficheiros com a Node.js'
description: 'Como escrever ficheiros usando a Node.js'
authors: flaviocopes, MylesBorins, fhemberger, LaRuaNa, ahmadawais, clean99, ovflowd, vaishnav-mk, nazarepiedady
category: learn
---

## Escrevendo um ficheiro

A maneira mais fácil de escrever em ficheiros na Node.js é usar a API `fs.writeFile()`:

```js
const fs = require('fs');

const content = 'Some content!';

fs.writeFile('/Users/joe/test.txt', content, err => {
  if (err) {
    console.error(err);
  }
  // ficheiro escrito com sucesso
});
```

### Escrevendo um ficheiro de maneira síncrona

De maneira alternativa, podes usar a versão síncrona `fs.writeFileSync()`:

```js
const fs = require('fs');

const content = 'Some content!';

try {
  fs.writeFileSync('/Users/joe/test.txt', content);
  // ficheiro escrito com sucesso
} catch (err) {
  console.error(err);
}
```

Tu podes também usar o método `fsPromises.writeFile()` baseado em promessas oferecido pelo módulo `fs/promises`:

```js
const fs = require('fs/promises');

async function example() {
  try {
    const content = 'Some content!';
    await fs.writeFile('/Users/joe/test.txt', content);
  } catch (err) {
    console.log(err);
  }
}
example();
```

Por padrão, esta API **substituirá os conteúdos do ficheiro** se o mesmo já existir.

**Tu podes modificar o padrão especificando uma opção:**

```js
fs.writeFile('/Users/joe/test.txt', content, { flag: 'a+' }, err => {});
```

#### As opções que provavelmente usarás são

| Opção | Descrição | Ficheiro é criado se não existir           |
|------|-------------|:-----------------------------------------------:|
| `r+` | Esta opção abre o ficheiro para **leitura** e **escrita** | ❌ |
| `w+` | Esta opção abre o ficheiro para **leitura** e **escrita** e também posiciona a linha no **princípio** do ficheiro | ✅                                                          |
| `a`  | Esta opção abre o ficheiro **escrita** e também posiciona a linha no **final** do ficheiro | ✅                                                                     |
| `a+` | Esta opção abre o ficheiro para **leitura** e **escrita** e também posiciona a linha no **final** do ficheiro | ✅                                                              |

* Tu podes encontrar mais informações sobre as opções na [documentação `fs`](/api/fs/#file-system-flags).

## Anexando conteúdo em um ficheiro

A adição de conteúdo no final dos ficheiros é útil quando não queres sobrescrever um ficheiro com o conteúdo novo, mas em vez disto adicioná-lo.

### Exemplos

Um método útil para anexar conteúdo no final do ficheiro é `fs.appendFile()` (e o seu equivalente `fs.appendFileSync()`):

```js
const fs = require('fs');

const content = 'Some content!';

fs.appendFile('file.log', content, err => {
  if (err) {
    console.error(err);
  }
  // feito!
});
```

#### Exemplo com Promessas

No bloco abaixo está um exemplo de `fsPromises.appendFile()`:

```js
const fs = require('fs/promises');

async function example() {
  try {
    const content = 'Some content!';
    await fs.appendFile('/Users/joe/test.txt', content);
  } catch (err) {
    console.log(err);
  }
}
example();
```
