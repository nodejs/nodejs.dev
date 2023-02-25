---
title: differences-between-nodejs-and-the-browser
displayTitle: 'Diferenças entre a Node.js e o Navegador'
description: 'Como é que a escrita de aplicação de JavaScript na Node.js difere da programação para Web dentro do Navegador'
authors: flaviocopes, ollelauribostrom, MylesBorins, fhemberger, LaRuaNa, ahmadawais, karlhorky, nazarepiedady
category: learn
---

Tanto o navegador como a Node.js usam a JavaScript como sua linguagem de programação. Construir aplicações que executam no navegador é uma coisa completamente diferente de que construir uma aplicação de Node.js. Apesar do fato de que sempre é JavaScript, existem algumas diferenças chaves que tornam a experiência radicalmente diferente.

A partir da perspetiva de um programador de frontend que usa extensivamente a JavaScript, as aplicações de Node.js traz uma enorme vantagem: o conforto de programar tudo - o frontend e backend - em uma única linguagem.

Tu tens uma enorme oportunidade porque sabemos o quão difícil é aprender profundamente e completamente uma linguagem de programação, e usando a mesma linguagem para realizar todo o teu trabalho na web - tanto no cliente como no servidor, estás em uma única posição de vantagem.

> **O que muda é o ecossistema.**

No navegador, a maior parte do tempo que estás a fazer é interagir com o DOM, ou outras APIs da Plataforma da Web como Cookies. Estes não existem na Node.js, claro. Tu não tens o `document`, `window` e todos os outros objetos que são fornecidos pelo navegador.

E no navegador, não temos todas as agradáveis APIs que a Node.js fornece através de seus módulos, como a funcionalidade de acesso ao sistema de ficheiro.

Um outra grande diferença é que na Node.js controlas o ambiente. A não ser que estejas a construir uma aplicação de código-aberto que qualquer um pode implementar em produção em qualquer lugar, sabes qual é a versão da Node.js sobre a qual executarás a aplicação. Comparada ao ambiente do navegador, onde não tens o luxo de escolher qual navegador os teus visitantes usarão, isto é muito conveniente.

Isto significa que podes escrever a JavaScript toda com todos os recursos modernos da ES2015+ que a tua versão de Node.js suportar. Já que a JavaScript move-se muito rápida, mas os navegadores podem ser um pouco lentos em atualizar, algumas na web estás preso com o uso de JavaScript ou lançamentos da ECMAScript mais antigos. Tu podes usar a Babel para transformar o teu código para ser compatível com a ES5 antes de entregá-lo ao navegador, mas na Node.js, não precisarás disto.

Um outra diferença é que a Node.js suporta tanto o CommonJS e e sistemas de módulo de ECMAScript (desde a versão 12 da Node.js), enquanto no navegador estamos a começar a ver o padrão de Módulos de ECMAScript a serem implementados.

Na prática, isto significa que podes usar tanto o `require()` e o `import` na Node.js, enquanto estás limitado ao `import` no navegador.
