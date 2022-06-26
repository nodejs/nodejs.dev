import { graphql } from 'gatsby';
import React from 'react';
import BlogCard from '../components/BlogCard';
import Layout from '../components/Layout';
import { BlogPostsList, BlogMetaData, BlogCategory } from '../types';

type Props = {
  data: BlogPostsList;
};

type GroupedPosts = {
  [key: BlogCategory['name']]: {
    posts: BlogMetaData[];
  } & BlogCategory;
};

const groupPostsByCategory = ({ blogs }: BlogPostsList): GroupedPosts => {
  const postsByCategory = blogs.edges.reduce((acc, post) => {
    const { category } = post.node.frontmatter;

    if (!acc[category.name]) {
      acc[category.name] = {
        posts: [],
        ...category,
      };
    }

    acc[category.name].posts.push(post);

    return acc;
  }, {});

  return postsByCategory;
};

const AllBlogPosts = ({ data }: Props): JSX.Element => {
  const postsByCategory = groupPostsByCategory(data);

  return (
    <Layout title="Blogs at Nodejs">
      {Object.values(postsByCategory).map(({ posts, ...category }) => (
        <div key={category.name}>
          <div className="blog-category-container">
            <div>
              <h2>{category.slug}</h2>
              <span>{category.description}</span>
            </div>
          </div>
          <div className="blog-grid-container">
            {!posts.length && <h2>No blog posts under this category.</h2>}
            {posts.map(edge => (
              <BlogCard key={edge.node.fields.slug} data={edge} />
            ))}
          </div>
        </div>
      ))}
    </Layout>
  );
};

export const pageQuery = graphql`
  query AllBlogPostsPageQuery {
    blogs: allMdx(
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
            category {
              name
              slug
              description
            }
            blogAuthors {
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
