---
title: nodejs-the-difference-between-development-and-production
displayTitle: 'Node.js, a diferença entre o desenvolvimento e a produção'
description: 'Aprenda como definir configurações diferentes para os ambientes de produção e desenvolvimento'
authors: flaviocopes, MylesBorins, fhemberger, LaRuaNa, ahmadawais, RenanTKN, nazarepiedady
category: learn
---

Tu podes ter diferentes configurações para os ambientes de produção e desenvolvimento.

A Node.js presume sempre que está a executar em um ambiente de desenvolvimento. Tu podes assinalar a Node.js de que estás a executar em produção ao definir a variável de ambiente `NODE_ENV=production`.

Isto é normalmente feito com a execução do comando

```bash
export NODE_ENV=production
```

no shell, mas é melhor colocá-la no teu ficheiro de configuração do shell (por exemplo, `.bash_profile` com o shell do Bash) porque de outro modo a definição não persiste no caso de houver a reinicialização do sistema.

Tu podes também aplicar a variável do ambiente ao adicioná-lo ao princípio do teu comando de inicialização da aplicação:

```bash
NODE_ENV=production node app.js
```

Esta variável de ambiente é uma convenção que é também extensamente usada em bibliotecas externas.


Definir o ambiente para `production` geralmente garante que


* o registo em diário seja mantido ao mínimo, nível essencial
* mais níveis de armazenamento de consulta imediata têm lugar para otimizar o desempenho

Por exemplo a [Pug](https://pugjs.org), a biblioteca de modelos de marcação usada pela [Express](https://expressjs.com), compila no modo de desenvolvimento se o `NODE_ENV` for definido para `production`. As visões de Express são compiladas em toda requisição no modo de desenvolvimento, enquanto que em produção são armazenadas para consulta imediata. Existem muitos mais exemplos.

Tu podes usar declarações condicionais para executar o código em diferentes ambientes:

```js
if (process.env.NODE_ENV === 'development') {
  // ...
}

if (process.env.NODE_ENV === 'production') {
  // ...
}

if (['production', 'staging'].includes(process.env.NODE_ENV)) {
  // ...
}
```

Por exemplo, em uma aplicação de Express, podes usar isto para definir diferentes manipuladores de erro por ambiente:

```js
if (process.env.NODE_ENV === 'development') {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
}

if (process.env.NODE_ENV === 'production') {
  app.use(express.errorHandler());
}
```
