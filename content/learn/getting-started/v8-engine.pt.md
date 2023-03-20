---
title: the-v8-javascript-engine
displayTitle: 'O Motor de JavaScript V8'
description: "V8 é o nome do motor de JavaScript que alimenta o Google Chrome. É a coisa que pega o nosso código de JavaScript e executa-o enquanto navegamos com o Chrome. O V8 fornece o ambiente de execução no qual a JavaScript é executada. O DOM e as outras APIs da Plataforma da Web são fornecidos pelo navegador."
authors: flaviocopes, smfoote, co16353sidak, MylesBorins, LaRuaNa, andys8, ahmadawais, karlhorky, aymen94, nazarepiedady
category: learn
---

V8 é o nome do motor de JavaScript que alimenta o Google Chrome. É a coisa que pega o nosso código de JavaScript e executa-o enquanto navegamos com o Chrome.

O V8 é o motor de JavaScript que por exemplo, analisa e executa o código de JavaScript. O DOM, e as outras APIs da Plataforma da Web (o quais são ambientes de execução e composição) são fornecidos pelo navegador.

A coisa espantosa é que o motor de JavaScript é independente do navegador no qual está hospedado. Esta funcionalidade chave permitiu a ascensão da Node.js. O V8 foi escolhido para ser o motor que alimentou a Node.js em 2009, e conforma a popularidade da Node.js explodiu, o V8 tornou-se o motor que agora alimenta uma quantidade incrível de código de lado do servidor escrito em JavaScript.

O ecossistema da Node.js é enorme e graças ao V8 que também alimenta aplicações de área de trabalho, com projetos como a Electron.

## Outros motores de JavaScript

Outros navegadores também têm o seu próprio motor de JavaScript:

* Mozilla Firefox tem o [**SpiderMonkey**](https://spidermonkey.dev).
* Apple Safari tem o [**JavaScriptCore**](https://developer.apple.com/documentation/javascriptcore) (também chamado de Nitro).
* Microsoft Edge foi originalmente baseado no [**Chakra**](https://github.com/Microsoft/ChakraCore) mas foi recentemente [reconstruido usando o Chromium](https://support.microsoft.com/en-us/help/4501095/download-the-new-microsoft-edge-based-on-chromium).

e também é possível encontrar outros por aí fora.

Todos estes motores implementam o [padrão ECMA ES-262](https://www.ecma-international.org/publications/standards/Ecma-262.htm), também chamado de ECMAScript, o padrão usado pela JavaScript.

## A procura pelo desempenho

O V8 foi escrito em C++, e é continuamente melhorado. Ele é transportável e executa no MacOS, Windows, Distribuições de Linux e vários outros sistemas operacionais.

Nesta introdução do V8, ignoraremos os detalhes de implementação do V8: eles podem ser encontrados em locais mais fidedignos (por exemplo, a [página oficial do V8](https://v8.dev/)), e mudam ao longo do tempo, muitas vezes de maneira radical.

O V8 está sempre evoluindo, tal como os outros motores de JavaScript por aí, para acelerar a Web e o ecossistema da Node.js.

Na Web, existe uma corrida pelo desempenho que tem estado em curso por anos, e nós (como utilizadores e programadores) beneficiamos-nos muito desta competição porque temos avançado mais rápido e recebido máquinas otimizadas ano após ano.

## Compilação

A JavaScript é geralmente considera uma linguagem interpretada, mas os motores de JavaScript já não limitam-se a apenas interpretar o código de JavaScript, também compilam-no.

Isto tem acontecido desde 2009, quando o compilador de JavaScript SpiderMonkey foi adicionado ao Mozilla Firefox 3.5, e todos seguiram esta ideia.

A JavaScript é internamente compilada pelo V8 com a **compilação** **no momento certo** (JIT ou Just-In-Time, sigla em Inglês) para acelerar a execução.

Isto pode parecer contraintuitivo, mas desde a introdução do Google Maps em 2004, a JavaScript tem evoluído de uma linguagem que geralmente executava alguns montes de linhas de código para aplicações completas com milhares para centenas de milhares de linhas sendo executadas no navegador.

As nossas aplicações agora podem executar por horas dentro de um navegador, mais do que serem apenas algumas regras de validação de formulário ou programas simples.

Neste _novo mundo_, compilar a JavaScript faz todo e perfeito sentido porque embora demorar um pouco mais ter o código de JavaScript _pronto_, uma vez feito será muito mais otimizado do que o código puramente interpretado.
