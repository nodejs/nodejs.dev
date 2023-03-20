---
title: how-to-use-the-nodejs-repl
displayTitle: 'Como usar o REPL da Node.js'
description: "REPL significa Read-Evaluate-Print-Loop ou Laço de Impressão, Avaliação e Leitura, e é excelente maneira de explorar as funcionalidades da Node.js de maneira rápida"
authors: flaviocopes, MylesBorins, fhemberger, LaRuaNa, ahmadawais, vaishnav-mk, nazarepiedady
category: learn
---

O comando `node` é o que usamos para executar os nossos programas de Node.js:

```bash
node script.js
```

Se executarmos o comando `node` sem nenhum programa a executar ou sem quaisquer argumentos, começaremos uma sessão do REPL:

```bash
node
```

> **Nota:** `REPL` significa _Read Evaluate Print Loop_ ou _Laço de Impressão Avaliação e Leitura_, e é um ambiente de linguagem de programação (basicamente uma janela da consola) que recebe uma expressão única como entrada do utilizador e retorna o resultado de volta para a consola depois da execução. A sessão do REPL fornece uma maneira conveniente para rapidamente testar código simples de JavaScript.

Se o experimentares agora no teu terminal, é isto que acontece:

```bash
❯ node
>
```

O comando fica no modo parado e espera que introduzamos alguma coisa.

> **Dica:** se não tiveres a certeza de como abrir o teu terminal, pesquise no motor de pesquisa Google por "Como abrir o terminal no teu-sistema-operacional":
>
> * [Como abrir o terminal no Linux](https://www.google.com/search?q=How+to+open+terminal+on+linux)
> * [Como abrir o terminal no Windows](https://www.google.com/search?q=How+to+open+terminal+on+windows)
> * [Como abrir o terminal no MacOS](https://www.google.com/search?q=How+to+open+terminal+on+macos)

O REPL aguarda até introduzirmos algum código de JavaScript, para ser mais preciso.

Comece simples e introduza:

```console
> console.log('test')
test
undefined
>
```

O primeiro valor, `test`, é a saída que dissemos à consola para imprimir, então recebemos `undefined` que é o valor de retorno da execução de `console.log()`. A Node leu esta linha de código, avaliou-a, imprimiu o resultado, e então voltar à aguardar mais linhas de código. A Node percorrerá através destas três etapas para cada pedaço de código que executamos no REPL até abandonar-mos a sessão. É onde o REPL conseguiu o seu nome.

A Node imprime automaticamente o resultado de qualquer linha de código de JavaScript sem precisar de instruí-la a fazer isto. Por exemplo, digite a seguinte linha e pressione `enter`:

```console
> 5 === '5'
false
>
```

Nota a diferença nas saídas das duas linhas acima. Na primeira linha o REPL da Node imprimiu `undefined` depois de executada o método `console.log()`, enquanto na linha dois, o REPL apenas imprimiu o resultado do `5 === '5'`. Tu precisas de lembrar-te de que o anterior é apenas uma declaração no JavaScript, e o último é uma expressão.

Em alguns casos, o código que quiseres testar pode precisar de várias linhas. Por exemplo, digamos que queres definir uma função que gera um número aleatório, na sessão do REPL digite a seguinte linha e pressione `enter`:

```console
function generateRandom() {
...
```

O REPL da Node.js o inteligente o suficiente para determinar que ainda não terminaste de escrever o teu código, e irá para o modo de várias linhas para podes digitar mais código. Agora termine a definição da tua função e pressione `enter`:

```console
function generateRandom() {
...return Math.random()
}
undefined
```

### A variável especial `_`

Se depois de algum código digitares `_`, este imprimirá o resultado da última operação.

### A tecla seta para Cima

Se pressionares a tecla seta `cima` ou `↑`, receberás o acesso à história das linhas de código anteriores executadas na atual, e até mesmo sessões de REPL anteriores.

### Comandos ponto

O REPL tem alguns comandos especiais, todos começando com um ponto `.`. Eles são:

* `.help`: exibe a lista de comandos `.` disponíveis
* `.editor`: ativa o modo editor, para escrever código de JavaScript de várias linhas com facilidade. Um vez que estiveres neste modo, pressione a combinação `ctrl-D` para executar o código escrito.
* `.break`: quando estiveres introduzindo uma expressão de várias linhas, digitar o comando `.break` abortará a entrada seguinte. O mesmo que pressionar a combinação `ctrl-C`.
* `.clear`: reinicia o contexto do REPL para um objeto vazio e limpa quaisquer expressões de várias linhas sendo digitadas atualmente.
* `.load`: carrega um ficheiro de JavaScript, relativo ao atual diretório de trabalho.
* `.save`: guarda tudo que digitaste na sessão do REPL em um ficheiro (especifique o nome do ficheiro).
* `.exit`: abandona o REPL (o mesmo que pressionar a combinação `ctrl-C` duas vezes).

O REPL sabe quando estás a digitar uma declaração de várias linhas sem precisar de invocar o `.editor`.

Por exemplo se começares a digitar uma iteração como esta:

```console
[1, 2, 3].forEach(num => {
```

e se pressionares `enter`, o REPL irá para uma nova linha que começa com reticências (símbolo `...`), indicando que agora podes continuar a trabalhar naquele bloco:

```console
... console.log(num)
... })
```

Se digitares `.break` no final de uma linha, o modo de várias linhas parará e a declaração não será executada.

### Executar o REPL a partir de um ficheiro de JavaScript

Nós podemos importar o REPL em um ficheiro de JavaScript usando o módulo `repl`:

```js
const repl = require('repl');
```

Com o uso da variável `repl` podemos realizar várias operações. Para começar o ponto de comando do REPL, digite a seguinte linha:

```js
repl.start();
```

Execute o ficheiro na linha de comando:

```bash
node repl.js
```

```console
> const n = 10
```

Tu podes passar uma sequência de caracteres que será exibida quando o REPL iniciar. O padrão é '> ' (com um espaço adicional), mas podemos definir um ponto personalizado:

```js
// um ponto de estilo Unix
const local = repl.start('$ ');
```

Tu podes exibir uma mensagem enquanto estiveres a sair do REPL:

```js
local.on('exit', () => {
  console.log('exiting repl');
  process.exit();
});
```

Tu podes ler mais a respeito do módulo do REPL na [documentação do `repl`](/api/repl/).
