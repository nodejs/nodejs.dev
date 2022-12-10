# Translating Nodejs.dev

This documentation will guide you on how to translate the numerous components and parts of the Nodejs.dev website.

It will also teach you how to update Language metadata and how to enable Languages locally and how to preview your changes.

## Updating Language Metadatas

Currently, the Nodejs.dev website uses I18N metadatas that follow [this plugin](https://github.com/gatsbyjs/themes/tree/master/packages/gatsby-theme-i18n).

You can see the current (and languages we intend to support in the future) by browsing the `src/i18n/config.json` file.

### How the metadata is structured?

The `src/i18n/config.json` file is a JSON file structured by one single Collection (Array) that contains Language metadatas (each Language being one object).

**The structure of each Language is shown as follow:**

```json
{
  "code": "de",
  "localName": "Deutsch",
  "name": "German",
  "langDir": "ltr",
  "dateFormat": "DD.MM.YYYY",
  "hrefLang": "",
  "enabled": false
  }
```

**The table below explains the functionality of each field:**

| Field      | Example Value | Description                                                                                                                                                                                                                                 | Docs                                                  |
|------------|---------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------|
| code       | `de`          | The ISO-639-1 2-character code of your Language                                                                                                                                                                                             | https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes |
| localName  | `Deutsch`     | The name of your Language in your Language                                                                                                                                                                                                  |                                                       |
| name       | `German`      | The name of your Language in English                                                                                                                                                                                                        |                                                       |
| langDir    | `ltr`         | The direction of text on your language. It could be `ltr` (Left-to-right) or `rtl` (Right-to-left)                                                                                                                                          |                                                       |
| dateFormat | `MM-DD-YYYY`  | The date format on your regional locale following the ISO-8601                                                                                                                                                                              | https://en.wikipedia.org/wiki/ISO_8601                |
| hreflang   | `de`          | The 2-character (`de`) or 4-character (`de_AT`) code of your Language. Used my the browser to identify your Language. A two digit code is Country neutral eg.: Portuguese, and a 4 digit code is Country-specific eg.: Brazilian Portuguese | https://hreflang.org/list-of-hreflang-codes/          |
| enabled    | `false`       | If the Language is enabled and currently supported by the website. Should only be enabled if both the I18n team and Nodejs.dev team agrees that sufficient content for that page was translated.                                              |                                                       |

**Note.:** When testing a Language locally on your installation, please change `enabled: false` to `enabled: true`

## Translating in-App Texts (Translations that are shown in UI Elements/Components)

As you might have noticed, some of the translations/pieces of text from this website, are used directly within UI Components and do not come from Markdown files.

Those are considered in-Component translations. For Nodejs.dev we're using [FormatJS with React-Intl](https://formatjs.io/docs/react-intl/). 

In general you don't need to know the technicalities of our Translation System, but if you're curious enough, these are the references for it.

### Where the Translations are stored?

In-Code/In-Component translations are stored within `src/i18n/locales` on a JSON file. The JSON file contains a Dictionary of Key-Value Pairs. 

Where the key is the Translation key and the value is the Text to be displayed.

**An example shown below:**

```json
"app.download.button.title": "Download Node.js"
```

The example above shows how translating an entry from the Website works, you only need to translate the value, aka in this case, "Download Node.js", the keys need to remain intact.

### Creating/Updating a Locale file

Right now the nodejs.dev website has a `en.json` localy file. 

When creating translations or updating translations for other languages, simply edit the JSON file that corresponds to your Language code. For example, `es.json`.

**Note.:** If the file for your Language code doesn't exist yet, please simply create it. If your language is "Deutsch/German" then the file should be named "de.json".

**Note.:** Use the `src/i81n/config.json` file as reference for Language codes.

## Translating Pages

Most of our Pages contents reside within the `content/` folder. Our pages are written with [Markdown](https://www.markdownguide.org/) and [MDX](https://mdxjs.com/). They supercharge your environment by allowing a custom synatx when writting the pages. Think about these Markdown files as a Microsoft Word document but with an extra Syntax for writing text.

Please refer to the Markdown and MDX guides mentioned above if you're struggling with the Syntax or inner-workings of these Idiomatic Languages/Syntaxes.

## Adding Translations of Components

When adding new translations towards a JSON file, we recommend always to add them in the bottom of the file. This allows contributors to easily see changesets, and see the diff between one translation file from another.

**Note.:** We recommend to use a similar pattern when creating translation keys 👀

### Adding React-Intl to a Component

We recommend using [`injectIntl`](https://formatjs.io/docs/react-intl/api/#injectintl-hoc) HOC (High-order-Component) to bundle the `intl` object within your Component.

We also recommend using the [`<FormattedMessage />`](https://formatjs.io/docs/react-intl/components/#formattedmessage) Component when possible, which doesn't require you to use `injectIntl`, as usually `injectIntl` is used when you need to have access to Imperative APIs such as `intl.formatMessage()`.

This method `intl.formatMessage` should usually be used when you need a translated text on a part of the code that is not JSX. For example, within a Component Prop (Common example.: `aria-label`) or somewhere else.

### How to translate a page?

As mentioned above the content of the pages are within the `content/` folder and all the files contain `.md` or `.mdx` extensions. These files support JSX(MDX), Markdown and plain HTML syntax. We of course, recommend not doing plain HTML, only when needed.

To create the same page for your Language, simply create a new file with the same name, and changing the file extension.

**For example, if the file is called `homepage.en.mdx` then for a French language it should become `homepage.fr.mdx`** Remember to always create a new file and not change the original.

### Page Metadata

Each one of these files has a Metadata which is used to define the title, description and the authors of the page. The metadata is written in [YAML](https://yaml.org/).

An example metadata section of one of our pages is shown as below:

```yaml
---
title: node.js-community
displayTitle: Node.js Community
description: "Node.js has one of the largest, most vibrant and innovative open source communities in the world. Node.js is built, used, and maintained by the community. We believe the community to be at the core of Node.js popularity. Amazing people from every part of the world, with a common interest, collaborate and shape this community."
authors: ahmadawais, maedahbatool, saqibameen, msaaddev
category: community
---
```

**Note.:** The `title` and `category` fields should never be changed. Please keep that in mind!

It is fine (and recommended) updating the values of `displayTitle` and `description` to your language. The `displayTitle` is the actual title of the page.

Also, we recommend adding your GitHub username on the list of `authors`, by simply adding a command `,` in the end followed by your GitHub username.

## Submitting Changes

When submitting changes, simply create a PR with the content and/or locale and/or metadata changes for the Language you're contributing for.

We also recommend to tag/mention the i18n team, and in specific the [Team responsible for your Language](https://github.com/nodejs/TSC/blob/main/WORKING_GROUPS.md#i18n).

If your Language is not yet enabled, we recommend to enable it in the PR (on the `config.json` file). And before merging your PR the language should be disabled again, if it was disabled before.

You can of course contest that. Also, please refer the general [Contribution Guidelines](CONTRIBUTING.md) before opening a PR.

We also recommend you to run `npm run lint` to see if your changes contain any Linting Errors.

If you have questions, reach out the Nodejs.dev team!

## F.A.Q. and Troubleshooting

#### When I enable my Language on `config.json` it gives an Error

Make sure a Locale (JSON) file for that language also exists within `src/i18n/locales`

#### I enabled the Language but nothing happened

When enabling Languages please restart your Development server.
