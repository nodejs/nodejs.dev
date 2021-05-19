import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/themes/prism-okaidia.css';
import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import '../../styles/tokens.scss';
import '../../styles/layout.scss';
import '../../styles/mobile.scss';
import SEO from '../Seo';

interface Props {
  children: React.ReactNode;
  title?: string;
  description?: string;
  img?: string;
  href?: string;
  showFooter?: boolean;
  location?: Location;
}

const Layout = ({
  children,
  title,
  description,
  img,
  showFooter = true,
  location,
}: Props): JSX.Element => {
  return (
    <>
      <SEO
        title={title}
        description={description}
        location={location}
        img={img}
      />
      <div className="layout-container">
        <Header />
        {children}
        {showFooter && <Footer />}
      </div>
    </>
  );
};

export default Layout;
