---
title: nodejs-with-webassembly
displayTitle: 'Node.js Et WebAssembly'
description: "Découvrez pourquoi WebAssembly est un outil génial et apprenez à l'utiliser par vous-même."
authors: lancemccluskey, ovflowd, AugustinMauroy
category: learn
---

WebAssembly est un langage de type assembleur très performant qui peut être compilé à partir d'une myriade de langages, notamment C/C++, Rust et AssemblyScript. À l'heure actuelle, il est pris en charge par Chrome, Firefox, Safari, Edge et Node.js !

La spécification WebAssembly détaille deux formats de fichiers, un format binaire appelé module WebAssembly avec une extension `.wasm` et une représentation textuelle correspondante appelée format WebAssembly Text avec une extension `.wat`.

## Concepts clés

* Module - Un binaire WebAssembly compilé, c'est-à-dire un fichier `.wasm`.
* Mémoire - Un ArrayBuffer redimensionnable.
* Table - Un tableau redimensionnable de références non stockées en mémoire.
* Instance - Une instanciation d'un module avec sa mémoire, sa table et ses variables.

Afin d'utiliser WebAssembly, vous avez besoin d'un fichier binaire `.wasm` et d'un ensemble d'API pour communiquer avec WebAssembly. Node.js fournit les API nécessaires via l'objet global `WebAssembly`.

```js
console.log(WebAssembly);
/*
Object [WebAssembly] {
  compile: [Function: compile],
  validate: [Function: validate],
  instantiate: [Function: instantiate]
}
*/
```

## Génération de modules WebAssembly

Il existe de nombreuses méthodes pour générer des fichiers binaires WebAssembly, notamment :

* écrire WebAssembly (`.wat`) à la main et le convertir au format binaire à l'aide d'outils tels que [wabt](https://github.com/webassembly/wabt).
* Utilisation de [emscripten](https://emscripten.org/) avec une application C/C++.
* Utilisation de [wasm-pack](https://rustwasm.github.io/wasm-pack/book/) avec une application Rust
* Utilisation de [AssemblyScript](https://www.assemblyscript.org/) si vous préférez une expérience de type TypeScript.

> Certains de ces outils génèrent non seulement le fichier binaire, mais aussi le code JavaScript "glue" et les fichiers HTML correspondants à exécuter dans le navigateur.

## Comment l'utiliser

Une fois que vous avez un module WebAssembly, vous pouvez utiliser l'objet `WebAssembly` de Node.js pour l'instancier.

```js
// Assume add.wasm file exists that contains a single function adding 2 provided arguments
const fs = require('fs');

const wasmBuffer = fs.readFileSync('/path/to/add.wasm');
WebAssembly.instantiate(wasmBuffer).then(wasmModule => {
  // Exported function live under instance.exports
  const { add } = wasmModule.instance.exports;
  const sum = add(5, 6);
  console.log(sum); // Outputs: 11
});
```

## Interaction avec le système d'exploitation

Les modules WebAssembly ne peuvent pas accéder directement aux fonctionnalités du système d'exploitation par eux-mêmes. Un outil tiers [Wasmtime](https://docs.wasmtime.dev/) peut être utilisé pour accéder à cette fonctionnalité. `Wasmtime` utilise l'API [WASI](https://wasi.dev/) pour accéder aux fonctionnalités du système d'exploitation.

## Ressources

* [Informations générales sur WebAssembly](https://webassembly.org/)
* [Docs MDN](https://developer.mozilla.org/en-US/docs/WebAssembly)
* [Écrire WebAssembly à la main](https://webassembly.github.io/spec/core/text/index.html)
