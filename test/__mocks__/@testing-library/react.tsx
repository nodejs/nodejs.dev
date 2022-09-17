import React from 'react';
import { IntlProvider } from 'react-intl';
import messages from '../../../src/i18n/locales/en.json';

const {
  render: rtlRender,
  screen,
  fireEvent,
  waitFor,
} = jest.requireActual('@testing-library/react');

const render = (
  ui: React.ReactElement,
  { locale = 'en', ...renderOptions } = {}
) => {
  // eslint-disable-next-line react/prop-types
  const ProviderComponent = ({ children }: { children: React.ReactNode }) => (
    // eslint-disable-next-line react/jsx-filename-extension
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  );

  return rtlRender(ui, {
    wrapper: ProviderComponent,
    ...renderOptions,
  });
};

export { render, screen, fireEvent, waitFor };
