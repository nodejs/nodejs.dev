import { graphql } from 'gatsby';
import React from 'react';
import BlogCard from '../components/BlogCard';
import Layout from '../components/Layout';
import { BlogPostsList, BlogCategory } from '../types';

type Props = {
  data: BlogPostsList & { category: BlogCategory };
};

const Blog = ({ data: { posts, category } }: Props): JSX.Element => (
  <Layout title="Blogs at Nodejs">
    <div>
      <div className="blog-category-container">
        <div className="blog-category-header">
          <h1>{category.slug}</h1>
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
  query ($categoryName: String!) {
    posts: allMdx(
      filter: {
        fileAbsolutePath: { regex: "/blog/" }
        fields: { categoryName: { eq: $categoryName } }
      }
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
    category: categoriesYaml(name: { eq: $categoryName }) {
      name
      slug
    }
  }
`;
