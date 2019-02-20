import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import image from '../images/image.png'

import Header from './header'

import './layout.css';
import './mobile.css';
import 'prismjs/themes/prism-okaidia.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

type Props = {
  children: React.ReactNode
  title: string
  description: string
  author : string 
}

const Layout = ({ children, title, description, author }: Props) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={title}
          meta={[
            { name: 'description', content: description },
            { name: 'keywords', content: 'nodejs, javascript, documentation' },
            { name: 'title', content: title },
            { name:"twitter:card", content:"summary"},
            { name:"twitter:site", content:"@nodejs"},
            { name:"twitter:creator", content:`@${author}`},
            { property: 'og:title', content: title },
            { property: 'og:image', content: image },
            { property: 'og:image:type', content: 'image/png' },
            { property: 'og:image:alt', content: description },
            { property: 'og:image:width', content: '1200' },
            { property: 'og:image:height', content: '1200' },
          ]}
        >
          <html lang="en" />
        </Helmet>
        <Header siteTitle={data.site.siteMetadata.title} />
        <main>{children}</main>
      </>
    )}
  />
)

export default Layout
