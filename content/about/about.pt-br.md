---
title: about
displayTitle: Sobre
description: 'About | Node.js'
authors: XhmikosR, mikeal, fhemberger, Fishrock123, yous, tomgco, tniessen, SMcCandlish, saadq, Trott, Gornstats, piperchester, naoufal,  lpinca, j9t, bnoordhuis, harshadsabne, Chris911, benhalverson, ItaloPussi
category: about
---

Como um ambiente JavaScript orientado a eventos e assíncrono, 
o Node.js é projetado para desenvolvimento de aplicações escaláveis. 
No seguinte exemplo "Olá Mundo", muitas conexões concorrentes podem ser 
feitas e para cada conexão a função de _callback_ é chamada. Quando não houverem mais conexões pendentes, 
o Node.js ficará inativo.

```javascript
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Olá Mundo');
});

server.listen(port, hostname, () => {
  // eslint-disable-next-line no-console
  console.log(`Servidor disponível em http://${hostname}:${port}/`);
});
```

Essa é uma alternativa que contrasta com o modelo de concorrência mais comum, 
onde são utilizadas _threads_ do SO. Aplicações baseadas em _threads_ são 
relativamente ineficientes e difíceis de usar. Além disso, os usuários do Node.js 
não precisam se preocupar com _deadlock_ de processos, pois não existem _locks_. 
Quase nenhuma função no Node.js realiza diretamente operações de E/S, por essa 
razão o processo nunca bloqueia exceto quando a operação de E/S é realizada 
através de métodos sincronos nativos. Por não existirem operações bloqueantes, 
sistemas escaláveis são razoavelmente fáceis de serem desenvolvidos em Node.js.

Se algum desses conceitos não lhe é familiar, dê uma olhada no artigo
[Blocking vs. Non-Blocking][].

***

Node.js é similar em design e baseado em sistemas como [Event Machine][] do Ruby 
ou [Twisted][]. do Python. Porém, leva o modelo de eventos um pouco mais além. 
No Node.js o _loop_ de eventos é exposto como uma parte do ambiente de execução 
ao invés de uma biblioteca. Em outros sistemas há sempre uma chamada bloqueante 
para iniciar o _loop_ de eventos. Tipicamente o comportamento esperado é definido 
através de callbacks no início do script, e no final um servidor é iniciado por uma 
chamada bloqueante como por exemplo `EventMachine::run()`. Já no Node.js, ele
simplesmente entra no _loop_ de eventos depois de executar o _input_ do script e sai
do _loop_ quando não há mais ações a serem realizadas.

Em Node.js, HTTP é um cidadão de primeira classe, projetado para que tenha um alta 
taxa de fluxo e baixa latência. Isso torna o Node.js uma ótima escolha para servir 
como base para uma biblioteca WEB ou para um framework.

Embora Node.js seja projetado sem a utilização de threads, isso não quer dizer que 
você não possa tirar vantagens de multiprocessamento em seu ambiente. Subprocessos 
podem ser criados utilizando a API [`child_process.fork()`][], e foram desenvolvidos 
para que a comunicação entre eles seja fácil. Da mesma maneira foi o módulo _[`cluster`][]_, 
que permite o compartilhamento de sockets entre os processos, a fim de permitir o 
balanceamento de carga entre os núcleos de processamento.

[blocking vs. non-blocking]: /learn/overview-of-blocking-vs-non-blocking/
[`child_process.fork()`]: /api/child_process/
[`cluster`]: https://nodejs.org/api/cluster.html
[event machine]: https://github.com/eventmachine/eventmachine
[twisted]: https://twistedmatrix.com/trac/
