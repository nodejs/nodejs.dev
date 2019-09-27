import React from 'react';
import Hero from '../components/hero';
import Layout from '../templates/layout';

export default () => {
  const title = 'PAGE NOT FOUND';
  const description = 'You have hit a route that does not exist.';

  return (
    <Layout title={title} description={description}>
      <Hero title={title} />
      <article style={{ width: '100%' }} className="article-reader">
        <p>
          The page you're trying to access does not exist. Go back to the
          Homepage or find what you're looking for in the menu.
        </p>
        <p>
          Take me back to the <a href="/">Homepage</a> →
        </p>
      </article>
    </Layout>
  );
};
