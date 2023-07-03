---
title: 'diagnostics_channel'
displayTitle: 'Diagnostics Channel'
category: 'api'
version: 'v20'
---

<Metadata data={{"changes":[{"version":["v19.2.0","v18.13.0"],"pr-url":"https://github.com/nodejs/node/pull/45290","description":"diagnostics_channel is now Stable."}],"update":{"type":"added","version":["v15.1.0","v14.17.0"]}}} />

<Metadata data={{"update":{"type":"introduced_in","version":["v15.1.0"]}}} />

<Stability stability={2}>

Stable

</Stability>

<Metadata version="v20.3.1" data={{"source_link":"lib/diagnostics_channel.js"}} />

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
* Returns: [`Channel`](/api/v20/diagnostics_channel#channel) The named channel object

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

<Metadata data={{"update":{"type":"added","version":["v18.7.0","v16.17.0"]}}} />

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

<Metadata data={{"update":{"type":"added","version":["v18.7.0","v16.17.0"]}}} />

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

##### <DataTag tag="M" /> `diagnostics_channel.tracingChannel(nameOrChannels)`

<Metadata data={{"update":{"type":"added","version":["v19.9.0"]}}} />

<Stability stability={1}>

Experimental

</Stability>

* `nameOrChannels` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Channel name or
  object containing all the [TracingChannel Channels][]
* Returns: TracingChannel Collection of channels to trace with

Creates a [`TracingChannel`][] wrapper for the given
[TracingChannel Channels][]. If a name is given, the corresponding tracing
channels will be created in the form of `tracing:$name:$eventType` where
`eventType` corresponds to the types of [TracingChannel Channels][].

```mjs|cjs
import diagnostics_channel from 'node:diagnostics_channel';

const channelsByName = diagnostics_channel.tracingChannel('my-channel');

// or...

const channelsByCollection = diagnostics_channel.tracingChannel({
  start: diagnostics_channel.channel('tracing:my-channel:start'),
  end: diagnostics_channel.channel('tracing:my-channel:end'),
  asyncStart: diagnostics_channel.channel('tracing:my-channel:asyncStart'),
  asyncEnd: diagnostics_channel.channel('tracing:my-channel:asyncEnd'),
  error: diagnostics_channel.channel('tracing:my-channel:error'),
});
--------------
const diagnostics_channel = require('node:diagnostics_channel');

const channelsByName = diagnostics_channel.tracingChannel('my-channel');

// or...

const channelsByCollection = diagnostics_channel.tracingChannel({
  start: diagnostics_channel.channel('tracing:my-channel:start'),
  end: diagnostics_channel.channel('tracing:my-channel:end'),
  asyncStart: diagnostics_channel.channel('tracing:my-channel:asyncStart'),
  asyncEnd: diagnostics_channel.channel('tracing:my-channel:asyncEnd'),
  error: diagnostics_channel.channel('tracing:my-channel:error'),
});
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

<Metadata data={{"update":{"type":"deprecated","version":["v18.7.0","v16.17.0"]}}} />

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

<Metadata data={{"changes":[{"version":["v17.1.0","v16.14.0","v14.19.0"],"pr-url":"https://github.com/nodejs/node/pull/40433","description":"Added return value. Added to channels without subscribers."}],"update":{"type":"deprecated","version":["v18.7.0","v16.17.0"]}}} />

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

##### <DataTag tag="M" /> `channel.bindStore(store[, transform])`

<Metadata data={{"update":{"type":"added","version":["v19.9.0"]}}} />

<Stability stability={1}>

Experimental

</Stability>

* `store` AsyncLocalStorage The store to which to bind the context data
* `transform` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) Transform context data before setting the store context

When [`channel.runStores(context, ...)`][] is called, the given context data
will be applied to any store bound to the channel. If the store has already been
bound the previous `transform` function will be replaced with the new one.
The `transform` function may be omitted to set the given context data as the
context directly.

```mjs|cjs
import diagnostics_channel from 'node:diagnostics_channel';
import { AsyncLocalStorage } from 'node:async_hooks';

const store = new AsyncLocalStorage();

const channel = diagnostics_channel.channel('my-channel');

channel.bindStore(store, (data) => {
  return { data };
});
--------------
const diagnostics_channel = require('node:diagnostics_channel');
const { AsyncLocalStorage } = require('node:async_hooks');

const store = new AsyncLocalStorage();

const channel = diagnostics_channel.channel('my-channel');

channel.bindStore(store, (data) => {
  return { data };
});
```

##### <DataTag tag="M" /> `channel.unbindStore(store)`

<Metadata data={{"update":{"type":"added","version":["v19.9.0"]}}} />

<Stability stability={1}>

Experimental

</Stability>

* `store` AsyncLocalStorage The store to unbind from the channel.
* Returns: [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) `true` if the store was found, `false` otherwise.

Remove a message handler previously registered to this channel with
[`channel.bindStore(store)`][].

```mjs|cjs
import diagnostics_channel from 'node:diagnostics_channel';
import { AsyncLocalStorage } from 'node:async_hooks';

const store = new AsyncLocalStorage();

const channel = diagnostics_channel.channel('my-channel');

channel.bindStore(store);
channel.unbindStore(store);
--------------
const diagnostics_channel = require('node:diagnostics_channel');
const { AsyncLocalStorage } = require('node:async_hooks');

const store = new AsyncLocalStorage();

const channel = diagnostics_channel.channel('my-channel');

channel.bindStore(store);
channel.unbindStore(store);
```

##### <DataTag tag="M" /> `channel.runStores(context, fn[, thisArg[, ...args]])`

<Metadata data={{"update":{"type":"added","version":["v19.9.0"]}}} />

<Stability stability={1}>

Experimental

</Stability>

* `context` [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types) Message to send to subscribers and bind to stores
* `fn` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) Handler to run within the entered storage context
* `thisArg` [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types) The receiver to be used for the function call.
* `...args` [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types) Optional arguments to pass to the function.

Applies the given data to any AsyncLocalStorage instances bound to the channel
for the duration of the given function, then publishes to the channel within
the scope of that data is applied to the stores.

If a transform function was given to [`channel.bindStore(store)`][] it will be
applied to transform the message data before it becomes the context value for
the store. The prior storage context is accessible from within the transform
function in cases where context linking is required.

The context applied to the store should be accessible in any async code which
continues from execution which began during the given function, however
there are some situations in which [context loss][] may occur.

```mjs|cjs
import diagnostics_channel from 'node:diagnostics_channel';
import { AsyncLocalStorage } from 'node:async_hooks';

const store = new AsyncLocalStorage();

const channel = diagnostics_channel.channel('my-channel');

channel.bindStore(store, (message) => {
  const parent = store.getStore();
  return new Span(message, parent);
});
channel.runStores({ some: 'message' }, () => {
  store.getStore(); // Span({ some: 'message' })
});
--------------
const diagnostics_channel = require('node:diagnostics_channel');
const { AsyncLocalStorage } = require('node:async_hooks');

const store = new AsyncLocalStorage();

const channel = diagnostics_channel.channel('my-channel');

channel.bindStore(store, (message) => {
  const parent = store.getStore();
  return new Span(message, parent);
});
channel.runStores({ some: 'message' }, () => {
  store.getStore(); // Span({ some: 'message' })
});
```

#### <DataTag tag="C" /> `TracingChannel`

<Metadata data={{"update":{"type":"added","version":["v19.9.0"]}}} />

<Stability stability={1}>

Experimental

</Stability>

The class `TracingChannel` is a collection of [TracingChannel Channels][] which
together express a single traceable action. It is used to formalize and
simplify the process of producing events for tracing application flow.
[`diagnostics_channel.tracingChannel()`][] is used to construct a
`TracingChannel`. As with `Channel` it is recommended to create and reuse a
single `TracingChannel` at the top-level of the file rather than creating them
dynamically.

##### <DataTag tag="M" /> `tracingChannel.subscribe(subscribers)`

<Metadata data={{"update":{"type":"added","version":["v19.9.0"]}}} />

<Stability stability={1}>

Experimental

</Stability>

* `subscribers` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) Set of [TracingChannel Channels][] subscribers
  * `start` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) The [`start` event][] subscriber
  * `end` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) The [`end` event][] subscriber
  * `asyncStart` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) The [`asyncStart` event][] subscriber
  * `asyncEnd` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) The [`asyncEnd` event][] subscriber
  * `error` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) The [`error` event][] subscriber

Helper to subscribe a collection of functions to the corresponding channels.
This is the same as calling [`channel.subscribe(onMessage)`][] on each channel
individually.

```mjs|cjs
import diagnostics_channel from 'node:diagnostics_channel';

const channels = diagnostics_channel.tracingChannel('my-channel');

channels.subscribe({
  start(message) {
    // Handle start message
  },
  end(message) {
    // Handle end message
  },
  asyncStart(message) {
    // Handle asyncStart message
  },
  asyncEnd(message) {
    // Handle asyncEnd message
  },
  error(message) {
    // Handle error message
  },
});
--------------
const diagnostics_channel = require('node:diagnostics_channel');

const channels = diagnostics_channel.tracingChannel('my-channel');

channels.subscribe({
  start(message) {
    // Handle start message
  },
  end(message) {
    // Handle end message
  },
  asyncStart(message) {
    // Handle asyncStart message
  },
  asyncEnd(message) {
    // Handle asyncEnd message
  },
  error(message) {
    // Handle error message
  },
});
```

##### <DataTag tag="M" /> `tracingChannel.unsubscribe(subscribers)`

<Metadata data={{"update":{"type":"added","version":["v19.9.0"]}}} />

<Stability stability={1}>

Experimental

</Stability>

* `subscribers` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) Set of [TracingChannel Channels][] subscribers
  * `start` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) The [`start` event][] subscriber
  * `end` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) The [`end` event][] subscriber
  * `asyncStart` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) The [`asyncStart` event][] subscriber
  * `asyncEnd` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) The [`asyncEnd` event][] subscriber
  * `error` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) The [`error` event][] subscriber
* Returns: [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) `true` if all handlers were successfully unsubscribed,
  and `false` otherwise.

Helper to unsubscribe a collection of functions from the corresponding channels.
This is the same as calling [`channel.unsubscribe(onMessage)`][] on each channel
individually.

```mjs|cjs
import diagnostics_channel from 'node:diagnostics_channel';

const channels = diagnostics_channel.tracingChannel('my-channel');

channels.unsubscribe({
  start(message) {
    // Handle start message
  },
  end(message) {
    // Handle end message
  },
  asyncStart(message) {
    // Handle asyncStart message
  },
  asyncEnd(message) {
    // Handle asyncEnd message
  },
  error(message) {
    // Handle error message
  },
});
--------------
const diagnostics_channel = require('node:diagnostics_channel');

const channels = diagnostics_channel.tracingChannel('my-channel');

channels.unsubscribe({
  start(message) {
    // Handle start message
  },
  end(message) {
    // Handle end message
  },
  asyncStart(message) {
    // Handle asyncStart message
  },
  asyncEnd(message) {
    // Handle asyncEnd message
  },
  error(message) {
    // Handle error message
  },
});
```

##### <DataTag tag="M" /> `tracingChannel.traceSync(fn[, context[, thisArg[, ...args]]])`

<Metadata data={{"update":{"type":"added","version":["v19.9.0"]}}} />

<Stability stability={1}>

Experimental

</Stability>

* `fn` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) Function to wrap a trace around
* `context` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) Shared object to correlate events through
* `thisArg` [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types) The receiver to be used for the function call
* `...args` [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types) Optional arguments to pass to the function
* Returns: [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types) The return value of the given function

Trace a synchronous function call. This will always produce a [`start` event][]
and [`end` event][] around the execution and may produce an [`error` event][]
if the given function throws an error. This will run the given function using
[`channel.runStores(context, ...)`][] on the `start` channel which ensures all
events should have any bound stores set to match this trace context.

```mjs|cjs
import diagnostics_channel from 'node:diagnostics_channel';

const channels = diagnostics_channel.tracingChannel('my-channel');

channels.traceSync(() => {
  // Do something
}, {
  some: 'thing',
});
--------------
const diagnostics_channel = require('node:diagnostics_channel');

const channels = diagnostics_channel.tracingChannel('my-channel');

channels.traceSync(() => {
  // Do something
}, {
  some: 'thing',
});
```

##### <DataTag tag="M" /> `tracingChannel.tracePromise(fn[, context[, thisArg[, ...args]]])`

<Metadata data={{"update":{"type":"added","version":["v19.9.0"]}}} />

<Stability stability={1}>

Experimental

</Stability>

* `fn` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) Promise-returning function to wrap a trace around
* `context` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) Shared object to correlate trace events through
* `thisArg` [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types) The receiver to be used for the function call
* `...args` [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types) Optional arguments to pass to the function
* Returns: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) Chained from promise returned by the given function

Trace a promise-returning function call. This will always produce a
[`start` event][] and [`end` event][] around the synchronous portion of the
function execution, and will produce an [`asyncStart` event][] and
[`asyncEnd` event][] when a promise continuation is reached. It may also
produce an [`error` event][] if the given function throws an error or the
returned promise rejects. This will run the given function using
[`channel.runStores(context, ...)`][] on the `start` channel which ensures all
events should have any bound stores set to match this trace context.

```mjs|cjs
import diagnostics_channel from 'node:diagnostics_channel';

const channels = diagnostics_channel.tracingChannel('my-channel');

channels.tracePromise(async () => {
  // Do something
}, {
  some: 'thing',
});
--------------
const diagnostics_channel = require('node:diagnostics_channel');

const channels = diagnostics_channel.tracingChannel('my-channel');

channels.tracePromise(async () => {
  // Do something
}, {
  some: 'thing',
});
```

##### <DataTag tag="M" /> `tracingChannel.traceCallback(fn[, position[, context[, thisArg[, ...args]]]])`

<Metadata data={{"update":{"type":"added","version":["v19.9.0"]}}} />

<Stability stability={1}>

Experimental

</Stability>

* `fn` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) callback using function to wrap a trace around
* `position` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) Zero-indexed argument position of expected callback
* `context` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) Shared object to correlate trace events through
* `thisArg` [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types) The receiver to be used for the function call
* `...args` [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types) Optional arguments to pass to the function
* Returns: [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types) The return value of the given function

Trace a callback-receiving function call. This will always produce a
[`start` event][] and [`end` event][] around the synchronous portion of the
function execution, and will produce a [`asyncStart` event][] and
[`asyncEnd` event][] around the callback execution. It may also produce an
[`error` event][] if the given function throws an error or the returned
promise rejects. This will run the given function using
[`channel.runStores(context, ...)`][] on the `start` channel which ensures all
events should have any bound stores set to match this trace context.

The `position` will be -1 by default to indicate the final argument should
be used as the callback.

```mjs|cjs
import diagnostics_channel from 'node:diagnostics_channel';

const channels = diagnostics_channel.tracingChannel('my-channel');

channels.traceCallback((arg1, callback) => {
  // Do something
  callback(null, 'result');
}, 1, {
  some: 'thing',
}, thisArg, arg1, callback);
--------------
const diagnostics_channel = require('node:diagnostics_channel');

const channels = diagnostics_channel.tracingChannel('my-channel');

channels.traceCallback((arg1, callback) => {
  // Do something
  callback(null, 'result');
}, {
  some: 'thing',
}, thisArg, arg1, callback);
```

The callback will also be run with [`channel.runStores(context, ...)`][] which
enables context loss recovery in some cases.

```mjs|cjs
import diagnostics_channel from 'node:diagnostics_channel';
import { AsyncLocalStorage } from 'node:async_hooks';

const channels = diagnostics_channel.tracingChannel('my-channel');
const myStore = new AsyncLocalStorage();

// The start channel sets the initial store data to something
// and stores that store data value on the trace context object
channels.start.bindStore(myStore, (data) => {
  const span = new Span(data);
  data.span = span;
  return span;
});

// Then asyncStart can restore from that data it stored previously
channels.asyncStart.bindStore(myStore, (data) => {
  return data.span;
});
--------------
const diagnostics_channel = require('node:diagnostics_channel');
const { AsyncLocalStorage } = require('node:async_hooks');

const channels = diagnostics_channel.tracingChannel('my-channel');
const myStore = new AsyncLocalStorage();

// The start channel sets the initial store data to something
// and stores that store data value on the trace context object
channels.start.bindStore(myStore, (data) => {
  const span = new Span(data);
  data.span = span;
  return span;
});

// Then asyncStart can restore from that data it stored previously
channels.asyncStart.bindStore(myStore, (data) => {
  return data.span;
});
```

#### TracingChannel Channels

A TracingChannel is a collection of several diagnostics\_channels representing
specific points in the execution lifecycle of a single traceable action. The
behavior is split into five diagnostics\_channels consisting of `start`,
`end`, `asyncStart`, `asyncEnd`, and `error`. A single traceable action will
share the same event object between all events, this can be helpful for
managing correlation through a weakmap.

These event objects will be extended with `result` or `error` values when
the task "completes". In the case of a synchronous task the `result` will be
the return value and the `error` will be anything thrown from the function.
With callback-based async functions the `result` will be the second argument
of the callback while the `error` will either be a thrown error visible in the
`end` event or the first callback argument in either of the `asyncStart` or
`asyncEnd` events.

Tracing channels should follow a naming pattern of:

* `tracing:module.class.method:start` or `tracing:module.function:start`
* `tracing:module.class.method:end` or `tracing:module.function:end`
* `tracing:module.class.method:asyncStart` or `tracing:module.function:asyncStart`
* `tracing:module.class.method:asyncEnd` or `tracing:module.function:asyncEnd`
* `tracing:module.class.method:error` or `tracing:module.function:error`

##### <DataTag tag="M" /> `start(event)`

* Name: `tracing:$name:start`

The `start` event represents the point at which a function is called. At this
point the event data may contain function arguments or anything else available
at the very start of the execution of the function.

##### <DataTag tag="M" /> `end(event)`

* Name: `tracing:$name:end`

The `end` event represents the point at which a function call returns a value.
In the case of an async function this is when the promise returned not when the
function itself makes a return statement internally. At this point, if the
traced function was synchronous the `result` field will be set to the return
value of the function. Alternatively, the `error` field may be present to
represent any thrown errors.

It is recommended to listen specifically to the `error` event to track errors
as it may be possible for a traceable action to produce multiple errors. For
example, an async task which fails may be started internally before the sync
part of the task then throws an error.

##### <DataTag tag="M" /> `asyncStart(event)`

* Name: `tracing:$name:asyncStart`

The `asyncStart` event represents the callback or continuation of a traceable
function being reached. At this point things like callback arguments may be
available, or anything else expressing the "result" of the action.

For callbacks-based functions, the first argument of the callback will be
assigned to the `error` field, if not `undefined` or `null`, and the second
argument will be assigned to the `result` field.

For promises, the argument to the `resolve` path will be assigned to `result`
or the argument to the `reject` path will be assign to `error`.

It is recommended to listen specifically to the `error` event to track errors
as it may be possible for a traceable action to produce multiple errors. For
example, an async task which fails may be started internally before the sync
part of the task then throws an error.

##### <DataTag tag="M" /> `asyncEnd(event)`

* Name: `tracing:$name:asyncEnd`

The `asyncEnd` event represents the callback of an asynchronous function
returning. It's not likely event data will change after the `asyncStart` event,
however it may be useful to see the point where the callback completes.

##### <DataTag tag="M" /> `error(event)`

* Name: `tracing:$name:error`

The `error` event represents any error produced by the traceable function
either synchronously or asynchronously. If an error is thrown in the
synchronous portion of the traced function the error will be assigned to the
`error` field of the event and the `error` event will be triggered. If an error
is received asynchronously through a callback or promise rejection it will also
be assigned to the `error` field of the event and trigger the `error` event.

It is possible for a single traceable function call to produce errors multiple
times so this should be considered when consuming this event. For example, if
another async task is triggered internally which fails and then the sync part
of the function then throws and error two `error` events will be emitted, one
for the sync error and one for the async error.

#### Built-in Channels

<Stability stability={1}>

Experimental

</Stability>

While the diagnostics\_channel API is now considered stable, the built-in
channels currently available are not. Each channel must be declared stable
independently.

##### HTTP

`http.client.request.start`

* `request` [`http.ClientRequest`](/api/v20/http#httpclientrequest)

Emitted when client starts a request.

`http.client.response.finish`

* `request` [`http.ClientRequest`](/api/v20/http#httpclientrequest)
* `response` [`http.IncomingMessage`](/api/v20/http#httpincomingmessage)

Emitted when client receives a response.

`http.server.request.start`

* `request` [`http.IncomingMessage`](/api/v20/http#httpincomingmessage)
* `response` [`http.ServerResponse`](/api/v20/http#httpserverresponse)
* `socket` [`net.Socket`](/api/v20/net#netsocket)
* `server` [`http.Server`](/api/v20/http#httpserver)

Emitted when server receives a request.

`http.server.response.finish`

* `request` [`http.IncomingMessage`](/api/v20/http#httpincomingmessage)
* `response` [`http.ServerResponse`](/api/v20/http#httpserverresponse)
* `socket` [`net.Socket`](/api/v20/net#netsocket)
* `server` [`http.Server`](/api/v20/http#httpserver)

Emitted when server sends a response.

##### NET

`net.client.socket`

* `socket` [`net.Socket`](/api/v20/net#netsocket)

Emitted when a new TCP or pipe client socket is created.

`net.server.socket`

* `socket` [`net.Socket`](/api/v20/net#netsocket)

Emitted when a new TCP or pipe connection is received.

##### UDP

`udp.socket`

* `socket` [`dgram.Socket`](/api/v20/dgram#dgramsocket)

Emitted when a new UDP socket is created.

##### Process

<Metadata data={{"update":{"type":"added","version":["v16.18.0"]}}} />

`child_process`

* `process` [`ChildProcess`](/api/v20/child_process#childprocess)

Emitted when a new process is created.

##### Worker Thread

<Metadata data={{"update":{"type":"added","version":["v16.18.0"]}}} />

`worker_threads`

* `worker` [`Worker`][]

Emitted when a new thread is created.

[TracingChannel Channels]: #tracingchannel-channels
[`'uncaughtException'`]: /api/v20/process#event-uncaughtexception
[`TracingChannel`]: #class-tracingchannel
[`Worker`]: worker_threads.md#class-worker
[`asyncEnd` event]: #asyncendevent
[`asyncStart` event]: #asyncstartevent
[`channel.bindStore(store)`]: #channelbindstorestore-transform
[`channel.runStores(context, ...)`]: #channelrunstorescontext-fn-thisarg-args
[`channel.subscribe(onMessage)`]: #channelsubscribeonmessage
[`channel.unsubscribe(onMessage)`]: #channelunsubscribeonmessage
[`diagnostics_channel.channel(name)`]: #diagnostics_channelchannelname
[`diagnostics_channel.subscribe(name, onMessage)`]: #diagnostics_channelsubscribename-onmessage
[`diagnostics_channel.tracingChannel()`]: #diagnostics_channeltracingchannelnameorchannels
[`diagnostics_channel.unsubscribe(name, onMessage)`]: #diagnostics_channelunsubscribename-onmessage
[`end` event]: #endevent
[`error` event]: #errorevent
[`start` event]: #startevent
[context loss]: async_context.md#troubleshooting-context-loss
