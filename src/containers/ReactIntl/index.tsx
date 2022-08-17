import React from 'react';
import { IntlProvider } from 'react-intl';

interface Props {
  children: React.ReactNode;
  locale: string;
  messages: Record<string, string>;
}

const ReactIntlProvider = ({ children, ...props }: Props) => (
  <IntlProvider locale={props.locale} messages={props.messages}>
    {children}
  </IntlProvider>
);

export default ReactIntlProvider;
