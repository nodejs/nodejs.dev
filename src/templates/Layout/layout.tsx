import React from 'react';

import Header from '../../components/Header/header';
import SEO from '../../components/seo';

import styles from './layout.module.scss';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  img?: string;
};

const Layout = ({ children, title, description, img }: LayoutProps) => (
	<>
		<SEO title={title} description={description} img={img} />
		<Header />
		<main className={styles.mainContainer}>{children}</main>
	</>
);

export default Layout;
