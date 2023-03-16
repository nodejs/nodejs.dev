---
title: overview-of-blocking-vs-non-blocking
displayTitle: 'Perspetiva Geral do Conceito de Bloqueante vs Não Bloqueante'
authors: ovflowd, HassanBahati, nazarepiedady
category: learn
---

Esta visão de conjunto cobre a diferença entre as chamadas **bloqueantes** e **não bloqueantes** na Node.js. Esta visão geral referir-se-á ao laço de evento e `libuv` mas nenhum conhecimento prévio destes tópicos não é obrigatório. Assume-se de que os leitores têm um entendimento básico do [padrão de função de resposta](/learn/javascript-asynchronous-programming-and-callbacks/) da linguagem de JavaScript e da plataforma da Node.js.

> "I/O" (**Input/Output** por extenso em Inglês, **Entrada/Saída** em Português) refere-se primariamente à interação com o disco e a rede do sistema suportada pela [`libuv`](https://libuv.org/).

## Bloqueante

**Bloqueante** é quando a execução do código de JavaScript adicional no processo da Node.js deve esperar até uma operação que não é de JavaScript terminar. Isto acontece porque o laço de evento é incapaz para continuar a execução do código de JavaScript enquanto uma operação **bloqueante** está acontecendo.

Na Node.js, o código de JavaScript que apresenta pobreza de desempenho por ser intenso em CPU no lugar de esperar uma operação que não é de JavaScript, tais como I/O, normalmente não são remetidas como **bloqueante**. Os métodos síncronos na biblioteca padrão da Node.js que usam a `libuv` são as operações **bloqueantes** mais comummente usadas. Os módulos nativos também podem ter métodos **bloqueantes**.

Todos os métodos de I/O na biblioteca padrão da Node.js fornecem versões assíncronas, que são **não bloqueantes**, e aceitam funções de resposta. Alguns métodos também têm equivalentes **bloqueantes**, que têm nomes que terminam com `Sync`.

## Comparando Código

Os métodos **bloqueantes** executam **de maneira síncrona** e o métodos **não bloqueantes** executam **de maneira assíncrona**.

Usando o módulo de Sistema de Ficheiro como exemplo, este é uma leitura de ficheiro **síncrona**:

```js
const fs = require('fs');

const data = fs.readFileSync('/file.md'); // bloqueia até que o ficheiro seja lido
```

E aqui está um exemplo **assíncrono** equivalente:

```js
const fs = require('fs');

fs.readFile('/file.md', (err, data) => {
  if (err) throw err;
});
```

O primeiro exemplo parecesse com o segundo mais tem a desvantagem da segunda linha **bloqueando** a execução de qualquer código adicional de JavaScript até o ficheiro inteiro ser lido. Nota que na versão síncrona se um erro for lançado, precisará ser capturado ou o processo rebentará. Na versão assíncrona, está sobre a responsabilidade do autor decidir se um erro deve ser lançado como mostrado.

Vamos expandir um pouco o nosso exemplo:

```js
const fs = require('fs');

const data = fs.readFileSync('/file.md'); // bloqueia até que o ficheiro seja lido
console.log(data);
moreWork(); // executará depois do console.log
```

E aqui está um similar, mas não um exemplo assíncrono equivalente:

```js
const fs = require('fs');

fs.readFile('/file.md', (err, data) => {
  if (err) throw err;
  console.log(data);
});
moreWork(); // executará antes do console.log
```

No primeiro exemplo acima, o `console.log` será chamado antes da chamada da função `moreWork()`. No segundo exemplo `fs.readFile()` é **não bloqueante** então execução do código de JavaScript pode continuar e `moreWork()` será chamado primeiro. A capacidade de executar `moreWork()` sem ter de esperar que a leitura do ficheiro seja concluída é a escolha de desenho chave que permite alta produtividade.

## Concorrência e Produtividade

A execução de código de JavaScript na Node.js acontece em uma única linha de processamento, assim concorrência refere-se a capacidade do laço de evento de executar funções de resposta da JavaScript depois de completar outra atividade. Qualquer código que é esperado ser executado em simultâneo devem permitir o laço de evento continuar a execução enquanto operações que são de JavaScript, como I/O, são acontecendo.

Como exemplo, vamos considerar um caso onde cada requisição para um servidor da web demora 50ms para completar e 45ms deste 50ms é I/O de base de dados que podem ser feitas de maneira assíncrona. Escolher operações assíncronas **não bloqueantes** libera aqueles 45ms por requisição para lidar com outras requisições. Isto é uma diferença significativa em capacidade apenas por escolher usar métodos **não bloqueante** ao invés de métodos **bloqueante**.

O laço de evento é diferente dos modelos usados em muitas outras linguagens onde linhas de processamentos adicionais podem ser criadas para lidar com atividade simultânea.

## Perigos de Misturar Código Bloqueante e Não Bloqueante

Existem alguns padrões que devem ser evitados quando lidamos com I/O. Vamos ver um exemplo:

```js
const fs = require('fs');

fs.readFile('/file.md', (err, data) => {
  if (err) throw err;
  console.log(data);
});
fs.unlinkSync('/file.md');
```

No exemplo acima, `fs.unlinkSync()` provavelmente será executado antes do `fs.readFile()`, que eliminaria o ficheiro `file.md` antes dele ser de fato lido. Uma maneira melhor de escrever isto, que é completamente **não bloqueante** e garantido que executará na ordem correta é:

```js
const fs = require('fs');

fs.readFile('/file.md', (readFileErr, data) => {
  if (readFileErr) throw readFileErr;
  console.log(data);
  fs.unlink('/file.md', unlinkErr => {
    if (unlinkErr) throw unlinkErr;
  });
});
```

No exemplo acima coloca uma chamada **não bloqueante** para `fs.unlink()` dentro da função de resposta do `fs.readFile()` o que garante a ordem correta das operações.

## Recursos Adicionais

* [libuv](https://libuv.org/)
