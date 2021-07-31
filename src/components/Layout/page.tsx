import React from 'react';
import Article from '../Article';
import Layout from '.';

import '../../styles/page.scss';

interface Page {
  editPath?: string;
  html: string;
  tableOfContents: string;
  title: string;
  description: string;
  authors: string[];
  location?: Location;
}

export default function PageLayout(props: Page): JSX.Element {
  const {
    editPath,
    html,
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
          html={html}
          title={title}
          authors={authors}
          editPath={editPath}
          tableOfContents={tableOfContents}
        />
      </main>
    </Layout>
  );
}
