---
title: 'webcrypto'
displayTitle: 'Web Crypto API'
category: 'api'
version: 'v20'
---

<Metadata data={{"changes":[{"version":"v20.0.0","pr-url":"https://github.com/nodejs/node/pull/46067","description":"Arguments are now coerced and validated as per their WebIDL definitions like in other Web Crypto API implementations."},{"version":"v19.0.0","pr-url":"https://github.com/nodejs/node/pull/44897","description":"No longer experimental except for the `Ed25519`, `Ed448`, `X25519`, and `X448` algorithms."},{"version":["v18.4.0","v16.17.0"],"pr-url":"https://github.com/nodejs/node/pull/43310","description":"Removed proprietary `'node.keyObject'` import/export format."},{"version":["v18.4.0","v16.17.0"],"pr-url":"https://github.com/nodejs/node/pull/43310","description":"Removed proprietary `'NODE-DSA'`, `'NODE-DH'`, and `'NODE-SCRYPT'` algorithms."},{"version":["v18.4.0","v16.17.0"],"pr-url":"https://github.com/nodejs/node/pull/42507","description":"Added `'Ed25519'`, `'Ed448'`, `'X25519'`, and `'X448'` algorithms."},{"version":["v18.4.0","v16.17.0"],"pr-url":"https://github.com/nodejs/node/pull/42507","description":"Removed proprietary `'NODE-ED25519'` and `'NODE-ED448'` algorithms."},{"version":["v18.4.0","v16.17.0"],"pr-url":"https://github.com/nodejs/node/pull/42507","description":"Removed proprietary `'NODE-X25519'` and `'NODE-X448'` named curves from the `'ECDH'` algorithm."}]}} />

<Metadata data={{"update":{"type":"introduced_in","version":["v15.0.0"]}}} />

<Stability stability={2}>

Stable

</Stability>

Node.js provides an implementation of the standard [Web Crypto API][].

Use `globalThis.crypto` or `require('node:crypto').webcrypto` to access this
module.

```js
const { subtle } = globalThis.crypto;

(async function() {

  const key = await subtle.generateKey({
    name: 'HMAC',
    hash: 'SHA-256',
    length: 256,
  }, true, ['sign', 'verify']);

  const enc = new TextEncoder();
  const message = enc.encode('I love cupcakes');

  const digest = await subtle.sign({
    name: 'HMAC',
  }, key, message);

})();
```

### Examples

#### Generating keys

