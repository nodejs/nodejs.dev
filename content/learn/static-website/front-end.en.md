---
title: front-end
displayTitle: 'front end'
description: 'The front end of our project.'
authors: AugustinMauroy
section: static website
category: learn
---

## Let's create the base of our project

To work we need to create a directory. That you can call as you like.
In this folder you can create a new folder called 'content' and another 'css'.

## Let's create our html

For our html we will create several files that will contain our html code. They will all be in the content directory.
There is `index.html` and `404.html` and again `social_network.html`.
Now that we have done that we will write some html code.

We'll start with the code for `index.html`.

```html
<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="./css/style.css">
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>My portfolio</title>
    </head>
    <body>
        <header>
            <h1>Welcome to my portfolio!</h1>
        </header>
        <main>
            <section>
                <h2>My social networks.</h2>
                <a href="./social_network.html">social networks.</a>
            </section>
        </main>
    </body>
</html>
```

Then make the code for `social_network.html`

```html
<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="./css/style.css">
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>My social networks</title>
    </head>
    <body>
        <header>
            <h1>My social networks</h1>
            <a href="/">Accueille</a>
        </header>
        <main>
            <section>
                <h2>Github</h2>
                <p>You can find all my repo</p>
                <a href="https://github.com/nodejs">Github</a>
            </section>
            <section>
                <h2>Twitter</h2>
                <p>You can find all news about me</p>
                <a href="https://twitter.com/nodejs">Twitter</a>
            </section>
        </main>
    </body>
</html>
```

Finally we will write the html code of our file `404.html`.

```html
<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="./css/style.css">
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Error 404</title>
    </head>
    <body>
        <main>
            <section>
                <h1>An error has occurred.</h1>
                <a href="./">Back to the home page</a>
            </section>
        </main>
    </body>
</html>
```

## Let's create our CSS

We will add some css to the page to make it look nicer.
To do this we will create the document `style.css` in the `css` folder.
In this `style.css` we will write this code:

```CSS
html{
    font-family: Arial, Helvetica, sans-serif;
}
body{
    margin: 0;
}
header{
    padding: 10px;
    background-color: #5fa04e;
}

section{
    background-color: #448533;
    border-radius: 10px;
    padding: 10px;
    margin: 10px;
}
a{
    color: white;
}
```

## Javascript in the project?

We are not going to put any javascript in this tutorial to avoid you getting confused with the node javascript files.

If you have followed the steps just above. You can go on to the next step.
