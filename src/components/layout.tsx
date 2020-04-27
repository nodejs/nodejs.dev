import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/themes/prism-okaidia.css';
import React from 'react';
import Header from './header';
import Footer from './footer';
import '../styles/tokens.scss';
import '../styles/layout.scss';
import '../styles/mobile.scss';
import SEO from './seo';

// NOTE: Quickly restores dark-mode state to mitigate onload flash
import darkModeController from '../util/darkModeController';

interface Props {
  children: React.ReactNode;
  title?: string;
  description?: string;
  img?: string;
  href?: string;
  showFooter?: boolean;
  location?: any;
}

const Layout = ({
  children,
  title,
  description,
  img,
  location,
  showFooter = true,
}: Props): JSX.Element => {
  return (
    <React.Fragment>
      <SEO title={title} description={description} img={img} />
      <Header darkModeController={darkModeController} />
      {children}
      {showFooter && <Footer />}
    </React.Fragment>
  );
};

export default Layout;
