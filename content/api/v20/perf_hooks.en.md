---
title: 'perf_hooks'
displayTitle: 'Performance measurement APIs'
category: 'api'
version: 'v20'
---

<Metadata data={{"update":{"type":"introduced_in","version":["v8.5.0"]}}} />

<Stability stability={2}>

Stable

</Stability>

<Metadata version="v20.3.1" data={{"source_link":"lib/perf_hooks.js"}} />

This module provides an implementation of a subset of the W3C
[Web Performance APIs][] as well as additional APIs for
Node.js-specific performance measurements.

Node.js supports the following [Web Performance APIs][]:

* [High Resolution Time][]
* [Performance Timeline][]
* [User Timing][]
* [Resource Timing][]

```js
const { PerformanceObserver, performance } = require('node:perf_hooks');

const obs = new PerformanceObserver((items) => {
  console.log(items.getEntries()[0].duration);
  performance.clearMarks();
});
obs.observe({ type: 'measure' });
performance.measure('Start to Now');

performance.mark('A');
doSomeLongRunningProcess(() => {
  performance.measure('A to Now', 'A');

  performance.mark('B');
  performance.measure('A to B', 'A', 'B');
});
```

### <DataTag tag="M" /> `perf_hooks.performance`

<Metadata data={{"update":{"type":"added","version":["v8.5.0"]}}} />

An object that can be used to collect performance metrics from the current
Node.js instance. It is similar to [`window.performance`][] in browsers.

#### <DataTag tag="M" /> `performance.clearMarks([name])`

<Metadata data={{"changes":[{"version":"v19.0.0","pr-url":"https://github.com/nodejs/node/pull/44483","description":"This method must be called with the `performance` object as the receiver."}],"update":{"type":"added","version":["v8.5.0"]}}} />

* `name` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

If `name` is not provided, removes all `PerformanceMark` objects from the
Performance Timeline. If `name` is provided, removes only the named mark.

#### <DataTag tag="M" /> `performance.clearMeasures([name])`

<Metadata data={{"changes":[{"version":"v19.0.0","pr-url":"https://github.com/nodejs/node/pull/44483","description":"This method must be called with the `performance` object as the receiver."}],"update":{"type":"added","version":["v16.7.0"]}}} />

* `name` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

If `name` is not provided, removes all `PerformanceMeasure` objects from the
Performance Timeline. If `name` is provided, removes only the named measure.

#### <DataTag tag="M" /> `performance.clearResourceTimings([name])`

<Metadata data={{"changes":[{"version":"v19.0.0","pr-url":"https://github.com/nodejs/node/pull/44483","description":"This method must be called with the `performance` object as the receiver."}],"update":{"type":"added","version":["v18.2.0","v16.17.0"]}}} />

* `name` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

If `name` is not provided, removes all `PerformanceResourceTiming` objects from
the Resource Timeline. If `name` is provided, removes only the named resource.

#### <DataTag tag="M" /> `performance.eventLoopUtilization([utilization1[, utilization2]])`

<Metadata data={{"update":{"type":"added","version":["v14.10.0","v12.19.0"]}}} />

* `utilization1` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) The result of a previous call to
  `eventLoopUtilization()`.
* `utilization2` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) The result of a previous call to
  `eventLoopUtilization()` prior to `utilization1`.
* Returns [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `idle` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
  * `active` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
  * `utilization` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

The `eventLoopUtilization()` method returns an object that contains the
cumulative duration of time the event loop has been both idle and active as a
high resolution milliseconds timer. The `utilization` value is the calculated
Event Loop Utilization (ELU).

If bootstrapping has not yet finished on the main thread the properties have
the value of `0`. The ELU is immediately available on [Worker threads][] since
bootstrap happens within the event loop.

Both `utilization1` and `utilization2` are optional parameters.

If `utilization1` is passed, then the delta between the current call's `active`
and `idle` times, as well as the corresponding `utilization` value are
calculated and returned (similar to [`process.hrtime()`][]).

If `utilization1` and `utilization2` are both passed, then the delta is
calculated between the two arguments. This is a convenience option because,
unlike [`process.hrtime()`][], calculating the ELU is more complex than a
single subtraction.

ELU is similar to CPU utilization, except that it only measures event loop
statistics and not CPU usage. It represents the percentage of time the event
loop has spent outside the event loop's event provider (e.g. `epoll_wait`).
No other CPU idle time is taken into consideration. The following is an example
of how a mostly idle process will have a high ELU.

```js
'use strict';
const { eventLoopUtilization } = require('node:perf_hooks').performance;
const { spawnSync } = require('node:child_process');

setImmediate(() => {
  const elu = eventLoopUtilization();
  spawnSync('sleep', ['5']);
  console.log(eventLoopUtilization(elu).utilization);
});
```

Although the CPU is mostly idle while running this script, the value of
`utilization` is `1`. This is because the call to
[`child_process.spawnSync()`][] blocks the event loop from proceeding.

Passing in a user-defined object instead of the result of a previous call to
`eventLoopUtilization()` will lead to undefined behavior. The return values
are not guaranteed to reflect any correct state of the event loop.

#### <DataTag tag="M" /> `performance.getEntries()`

<Metadata data={{"changes":[{"version":"v19.0.0","pr-url":"https://github.com/nodejs/node/pull/44483","description":"This method must be called with the `performance` object as the receiver."}],"update":{"type":"added","version":["v16.7.0"]}}} />

* Returns: PerformanceEntry\[]

Returns a list of `PerformanceEntry` objects in chronological order with
respect to `performanceEntry.startTime`. If you are only interested in
performance entries of certain types or that have certain names, see
`performance.getEntriesByType()` and `performance.getEntriesByName()`.

#### <DataTag tag="M" /> `performance.getEntriesByName(name[, type])`

<Metadata data={{"changes":[{"version":"v19.0.0","pr-url":"https://github.com/nodejs/node/pull/44483","description":"This method must be called with the `performance` object as the receiver."}],"update":{"type":"added","version":["v16.7.0"]}}} />

* `name` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
* `type` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
* Returns: PerformanceEntry\[]

Returns a list of `PerformanceEntry` objects in chronological order
with respect to `performanceEntry.startTime` whose `performanceEntry.name` is
equal to `name`, and optionally, whose `performanceEntry.entryType` is equal to
`type`.

#### <DataTag tag="M" /> `performance.getEntriesByType(type)`

<Metadata data={{"changes":[{"version":"v19.0.0","pr-url":"https://github.com/nodejs/node/pull/44483","description":"This method must be called with the `performance` object as the receiver."}],"update":{"type":"added","version":["v16.7.0"]}}} />

* `type` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
* Returns: PerformanceEntry\[]

Returns a list of `PerformanceEntry` objects in chronological order
with respect to `performanceEntry.startTime` whose `performanceEntry.entryType`
is equal to `type`.

#### <DataTag tag="M" /> `performance.mark(name[, options])`

<Metadata data={{"changes":[{"version":"v19.0.0","pr-url":"https://github.com/nodejs/node/pull/44483","description":"This method must be called with the `performance` object as the receiver. The name argument is no longer optional."},{"version":"v16.0.0","pr-url":"https://github.com/nodejs/node/pull/37136","description":"Updated to conform to the User Timing Level 3 specification."}],"update":{"type":"added","version":["v8.5.0"]}}} />

* `name` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `detail` [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types) Additional optional detail to include with the mark.
  * `startTime` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) An optional timestamp to be used as the mark time.
    **Default**: `performance.now()`.

