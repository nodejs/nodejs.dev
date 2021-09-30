import React from 'react';
import Article from '../Article';
import Layout from '.';

import '../../styles/page.scss';
import { TableOfContents } from '../../types';

interface Page {
  editPath?: string;
  body: string;
  tableOfContents: TableOfContents;
  title: string;
  description: string;
  authors: string[];
  location?: Location;
}

export default function PageLayout(props: Page): JSX.Element {
  const {
    editPath,
    body,
    tableOfContents,
    title,
    description,
    authors,
    location,
  } = props;
  return (
    <Layout title={title} location={location} description={description}>
      <main className="page">
        <Article
          body={body}
          title={title}
          authors={authors}
          editPath={editPath}
          tableOfContents={tableOfContents}
        />
      </main>
    </Layout>
  );
}
