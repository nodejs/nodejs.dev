---
title: asynchronous-flow-control
displayTitle: 'Contrôle de flux asynchrone'
description: 'Le flux de contrôle JavaScript est une question de gestion des rappels. Voici des stratégies pour faciliter votre développement.'
authors: aug2uag, ovflowd, thomasbnt
category: learn
---

<Alert>N'oubliez pas que ce contenu est une référence et qu'il peut être rapidement dépassé. Nous recommandons d'autres sources telles que <a href="https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Displaying_data/flow_control_using_async">MDN</a>.</Alert>

> Le contenu de cet article est fortement inspiré par [Mixu's Node.js Book](http://book.mixu.net/node/ch7.html).

À la base, JavaScript est conçu pour être non bloquant sur le thread "principal", c'est-à-dire là où les vues sont rendues. Vous pouvez imaginer l'importance de cet aspect dans le navigateur. Lorsque le fil d'exécution principal est bloqué, cela entraîne le fameux "freezing" que les utilisateurs finaux redoutent, et aucun autre événement ne peut être envoyé, ce qui entraîne la perte de l'acquisition de données, par exemple.

Cela crée des contraintes uniques que seul un style de programmation fonctionnel peut résoudre. C'est là que les callbacks entrent en jeu.

Cependant, les callbacks peuvent devenir difficiles à gérer dans des procédures plus complexes. Il en résulte souvent un "enfer de callbacks", où de multiples fonctions imbriquées avec des callbacks rendent le code plus difficile à lire, à déboguer, à organiser, etc.

```js
async1(function (input, result1) {
  async2(function (result2) {
    async3(function (result3) {
      async4(function (result4) {
        async5(function (output) {
          // faire quelque chose avec la sortie
        });
      });
    });
  });
});
```

Bien sûr, dans la vie réelle, il y aurait très probablement des lignes de code supplémentaires pour gérer `result1`, `result2`, etc., ainsi, la longueur et la complexité de cette question aboutissent généralement à un code qui a l'air beaucoup plus désordonné que l'exemple ci-dessus.

**C'est là que les _fonctions_ sont d'une grande utilité. Les opérations plus complexes sont composées de nombreuses fonctions :**

1. initiator style / input
2. middleware
3. terminator

**Le "initiator style / input" est la première fonction de la séquence. Cette fonction accepte l'entrée originale, le cas échéant, de l'opération. L'opération est une série de fonctions exécutables, et l'entrée originale sera principalement :**

1. les variables dans un environnement global
2. invocation directe avec ou sans arguments
3. valeurs obtenues par des requêtes du système de fichiers ou du réseau

Les demandes du réseau peuvent être des demandes entrantes initiées par un réseau étranger, par une autre application sur le même réseau, ou par l'application elle-même sur le même réseau ou sur un réseau étranger.

Une fonction intermédiaire renverra une autre fonction, et une fonction de terminaison invoquera le rappel. L'exemple suivant illustre le flux des demandes de réseau ou de système de fichiers. Ici, la latence est de 0 car toutes ces valeurs sont disponibles en mémoire.

```js
function final(someInput, callback) {
  callback(`${someInput} et se termine par l'exécution du callback `);
}

function middleware(someInput, callback) {
  return final(`${someInput} touché par le middleware `, callback);
}

function initiate() {
  const someInput = 'Bonjour, ceci est une fonction ';
  middleware(someInput, function (result) {
    console.log(result);
    // nécessite un callback pour retourner le résultat
  });
}

initiate();
```

## Gestion des États

Les fonctions peuvent être dépendantes ou non de l'état. Il y a dépendance d'état lorsque l'entrée ou une autre variable d'une fonction dépend d'une fonction extérieure.

**Ainsi, il existe deux stratégies principales pour la gestion des États :**

1. en passant directement des variables à une fonction, et
2. l'acquisition d'une valeur variable à partir d'un cache, d'une session, d'un fichier, d'une base de données, d'un réseau ou d'une autre source extérieure.

Notez que je n'ai pas mentionné de variable globale. La gestion de l'état avec des variables globales est souvent un anti-modèle bâclé qui rend difficile ou impossible la garantie de l'état. Les variables globales dans les programmes complexes doivent être évitées autant que possible.

## Flux de contrôle

Si un objet est disponible en mémoire, l'itération est possible, et il n'y aura pas de modification du flux de contrôle :

```js
function getSong() {
  let _song = '';
  let i = 100;
  for (i; i > 0; i -= 1) {
    _song += `${i} des bières sur le mur, vous en prenez une et la faites circuler, ${
      i - 1
    } bouteilles de bière sur le mur\n`;
    if (i === 1) {
      _song += "Hey, allons chercher plus de bière";
    }
  }

  return _song;
}

