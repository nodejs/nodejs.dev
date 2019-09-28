import React from 'react';

import Header from '../../components/Header/header';
import SEO from '../../components/seo';

import styles from './layout.module.scss';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  img?: string;
  withBg?: boolean;
}

const Layout = ({
  children,
  title,
  description,
  img,
  withBg,
}: LayoutProps): JSX.Element => (
  <>
    <SEO title={title} description={description} img={img} />
    <Header />
    <main className={styles.mainContainer}>
      {children}
      {withBg && <div className={styles.bg} />}
    </main>
  </>
);

export default Layout;
