import React from 'react';

import Header from '../../components/Header';
import SEO from '../../components/seo';
import DarkModeController from '../../util/DarkModeController';

import styles from './layout.module.scss';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  img?: string;
  withBg?: boolean;
  darkModeController?: DarkModeController;
}

const Layout = ({
  children,
  title,
  description,
  img,
  withBg,
  darkModeController = new DarkModeController(),
}: LayoutProps): JSX.Element => (
  <>
    <SEO title={title} description={description} img={img} />
    <Header darkModeController={darkModeController} />
    <main className={styles.mainContainer}>
      {children}
      {withBg && <div className={styles.bg} />}
    </main>
  </>
);

export default Layout;
