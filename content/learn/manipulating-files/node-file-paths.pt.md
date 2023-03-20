---
title: nodejs-file-paths
displayTitle: 'Caminhos de Ficheiro da Node.js'
description: 'Como interagir com os caminhos de ficheiros e manipulá-los na Node.js'
authors: flaviocopes, MylesBorins, fhemberger, LaRuaNa, amiller-gh, ahmadawais, nazarepiedady
category: learn
---

Cada ficheiro no sistema tem um caminho. No Linux e MacOS, um caminho de ficheiro pode parecer-se com isto: `/users/joe/file.txt` enquanto nos computadores que usam Windows são diferentes, e têm uma estrutura parecida com: `C:\users\joe\file.txt`.

Tu precisas de prestar atenção quando estiveres a usar os caminhos nas tuas aplicações, já que diferenças devem ser levadas em conta.

Tu incluis este módulo nos teus ficheiros usando `const path = require('path');` e podes começar a usar os seus métodos.

## Recebendo informação de um caminho

Dado um caminho, podes extrair informações do caminho usando estes métodos:

* `dirname`: recebe a pasta pai de um ficheiro
* `basename`: recebe a parte do nome do ficheiro
* `extname`: recebe a extensão do ficheiro

### Por exemplo

```js
const notes = '/users/joe/notes.txt';

path.dirname(notes); // /users/joe
path.basename(notes); // notes.txt
path.extname(notes); // .txt
```

Tu podes receber o nome do ficheiro sem a extensão especificando um segundo argumento para `basename`:

```js
path.basename(notes, path.extname(notes)); // notes
```

## Trabalhando com os caminhos

Tu podes juntar duas ou mais partes de um caminho usando o método `path.join()`:

```js
const name = 'joe';
path.join('/', 'users', name, 'notes.txt'); // '/users/joe/notes.txt'
```

Tu podes receber o cálculo do caminho absoluto de um caminho relativo usando o método `path.resolve()`:

```js
path.resolve('joe.txt'); // '/Users/joe/joe.txt' if run from my home folder
```

Neste caso a Node.js simplesmente anexará `/joe.txt` ao diretório de trabalho atual. Se especificares um segundo parâmetro de pasta, o `resolve` usará o primeiro como uma base para o segundo parâmetro:

```js
path.resolve('tmp', 'joe.txt'); // '/Users/joe/tmp/joe.txt' se executares a partir da pasta home
```

Se o primeiro parâmetro começar com uma barra, este significa que é um caminho absoluto:

```js
path.resolve('/etc', 'joe.txt'); // '/etc/joe.txt'
```

O método `path.normalize()` é uma outra função útil, que tentará e calculará o caminho verdadeiro, quando contém especificadores relativos como `.` ou `..` ou duas barras:

```js
path.normalize('/users/joe/..//test.txt'); // '/users/test.txt'
```

**Nem o `resolve` nem o `normalize` verificarão se o caminho existe**. Eles apenas calculam um caminho baseado na informação que receberam.
