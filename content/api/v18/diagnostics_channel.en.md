---
title: 'diagnostics_channel'
displayTitle: 'Diagnostics Channel'
category: 'api'
version: 'v18'
---

<Metadata data={{"changes":[{"version":"v18.13.0","pr-url":"https://github.com/nodejs/node/pull/45290","description":"diagnostics_channel is now Stable."}],"update":{"type":"added","version":["v15.1.0","v14.17.0"]}}} />

<Metadata data={{"update":{"type":"introduced_in","version":["v15.1.0"]}}} />

<Stability stability={2}>

Stable

</Stability>

<Metadata version="v18.16.1" data={{"source_link":"lib/diagnostics_channel.js"}} />

The `node:diagnostics_channel` module provides an API to create named channels
to report arbitrary message data for diagnostics purposes.

It can be accessed using:

```mjs|cjs
import diagnostics_channel from 'node:diagnostics_channel';
--------------
const diagnostics_channel = require('node:diagnostics_channel');
```

It is intended that a module writer wanting to report diagnostics messages
will create one or many top-level channels to report messages through.
Channels may also be acquired at runtime but it is not encouraged
due to the additional overhead of doing so. Channels may be exported for
convenience, but as long as the name is known it can be acquired anywhere.

If you intend for your module to produce diagnostics data for others to
consume it is recommended that you include documentation of what named
channels are used along with the shape of the message data. Channel names
should generally include the module name to avoid collisions with data from
other modules.

### Public API

#### Overview

Following is a simple overview of the public API.

```mjs|cjs
import diagnostics_channel from 'node:diagnostics_channel';

// Get a reusable channel object
const channel = diagnostics_channel.channel('my-channel');

function onMessage(message, name) {
  // Received data
}

// Subscribe to the channel
diagnostics_channel.subscribe('my-channel', onMessage);

// Check if the channel has an active subscriber
if (channel.hasSubscribers) {
  // Publish data to the channel
  channel.publish({
    some: 'data',
  });
}

// Unsubscribe from the channel
diagnostics_channel.unsubscribe('my-channel', onMessage);
--------------
const diagnostics_channel = require('node:diagnostics_channel');

// Get a reusable channel object
const channel = diagnostics_channel.channel('my-channel');

function onMessage(message, name) {
  // Received data
}

// Subscribe to the channel
diagnostics_channel.subscribe('my-channel', onMessage);

// Check if the channel has an active subscriber
if (channel.hasSubscribers) {
  // Publish data to the channel
  channel.publish({
    some: 'data',
  });
}

// Unsubscribe from the channel
diagnostics_channel.unsubscribe('my-channel', onMessage);
```

##### <DataTag tag="M" /> `diagnostics_channel.hasSubscribers(name)`

<Metadata data={{"update":{"type":"added","version":["v15.1.0","v14.17.0"]}}} />

* `name` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`symbol`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Symbol_type) The channel name
* Returns: [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) If there are active subscribers

Check if there are active subscribers to the named channel. This is helpful if
the message you want to send might be expensive to prepare.

This API is optional but helpful when trying to publish messages from very
performance-sensitive code.

```mjs|cjs
import diagnostics_channel from 'node:diagnostics_channel';

if (diagnostics_channel.hasSubscribers('my-channel')) {
  // There are subscribers, prepare and publish message
}
--------------
const diagnostics_channel = require('node:diagnostics_channel');

if (diagnostics_channel.hasSubscribers('my-channel')) {
  // There are subscribers, prepare and publish message
}
```

##### <DataTag tag="M" /> `diagnostics_channel.channel(name)`

<Metadata data={{"update":{"type":"added","version":["v15.1.0","v14.17.0"]}}} />

* `name` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`symbol`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Symbol_type) The channel name
* Returns: [`Channel`](/api/v18/diagnostics_channel#channel) The named channel object

This is the primary entry-point for anyone wanting to publish to a named
channel. It produces a channel object which is optimized to reduce overhead at
publish time as much as possible.

```mjs|cjs
import diagnostics_channel from 'node:diagnostics_channel';

const channel = diagnostics_channel.channel('my-channel');
--------------
const diagnostics_channel = require('node:diagnostics_channel');

const channel = diagnostics_channel.channel('my-channel');
```

##### <DataTag tag="M" /> `diagnostics_channel.subscribe(name, onMessage)`

<Metadata data={{"update":{"type":"added","version":["v18.7.0"]}}} />

* `name` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`symbol`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Symbol_type) The channel name
* `onMessage` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) The handler to receive channel messages
  * `message` [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types) The message data
  * `name` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`symbol`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Symbol_type) The name of the channel

