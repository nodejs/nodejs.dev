import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/Layout';
import '../styles/not-found.scss';

export default function NotFoundPage(): JSX.Element {
  const title = 'PAGE NOT FOUND';
  const description = 'You have hit a route that does not exist.';

  return (
    <Layout title={title} description={description}>
      <h1 className="not-found">PAGE NOT FOUND</h1>
      <main>
        <p>
          The page you&apos;re trying to access does not exist. Go back to the
          Homepage or find what you&apos;re looking for in the menu.
        </p>
        <p>
          Take me back to the <Link to="/">Homepage</Link>
        </p>
      </main>
    </Layout>
  );
}
