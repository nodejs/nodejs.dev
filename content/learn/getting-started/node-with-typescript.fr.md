---
title: nodejs-with-typescript
displayTitle: 'Node.js avec TypeScript'
description: "Découvrez pourquoi TypeScript est un outil génial et apprenez à l'utiliser par vous-même."
authors: sbielenica, ovflowd, vaishnav-mk, AugustinMauroy
category: learn
---

## Qu'est-ce que TypeScript

TypeScript est un langage open-source très populaire, maintenu et développé par Microsoft. Il est apprécié et utilisé par de nombreux développeurs de logiciels dans le monde entier.

Il s'agit essentiellement d'un surensemble de JavaScript qui ajoute de nouvelles capacités au langage. L'ajout le plus notable est la définition de types statiques, un élément qui n'est pas présent dans le JavaScript ordinaire. Grâce aux types, il est possible, par exemple, de déclarer quel type d'arguments nous attendons et ce qui est renvoyé exactement dans nos fonctions ou quelle est la forme exacte de l'objet que nous créons. TypeScript est un outil vraiment puissant qui ouvre un nouveau monde de possibilités dans les projets JavaScript. Il rend notre code plus sûr et plus robuste en prévenant de nombreux bogues avant même que le code ne soit expédié - il permet de détecter les problèmes pendant le développement du code et s'intègre à merveille avec des éditeurs de code comme Visual Studio Code.

Nous pourrons parler d'autres avantages de TypeScript plus tard, voyons quelques exemples maintenant !

## Exemples

Jetez un coup d'œil à cet extrait de code et nous pourrons ensuite le décortiquer ensemble :

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

La première partie avec le mot-clé `type` est responsable de la déclaration de notre type personnalisé d'objets représentant les utilisateurs. Ensuite, nous utilisons ce nouveau type pour créer la fonction `isAdult` qui accepte un argument de type `User` et retourne un `boolean`. Après cela, nous créons `justine`, notre exemple de données qui peut être utilisé pour appeler la fonction précédemment définie. Enfin, nous créons une nouvelle variable pour indiquer si `justine` est un adulte ou non.

Il y a d'autres choses à savoir sur cet exemple. Tout d'abord, si nous ne nous conformons pas aux types déclarés, TypeScript nous alertera que quelque chose ne va pas et empêchera toute utilisation abusive. Deuxièmement, tout ne doit pas être typée explicitement - TypeScript est très intelligent et peut déduire les types pour nous. Par exemple, la variable `isJustineAnAdult` sera de type `boolean` même si nous ne l'avons pas typée explicitement ou `justine` sera un argument valide pour notre fonction même si nous n'avons pas déclaré cette variable comme étant de type `User`.

Ok, donc nous avons du code TypeScript. Maintenant, comment l'exécuter ?

La première chose à faire est d'installer TypeScript dans notre projet :

```bash
npm i -D typescript
```

Maintenant nous pouvons le compiler en JavaScript en utilisant la commande `tsc` dans le terminal. C'est parti !

En supposant que notre fichier s'appelle `example.ts`, la commande ressemblerait à ceci :

```bash
npx tsc example.ts
```

Cette commande donnera lieu à un nouveau fichier nommé `example.js` que nous pouvons exécuter en utilisant Node.js.
Maintenant que nous savons comment compiler et exécuter du code TypeScript, voyons les capacités de prévention des bugs de TypeScript en action !

Voici comment nous allons modifier notre code :

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

Et voici ce que TypeScript a à dire à ce sujet :

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

Comme vous pouvez le constater, TypeScript nous empêche avec succès d'envoyer du code qui pourrait fonctionner de manière inattendue. C'est merveilleux !

## Plus d'informations sur TypeScript

TypeScript offre un grand nombre d'autres mécanismes intéressants tels que les interfaces, les classes, les types utilitaires, etc. De plus, sur des projets plus importants, vous pouvez déclarer la configuration de votre compilateur TypeScript dans un fichier séparé et ajuster de manière granulaire son mode de fonctionnement, sa rigueur et l'endroit où il stocke les fichiers compilés, par exemple. Vous pouvez en savoir plus sur toutes ces fonctionnalités dans [la documentation officielle de TypeScript](https://www.typescriptlang.org/docs).

Parmi les autres avantages de TypeScript qui méritent d'être mentionnés, citons le fait qu'il peut être adopté progressivement, qu'il contribue à rendre le code plus lisible et plus compréhensible et qu'il permet aux développeurs d'utiliser les fonctionnalités du langage moderne tout en envoyant du code pour les anciennes versions de Node.js.

## TypeScript dans le monde Node.js

TypeScript est bien établi dans le monde Node.js et utilisé par de nombreuses entreprises, projets open-source, outils et frameworks.
Certains des exemples notables de projets open-source utilisant TypeScript sont :

* [NestJS](https://nestjs.com/) - framework robuste et complet qui rend la création de systèmes évolutifs et bien architecturés facile et agréable.
* [TypeORM](https://typeorm.io/#/) - grand ORM influencé par d'autres outils bien connus d'autres langages comme Hibernate, Doctrine ou Entity Framework.
* [Prisma](https://prisma.io/) - ORM de nouvelle génération avec un modèle de données déclaratif, des migrations générées et des requêtes de base de données entièrement sûres.
* [RxJS](https://rxjs.dev/) - bibliothèque largement utilisée pour la programmation réactive.
* [AdonisJS](https://adonisjs.com) - Un framework web complet avec Node.js.
* [FoalTs](https://foalts.org/) - L'élégant framework de Nodejs.

Et beaucoup, beaucoup d'autres grands projets... Peut-être même votre prochain !
