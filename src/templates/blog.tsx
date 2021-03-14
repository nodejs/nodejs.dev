import { graphql } from 'gatsby';
import React from 'react';
import Article from '../components/Article';
import Layout from '../components/Layout';
import { LearnPageContext, LearnPageData } from '../types';

import '../styles/article-reader.scss';
import '../styles/learn.scss';
import Footer from '../components/Footer';

interface Props {
  data: LearnPageData;
  pageContext: LearnPageContext;
}
const LearnLayout = ({
  data,
  pageContext: { next, previous, relativePath },
}: Props): React.ReactNode => {
  const {
    doc: {
      frontmatter: { title, description },
      html,
      tableOfContents,
      fields: { authors },
    },
  } = data;
  return (
    <>
      <Layout title={title} description={description} showFooter={false}>
        {/* <main className="grid-container"> */}
        <Article
          title={title}
          html={html}
          tableOfContents={tableOfContents}
          next={next}
          authors={authors}
          previous={previous}
          relativePath={relativePath}
          blog
        />
        {/* </main> */}
      </Layout>
      <Footer />
    </>
  );
};
export default LearnLayout;

export const query = graphql`
  query BlogBySlug($slug: String!) {
    doc: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt(pruneLength: 5000)
      frontmatter {
        title
      }
      fields {
        slug
        authors
      }
    }
    recent: allMarkdownRemark(
      limit: 10
      filter: { fileAbsolutePath: { regex: "/blog/" } }
      sort: { fields: fields___date, order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
