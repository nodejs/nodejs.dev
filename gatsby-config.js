const path = require('path');

require('dotenv').config();

const config = require('./src/config.json');
const { localesAsString, defaultLanguage } = require('./locales');

const markdownSources = [
  'about',
  'api',
  'get-involved',
  'download',
  'homepage',
  'learn',
  'blog',
];

const gatsbyFsMarkdownSources = markdownSources.map(name => ({
  resolve: 'gatsby-source-filesystem',
  options: {
    name,
    path: path.resolve(__dirname, `./content/${name}`),
  },
}));

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
  },
  plugins: [
    'gatsby-plugin-remove-serviceworker',
    'gatsby-plugin-typescript',
    'gatsby-plugin-catch-links',
    '@skagami/gatsby-plugin-dark-mode',
    'gatsby-transformer-yaml',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-sharp',
    // This generates the redirects for the I18N redirects
    // It also creates meta redirects for any usage of `createRedirect`
    // 'gatsby-plugin-meta-redirect', replaced by local plugin because it breaks on windows
    {
      resolve: 'redirect',
    },
    ...gatsbyFsMarkdownSources,
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
        name: 'data',
        path: path.resolve(__dirname, './src/data'),
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        // Disables Babel Loader for MDX which fastens the build time
        lessBabel: true,
        gatsbyRemarkPlugins: [
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
        fields: [
          'slug',
          'title',
          'displayTitle',
          'description',
          'category',
          'tableOfContents',
        ],
        resolvers: {
          Mdx: {
            id: node => node.id,
            title: node => node.frontmatter.title,
            displayTitle: node => node.frontmatter.displayTitle,
            description: node => node.frontmatter.description,
            slug: node => node.fields.slug,
            category: node => node.fields.categoryName,
            tableOfContents: node => {
              if (node.frontmatter.category === 'api') {
                // We only do the Table of Contents resolution for API pages as for Learn pages searching by the title and description should be enough
                // We should probably do a better way of calculating the Table of Contents for API pages as maybe creating a field in the frontmatter
                return [...node.internal.content.matchAll(/^#{2,5} .*/gm)]
                  .map(match => match[0].replace(/^#{2,5} /, ''))
                  .join('\n');
              }

              return '';
            },
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
        configPath: path.resolve(__dirname, './src/i18n/config.json'),
        prefixDefault: true,
        locales: localesAsString,
      },
    },
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
            {
              family: 'Open Sans',
              variants: [
                '300',
                '300i',
                '400',
                '400i',
                '600',
                '600i',
                '900',
                '900i',
              ],
              fontDisplay: 'swap',
              strategy: 'selfHosted',
            },
          ],
        },
        formats: ['woff2'],
        useMinify: true,
        usePreload: true,
        usePreconnect: true,
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
  ],
};

module.exports = gatsbyConfig;
