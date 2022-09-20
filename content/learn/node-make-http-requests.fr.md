---
title: 'Making HTTP requests with Node.js'
description: 'How to perform HTTP requests with Node.js using GET, POST, PUT and DELETE'
authors: flaviocopes, MylesBorins, fhemberger, LaRuaNa, ahmadawais, AugustinMauroy
category: learn
---

## Effectuer une requête GET

Il existe plusieurs façons d'effectuer une requête HTTP GET dans Node.js, en fonction du niveau d'abstraction que vous souhaitez utiliser.

La façon la plus simple d'effectuer une requête HTTP avec Node.js est d'utiliser la [bibliothèque Axios](https://github.com/axios/axios) :

```js
const axios = require('axios');

axios
  .get('https://example.com/todos')
  .then(res => {
    console.log(`statusCode: ${res.status}`);
    console.log(res);
  })
  .catch(error => {
    console.error(error);
  });
```

Cependant, Axios nécessite l'utilisation d'une bibliothèque tierce.

Une requête GET est possible en utilisant simplement les modules standards de Node.js, bien qu'elle soit plus verbeuse que l'option ci-dessus :

```js
const https = require('https');

const options = {
  hostname: 'example.com',
  port: 443,
  path: '/todos',
  method: 'GET',
};

const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`);

  res.on('data', d => {
    process.stdout.write(d);
  });
});

req.on('error', error => {
  console.error(error);
});

req.end();
```

## Effectuer une requête POST

Comme pour une requête HTTP GET, vous pouvez utiliser la [bibliothèque Axios] (https://github.com/axios/axios) pour effectuer une requête POST :

```js
const axios = require('axios');

axios
  .post('https://whatever.com/todos', {
    todo: 'Buy the milk',
  })
  .then(res => {
    console.log(`statusCode: ${res.status}`);
    console.log(res);
  })
  .catch(error => {
    console.error(error);
  });
```

Ou bien, utilisez les modules standard de Node.js :

```js
const https = require('https');

const data = JSON.stringify({
  todo: 'Buy the milk',
});

const options = {
  hostname: 'whatever.com',
  port: 443,
  path: '/todos',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length,
  },
};

const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`);

  res.on('data', d => {
    process.stdout.write(d);
  });
});

req.on('error', error => {
  console.error(error);
});

req.write(data);
req.end();
```

## PUT et DELETE

Les requêtes PUT et DELETE utilisent le même format de requête POST - vous devez juste changer la valeur de `options.method` pour la méthode appropriée.
