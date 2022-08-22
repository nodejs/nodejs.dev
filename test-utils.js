import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import fs from 'fs';

const messages = JSON.parse(
  fs.readFileSync('src/i18n/locales/en.json', 'utf8')
);

// ICU configuration for React-Intl
Intl.NumberFormat.format = new Intl.NumberFormat('en').format;
Intl.DateTimeFormat.format = new Intl.DateTimeFormat('en').format;

function render(ui, { locale = 'en', ...renderOptions } = {}) {
  // eslint-disable-next-line react/prop-types
  function Wrapper({ children }) {
    return (
      // eslint-disable-next-line react/jsx-filename-extension
      <IntlProvider locale={locale} messages={messages}>
        {children}
      </IntlProvider>
    );
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';

// override render method
export { render };