Creates a new `PerformanceMark` entry in the Performance Timeline. A
`PerformanceMark` is a subclass of `PerformanceEntry` whose
`performanceEntry.entryType` is always `'mark'`, and whose
`performanceEntry.duration` is always `0`. Performance marks are used
to mark specific significant moments in the Performance Timeline.

The created `PerformanceMark` entry is put in the global Performance Timeline
and can be queried with `performance.getEntries`,
`performance.getEntriesByName`, and `performance.getEntriesByType`. When the
observation is performed, the entries should be cleared from the global
Performance Timeline manually with `performance.clearMarks`.

#### <DataTag tag="M" /> `performance.markResourceTiming(timingInfo, requestedUrl, initiatorType, global, cacheMode)`

<Metadata data={{"update":{"type":"added","version":["v18.2.0","v16.17.0"]}}} />

* `timingInfo` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) [Fetch Timing Info][]
* `requestedUrl` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) The resource url
* `initiatorType` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) The initiator name, e.g: 'fetch'
* `global` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
* `cacheMode` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) The cache mode must be an empty string ('') or 'local'

_This property is an extension by Node.js. It is not available in Web browsers._

Creates a new `PerformanceResourceTiming` entry in the Resource Timeline. A
`PerformanceResourceTiming` is a subclass of `PerformanceEntry` whose
`performanceEntry.entryType` is always `'resource'`. Performance resources
are used to mark moments in the Resource Timeline.

The created `PerformanceMark` entry is put in the global Resource Timeline
and can be queried with `performance.getEntries`,
`performance.getEntriesByName`, and `performance.getEntriesByType`. When the
observation is performed, the entries should be cleared from the global
Performance Timeline manually with `performance.clearResourceTimings`.

#### <DataTag tag="M" /> `performance.measure(name[, startMarkOrOptions[, endMark]])`

<Metadata data={{"changes":[{"version":"v19.0.0","pr-url":"https://github.com/nodejs/node/pull/44483","description":"This method must be called with the `performance` object as the receiver."},{"version":"v16.0.0","pr-url":"https://github.com/nodejs/node/pull/37136","description":"Updated to conform to the User Timing Level 3 specification."},{"version":["v13.13.0","v12.16.3"],"pr-url":"https://github.com/nodejs/node/pull/32651","description":"Make `startMark` and `endMark` parameters optional."}],"update":{"type":"added","version":["v8.5.0"]}}} />

* `name` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
* `startMarkOrOptions` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) Optional.
  * `detail` [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types) Additional optional detail to include with the measure.
  * `duration` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) Duration between start and end times.
  * `end` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Timestamp to be used as the end time, or a string
    identifying a previously recorded mark.
  * `start` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Timestamp to be used as the start time, or a string
    identifying a previously recorded mark.
* `endMark` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Optional. Must be omitted if `startMarkOrOptions` is an
  [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object).

Creates a new `PerformanceMeasure` entry in the Performance Timeline. A
`PerformanceMeasure` is a subclass of `PerformanceEntry` whose
`performanceEntry.entryType` is always `'measure'`, and whose
`performanceEntry.duration` measures the number of milliseconds elapsed since
`startMark` and `endMark`.

The `startMark` argument may identify any _existing_ `PerformanceMark` in the
Performance Timeline, or _may_ identify any of the timestamp properties
provided by the `PerformanceNodeTiming` class. If the named `startMark` does
not exist, an error is thrown.

The optional `endMark` argument must identify any _existing_ `PerformanceMark`
in the Performance Timeline or any of the timestamp properties provided by the
`PerformanceNodeTiming` class. `endMark` will be `performance.now()`
if no parameter is passed, otherwise if the named `endMark` does not exist, an
error will be thrown.

The created `PerformanceMeasure` entry is put in the global Performance Timeline
and can be queried with `performance.getEntries`,
`performance.getEntriesByName`, and `performance.getEntriesByType`. When the
observation is performed, the entries should be cleared from the global
Performance Timeline manually with `performance.clearMeasures`.

#### <DataTag tag="M" /> `performance.nodeTiming`

<Metadata data={{"update":{"type":"added","version":["v8.5.0"]}}} />

