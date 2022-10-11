import React, { useMemo } from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import Layout from '../components/Layout';
import { BlogTemplateContext } from '../types';
import BlogContainer from '../containers/BlogContainer';

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
        <BlogContainer
          posts={posts}
          categories={categories}
          currentCategory={currentCategory}
        />
      </main>
    </Layout>
  );
};

export default injectIntl(BlogTemplate);
