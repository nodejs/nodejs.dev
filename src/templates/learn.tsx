import { graphql } from 'gatsby';
import React from 'react';
import Article from '../components/Article';
import Layout from '../components/Layout';
import Navigation from '../containers/Navigation';
import { LearnPageContext, LearnPageData } from '../types';

import '../styles/article-reader.scss';
import '../styles/learn.scss';
import Footer from '../components/Footer';

interface Props {
  data: LearnPageData;
  pageContext: LearnPageContext;
  location: Location;
}
const LearnLayout = ({
  data: {
    doc: {
      frontmatter: { title, description },
      body,
      tableOfContents,
      fields: { authors },
    },
  },
  pageContext: { slug, next, previous, relativePath, navigationData },
  location,
}: Props): JSX.Element => {
  let previousSlug = '';

  if (typeof window !== 'undefined' && window.previousPath) {
    previousSlug =
      window.previousPath.split('/learn')[1]?.substr(1) ||
      'introduction-to-nodejs';
  }

  return (
    <>
      <Layout
        title={title}
        description={description}
        location={location}
        showFooter={false}
      >
        <main className="grid-container">
          <Navigation
            currentSlug={slug}
            previousSlug={previousSlug}
            label="Secondary"
            sections={navigationData}
            category="learn"
          />
          <Article
            title={title}
            body={body}
            tableOfContents={tableOfContents}
            next={next}
            authors={authors}
            previous={previous}
            relativePath={relativePath}
          />
        </main>
      </Layout>
      <Footer />
    </>
  );
};
export default LearnLayout;

export const query = graphql`
  query DocBySlug($slug: String!) {
    doc: mdx(
      fields: { slug: { eq: $slug } }
      frontmatter: { category: { eq: "learn" } }
    ) {
      id
      body
      tableOfContents
      frontmatter {
        title
        description
      }
      fields {
        slug
        authors
      }
    }
  }
`;
