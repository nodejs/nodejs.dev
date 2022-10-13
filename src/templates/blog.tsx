import React, { useMemo } from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import Layout from '../components/Layout';
import BlogCard from '../components/BlogCard';
import BlockQuote from '../components/BlockQuote';
import BlogNavigation from '../navigations/blog';
import { blogPath } from '../../pathPrefixes';
import { BlogCategory, BlogTemplateContext } from '../types';
import styles from '../styles/templates/blog.module.scss';

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

interface Props {
  pageContext: BlogTemplateContext;
}

const BlogTemplate = ({
  pageContext: { posts, category, categories },
  intl,
}: Props & WrappedComponentProps): JSX.Element => {
  const currentCategory = useMemo(() => {
    if (category) {
      return {
        name: category.name,
        slug: intl.formatMessage({ id: category.slug }),
        description: intl.formatMessage({ id: category.description }),
      };
    }

    return {
      name: '',
      slug: intl.formatMessage({ id: 'blog.title' }),
      description: intl.formatMessage({ id: 'blog.description' }),
    };
  }, [category, intl]);

  return (
    <Layout title="Blogs at Nodejs">
      <main className="grid-container">
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
      </main>
    </Layout>
  );
};

export default injectIntl(BlogTemplate);
