import * as React from 'react';
import ReactIntlProvider from './src/containers/ReactIntl';
import type { WrapPageElementSSR } from './src/types';

// eslint-disable-next-line import/prefer-default-export
export const wrapPageElement: WrapPageElementSSR = ({ element, props }) => {
  const { locale, intlMessages } = props.pageContext;

  // eslint-disable-next-line react/jsx-props-no-spreading
  return (
    <ReactIntlProvider locale={locale} messages={intlMessages}>
      {element}
    </ReactIntlProvider>
  );
};
