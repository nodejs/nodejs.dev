---
title: Run Node.js scripts from the command line
description: 'How to run any Node.js script from the CLI'
authors: flaviocopes, MylesBorins, fhemberger, LaRuaNa, ahmadawais, akazyti
section: Getting Started
category: learn
---

The usual way to run a Node.js program is to run the `node` globally available command (once you install Node.js) and pass the name of the file you want to execute.

If your main Node.js application file is `app.js`, you can call it by typing:

```bash
node app.js
```

Above, you are explicitly telling the shell to run your script with `node`. You can also embed this information into your JavaScript file with a "shebang" line. The "shebang" is the first line in the file, and tells the OS which interpreter to use for running the script. Below is the first line of JavaScript:

```bash
#!/usr/bin/node
```

Above we are explicitly giving the absolute path of interpreter but not all OS have `node` in it's bin folder but all have `env` so you can tell OS to run env with node as parameter:

```bash
#!/usr/bin/env node

// your code
```

For using shebang your file should have executable permission which you can give as follows:

```bash
chmod u+x app.js
```

While running the command, make sure you are in the same directory which contains the `app.js` file.
