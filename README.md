test 2
<p align="center">
  <br>
  <a href="https://nodejs.dev">
    <img src="./src/images/nodejs-logo-light-mode.svg" width="200"/>
  </a>
</p>

<h1 align="center"><a href="https://nodejs.dev">Nodejs.dev</a></h1>

<p align="center">
  <a href="https://nodejs.dev">Nodejs.dev</a> site built using Gatsby.js with React.js, TypeScript, Emotion, and Remark.
</p>

<p align="center">
  <a title="MIT License" href="LICENSE">
    <img src="https://img.shields.io/github/license/gridsome/gridsome.svg?style=flat-square&label=License&colorB=6cc24a">
  </a>
  <a title="Follow on Twitter" href="https://twitter.com/Nodejs">
    <img src="https://img.shields.io/twitter/follow/Nodejs.svg?style=social&label=Follow%20@Nodejs">
  </a>
  <br>
  <br>
</p>

**You can find the latest [Figma design protype here](https://www.figma.com/proto/lOxAGGg5KXb6nwie7zXkz6/NJ---Design-System?node-id=1276%3A10492&viewport=-232%2C-1378%2C0.21998274326324463&scaling=min-zoom).**

## 🚀 Get Started

1.  **Install Yarn (if Yarn Package Manager is not available on your machine).**

    Yarn has an [installation guide](https://yarnpkg.com/en/docs/install) for your specific configuration. Happy knitting!

2.  **Install dependencies.**

    ```sh
    # install the dependencies
    yarn install
    ```

3. **Start developing.**

    ```sh
    # "start": "gatsby develop"
    yarn start
    ```

4.  **Open the source code and start editing!**

    Your site is now running at `http://localhost:8000`!

    *Note: You'll also see a second link: `http://localhost:8000___graphql`. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://next.gatsbyjs.org/tutorial/part-five/#introducing-graphiql).*

## 🧐 What's inside?

A quick look at the top-level files and directories you'll see in a Gatsby project.

    .
    ├── node_modules
    ├── src
    ├── .gitignore
    ├── .nvmrc
    ├── .prettierrc
    ├── empty.env
    ├── gatsby-browser.js
    ├── gatsby-config.js
    ├── gatsby-node.js
    ├── gatsby-ssr.js
    ├── LICENSE
    ├── package-lock.json
    ├── package.json
    ├── README.md
    ├── tsconfig.json
    ├── tslint.json
    └── yarn.lock

  1.  **`/node_modules`**: The directory where all of the modules of code that your project depends on (npm packages) are automatically installed.

  2.  **`/src`**: This directory will contain all of the code related to what you will see on the front-end of your site (what you see in the browser), like your site header, or a page template. “Src” is a convention for “source code.”

  3.  **`.gitignore`**: This file tells git which files it should not track/not maintain a version history.

  4. **`.nvmrc`**: NVM configuration so packages work as they should

  5.  **`.prettierrc`**: This is a configuration file for a tool called [Prettier](https://prettier.io/), which is a tool to help keep the formatting of your code consistent.

  6. **`empty.env`**: Rename to **`.env`** and set your Contentful API key

  7.  **`gatsby-browser.tsx`**: This file is where Gatsby expects to find any usage of the [Gatsby browser APIs](https://next.gatsbyjs.org/docs/browser-apis/) (if any). These allow customization/extension of default Gatsby settings affecting the browser.

  6.  **`gatsby-config.js`**: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc. (Check out the [config docs](https://next.gatsbyjs.org/docs/gatsby-config/) for more detail).

  8.  **`gatsby-node.js`**: This file is where Gatsby expects to find any usage of the [Gatsby node APIs](https://next.gatsbyjs.org/docs/node-apis/) (if any). These allow customization/extension of default Gatsby settings affecting pieces of the site build process.

  9.  **`gatsby-ssr.tsx`**: This file is where Gatsby expects to find any usage of the [Gatsby server-side rendering APIs](https://next.gatsbyjs.org/docs/ssr-apis/) (if any). These allow customization of default Gatsby settings affecting server-side rendering.

  10.  **`LICENSE`**: Gatsby is licensed under the MIT license.

  11.  **`package-lock.json`** (See `package.json` below, first). This is an automatically generated file based on the exact versions of your npm dependencies that were installed for your project. (You won’t change this file directly).

  12.  **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project’s name, author, etc.). This manifest is how npm knows which packages to install for your project.

  13.  **`README.md`**: A text file containing useful reference information about your project.

  14.  **`tsconfig.json`**: Config file for TypeScript

  15.  **`tslint.json`**: TS Lint configuration file

  16.  **`yarn.lock`**: [Yarn](https://yarnpkg.com/) is a package manager alternative to npm. You can use either yarn or npm, though all of the Gatsby docs reference npm.  This file serves essentially the same purpose as `package-lock.json`, just for a different package management system.

## 📝 Data Sources

This repository contains no documentation content. Content is pulled from across the Node.js Github Org, Contentful, and other data sources and stitched together into a cohesive website.

### src/documentation

The `src/documentation` directory currently contains all the getting started content.

## 🎓 Learning Gatsby

Looking for more guidance? Full documentation for Gatsby lives [on the website](https://next.gatsbyjs.org/). Here are some places to start:

-   **For most developers, we recommend starting with our [in-depth tutorial for creating a site with Gatsby](https://next.gatsbyjs.org/tutorial/).** It starts with zero assumptions about your level of ability and walks through every step of the process.

-   **To dive straight into code samples head [to our documentation](https://next.gatsbyjs.org/docs/).** In particular, check out the “Guides”, API reference, and “Advanced Tutorials” sections in the sidebar.


## 🏛 Governance

This initiative adopts the general Node.js [Code of Conduct][], as well as its
own [Contributing Guidelines][].

### Meetings

[Meeting notes][] from past meetings are maintained for later reference.
[Query issues for "Meeting"][] to find future meetings.

### Summary / Current Status

Our current focus is on site development. Development is happening in the [nodejs.dev repo](https://github.com/nodejs/nodejs.dev). This repo continues to be the hub for the redesign initiative.

### Team

**[@nodejs/website-redesign](https://github.com/nodejs/website-redesign)**

Any person who wants to contribute to the initiative is welcome! Please read
[Contributing Guidelines][] and join the effort 🙌.

Any member of the website-redesign initiative attached to the current phase of
the project will be added to a future phase as the project moves forward.

Any member of the website-redesign initiative who prefers to begin contributing
at a specific future phase is welcome to make a PR adding their handle to that
phase.

* [@amiller-gh](https://github.com/amiller-gh) - **Adam Miller**, CommComm
  Co-champion
* [@chowdhurian](https://github.com/chowdhurian) - **Manil Chowdhury**, CommComm
  Co-champion

#### Information Gathering

* [@amiller-gh](https://github.com/amiller-gh) - **Adam Miller**
* [@codeekage](https://github.com/codeekage) - **Agiri Abraham JNR**
* [@darcyclarke](https://github.com/darcyclarke) - **Darcy Clarke**
* [@maddhruv](https://github.com/maddhruv) - **Dhruv Jain**
* [@fhemberger](https://github.com/fhemberger) - **Frederic Hemberger**
* [@JonahMoses](https://github.com/JonahMoses) - **Jonah Moses**
* [@chowdhurian](https://github.com/chowdhurian) - **Manil Chowdhury**
* [@oe](https://github.com/oe) - **Olivia Hugger**
* [@bnb](https://github.com/bnb) - **Tierney Cyren**
* [@timothyis](https://github.com/timothyis) - **Timothy**

#### IA / UX Planning

* [@oe](https://github.com/oe) - **Olivia Hugger**
* [@fhemberger](https://github.com/fhemberger) - **Frederic Hemberger**
* [@bnb](https://github.com/bnb) - **Tierney Cyren**
* [@timothyis](https://github.com/timothyis) - **Timothy**
* [@JonahMoses](https://github.com/JonahMoses) - **Jonah Moses**
* [@amiller-gh](https://github.com/amiller-gh) - **Adam Miller**
* [@emilypmendez](https://github.com/emilypmendez) - **Emily Mendez**
* [@darcyclarke](https://github.com/darcyclarke) - **Darcy Clarke**
* [@maddhruv](https://github.com/maddhruv) - **Dhruv Jain**
* [@chowdhurian](https://github.com/chowdhurian) - **Manil Chowdhury**
* [@codeekage](https://github.com/codeekage) - **Agiri Abraham JNR**
* [@add1sun](https://github.com/add1sun) - **Addison Berry**
* [@Qard](https://github.com/Qard) - **Stephen Belanger**
* [@watilde](https://github.com/watilde) - **Daijiro Wachi**
* [@tolmasky](https://github.com/tolmasky) - **Francisco Ryan Tolmasky I**
* [@milapbhojak](https://github.com/milapbhojak) - **Milap Bhojak**
* [@devamaz](https://github.com/devamaz) - **Ahmad Abdul-Aziz**

#### UI Design and Content Creation

* [@amiller-gh](https://github.com/amiller-gh) - **Adam Miller**
* [@bnb](https://github.com/bnb) - **Tierney Cyren**
* [@codeekage](https://github.com/codeekage) - **Agiri Abraham JNR**
* [@chowdhurian](https://github.com/chowdhurian) - **Manil Chowdhury**
* [@maddhruv](https://github.com/maddhruv) - **Dhruv Jain**
* [@milapbhojak](https://github.com/milapbhojak) - **Milap Bhojak**
* [@tolmasky](https://github.com/tolmasky) - **Francisco Ryan Tolmasky I**
* [@iNidAName](https://github.com/inidaname) - **Hassaan Sani**
* [@abedzantout](https://github.com/abedzantout) - **Abdul Rahman Zantout**
* [@AliObaji](https://github.com/AliObaji) - **Ali Obaji**
* [@AhmadAwais](https://github.com/AhmadAwais) - **AhmadAwais**

#### Site Development _<-- current phase_

* [@abiclub23](https://github.com/abiclub23) - **Abhi Tondepu**
* [@ajay2507](https://github.com/ajay2507) - **Ajaykumar**
* [@connorholyday](https://github.com/connorholyday) - **Connor Holyday**
* [@iceagency-jakecruse](https://github.com/iceagency-jakecruse) - **Jake Cruse**
* [@iceagency-lukehopkins](https://github.com/iceagency-lukehopkins) - **Luke Hopkins**
* [@jestho](https://github.com/jestho) - **Jesper Thøgersen**
* [@jonahmoses](https://github.com/jonahmoses) - **Jonah Moses**
* [@sagirk](https://github.com/sagirk) - **Sagir Khan**
* [@ollelauribostrom](https://github.com/ollelauribostrom) - **Olle Lauri Boström**
* [@belar](https://github.com/Belar) - **Paweł**
* [@erichodges](https://github.com/erichodges) - **Eric Hodges**
* [@utkarshbhimte](https://github.com/utkarshbhimte) - **Utkarsh Bhimte**
* [@lidoravitan](https://github.com/lidoravitan) - **Lidor Avitan**
* [@mbj36](https://github.com/mbj36) - **Mohit Bajoria**
* [@zanmarolt](https://github.com/zanmarolt) - **Zan Marolt**
* [@imbhargav5](https://github.com/imbhargav5) - **Bhargav Ponnapalli**
* [@mikeattara](https://github.com/mikeattara) - **Mike Perry Y Attara**
* [@ZYSzys](https://github.com/ZYSzys) - **ZYSzys**
* [@mrjam2](https://github.com/mrjam2) - **Jamie Burton**
* [@jamesgeorge007](https://github.com/jamesgeorge007) - **James George**
* [@Yash-Handa](https://github.com/Yash-Handa) - **Yash Handa**
* [@iNidAName](https://github.com/inidaname) - **Hassaan Sani**
* [@abedzantout](https://github.com/abedzantout) - **Abdul Rahman Zantout**
* [@LaRuaNa](https://github.com/LaRuaNa) - **Onur Laru**
* [@AhmadAwais](https://github.com/AhmadAwais) - **AhmadAwais**
* [@BeniCheni](https://github.com/BeniCheni) - **Benjamin Chen**
* [@kevjin](https://github.com/kevjin) - **Kevin Jin**

## Links

[Community Committee][]
[Code of Conduct][]
[Contributing Guidelines][]
[Meeting Notes][]
[Query issues for "Meeting"][]

[community committee]: https://github.com/nodejs/community-committee
[code of conduct]: https://github.com/nodejs/admin/blob/master/CODE_OF_CONDUCT.md
[contributing guidelines]: ./CONTRIBUTING.md
[meeting notes]: ./meetings
[query issues for "meeting"]: https://github.com/nodejs/website-redesign/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+Meeting+in%3Atitle
