## Project Overview

## 🧐 What's inside?

A quick look at some of the top-level files and directories found in this project.

1. **`/node_modules`**: The directory where all of the modules of code that your project depends on (npm packages) are automatically installed.
1. **`/src`**: This directory will contain all of the code related to what you will see on the front-end of your site (what you see in the browser), like your site header, or a page template. "Src" is a convention for "source code."
1. **`/content`**: This directory contains all the contents of (pages, blog posts, doc pages) of the website. They're all done in Markdown and MDX.
1. **`/test`**: Tests for this projects are stored in this directory. This project uses [Jest](https://jestjs.io/) as its testing framework.
1. **`/util-node`**: Custom utility functions that require nodeJs to run can be stored in files inside this directory. An example is the create-slug function in the createSlug.js file that generates unique slugs for articles.
1. **`.gitignore`**: This file tells git which files it should not track/not maintain a version history.
1. **`.nvmrc`**: nvm configuration so packages work as they should
1. **`.prettierrc`**: This is a configuration file for a tool called [Prettier](https://prettier.io/), which is a tool to help keep the formatting of your code consistent.
1. **`empty.env`**: Rename to **`.env`** and set your Contentful API key
1. **`gatsby-browser.js`**: This file is where Gatsby expects to find any usage of the [Gatsby browser APIs](https://www.gatsbyjs.com/docs/browser-apis/) (if any). These allow customization/extension of default Gatsby settings affecting the browser.
1. **`gatsby-config.js`**: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata), like the site title and description, which Gatsby plugins you'd like to include, etc. (Check out the [config docs](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/) for more detail).
1. **`gatsby-node.js`**: This file is where Gatsby expects to find any usage of the [Gatsby node APIs](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/) (if any). These allow customization/extension of default Gatsby settings affecting pieces of the site build process.
1. **`LICENSE`**: Gatsby is licensed under the MIT license.
1. **`package-lock.json`** (See `package.json` below, first). This is an automatically generated file based on the exact versions of your npm dependencies that were installed for your project. (You won't change this file directly)
1. **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project's name, author, etc.). This manifest is how npm knows which packages to install for your project.
1. **`README.md`**: A text file containing useful reference information about your project.
1. **`TRANSLATING.md`**: A text file containing useful reference about how to contribute with translations.
1. **`tsconfig.json`**: Config file for TypeScript

## 📝 Data Sources

Content is pulled from across the Node.js GitHub Org, Contentful, and other data sources and stitched together into a cohesive website.

### Content (Blogs, Learn, etc.)

The content folder is responsible for aggregating all the content of the Website, such as the Community pages, Blog pages and Learn pages.

## 🎓 Learning Gatsby

Looking for more guidance? Full documentation for Gatsby lives [on the website](https://www.gatsbyjs.com/). Here are some places to start:

- **For most developers, we recommend starting with our [in-depth tutorial for creating a site with Gatsby](https://www.gatsbyjs.com/docs/tutorial/).** It starts with zero assumptions about your level of ability and walks you through every step of the process.
- **To dive straight into code samples, head [to our documentation](https://www.gatsbyjs.com/docs/).** In particular, check out the "Guides", "API Reference", and "Advanced Tutorials" sections in the sidebar.
