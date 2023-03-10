---
title: about
displayTitle: Sobre
description: 'Sobre | Node.js'
authors: XhmikosR, mikeal, fhemberger, Fishrock123, yous, tomgco, tniessen, SMcCandlish, saadq, Trott, Gornstats, piperchester, naoufal,  lpinca, j9t, bnoordhuis, harshadsabne, Chris911, benhalverson, nazarepiedady
category: about
---

Como executor de JavaScript orientado a eventos assíncronos, a Node está desenhada para construir aplicações de rede escaláveis. No seguinte exemplo "hello world" ou "olá mundo" em Português, várias conexões podem ser manipuladas simultaneamente. Sobre cada conexão, uma função de resposta é disparada, mas se não existe nada a ser feito, a Node.js adormecerá.

```js
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

Isto é em contraste ao modelo de concorrência mais comum dos dias de hoje, nos quais a linhas do sistema operacional são empregadas. A transmissão baseada em linha é relativamente ineficiente e muito difícil de usar. Além disto, os utilizadores da Node.js estão livres de preocupações da travagem dormente de processo, já que não existem travagens. Quase nenhuma função na Node.js realiza diretamente o I/O, então o processo nunca bloqueia exceto quando o I/O é realizado usando métodos síncronos da biblioteca padrão da Node.js. Uma vez que nada bloqueia, sistemas escaláveis são muito mais razoáveis de programar na Node.js.

Se alguma desta linguagem é desconhecida, existe um artigo completo sobre [Obstrução vs. Não Obstrução][blocking vs. non-blocking].

***

A Node.js é similar em desenho a, e influenciada por, sistemas de [Máquina de Evento][event machine] da Ruby e [Dobrado][twisted] da Python. A Node.js leva o modelo de evento um pouco mais adiante. Ela apresenta um laço de evento como um construtor de tempo de execução ao invés de uma biblioteca. Em outros sistemas, existe sempre uma chamada de obstrução para iniciar o laço de evento. Normalmente, o comportamento é definido através de funções de resposta no início de um programa, e no final um servidor é iniciado através de uma chamada de obstrução como `EventMachine::run()`. Na Node.js, não existe tal chamada de iniciar o laço de evento. A Node.js simplesmente introduz o laço de evento depois da execução do programa de entrada. A Node.js sai do laço de evento quando não houverem mais funções de resposta a desempenhar. Este comportamento é como a da JavaScript do navegador — o laço de evento é escondido do utilizador.

O HTTP é um cidadão de primeira classe na Node.js, desenhado com o fluxo e latência baixa em mente. Isto torna a Node.js bem adequada para criação de uma biblioteca ou abstração de web.

A Node.js sendo desenhada sem linhas não significa que não podes tirar partido de vários núcleos no teu ambiente. Os processos filhos podem ser gerados usando a nossa API [`child_process.fork()`][], e estão desenhadas para serem fáceis de se comunicar. Construída sobre aquela mesma interface que é o módulo [`cluster`][], o qual permite-te partilhar saídas entre processos para ativar a estabilização de carregamento sobre os teus núcleos.

[blocking vs. non-blocking]: /learn/overview-of-blocking-vs-non-blocking/
[`child_process.fork()`]: /api/child_process/
[`cluster`]: https://nodejs.org/api/cluster.html
[event machine]: https://github.com/eventmachine/eventmachine
[twisted]: https://twistedmatrix.com/trac/
