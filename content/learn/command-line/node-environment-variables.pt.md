---
title: how-to-read-environment-variables-from-nodejs
displayTitle: 'Como ler variáveis de ambiente a partir da Node.js'
description: 'Aprenda como ler e fazer uso de variáveis de ambiente em um programa de Node.js'
authors: flaviocopes, MylesBorins, fhemberger, LaRuaNa, ahmadawais, manishprivet, nazarepiedady
category: learn
---

O módulo de centro `process` da Node.js fornece a propriedade `env` que hospeda todas as variáveis de ambiente que foram definidas no momento que o processo foi iniciado.

O código abaixo executa o `app.js` e define as variáveis `USER_ID` e `USER_KEY`:

```bash
USER_ID=239482 USER_KEY=foobar node app.js
```

Que passarão o `USER_ID` do utilizador como **`239482`** e o `USER_KEY` como **`foobar`**. Isto é adequando para testagem, no entanto para produção, provavelmente estarás a configurar alguns programas de bash para exportar as variáveis.

> Nota: `process` não exige uma função `"require"` de importação de recurso, porque está disponível automaticamente.

No exemplo abaixo mostramos como acessamos as variáveis de ambiente `USER_ID` e `USER_KEY`, as quais definimos no código acima:

```js
process.env.USER_ID; // "239482"
process.env.USER_KEY; // "foobar"
```

Da mesma maneira podes acessar qualquer variável de ambiente que definires.

Se tiveres várias variáveis de ambiente no teu projeto de node, também podes criar um ficheiro `.env` na diretório raiz do teu projeto, e então usar o pacote [`dotenv`](https://www.npmjs.com/package/dotenv) para carregá-las durante a execução:

```bash
# ficheiro .env
USER_ID="239482"
USER_KEY="foobar"
NODE_ENV="development"
```

No teu ficheiro de JavaScript:

```js
require('dotenv').config();

process.env.USER_ID; // "239482"
process.env.USER_KEY; // "foobar"
process.env.NODE_ENV; // "development"
```

> Tu podes também executar o ficheiro de JavaScript com o comando `node -r dotenv/config index.js` se não quiseres importar o pacote no teu código.
