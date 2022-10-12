import React from 'react';
import { IntlProvider } from 'react-intl';

interface Props {
  locale: string;
  messages: Record<string, string>;
}

const ReactIntlProvider = ({
  children,
  ...props
}: React.PropsWithChildren<Props>) => (
  <IntlProvider locale={props.locale} messages={props.messages}>
    {children}
  </IntlProvider>
);

export default ReactIntlProvider;
