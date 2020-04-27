import { graphql } from 'gatsby';
import React from 'react';
import Article from '../components/article';
import Layout from '../components/layout';
import Navigation from '../components/navigation';
import { LearnPageContext, LearnPageData } from '../types';

import '../styles/article-reader.scss';
import '../styles/learn.scss';
import Footer from '../components/footer';

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
}: Props): React.ReactNode => (
  <React.Fragment>
    <main>
      <Layout title={title} description={description} showFooter={false}>
        <Navigation currentSlug={slug} sections={navigationData} />
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
  </React.Fragment>
);
export default LearnLayout;

export const query = graphql`
  query DocBySlug($slug: String!) {
    doc: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
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
