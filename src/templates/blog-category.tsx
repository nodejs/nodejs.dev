import { graphql } from 'gatsby';
import React from 'react';
import BlogCard from '../components/BlogCard';
import Layout from '../components/Layout';
import SideNavBar from '../components/SideNavBar';
import { getNavigationData } from '../pages/blog';
import { BlogPostsList, BlogCategory, BlogCategoriesList } from '../types';
import styles from '../styles/blog.module.scss';

type Props = {
  data: BlogPostsList & { category: BlogCategory } & BlogCategoriesList;
};

const Blog = ({
  data: { posts, category, categories },
}: Props): JSX.Element => (
  <Layout title="Blogs at Nodejs">
    <main className="grid-container">
      <SideNavBar
        items={getNavigationData(categories)}
        pageKey={`blog/${category.name}/`}
        title="Blog Categories"
      />
      <div className={styles.blogGridContainer}>
        <div className={styles.blogCategoryHeader}>
          <h2>{category.slug}</h2>
          <span>{category.description}</span>
        </div>
        <div className={styles.blogItems}>
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
