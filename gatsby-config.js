if (process.env.ENVIROMENT !== 'production') {
  require('dotenv').config()
}

// const contentfulConfig = {
//   spaceId: process.env.SPACE_ID,
//   accessToken: process.env.ACCESS_TOKEN,
// }

const config = require('./src/config')

module.exports = {
  pathPrefix: process.env.PATH_PREFIX,
  siteMetadata: {
    title: config.title,
    description: config.description,
    featuredImage: config.featuredImage,
    siteUrl: config.siteUrl,
    siteUrlNoSlash: config.siteUrlNoSlash,
  },
  plugins: [
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: config.siteUrl,
      },
    },
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `learn`,
        path: `${__dirname}/src/documentation/`,
        include: [`**/*.md`], // ignore files starting with a dot
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: config.title,
        short_name: config.title,
        start_url: '/',
        background_color: config.color,
        theme_color: config.color,
        display: config.display,
        icon: config.icon,
      },
    },
    'gatsby-plugin-offline',
    `gatsby-plugin-typescript`,
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: { js: 'javascript' },
              showLineNumbers: false,
              noInlineHighlight: false,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
        ],
      },
    },
    // {
    //   resolve: `gatsby-source-contentful`,
    //   options: contentfulConfig,
    // },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        query: `{
          site {
            siteMetadata {
              siteUrlNoSlash
            }
          }
          allSitePage {
            edges {
              node {
                path
              }
            }
          }
          allMarkdownRemark {
            edges {
              node {
                fields {
                  slug
                }
              }
            }
          }
        }`,
        serialize: ({ site, allSitePage, allMarkdownRemark }) => {
          let pages = []
          allSitePage.edges.map(edge => {
            pages.push({
              url: site.siteMetadata.siteUrlNoSlash + edge.node.path,
              changefreq: `daily`,
              priority: 0.7,
            })
          })
          allMarkdownRemark.edges.map(edge => {
            pages.push({
              url: `${site.siteMetadata.siteUrlNoSlash}/learn/${
                edge.node.fields.slug
              }`,
              changefreq: `daily`,
              priority: 0.7,
            })
          })

          return pages
        },
      },
    },
    {
      resolve: `gatsby-plugin-emotion`,
    },
  ],
}
