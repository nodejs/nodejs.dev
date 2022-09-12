import React from 'react';
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
  const currentCategory = category || {
    name: intl.formatMessage({ id: 'blog.title' }),
    slug: intl.formatMessage({ id: 'blog.title' }),
    description: intl.formatMessage({ id: 'blog.description' }),
  };

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
