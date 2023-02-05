const { apiPath } = require('../pathPrefixes');

const jsDocPrefix = 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/';
const jsDataStructuresUrl = `${jsDocPrefix}Data_structures`;
const jsPrimitives = {
  boolean: 'Boolean',
  integer: 'Number', // Not a primitive, used for clarification.
  null: 'Null',
  number: 'Number',
  string: 'String',
  symbol: 'Symbol',
  undefined: 'Undefined',
};

const jsGlobalObjectsUrl = `${jsDocPrefix}Reference/Global_Objects/`;
const jsGlobalTypes = [
  'AggregateError',
  'Array',
  'ArrayBuffer',
  'DataView',
  'Date',
  'Error',
  'EvalError',
  'Function',
  'Map',
  'Object',
  'Promise',
  'RangeError',
  'ReferenceError',
  'RegExp',
  'Set',
  'SharedArrayBuffer',
  'SyntaxError',
  'TypeError',
  'TypedArray',
  'URIError',
  'Uint8Array',
];

const customTypesMap = {
  any: `${jsDataStructuresUrl}#Data_types`,
  this: `${jsDocPrefix}Reference/Operators/this`,

  AbortController: 'globals#abortcontroller',
  AbortSignal: 'globals#abortsignal',

  ArrayBufferView:
    'https://developer.mozilla.org/en-US/docs/Web/API/ArrayBufferView',

  AsyncIterator: 'https://tc39.github.io/ecma262/#sec-asynciterator-interface',

  AsyncIterable: 'https://tc39.github.io/ecma262/#sec-asynciterable-interface',

  AsyncFunction: 'https://tc39.es/ecma262/#sec-async-function-constructor',

  AsyncGeneratorFunction:
    'https://tc39.es/proposal-async-iteration/#sec-asyncgeneratorfunction-constructor',

  bigint: `${jsDocPrefix}Reference/Global_Objects/BigInt`,
  'WebAssembly.Instance': `${jsDocPrefix}Reference/Global_Objects/WebAssembly/Instance`,

  Blob: 'buffer#blob',

  BroadcastChannel: 'worker_threads#broadcastchannel-extends-eventtarget',

  Iterable: `${jsDocPrefix}Reference/Iteration_protocols#The_iterable_protocol`,
  Iterator: `${jsDocPrefix}Reference/Iteration_protocols#The_iterator_protocol`,

  'Module Namespace Object':
    'https://tc39.github.io/ecma262/#sec-module-namespace-exotic-objects',

  AsyncHook: 'async_hooks#async_hookscreatehookcallbacks',
  AsyncResource: 'async_hooks#asyncresource',

  'brotli options': 'zlib#brotlioptions',

  Buffer: 'buffer#buffer',

  ChildProcess: 'child_process#childprocess',

  'cluster.Worker': 'cluster#worker',

  Cipher: 'crypto#cipher',
  Decipher: 'crypto#decipher',
  DiffieHellman: 'crypto#diffiehellman',
  DiffieHellmanGroup: 'crypto#diffiehellmangroup',
  ECDH: 'crypto#ecdh',
  Hash: 'crypto#hash',
  Hmac: 'crypto#hmac',
  KeyObject: 'crypto#keyobject',
  Sign: 'crypto#sign',
  Verify: 'crypto#verify',
  'crypto.constants': 'crypto#cryptoconstants',

  CryptoKey: 'webcrypto#cryptokey',
  CryptoKeyPair: 'webcrypto#cryptokeypair',
  Crypto: 'webcrypto#crypto',
  SubtleCrypto: 'webcrypto#subtlecrypto',
  RsaOaepParams: 'webcrypto#rsaoaepparams',
  AlgorithmIdentifier: 'webcrypto#algorithmidentifier',
  AesCtrParams: 'webcrypto#aesctrparams',
  AesCbcParams: 'webcrypto#aescbcparams',
  AesGcmParams: 'webcrypto#aesgcmparams',
  EcdhKeyDeriveParams: 'webcrypto#ecdhkeyderiveparams',
  HkdfParams: 'webcrypto#hkdfparams',
  Pbkdf2Params: 'webcrypto#pbkdf2params',
  HmacKeyGenParams: 'webcrypto#hmackeygenparams',
  AesKeyGenParams: 'webcrypto#aeskeygenparams',
  RsaHashedKeyGenParams: 'webcrypto#rsahashedkeygenparams',
  EcKeyGenParams: 'webcrypto#eckeygenparams',
  RsaHashedImportParams: 'webcrypto#rsahashedimportparams',
  EcKeyImportParams: 'webcrypto#eckeyimportparams',
  HmacImportParams: 'webcrypto#hmacimportparams',
  EcdsaParams: 'webcrypto#ecdsaparams',
  RsaPssParams: 'webcrypto#rsapssparams',
  Ed448Params: 'webcrypto#ed448params',

  'dgram.Socket': 'dgram#dgramsocket',

  Channel: 'diagnostics_channel#channel',

  Domain: 'domain#domain',

  'errors.Error': 'errors#error',

  'import.meta': 'esm#importmeta',

  EventEmitter: 'events#eventemitter',
  EventTarget: 'events#eventtarget',
  Event: 'events#event',
  CustomEvent: 'events#customevent',
  EventListener: 'events#listener',

  FileHandle: 'fs#filehandle',
  'fs.Dir': 'fs#fsdir',
  'fs.Dirent': 'fs#fsdirent',
  'fs.FSWatcher': 'fs#fsfswatcher',
  'fs.ReadStream': 'fs#fsreadstream',
  'fs.Stats': 'fs#fsstats',
  'fs.StatWatcher': 'fs#fsstatwatcher',
  'fs.WriteStream': 'fs#fswritestream',

  'http.Agent': 'http#httpagent',
  'http.ClientRequest': 'http#httpclientrequest',
  'http.IncomingMessage': 'http#httpincomingmessage',
  'http.OutgoingMessage': 'http#httpoutgoingmessage',
  'http.Server': 'http#httpserver',
  'http.ServerResponse': 'http#httpserverresponse',

  ClientHttp2Session: 'http2#clienthttp2session',
  ClientHttp2Stream: 'http2#clienthttp2stream',
  'HTTP/2 Headers Object': 'http2#headers-object',
  'HTTP/2 Settings Object': 'http2#settings-object',
  'http2.Http2ServerRequest': 'http2#http2http2serverrequest',
  'http2.Http2ServerResponse': 'http2#http2http2serverresponse',
  Http2SecureServer: 'http2#http2secureserver',
  Http2Server: 'http2#http2server',
  Http2Session: 'http2#http2session',
  Http2Stream: 'http2#http2stream',
  ServerHttp2Stream: 'http2#serverhttp2stream',
  ServerHttp2Session: 'http2#serverhttp2session',

  'https.Server': 'https#httpsserver',

  module: 'modules#the-module-object',

  'module.SourceMap': 'module#modulesourcemap',

  require: 'modules#requireid',

  Handle: 'net#serverlistenhandle-backlog-callback',
  'net.BlockList': 'net#netblocklist',
  'net.Server': 'net#netserver',
  'net.Socket': 'net#netsocket',
  'net.SocketAddress': 'net#netsocketaddress',

  NodeEventTarget: 'events#nodeeventtarget',

  'os.constants.dlopen': 'os#dlopen-constants',

  Histogram: 'perf_hooks#histogram',
  IntervalHistogram: 'perf_hooks#intervalhistogram-extends-histogram',
  RecordableHistogram: 'perf_hooks#recordablehistogram-extends-histogram',
  PerformanceEntry: 'perf_hooks#performanceentry',
  PerformanceNodeTiming: 'perf_hooks#performancenodetiming',
  PerformanceObserver: 'perf_hooks#perf_hooksperformanceobserver',
  PerformanceObserverEntryList: 'perf_hooks#performanceobserverentrylist',

  'readline.Interface': 'readline#readlineinterface',
  'readline.InterfaceConstructor': 'readline#interfaceconstructor',
  'readlinePromises.Interface': 'readline#readlinepromisesinterface',

  'repl.REPLServer': 'repl#replserver',

  Stream: 'stream#stream',
  'stream.Duplex': 'stream#streamduplex',
  Duplex: 'stream#streamduplex',
  'stream.Readable': 'stream#streamreadable',
  Readable: 'stream#streamreadable',
  'stream.Transform': 'stream#streamtransform',
  Transform: 'stream#streamtransform',
  'stream.Writable': 'stream#streamwritable',
  Writable: 'stream#streamwritable',

  Immediate: 'timers#immediate',
  Timeout: 'timers#timeout',
  Timer: 'timers#timers',

  TapStream: 'test#tapstream',

  'tls.SecureContext': 'tls#tlscreatesecurecontextoptions',
  'tls.Server': 'tls#tlsserver',
  'tls.TLSSocket': 'tls#tlstlssocket',

  Tracing: 'tracing#tracing-object',

  URL: 'url#the-whatwg-url-api',
  URLSearchParams: 'url#urlsearchparams',

  'vm.Module': 'vm#vmmodule',
  'vm.Script': 'vm#vmscript',
  'vm.SourceTextModule': 'vm#vmsourcetextmodule',

  MessagePort: 'worker_threads#messageport',
  Worker: 'worker_threads#worker',

  X509Certificate: 'crypto#x509certificate',

  'zlib options': 'zlib#options',

  ReadableStream: 'webstreams#readablestream',
  ReadableStreamDefaultReader: 'webstreams#readablestreamdefaultreader',
  ReadableStreamBYOBReader: 'webstreams#readablestreambyobreader',
  ReadableStreamDefaultController: 'webstreams#readablestreamdefaultcontroller',
  ReadableByteStreamController: 'webstreams#readablebytestreamcontroller',
  ReadableStreamBYOBRequest: 'webstreams#readablestreambyobrequest',
  WritableStream: 'webstreams#writablestream',
  WritableStreamDefaultWriter: 'webstreams#writablestreamdefaultwriter',
  WritableStreamDefaultController: 'webstreams#writablestreamdefaultcontroller',
  TransformStream: 'webstreams#transformstream',
  TransformStreamDefaultController:
    'webstreams#transformstreamdefaultcontroller',
  ByteLengthQueuingStrategy: 'webstreams#bytelengthqueuingstrategy',
  CountQueuingStrategy: 'webstreams#countqueuingstrategy',
  TextEncoderStream: 'webstreams#textencoderstream',
  TextDecoderStream: 'webstreams#textdecoderstream',

  FormData: 'https://developer.mozilla.org/en-US/docs/Web/API/FormData',
  Headers: 'https://developer.mozilla.org/en-US/docs/Web/API/Headers',
  Response: 'https://developer.mozilla.org/en-US/docs/Web/API/Response',
  Request: 'https://developer.mozilla.org/en-US/docs/Web/API/Request',
};

