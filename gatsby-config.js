const striptags = require('striptags');

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const config = require('./src/config');

// const myQuery = `{
//   allSitePage {
//     edges {
//       node {
//         # try to find a unique id for each node
//         # if this field is absent, it's going to
//         # be inserted by Algolia automatically
//         # and will be less simple to update etc.
//         objectID: id
//         component
//         path
//         componentChunkName
//         jsonName
//         internal {
//           type
//           contentDigest
//           owner
//         }
//       }
//     }
//   }
// }`;

const learnQuery = `
{
  allMarkdownRemark(filter: {fields: {slug: {ne: ""}}}, sort: {fields: [fileAbsolutePath], order: ASC}) {
    edges {
      node {
        frontmatter {
          title
          description
        }
        fields {
          slug
        }
        html
      }
    }
  }
}`;
const flatten = arr =>
  arr.map(({ node: { frontmatter } }) => ({
    ...frontmatter
  }))
const queries = [
  {
    indexName: `Learn`,
    query: learnQuery,
    transformer: ({ data }) => flatten(data.allMarkdownRemark.edges),







    // transformer: ({ data }) => {
    //   // 1. Break each post into an array of searchable text chunks.
    //   // 2. return a flattened array of all indices
    //   return data.allMarkdownRemark.edges.reduce((indices, post) => {
    //     // 1. description (if it exists)
    //     // 2. Each paragraph
    //     // console.log(post)
    //     const pChunks = striptags(post, [], "XXX_SPLIT_HERE_XXX").split(
    //       "XXX_SPLIT_HERE_XXX"
    //     )
    //     console.log(pChunks);

    //     // const chunks = pChunks.map(chnk => {
    //     //   // console.log(chnk);
    //     // });

    //     //   ({
    //     //   slug: post.fields.slug,
    //     //   title: post.frontmatter.title,
    //     // }))

    //     // if (post.frontmatter.description) {
    //     //   chunks.push({
    //     //     slug: post.fields.slug,
    //     //     title: post.frontmatter.title,
    //     //   })
    //     // }

    //     // const filtered = chunks.filter(chnk => !!chnk.excerpt)
    //     // console.log('result', ...filtered);
    //     return [...indices] //...filtered]

    //   }, [])
    // },
  },
]

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
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: config.siteUrl,
      },
    },
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'learn',
        path: `${__dirname}/src/documentation/`,
        include: ['**/*.md'], // ignore files starting with a dot
      },
    },

    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: config.title,
        /* eslint-disable @typescript-eslint/camelcase */
        short_name: config.title,
        start_url: '/',
        background_color: config.color,
        theme_color: config.color,
        /* eslint-disable @typescript-eslint/camelcase */
        display: config.display,
        icon: config.icon,
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-typescript',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              offsetY: '125',
              icon:
                '<svg aria-hidden="true" height="20" version="1.1" viewBox="0 0 16 16" width="20"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>',
              className: 'autolink-headers',
              maintainCase: false,
              removeAccents: true,
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: { js: 'javascript' },
              showLineNumbers: false,
              noInlineHighlight: false,
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 590,
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        query: `{
          site {
            siteMetadata {
              siteUrl,
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
          const sitePages = allSitePage.edges.map(edge => ({
            url: site.siteMetadata.siteUrlNoSlash + edge.node.path,
            changefreq: 'daily',
            priority: 0.7,
          }));
          const markdownRemark = allMarkdownRemark.edges.map(edge => ({
            url: `${site.siteMetadata.siteUrlNoSlash}/${edge.node.fields.slug}`,
            changefreq: 'daily',
            priority: 0.7,
          }));

          return sitePages.concat(markdownRemark);
        },
      },
    },
    {
      resolve: 'gatsby-plugin-emotion',
    },
    {
      resolve: 'gatsby-plugin-algolia',
      options: {
        appId: '1G9WNEG3D7', //process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: '5144fc916038631f8226a6b5acab39b7', //process.env.GATSBY_ALGOLIA_SEARCH_KEY,
        indexName: 'Learn', //process.env.ALGOLIA_INDEX_NAME,
        queries,
        chunkSize: 1000,
      },
    },
  ],
};