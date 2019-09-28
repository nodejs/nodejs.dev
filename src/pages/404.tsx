import React from 'react';
import Layout from '../templates/Layout/layout';

export default function NotFoundPage(): JSX.Element {
  const title = 'PAGE NOT FOUND';
  const description = 'You have hit a route that does not exist.';

  return (
    <Layout title={title} description={description}>
      <article style={{ width: '100%' }} className="article-reader">
        <p>
          The page you&apos;re trying to access does not exist. Go back to the
          Homepage or find what you&apos;re looking for in the menu.
        </p>
        <p>
          Take me back to the
          <a href="/">Homepage</a>
        </p>
      </article>
    </Layout>
  );
}
