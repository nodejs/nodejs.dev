import { graphql } from 'gatsby';
import React from 'react';
import Article from '../components/Article';
import Layout from '../components/Layout';
import Navigation from '../containers/Navigation';
import { LearnPageContext, LearnPageData } from '../types';

import '../styles/article-reader.scss';
import '../styles/learn.scss';
import Footer from '../components/Footer';

declare global {
  interface Window {
    previousPath: string;
  }
}

interface Props {
  data: LearnPageData;
  pageContext: LearnPageContext;
}
const LearnLayout = ({
  data: {
    doc: {
      frontmatter: { title, description },
      html,
      tableOfContents,
      fields: { authors },
    },
  },
  pageContext: { slug, next, previous, relativePath, navigationData },
}: Props): React.ReactNode => {
  let previousSlug = '';

  if (typeof window !== 'undefined') {
    if (window.previousPath)
      previousSlug =
        window.previousPath.split('/learn')[1]?.substr(1) ||
        'introduction-to-nodejs';
  }

  return (
    <>
      <main className="grid-container">
        <Layout title={title} description={description} showFooter={false}>
          <Navigation
            currentSlug={slug}
            label="Secondary"
            sections={navigationData}
            previousSlug={previousSlug}
          />
          <Article
            title={title}
            html={html}
            tableOfContents={tableOfContents}
            next={next}
            authors={authors}
            previous={previous}
            relativePath={relativePath}
          />
        </Layout>
      </main>
      <Footer />
    </>
  );
};
export default LearnLayout;

export const query = graphql`
  query DocBySlug($slug: String!) {
    doc: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      tableOfContents(absolute: false, pathToSlugField: "frontmatter.path")
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