Register a message handler to subscribe to this channel. This message handler
will be run synchronously whenever a message is published to the channel. Any
errors thrown in the message handler will trigger an [`'uncaughtException'`][].

```mjs|cjs
import diagnostics_channel from 'node:diagnostics_channel';

diagnostics_channel.subscribe('my-channel', (message, name) => {
  // Received data
});
--------------
const diagnostics_channel = require('node:diagnostics_channel');

diagnostics_channel.subscribe('my-channel', (message, name) => {
  // Received data
});
```

##### <DataTag tag="M" /> `diagnostics_channel.unsubscribe(name, onMessage)`

<Metadata data={{"update":{"type":"added","version":["v18.7.0"]}}} />

* `name` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`symbol`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Symbol_type) The channel name
* `onMessage` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) The previous subscribed handler to remove
* Returns: [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) `true` if the handler was found, `false` otherwise.

Remove a message handler previously registered to this channel with
[`diagnostics_channel.subscribe(name, onMessage)`][].

```mjs|cjs
import diagnostics_channel from 'node:diagnostics_channel';

function onMessage(message, name) {
  // Received data
}

diagnostics_channel.subscribe('my-channel', onMessage);

diagnostics_channel.unsubscribe('my-channel', onMessage);
--------------
const diagnostics_channel = require('node:diagnostics_channel');

function onMessage(message, name) {
  // Received data
}

diagnostics_channel.subscribe('my-channel', onMessage);

diagnostics_channel.unsubscribe('my-channel', onMessage);
```

#### <DataTag tag="C" /> `Channel`

<Metadata data={{"update":{"type":"added","version":["v15.1.0","v14.17.0"]}}} />

The class `Channel` represents an individual named channel within the data
pipeline. It is used to track subscribers and to publish messages when there
are subscribers present. It exists as a separate object to avoid channel
lookups at publish time, enabling very fast publish speeds and allowing
for heavy use while incurring very minimal cost. Channels are created with
[`diagnostics_channel.channel(name)`][], constructing a channel directly
with `new Channel(name)` is not supported.

##### <DataTag tag="M" /> `channel.hasSubscribers`

<Metadata data={{"update":{"type":"added","version":["v15.1.0","v14.17.0"]}}} />

* Returns: [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) If there are active subscribers

Check if there are active subscribers to this channel. This is helpful if
the message you want to send might be expensive to prepare.

This API is optional but helpful when trying to publish messages from very
performance-sensitive code.

```mjs|cjs
import diagnostics_channel from 'node:diagnostics_channel';

const channel = diagnostics_channel.channel('my-channel');

if (channel.hasSubscribers) {
  // There are subscribers, prepare and publish message
}
--------------
const diagnostics_channel = require('node:diagnostics_channel');

const channel = diagnostics_channel.channel('my-channel');

if (channel.hasSubscribers) {
  // There are subscribers, prepare and publish message
}
```

##### <DataTag tag="M" /> `channel.publish(message)`

<Metadata data={{"update":{"type":"added","version":["v15.1.0","v14.17.0"]}}} />

* `message` [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types) The message to send to the channel subscribers

Publish a message to any subscribers to the channel. This will trigger
message handlers synchronously so they will execute within the same context.

```mjs|cjs
import diagnostics_channel from 'node:diagnostics_channel';

const channel = diagnostics_channel.channel('my-channel');

channel.publish({
  some: 'message',
});
--------------
const diagnostics_channel = require('node:diagnostics_channel');

const channel = diagnostics_channel.channel('my-channel');

channel.publish({
  some: 'message',
});
```

##### <DataTag tag="M" /> `channel.subscribe(onMessage)`

<Metadata data={{"update":{"type":"deprecated","version":["v18.7.0"]}}} />

<Stability stability={0}>

Deprecated: Use [`diagnostics_channel.subscribe(name, onMessage)`][]

