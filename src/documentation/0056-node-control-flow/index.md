---
title: Asynchronous flow control
description: 'JavaScript control flow is all about callback handling. Here are strategies to help your development.'
authors: aug2uag
section: Getting Started
---

The material in this post is heavily inspired by [Mixu's Node.js Book](http://book.mixu.net/node/ch7.html).

At it's core, JavaScript is designed to be non-blocking on the "main" thread, this is where views are rendered. You can imagine the importance of this in the browser. When the main thread becomes blocked it results in the infamous "freezing" that end users dread, and no other events can be dispatched resulting in the loss of data acquisition, for example.

This creates some unique constraints that only a functional style of programming can cure. This is where "callbacks" come in to the picture.

However, callbacks can become challenging to handle in more complicated procedures. This often results in "callback hell" where multiple nested functions with callbacks make the code more challenging to read, debug, organize, etc.

```js
async1(function(input, result1) {
  async2(function(result2) {
    async3(function(result3) {
      async4(function(result4) {
        async5(function(output) {
            // do something with output
        })
      })
    })
  })
})
```

Of course, in real life there would most likely be additional lines of code to handle `result1`, `result2`, etc., thus, the length and complexity of this issue usually results in code that looks much more messy than the example above.

This is where *functions* come in to great use. More complex operations are made up of many functions:

1) initiator style / input;
2) middleware, and;
3) terminator.

The "initiator style / input" is the first function in the sequence. This function will accept the original input, if any, for the operation. The operation is an executable series of functions, and the original input will primarily be:

1) variables in a global environment;
2) direct invocation with or without arguments, and;
3) values obtained by file system or network requests.

Network requests can be incoming requests initiated by a foreign network, by another application on the same network, or by the app itself on the same or foreign network.

A middleware function will return another function, and a terminator function will invoke the callback. The following illustrates the flow to network or file system requests. Here the latency is 0 because all these values are available in RAM.

```js
function initiate() {
    let some_input = 'hello this is a function '
    middleware(function(result) {
        console.log(result)
        // requires callback to `return` result
    })
}

function middleware(some_input, callback) {
    some_input += 'touched by middleware '
    return final(some_input, callback)
}

function final(some_input, callback) {
    some_input += 'and terminated by executing callback '
    callback(some_input)
}

initiate()
```

## State management

Functions may or may not be state dependent. State dependency arises when the input or other variable of a function relies on an outside function.

In this way there are two primary strategies for state management:

1. passing in variables directly to a function, and

2. acquiring a variable value from a cache, session, file, database, network, or other outside source.

Note, I did not mention global variable. Managing state with global variables is often a sloppy anti-pattern that makes it difficult or impossible to guarantee state. Global variables in complex programs should be avoided when possible.

## Control flow

If an object is available in RAM, iteration is possible, and there will not be a change to control flow:

```js
function get_song() {
    let song = ''
    for (var i = 100; i > 0; i--) {
        song += `${i} beers on the wall, you take one down and pass it around, ${i - 1} bottles of beer on the wall\n`
        if (i == 1) {
            song += 'Hey let\'s get some more beer'
        }
    }

    return song
}

var song = get_song()
// this will work
sing_song(song)
```

However, if the data exists outside of RAM the iteration will no longer work:

```js
function get_song() {
    let song = ''
    for (var i = 100; i > 0; i--) {
        setTimeout(function() {
            song += `${i} beers on the wall, you take one down and pass it around, ${i - 1} bottles of beer on the wall\n`
            if (i == 1) {
                song += 'Hey let\'s get some more beer'
            }
        }, 0)
    }

    return song
}

var song = get_song('beer')
// this will not work
sing_song(song)
// ERROR: song is '' empty, FEED ME A SONG!
```

Why did this happen? `setTimeout` instructs the CPU to store the instructions elsewhere on the bus, and instructs that the data is scheduled for pickup at a later time. Thousands of CPU cycles pass before the function hits again at the 0 millisecond mark, the CPU fetches the instructions from the bus and executes them. The only problem is that song ('') was returned thousands of cycles prior.

The same situation arises in dealing with file systems and network requests. The main thread simply cannot be blocked for an indeterminate period of time-- therefore, we use callbacks to schedule the execution of code in time in a controlled manner.

You will be able to perform almost all of your operations with the following 3 patterns:

1. In series:
    functions will be executed in a strict sequential order, this one is most similar to `for` loops.

```js
// operations defined elsewhere and ready to execute
let operations = [
    {func: function1, args: args1},
    {func: function2, args: args2},
    {func: function3, args: args3}
]

function executeFunctionWithArgs(operation, callback) {
    // executes function
    let func = operation['func']
    let args = operation['args']
    func(args, callback)
}

function serialProcedure(operation) {
    if (!operation) process.exit(0) // finished
    executeFunctionWithArgs(operation, function(result) {
        // continue AFTER callback
        serialProcedure(operations.shift())
    })
}

serialProcedure(operations.shift())
```

2. Full parallel:
    when ordering is not an issue, such as emailing a list of 1,000,000 email recipients.

```js
let recipients = [
    {name: 'Bart', email: 'bart@tld'},
    {name: 'Marge', email: 'marge@tld'},
    {name: 'Homer', email: 'homer@tld'},
    {name: 'Lisa', email: 'lisa@tld'},
    {name: 'Maggie', email: 'maggie@tld'},
]

function dispatch(recipient, callback) {
    // `sendEmail` is a hypothetical SMTP client
    sendMail({
        subject: 'Dinner tonight',
        message: 'We have lots of cabbage on the plate. You coming?',
        smtp: recipient.email
    }, callback)
}

function final(result) {
    console.log(`Result: ${result.count} attempts \
        & ${result.success} succeeded emails`)
    if (result.failed.length)
        console.log(`Failed to send to: \
            \n${result.failed.join('\n')}\n`)
}

var count = 0
var success = 0
var failed = []
items.forEach(function(recipient) {
    dispatch(recipient, function(err){
        if (!err) {
            success += 1
        } else {
            failed.push(recipient.name)
        }
        count += 1

        if(count == recipients.length) {
            final({
                count: count,
                success: success,
                failed: failed
            })
        }
    })
})

```

3. Limited parallel:
    parallel with limit, such as successfully emailing 1,000,000 recipients from a list of 10E7 users.

```js
var successCount = 0

function final() {
    console.log(`dispatched ${successCount} emails`)
    console.log('finished')
}

function sendOneMillionEmailsOnly() {
    getListOfTenMillionGreatEmails(function(err, bigList) {
        if (err) throw err

        function serial(recipient) {
            if (!recipient || successCount >= 1000000)
                return final()
            dispatch(recipient, function(err) {
                if (!err) successCount += 1
                serial(bigList.shift())
            })
        }

        serial(bigList.shift())
    })
}

function dispatch(recipient, callback) {
    // `sendEmail` is a hypothetical SMTP client
    sendMail({
        subject: 'Dinner tonight',
        message: 'We have lots of cabbage on the plate. You coming?',
        smtp: recipient.email
    }, callback)
}

sendOneMillionEmailsOnly()
```

Each has its own use cases, benefits, and issues you can experiement and read about in more detail. Most importantly, remember to modularize your operations and use callbacks! If you feel any doubt, treat everything as if it were middleware!