* [`PerformanceNodeTiming`](/api/v20/perf_hooks#performancenodetiming)

_This property is an extension by Node.js. It is not available in Web browsers._

An instance of the `PerformanceNodeTiming` class that provides performance
metrics for specific Node.js operational milestones.

#### <DataTag tag="M" /> `performance.now()`

<Metadata data={{"changes":[{"version":"v19.0.0","pr-url":"https://github.com/nodejs/node/pull/44483","description":"This method must be called with the `performance` object as the receiver."}],"update":{"type":"added","version":["v8.5.0"]}}} />

* Returns: [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

Returns the current high resolution millisecond timestamp, where 0 represents
the start of the current `node` process.

#### <DataTag tag="M" /> `performance.setResourceTimingBufferSize(maxSize)`

<Metadata data={{"changes":[{"version":"v19.0.0","pr-url":"https://github.com/nodejs/node/pull/44483","description":"This method must be called with the `performance` object as the receiver."}],"update":{"type":"added","version":["v18.8.0"]}}} />

Sets the global performance resource timing buffer size to the specified number
of "resource" type performance entry objects.

By default the max buffer size is set to 250.

#### <DataTag tag="M" /> `performance.timeOrigin`

<Metadata data={{"update":{"type":"added","version":["v8.5.0"]}}} />

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

The [`timeOrigin`][] specifies the high resolution millisecond timestamp at
which the current `node` process began, measured in Unix time.

#### <DataTag tag="M" /> `performance.timerify(fn[, options])`

<Metadata data={{"changes":[{"version":"v16.0.0","pr-url":"https://github.com/nodejs/node/pull/37475","description":"Added the histogram option."},{"version":"v16.0.0","pr-url":"https://github.com/nodejs/node/pull/37136","description":"Re-implemented to use pure-JavaScript and the ability to time async functions."}],"update":{"type":"added","version":["v8.5.0"]}}} />

* `fn` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `histogram` [`RecordableHistogram`](/api/v20/perf_hooks#recordablehistogram-extends-histogram) A histogram object created using
    `perf_hooks.createHistogram()` that will record runtime durations in
    nanoseconds.

_This property is an extension by Node.js. It is not available in Web browsers._

Wraps a function within a new function that measures the running time of the
wrapped function. A `PerformanceObserver` must be subscribed to the `'function'`
event type in order for the timing details to be accessed.

```js
const {
  performance,
  PerformanceObserver,
} = require('node:perf_hooks');

function someFunction() {
  console.log('hello world');
}

const wrapped = performance.timerify(someFunction);

const obs = new PerformanceObserver((list) => {
  console.log(list.getEntries()[0].duration);

  performance.clearMarks();
  performance.clearMeasures();
  obs.disconnect();
});
obs.observe({ entryTypes: ['function'] });

// A performance timeline entry will be created
wrapped();
```

If the wrapped function returns a promise, a finally handler will be attached
to the promise and the duration will be reported once the finally handler is
invoked.

#### <DataTag tag="M" /> `performance.toJSON()`

<Metadata data={{"changes":[{"version":"v19.0.0","pr-url":"https://github.com/nodejs/node/pull/44483","description":"This method must be called with the `performance` object as the receiver."}],"update":{"type":"added","version":["v16.1.0"]}}} />

An object which is JSON representation of the `performance` object. It
is similar to [`window.performance.toJSON`][] in browsers.

##### <DataTag tag="E" /> `'resourcetimingbufferfull'`

<Metadata data={{"update":{"type":"added","version":["v18.8.0"]}}} />

The `'resourcetimingbufferfull'` event is fired when the global performance
resource timing buffer is full. Adjust resource timing buffer size with
`performance.setResourceTimingBufferSize()` or clear the buffer with
`performance.clearResourceTimings()` in the event listener to allow
more entries to be added to the performance timeline buffer.

### <DataTag tag="C" /> `PerformanceEntry`

<Metadata data={{"update":{"type":"added","version":["v8.5.0"]}}} />

The constructor of this class is not exposed to users directly.

#### <DataTag tag="M" /> `performanceEntry.duration`

<Metadata data={{"changes":[{"version":"v19.0.0","pr-url":"https://github.com/nodejs/node/pull/44483","description":"This property getter must be called with the `PerformanceEntry` object as the receiver."}],"update":{"type":"added","version":["v8.5.0"]}}} />

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

The total number of milliseconds elapsed for this entry. This value will not
be meaningful for all Performance Entry types.

#### <DataTag tag="M" /> `performanceEntry.entryType`

<Metadata data={{"changes":[{"version":"v19.0.0","pr-url":"https://github.com/nodejs/node/pull/44483","description":"This property getter must be called with the `PerformanceEntry` object as the receiver."}],"update":{"type":"added","version":["v8.5.0"]}}} />

* [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

The type of the performance entry. It may be one of:

* `'node'` (Node.js only)
* `'mark'` (available on the Web)
* `'measure'` (available on the Web)
* `'gc'` (Node.js only)
* `'function'` (Node.js only)
* `'http2'` (Node.js only)
* `'http'` (Node.js only)

#### <DataTag tag="M" /> `performanceEntry.name`

<Metadata data={{"changes":[{"version":"v19.0.0","pr-url":"https://github.com/nodejs/node/pull/44483","description":"This property getter must be called with the `PerformanceEntry` object as the receiver."}],"update":{"type":"added","version":["v8.5.0"]}}} />

* [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

The name of the performance entry.

#### <DataTag tag="M" /> `performanceEntry.startTime`

<Metadata data={{"changes":[{"version":"v19.0.0","pr-url":"https://github.com/nodejs/node/pull/44483","description":"This property getter must be called with the `PerformanceEntry` object as the receiver."}],"update":{"type":"added","version":["v8.5.0"]}}} />

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

The high resolution millisecond timestamp marking the starting time of the
Performance Entry.

### <DataTag tag="C" /> `PerformanceMark`

<Metadata data={{"update":{"type":"added","version":["v18.2.0","v16.17.0"]}}} />

* Extends: [`PerformanceEntry`](/api/v20/perf_hooks#performanceentry)

Exposes marks created via the `Performance.mark()` method.

#### <DataTag tag="M" /> `performanceMark.detail`

<Metadata data={{"changes":[{"version":"v19.0.0","pr-url":"https://github.com/nodejs/node/pull/44483","description":"This property getter must be called with the `PerformanceMark` object as the receiver."}],"update":{"type":"added","version":["v16.0.0"]}}} />

* [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types)

Additional detail specified when creating with `Performance.mark()` method.

### <DataTag tag="C" /> `PerformanceMeasure`

<Metadata data={{"update":{"type":"added","version":["v18.2.0","v16.17.0"]}}} />

* Extends: [`PerformanceEntry`](/api/v20/perf_hooks#performanceentry)

Exposes measures created via the `Performance.measure()` method.

The constructor of this class is not exposed to users directly.

#### <DataTag tag="M" /> `performanceMeasure.detail`

<Metadata data={{"changes":[{"version":"v19.0.0","pr-url":"https://github.com/nodejs/node/pull/44483","description":"This property getter must be called with the `PerformanceMeasure` object as the receiver."}],"update":{"type":"added","version":["v16.0.0"]}}} />

* [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types)

Additional detail specified when creating with `Performance.measure()` method.

### <DataTag tag="C" /> `PerformanceNodeEntry`

<Metadata data={{"update":{"type":"added","version":["v19.0.0"]}}} />

* Extends: [`PerformanceEntry`](/api/v20/perf_hooks#performanceentry)

_This class is an extension by Node.js. It is not available in Web browsers._

Provides detailed Node.js timing data.

The constructor of this class is not exposed to users directly.

#### <DataTag tag="M" /> `performanceNodeEntry.detail`

<Metadata data={{"changes":[{"version":"v19.0.0","pr-url":"https://github.com/nodejs/node/pull/44483","description":"This property getter must be called with the `PerformanceNodeEntry` object as the receiver."}],"update":{"type":"added","version":["v16.0.0"]}}} />

* [`any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types)

Additional detail specific to the `entryType`.

#### <DataTag tag="M" /> `performanceNodeEntry.flags`

<Metadata data={{"changes":[{"version":"v16.0.0","pr-url":"https://github.com/nodejs/node/pull/37136","description":"Runtime deprecated. Now moved to the detail property when entryType is 'gc'."}],"update":{"type":"added","version":["v13.9.0","v12.17.0"]}}} />

<Stability stability={0}>

Deprecated: Use `performanceNodeEntry.detail` instead.

</Stability>

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

When `performanceEntry.entryType` is equal to `'gc'`, the `performance.flags`
property contains additional information about garbage collection operation.
The value may be one of:

* `perf_hooks.constants.NODE_PERFORMANCE_GC_FLAGS_NO`
* `perf_hooks.constants.NODE_PERFORMANCE_GC_FLAGS_CONSTRUCT_RETAINED`
* `perf_hooks.constants.NODE_PERFORMANCE_GC_FLAGS_FORCED`
* `perf_hooks.constants.NODE_PERFORMANCE_GC_FLAGS_SYNCHRONOUS_PHANTOM_PROCESSING`
* `perf_hooks.constants.NODE_PERFORMANCE_GC_FLAGS_ALL_AVAILABLE_GARBAGE`
* `perf_hooks.constants.NODE_PERFORMANCE_GC_FLAGS_ALL_EXTERNAL_MEMORY`
* `perf_hooks.constants.NODE_PERFORMANCE_GC_FLAGS_SCHEDULE_IDLE`

#### <DataTag tag="M" /> `performanceNodeEntry.kind`

<Metadata data={{"changes":[{"version":"v16.0.0","pr-url":"https://github.com/nodejs/node/pull/37136","description":"Runtime deprecated. Now moved to the detail property when entryType is 'gc'."}],"update":{"type":"added","version":["v8.5.0"]}}} />

<Stability stability={0}>

Deprecated: Use `performanceNodeEntry.detail` instead.

</Stability>

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

When `performanceEntry.entryType` is equal to `'gc'`, the `performance.kind`
property identifies the type of garbage collection operation that occurred.
The value may be one of:

* `perf_hooks.constants.NODE_PERFORMANCE_GC_MAJOR`
* `perf_hooks.constants.NODE_PERFORMANCE_GC_MINOR`
* `perf_hooks.constants.NODE_PERFORMANCE_GC_INCREMENTAL`
* `perf_hooks.constants.NODE_PERFORMANCE_GC_WEAKCB`

#### Garbage Collection ('gc') Details

When `performanceEntry.type` is equal to `'gc'`, the
`performanceNodeEntry.detail` property will be an [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) with two properties:

* `kind` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) One of:
  * `perf_hooks.constants.NODE_PERFORMANCE_GC_MAJOR`
  * `perf_hooks.constants.NODE_PERFORMANCE_GC_MINOR`
  * `perf_hooks.constants.NODE_PERFORMANCE_GC_INCREMENTAL`
  * `perf_hooks.constants.NODE_PERFORMANCE_GC_WEAKCB`
* `flags` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) One of:
  * `perf_hooks.constants.NODE_PERFORMANCE_GC_FLAGS_NO`
  * `perf_hooks.constants.NODE_PERFORMANCE_GC_FLAGS_CONSTRUCT_RETAINED`
  * `perf_hooks.constants.NODE_PERFORMANCE_GC_FLAGS_FORCED`
  * `perf_hooks.constants.NODE_PERFORMANCE_GC_FLAGS_SYNCHRONOUS_PHANTOM_PROCESSING`
  * `perf_hooks.constants.NODE_PERFORMANCE_GC_FLAGS_ALL_AVAILABLE_GARBAGE`
  * `perf_hooks.constants.NODE_PERFORMANCE_GC_FLAGS_ALL_EXTERNAL_MEMORY`
  * `perf_hooks.constants.NODE_PERFORMANCE_GC_FLAGS_SCHEDULE_IDLE`

#### HTTP ('http') Details

When `performanceEntry.type` is equal to `'http'`, the
`performanceNodeEntry.detail` property will be an [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) containing
additional information.

If `performanceEntry.name` is equal to `HttpClient`, the `detail`
will contain the following properties: `req`, `res`. And the `req` property
will be an [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) containing `method`, `url`, `headers`, the `res` property
will be an [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) containing `statusCode`, `statusMessage`, `headers`.

If `performanceEntry.name` is equal to `HttpRequest`, the `detail`
will contain the following properties: `req`, `res`. And the `req` property
will be an [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) containing `method`, `url`, `headers`, the `res` property
will be an [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) containing `statusCode`, `statusMessage`, `headers`.

This could add additional memory overhead and should only be used for
diagnostic purposes, not left turned on in production by default.

#### HTTP/2 ('http2') Details

When `performanceEntry.type` is equal to `'http2'`, the
`performanceNodeEntry.detail` property will be an [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) containing
additional performance information.

If `performanceEntry.name` is equal to `Http2Stream`, the `detail`
will contain the following properties:

* `bytesRead` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The number of `DATA` frame bytes received for this
  `Http2Stream`.
* `bytesWritten` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The number of `DATA` frame bytes sent for this
  `Http2Stream`.
* `id` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The identifier of the associated `Http2Stream`
* `timeToFirstByte` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The number of milliseconds elapsed between the
  `PerformanceEntry` `startTime` and the reception of the first `DATA` frame.
* `timeToFirstByteSent` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The number of milliseconds elapsed between
  the `PerformanceEntry` `startTime` and sending of the first `DATA` frame.
* `timeToFirstHeader` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The number of milliseconds elapsed between the
  `PerformanceEntry` `startTime` and the reception of the first header.

If `performanceEntry.name` is equal to `Http2Session`, the `detail` will
contain the following properties:

* `bytesRead` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The number of bytes received for this `Http2Session`.
* `bytesWritten` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The number of bytes sent for this `Http2Session`.
* `framesReceived` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The number of HTTP/2 frames received by the
  `Http2Session`.
* `framesSent` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The number of HTTP/2 frames sent by the `Http2Session`.
* `maxConcurrentStreams` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The maximum number of streams concurrently
  open during the lifetime of the `Http2Session`.
* `pingRTT` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The number of milliseconds elapsed since the transmission
  of a `PING` frame and the reception of its acknowledgment. Only present if
  a `PING` frame has been sent on the `Http2Session`.
* `streamAverageDuration` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The average duration (in milliseconds) for
  all `Http2Stream` instances.
* `streamCount` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The number of `Http2Stream` instances processed by
  the `Http2Session`.
* `type` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Either `'server'` or `'client'` to identify the type of
  `Http2Session`.

#### Timerify ('function') Details

When `performanceEntry.type` is equal to `'function'`, the
`performanceNodeEntry.detail` property will be an [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) listing
the input arguments to the timed function.

#### Net ('net') Details

When `performanceEntry.type` is equal to `'net'`, the
`performanceNodeEntry.detail` property will be an [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) containing
additional information.

If `performanceEntry.name` is equal to `connect`, the `detail`
will contain the following properties: `host`, `port`.

#### DNS ('dns') Details

When `performanceEntry.type` is equal to `'dns'`, the
`performanceNodeEntry.detail` property will be an [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) containing
additional information.

If `performanceEntry.name` is equal to `lookup`, the `detail`
will contain the following properties: `hostname`, `family`, `hints`, `verbatim`,
`addresses`.

If `performanceEntry.name` is equal to `lookupService`, the `detail` will
contain the following properties: `host`, `port`, `hostname`, `service`.

If `performanceEntry.name` is equal to `queryxxx` or `getHostByAddr`, the `detail` will
contain the following properties: `host`, `ttl`, `result`. The value of `result` is
same as the result of `queryxxx` or `getHostByAddr`.

### <DataTag tag="C" /> `PerformanceNodeTiming`

<Metadata data={{"update":{"type":"added","version":["v8.5.0"]}}} />

* Extends: [`PerformanceEntry`](/api/v20/perf_hooks#performanceentry)

_This property is an extension by Node.js. It is not available in Web browsers._

Provides timing details for Node.js itself. The constructor of this class
is not exposed to users.

#### <DataTag tag="M" /> `performanceNodeTiming.bootstrapComplete`

<Metadata data={{"update":{"type":"added","version":["v8.5.0"]}}} />

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

The high resolution millisecond timestamp at which the Node.js process
completed bootstrapping. If bootstrapping has not yet finished, the property
has the value of -1.

#### <DataTag tag="M" /> `performanceNodeTiming.environment`

<Metadata data={{"update":{"type":"added","version":["v8.5.0"]}}} />

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

The high resolution millisecond timestamp at which the Node.js environment was
initialized.

#### <DataTag tag="M" /> `performanceNodeTiming.idleTime`

<Metadata data={{"update":{"type":"added","version":["v14.10.0","v12.19.0"]}}} />

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

The high resolution millisecond timestamp of the amount of time the event loop
has been idle within the event loop's event provider (e.g. `epoll_wait`). This
does not take CPU usage into consideration. If the event loop has not yet
started (e.g., in the first tick of the main script), the property has the
value of 0.

#### <DataTag tag="M" /> `performanceNodeTiming.loopExit`

<Metadata data={{"update":{"type":"added","version":["v8.5.0"]}}} />

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

The high resolution millisecond timestamp at which the Node.js event loop
exited. If the event loop has not yet exited, the property has the value of -1.
It can only have a value of not -1 in a handler of the [`'exit'`][] event.

#### <DataTag tag="M" /> `performanceNodeTiming.loopStart`

<Metadata data={{"update":{"type":"added","version":["v8.5.0"]}}} />

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

The high resolution millisecond timestamp at which the Node.js event loop
started. If the event loop has not yet started (e.g., in the first tick of the
main script), the property has the value of -1.

#### <DataTag tag="M" /> `performanceNodeTiming.nodeStart`

<Metadata data={{"update":{"type":"added","version":["v8.5.0"]}}} />

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

The high resolution millisecond timestamp at which the Node.js process was
initialized.

#### <DataTag tag="M" /> `performanceNodeTiming.v8Start`

<Metadata data={{"update":{"type":"added","version":["v8.5.0"]}}} />

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

The high resolution millisecond timestamp at which the V8 platform was
initialized.

### <DataTag tag="C" /> `PerformanceResourceTiming`

<Metadata data={{"update":{"type":"added","version":["v18.2.0","v16.17.0"]}}} />

* Extends: [`PerformanceEntry`](/api/v20/perf_hooks#performanceentry)

Provides detailed network timing data regarding the loading of an application's
resources.

The constructor of this class is not exposed to users directly.

#### <DataTag tag="M" /> `performanceResourceTiming.workerStart`

<Metadata data={{"changes":[{"version":"v19.0.0","pr-url":"https://github.com/nodejs/node/pull/44483","description":"This property getter must be called with the `PerformanceResourceTiming` object as the receiver."}],"update":{"type":"added","version":["v18.2.0","v16.17.0"]}}} />

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

The high resolution millisecond timestamp at immediately before dispatching
the `fetch` request. If the resource is not intercepted by a worker the property
will always return 0.

#### <DataTag tag="M" /> `performanceResourceTiming.redirectStart`

<Metadata data={{"changes":[{"version":"v19.0.0","pr-url":"https://github.com/nodejs/node/pull/44483","description":"This property getter must be called with the `PerformanceResourceTiming` object as the receiver."}],"update":{"type":"added","version":["v18.2.0","v16.17.0"]}}} />

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

The high resolution millisecond timestamp that represents the start time
of the fetch which initiates the redirect.

#### <DataTag tag="M" /> `performanceResourceTiming.redirectEnd`

<Metadata data={{"changes":[{"version":"v19.0.0","pr-url":"https://github.com/nodejs/node/pull/44483","description":"This property getter must be called with the `PerformanceResourceTiming` object as the receiver."}],"update":{"type":"added","version":["v18.2.0","v16.17.0"]}}} />

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

The high resolution millisecond timestamp that will be created immediately after
receiving the last byte of the response of the last redirect.

#### <DataTag tag="M" /> `performanceResourceTiming.fetchStart`

<Metadata data={{"changes":[{"version":"v19.0.0","pr-url":"https://github.com/nodejs/node/pull/44483","description":"This property getter must be called with the `PerformanceResourceTiming` object as the receiver."}],"update":{"type":"added","version":["v18.2.0","v16.17.0"]}}} />

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

The high resolution millisecond timestamp immediately before the Node.js starts
to fetch the resource.

#### <DataTag tag="M" /> `performanceResourceTiming.domainLookupStart`

<Metadata data={{"changes":[{"version":"v19.0.0","pr-url":"https://github.com/nodejs/node/pull/44483","description":"This property getter must be called with the `PerformanceResourceTiming` object as the receiver."}],"update":{"type":"added","version":["v18.2.0","v16.17.0"]}}} />

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

The high resolution millisecond timestamp immediately before the Node.js starts
the domain name lookup for the resource.

#### <DataTag tag="M" /> `performanceResourceTiming.domainLookupEnd`

<Metadata data={{"changes":[{"version":"v19.0.0","pr-url":"https://github.com/nodejs/node/pull/44483","description":"This property getter must be called with the `PerformanceResourceTiming` object as the receiver."}],"update":{"type":"added","version":["v18.2.0","v16.17.0"]}}} />

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

The high resolution millisecond timestamp representing the time immediately
after the Node.js finished the domain name lookup for the resource.

#### <DataTag tag="M" /> `performanceResourceTiming.connectStart`

<Metadata data={{"changes":[{"version":"v19.0.0","pr-url":"https://github.com/nodejs/node/pull/44483","description":"This property getter must be called with the `PerformanceResourceTiming` object as the receiver."}],"update":{"type":"added","version":["v18.2.0","v16.17.0"]}}} />

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

The high resolution millisecond timestamp representing the time immediately
before Node.js starts to establish the connection to the server to retrieve
the resource.

#### <DataTag tag="M" /> `performanceResourceTiming.connectEnd`

<Metadata data={{"changes":[{"version":"v19.0.0","pr-url":"https://github.com/nodejs/node/pull/44483","description":"This property getter must be called with the `PerformanceResourceTiming` object as the receiver."}],"update":{"type":"added","version":["v18.2.0","v16.17.0"]}}} />

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

The high resolution millisecond timestamp representing the time immediately
after Node.js finishes establishing the connection to the server to retrieve
the resource.

#### <DataTag tag="M" /> `performanceResourceTiming.secureConnectionStart`

<Metadata data={{"changes":[{"version":"v19.0.0","pr-url":"https://github.com/nodejs/node/pull/44483","description":"This property getter must be called with the `PerformanceResourceTiming` object as the receiver."}],"update":{"type":"added","version":["v18.2.0","v16.17.0"]}}} />

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

The high resolution millisecond timestamp representing the time immediately
before Node.js starts the handshake process to secure the current connection.

#### <DataTag tag="M" /> `performanceResourceTiming.requestStart`

<Metadata data={{"changes":[{"version":"v19.0.0","pr-url":"https://github.com/nodejs/node/pull/44483","description":"This property getter must be called with the `PerformanceResourceTiming` object as the receiver."}],"update":{"type":"added","version":["v18.2.0","v16.17.0"]}}} />

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

The high resolution millisecond timestamp representing the time immediately
before Node.js receives the first byte of the response from the server.

#### <DataTag tag="M" /> `performanceResourceTiming.responseEnd`

<Metadata data={{"changes":[{"version":"v19.0.0","pr-url":"https://github.com/nodejs/node/pull/44483","description":"This property getter must be called with the `PerformanceResourceTiming` object as the receiver."}],"update":{"type":"added","version":["v18.2.0","v16.17.0"]}}} />

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

The high resolution millisecond timestamp representing the time immediately
after Node.js receives the last byte of the resource or immediately before
the transport connection is closed, whichever comes first.

#### <DataTag tag="M" /> `performanceResourceTiming.transferSize`

<Metadata data={{"changes":[{"version":"v19.0.0","pr-url":"https://github.com/nodejs/node/pull/44483","description":"This property getter must be called with the `PerformanceResourceTiming` object as the receiver."}],"update":{"type":"added","version":["v18.2.0","v16.17.0"]}}} />

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

A number representing the size (in octets) of the fetched resource. The size
includes the response header fields plus the response payload body.

#### <DataTag tag="M" /> `performanceResourceTiming.encodedBodySize`

<Metadata data={{"changes":[{"version":"v19.0.0","pr-url":"https://github.com/nodejs/node/pull/44483","description":"This property getter must be called with the `PerformanceResourceTiming` object as the receiver."}],"update":{"type":"added","version":["v18.2.0","v16.17.0"]}}} />

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

A number representing the size (in octets) received from the fetch
(HTTP or cache), of the payload body, before removing any applied
content-codings.

#### <DataTag tag="M" /> `performanceResourceTiming.decodedBodySize`

<Metadata data={{"changes":[{"version":"v19.0.0","pr-url":"https://github.com/nodejs/node/pull/44483","description":"This property getter must be called with the `PerformanceResourceTiming` object as the receiver."}],"update":{"type":"added","version":["v18.2.0","v16.17.0"]}}} />

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

A number representing the size (in octets) received from the fetch
(HTTP or cache), of the message body, after removing any applied
content-codings.

#### <DataTag tag="M" /> `performanceResourceTiming.toJSON()`

<Metadata data={{"changes":[{"version":"v19.0.0","pr-url":"https://github.com/nodejs/node/pull/44483","description":"This method must be called with the `PerformanceResourceTiming` object as the receiver."}],"update":{"type":"added","version":["v18.2.0","v16.17.0"]}}} />

Returns a `object` that is the JSON representation of the
`PerformanceResourceTiming` object

### <DataTag tag="C" /> `PerformanceObserver`

<Metadata data={{"update":{"type":"added","version":["v8.5.0"]}}} />

#### <DataTag tag="M" /> `PerformanceObserver.supportedEntryTypes`

<Metadata data={{"update":{"type":"added","version":["v16.0.0"]}}} />

* string\[]

Get supported types.

#### <DataTag tag="M" /> `new PerformanceObserver(callback)`

<Metadata data={{"changes":[{"version":"v18.0.0","pr-url":"https://github.com/nodejs/node/pull/41678","description":"Passing an invalid callback to the `callback` argument now throws `ERR_INVALID_ARG_TYPE` instead of `ERR_INVALID_CALLBACK`."}],"update":{"type":"added","version":["v8.5.0"]}}} />

* `callback` [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  * `list` [`PerformanceObserverEntryList`](/api/v20/perf_hooks#performanceobserverentrylist)
  * `observer` [`PerformanceObserver`](/api/v20/perf_hooks#perf_hooksperformanceobserver)

`PerformanceObserver` objects provide notifications when new
`PerformanceEntry` instances have been added to the Performance Timeline.

```js
const {
  performance,
  PerformanceObserver,
} = require('node:perf_hooks');

const obs = new PerformanceObserver((list, observer) => {
  console.log(list.getEntries());

  performance.clearMarks();
  performance.clearMeasures();
  observer.disconnect();
});
obs.observe({ entryTypes: ['mark'], buffered: true });

performance.mark('test');
```

Because `PerformanceObserver` instances introduce their own additional
performance overhead, instances should not be left subscribed to notifications
indefinitely. Users should disconnect observers as soon as they are no
longer needed.

The `callback` is invoked when a `PerformanceObserver` is
notified about new `PerformanceEntry` instances. The callback receives a
`PerformanceObserverEntryList` instance and a reference to the
`PerformanceObserver`.

#### <DataTag tag="M" /> `performanceObserver.disconnect()`

<Metadata data={{"update":{"type":"added","version":["v8.5.0"]}}} />

Disconnects the `PerformanceObserver` instance from all notifications.

#### <DataTag tag="M" /> `performanceObserver.observe(options)`

<Metadata data={{"changes":[{"version":"v16.7.0","pr-url":"https://github.com/nodejs/node/pull/39297","description":"Updated to conform to Performance Timeline Level 2. The buffered option has been added back."},{"version":"v16.0.0","pr-url":"https://github.com/nodejs/node/pull/37136","description":"Updated to conform to User Timing Level 3. The buffered option has been removed."}],"update":{"type":"added","version":["v8.5.0"]}}} />

* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `type` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) A single [`PerformanceEntry`](/api/v20/perf_hooks#performanceentry) type. Must not be given
    if `entryTypes` is already specified.
  * `entryTypes` string\[] An array of strings identifying the types of
    [`PerformanceEntry`](/api/v20/perf_hooks#performanceentry) instances the observer is interested in. If not
    provided an error will be thrown.
  * `buffered` [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) If true, the observer callback is called with a
    list global `PerformanceEntry` buffered entries. If false, only
    `PerformanceEntry`s created after the time point are sent to the
    observer callback. **Default:** `false`.

Subscribes the [`PerformanceObserver`](/api/v20/perf_hooks#perf_hooksperformanceobserver) instance to notifications of new
[`PerformanceEntry`](/api/v20/perf_hooks#performanceentry) instances identified either by `options.entryTypes`
or `options.type`:

```js
const {
  performance,
  PerformanceObserver,
} = require('node:perf_hooks');

const obs = new PerformanceObserver((list, observer) => {
  // Called once asynchronously. `list` contains three items.
});
obs.observe({ type: 'mark' });

for (let n = 0; n < 3; n++)
  performance.mark(`test${n}`);
```

### <DataTag tag="C" /> `PerformanceObserverEntryList`

<Metadata data={{"update":{"type":"added","version":["v8.5.0"]}}} />

The `PerformanceObserverEntryList` class is used to provide access to the
`PerformanceEntry` instances passed to a `PerformanceObserver`.
The constructor of this class is not exposed to users.

#### <DataTag tag="M" /> `performanceObserverEntryList.getEntries()`

<Metadata data={{"update":{"type":"added","version":["v8.5.0"]}}} />

* Returns: PerformanceEntry\[]

Returns a list of `PerformanceEntry` objects in chronological order
with respect to `performanceEntry.startTime`.

```js
const {
  performance,
  PerformanceObserver,
} = require('node:perf_hooks');

const obs = new PerformanceObserver((perfObserverList, observer) => {
  console.log(perfObserverList.getEntries());
  /**
   * [
   *   PerformanceEntry {
   *     name: 'test',
   *     entryType: 'mark',
   *     startTime: 81.465639,
   *     duration: 0
   *   },
   *   PerformanceEntry {
   *     name: 'meow',
   *     entryType: 'mark',
   *     startTime: 81.860064,
   *     duration: 0
   *   }
   * ]
   */

  performance.clearMarks();
  performance.clearMeasures();
  observer.disconnect();
});
obs.observe({ type: 'mark' });

performance.mark('test');
performance.mark('meow');
```

#### <DataTag tag="M" /> `performanceObserverEntryList.getEntriesByName(name[, type])`

<Metadata data={{"update":{"type":"added","version":["v8.5.0"]}}} />

* `name` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
* `type` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
* Returns: PerformanceEntry\[]

Returns a list of `PerformanceEntry` objects in chronological order
with respect to `performanceEntry.startTime` whose `performanceEntry.name` is
equal to `name`, and optionally, whose `performanceEntry.entryType` is equal to
`type`.

```js
const {
  performance,
  PerformanceObserver,
} = require('node:perf_hooks');

const obs = new PerformanceObserver((perfObserverList, observer) => {
  console.log(perfObserverList.getEntriesByName('meow'));
  /**
   * [
   *   PerformanceEntry {
   *     name: 'meow',
   *     entryType: 'mark',
   *     startTime: 98.545991,
   *     duration: 0
   *   }
   * ]
   */
  console.log(perfObserverList.getEntriesByName('nope')); // []

  console.log(perfObserverList.getEntriesByName('test', 'mark'));
  /**
   * [
   *   PerformanceEntry {
   *     name: 'test',
   *     entryType: 'mark',
   *     startTime: 63.518931,
   *     duration: 0
   *   }
   * ]
   */
  console.log(perfObserverList.getEntriesByName('test', 'measure')); // []

  performance.clearMarks();
  performance.clearMeasures();
  observer.disconnect();
});
obs.observe({ entryTypes: ['mark', 'measure'] });

performance.mark('test');
performance.mark('meow');
```

#### <DataTag tag="M" /> `performanceObserverEntryList.getEntriesByType(type)`

<Metadata data={{"update":{"type":"added","version":["v8.5.0"]}}} />

* `type` [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
* Returns: PerformanceEntry\[]

Returns a list of `PerformanceEntry` objects in chronological order
with respect to `performanceEntry.startTime` whose `performanceEntry.entryType`
is equal to `type`.

```js
const {
  performance,
  PerformanceObserver,
} = require('node:perf_hooks');

const obs = new PerformanceObserver((perfObserverList, observer) => {
  console.log(perfObserverList.getEntriesByType('mark'));
  /**
   * [
   *   PerformanceEntry {
   *     name: 'test',
   *     entryType: 'mark',
   *     startTime: 55.897834,
   *     duration: 0
   *   },
   *   PerformanceEntry {
   *     name: 'meow',
   *     entryType: 'mark',
   *     startTime: 56.350146,
   *     duration: 0
   *   }
   * ]
   */
  performance.clearMarks();
  performance.clearMeasures();
  observer.disconnect();
});
obs.observe({ type: 'mark' });

performance.mark('test');
performance.mark('meow');
```

### <DataTag tag="M" /> `perf_hooks.createHistogram([options])`

<Metadata data={{"update":{"type":"added","version":["v15.9.0","v14.18.0"]}}} />

* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `lowest` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [`bigint`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) The lowest discernible value. Must be an integer
    value greater than 0. **Default:** `1`.
  * `highest` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [`bigint`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) The highest recordable value. Must be an integer
    value that is equal to or greater than two times `lowest`.
    **Default:** `Number.MAX_SAFE_INTEGER`.
  * `figures` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The number of accuracy digits. Must be a number between
    `1` and `5`. **Default:** `3`.
* Returns [`RecordableHistogram`](/api/v20/perf_hooks#recordablehistogram-extends-histogram)

Returns a [`RecordableHistogram`](/api/v20/perf_hooks#recordablehistogram-extends-histogram).

### <DataTag tag="M" /> `perf_hooks.monitorEventLoopDelay([options])`

<Metadata data={{"update":{"type":"added","version":["v11.10.0"]}}} />

* `options` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `resolution` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The sampling rate in milliseconds. Must be greater
    than zero. **Default:** `10`.
* Returns: [`IntervalHistogram`](/api/v20/perf_hooks#intervalhistogram-extends-histogram)

_This property is an extension by Node.js. It is not available in Web browsers._

Creates an `IntervalHistogram` object that samples and reports the event loop
delay over time. The delays will be reported in nanoseconds.

Using a timer to detect approximate event loop delay works because the
execution of timers is tied specifically to the lifecycle of the libuv
event loop. That is, a delay in the loop will cause a delay in the execution
of the timer, and those delays are specifically what this API is intended to
detect.

```js
const { monitorEventLoopDelay } = require('node:perf_hooks');
const h = monitorEventLoopDelay({ resolution: 20 });
h.enable();
// Do something.
h.disable();
console.log(h.min);
console.log(h.max);
console.log(h.mean);
console.log(h.stddev);
console.log(h.percentiles);
console.log(h.percentile(50));
console.log(h.percentile(99));
```

### <DataTag tag="C" /> `Histogram`

<Metadata data={{"update":{"type":"added","version":["v11.10.0"]}}} />

#### <DataTag tag="M" /> `histogram.count`

<Metadata data={{"update":{"type":"added","version":["v17.4.0","v16.14.0"]}}} />

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

The number of samples recorded by the histogram.

#### <DataTag tag="M" /> `histogram.countBigInt`

<Metadata data={{"update":{"type":"added","version":["v17.4.0","v16.14.0"]}}} />

* [`bigint`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

The number of samples recorded by the histogram.

#### <DataTag tag="M" /> `histogram.exceeds`

<Metadata data={{"update":{"type":"added","version":["v11.10.0"]}}} />

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

The number of times the event loop delay exceeded the maximum 1 hour event
loop delay threshold.

#### <DataTag tag="M" /> `histogram.exceedsBigInt`

<Metadata data={{"update":{"type":"added","version":["v17.4.0","v16.14.0"]}}} />

* [`bigint`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

The number of times the event loop delay exceeded the maximum 1 hour event
loop delay threshold.

#### <DataTag tag="M" /> `histogram.max`

<Metadata data={{"update":{"type":"added","version":["v11.10.0"]}}} />

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

The maximum recorded event loop delay.

#### <DataTag tag="M" /> `histogram.maxBigInt`

<Metadata data={{"update":{"type":"added","version":["v17.4.0","v16.14.0"]}}} />

* [`bigint`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

The maximum recorded event loop delay.

#### <DataTag tag="M" /> `histogram.mean`

<Metadata data={{"update":{"type":"added","version":["v11.10.0"]}}} />

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

The mean of the recorded event loop delays.

#### <DataTag tag="M" /> `histogram.min`

<Metadata data={{"update":{"type":"added","version":["v11.10.0"]}}} />

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

The minimum recorded event loop delay.

#### <DataTag tag="M" /> `histogram.minBigInt`

<Metadata data={{"update":{"type":"added","version":["v17.4.0","v16.14.0"]}}} />

* [`bigint`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

The minimum recorded event loop delay.

#### <DataTag tag="M" /> `histogram.percentile(percentile)`

<Metadata data={{"update":{"type":"added","version":["v11.10.0"]}}} />

* `percentile` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) A percentile value in the range (0, 100].
* Returns: [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

Returns the value at the given percentile.

#### <DataTag tag="M" /> `histogram.percentileBigInt(percentile)`

<Metadata data={{"update":{"type":"added","version":["v17.4.0","v16.14.0"]}}} />

* `percentile` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) A percentile value in the range (0, 100].
* Returns: [`bigint`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

Returns the value at the given percentile.

#### <DataTag tag="M" /> `histogram.percentiles`

<Metadata data={{"update":{"type":"added","version":["v11.10.0"]}}} />

* [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)

Returns a `Map` object detailing the accumulated percentile distribution.

#### <DataTag tag="M" /> `histogram.percentilesBigInt`

<Metadata data={{"update":{"type":"added","version":["v17.4.0","v16.14.0"]}}} />

* [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)

Returns a `Map` object detailing the accumulated percentile distribution.

#### <DataTag tag="M" /> `histogram.reset()`

<Metadata data={{"update":{"type":"added","version":["v11.10.0"]}}} />

Resets the collected histogram data.

#### <DataTag tag="M" /> `histogram.stddev`

<Metadata data={{"update":{"type":"added","version":["v11.10.0"]}}} />

* [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

The standard deviation of the recorded event loop delays.

### <DataTag tag="C" /> `IntervalHistogram extends Histogram`

A `Histogram` that is periodically updated on a given interval.

#### <DataTag tag="M" /> `histogram.disable()`

<Metadata data={{"update":{"type":"added","version":["v11.10.0"]}}} />

* Returns: [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Disables the update interval timer. Returns `true` if the timer was
stopped, `false` if it was already stopped.

#### <DataTag tag="M" /> `histogram.enable()`

<Metadata data={{"update":{"type":"added","version":["v11.10.0"]}}} />

* Returns: [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Enables the update interval timer. Returns `true` if the timer was
started, `false` if it was already started.

#### Cloning an `IntervalHistogram`

[`IntervalHistogram`](/api/v20/perf_hooks#intervalhistogram-extends-histogram) instances can be cloned via [`MessagePort`](/api/v20/worker_threads#messageport). On the receiving
end, the histogram is cloned as a plain [`Histogram`](/api/v20/perf_hooks#histogram) object that does not
implement the `enable()` and `disable()` methods.

### <DataTag tag="C" /> `RecordableHistogram extends Histogram`

<Metadata data={{"update":{"type":"added","version":["v15.9.0","v14.18.0"]}}} />

#### <DataTag tag="M" /> `histogram.add(other)`

<Metadata data={{"update":{"type":"added","version":["v17.4.0","v16.14.0"]}}} />

* `other` [`RecordableHistogram`](/api/v20/perf_hooks#recordablehistogram-extends-histogram)

Adds the values from `other` to this histogram.

#### <DataTag tag="M" /> `histogram.record(val)`

<Metadata data={{"update":{"type":"added","version":["v15.9.0","v14.18.0"]}}} />

* `val` [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [`bigint`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) The amount to record in the histogram.

#### <DataTag tag="M" /> `histogram.recordDelta()`

<Metadata data={{"update":{"type":"added","version":["v15.9.0","v14.18.0"]}}} />

Calculates the amount of time (in nanoseconds) that has passed since the
previous call to `recordDelta()` and records that amount in the histogram.

### Examples

#### Measuring the duration of async operations

The following example uses the [Async Hooks][] and Performance APIs to measure
the actual duration of a Timeout operation (including the amount of time it took
to execute the callback).

```js
'use strict';
const async_hooks = require('node:async_hooks');
const {
  performance,
  PerformanceObserver,
} = require('node:perf_hooks');

const set = new Set();
const hook = async_hooks.createHook({
  init(id, type) {
    if (type === 'Timeout') {
      performance.mark(`Timeout-${id}-Init`);
      set.add(id);
    }
  },
  destroy(id) {
    if (set.has(id)) {
      set.delete(id);
      performance.mark(`Timeout-${id}-Destroy`);
      performance.measure(`Timeout-${id}`,
                          `Timeout-${id}-Init`,
                          `Timeout-${id}-Destroy`);
    }
  },
});
hook.enable();

const obs = new PerformanceObserver((list, observer) => {
  console.log(list.getEntries()[0]);
  performance.clearMarks();
  performance.clearMeasures();
  observer.disconnect();
});
obs.observe({ entryTypes: ['measure'], buffered: true });

setTimeout(() => {}, 1000);
```

#### Measuring how long it takes to load dependencies

The following example measures the duration of `require()` operations to load
dependencies:

```js
'use strict';
const {
  performance,
  PerformanceObserver,
} = require('node:perf_hooks');
const mod = require('node:module');

// Monkey patch the require function
mod.Module.prototype.require =
  performance.timerify(mod.Module.prototype.require);
require = performance.timerify(require);

// Activate the observer
const obs = new PerformanceObserver((list) => {
  const entries = list.getEntries();
  entries.forEach((entry) => {
    console.log(`require('${entry[0]}')`, entry.duration);
  });
  performance.clearMarks();
  performance.clearMeasures();
  obs.disconnect();
});
obs.observe({ entryTypes: ['function'], buffered: true });

require('some-module');
```

#### Measuring how long one HTTP round-trip takes

The following example is used to trace the time spent by HTTP client
(`OutgoingMessage`) and HTTP request (`IncomingMessage`). For HTTP client,
it means the time interval between starting the request and receiving the
response, and for HTTP request, it means the time interval between receiving
the request and sending the response:

```js
'use strict';
const { PerformanceObserver } = require('node:perf_hooks');
const http = require('node:http');

const obs = new PerformanceObserver((items) => {
  items.getEntries().forEach((item) => {
    console.log(item);
  });
});

obs.observe({ entryTypes: ['http'] });

const PORT = 8080;

http.createServer((req, res) => {
  res.end('ok');
}).listen(PORT, () => {
  http.get(`http://127.0.0.1:${PORT}`);
});
```

#### Measuring how long the `net.connect` (only for TCP) takes when the connection is successful

```js
'use strict';
const { PerformanceObserver } = require('node:perf_hooks');
const net = require('node:net');
const obs = new PerformanceObserver((items) => {
  items.getEntries().forEach((item) => {
    console.log(item);
  });
});
obs.observe({ entryTypes: ['net'] });
const PORT = 8080;
net.createServer((socket) => {
  socket.destroy();
}).listen(PORT, () => {
  net.connect(PORT);
});
```

#### Measuring how long the DNS takes when the request is successful

```js
'use strict';
const { PerformanceObserver } = require('node:perf_hooks');
const dns = require('node:dns');
const obs = new PerformanceObserver((items) => {
  items.getEntries().forEach((item) => {
    console.log(item);
  });
});
obs.observe({ entryTypes: ['dns'] });
dns.lookup('localhost', () => {});
dns.promises.resolve('localhost');
```

[Async Hooks]: async_hooks.md
[Fetch Timing Info]: https://fetch.spec.whatwg.org/#fetch-timing-info
[High Resolution Time]: https://www.w3.org/TR/hr-time-2
[Performance Timeline]: https://w3c.github.io/performance-timeline/
[Resource Timing]: https://www.w3.org/TR/resource-timing-2/
[User Timing]: https://www.w3.org/TR/user-timing/
[Web Performance APIs]: https://w3c.github.io/perf-timing-primer/
[Worker threads]: worker_threads.md#worker-threads
[`'exit'`]: /api/v20/process#event-exit
[`child_process.spawnSync()`]: child_process.md#child_processspawnsynccommand-args-options
[`process.hrtime()`]: /api/v20/process#processhrtimetime
[`timeOrigin`]: https://w3c.github.io/hr-time/#dom-performance-timeorigin
[`window.performance.toJSON`]: https://developer.mozilla.org/en-US/docs/Web/API/Performance/toJSON
[`window.performance`]: https://developer.mozilla.org/en-US/docs/Web/API/Window/performance
