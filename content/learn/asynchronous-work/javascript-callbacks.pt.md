---
title: javascript-asynchronous-programming-and-callbacks
displayTitle: 'Programação Assíncrona de JavaScript e Funções de Resposta'
description: 'A JavaScript é síncrona por padrão, e é de linha de execução única. Isto significa que o código não pode criar novas linhas de execução e executá-los em paralelo. Descubra o que código assíncrono significa e como se parece.'
authors: flaviocopes, MylesBorins, LaRuaNa, amiller-gh, ahmadawais, ovflowd, nazarepiedady
category: learn
---

## Assincronia em Linguagens de Programação

Os computadores são assíncronos de propósito.

O assíncrono significa que coisas acontecem independentemente do fluxo principal do programa.

Nos computadores de consumo atual, cada programa executam por um tempo específico e então para a sua execução para deixar um outro programa continuar a sua execução. Este programa executa em um ciclo tão rápido que é impossível notar. Nós pensamos que os nossos computadores executam vários programas em simultâneo, mas isto é uma ilusão (exceto em máquinas com vários processadores).

Os programas usam _interrupções_ internamente, que são sinais emitidos para o processador para conquistar a atenção do sistema.

Não iremos descer para o interior disto agora, mas apenas manter em mente de que é normal para os programas ser assíncronos e interromper a sua execução até precisarem de atenção, permitindo o computador executar outras tarefas entretanto. Quando um programa estiver esperando por uma resposta da rede, ele não pode interromper o processador até a requisição terminar.

Normalmente, as linguagens de programação são síncronas e algumas fornecem uma maneira de lidar com assincronias na linguagem ou através de bibliotecas. C, Java, C#, PHP, Go, Ruby, Swift, e Python são síncronos de propósito. Alguns deles lidam com operações assíncronas usando linhas de execução, gerando um novo processo.

## JavaScript

A JavaScript é **síncrona** de propósito e possui uma linha de execução. Isto significa que o código não pode criar novas linhas de execução e executá-los em paralelo.

As linhas de código são executadas em sucessão, uma depois da outra, por exemplo:

```js
const a = 1;
const b = 2;
const c = a * b;
console.log(c);
doSomething();
```

Mas a JavaScript nasceu dentro do navegador, seu dever principal, no início, era responder às ações do utilizador, ações como `onClick`, `onMouseOver`, `OnChange`, `OnSubmit` e por aí fora. Como ela poderia fazer isto com um modelo de programação síncrona?

A resposta estava no seu ambiente. O **navegador** fornece uma maneira de fazer isto com um conjunto de APIs que podem lidar com este tipo de funcionalidade.

Mais recentemente, a Node.js introduziu um ambiente de I/O não bloqueante para estender este conceito para o acesso de ficheiro, chamadas de rede e por aí fora.

## Funções de Resposta

Tu não podes saber quando um utilizador clicará em um botão. Então, **defines um manipulador de evento para o evento de clique**. Este manipulador de evento aceita uma função, que será chamada quando o evento for acionado:

```js
document.getElementById('button').addEventListener('click', () => {
  // item clicado
});
```

Isto é a assim chamada **função de resposta (ou callback em Inglês)**.

Uma função de resposta é uma função simples que é passada como um valor para uma outra função, e só será executada quando o evento ocorrer. Nós podemos fazer isto porque a JavaScript tem funções de primeira classe, que podem ser atribuídas às variáveis e passadas para outras funções (chamadas de **funções de ordem superior ou (higher-order functions, em Inglês)**).

É comum envolver todo o teu código do cliente em um ouvinte de evento de `load` sobre o objeto `window`, que executa a função de resposta apenas quando a página estiver pronta:

```js
window.addEventListener('load', () => {
  // janela carregada
  // faça o que quiseres
});
```

As funções de resposta são usadas em toda parte, não apenas em eventos do DOM.

Um outro exemplo comum está em temporizadores:

```js
setTimeout(() => {
  // executar depois de 2 segundos
}, 2000);
```

As requisições de http de xml também aceitam uma função de resposta, como neste exemplo ao atribuir uma função à uma propriedade que será chamada quando um evento em particular ocorrer (neste caso, as mudanças do estado da requisição):

```js
const xhr = new XMLHttpRequest();
xhr.onreadystatechange = () => {
  if (xhr.readyState === 4) {
    xhr.status === 200 ? console.log(xhr.responseText) : console.error('error');
  }
};
xhr.open('GET', 'https://yoursite.com');
xhr.send();
```

### Manipulando erros em funções de resposta

Como lidas com erros usando as funções de resposta? Um estratégia muito comum é usar o que a Node.js adotou: o primeiro parâmetro em qualquer função de resposta é o objeto do erro: **funções de resposta que erram primeiro (ou error-first callbacks em Inglês)**.

Se não houver erro, o objeto é `null`. Se houver um erro, ele contém alguma descrição do erro e outras informações:

```js
const fs = require('fs');

fs.readFile('/file.json', (err, data) => {
  if (err) {
    // lidar com o erro
    console.log(err);
    return;
  }

  // sem erros, processar os dados
  console.log(data);
});
```

### O problema com as funções de resposta

As funções de resposta são excelentes para casos simples!

No entanto cada função de resposta adiciona um nível de encaixamento, e quando tens muitas funções de resposta, o código começa a tornar-se complicado muito rapidamente:

```js
window.addEventListener('load', () => {
  document.getElementById('button').addEventListener('click', () => {
    setTimeout(() => {
      items.forEach(item => {
        // o teu código
      });
    }, 2000);
  });
});
```

Isto é apenas um código simples de 4 níveis, mas já vimos muitos mais níveis de encaixamento e não é divertido ou lindo de se ver.

Como resolvemos isto?

### Alternativas às funções de resposta

Desde a ES6, a JavaScript introduziu várias funcionalidades que ajudam-nos a escrever código assíncrono que não envolve o uso de funções de resposta: promessas (`Promise`) na ES2015 e assincronizar/esperar (`async`/`await`) na ES2017.
