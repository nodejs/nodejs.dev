import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/themes/prism-okaidia.css';
import React from 'react';
import Header from './header';
import Footer from './footer';
import '../styles/tokens.css';
import '../styles/layout.css';
import '../styles/mobile.css';
import SEO from './seo';
import DarkModeController from '../util/DarkModeController';

interface Props {
  children: React.ReactNode;
  title?: string;
  description?: string;
  img?: string;
  href?: string;
  showFooter?: boolean;
  location?: string;
  darkModeController?: DarkModeController;
}

const Layout = ({
  children,
  title,
  description,
  img,
  showFooter = true,
  darkModeController = new DarkModeController(),
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
