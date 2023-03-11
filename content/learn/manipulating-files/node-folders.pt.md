---
title: working-with-folders-in-nodejs
displayTitle: 'Trabalhando com pastas na Node.js'
description: 'Como interagir com as pastas usando a Node.js'
authors: flaviocopes, MylesBorins, fhemberger, liangpeili, LaRuaNa, ahmadawais, clean99, nazarepiedady
category: learn
---

O módulo `fs` do cerne da Node.js fornece muitos métodos úteis que podes usar para trabalhar com as pastas.

## Verificar se uma pasta existe

Use `fs.access()` (e o seu equivalente `fsPromises.access()` baseado em promessas) para verificar se a pasta existe e a Node.js pode acessá-lo com as suas permissões.

## Criar uma nova pasta

Use `fs.mkdir()` ou `fs.mkdirSync()` ou `fsPromises.mkdir()` para criar uma nova pasta:

```js
const fs = require('fs');

const folderName = '/Users/joe/test';

try {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
  }
} catch (err) {
  console.error(err);
}
```

## Ler o conteúdo de um diretório

Use `fs.readdir()` ou `fs.readdirSync()` ou `fsPromises.readdir()` para ler o conteúdo de um diretório.

Este pedaço de código lê o conteúdo de uma pasta, tanto ficheiros como sub.pastas, e retorna os seus caminhos relativos:

```js
const fs = require('fs');

const folderPath = '/Users/joe';

fs.readdirSync(folderPath);
```

Tu podes receber o caminho completo:

```js
fs.readdirSync(folderPath).map(fileName => {
  return path.join(folderPath, fileName);
});
```

Tu podes também filtrar os resultados para apenas retornar os ficheiros, e excluir as pastas:

```js
const isFile = fileName => {
  return fs.lstatSync(fileName).isFile();
};

fs.readdirSync(folderPath)
  .map(fileName => {
    return path.join(folderPath, fileName);
  })
  .filter(isFile);
```

## Renomear uma pasta

Use `fs.rename()` ou `fs.renameSync()` ou `fsPromises.rename()` para renomear uma pasta. O primeiro parâmetro é o caminho atual, o segundo é o novo caminho:

```js
const fs = require('fs');

fs.rename('/Users/joe', '/Users/roger', err => {
  if (err) {
    console.error(err);
  }
  // feito
});
```

O `fs.renameSync()` é a versão síncrona:

```js
const fs = require('fs');

try {
  fs.renameSync('/Users/joe', '/Users/roger');
} catch (err) {
  console.error(err);
}
```

O `fsPromises.rename()` é a versão baseada em promessas:

```js
const fs = require('fs/promises');

async function example() {
  try {
    await fs.rename('/Users/joe', '/Users/roger');
  } catch (err) {
    console.log(err);
  }
}
example();
```

## Remover uma pasta

Use `fs.rmdir()` ou `fs.rmdirSync()` ou `fsPromises.rmdir()` para remover uma pasta:

```js
const fs = require('fs');

fs.rmdir(dir, err => {
  if (err) {
    throw err;
  }

  console.log(`${dir} is deleted!`);
});
```

Para remover uma pasta que contém conteúdo use `fs.rm()` com a opção `{ recursive: true }` para remover os conteúdos recursivamente.

A opção `{ recursive: true, force: true }` faz com que as exceções sejam ignoradas se a pasta não existir:

```js
const fs = require('fs');

fs.rm(dir, { recursive: true, force: true }, err => {
  if (err) {
    throw err;
  }

  console.log(`${dir} is deleted!`);
});
```
