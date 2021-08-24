## 🧐 What's inside?

A quick look at some of the top-level files and directories found in this project.

```console
.
├── .github
├── .storybook
├── meetings
├── node_modules
├── src
├── stories
├── style-guide
├── test
├── util-node
├── .editorconfig
├── .eslintignore
├── .eslintrc.js
├── .firebaserc
├── .gitignore
├── .nvmrc
├── .prettierignore
├── .prettierrc
├── .remarkrc
├── cloudbuild-deploy.yaml
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── empty.env
├── firebase.json
├── gatsby-browser.js
├── gatsby-config.js
├── gatsby-node.js
├── LICENSE
├── ModerationPolicy.md
├── OKR.md
├── package-lock.json
├── package.json
├── README.md
├── test-preprocessor.js
├── test-setup.js
└── tsconfig.json

```

1. **`.storybook`**: This directory contains configuration files so the [storybook](https://storybook.js.org/) package works as it should. Storybook is used to build the individual UI components in this project.

2. **`/node_modules`**: The directory where all of the modules of code that your project depends on (npm packages) are automatically installed.

3. **`/src`**: This directory will contain all of the code related to what you will see on the front-end of your site (what you see in the browser), like your site header, or a page template. "Src" is a convention for "source code."

4. **`/stories`**: This directory contains stories for UI components used in this project. You can find out what a story is [here](https://storybook.js.org/docs/react/get-started/whats-a-story). Also, you can run them locally using `npm run storybook`.

5. **`/test`**: Tests for this projects are stored in this directory. This project uses [Jest](https://jestjs.io/) as it's testing framework.

6. **`/util-node`**: Custom utility functions that require nodeJs to run can be stored in files inside this directory. An example is the create-slug function in the createSlug.js file that generates unique slugs for articles.

7. **`.gitignore`**: This file tells git which files it should not track/not maintain a version history.

8. **`.nvmrc`**: nvm configuration so packages work as they should

9. **`.prettierrc`**: This is a configuration file for a tool called [Prettier](https://prettier.io/), which is a tool to help keep the formatting of your code consistent.

10. **`empty.env`**: Rename to **`.env`** and set your Contentful API key

11. **`gatsby-browser.js`**: This file is where Gatsby expects to find any usage of the [Gatsby browser APIs](https://www.gatsbyjs.com/docs/browser-apis/) (if any). These allow customization/extension of default Gatsby settings affecting the browser.

12. **`gatsby-config.js`**: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you'd like to include, etc. (Check out the [config docs](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/) for more detail).

13. **`gatsby-node.js`**: This file is where Gatsby expects to find any usage of the [Gatsby node APIs](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/) (if any). These allow customization/extension of default Gatsby settings affecting pieces of the site build process.

14. **`LICENSE`**: Gatsby is licensed under the MIT license.

15. **`package-lock.json`** (See `package.json` below, first). This is an automatically generated file based on the exact versions of your npm dependencies that were installed for your project. (You won't change this file directly).

16. **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project's name, author, etc.). This manifest is how npm knows which packages to install for your project.

17. **`README.md`**: A text file containing useful reference information about your project.

18. **`tsconfig.json`**: Config file for TypeScript

## 📝 Data Sources

This repository contains getting started documentation under `src/documentation`. Other content is pulled from across the Node.js GitHub Org, Contentful, and other data sources and stitched together into a cohesive website.

## 🎓 Learning Gatsby

Looking for more guidance? Full documentation for Gatsby lives [on the website](https://www.gatsbyjs.com/). Here are some places to start:

* **For most developers, we recommend starting with our [in-depth tutorial for creating a site with Gatsby](https://www.gatsbyjs.com/docs/tutorial/).** It starts with zero assumptions about your level of ability and walks through every step of the process.

* **To dive straight into code samples head [to our documentation](https://www.gatsbyjs.com/docs/).** In particular, check out the "Guides", API reference, and "Advanced Tutorials" sections in the sidebar.
