import React from 'react';
import Article from '../Article';
import Layout from './index';
import AboutNavigation from '../../navigations/about';
import { AboutNavigationKeys, PageTableOfContents } from '../../types';

export interface ArticleLayoutProps {
  body: string;
  tableOfContents?: PageTableOfContents;
  title: string;
  description: string;
  authors: string[];
  location?: Location;
  editPath?: string;
  currentSlug?: AboutNavigationKeys;
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
  currentSlug,
  children,
  childrenPosition = 'after',
}: ArticleLayoutProps): JSX.Element => (
  <Layout title={title} description={description}>
    <main className="grid-container">
      {currentSlug && <AboutNavigation currentSlug={currentSlug} />}
      <Article
        title={title}
        body={body}
        authors={authors}
        editPath={editPath}
        tableOfContents={tableOfContents?.items || []}
        childrenPosition={childrenPosition}
      >
        {children}
      </Article>
    </main>
  </Layout>
);

export default ArticleLayout;
