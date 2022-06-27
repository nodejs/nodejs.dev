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

const unknownAuthor = {
  name: 'Unknown',
};

const getUnknownCategory = (name: string) => ({
  name,
  slug: name.charAt(0).toUpperCase() + name.slice(1),
});

const groupPostsByCategory = ({ blogs }: BlogPostsList): GroupedPosts => {
  if (blogs.edges.length === 0) {
    return {};
  }

  const postsByCategory = blogs.edges.reduce((acc, post) => {
    const category = post.node.frontmatter.category
      ? post.node.frontmatter.category
      : getUnknownCategory(post.node.fields.categoryName || 'uncategorized');

    const blogAuthors = (post.node.frontmatter.blogAuthors || []).map(
      author => author || unknownAuthor
    );

    if (!acc[category.name]) {
      acc[category.name] = {
        posts: [],
        ...category,
      };
    }

    const clonedPost = { ...post };

    clonedPost.node.frontmatter.blogAuthors = blogAuthors;
    clonedPost.node.frontmatter.category = category;

    acc[category.name].posts.push(clonedPost);

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
            <div className="blog-category-header">
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
            categoryName
          }
        }
      }
    }
  }
`;

export default AllBlogPosts;
