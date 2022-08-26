import React from 'react';

import { PageTableOfContents } from '../../types';
import Article from '../Article';
import Layout from '.';
import SideNavBar, { SideNavBarKeys } from '../SideNavBar';

export interface ArticleLayoutProps {
  body: string;
  tableOfContents?: PageTableOfContents;
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
