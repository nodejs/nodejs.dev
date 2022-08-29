import React from 'react';
import { graphql } from 'gatsby';
import Article from '../components/Article';
import Layout from '../components/Layout';
import DocsApiComponent from '../components/DocsApiComponent';
import Navigation from '../containers/Navigation';
import Stability from '../components/Stability';
import { ApiPageData, LearnPageContext } from '../types';

interface Props {
  data: ApiPageData;
  pageContext: LearnPageContext;
}

const components = { DocsApiComponent, blockquote: Stability };

const Api = ({
  data: {
    api: {
      frontmatter: { title, displayTitle, editPage },
      body,
      tableOfContents,
    },
  },
  pageContext: { slug, next, previous, navigationData },
}: Props): JSX.Element => (
  <Layout title={displayTitle}>
    <main className="grid-container">
      <Navigation
        currentSlug={slug}
        label="Secondary"
        sections={navigationData}
        category="api"
        isApiDocs
      />
      <Article
        title={title}
        tableOfContents={tableOfContents}
        body={body}
        next={next}
        previous={previous}
        absolutePath={editPage}
        authors={[]}
        extraComponents={components}
      />
    </main>
  </Layout>
);

export default Api;

export const query = graphql`
  query ($slug: String!) {
    api: mdx(fields: { slug: { eq: $slug }, categoryName: { eq: "api" } }) {
      body
      tableOfContents
      frontmatter {
        title
        displayTitle
        editPage
      }
      fields {
        slug
      }
    }
  }
`;
