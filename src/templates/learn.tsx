import { graphql } from 'gatsby';
import React from 'react';
import Article from '../components/article';
import Layout from './Layout';
import Navigation from '../components/navigation';
import { LearnPageContext, LearnPageData } from '../types';

import '../styles/learn.css';

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
  <main>
    <Layout title={title} description={description}>
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
