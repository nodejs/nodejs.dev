---
title: about
displayTitle: Node.js について
description: 'Node.js について | Node.js'
authors: XhmikosR, mikeal, fhemberger, Fishrock123, yous, tomgco, tniessen, SMcCandlish, saadq, Trott, Gornstats, piperchester, naoufal,  lpinca, j9t, bnoordhuis, harshadsabne, Chris911, benhalverson, e-jigsaw
category: about
---

Node.js は、非同期のイベントドリブン JavaScript ランタイムとして、スケーラブルなネットワークアプリケーションを構築するために設計されています。次の "hello world" の例では、多くの接続を同時に処理できます。接続を並列に処理することができます。各接続の際に、コールバックが呼び出されます。しかし、何もすることがない場合は、Node.js はスリープします。

```javascript
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('こんにちは世界');
});

server.listen(port, hostname, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

これは、OS のスレッドを採用した、今日の一般的な並行処理モデルとは対照的です。スレッドベースのネットワークは、比較的非効率で、非常に使いにくいものです。さらに、Node.js にはロックがないので、プロセスのデッドロックの心配もありません。Node.js では、直接入出力を行う関数はほとんどなく、Node.js の標準ライブラリの同期メソッドを用いて入出力を行う場合を除き、プロセスがブロックされることはありません。ブロックするものがないため、Node.js でスケーラブルなシステムを開発することは非常に合理的です。

これらの言葉に馴染みのない方は[Blocking vs. Non-Blocking][]を参照ください。

---

Node.js は、Ruby の[Event Machine][]や Python の[Twisted][]のようなシステムとデザインが似ていて、影響を受けています。Node.js は、イベントモデルをもう少し進めて、イベントループをライブラリとしてではなく、ランタイムの一部として組み込まれています。他のシステムでは、イベントループを開始するためのブロッキングコールが常に存在します。一般的に、動作はスクリプトの最初にコールバックを通して定義され、最後に`EventMachine::run()`のようなブロッキングコールを通してサーバが開始されます。Node.js では、入力スクリプトを実行した後、単にイベントループに入るだけです。Node.js は、実行するコールバックがなくなるとイベントループを終了します。この動作はブラウザの JavaScript と同じで、イベントループはユーザから隠蔽されています。

HTTP は Node.js では第一級オブジェクトで、ストリーミングと低遅延を念頭に置いて設計されています。このため、Node.js はウェブライブラリやフレームワークの基盤によく適しています。

Node.js はスレッドなしで設計されていますが、マルチコアを活用できないわけではありません。子プロセスは、[`child_process.fork()`][] API を使って生成することができ、簡単に通信できるように設計されています。その同じインタフェースの上に構築された[`cluster`][]モジュールは、プロセス間でソケットを共有し、コア上でのロードバランシングを可能にします。

[blocking vs. non-blocking]: /learn/overview-of-blocking-vs-non-blocking/
[`child_process.fork()`]: /api/child_process/
[`cluster`]: https://nodejs.org/api/cluster.html
[event loop]: /learn/the-nodejs-event-loop/
[event machine]: https://github.com/eventmachine/eventmachine
[twisted]: https://twistedmatrix.com/trac/
