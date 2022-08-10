import { LocalizedLink as Link } from 'gatsby-theme-i18n';
import React from 'react';
import Layout from '../components/Layout';

const NotFoundPage = (): JSX.Element => {
  const title = 'PAGE NOT FOUND';
  const description = 'You have hit a route that does not exist.';

  return (
    <Layout title="Page not found" description={description}>
      <main style={{ width: '100%', textAlign: 'center', marginTop: '150px' }}>
        <h1> {title}</h1>
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
};

export default NotFoundPage;
