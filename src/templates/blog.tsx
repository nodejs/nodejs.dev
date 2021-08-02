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
const BlogLayout = ({
  data,
  pageContext: { next, previous, relativePath },
}: Props): JSX.Element => {
  const {
    blog: {
      frontmatter: { title, author },
      body,
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
            body={body}
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
export default BlogLayout;

export const query = graphql`
  query BlogBySlug($slug: String!) {
    blog: mdx(fields: { slug: { eq: $slug } }) {
      body
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
    recent: allMdx(
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
