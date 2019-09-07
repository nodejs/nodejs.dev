import React from 'react';
import Hero from '../components/hero';
import Layout from '../components/layout';

export default () => {
  const title = 'API Docs';
  const description = 'Come learn yourself something.';

  return (
    <Layout title={title} description={description}>
      <Hero title={title} />
      <article style={{ width: '100%' }} className="article-reader">
        <p>Welcome to the API Page!</p>
      </article>
    </Layout>
  );
};
