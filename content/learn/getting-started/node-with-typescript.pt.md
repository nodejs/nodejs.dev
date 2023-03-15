---
title: nodejs-with-typescript
displayTitle: 'Node.js com a TypeScript'
description: 'Descubra o porquê da TypeScript ser uma ferramenta impressionante e aprenda a usá-la sozinho.'
authors: sbielenica, ovflowd, vaishnav-mk, nazarepiedady
category: learn
---

## O Que é a TypeScript

**[TypeScript](https://www.typescriptlang.org)** é uma linguagem de código-aberto na moda mantida e desenvolvida pela Microsoft. É amada e usada por muitos programadores de software em todo mundo.

Basicamente, é um superconjunto de JavaScript que adiciona novas capacidades à linguagem. A adição mais notável é a definição de tipo estático, algo que não está presente na JavaScript simples. Graças aos tipos, é possível, por exemplo, declarar quais tipos de argumentos estamos esperando e o que é exatamente retornado em nossas funções ou qual é a forma exata do objeto que estamos a criar. A TypeScript é uma ferramenta realmente poderosa e abre um mundo novo de possibilidades nos projetos de JavaScript. Ela torna o nosso código mais seguro e robusto prevenindo muitos bugs antes mesmo do código ser moldado - ela captura problemas durante o desenvolvimento do código e se integra maravilhosamente com os editores de código como Visual Studio Code.

Nós podemos falar a respeito de outros benefícios mais tarde, agora vamos ver alguns exemplos!

### Exemplos

Olhe este trecho de código e depois podemos desempacotá-lo juntos:

```ts
type User = {
  name: string;
  age: number;
};

function isAdult(user: User): boolean {
  return user.age >= 18;
}

const justine: User = {
  name: 'Justine',
  age: 23,
};

const isJustineAnAdult: boolean = isAdult(justine);
```

A primeira parte (com a palavra-chave `type`) é responsável pela declaração do nosso tipo de objeto personalizado representando utilizadores. Depois utilizamos este tipo recentemente criado para criar uma função `isAdult` que aceita um argumento do tipo `User` e retorna um `boolean`. Depois disto, criamos o `justine`, o nosso dado de exemplo que pode ser usado para chamar a função definida anteriormente. Finalmente, criamos uma nova variável com a informação sobre se `justine` é um adulto.

Existem coisas adicionais sobre este exemplo que deves saber. Primeiramente, se não obedecêssemos os tipos declarados, a TypeScript alertaria-nos que algo está errado e preveniria-nos do uso indevido. Em segundo lugar, nem tudo deve ser explicitamente tipado - a TypeScript é muito inteligente e pode deduzir os tipos por nós. Por exemplo, a variável `isJustineAnAdult` seria do tipo `boolean` mesmo se não a tivéssemos tipado explicitamente ou `justine` seria um argumento válido para a nossa função mesmo se não tivéssemos declarado está variável como do tipo de `User`.

Muito bem, então temos algum código de TypeScript. Agora como o executamos?

**A primeira coisa a fazer é instalar a TypeScript no nosso projeto:**

```bash
npm i -D typescript
```

Agora podemos compilá-la para JavaScript usando o comando `tsc` no terminal. Vamos fazê-lo!

**Presumindo que o nosso ficheiro está nomeado como `example.ts`, o comando se pareceria com:**

```bash
npx tsc example.ts
```
> [npx](https://www.npmjs.com/package/npx) é uma abreviação para Node Package Execute (Executar Pacote de Node, em Português). Isto permite-nos executar o compilador da TypeScript sem instalá-lo globalmente.

A `tsc` é o compilador da TypeScript que pegará o nosso código de TypeScript e o compilará para JavaScript. Este comando resultará em um novo ficheiro nomeado como `example.js` que podemos executar usando a Node.js. Agora que sabemos como compilar e executar código de TypeScript vamos ver as capacidades de prevenção de bug da TypeScript em ação!


**Isto é como modificaremos o nosso código:**

```ts
type User = {
  name: string;
  age: number;
};

function isAdult(user: User): boolean {
  return user.age >= 18;
}

const justine: User = {
  name: 'Justine',
  age: 'Secret!',
};

const isJustineAnAdult: string = isAdult(justine, "I shouldn't be here!");
```

**E isto é o que a TypeScript tem a dizer a respeito disto:**

```console
example.ts:12:3 - error TS2322: Type 'string' is not assignable to type 'number'.

12   age: "Secret!",
     ~~~

  example.ts:3:3
    3   age: number;
        ~~~
    The expected type comes from property 'age' which is declared here on type 'User'

example.ts:15:7 - error TS2322: Type 'boolean' is not assignable to type 'string'.

15 const isJustineAnAdult: string = isAdult(justine, "I shouldn't be here!");
         ~~~~~~~~~~~~~~~~

example.ts:15:51 - error TS2554: Expected 1 arguments, but got 2.

15 const isJustineAnAdult: string = isAdult(justine, "I shouldn't be here!");
                                                     ~~~~~~~~~~~~~~~~~~~~~~


Found 3 errors.
```

Conforme podes ver a TypeScript previne-nos com êxito de entregar código que poderia funcionar inesperadamente. Que espantoso!

## Mais sobre a TypeScript

A TypeScript oferece muitas outros excelentes mecanismos como interfaces, classes, tipos de utilitário e por aí fora. Além disto, em grandes projetos podes declarar a tua configuração de compilador de TypeScript em um ficheiro separado e granularmente ajustar como ele funciona, o quão restrito ele é e onde ele guarda os ficheiros compilados por exemplo. Tu podes ler mais sobre tudo estas coisas espantosas na [documentação oficial da TypeScript](https://www.typescriptlang.org/docs).

Alguns dos outros benefícios da TypeScript que são dignos de menção são que ela pode ser adotada gradualmente, ajuda a tornar o código mais legível e compreensível e permite os programadores usar funcionalidades modernas da linguagem enquanto entregam código para versões mais antigas da Node.js.

## TypeScript no Mundo da Node.js

A TypeScript é bem estabelecida no mundo da Node.js e usada por muitas empresas, projetos de código-aberto, ferramentas e abstrações. Alguns dos exemplos notáveis de projetos de código-aberto usando a TypeScript são:

* [NestJS](https://nestjs.com/) - abstração robusta e completa que torna a criação de sistemas escaláveis e bem arquitetados fácil e agradável.
* [TypeORM](https://typeorm.io/) - excelente ORM influenciada por outras ferramentas bem conhecidas de outras linguagens como Hibernate, Doctrine ou Entity Framework.
* [Prisma](https://prisma.io/) - próxima geração de ORM promovendo um modelo declarativo de dados, migrações geradas e consultas de base de dados com segura de tipo completa.
* [RxJS](https://rxjs.dev/) - biblioteca largamente usada para programação reativa.
* [AdonisJS](https://adonisjs.com) - Uma abstração de web completa com a Node.js
* [FoalTS](https://foalts.org/) - A Elegante Abstração de Node.js

E muitos, mais muitos outros grandes projetos... Talvez o teu seja o próximo!
