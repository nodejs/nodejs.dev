import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import { BlogPosts, BlogCategory, BlogCategories } from '../types';
import BlogContainer from '../containers/BlogContainer';

interface Props {
  data: {
    posts: BlogPosts;
    categories: BlogCategories;
    category: BlogCategory['node'];
  };
}

const Blog = ({
  data: { posts, category, categories },
}: Props): JSX.Element => (
  <Layout title="Blogs at Nodejs">
    <main className="grid-container">
      <BlogContainer
        posts={posts.edges}
        categories={categories.edges}
        currentCategory={category}
      />
    </main>
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
      description
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