function singSong(_song) {
  if (!_song) throw new Error("chanson est '' vide, DONNEZ-MOI UNE CHANSON !");
  console.log(_song);
}

const song = getSong();
// cela va fonctionner
singSong(song);
```

Cependant, si les données existent en dehors de la mémoire, l'itération ne fonctionnera plus :

```js
function getSong() {
  let _song = '';
  let i = 100;
  for (i; i > 0; i -= 1) {
    /* eslint-disable no-loop-func */
    setTimeout(function () {
      _song += `${i} des bières sur le mur, vous en prenez une et la faites circuler., ${
        i - 1
      } bouteilles de bière sur le mur\n`;
      if (i === 1) {
        _song += "Hey, allons chercher plus de bière";
      }
    }, 0);
    /* eslint-enable no-loop-func */
  }

  return _song;
}

function singSong(_song) {
  if (!_song) throw new Error("chanson est '' vide, DONNEZ-MOI UNE CHANSON !");
  console.log(_song);
}

const song = getSong('bière');
// cela ne fonctionnera pas
singSong(song);
// Erreur non détectée : chanson est '' vide, DONNEZ-MOI UNE CHANSON !
```

Pourquoi cela s'est-il produit ? `setTimeout` indique au CPU de stocker les instructions ailleurs sur le bus, et indique que les données sont prévues pour être récupérées à un moment ultérieur. Des milliers de cycles CPU s'écoulent avant que la fonction ne frappe à nouveau à la marque de 0 milliseconde, le CPU va chercher les instructions sur le bus et les exécute. Le seul problème est que le morceau ('') a été renvoyé des milliers de cycles auparavant.

La même situation se présente lorsqu'on traite des systèmes de fichiers et des requêtes réseau. Le thread principal ne peut tout simplement pas être bloqué pendant une période de temps indéterminée. Par conséquent, nous utilisons des callbacks pour planifier l'exécution du code dans le temps de manière contrôlée.

Vous pourrez effectuer la quasi-totalité de vos opérations avec les 3 modèles suivants :

1. **En série :** les fonctions seront exécutées dans un ordre séquentiel strict, celui-ci est le plus similaire aux boucles `for`.

  ```js
  // des opérations définies ailleurs et prêtes à être exécutées
  const operations = [
    { func: function1, args: args1 },
    { func: function2, args: args2 },
    { func: function3, args: args3 },
  ];

  function executeFunctionWithArgs(operation, callback) {
    // exécute la fonction
    const { args, func } = operation;
    func(args, callback);
  }

  function serialProcedure(operation) {
    if (!operation) process.exit(0); // terminé
    executeFunctionWithArgs(operation, function (result) {
      // continuer APRÈS le rappel
      serialProcedure(operations.shift());
    });
  }

  serialProcedure(operations.shift());
  ```

2. **Parallèle complet :** lorsque la commande n'est pas un problème, comme l'envoi d'un courriel à une liste de 1 000 000 de destinataires.

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
    // `sendEmail` est un client SMTP fictif
    sendMail(
      {
        subject: 'Dîner ce soir',
        message: 'Nous avons beaucoup de choux dans l'assiette. Tu viens ?',
        smtp: recipient.email,
      },
      callback
    );
  }

  function final(result) {
    console.log(`Résultat : ${result.count} tentatives \
        & ${result.success} e-mails réussis`);
    if (result.failed.length)
      console.log(`Échec de l'envoi à : \
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

3. **Parallèle limité :** parallèle avec limite, comme réussir à envoyer un courriel à 1 000 000 de destinataires à partir d'une liste de 10E7 utilisateurs.

  ```js
  let successCount = 0;

  function final() {
    console.log(`envoyé ${successCount} e-mails`);
    console.log('terminé');
  }

  function dispatch(recipient, callback) {
    // `sendEmail` est un client SMTP fictif
    sendMail(
      {
        subject: 'Dîner ce soir',
        message: 'Nous avons beaucoup de choux dans l'assiette. Tu viens ?',
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

Chacune a ses propres cas d'utilisation, avantages et problèmes que vous pouvez expérimenter et lire plus en détail. Mais surtout, n'oubliez pas de modulariser vos opérations et d'utiliser des callbacks ! Si vous avez le moindre doute, traitez tout comme s'il s'agissait d'un intergiciel !
