---
title: asynchronous-flow-control
displayTitle: 'Controlo do Fluxo Assíncrono'
description: 'O controlo do fluxo de JavaScript é tudo haver com a manipulação de função de resposta. Neste artigo apresentaremos estratégias que podem ajudar-te no teu desenvolvimento.'
authors: aug2uag, ovflowd, nazarepiedady
category: learn
---

<Alert>Lembra-te de que este conteúdo é uma referência e pode ficar desatualizado rapidamente. Nós recomendamos outras fontes como a <a href="https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Displaying_data/flow_control_using_async">MDN</a>.</Alert>

> O material neste artigo é fortemente inspirada pelo [Livro de Node.js do Mikito Takada](http://book.mixu.net/node/ch7.html).

No seu núcleo, a JavaScript é desenhada para ser não bloqueante na linha de processamento "principal", este é onde as visões são apresentadas. Tu podes imaginar a importância disto no navegador. Quando a linha de processamento principal é bloqueada resulta na infame "congelação" que os utilizadores finais receiam, e nenhum outro evento pode ser despachado resultando na perda de aquisição de dados, por exemplo.

Isto cria algumas restrições únicas que apenas um estilo função de programação pode curar. Isto é onde as funções de resposta entram em cena.

No entanto, as funções de resposta podem tornar-se desafiantes para manipular em procedimentos mais complicados. Isto resulta com frequência no "inferno de função de resposta" onde várias funções encaixadas com as funções de resposta tornam o código mais desafiantes de ler, depurar, organizar, etc.

```js
async1(function (input, result1) {
  async2(function (result2) {
    async3(function (result3) {
      async4(function (result4) {
        async5(function (output) {
          // fazer alguma coisa com a saída
        });
      });
    });
  });
});
```

Claro que, na vida real provavelmente existiriam mais linhas de código para lidar com `result1`, `result2`, etc., assim, o comprimento e complexidade deste problema normalmente resulta em código que parece muito mais desarrumando do que o exemplo acima.

**Isto é onde as _funções_ entram em excelente uso. Operações mais complexas são compostas de muitas funções:**

1. estilo inicializador / entrada
2. intermediário
3. terminador

**O "estilo inicializador / entrada" é a primeira função na sequência. Esta função aceitará a entrada original, se houver algum, para a operação. A operação é uma sucessão de funções executáveis, e a entrada original será primariamente:**

1. variáveis em um ambiente global
2. invocação direta com ou sem argumentos
3. valores obtidos pelo sistema de ficheiro ou requisições de rede

As requisições de rede podem ser requisições de chegada inicializadas por uma rede estrangeira, por uma outra aplicação na mesma rede, ou pela própria aplicação na mesma rede ou na rede estrangeira.

Uma função intermediária retornará uma outra função, e uma função terminadora invocará a função de resposta. O exemplo a seguir ilustra o fluxo para as requisições de rede ou de sistema de ficheiro. Neste a latência é 0 porque todos estes valores estão disponíveis na memória.

```js
function final(someInput, callback) {
  callback(`${someInput} and terminated by executing callback `);
}

function middleware(someInput, callback) {
  return final(`${someInput} touched by middleware `, callback);
}

function initiate() {
  const someInput = 'hello this is a function ';
  middleware(someInput, function (result) {
    console.log(result);
    // precisa de uma função de resposta para `retornar` o resultado
  });
}

initiate();
```

## Gestão de Estado

As funções pode ou não ser dependentes de estado. A dependência de estado aparece quando a entrada ou outra variável de uma função depende de uma função externa.

**Desta maneira existem duas estratégias primarias para a gestão de estado:**

1. passando as variáveis diretamente para uma função, e
2. adquirindo um valor de variável a partir da memória de consulta imediata, sessão, ficheiro, base de dados, rede, ou outra fonte externa.

Nota que, não mencionamos variáveis globais. A gestão de estado com variáveis globais é muitas vezes um antipadrão desleixado que torna difícil ou impossível garantir o estado. As variáveis globais em programas complexos devem ser evitadas quando possível.

## Controlo do Fluxo

Se um objeto estiver disponível na memória, a iteração é possível, e não haverá uma mudança para controlo de fluxo:

```js
function getSong() {
  let _song = '';
  let i = 100;
  for (i; i > 0; i -= 1) {
    _song += `${i} beers on the wall, you take one down and pass it around, ${
      i - 1
    } bottles of beer on the wall\n`;
    if (i === 1) {
      _song += "Hey let's get some more beer";
    }
  }

  return _song;
}

function singSong(_song) {
  if (!_song) throw new Error("song is '' empty, FEED ME A SONG!");
  console.log(_song);
}

const song = getSong();
// isto funcionará
singSong(song);
```

No entanto, se os dados existem fora da memória a iteração não mais funcionará:

```js
function getSong() {
  let _song = '';
  let i = 100;
  for (i; i > 0; i -= 1) {
    /* eslint-disable no-loop-func */
    setTimeout(function () {
      _song += `${i} beers on the wall, you take one down and pass it around, ${
        i - 1
      } bottles of beer on the wall\n`;
      if (i === 1) {
        _song += "Hey let's get some more beer";
      }
    }, 0);
    /* eslint-enable no-loop-func */
  }

  return _song;
}

function singSong(_song) {
  if (!_song) throw new Error("song is '' empty, FEED ME A SONG!");
  console.log(_song);
}

const song = getSong('beer');
// isto não funcionará
singSong(song);
// Uncaught Error: song is '' empty, FEED ME A SONG!
```

Porquê que isto aconteceu? A `setTimeout` instrui a CPU a armazenar as instruções noutro lado do autocarro, e instrui que o dado está agendado para ir buscar em um momento posterior. Milhares de ciclos de CPU chegam antes da função acessar novamente na marca de 0 milissegundo, a CPU busca as instruções do autocarro e executa-os. O único problema é que `song` ('') foi retornada milhares de ciclos prioritários.

A mesma situação surge na negociação com os sistemas de ficheiro e requisições de rede. A linha de processamento principal simplesmente não pode ser bloqueada por um período indeterminado de tempo-- portanto, usamos funções de resposta para agendar a execução do código em tempo de uma maneira controlada.

Tu serás capaz de realizar quase todas as tuas operações com o seguinte 3 padrões:

1. **Em sucessões:** as funções serão executadas em uma ordem sequencial estrita, este é mais parecido com os laços de `for`:

  ```js
  // operações definidas noutro lado e prontas para executar
  const operations = [
    { func: function1, args: args1 },
    { func: function2, args: args2 },
    { func: function3, args: args3 },
  ];

  function executeFunctionWithArgs(operation, callback) {
    // executa a função
    const { args, func } = operation;
    func(args, callback);
  }

  function serialProcedure(operation) {
    if (!operation) process.exit(0); // terminada
    executeFunctionWithArgs(operation, function (result) {
      // continuar DEPOIS da função de resposta
      serialProcedure(operations.shift());
    });
  }

  serialProcedure(operations.shift());
  ```

2. **Paralelismo completo:** quando a ordem não for um problema, tais como enviar por correio eletrónico uma lista de 1.000.000 de recetores de correio eletrónico.

  ```js
  let count = 0;
  let success = 0;
  const failed = [];
  const recipients = [
    { name: 'Bart', email: 'bart@tld' },
    { name: 'Marge', email: 'marge@tld' },
    { name: 'Homer', email: 'homer@tld' },
    { name: 'Lisa', email: 'lisa@tld' },
    { name: 'Maggie', email: 'maggie@tld' },
  ];

  function dispatch(recipient, callback) {
    // `sendEmail` é um cliente de SMTP hipotético
    sendMail(
      {
        subject: 'Dinner tonight',
        message: 'We have lots of cabbage on the plate. You coming?',
        smtp: recipient.email,
      },
      callback
    );
  }

  function final(result) {
    console.log(`Result: ${result.count} attempts \
        & ${result.success} succeeded emails`);
    if (result.failed.length)
      console.log(`Failed to send to: \
          \n${result.failed.join('\n')}\n`);
  }

  recipients.forEach(function (recipient) {
    dispatch(recipient, function (err) {
      if (!err) {
        success += 1;
      } else {
        failed.push(recipient.name);
      }
      count += 1;

      if (count === recipients.length) {
        final({
          count,
          success,
          failed,
        });
      }
    });
  });
  ```

3. **Paralelismo limitado:** o paralelismo com limite, tal como enviar com êxito por correio eletrónico 1.000.000 recetores de uma lista de 10E7 utilizadores.

  ```js
  let successCount = 0;

  function final() {
    console.log(`dispatched ${successCount} emails`);
    console.log('finished');
  }

  function dispatch(recipient, callback) {
    // `sendEmail` é um cliente de SMTP hipotético
    sendMail(
      {
        subject: 'Dinner tonight',
        message: 'We have lots of cabbage on the plate. You coming?',
        smtp: recipient.email,
      },
      callback
    );
  }

  function sendOneMillionEmailsOnly() {
    getListOfTenMillionGreatEmails(function (err, bigList) {
      if (err) throw err;

      function serial(recipient) {
        if (!recipient || successCount >= 1000000) return final();
        dispatch(recipient, function (_err) {
          if (!_err) successCount += 1;
          serial(bigList.pop());
        });
      }

      serial(bigList.pop());
    });
  }

  sendOneMillionEmailsOnly();
  ```

Cada um tem os seus próprios casos de uso, benefício, e problemas que podes experimentar e ler sobre com mais detalhes. Mais importante, lembre de modularizar as tuas operações e usar as funções de resposta! Se estiveres em dúvida, trate tudo como se fosse um intermediário.
