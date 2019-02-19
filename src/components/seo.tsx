import { graphql, StaticQuery } from 'gatsby'
import React from 'react'
import { Helmet } from 'react-helmet'

type Props = {
  title?: string
  description?: string
  img?: string
}

const SEO = ({ title, description, img }: Props) => (
  <StaticQuery
    query={graphql`
      query SiteInfoQuery {
        site {
          siteMetadata {
            title
            description
            featuredImage
            url
          }
        }
      }
    `}
    render={data => (
      <Helmet
        title={title || data.site.siteMetadata.title}
        meta={[
          {
            name: 'description',
            content: `${description || data.site.siteMetadata.description}`,
          },

          { property: 'og:type', content: 'website' },
          {
            property: 'og:title',
            content: `${title || data.site.siteMetadata.title}`,
          },
          {
            property: 'og:description',
            content: `${description || data.site.siteMetadata.description}`,
          },
          {
            property: 'og:url',
            content: `${data.site.siteMetadata.url}`,
          },
          {
            property: 'og:site_name',
            content: `${title || data.site.siteMetadata.title}`,
          },
          {
            property: 'article:author',
            content: 'https://www.facebook.com/nodejsfoundation/',
          },
          {
            property: 'article:publisher',
            content: 'https://www.facebook.com/nodejsfoundation/',
          },
          {
            property: 'article:section',
            content: 'Node.js',
          },
          { property: 'og:image:type', content: 'image/png' },
          { property: 'og:image:width', content: '224' },
          { property: 'og:image:height', content: '256' },
          {
            property: 'og:image',
            content: `${img || data.site.siteMetadata.featuredImage}`,
          },
          {
            property: 'og:image:secure_url',
            content: `${img || data.site.siteMetadata.featuredImage}`,
          },
          {
            name: 'twitter:site',
            content: '@nodejs',
          },
          {
            name: 'twitter:creator',
            content: '@nodejs',
          },
          {
            name: 'twitter:title',
            content: `${title || data.site.siteMetadata.title}`,
          },
          {
            name: 'twitter:card',
            content: 'summary',
          },
          {
            name: 'twitter:image:1200',
            content: `${img || data.site.siteMetadata.featuredImage}`,
          },
          {
            name: 'twitter:image:630',
            content: `${img || data.site.siteMetadata.featuredImage}`,
          },
          {
            name: 'twitter:image',
            content: `${img || data.site.siteMetadata.featuredImage}`,
          },
          {
            name: 'twitter:description',
            content: `${description || data.site.siteMetadata.description}`,
          },
          {
            name: 'twitter:url',
            content: `${data.site.siteMetadata.url}`,
          },
          {
            name: 'twitter:image:alt',
            content: 'The Node.js Hexagon Logo',
          },
        ]}
      >
        <html lang="en" />
      </Helmet>
    )}
  />
)

export default SEO
