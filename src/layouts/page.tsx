import React from 'react';
import Article from '../sections/Article';
import Layout from './default';
import { PageTableOfContents } from '../types';

interface Page {
  editPath?: string;
  body: string;
  tableOfContents: PageTableOfContents;
  title: string;
  description: string;
  authors: string[];
  location?: Location;
}

const PageLayout = ({
  editPath,
  body,
  tableOfContents,
  title,
  description,
  authors,
}: Page): JSX.Element => (
  <Layout title={title} description={description}>
    <main className="page">
      <Article
        body={body}
        title={title}
        authors={authors}
        editPath={editPath}
        tableOfContents={tableOfContents ? tableOfContents.items : []}
      />
    </main>
  </Layout>
);

export default PageLayout;
