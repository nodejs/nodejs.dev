- **Start Date:** 2019-07-11
- **PR:**
- **Issue:** [#126](https://github.com/nodejs/nodejs.dev/issues/126)
- **Keywords:** net core tcp socket networking
- **Summary:** A guide to using the core Node.js module `net` for TCP socket programming

# Computer Networking & Socket Programming

Socket programming is the development of programs for [Computer Networking](https://en.wikipedia.org/wiki/Computer_network). Networking applications are loosely based off of the top most layers of the conceptual 7-layer model called the [OSI Model](https://en.wikipedia.org/wiki/OSI_model). The layers most relevant to socket programmers is layer 4, the [Transport layer](https://en.wikipedia.org/wiki/Transport_layer), and layer 7, the [Application layer](https://en.wikipedia.org/wiki/Application_layer). Specific protocols are implemented at each layer, and are instrumental for the functionality of the internet. 

Node.js exposes extensive API's for implementing these protocols so developers can create socket programming applications. The most common example is the `http` module. [HTTP](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) exists on the Application layer of the OSI Model; if you want to learn more about the `http` module, read the Node.js [http documentation](https://nodejs.org/api/http.html) or the Nodejs.dev [guide](https://nodejs.dev/the-nodejs-http-module). Another socket programming, Node.js module is the `dgram` module for [UDP](https://en.wikipedia.org/wiki/User_Datagram_Protocol) servers. UDP exists on the Transport layer; for more information about this technology read the Node.js [dgram documentaion](https://nodejs.org/api/dgram.html). More importantly, the `net` module, which this guide is all about, provides an extensive API for a stream-based TCP server. [TCP](https://en.wikipedia.org/wiki/Transmission_Control_Protocol) exists on the Transport layer of the OSI Model and is what HTTP is implemented on. 

> TCP is a reliable, ordered, and error-checked delivery of a stream of bytes between applications communicating via an internet protocol (IP) network. 
>
> ~ Wikipedia

## Net Module - Getting Started

The key part of the `net` module is the `net.Socket` class. A socket instance in Node.js is both a duplex stream and an event emitter. This means it is readable, writable, and can utilize the event loop. Sockets can be created by the user and by Node.js, and they are the programmatic object for communicating. Sockets must connect to a `net.Server` class instance; a socket connection to a server is often referred to as a _client connection_. Every socket connection is considered "private" in the sense that the only entities with access to the connection is the server and the client. A server instance **can** have multiple client connections, but will maintain separate communication streams with each connection.

Lets look at the simplest example of a TCP server, an echo server. An _echo server_ is one which returns the same message sent to it.

```js
const net = require('net')

// Create a TCP server using the `net.createServer()` method
// The callback method is an event listener for the 'connection' event
// This method is passed a single parameter, the client socket connection
const server = net.createServer(client => {

  console.log('Client connected!')

  // Manual implementation of an echo server:
  // Get data in from the client, and write it back to the client without modifying it.
  client.on('data', buf => { // receiving data from the client connection as a Buffer
    console.log(buf.toString()) // easily transfrom this into a string with the Buffer.toString() prototype method
    client.write(buf)
  })

  // Automatic implementation of an echo server:
  client.pipe(client) // client connections are streams so you have full access to regular stream methods
})

// Start the server on localhost:8124
// The `http` module, inherits this method for its own http.Server.listen
server.listen(8124, 'localhost', () => {
  console.log('Waiting for connection...')
})
```

With this server running, connect to it using your system's command-line TCP interface. The two most common are telnet and netcat. If you're unsure which, try both! If neither work a quick search for "telnet alternative for \<your OS\>" will help. 

In another terminal connect to the running TCP server:
```bash
telnet localhost 8124
# or
nc localhost 8124
```

If you see the message `Client connected!` in the TCP server terminal, you can begin sending messages from the client connection terminal. Whatever you send should be sent back to you immediatly (if you copy-and-pasted the code from above directly, you'll receive your message twice because their are two echo implementations). Disconnecting is easy; use your terminal's quit keystroke (commonly `CTRL+C`) or exit the terminal application instance.

Great work! You have succesfully implemented your first TCP server-client connection.

## Example using `net.createConnection()`

Before starting, open to terminals and startup the Node.js repl (you can also use two files called `server.js` and `client.js` respectively). In the following example, we will create a TCP server and a connection to that server using the `net` module. By doing so, the interactivity is not the same as the previous echo example. In fact, without using another core module such as `readline` or `fs`, this example is completely non-interactive. The client code will disconnect itself at the end of its execution.

```js
// In the first repl, create and start a server
const net = require('net')

const server = net.createServer(client => {

  console.log('Client connected') // log the client has connected to the server 

  client.write('Hello from the server!\n') // say hello to the new connection

  client.on('data', buf => {
    const str = buf.toString()
    client.write(str.toUpperCase()) // return the users message in ALL CAPS
    client.write('QUIT') // send an arbitrary message to end the non-interactive session
  })

  client.on('end', () => {
    console.log('Client disconnected') // log the client has disconnected to the server 
  })
})

server.listen(8124, 'localhost', () => {
  console.log('Waiting for connection...')
})
```

```js
// In the second repl, create and connect a client
const net = require('net')

const client = net.createConnection(8124, 'localhost', () => {
  
  console.log('Connected to Server!') // log the server connection to the client

  client.write('Hello from the client!\n') // say hello to the server
})

client.on('data', buf => {
  const str = buf.toString()
  if (str === 'QUIT') {
    client.end() // if the server sends the arbitrary quit message, end the connection. This will happen after the server sends back the hello message in ALL CAPS.
  } else {
    console.log(buf.toString()) // log messages from the server to the client
  }
})

client.on('end', () => {
  console.log('Disconnected from server') // log the server disconnection to the client
})
```

## Conclusion

Fantastic work! With these two examples you should have what you need to get started building your own TCP communication networks.

For more capabilities of the `net` module read the Node.js [net documentation](https://nodejs.org/api/net.html).

To learn more, try completing the following challenges:
- Using `readline` or `stream` modules, create an interactive client connection script
  - this can build on the second example provided in this guide
- Create a group-chat TCP server
  - hint: you can hold multiple client connections in an array
  - use multiple arrays for a multi-channel chat server
  - for an extra challenge try to implement a basic user-store for authentication of user accounts
- Create a mini CRUD database server using an idiomatic chat-command interface
  - The chat-command interface could use keywords such as `create`, `read`, `update`, and `delete` so the client can send instructions to the server
  - Data can be persisted between sessions using `fs` to read and write data to files
