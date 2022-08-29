require('dotenv').config();

const config = require('./src/config.json');
const { localesAsString, defaultLanguage } = require('./util-node/locales');

const gatsbyConfig = {
  pathPrefix: process.env.PATH_PREFIX,
  siteMetadata: {
    title: config.title,
    description: config.description,
    featuredImage: config.featuredImage,
    siteUrl: config.siteUrl,
    siteUrlNoSlash: config.siteUrlNoSlash,
  },
  mapping: {
    // gatsby-transformer-yaml transforms the id field into yamlId
    'Mdx.frontmatter.blogAuthors': `AuthorsYaml.yamlId`,
    'Mdx.frontmatter.category': `CategoriesYaml.name`,
    'Mdx.frontmatter.apiType': `ApiTypesYaml.name`,
  },
  plugins: [
    'gatsby-plugin-catch-links',
    '@skagami/gatsby-plugin-dark-mode',
    'gatsby-transformer-yaml',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: config.siteUrl,
      },
    },
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        cssLoaderOptions: {
          modules: {
            namedExport: false,
            exportLocalsConvention: 'camelCaseOnly',
          },
        },
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'learn',
        path: `${__dirname}/content/learn`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'sites',
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'homepage',
        path: `${__dirname}/content/homepage`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'community',
        path: `${__dirname}/content/community`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'blog',
        path: `${__dirname}/content/blog`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: `${__dirname}/src/data`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'about',
        path: `${__dirname}/content/about`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'download',
        path: `${__dirname}/content/download`,
      },
    },
    'gatsby-plugin-typescript',
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          { resolve: 'gatsby-remark-copy-linked-files' },
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              offsetY: '125',
              icon: '<svg aria-hidden="true" height="20" version="1.1" viewBox="0 0 16 16" width="20"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>',
              className: 'autolink-headers',
              maintainCase: false,
              removeAccents: true,
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 590,
              backgroundColor: 'transparent',
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-svgr',
      options: {
        prettier: true,
        svgoConfig: {
          plugins: ['prefixIds'],
        },
      },
    },
    {
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
      options: {
        fields: ['title', 'headings', 'description', 'slug'],
        resolvers: {
          Mdx: {
            id: node => node.id,
            title: node => node.frontmatter.title,
            headings: node => node.headings,
            description: node => node.frontmatter.description,
            slug: node => node.fields.slug,
          },
        },
        filter: node => ['api', 'learn'].includes(node.frontmatter.category),
      },
    },
    {
      // A plugin that introduces i18n support to Gatsby
      // We also patch this plugin (see /patches/)
      // @see https://www.gatsbyjs.com/plugins/gatsby-theme-i18n/
      resolve: `gatsby-theme-i18n`,
      options: {
        defaultLang: defaultLanguage,
        configPath: `${__dirname}/src/i18n/config.json`,
        prefixDefault: true,
        locales: localesAsString,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: config.title,
        short_name: config.title,
        start_url: '/',
        background_color: config.color,
        theme_color: config.color,
        display: config.display,
        icon: config.icon,
        cache_busting_mode: 'none',
      },
    },
    'gatsby-plugin-sitemap',
    'gatsby-plugin-meta-redirect',
  ],
};

// Note.: This implementation doesn't work with pathPrefixes (eg.: our staging pages)
// Which means, that the staging pages will not benefit from a SW
// It also makes sense to not use SW on Staging Pages as we want to keep testing them from time-to-time
// This will still work when building & serving gatsby locally
if (!gatsbyConfig.pathPrefix) {
  gatsbyConfig.plugins.push({
    // This is a temporary solution until (https://github.com/gatsbyjs/gatsby/pull/31542) gets merged
    // So we are able to use the official service worker again. This service worker supports latest Workbox
    resolve: 'gatsby-plugin-offline-next',
    options: {
      precachePages: [
        '/',
        '/*/learn/*',
        '/*/about/*',
        '/*/download/*',
        '/*/blog/*',
      ],
      globPatterns: ['**/icon-path*'],
    },
  });
}

module.exports = gatsbyConfig;
