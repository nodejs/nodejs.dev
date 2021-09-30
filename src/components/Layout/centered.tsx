import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/themes/prism-okaidia.css';
import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import '../../styles/tokens.scss';
import '../../styles/layout.scss';
import '../../styles/centered-layout.scss';
import '../../styles/mobile.scss';
import SEO from '../Seo';

interface Props {
  children: React.ReactNode;
  title?: string;
  description?: string;
  img?: string;
  href?: string;
  showFooter?: boolean;
  location?: string;
}

const CenteredLayout = ({
  children,
  title,
  description,
  img,
  showFooter = true,
}: Props): JSX.Element => {
  return (
    <>
      <SEO title={title} description={description} img={img} />
      <Header />
      <main className="main__centered">{children}</main>
      {showFooter && <Footer />}
    </>
  );
};

export default CenteredLayout;
