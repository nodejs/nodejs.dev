---
title: introduction-to-nodejs
displayTitle: 'Introdução à Node.js'
description: "Guia de Começo para Node.js, o ambiente de execução de JavaScript no lado do servidor. A Node.js é construída sobre o motor de JavaScript V8 do Google Chrome, e é principalmente usada para criar servidores de web - mas não está limitado a apenas isto."
authors: flaviocopes, potch, MylesBorins, RomainLanz, virkt25, Trott, onel0p3z, ollelauribostrom, MarkPieszak, fhemberger, LaRuaNa, FrozenPandaz, mcollina, amiller-gh, ahmadawais, saqibameen, dangen-effy, aymen94, benhalverson, nazarepiedady
category: learn
---

A Node.js é um ambiente de código-aberto para execução de JavaScript em várias plataformas. Ela é uma ferramenta popular para qualquer tipo de projeto!

A Node.js executa o motor de JavaScript V8, o núcleo do Google Chrome, fora do navegador. Isto permite a Node.js ser muito otimizada.

Uma aplicação de Node.js executa em um único processo, sem a criação de uma nova linha para cada requisição. A Node.js fornece um conjunto de I/O assíncronos primitivos na sua biblioteca padrão que previne o código de JavaScript bloquear e geralmente, bibliotecas na Node.js são escritas usando paradigmas não bloqueantes, tornando o comportamento bloqueante a exceção ao invés de norma.

Quando a Node.js realiza uma operação I/O, como leitura a partir da rede, acessando uma base de dados ou o sistema de ficheiro, ao invés de bloquear a linha e desperdiçar ciclos de CPU esperando, a Node.js resumirá as operações quando a resposta retornar.

Isto permite a Node.js manipular milhares de conexões simultâneas com um único servidor sem introduzir o fardo da gestão de concorrência de linha, o que poderia ser uma fonte significativa de bugs.

A Node.js tem um única vantagem porque milhões de programadores de frontend que escrevem JavaScript para o navegador agora são capazes de escrever código do lado do servidor além do código do lado do cliente sem precisarem aprender uma linguagem completamente diferente.

Na Node.js os novos padrões de ECMAScript podem ser usados sem problemas, já que não tens de esperar que todos os teus utilizadores atualizem os seus navegadores - estás encarregado de decidir qual versão da ECMAScript usar mudando a versão da Node.js, e podes também ativar funcionalidades experimentais específicas executando a Node.js com as opções.

## Um Exemplo de Aplicação de Node.js

O exemplo mais comum `Hello World` da Node.js é um servidor de web:

<iframe title="Hello world web server" src="https://stackblitz.com/edit/nodejs-dev-0001-01?embed=1&file=index.js&zenmode=1" alt="nodejs-dev-0001-01 on StackBlitz" style="height: 400px; width: 100%; border: 0;" />

```js
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

Para executar este trecho, guarde-o como um ficheiro `server.js` e execute `node server.js` no teu terminal.

Este código primeiro inclui o [módulo `http`](https://nodejs.org/api/http.html) de Node.js.

A Node.js tem uma [biblioteca padrão](https://nodejs.org/api/) fantástica incluindo suporte de primeira classe para ligações de rede.

O método `createServer()` do módulo `http` cria um novo servidor de HTTP e retorna-o.

O servidor é configurado para ouvir na porta e nome de hospedeiro especificado. Quando o servidor estiver pronto, a função de resposta é chamada, neste caso informando-nos que o servir está em execução.

Sempre que uma nova requisição for recebida, o [evento `request`](https://nodejs.org/api/http.html#http_event_request) será chamado, fornecendo dois objetos: uma requisição (um objeto [`http.IncomingMessage`](https://nodejs.org/api/http.html#http_class_http_incomingmessage)) e uma resposta (um objeto [`http.ServerResponse`](https://nodejs.org/api/http.html#http_class_http_serverresponse)).

Estes 2 objetos são fundamentais para manipular a chamada de HTTP.

O primeiro fornece os detalhes da requisição. Neste exemplo simples, isto não é usado, mas poderias acessar os cabeçalhos e dados da requisição.

O segundo é usando para retornar dados para o chamador.

Neste caso com:

```js
res.statusCode = 200;
```

nós definimos a propriedade `statusCode` para 200, para indicar uma resposta bem-sucedida.

Nós definimos o cabeçalho `Content-Type`:

```js
res.setHeader('Content-Type', 'text/plain');
```

e fechamos a resposta, adicionado o conteúdo como um argumento para `end()`:

```js
res.end('Hello World\n');
```

### Mais Exemplos

Consulte a https://github.com/nodejs/examples para uma lista de exemplos de Node.js que vão para além do `hello world`.
