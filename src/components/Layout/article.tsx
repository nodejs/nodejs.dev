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
  childrenPosition?: 'before' | 'after';
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
  childrenPosition = 'after',
}: ArticleLayoutProps): JSX.Element => (
  <Layout title={title} description={description}>
    <main className="grid-container">
      {sidenavKey && <SideNavBar pageKey={sidenavKey} />}
      <Article
        title={title}
        body={body}
        authors={authors}
        editPath={editPath}
        tableOfContents={tableOfContents ? tableOfContents.items : []}
        childrenPosition={childrenPosition}
      >
        {children}
      </Article>
    </main>
  </Layout>
);

export default ArticleLayout;
