---
title: nodejs-with-webassembly
displayTitle: 'Node.js com a WebAssembly'
description: 'Descubra o porquê da WebAssembly ser uma ferramenta impressionante e aprenda a usá-la sozinho.'
authors: lancemccluskey, ovflowd, nazarepiedady
category: learn
---

**[WebAssembly](https://webassembly.org)** é uma linguagem de alto desempenho parecida com a linguagem Assembly que pode ser compilada a partir de várias linguagens, incluindo C, C++, Rust, e AssemblyScript. Atualmente, é suportada pelo Chrome, Firefox, Safari, Edge, e a Node.js!

A especificação da WebAssembly detalhe dois formatos de ficheiro, um formato binário chamado de Módulo de WebAssembly com a extensão `.wasm` e a representação correspondente de texto chamada de formato de Texto de WebAssembly com a extensão `.wat`.

## Conceitos Chaves

* Módulo - Um binário de WebAssembly compilado, por exemplo um ficheiro `.wasm`.
* Memória - Um `ArrayBuffer` redimensionável.
* Tabela - Um arranjo redimensionável de referências tipadas não guardadas na Memória.
* Instância - Uma instanciação de um Módulo com sua Memória, Tabela e variáveis.

Para usares a WebAssembly, precisas de um ficheiro binário `.wasm` e um conjunto de APIs para comunicar com a WebAssembly. A Node.js fornece as APIs necessárias através do objeto global `WebAssembly`.

```js
console.log(WebAssembly);
/*
Object [WebAssembly] {
  compile: [Function: compile],
  validate: [Function: validate],
  instantiate: [Function: instantiate]
}
*/
```

## Gerando Módulos de WebAssembly

Existem vários métodos disponíveis para gerar ficheiros binários de WebAssembly incluindo:

* Escrevendo o WebAssembly (`.wat`) a mão e convertendo-o para formato binário usando ferramentas tais como [wabt](https://github.com/webassembly/wabt).
* Usando [emscripten](https://emscripten.org/) com uma aplicação de C ou C++.
* Usando [wasm-pack](https://rustwasm.github.io/wasm-pack/book/) com uma aplicação de Rust.
* Usando [AssemblyScript](https://www.assemblyscript.org/) se preferires uma experiência parecida com a da TypeScript.

> Algumas destas ferramentas geram não apenas o ficheiro binário, mas o código "cola" de JavaScript e os ficheiros de HTML correspondentes para executarem no navegador.

## Como Usá-lo

Uma vez que tens um módulo de WebAssembly, podes usar o objeto `WebAssembly` da Node.js para instância-lo:

```js
// Presume que o ficheiro `add.wasm` existe e que contém uma única função somando dois argumentos fornecidos
const fs = require('fs');

const wasmBuffer = fs.readFileSync('/path/to/add.wasm');
WebAssembly.instantiate(wasmBuffer).then(wasmModule => {
  // A função exportada mora sob a `instance.exports`
  const { add } = wasmModule.instance.exports;
  const sum = add(5, 6);
  console.log(sum); // Saída: 11
});
```

## Interagindo com o Sistema Operacional

Os módulos de WebAssembly não podem por si mesmos acessar as funcionalidade do sistema operacional diretamente. Uma ferramenta de terceiro [Wasmtime](https://docs.wasmtime.dev/) pode ser usada para acessar estas funcionalidades. A `wasmtime` utiliza a API [WASI](https://wasi.dev/) para acessar as funcionalidades do sistema operacional.

## Recursos

* [Informação Geral da WebAssembly](https://webassembly.org/)
* [Documentação da MDN](https://developer.mozilla.org/en-US/docs/WebAssembly)
* [Escrever WebAssembly a Mão](https://webassembly.github.io/spec/core/text/index.html)
