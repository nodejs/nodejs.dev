if (process.env.ENVIROMENT !== 'production') {
  require('dotenv').config()
}

// const contentfulConfig = {
//   spaceId: process.env.SPACE_ID,
//   accessToken: process.env.ACCESS_TOKEN,
// }

module.exports = {
  pathPrefix: process.env.PATH_PREFIX,
  siteMetadata: {
    title: 'Node.js',
  },
  plugins: [
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-helmet',
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
        name: 'nodejs.dev',
        short_name: 'nodejs.dev',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/favicon.png', // This path is relative to the root of the site.
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
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: { js: 'javascript' },
              showLineNumbers: false,
              noInlineHighlight: false,
            }
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
        ]
      }
    },
    // {
    //   resolve: `gatsby-source-contentful`,
    //   options: contentfulConfig,
    // },
    {
      resolve: `gatsby-plugin-emotion`,
    },
  ],
}
