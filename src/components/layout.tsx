import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/themes/prism-okaidia.css';
import React from 'react';
import Header from './header';
import Controls from './controls';
import '../styles/tokens.css';
import '../styles/layout.css';
import '../styles/mobile.css';
import SEO from './seo';

interface Props {
  children: React.ReactNode;
  title?: string;
  description?: string;
  img?: string;
  href: string;
}

const Layout = ({
  children,
  title,
  description,
  img,
  location,
}: Props): JSX.Element => {
  return (
    <React.Fragment>
      <SEO title={title} description={description} img={img} />
      <Header />
      <Controls />
      {children}
    </React.Fragment>
  );
};

export default Layout;
