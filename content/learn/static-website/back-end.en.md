---
title: back-end
displayTitle: ''
description: ''
authors: AugustinMauroy
section: static website
category: learn
---

## Now we will create our back-end

To start we need to create a javascript file that will be in the directory of our project.
This file will be called `app.js`.

In this javascript document we will import the modules.

```mjs
import http from 'node:http';
import fs from "node:fs";
import url from 'node:url';
```

Once this is done we will create the http server function.

```mjs
const server = http.createServer(async (req, res) => {  
    var path = url.parse(req.url).pathname;
    switch (path) {
        case '/':
            fs.readFile("./index.html", (err, data) => {  
            if (err) {  
                res.statusCode = 404
                res.setHeader('Content-Type', 'text/html')
                res.end(error_404)
            } else {
                res.statusCode = 200
                res.setHeader('Content-Type', 'text/html')
                res.end(data)
            }  
        });  
        break;
        case '/social_network':  
            fs.readFile('./social_network.html', (err, data) => {  
                if (err) {  
                    res.statusCode = 404
                    res.setHeader('Content-Type', 'text/html')
                    res.end(error_404)
                } else {  
                    res.statusCode = 200
                    res.setHeader('Content-Type', 'text/html')
                    res.end(data) 
                }  
            });
        break;
        case '/css/style.css':  
            fs.readFile('./css/style.css', (err, data) => {  
                if (err) {  
                    res.statusCode = 404
                    res.setHeader('Content-Type', 'text/html')
                    res.end(error_404)
                } else {  
                    res.statusCode = 200
                    res.setHeader('Content-Type', 'text/css')
                    res.end(data) 
                }  
            });
        break;
        default:  
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/html')
        res.end(await error_404) 
    }
});

server.listen(8080, () => {
    console.log('Server running on http://localhost:8080/');
});

const error_404 = fs.readFileSync(`./404.html`,(err,data)=>{
    if (err) {
        return `<h1>404</h1>
                <a href="/">Retour à page d’accueil</a>`
    } else {
        return data
    }
})
```

The `path` variable will allow to define which file to send.
The constant `error_404` allows to resend a web page if a file is not found. For this we use `fs.readFileSync`.
The function `server.listen` defines the port of our web server.

## End!

Now you have created a web server. We hope you found it useful.
