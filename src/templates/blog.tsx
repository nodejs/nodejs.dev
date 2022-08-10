import { graphql } from 'gatsby';
import React from 'react';
import Article from '../components/Article';
import Layout from '../components/Layout';
import { BlogPageData, BlogPageContext } from '../types';

import '../styles/article-reader.scss';
import '../styles/learn.scss';
import RecentPosts from '../components/RecentPosts';

interface Props {
  data: BlogPageData;
  pageContext: BlogPageContext;
}

const BlogLayout = ({
  data: {
    blog: {
      frontmatter: { title, blogAuthors },
      body,
      excerpt,
      fields: { date },
    },
    recent: { edges: recentPosts },
  },
  pageContext: { next, previous, relativePath },
}: Props): JSX.Element => (
  <Layout title={title} description={excerpt}>
    <main className="grid-container blog-container">
      <RecentPosts posts={recentPosts} />
      <Article
        title={title}
        body={body}
        next={next}
        authors={blogAuthors}
        previous={previous}
        relativePath={relativePath}
        blog
        date={date}
      />
    </main>
  </Layout>
);

export default BlogLayout;

export const query = graphql`
  query ($slug: String!) {
    blog: mdx(fields: { slug: { eq: $slug } }) {
      body
      excerpt(pruneLength: 500)
      frontmatter {
        title
        blogAuthors {
          id
          name
          website
        }
      }
      fields {
        slug
        date(formatString: "MMMM DD, YYYY")
      }
    }
    recent: allMdx(
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
