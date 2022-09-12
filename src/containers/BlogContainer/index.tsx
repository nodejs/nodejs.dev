import React from 'react';
import FeedIcon from '@mui/icons-material/Feed';
import BlogCard from '../../components/BlogCard';
import SideNavBar from '../../components/SideNavBar';
import { BlogPost, BlogCategory } from '../../types';
import styles from './index.module.scss';

const blogSectionTitle = {
  title: 'components.sideBar.section.blog',
  slug: '/blog/',
  icon: FeedIcon,
  isTitle: true,
};

const parseNavigationData = (categories: BlogCategory[]) =>
  categories.map(({ node }) => ({
    title: node.slug,
    slug: `/blog/${node.name}/`,
  }));

type Props = {
  posts: BlogPost[];
  categories: BlogCategory[];
  currentCategory: BlogCategory['node'];
};

const BlogContainer = ({ categories, posts, currentCategory }: Props) => (
  <>
    <SideNavBar
      items={[blogSectionTitle, ...parseNavigationData(categories)]}
      pageKey={`/blog/${currentCategory.name}/`}
    />
    <div className={styles.blogGridContainer}>
      <div className={styles.blogCategoryHeader}>
        <h2>{currentCategory.slug}</h2>
        <span>{currentCategory.description}</span>
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
