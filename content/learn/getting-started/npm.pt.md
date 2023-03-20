---
title: an-introduction-to-the-npm-package-manager
displayTitle: 'Uma introdução ao gestor de pacote NPM'
description: 'Um guia rápido ao npm, o poderoso gestor de pacote que tornou-se a chave para o sucesso da Node.js. Em Janeiro de 2017 mais de 350000 pacotes foram reportados como o número total de pacotes existentes no registo do npm, tornando-o o maior repositório de código de uma única linguagem na Terra, e podes estar certo de que existe um pacote para (quase!) tudo.'
authors: flaviocopes, MylesBorins, LaRuaNa, jgb-solutions, amiller-gh, ahmadawais, nazarepiedady
category: learn
---

<Alert>Lembra-te de que isto é uma breve introdução ao <code>NPM</code>. Para um guia mais profundo, consulte a <a href="https://docs.npmjs.com/">documentação do NPM</a>.</Alert>

## Introdução ao npm

O `npm` é o gestor de pacote padrão para a Node.js.

Em Setembro de 2022 mais de 2.1 milhões de pacotes foram reportados como o número total listado no registo do npm, tornando-o o maior repositório de código de uma única linguagem na Terra, e podes estar certo de que existe um pacote para (quase!) tudo.

Este começou como uma maneira de descarregar e gerir dependências dos pacotes da Node.js, mas tornou-se desde então uma ferramenta usada também na JavaScript do frontend.

> [**Yarn**](https://yarnpkg.com/en/) e [**pnpm**](https://pnpm.io) são alternativas para interface de linha de comando do npm. Tu podes consultá-los também.

## Pacotes

O `npm` lida com os descarregamentos de dependências do teu projeto.

### Instalando todas as dependências

Se um projeto tiver um ficheiro `package.json`, com a execução de:

```bash
npm install
```

ele instalará tudo que o projeto precisa, na pasta `node_modules`, criando-a se já não existir.

### Instalando um único pacote

Tu podes também instalar um pacote específico executando:

```bash
npm install <package-name>
```

Além disto, desde a versão 5 do npm, este comando adiciona o `<package-name>` ao objeto _`dependencies`_ do ficheiro `package.json`. Antes da versão 5, precisavas de adicionar a opção `--save`.

Muitas vezes verás mais opções adicionadas à este comando:

- `--save-dev` instala e adiciona uma entrada ao objeto _`devDependencies`_ do ficheiro `package.json`.
- `--no-save` instala mais não adiciona a entrada ao objeto _`dependencies`_ do ficheiro `package.json`.
- `--save-optional` instala e adiciona a entrada ao objeto _`optionalDependencies`_ do ficheiro `package.json`.
- `--no-optional` impedirá que dependências opcionais sejam instaladas.

Formas abreviadas de opções também podem ser usadas:

- \-S: `--save`
- \-D: `--save-dev`
- \-O: `--save-optional`

A diferença entre _`devDependencies`_ e _`dependencies`_ é que o primeiro contém as ferramentas de desenvolvimento, como uma biblioteca de testagem, enquanto o segundo é empacotado com a aplicação em produção.

Quanto ao _`optionalDependencies`_ a diferença é que a falha da construção de dependência não causará falha na instalação. Mas é responsabilidade do teu programa lidar com a carência de dependência. Leia mais sobre as [dependências opcionais](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#optionaldependencies).

### Atualizando os pacotes

A atualização também é facilmente feita, com a execução de:

```bash
npm update
```

O `npm` revisará todos os pacotes para uma versão mais recente que satisfaz as tuas restrições de versionamento.

Tu também podes especificar um único pacote à ser atualizado:

```bash
npm update <package-name>
```

## Versionando

Além dos simples descarregamentos, o `npm` também lida com o **versionamento**, assim podes especificar qualquer versão específica de um pacote, ou exigir uma versão superior ou inferior a aquela que precisas.

Muitas vezes descobrirás que uma biblioteca só é compatível com uma versão principal de uma outra biblioteca. Ou que um bug no lançamento mais recente de uma biblioteca, que continua sem correção, está causando um problema.

Especificar um versão explícita de uma biblioteca também ajuda a manter todos sobre a mesma versão exata de um pacote, para a equipa inteira execute a mesma versão até que o ficheiro `package.json` seja atualizado.

Em todos estes casos, o versionamento ajuda muito, e o `npm` segue o padrão de versionamento semântico (semver, sigla em Inglês).

Tu podes instalar uma versão específica de um pacote, com a execução de:

```bash
npm install <package-name>@<version>
```

## Executando Tarefas

O ficheiro `package.json` suporta um formato para especificação de tarefas de linha de comando que podem ser executadas usando:

```bash
npm run <task-name>
```

Por exemplo:

```json
{
  "scripts": {
    "start-dev": "node lib/server-development",
    "start": "node lib/server-production"
  }
}
```

É muito comum usar esta funcionalidade para executar a Webpack:

```json
{
  "scripts": {
    "watch": "webpack --watch --progress --colors --config webpack.conf.js",
    "dev": "webpack --progress --colors --config webpack.conf.js",
    "prod": "NODE_ENV=production webpack -p --config webpack.conf.js"
  }
}
```

Então no lugar de digitar estes longos comandos, os quais são fáceis de esquecer ou serem digitados incorretamente, podes executar:

```console
$ npm run watch
$ npm run dev
$ npm run prod
```
