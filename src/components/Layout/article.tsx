import React from 'react';

import { TableOfContents } from '../../types';
import Article from '../Article';
import Layout from '.';
import SideNavBar, { SideNavBarKeys } from '../SideNavBar';

import '../../styles/article-reader.scss';

export interface ArticleLayoutProps {
  body: string;
  tableOfContents?: TableOfContents;
  title: string;
  description: string;
  authors: string[];
  location?: Location;
  editPath?: string;
  sidenavKey?: SideNavBarKeys;
  children?: React.ReactNode;
}

const ArticleLayout = ({
  editPath,
  body,
  tableOfContents,
  title,
  description,
  authors,
  sidenavKey,
  children,
}: ArticleLayoutProps): JSX.Element => {
  return (
    <Layout title={title} description={description}>
      <main className="grid-container">
        {sidenavKey && (
          <SideNavBar pageKey={sidenavKey} title="Community Pages" />
        )}
        <Article
          title={title}
          body={body}
          authors={authors}
          editPath={editPath}
          tableOfContents={tableOfContents}
        >
          {children}
        </Article>
      </main>
    </Layout>
  );
};

export default ArticleLayout;
