import * as React from 'react';
import ReactIntlProvider from './src/containers/ReactIntl';
import { defaultLanguage } from './util-node/locales';
import type { WrapPageElementBrowser } from './src/types';

declare global {
  interface Window {
    locations: string[];
    previousPath: string;
  }
}

export const onRouteUpdate = () => {
  window.locations = window.locations || [document.referrer];
  window.locations.push(window.location.href);
  window.previousPath = window.locations[window.locations.length - 1];
};

export const wrapPageElement: WrapPageElementBrowser = ({ element, props }) => {
  const { locale = defaultLanguage, intlMessages = {} } = props.pageContext;

  // eslint-disable-next-line react/jsx-props-no-spreading
  return (
    <ReactIntlProvider locale={locale} messages={intlMessages}>
      {element}
    </ReactIntlProvider>
  );
};
