import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/themes/prism-okaidia.css';
import React from 'react';
import Header from './header';
import './layout.css';
import './mobile.css';
import SEO from './seo';

type Props = {
  children: React.ReactNode
  title?: string
  description?: string
  img?: string
}

const Layout = ({ children, title, description, img }: Props) => (
  <>
    <SEO title={title} description={description} img={img} />
    <Header />
    <main>{children}</main>
  </>
)

export default Layout
