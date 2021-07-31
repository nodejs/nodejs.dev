import { graphql } from 'gatsby';
import React from 'react';
import BlogCard from '../components/BlogCard';
import Layout from '../components/Layout';
import { BlogPostsList } from '../types';

type Props = {
  data: BlogPostsList;
};

const AllBlogPosts = ({ data }: Props): JSX.Element => (
  <Layout title="Blogs at Nodejs">
    <main className="blog-grid-container">
      {!data.blogs.edges.length && <h1>No Blog Posts yet</h1>}
      {data.blogs.edges.map(node => (
        <BlogCard key={node.node.fields.slug} data={node} />
      ))}
    </main>
  </Layout>
);

export const pageQuery = graphql`
  query AllBlogPostsPageQuery {
    blogs: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/blog/" }
        frontmatter: { title: { ne: "mock" } }
      }
      sort: { fields: [fields___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            author {
              id
              name
            }
          }
          fields {
            date(formatString: "MMMM DD, YYYY")
            slug
          }
        }
      }
    }
  }
`;

export default AllBlogPosts;
