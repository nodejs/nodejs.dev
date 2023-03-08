# Writing content in Nodejs.dev

We use Markdown to write content for nodejs.dev. We follow the [CommonMark](https://commonmark.org/) specification. And you can use MDX to write React components in Markdown.

## Special syntax

### Code blocks

> **Note:** we use single cote in examples to avoid conflicts with Markdown syntax.

To write simple code use this syntax:

```md
    '''js
    const foo = 'bar';
    '''
```

**Note:**

* `js`: is use for simple javascript code.
* `bash`: is use from shell commands.
* `cjs`: is use for CommonJS code.
* `mjs`: is use for ES Modules code.
* `text`: is use for simple text. It will not be highlighted.
* `cpp`: is use for C++ code.
* `c`: is use for C code.
* `json`: is use for JSON code.

You can have multiple languages in the same code block. For example:

```md
```md
    ```cjs|mjs
    const http = require('http');
    ------
    import http from 'http';
    
    ```
```

You have to use `|` to separate the languages (the "lang" mustn't contains space).
And we use seven dashes (`------`) to separate the code blocks.

You can switch between `sync` and `async` code blocks. For example:

```md
```md
    ```sync|async
    const content = fs.readFileSync('file.txt', 'utf8');
    ------
    const content = await fs.readFile('file.txt', 'utf8');
    ```
```