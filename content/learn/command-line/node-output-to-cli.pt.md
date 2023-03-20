---
title: output-to-the-command-line-using-nodejs
displayTitle: 'Saída para linha de comando usando a Node.js'
description: 'Como imprimir na consola da linha de comando usando a Node.js, desde o console.log básico à cenários mais complexos'
authors: flaviocopes, potch, MylesBorins, fhemberger, LaRuaNa, amiller-gh, ahmadawais, nazarepiedady
category: learn
---

### Saída básica usando o módulo `console`

A Node.js fornece um [módulo `console`](/api/console/) que oferece montes de maneiras úteis de interagir com a linha de comando.

É basicamente o mesmo objeto `console` que encontras no navegador.

O método mais básico e usado é `console.log()`, que imprime a sequência de caracteres que passas para a consola.

Se passas um objeto, será apresentado como uma sequência de caracteres. Tu podes passar várias variáveis ao `console.log`, por exemplo:

```js
const x = 'x';
const y = 'y';
console.log(x, y);
```

e a Node.js imprimirá ambos.

Nós podemos também formatar frases passando variáveis e um especificador de formato.

Por exemplo:

```js
console.log('My %s has %d ears', 'cat', 2);
```

* `%s` formata uma variável como uma sequência de caracteres
* `%d` formata uma variável como um número
* `%i` formata uma variável como um número mas apenas a sua parte inteira
* `%o` formata uma variável como um objeto

Por exemplo:

```js
console.log('%o', Number);
```

### Limpar a consola

O `console.clear()` limpa a consola (o comportamento pode depender da consola usada).

### Contando os elementos

O `console.count()` é um método prático.

Considere o seguinte código:

<iframe
  title="Saída para linha de comando usando a Node.js"
  src="https://stackblitz.com/edit/nodejs-dev-0002-01?index.js&zenmode=1&view=editor"
  alt="nodejs-dev-0002-01 na StackBlitz"
  style="height: 400px; width: 100%; border: 0;">
</iframe>

O que acontece é que o `console.count()` contará o número de vezes uma sequência de caracteres foi imprimida, e imprimirá a contagem próximo a ela:

Tu podes apenas contar maçãs e laranjas:

```js
const oranges = ['orange', 'orange'];
const apples = ['just one apple'];
oranges.forEach(fruit => {
  console.count(fruit);
});
apples.forEach(fruit => {
  console.count(fruit);
});
```

### Reiniciar a contagem

O método `console.countReset()` reinicia o contador usado com o `console.count()`.

Nós usaremos o exemplo das maças e laranjas para demonstrar isto:

```js
const oranges = ['orange', 'orange'];
const apples = ['just one apple'];
oranges.forEach(fruit => {
  console.count(fruit);
});
apples.forEach(fruit => {
  console.count(fruit);
});

console.countReset('orange');

oranges.forEach(fruit => {
  console.count(fruit);
});
```

Nota como a chamada para `console.countReset('orange')` reinicia o valor do contador à zero.

### Imprimir o rasto da pilha

É possível que existam casos onde é útil imprimir a chamada do rasto da pilha de uma função, talvez para responder a questão _como chegaste a esta parte do código?_.

Tu podes fazer isto usando o `console.trace()`:

```js
const function2 = () => console.trace();
const function1 = () => function2();
function1();
```

Isto imprimirá o rasto da pilha. Isto é o que é imprimido se experimentares isto na REPL da Node.js:

```bash
Trace
    at function2 (repl:1:33)
    at function1 (repl:1:25)
    at repl:1:1
    at ContextifyScript.Script.runInThisContext (vm.js:44:33)
    at REPLServer.defaultEval (repl.js:239:29)
    at bound (domain.js:301:14)
    at REPLServer.runBound [as eval] (domain.js:314:12)
    at REPLServer.onLine (repl.js:440:10)
    at emitOne (events.js:120:20)
    at REPLServer.emit (events.js:210:7)
```

### Calcular o tempo gasto

Tu podes facilmente calcular quanto tempo uma função leva para executar, usando `time()` e `timeEnd()`:

```js
const doSomething = () => console.log('test');
const measureDoingSomething = () => {
  console.time('doSomething()');
  // faça alguma coisa, e determine o tempo que leva
  doSomething();
  console.timeEnd('doSomething()');
};
measureDoingSomething();
```

### `stdout` e `stderr`

Conforme vimos o `console.log` é excelente para imprimir mensagens na Consola. Isto é o que é chamada saída padrão, ou `stout`.

O `console.error` imprime para a corrente de `stderr`.

Isto não aparecerá na consola, mas aparecerá no registo de erro.

### Colorir a saída

Tu podes colorir a saída do teu texto na consola usando [sequências de fuga](https://gist.github.com/iamnewton/8754917). Uma sequência de fuga é um conjunto de caracteres que identifica uma cor.

Por exemplo:

```js
console.log('\x1b[33m%s\x1b[0m', 'hi!');
```

Tu podes experimentar isto na REPL da Node.js, e imprimirá `hi!` em amarelo.

No entanto, isto é a maneira de baixo nível de fazer isto. A maneira mais simples de colorir a saída da consola é usando uma biblioteca. [Chalk](https://github.com/chalk/chalk) é a tal biblioteca, e além de colorir, também ajuda com outras facilidades de estilização, como tornar o texto negrito, itálico ou sublinhado.

Tu podes instalá-la com `npm install chalk@4`, então podes usá-la:

```js
const chalk = require('chalk');

console.log(chalk.yellow('hi!'));
```

Usar a `chalk.yellow` é mais conveniente do que tentar lembrar os códigos de fuga, e o código é muito mais legível.

Consulte a ligação do projeto anunciada acima para mais exemplos.

### Criar uma barra de progresso

O [`progress`](https://www.npmjs.com/package/progress) é um pacote incrível para criar uma barra de progresso na consola. Instale-o usando `npm install progress`.

Este trecho cria uma barra de progresso de 10 etapas e a cada 100 milissegundos uma etapa é concluída. Quando a barra concluir limpados o intervalo:

```js
const ProgressBar = require('progress');

const bar = new ProgressBar(':bar', { total: 10 });
const timer = setInterval(() => {
  bar.tick();
  if (bar.complete) {
    clearInterval(timer);
  }
}, 100);
```
