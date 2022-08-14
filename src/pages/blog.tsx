import React from 'react';
import { FormattedMessage } from 'react-intl';
import { graphql } from 'gatsby';
import BlogCard from '../components/BlogCard';
import Layout from '../components/Layout';
import SideNavBar from '../components/SideNavBar';
import { BlogPostsList, BlogCategoriesList, SideNavBarItem } from '../types';

type Props = {
  data: BlogPostsList & BlogCategoriesList;
};

export const getNavigationData = (
  categories: BlogCategoriesList['categories']
): SideNavBarItem[] =>
  categories.edges.map(({ node }) => ({
    title: node.slug,
    slug: `blog/${node.name}/`,
  }));

const Blog = ({ data: { posts, categories } }: Props): JSX.Element => (
  <Layout title="Blogs at Nodejs">
    <main className="grid-container">
      <SideNavBar
        items={getNavigationData(categories)}
        title="Blog Categories"
      />
      <div className="blog-grid-container">
        <div className="blog-category-header">
          <h2>Node.js Blog</h2>
          <span>
            The latest Node.js news, case studies, tutorials, and resources.
          </span>
        </div>
        <div className="blog-items">
          {posts.edges.map(edge => (
            <BlogCard key={edge.node.fields.slug} data={edge} />
          ))}
        </div>
      </div>
    </main>
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
