import { graphql } from 'gatsby';
import React, { ReactNode } from 'react';
import BlogCard from '../components/BlogCard';
import Layout from '../components/Layout';
import { BlogPostsList } from '../types';

type Props = {
  data: BlogPostsList;
  location: Location;
};

const AllBlogPosts = ({ data }: Props): ReactNode => (
  <Layout>
    <main className="blog-grid-container">
      {data.blogs.edges.map(node => (
        <BlogCard key={node.node.fields.slug} data={node} />
      ))}
    </main>
  </Layout>
);

export const pageQuery = graphql`
  query AllBlogPostsPageQuery {
    blogs: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/blog/" } }
      sort: { fields: [fields___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            authors
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
