import { graphql } from 'gatsby';
import React from 'react';
import Article from '../components/Article';
import Layout from '../components/Layout';
import { BlogPageData, BlogPageContext } from '../types';

import '../styles/article-reader.scss';
import '../styles/learn.scss';
import Footer from '../components/Footer';

interface Props {
  data: BlogPageData;
  pageContext: BlogPageContext;
}
const LearnLayout = ({
  data,
  pageContext: { next, previous, relativePath },
}: Props): JSX.Element => {
  const {
    blog: {
      frontmatter: { title, author },
      html,
      excerpt,
      fields: { date },
    },
  } = data;
  return (
    <>
      <Layout title={title} description={excerpt} showFooter={false}>
        <main className="blog-container">
          <Article
            title={title}
            html={html}
            next={next}
            authors={author}
            previous={previous}
            relativePath={relativePath}
            blog
            date={date}
          />
        </main>
      </Layout>
      <Footer />
    </>
  );
};
export default LearnLayout;

export const query = graphql`
  query BlogBySlug($slug: String!) {
    blog: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt(pruneLength: 500)
      frontmatter {
        title
        author {
          id
          name
          url
        }
      }
      fields {
        slug
        date(formatString: "MMMM DD, YYYY")
      }
    }
    recent: allMarkdownRemark(
      limit: 10
      filter: {
        frontmatter: { title: { ne: "mock" }, category: { eq: "blog" } }
      }
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