The [`SubtleCrypto`](/api/v20/webcrypto#subtlecrypto) class can be used to generate symmetric (secret) keys
or asymmetric key pairs (public key and private key).

##### AES keys

```js
const { subtle } = globalThis.crypto;

async function generateAesKey(length = 256) {
  const key = await subtle.generateKey({
    name: 'AES-CBC',
    length,
  }, true, ['encrypt', 'decrypt']);

  return key;
}
```

##### ECDSA key pairs

```js
const { subtle } = globalThis.crypto;

async function generateEcKey(namedCurve = 'P-521') {
  const {
    publicKey,
    privateKey,
  } = await subtle.generateKey({
    name: 'ECDSA',
    namedCurve,
  }, true, ['sign', 'verify']);

  return { publicKey, privateKey };
}
```

##### Ed25519/Ed448/X25519/X448 key pairs

<Stability stability={1}>

Experimental

</Stability>

```js
const { subtle } = globalThis.crypto;

async function generateEd25519Key() {
  return subtle.generateKey({
    name: 'Ed25519',
  }, true, ['sign', 'verify']);
}

async function generateX25519Key() {
  return subtle.generateKey({
    name: 'X25519',
  }, true, ['deriveKey']);
}
```

##### HMAC keys

```js
const { subtle } = globalThis.crypto;

async function generateHmacKey(hash = 'SHA-256') {
  const key = await subtle.generateKey({
    name: 'HMAC',
    hash,
  }, true, ['sign', 'verify']);

  return key;
}
```

##### RSA key pairs

```js
const { subtle } = globalThis.crypto;
const publicExponent = new Uint8Array([1, 0, 1]);

async function generateRsaKey(modulusLength = 2048, hash = 'SHA-256') {
  const {
    publicKey,
    privateKey,
  } = await subtle.generateKey({
    name: 'RSASSA-PKCS1-v1_5',
    modulusLength,
    publicExponent,
    hash,
  }, true, ['sign', 'verify']);

  return { publicKey, privateKey };
}
```

#### Encryption and decryption

```js
const crypto = globalThis.crypto;

async function aesEncrypt(plaintext) {
  const ec = new TextEncoder();
  const key = await generateAesKey();
  const iv = crypto.getRandomValues(new Uint8Array(16));

  const ciphertext = await crypto.subtle.encrypt({
    name: 'AES-CBC',
    iv,
  }, key, ec.encode(plaintext));

  return {
    key,
    iv,
    ciphertext,
  };
}

async function aesDecrypt(ciphertext, key, iv) {
  const dec = new TextDecoder();
  const plaintext = await crypto.subtle.decrypt({
    name: 'AES-CBC',
    iv,
  }, key, ciphertext);

  return dec.decode(plaintext);
}
```

#### Exporting and importing keys

```js
const { subtle } = globalThis.crypto;

async function generateAndExportHmacKey(format = 'jwk', hash = 'SHA-512') {
  const key = await subtle.generateKey({
    name: 'HMAC',
    hash,
  }, true, ['sign', 'verify']);

  return subtle.exportKey(format, key);
}

async function importHmacKey(keyData, format = 'jwk', hash = 'SHA-512') {
  const key = await subtle.importKey(format, keyData, {
    name: 'HMAC',
    hash,
  }, true, ['sign', 'verify']);

  return key;
}
```

#### Wrapping and unwrapping keys

```js
const { subtle } = globalThis.crypto;

async function generateAndWrapHmacKey(format = 'jwk', hash = 'SHA-512') {
  const [
    key,
    wrappingKey,
  ] = await Promise.all([
    subtle.generateKey({
      name: 'HMAC', hash,
    }, true, ['sign', 'verify']),
    subtle.generateKey({
      name: 'AES-KW',
      length: 256,
    }, true, ['wrapKey', 'unwrapKey']),
  ]);

  const wrappedKey = await subtle.wrapKey(format, key, wrappingKey, 'AES-KW');

  return { wrappedKey, wrappingKey };
}

async function unwrapHmacKey(
  wrappedKey,
  wrappingKey,
  format = 'jwk',
  hash = 'SHA-512') {

  const key = await subtle.unwrapKey(
    format,
    wrappedKey,
    wrappingKey,
    'AES-KW',
    { name: 'HMAC', hash },
    true,
    ['sign', 'verify']);

  return key;
}
```

#### Sign and verify

```js
const { subtle } = globalThis.crypto;

async function sign(key, data) {
  const ec = new TextEncoder();
  const signature =
    await subtle.sign('RSASSA-PKCS1-v1_5', key, ec.encode(data));
  return signature;
}

async function verify(key, signature, data) {
  const ec = new TextEncoder();
  const verified =
    await subtle.verify(
      'RSASSA-PKCS1-v1_5',
      key,
      signature,
      ec.encode(data));
  return verified;
}
```

#### Deriving bits and keys

```js
const { subtle } = globalThis.crypto;

async function pbkdf2(pass, salt, iterations = 1000, length = 256) {
  const ec = new TextEncoder();
  const key = await subtle.importKey(
    'raw',
    ec.encode(pass),
    'PBKDF2',
    false,
    ['deriveBits']);
  const bits = await subtle.deriveBits({
    name: 'PBKDF2',
    hash: 'SHA-512',
    salt: ec.encode(salt),
    iterations,
  }, key, length);
  return bits;
}

async function pbkdf2Key(pass, salt, iterations = 1000, length = 256) {
  const ec = new TextEncoder();
  const keyMaterial = await subtle.importKey(
    'raw',
    ec.encode(pass),
    'PBKDF2',
    false,
    ['deriveKey']);
  const key = await subtle.deriveKey({
    name: 'PBKDF2',
    hash: 'SHA-512',
    salt: ec.encode(salt),
    iterations,
  }, keyMaterial, {
    name: 'AES-GCM',
    length: 256,
  }, true, ['encrypt', 'decrypt']);
  return key;
}
```

#### Digest

```js
const { subtle } = globalThis.crypto;

async function digest(data, algorithm = 'SHA-512') {
  const ec = new TextEncoder();
  const digest = await subtle.digest(algorithm, ec.encode(data));
  return digest;
}
```

### Algorithm matrix

The table details the algorithms supported by the Node.js Web Crypto API
implementation and the APIs supported for each:

| Algorithm                                                 | `generateKey` | `exportKey` | `importKey` | `encrypt` | `decrypt` | `wrapKey` | `unwrapKey` | `deriveBits` | `deriveKey` | `sign` | `verify` | `digest` |
| --------------------------------------------------------- | ------------- | ----------- | ----------- | --------- | --------- | --------- | ----------- | ------------ | ----------- | ------ | -------- | -------- |
| `'RSASSA-PKCS1-v1_5'`                                     | ✔             | ✔           | ✔           |           |           |           |             |              |             | ✔      | ✔        |          |
| `'RSA-PSS'`                                               | ✔             | ✔           | ✔           |           |           |           |             |              |             | ✔      | ✔        |          |
| `'RSA-OAEP'`                                              | ✔             | ✔           | ✔           | ✔         | ✔         | ✔         | ✔           |              |             |        |          |          |
| `'ECDSA'`                                                 | ✔             | ✔           | ✔           |           |           |           |             |              |             | ✔      | ✔        |          |
| `'Ed25519'` <span class="experimental-inline"></span>[^1] | ✔             | ✔           | ✔           |           |           |           |             |              |             | ✔      | ✔        |          |
| `'Ed448'` <span class="experimental-inline"></span>[^1]   | ✔             | ✔           | ✔           |           |           |           |             |              |             | ✔      | ✔        |          |
| `'ECDH'`                                                  | ✔             | ✔           | ✔           |           |           |           |             | ✔            | ✔           |        |          |          |
| `'X25519'` <span class="experimental-inline"></span>[^1]  | ✔             | ✔           | ✔           |           |           |           |             | ✔            | ✔           |        |          |          |
| `'X448'` <span class="experimental-inline"></span>[^1]    | ✔             | ✔           | ✔           |           |           |           |             | ✔            | ✔           |        |          |          |
| `'AES-CTR'`                                               | ✔             | ✔           | ✔           | ✔         | ✔         | ✔         | ✔           |              |             |        |          |          |
| `'AES-CBC'`                                               | ✔             | ✔           | ✔           | ✔         | ✔         | ✔         | ✔           |              |             |        |          |          |
| `'AES-GCM'`                                               | ✔             | ✔           | ✔           | ✔         | ✔         | ✔         | ✔           |              |             |        |          |          |
| `'AES-KW'`                                                | ✔             | ✔           | ✔           |           |           | ✔         | ✔           |              |             |        |          |          |
| `'HMAC'`                                                  | ✔             | ✔           | ✔           |           |           |           |             |              |             | ✔      | ✔        |          |
| `'HKDF'`                                                  |               | ✔           | ✔           |           |           |           |             | ✔            | ✔           |        |          |          |
| `'PBKDF2'`                                                |               | ✔           | ✔           |           |           |           |             | ✔            | ✔           |        |          |          |
| `'SHA-1'`                                                 |               |             |             |           |           |           |             |              |             |        |          | ✔        |
| `'SHA-256'`                                               |               |             |             |           |           |           |             |              |             |        |          | ✔        |
| `'SHA-384'`                                               |               |             |             |           |           |           |             |              |             |        |          | ✔        |
| `'SHA-512'`                                               |               |             |             |           |           |           |             |              |             |        |          | ✔        |

### <DataTag tag="C" /> `Crypto`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

`globalThis.crypto` is an instance of the `Crypto`
class. `Crypto` is a singleton that provides access to the remainder of the
crypto API.

#### <DataTag tag="M" /> `crypto.subtle`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

* Type: [`SubtleCrypto`](/api/v20/webcrypto#subtlecrypto)

Provides access to the `SubtleCrypto` API.

#### <DataTag tag="M" /> `crypto.getRandomValues(typedArray)`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

* `typedArray` [`Buffer`](/api/v20/buffer#buffer) | [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)
* Returns: [`Buffer`](/api/v20/buffer#buffer) | [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)

Generates cryptographically strong random values. The given `typedArray` is
filled with random values, and a reference to `typedArray` is returned.

The given `typedArray` must be an integer-based instance of [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray),
i.e. `Float32Array` and `Float64Array` are not accepted.

An error will be thrown if the given `typedArray` is larger than 65,536 bytes.

#### <DataTag tag="M" /> `crypto.randomUUID()`

<Metadata data={{"update":{"type":"added","version":["v16.7.0"]}}} />

* Returns: [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

Generates a random [RFC 4122][] version 4 UUID. The UUID is generated using a
cryptographic pseudorandom number generator.

### <DataTag tag="C" /> `CryptoKey`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

#### <DataTag tag="M" /> `cryptoKey.algorithm`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

* Type: [`AesKeyGenParams`](/api/v20/webcrypto#aeskeygenparams) | [`RsaHashedKeyGenParams`](/api/v20/webcrypto#rsahashedkeygenparams) | [`EcKeyGenParams`](/api/v20/webcrypto#eckeygenparams) | [`HmacKeyGenParams`](/api/v20/webcrypto#hmackeygenparams)

An object detailing the algorithm for which the key can be used along with
additional algorithm-specific parameters.

Read-only.

#### <DataTag tag="M" /> `cryptoKey.extractable`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

* Type: [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

When `true`, the [`CryptoKey`](/api/v20/webcrypto#cryptokey) can be extracted using either
`subtleCrypto.exportKey()` or `subtleCrypto.wrapKey()`.

Read-only.

#### <DataTag tag="M" /> `cryptoKey.type`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

* Type: [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) One of `'secret'`, `'private'`, or `'public'`.

A string identifying whether the key is a symmetric (`'secret'`) or
asymmetric (`'private'` or `'public'`) key.

#### <DataTag tag="M" /> `cryptoKey.usages`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

* Type: string\[]

An array of strings identifying the operations for which the
key may be used.

The possible usages are:

* `'encrypt'` - The key may be used to encrypt data.
* `'decrypt'` - The key may be used to decrypt data.
* `'sign'` - The key may be used to generate digital signatures.
* `'verify'` - The key may be used to verify digital signatures.
* `'deriveKey'` - The key may be used to derive a new key.
* `'deriveBits'` - The key may be used to derive bits.
* `'wrapKey'` - The key may be used to wrap another key.
* `'unwrapKey'` - The key may be used to unwrap another key.

Valid key usages depend on the key algorithm (identified by
`cryptokey.algorithm.name`).

| Key Type                                                  | `'encrypt'` | `'decrypt'` | `'sign'` | `'verify'` | `'deriveKey'` | `'deriveBits'` | `'wrapKey'` | `'unwrapKey'` |
| --------------------------------------------------------- | ----------- | ----------- | -------- | ---------- | ------------- | -------------- | ----------- | ------------- |
| `'AES-CBC'`                                               | ✔           | ✔           |          |            |               |                | ✔           | ✔             |
| `'AES-CTR'`                                               | ✔           | ✔           |          |            |               |                | ✔           | ✔             |
| `'AES-GCM'`                                               | ✔           | ✔           |          |            |               |                | ✔           | ✔             |
| `'AES-KW'`                                                |             |             |          |            |               |                | ✔           | ✔             |
| `'ECDH'`                                                  |             |             |          |            | ✔             | ✔              |             |               |
| `'X25519'` <span class="experimental-inline"></span>[^1]  |             |             |          |            | ✔             | ✔              |             |               |
| `'X448'` <span class="experimental-inline"></span>[^1]    |             |             |          |            | ✔             | ✔              |             |               |
| `'ECDSA'`                                                 |             |             | ✔        | ✔          |               |                |             |               |
| `'Ed25519'` <span class="experimental-inline"></span>[^1] |             |             | ✔        | ✔          |               |                |             |               |
| `'Ed448'` <span class="experimental-inline"></span>[^1]   |             |             | ✔        | ✔          |               |                |             |               |
| `'HDKF'`                                                  |             |             |          |            | ✔             | ✔              |             |               |
| `'HMAC'`                                                  |             |             | ✔        | ✔          |               |                |             |               |
| `'PBKDF2'`                                                |             |             |          |            | ✔             | ✔              |             |               |
| `'RSA-OAEP'`                                              | ✔           | ✔           |          |            |               |                | ✔           | ✔             |
| `'RSA-PSS'`                                               |             |             | ✔        | ✔          |               |                |             |               |
| `'RSASSA-PKCS1-v1_5'`                                     |             |             | ✔        | ✔          |               |                |             |               |

### <DataTag tag="C" /> `CryptoKeyPair`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

The `CryptoKeyPair` is a simple dictionary object with `publicKey` and
`privateKey` properties, representing an asymmetric key pair.

#### <DataTag tag="M" /> `cryptoKeyPair.privateKey`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

* Type: [`CryptoKey`](/api/v20/webcrypto#cryptokey) A [`CryptoKey`](/api/v20/webcrypto#cryptokey) whose `type` will be `'private'`.

#### <DataTag tag="M" /> `cryptoKeyPair.publicKey`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

* Type: [`CryptoKey`](/api/v20/webcrypto#cryptokey) A [`CryptoKey`](/api/v20/webcrypto#cryptokey) whose `type` will be `'public'`.

### <DataTag tag="C" /> `SubtleCrypto`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

#### <DataTag tag="M" /> `subtle.decrypt(algorithm, key, data)`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

* `algorithm`: [`RsaOaepParams`](/api/v20/webcrypto#rsaoaepparams) | [`AesCtrParams`](/api/v20/webcrypto#aesctrparams) | [`AesCbcParams`](/api/v20/webcrypto#aescbcparams) | [`AesGcmParams`](/api/v20/webcrypto#aesgcmparams)
* `key`: [`CryptoKey`](/api/v20/webcrypto#cryptokey)
* `data`: [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) | [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`DataView`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView) | [`Buffer`](/api/v20/buffer#buffer)
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) containing [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)

Using the method and parameters specified in `algorithm` and the keying
material provided by `key`, `subtle.decrypt()` attempts to decipher the
provided `data`. If successful, the returned promise will be resolved with
an [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) containing the plaintext result.

The algorithms currently supported include:

* `'RSA-OAEP'`
* `'AES-CTR'`
* `'AES-CBC'`
* `'AES-GCM`'

#### <DataTag tag="M" /> `subtle.deriveBits(algorithm, baseKey, length)`

<Metadata data={{"changes":[{"version":["v18.4.0","v16.17.0"],"pr-url":"https://github.com/nodejs/node/pull/42507","description":"Added `'X25519'`, and `'X448'` algorithms."}],"update":{"type":"added","version":["v15.0.0"]}}} />

* `algorithm`: [`AlgorithmIdentifier`](/api/v20/webcrypto#algorithmidentifier) | [`EcdhKeyDeriveParams`](/api/v20/webcrypto#ecdhkeyderiveparams) | [`HkdfParams`](/api/v20/webcrypto#hkdfparams) | [`Pbkdf2Params`](/api/v20/webcrypto#pbkdf2params)
* `baseKey`: [`CryptoKey`](/api/v20/webcrypto#cryptokey)
* `length`: [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type)
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) containing [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)

Using the method and parameters specified in `algorithm` and the keying
material provided by `baseKey`, `subtle.deriveBits()` attempts to generate
`length` bits.

The Node.js implementation requires that when `length` is a
number it must be multiple of `8`.

When `length` is `null` the maximum number of bits for a given algorithm is
generated. This is allowed for the `'ECDH'`, `'X25519'`, and `'X448'`
algorithms.

If successful, the returned promise will be resolved with an [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)
containing the generated data.

The algorithms currently supported include:

* `'ECDH'`
* `'X25519'` <span class="experimental-inline"></span>[^1]
* `'X448'` <span class="experimental-inline"></span>[^1]
* `'HKDF'`
* `'PBKDF2'`

#### <DataTag tag="M" /> `subtle.deriveKey(algorithm, baseKey, derivedKeyAlgorithm, extractable, keyUsages)`

<Metadata data={{"changes":[{"version":["v18.4.0","v16.17.0"],"pr-url":"https://github.com/nodejs/node/pull/42507","description":"Added `'X25519'`, and `'X448'` algorithms."}],"update":{"type":"added","version":["v15.0.0"]}}} />

* `algorithm`: [`AlgorithmIdentifier`](/api/v20/webcrypto#algorithmidentifier) | [`EcdhKeyDeriveParams`](/api/v20/webcrypto#ecdhkeyderiveparams) | [`HkdfParams`](/api/v20/webcrypto#hkdfparams) | [`Pbkdf2Params`](/api/v20/webcrypto#pbkdf2params)
* `baseKey`: [`CryptoKey`](/api/v20/webcrypto#cryptokey)
* `derivedKeyAlgorithm`: [`HmacKeyGenParams`](/api/v20/webcrypto#hmackeygenparams) | [`AesKeyGenParams`](/api/v20/webcrypto#aeskeygenparams)
* `extractable`: [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)
* `keyUsages`: string\[] See [Key usages][].
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) containing [`CryptoKey`](/api/v20/webcrypto#cryptokey)

Using the method and parameters specified in `algorithm`, and the keying
material provided by `baseKey`, `subtle.deriveKey()` attempts to generate
a new [`CryptoKey`](/api/v20/webcrypto#cryptokey) based on the method and parameters in `derivedKeyAlgorithm`.

Calling `subtle.deriveKey()` is equivalent to calling `subtle.deriveBits()` to
generate raw keying material, then passing the result into the
`subtle.importKey()` method using the `deriveKeyAlgorithm`, `extractable`, and
`keyUsages` parameters as input.

The algorithms currently supported include:

* `'ECDH'`
* `'X25519'` <span class="experimental-inline"></span>[^1]
* `'X448'` <span class="experimental-inline"></span>[^1]
* `'HKDF'`
* `'PBKDF2'`

#### <DataTag tag="M" /> `subtle.digest(algorithm, data)`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

* `algorithm`: [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
* `data`: [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) | [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`DataView`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView) | [`Buffer`](/api/v20/buffer#buffer)
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) containing [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)

Using the method identified by `algorithm`, `subtle.digest()` attempts to
generate a digest of `data`. If successful, the returned promise is resolved
with an [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) containing the computed digest.

If `algorithm` is provided as a [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type), it must be one of:

* `'SHA-1'`
* `'SHA-256'`
* `'SHA-384'`
* `'SHA-512'`

If `algorithm` is provided as an [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object), it must have a `name` property
whose value is one of the above.

#### <DataTag tag="M" /> `subtle.encrypt(algorithm, key, data)`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

* `algorithm`: [`RsaOaepParams`](/api/v20/webcrypto#rsaoaepparams) | [`AesCtrParams`](/api/v20/webcrypto#aesctrparams) | [`AesCbcParams`](/api/v20/webcrypto#aescbcparams) | [`AesGcmParams`](/api/v20/webcrypto#aesgcmparams)
* `key`: [`CryptoKey`](/api/v20/webcrypto#cryptokey)
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) containing [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)

Using the method and parameters specified by `algorithm` and the keying
material provided by `key`, `subtle.encrypt()` attempts to encipher `data`.
If successful, the returned promise is resolved with an [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)
containing the encrypted result.

The algorithms currently supported include:

* `'RSA-OAEP'`
* `'AES-CTR'`
* `'AES-CBC'`
* `'AES-GCM`'

#### <DataTag tag="M" /> `subtle.exportKey(format, key)`

<Metadata data={{"changes":[{"version":["v18.4.0","v16.17.0"],"pr-url":"https://github.com/nodejs/node/pull/42507","description":"Added `'Ed25519'`, `'Ed448'`, `'X25519'`, and `'X448'` algorithms."},{"version":"v15.9.0","pr-url":"https://github.com/nodejs/node/pull/37203","description":"Removed `'NODE-DSA'` JWK export."}],"update":{"type":"added","version":["v15.0.0"]}}} />

* `format`: [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Must be one of `'raw'`, `'pkcs8'`, `'spki'`, or `'jwk'`.
* `key`: [`CryptoKey`](/api/v20/webcrypto#cryptokey)
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) containing [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) | [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object).

Exports the given key into the specified format, if supported.

If the [`CryptoKey`](/api/v20/webcrypto#cryptokey) is not extractable, the returned promise will reject.

When `format` is either `'pkcs8'` or `'spki'` and the export is successful,
the returned promise will be resolved with an [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) containing the
exported key data.

When `format` is `'jwk'` and the export is successful, the returned promise
will be resolved with a JavaScript object conforming to the [JSON Web Key][]
specification.

| Key Type                                                  | `'spki'` | `'pkcs8'` | `'jwk'` | `'raw'` |
| --------------------------------------------------------- | -------- | --------- | ------- | ------- |
| `'AES-CBC'`                                               |          |           | ✔       | ✔       |
| `'AES-CTR'`                                               |          |           | ✔       | ✔       |
| `'AES-GCM'`                                               |          |           | ✔       | ✔       |
| `'AES-KW'`                                                |          |           | ✔       | ✔       |
| `'ECDH'`                                                  | ✔        | ✔         | ✔       | ✔       |
| `'ECDSA'`                                                 | ✔        | ✔         | ✔       | ✔       |
| `'Ed25519'` <span class="experimental-inline"></span>[^1] | ✔        | ✔         | ✔       | ✔       |
| `'Ed448'` <span class="experimental-inline"></span>[^1]   | ✔        | ✔         | ✔       | ✔       |
| `'HDKF'`                                                  |          |           |         |         |
| `'HMAC'`                                                  |          |           | ✔       | ✔       |
| `'PBKDF2'`                                                |          |           |         |         |
| `'RSA-OAEP'`                                              | ✔        | ✔         | ✔       |         |
| `'RSA-PSS'`                                               | ✔        | ✔         | ✔       |         |
| `'RSASSA-PKCS1-v1_5'`                                     | ✔        | ✔         | ✔       |         |

#### <DataTag tag="M" /> `subtle.generateKey(algorithm, extractable, keyUsages)`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

* `algorithm`: [`AlgorithmIdentifier`](/api/v20/webcrypto#algorithmidentifier) | [`RsaHashedKeyGenParams`](/api/v20/webcrypto#rsahashedkeygenparams) | [`EcKeyGenParams`](/api/v20/webcrypto#eckeygenparams) | [`HmacKeyGenParams`](/api/v20/webcrypto#hmackeygenparams) | [`AesKeyGenParams`](/api/v20/webcrypto#aeskeygenparams)

* `extractable`: [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)
* `keyUsages`: string\[] See [Key usages][].
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) containing [`CryptoKey`](/api/v20/webcrypto#cryptokey) | [`CryptoKeyPair`](/api/v20/webcrypto#cryptokeypair)

Using the method and parameters provided in `algorithm`, `subtle.generateKey()`
attempts to generate new keying material. Depending the method used, the method
may generate either a single [`CryptoKey`](/api/v20/webcrypto#cryptokey) or a [`CryptoKeyPair`](/api/v20/webcrypto#cryptokeypair).

The [`CryptoKeyPair`](/api/v20/webcrypto#cryptokeypair) (public and private key) generating algorithms supported
include:

* `'RSASSA-PKCS1-v1_5'`
* `'RSA-PSS'`
* `'RSA-OAEP'`
* `'ECDSA'`
* `'Ed25519'` <span class="experimental-inline"></span>[^1]
* `'Ed448'` <span class="experimental-inline"></span>[^1]
* `'ECDH'`
* `'X25519'` <span class="experimental-inline"></span>[^1]
* `'X448'` <span class="experimental-inline"></span>[^1]

The [`CryptoKey`](/api/v20/webcrypto#cryptokey) (secret key) generating algorithms supported include:

* `'HMAC'`
* `'AES-CTR'`
* `'AES-CBC'`
* `'AES-GCM'`
* `'AES-KW'`

#### <DataTag tag="M" /> `subtle.importKey(format, keyData, algorithm, extractable, keyUsages)`

<Metadata data={{"changes":[{"version":["v18.4.0","v16.17.0"],"pr-url":"https://github.com/nodejs/node/pull/42507","description":"Added `'Ed25519'`, `'Ed448'`, `'X25519'`, and `'X448'` algorithms."},{"version":"v15.9.0","pr-url":"https://github.com/nodejs/node/pull/37203","description":"Removed `'NODE-DSA'` JWK import."}],"update":{"type":"added","version":["v15.0.0"]}}} />

* `format`: [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Must be one of `'raw'`, `'pkcs8'`, `'spki'`, or `'jwk'`.
* `keyData`: [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) | [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`DataView`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView) | [`Buffer`](/api/v20/buffer#buffer) | [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

* `algorithm`: [`AlgorithmIdentifier`](/api/v20/webcrypto#algorithmidentifier) | [`RsaHashedImportParams`](/api/v20/webcrypto#rsahashedimportparams) | [`EcKeyImportParams`](/api/v20/webcrypto#eckeyimportparams) | [`HmacImportParams`](/api/v20/webcrypto#hmacimportparams)

* `extractable`: [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)
* `keyUsages`: string\[] See [Key usages][].
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) containing [`CryptoKey`](/api/v20/webcrypto#cryptokey)

The `subtle.importKey()` method attempts to interpret the provided `keyData`
as the given `format` to create a [`CryptoKey`](/api/v20/webcrypto#cryptokey) instance using the provided
`algorithm`, `extractable`, and `keyUsages` arguments. If the import is
successful, the returned promise will be resolved with the created [`CryptoKey`](/api/v20/webcrypto#cryptokey).

If importing a `'PBKDF2'` key, `extractable` must be `false`.

The algorithms currently supported include:

| Key Type                                                  | `'spki'` | `'pkcs8'` | `'jwk'` | `'raw'` |
| --------------------------------------------------------- | -------- | --------- | ------- | ------- |
| `'AES-CBC'`                                               |          |           | ✔       | ✔       |
| `'AES-CTR'`                                               |          |           | ✔       | ✔       |
| `'AES-GCM'`                                               |          |           | ✔       | ✔       |
| `'AES-KW'`                                                |          |           | ✔       | ✔       |
| `'ECDH'`                                                  | ✔        | ✔         | ✔       | ✔       |
| `'X25519'` <span class="experimental-inline"></span>[^1]  | ✔        | ✔         | ✔       | ✔       |
| `'X448'` <span class="experimental-inline"></span>[^1]    | ✔        | ✔         | ✔       | ✔       |
| `'ECDSA'`                                                 | ✔        | ✔         | ✔       | ✔       |
| `'Ed25519'` <span class="experimental-inline"></span>[^1] | ✔        | ✔         | ✔       | ✔       |
| `'Ed448'` <span class="experimental-inline"></span>[^1]   | ✔        | ✔         | ✔       | ✔       |
| `'HDKF'`                                                  |          |           |         | ✔       |
| `'HMAC'`                                                  |          |           | ✔       | ✔       |
| `'PBKDF2'`                                                |          |           |         | ✔       |
| `'RSA-OAEP'`                                              | ✔        | ✔         | ✔       |         |
| `'RSA-PSS'`                                               | ✔        | ✔         | ✔       |         |
| `'RSASSA-PKCS1-v1_5'`                                     | ✔        | ✔         | ✔       |         |

#### <DataTag tag="M" /> `subtle.sign(algorithm, key, data)`

<Metadata data={{"changes":[{"version":["v18.4.0","v16.17.0"],"pr-url":"https://github.com/nodejs/node/pull/42507","description":"Added `'Ed25519'`, and `'Ed448'` algorithms."}],"update":{"type":"added","version":["v15.0.0"]}}} />

* `algorithm`: [`AlgorithmIdentifier`](/api/v20/webcrypto#algorithmidentifier) | [`RsaPssParams`](/api/v20/webcrypto#rsapssparams) | [`EcdsaParams`](/api/v20/webcrypto#ecdsaparams) | [`Ed448Params`](/api/v20/webcrypto#ed448params)
* `key`: [`CryptoKey`](/api/v20/webcrypto#cryptokey)
* `data`: [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) | [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`DataView`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView) | [`Buffer`](/api/v20/buffer#buffer)
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) containing [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)

Using the method and parameters given by `algorithm` and the keying material
provided by `key`, `subtle.sign()` attempts to generate a cryptographic
signature of `data`. If successful, the returned promise is resolved with
an [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) containing the generated signature.

The algorithms currently supported include:

* `'RSASSA-PKCS1-v1_5'`
* `'RSA-PSS'`
* `'ECDSA'`
* `'Ed25519'` <span class="experimental-inline"></span>[^1]
* `'Ed448'` <span class="experimental-inline"></span>[^1]
* `'HMAC'`

#### <DataTag tag="M" /> `subtle.unwrapKey(format, wrappedKey, unwrappingKey, unwrapAlgo, unwrappedKeyAlgo, extractable, keyUsages)`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

* `format`: [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Must be one of `'raw'`, `'pkcs8'`, `'spki'`, or `'jwk'`.
* `wrappedKey`: [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) | [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`DataView`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView) | [`Buffer`](/api/v20/buffer#buffer)
* `unwrappingKey`: [`CryptoKey`](/api/v20/webcrypto#cryptokey)

* `unwrapAlgo`: [`AlgorithmIdentifier`](/api/v20/webcrypto#algorithmidentifier) | [`RsaOaepParams`](/api/v20/webcrypto#rsaoaepparams) | [`AesCtrParams`](/api/v20/webcrypto#aesctrparams) | [`AesCbcParams`](/api/v20/webcrypto#aescbcparams) | [`AesGcmParams`](/api/v20/webcrypto#aesgcmparams)
* `unwrappedKeyAlgo`: [`AlgorithmIdentifier`](/api/v20/webcrypto#algorithmidentifier) | [`RsaHashedImportParams`](/api/v20/webcrypto#rsahashedimportparams) | [`EcKeyImportParams`](/api/v20/webcrypto#eckeyimportparams) | [`HmacImportParams`](/api/v20/webcrypto#hmacimportparams)

* `extractable`: [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)
* `keyUsages`: string\[] See [Key usages][].
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) containing [`CryptoKey`](/api/v20/webcrypto#cryptokey)

In cryptography, "wrapping a key" refers to exporting and then encrypting the
keying material. The `subtle.unwrapKey()` method attempts to decrypt a wrapped
key and create a [`CryptoKey`](/api/v20/webcrypto#cryptokey) instance. It is equivalent to calling
`subtle.decrypt()` first on the encrypted key data (using the `wrappedKey`,
`unwrapAlgo`, and `unwrappingKey` arguments as input) then passing the results
in to the `subtle.importKey()` method using the `unwrappedKeyAlgo`,
`extractable`, and `keyUsages` arguments as inputs. If successful, the returned
promise is resolved with a [`CryptoKey`](/api/v20/webcrypto#cryptokey) object.

The wrapping algorithms currently supported include:

* `'RSA-OAEP'`
* `'AES-CTR'`
* `'AES-CBC'`
* `'AES-GCM'`
* `'AES-KW'`

The unwrapped key algorithms supported include:

* `'RSASSA-PKCS1-v1_5'`
* `'RSA-PSS'`
* `'RSA-OAEP'`
* `'ECDSA'`
* `'Ed25519'` <span class="experimental-inline"></span>[^1]
* `'Ed448'` <span class="experimental-inline"></span>[^1]
* `'ECDH'`
* `'X25519'` <span class="experimental-inline"></span>[^1]
* `'X448'` <span class="experimental-inline"></span>[^1]
* `'HMAC'`
* `'AES-CTR'`
* `'AES-CBC'`
* `'AES-GCM'`
* `'AES-KW'`

#### <DataTag tag="M" /> `subtle.verify(algorithm, key, signature, data)`

<Metadata data={{"changes":[{"version":["v18.4.0","v16.17.0"],"pr-url":"https://github.com/nodejs/node/pull/42507","description":"Added `'Ed25519'`, and `'Ed448'` algorithms."}],"update":{"type":"added","version":["v15.0.0"]}}} />

* `algorithm`: [`AlgorithmIdentifier`](/api/v20/webcrypto#algorithmidentifier) | [`RsaPssParams`](/api/v20/webcrypto#rsapssparams) | [`EcdsaParams`](/api/v20/webcrypto#ecdsaparams) | [`Ed448Params`](/api/v20/webcrypto#ed448params)
* `key`: [`CryptoKey`](/api/v20/webcrypto#cryptokey)
* `signature`: [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) | [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`DataView`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView) | [`Buffer`](/api/v20/buffer#buffer)
* `data`: [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) | [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`DataView`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView) | [`Buffer`](/api/v20/buffer#buffer)
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) containing [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Using the method and parameters given in `algorithm` and the keying material
provided by `key`, `subtle.verify()` attempts to verify that `signature` is
a valid cryptographic signature of `data`. The returned promise is resolved
with either `true` or `false`.

The algorithms currently supported include:

* `'RSASSA-PKCS1-v1_5'`
* `'RSA-PSS'`
* `'ECDSA'`
* `'Ed25519'` <span class="experimental-inline"></span>[^1]
* `'Ed448'` <span class="experimental-inline"></span>[^1]
* `'HMAC'`

#### <DataTag tag="M" /> `subtle.wrapKey(format, key, wrappingKey, wrapAlgo)`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

* `format`: [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Must be one of `'raw'`, `'pkcs8'`, `'spki'`, or `'jwk'`.
* `key`: [`CryptoKey`](/api/v20/webcrypto#cryptokey)
* `wrappingKey`: [`CryptoKey`](/api/v20/webcrypto#cryptokey)
* `wrapAlgo`: [`AlgorithmIdentifier`](/api/v20/webcrypto#algorithmidentifier) | [`RsaOaepParams`](/api/v20/webcrypto#rsaoaepparams) | [`AesCtrParams`](/api/v20/webcrypto#aesctrparams) | [`AesCbcParams`](/api/v20/webcrypto#aescbcparams) | [`AesGcmParams`](/api/v20/webcrypto#aesgcmparams)
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) containing [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)

In cryptography, "wrapping a key" refers to exporting and then encrypting the
keying material. The `subtle.wrapKey()` method exports the keying material into
the format identified by `format`, then encrypts it using the method and
parameters specified by `wrapAlgo` and the keying material provided by
`wrappingKey`. It is the equivalent to calling `subtle.exportKey()` using
`format` and `key` as the arguments, then passing the result to the
`subtle.encrypt()` method using `wrappingKey` and `wrapAlgo` as inputs. If
successful, the returned promise will be resolved with an [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)
containing the encrypted key data.

The wrapping algorithms currently supported include:

* `'RSA-OAEP'`
* `'AES-CTR'`
* `'AES-CBC'`
* `'AES-GCM'`
* `'AES-KW'`

### Algorithm parameters

The algorithm parameter objects define the methods and parameters used by
the various [`SubtleCrypto`](/api/v20/webcrypto#subtlecrypto) methods. While described here as "classes", they
are simple JavaScript dictionary objects.

#### <DataTag tag="C" /> `AlgorithmIdentifier`

<Metadata data={{"update":{"type":"added","version":["v18.4.0","v16.17.0"]}}} />

##### <DataTag tag="M" /> `algorithmIdentifier.name`

<Metadata data={{"update":{"type":"added","version":["v18.4.0","v16.17.0"]}}} />

* Type: [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

#### <DataTag tag="C" /> `AesCbcParams`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

##### <DataTag tag="M" /> `aesCbcParams.iv`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

* Type: [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) | [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`DataView`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView) | [`Buffer`](/api/v20/buffer#buffer)

Provides the initialization vector. It must be exactly 16-bytes in length
and should be unpredictable and cryptographically random.

##### <DataTag tag="M" /> `aesCbcParams.name`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

* Type: [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Must be `'AES-CBC'`.

#### <DataTag tag="C" /> `AesCtrParams`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

##### <DataTag tag="M" /> `aesCtrParams.counter`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

* Type: [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) | [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`DataView`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView) | [`Buffer`](/api/v20/buffer#buffer)

The initial value of the counter block. This must be exactly 16 bytes long.

The `AES-CTR` method uses the rightmost `length` bits of the block as the
counter and the remaining bits as the nonce.

##### <DataTag tag="M" /> `aesCtrParams.length`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

* Type: [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The number of bits in the `aesCtrParams.counter` that are
  to be used as the counter.

##### <DataTag tag="M" /> `aesCtrParams.name`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

* Type: [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Must be `'AES-CTR'`.

#### <DataTag tag="C" /> `AesGcmParams`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

##### <DataTag tag="M" /> `aesGcmParams.additionalData`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

* Type: [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) | [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`DataView`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView) | [`Buffer`](/api/v20/buffer#buffer) | [`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Undefined_type)

With the AES-GCM method, the `additionalData` is extra input that is not
encrypted but is included in the authentication of the data. The use of
`additionalData` is optional.

##### <DataTag tag="M" /> `aesGcmParams.iv`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

* Type: [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) | [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`DataView`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView) | [`Buffer`](/api/v20/buffer#buffer)

The initialization vector must be unique for every encryption operation using a
given key.

Ideally, this is a deterministic 12-byte value that is computed in such a way
that it is guaranteed to be unique across all invocations that use the same key.
Alternatively, the initialization vector may consist of at least 12
cryptographically random bytes. For more information on constructing
initialization vectors for AES-GCM, refer to Section 8 of [NIST SP 800-38D][].

##### <DataTag tag="M" /> `aesGcmParams.name`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

* Type: [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Must be `'AES-GCM'`.

##### <DataTag tag="M" /> `aesGcmParams.tagLength`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

* Type: [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The size in bits of the generated authentication tag.
  This values must be one of `32`, `64`, `96`, `104`, `112`, `120`, or
  `128`. **Default:** `128`.

#### <DataTag tag="C" /> `AesKeyGenParams`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

##### <DataTag tag="M" /> `aesKeyGenParams.length`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

* Type: [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

The length of the AES key to be generated. This must be either `128`, `192`,
or `256`.

##### <DataTag tag="M" /> `aesKeyGenParams.name`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

* Type: [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Must be one of `'AES-CBC'`, `'AES-CTR'`, `'AES-GCM'`, or
  `'AES-KW'`

#### <DataTag tag="C" /> `EcdhKeyDeriveParams`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

##### <DataTag tag="M" /> `ecdhKeyDeriveParams.name`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

* Type: [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Must be `'ECDH'`, `'X25519'`, or `'X448'`.

##### <DataTag tag="M" /> `ecdhKeyDeriveParams.public`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

* Type: [`CryptoKey`](/api/v20/webcrypto#cryptokey)

ECDH key derivation operates by taking as input one parties private key and
another parties public key -- using both to generate a common shared secret.
The `ecdhKeyDeriveParams.public` property is set to the other parties public
key.

#### <DataTag tag="C" /> `EcdsaParams`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

##### <DataTag tag="M" /> `ecdsaParams.hash`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

* Type: [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

If represented as a [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type), the value must be one of:

* `'SHA-1'`
* `'SHA-256'`
* `'SHA-384'`
* `'SHA-512'`

If represented as an [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object), the object must have a `name` property
whose value is one of the above listed values.

##### <DataTag tag="M" /> `ecdsaParams.name`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

* Type: [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Must be `'ECDSA'`.

#### <DataTag tag="C" /> `EcKeyGenParams`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

##### <DataTag tag="M" /> `ecKeyGenParams.name`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

* Type: [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Must be one of `'ECDSA'` or `'ECDH'`.

##### <DataTag tag="M" /> `ecKeyGenParams.namedCurve`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

* Type: [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Must be one of `'P-256'`, `'P-384'`, `'P-521'`.

#### <DataTag tag="C" /> `EcKeyImportParams`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

##### <DataTag tag="M" /> `ecKeyImportParams.name`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

* Type: [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Must be one of `'ECDSA'` or `'ECDH'`.

##### <DataTag tag="M" /> `ecKeyImportParams.namedCurve`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

* Type: [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Must be one of `'P-256'`, `'P-384'`, `'P-521'`.

#### <DataTag tag="C" /> `Ed448Params`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

##### <DataTag tag="M" /> `ed448Params.name`

<Metadata data={{"update":{"type":"added","version":["v18.4.0","v16.17.0"]}}} />

* Type: [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Must be `'Ed448'`.

##### <DataTag tag="M" /> `ed448Params.context`

<Metadata data={{"update":{"type":"added","version":["v18.4.0","v16.17.0"]}}} />

* Type: [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) | [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`DataView`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView) | [`Buffer`](/api/v20/buffer#buffer) | [`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Undefined_type)

The `context` member represents the optional context data to associate with
the message.
The Node.js Web Crypto API implementation only supports zero-length context
which is equivalent to not providing context at all.

#### <DataTag tag="C" /> `HkdfParams`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

##### <DataTag tag="M" /> `hkdfParams.hash`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

* Type: [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

If represented as a [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type), the value must be one of:

* `'SHA-1'`
* `'SHA-256'`
* `'SHA-384'`
* `'SHA-512'`

If represented as an [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object), the object must have a `name` property
whose value is one of the above listed values.

##### <DataTag tag="M" /> `hkdfParams.info`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

* Type: [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) | [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`DataView`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView) | [`Buffer`](/api/v20/buffer#buffer)

Provides application-specific contextual input to the HKDF algorithm.
This can be zero-length but must be provided.

##### <DataTag tag="M" /> `hkdfParams.name`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

* Type: [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Must be `'HKDF'`.

##### <DataTag tag="M" /> `hkdfParams.salt`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

* Type: [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) | [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`DataView`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView) | [`Buffer`](/api/v20/buffer#buffer)

The salt value significantly improves the strength of the HKDF algorithm.
It should be random or pseudorandom and should be the same length as the
output of the digest function (for instance, if using `'SHA-256'` as the
digest, the salt should be 256-bits of random data).

#### <DataTag tag="C" /> `HmacImportParams`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

##### <DataTag tag="M" /> `hmacImportParams.hash`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

* Type: [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

If represented as a [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type), the value must be one of:

* `'SHA-1'`
* `'SHA-256'`
* `'SHA-384'`
* `'SHA-512'`

If represented as an [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object), the object must have a `name` property
whose value is one of the above listed values.

##### <DataTag tag="M" /> `hmacImportParams.length`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

* Type: [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

The optional number of bits in the HMAC key. This is optional and should
be omitted for most cases.

##### <DataTag tag="M" /> `hmacImportParams.name`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

* Type: [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Must be `'HMAC'`.

#### <DataTag tag="C" /> `HmacKeyGenParams`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

##### <DataTag tag="M" /> `hmacKeyGenParams.hash`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

* Type: [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

If represented as a [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type), the value must be one of:

* `'SHA-1'`
* `'SHA-256'`
* `'SHA-384'`
* `'SHA-512'`

If represented as an [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object), the object must have a `name` property
whose value is one of the above listed values.

##### <DataTag tag="M" /> `hmacKeyGenParams.length`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

* Type: [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

The number of bits to generate for the HMAC key. If omitted,
the length will be determined by the hash algorithm used.
This is optional and should be omitted for most cases.

##### <DataTag tag="M" /> `hmacKeyGenParams.name`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

* Type: [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Must be `'HMAC'`.

#### <DataTag tag="C" /> `Pbkdf2Params`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

##### <DataTag tag="M" /> `pbkdb2Params.hash`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

* Type: [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

If represented as a [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type), the value must be one of:

* `'SHA-1'`
* `'SHA-256'`
* `'SHA-384'`
* `'SHA-512'`

If represented as an [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object), the object must have a `name` property
whose value is one of the above listed values.

##### <DataTag tag="M" /> `pbkdf2Params.iterations`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

* Type: [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

The number of iterations the PBKDF2 algorithm should make when deriving bits.

##### <DataTag tag="M" /> `pbkdf2Params.name`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

* Type: [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Must be `'PBKDF2'`.

##### <DataTag tag="M" /> `pbkdf2Params.salt`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

* Type: [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) | [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`DataView`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView) | [`Buffer`](/api/v20/buffer#buffer)

Should be at least 16 random or pseudorandom bytes.

#### <DataTag tag="C" /> `RsaHashedImportParams`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

##### <DataTag tag="M" /> `rsaHashedImportParams.hash`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

* Type: [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

If represented as a [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type), the value must be one of:

* `'SHA-1'`
* `'SHA-256'`
* `'SHA-384'`
* `'SHA-512'`

If represented as an [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object), the object must have a `name` property
whose value is one of the above listed values.

##### <DataTag tag="M" /> `rsaHashedImportParams.name`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

* Type: [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Must be one of `'RSASSA-PKCS1-v1_5'`, `'RSA-PSS'`, or
  `'RSA-OAEP'`.

#### <DataTag tag="C" /> `RsaHashedKeyGenParams`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

##### <DataTag tag="M" /> `rsaHashedKeyGenParams.hash`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

* Type: [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

If represented as a [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type), the value must be one of:

* `'SHA-1'`
* `'SHA-256'`
* `'SHA-384'`
* `'SHA-512'`

If represented as an [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object), the object must have a `name` property
whose value is one of the above listed values.

##### <DataTag tag="M" /> `rsaHashedKeyGenParams.modulusLength`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

* Type: [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

The length in bits of the RSA modulus. As a best practice, this should be
at least `2048`.

##### <DataTag tag="M" /> `rsaHashedKeyGenParams.name`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

* Type: [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Must be one of `'RSASSA-PKCS1-v1_5'`, `'RSA-PSS'`, or
  `'RSA-OAEP'`.

##### <DataTag tag="M" /> `rsaHashedKeyGenParams.publicExponent`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

* Type: [`Uint8Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)

The RSA public exponent. This must be a [`Uint8Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) containing a big-endian,
unsigned integer that must fit within 32-bits. The [`Uint8Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) may contain an
arbitrary number of leading zero-bits. The value must be a prime number. Unless
there is reason to use a different value, use `new Uint8Array([1, 0, 1])`
(65537) as the public exponent.

#### <DataTag tag="C" /> `RsaOaepParams`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

##### <DataTag tag="M" /> `rsaOaepParams.label`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

* Type: [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) | [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`DataView`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView) | [`Buffer`](/api/v20/buffer#buffer)

An additional collection of bytes that will not be encrypted, but will be bound
to the generated ciphertext.

The `rsaOaepParams.label` parameter is optional.

##### <DataTag tag="M" /> `rsaOaepParams.name`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

* Type: [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) must be `'RSA-OAEP'`.

#### <DataTag tag="C" /> `RsaPssParams`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

##### <DataTag tag="M" /> `rsaPssParams.name`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

* Type: [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Must be `'RSA-PSS'`.

##### <DataTag tag="M" /> `rsaPssParams.saltLength`

<Metadata data={{"update":{"type":"added","version":["v15.0.0"]}}} />

* Type: [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

The length (in bytes) of the random salt to use.

[^1]: An experimental implementation of
    [Secure Curves in the Web Cryptography API][] as of 05 May 2022

[JSON Web Key]: https://tools.ietf.org/html/rfc7517
[Key usages]: #cryptokeyusages
[NIST SP 800-38D]: https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-38d.pdf
[RFC 4122]: https://www.rfc-editor.org/rfc/rfc4122.txt
[Secure Curves in the Web Cryptography API]: https://wicg.github.io/webcrypto-secure-curves/
[Web Crypto API]: https://www.w3.org/TR/WebCryptoAPI/