const arrayPart = /(?:\[])+$/;

function toLink(metadata, source) {
  const typeLinks = [];

  let typeInput = source;

  typeInput = typeInput.replace('{', '').replace('}', '');

  const typeTexts = typeInput.split('|');

  typeTexts.forEach(piece => {
    let typeText = piece;

    typeText = typeText.trim();

    if (typeText) {
      let typeUrl;

      // To support type[], type[][] etc., we store the full string
      // and use the bracket-less version to lookup the type URL.
      const typeTextFull = typeText;
      typeText = typeText.replace(arrayPart, '');

      const primitive = jsPrimitives[typeText.toLowerCase()];

      if (primitive !== undefined) {
        typeUrl = `${jsDataStructuresUrl}#${primitive}_type`;
      } else if (jsGlobalTypes.includes(typeText)) {
        typeUrl = `${jsGlobalObjectsUrl}${typeText}`;
      } else if (customTypesMap[typeText]) {
        // Checks if the URL points to the internal documentation page
        // Then adds a prefix. Otherwise the link refers to another page
        typeUrl = /^https?:\/\//.test(customTypesMap[typeText])
          ? customTypesMap[typeText]
          : `${apiPath}${metadata.version}/${customTypesMap[typeText]}`;
      }

      if (typeUrl) {
        typeLinks.push(`[\`${typeTextFull}\`](${typeUrl})`);
      }
    }
  });

  return typeLinks.length ? typeLinks.join(' | ') : typeInput;
}

module.exports = toLink;
