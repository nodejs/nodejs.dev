import React from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import { BlogCategories, BlogPosts } from '../types';
import BlogContainer from '../containers/BlogContainer';

interface Props {
  data: {
    posts: BlogPosts;
    categories: BlogCategories;
  };
}

const Blog = ({
  data: { posts, categories },
  intl,
}: Props & WrappedComponentProps): JSX.Element => (
  <Layout title="Blogs at Nodejs">
    <main className="grid-container">
      <BlogContainer
        posts={posts.edges}
        categories={categories.edges}
        currentCategory={{
          name: intl.formatMessage({ id: 'blog.title' }),
          slug: intl.formatMessage({ id: 'blog.title' }),
          description: intl.formatMessage({ id: 'blog.description' }),
        }}
      />
    </main>
  </Layout>
);

export default injectIntl(Blog);

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
