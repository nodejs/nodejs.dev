import React, { useMemo } from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import DefaultLayout from '../layouts/default';
import { ArticleComponents, BlogComponents } from '../components';
import BlogNavigation from '../navigations/blog';
import { blogPath } from '../../pathPrefixes';
import { BlogCategory, BlogTemplateContext } from '../types';
import getPaginationPath from '../../util-node/getPaginationPath';
import styles from '../styles/templates/blog.module.scss';

const blogHomeSection = {
  title: 'blog.categories.all',
  slug: blogPath,
};

const getCategoryName = (category: string) =>
  category.length ? `${blogPath}${category}/` : blogPath;

const parseNavigationData = (c: BlogCategory[]) =>
  c.map(({ node }) => ({ title: node.slug, slug: `${blogPath}${node.name}/` }));

interface Props {
  pageContext: BlogTemplateContext;
}

const BlogTemplate = ({
  pageContext: { category, categories, pagination, posts },
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

  const shouldShowPagination = pagination.total > 1;

  return (
    <DefaultLayout title="Blogs at Nodejs">
      <main className="grid-container">
        <BlogNavigation
          currentCategory={getCategoryName(currentCategory.name)}
          categories={[blogHomeSection, ...parseNavigationData(categories)]}
        />
        <div className={styles.blogGridContainer}>
          <div className={styles.blogCategoryHeader}>
            <h1>{currentCategory.slug}</h1>
            <ArticleComponents.BlockQuote>
              {currentCategory.description}
            </ArticleComponents.BlockQuote>
          </div>
          <div className={styles.blogItems}>
            {posts.map(edge => (
              <BlogComponents.BlogCard
                key={edge.node.fields.slug}
                data={edge}
              />
            ))}
          </div>
          {shouldShowPagination && (
            <BlogComponents.Pagination
              currentPage={pagination.current}
              hrefBuilder={getPaginationPath(blogPath, category?.name)}
              pageCount={pagination.total}
              wrapperClassName={styles.blogPaginationWrapper}
            />
          )}
        </div>
      </main>
    </DefaultLayout>
  );
};

export default injectIntl(BlogTemplate);
