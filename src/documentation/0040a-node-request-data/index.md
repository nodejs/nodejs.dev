---
title: Get HTTP request body data using Node
description: 'Find out how to extract the data sent as JSON through an HTTP request body using Node'
author: flaviocopes
---

Here is how you can extract the data that was sent as JSON in the request body.

If you are using Express, that's quite simple: use the `body-parser` Node module.

For example, to get the body of this request:

```js
const axios = require('axios')

axios.post('https://whatever.com/todos', {
  todo: 'Buy the milk'
})
```

This is the matching server-side code:

```js
const bodyParser = require('body-parser')

app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use(bodyParser.json())

app.post('/endpoint', (req, res) => {
  console.log(req.body.todo)
})
```

If you're not using Express and you want to do this in vanilla Node, you need to do a bit more work, of course, as Express abstracts a lot of this for you.

The key thing to understand is that when you initialize the HTTP server using `http.createServer()`, the callback is called when the server got all the HTTP headers, but not the request body.

The `request` object passed in the connection callback is a stream.

So, we must listen for the body content to be processed, and it's processed in chunks.

We first get the data by listening to the stream `data` events, and when the data ends, the stream `end` event is called, once:

```js
const server = http.createServer((req, res) => {
  // we can access HTTP headers
  req.on('data', chunk => {
    console.log(`Data chunk available: ${chunk}`)
  })
  req.on('end', () => {
    //end of data
  })
})
```

So to access the data, assuming we expect to receive a string, we must put it into an array:

```js
const server = http.createServer((req, res) => {
  let data = []
  req.on('data', chunk => {
    data.push(chunk)
  })
  req.on('end', () => {
    JSON.parse(data).todo // 'Buy the milk'
  })
})
```