</Stability>

* `onMessage` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) The handler to receive channel messages
  * `message` [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types) The message data
  * `name` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`symbol`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Symbol_type) The name of the channel

Register a message handler to subscribe to this channel. This message handler
will be run synchronously whenever a message is published to the channel. Any
errors thrown in the message handler will trigger an [`'uncaughtException'`][].

```mjs|cjs
import diagnostics_channel from 'node:diagnostics_channel';

const channel = diagnostics_channel.channel('my-channel');

channel.subscribe((message, name) => {
  // Received data
});
--------------
const diagnostics_channel = require('node:diagnostics_channel');

const channel = diagnostics_channel.channel('my-channel');

channel.subscribe((message, name) => {
  // Received data
});
```

##### <DataTag tag="M" /> `channel.unsubscribe(onMessage)`

<Metadata data={{"changes":[{"version":["v17.1.0","v16.14.0","v14.19.0"],"pr-url":"https://github.com/nodejs/node/pull/40433","description":"Added return value. Added to channels without subscribers."}],"update":{"type":"deprecated","version":["v18.7.0"]}}} />

<Stability stability={0}>

Deprecated: Use [`diagnostics_channel.unsubscribe(name, onMessage)`][]

</Stability>

* `onMessage` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) The previous subscribed handler to remove
* Returns: [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) `true` if the handler was found, `false` otherwise.

Remove a message handler previously registered to this channel with
[`channel.subscribe(onMessage)`][].

```mjs|cjs
import diagnostics_channel from 'node:diagnostics_channel';

const channel = diagnostics_channel.channel('my-channel');

function onMessage(message, name) {
  // Received data
}

channel.subscribe(onMessage);

channel.unsubscribe(onMessage);
--------------
const diagnostics_channel = require('node:diagnostics_channel');

const channel = diagnostics_channel.channel('my-channel');

function onMessage(message, name) {
  // Received data
}

channel.subscribe(onMessage);

channel.unsubscribe(onMessage);
```

#### Built-in Channels

<Stability stability={1}>

Experimental

</Stability>

While the diagnostics\_channel API is now considered stable, the built-in
channels currently available are not. Each channel must be declared stable
independently.

##### HTTP

`http.client.request.start`

* `request` [`http.ClientRequest`](/api/v18/http#httpclientrequest)

Emitted when client starts a request.

`http.client.response.finish`

* `request` [`http.ClientRequest`](/api/v18/http#httpclientrequest)
* `response` [`http.IncomingMessage`](/api/v18/http#httpincomingmessage)

Emitted when client receives a response.

`http.server.request.start`

* `request` [`http.IncomingMessage`](/api/v18/http#httpincomingmessage)
* `response` [`http.ServerResponse`](/api/v18/http#httpserverresponse)
* `socket` [`net.Socket`](/api/v18/net#netsocket)
* `server` [`http.Server`](/api/v18/http#httpserver)

Emitted when server receives a request.

`http.server.response.finish`

* `request` [`http.IncomingMessage`](/api/v18/http#httpincomingmessage)
* `response` [`http.ServerResponse`](/api/v18/http#httpserverresponse)
* `socket` [`net.Socket`](/api/v18/net#netsocket)
* `server` [`http.Server`](/api/v18/http#httpserver)

Emitted when server sends a response.

`net.client.socket`

* `socket` [`net.Socket`](/api/v18/net#netsocket)

Emitted when a new TCP or pipe client socket is created.

`net.server.socket`

* `socket` [`net.Socket`](/api/v18/net#netsocket)

Emitted when a new TCP or pipe connection is received.

`udp.socket`

* `socket` [`dgram.Socket`](/api/v18/dgram#dgramsocket)

Emitted when a new UDP socket is created.

[`'uncaughtException'`]: /api/v18/process#event-uncaughtexception
[`channel.subscribe(onMessage)`]: #channelsubscribeonmessage
[`diagnostics_channel.channel(name)`]: #diagnostics_channelchannelname
[`diagnostics_channel.subscribe(name, onMessage)`]: #diagnostics_channelsubscribename-onmessage
[`diagnostics_channel.unsubscribe(name, onMessage)`]: #diagnostics_channelunsubscribename-onmessage
