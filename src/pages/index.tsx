import React from 'react';
import Layout from '../components/layout';

export default () => {
  const title = 'PAGE NOT FOUND';
  const description = 'You have hit a route that does not exist.';

  return (
    <Layout title={title} description={description}>
      <article style={{ width: '100%' }} className="article-reader">
        Landing page
      </article>
    </Layout>
  );
};
