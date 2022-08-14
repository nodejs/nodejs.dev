import { graphql } from 'gatsby';
import React from 'react';
import BlogCard from '../components/BlogCard';
import Layout from '../components/Layout';
import { BlogPostsList, BlogCategoriesList } from '../types';

type Props = {
  data: BlogPostsList & BlogCategoriesList;
};

const Blog = ({ data: { posts } }: Props): JSX.Element => (
  <Layout title="Blogs at Nodejs">
    <div>
      <div className="blog-category-container">
        <div className="blog-category-header">
          <h1>Node.js Blog</h1>
          <span>
            The latest Node.js news, case studies, tutorials, and resources.
          </span>
        </div>
      </div>
      <div className="blog-grid-container">
        {posts.edges.map(edge => (
          <BlogCard key={edge.node.fields.slug} data={edge} />
        ))}
      </div>
    </div>
  </Layout>
);

export default Blog;

export const pageQuery = graphql`
  query {
    posts: allMdx(
      filter: { fileAbsolutePath: { regex: "/blog/" } }
      sort: { fields: [fields___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            blogAuthors {
              id
              name
            }
            category {
              name
              slug
            }
          }
          fields {
            date(formatString: "MMMM DD, YYYY")
            slug
            readingTime {
              text
            }
          }
        }
      }
    }
    categories: allCategoriesYaml {
      edges {
        node {
          name
          slug
        }
      }
    }
  }
`;
