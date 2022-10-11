import React from 'react';
import BlogCard from '../../components/BlogCard';
import BlogNavigation from '../../navigations/blog';
import { blogPath } from '../../../pathPrefixes';
import { BlogPost, BlogCategory } from '../../types';
import styles from './index.module.scss';
import BlockQuote from '../../components/BlockQuote';

type Props = {
  posts: BlogPost[];
  categories: BlogCategory[];
  currentCategory: BlogCategory['node'];
};

const blogHomeSection = {
  title: 'blog.categories.all',
  slug: blogPath,
};

const getCategoryName = (category: string) =>
  category.length ? `${blogPath}${category}/` : blogPath;

const parseNavigationData = (categories: BlogCategory[]) =>
  categories.map(({ node }) => ({
    title: node.slug,
    slug: `${blogPath}${node.name}/`,
  }));

const BlogContainer = ({ categories, posts, currentCategory }: Props) => (
  <>
    <BlogNavigation
      currentCategory={getCategoryName(currentCategory.name)}
      categories={[blogHomeSection, ...parseNavigationData(categories)]}
    />
    <div className={styles.blogGridContainer}>
      <div className={styles.blogCategoryHeader}>
        <h1>{currentCategory.slug}</h1>
        <BlockQuote>
          <span>{currentCategory.description}</span>
        </BlockQuote>
      </div>
      <div className={styles.blogItems}>
        {posts.map(edge => (
          <BlogCard key={edge.node.fields.slug} data={edge} />
        ))}
      </div>
    </div>
  </>
);

export default BlogContainer;
