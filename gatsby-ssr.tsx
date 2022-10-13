import * as React from 'react';
import ReactIntlProvider from './src/providers/ReactIntl';
import { defaultLanguage, defaultMessages } from './locales';
import type { WrapPageElementSSR } from './src/types';

export const wrapPageElement: WrapPageElementSSR = ({ element, props }) => {
  const { locale = defaultLanguage, intlMessages = defaultMessages } =
    props.pageContext;

  return (
    <ReactIntlProvider locale={locale} messages={intlMessages}>
      {element}
    </ReactIntlProvider>
  );
};
