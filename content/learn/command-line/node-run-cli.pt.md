---
title: run-nodejs-scripts-from-the-command-line
displayTitle: 'Executar programas de Node.js a partir da linha de comando'
description: 'Como executar qualquer programa de Node.js a partir da interface da linha de comando'
authors: flaviocopes, MylesBorins, fhemberger, LaRuaNa, ahmadawais, akazyti, nazarepiedady
category: learn
---

A maneira habitual de executar um programa de Node.js é executar o comando `node` disponível globalmente (uma vez que instalares a Node.js) e passar o nome do ficheiro que quiseres executar.

Se o ficheiro da tua aplicação principal de Node.js for `app.js`, podes chamá-lo digitando:

```bash
node app.js
```

No exemplo acima, estás a dizer explicitamente ao `shell` para executar o teu programa com a `node`. Tu podes também fixar esta informação no teu ficheiro de JavaScript com uma linha de "`shebang`". O "`shebang`" é a primeira linha no ficheiro, e diz ao sistema operacional qual interpretador usar para executar o programa. Abaixo está a primeira linha do ficheiro de JavaScript:

```js
#!/usr/bin/node
```

No exemplo acima, estamos explicitamente passando o caminho absoluto do interpretador. Nem todos os sistemas operacionais têm a `node` na pasta `bin` de binários, mas todos devem ter o binário `env`. Tu podes dizer ao sistema operacional para executar `env` com a `node` como parâmetro:

```js
#!/usr/bin/env node

// o teu código
```

Para usar uma "`shebang`", o teu ficheiro deve ter permissão de ficheiro executável. Tu podes dar ao `app.js` a permissão de ser executável executando o seguinte comando:

```bash
chmod u+x app.js
```

Entanto estiveres a executar o comando, certifica-te de que estás no mesmo diretório que contém o ficheiro `app.js`.

## Passar a sequência de caracteres como argumento para `node` no lugar do caminho do ficheiro

Para executares uma sequência de caracteres como argumento podes usar `-e` ou `--eval "script"`. Para avaliar o seguinte argumento como JavaScript. Os módulos que estão predefinidos na REPL também podem ser usados no programa.

No Windows, usando `cmd.exe` uma aspas simples não funcionará corretamente porque ele apenas reconhece aspas duplas `"` para citação. Na `Powershell` ou `Git Bash`, tanto `'` quanto `"` são usáveis:

```bash
node -e "console.log(123)"
```

## Reiniciar a aplicação automaticamente

O comando `node` tem de ser executado novamente na `bash` sempre que houver uma mudança na aplicação. Para reiniciar a aplicação automaticamente, use o módulo `nodemon`.

Instale o módulo `nodemon` globalmente para caminho do sistema:

```bash
npm i -g nodemon
```

Tu podes também instalar o `nodemon` como uma dependência de desenvolvimento:

```bash
npm i --save-dev nodemon
```

Esta instalação local do `nodemon` pode ser executada chamando-o a partir de dentro do programa de npm tal como `npm start` ou usando `npx nodemon`.

Execute a aplicação usando o comando `nodemon` seguido pelo nome do ficheiro da aplicação:

```bash
nodemon app.js
```
