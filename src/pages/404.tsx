import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/Layout';
import '../styles/not-found.scss';

interface Props {
  location: Location;
}

export default function NotFoundPage({ location }: Props): JSX.Element {
  const title = 'PAGE NOT FOUND';
  const description = 'You have hit a route that does not exist.';

  return (
    <Layout title={title} description={description}>
      <h1 className="not-found">page not found</h1>
      <main style={{ width: '100%' }} className="article-reader">
        <p>
          The page you are trying to access does not exist. Go back to the
          Homepage or find what you&apos;re looking for in the menu.
        </p>
        <p>
          Take me back to the <Link to="/">Homepage</Link>
        </p>
      </main>
    </Layout>
  );
}
