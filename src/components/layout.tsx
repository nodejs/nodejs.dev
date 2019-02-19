import { graphql, StaticQuery } from 'gatsby'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import 'prismjs/themes/prism-okaidia.css'
import React from 'react'
import Helmet from 'react-helmet'
import './layout.css'
import './mobile.css'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => (
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
          title={data.site.siteMetadata.title}
          meta={[
            {
              name: 'description',
              content: `Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.`,
            },
            { name: 'keywords', content: 'sample, something' },
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
