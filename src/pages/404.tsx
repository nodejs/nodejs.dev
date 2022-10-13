import React from 'react';
import { FormattedMessage } from 'react-intl';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';
import DefaultLayout from '../layouts/default';

const NotFoundPage = (): JSX.Element => (
  <DefaultLayout
    title="Page not found"
    description="You have hit a route that does not exist."
  >
    <main style={{ width: '100%', textAlign: 'center', marginTop: '150px' }}>
      <FormattedMessage id="pages.notFound.title" tagName="h1" />
      <FormattedMessage id="pages.notFound.description" tagName="p" />
      <p>
        <Link to="/">
          <FormattedMessage id="pages.notFound.takeMeBack" />
        </Link>
      </p>
    </main>
  </DefaultLayout>
);

export default NotFoundPage;
