import * as React from 'react';
import ReactIntlProvider from './src/providers/ReactIntl';
import { defaultLanguage, defaultMessages } from './locales';
import type { WrapPageElementBrowser } from './src/types';

import './src/styles/index.scss';

export const wrapPageElement: WrapPageElementBrowser = ({ element, props }) => {
  const { locale = defaultLanguage, intlMessages = defaultMessages } =
    props.pageContext;

  return (
    <ReactIntlProvider locale={locale} messages={intlMessages}>
      {element}
    </ReactIntlProvider>
  );
};
