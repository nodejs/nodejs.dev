import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { highlight, languages } from 'prismjs';
import { sanitize } from 'isomorphic-dompurify';

import Codebox from '../index';

Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(),
  },
});

const navigatorClipboardSpy = jest.spyOn(navigator.clipboard, 'writeText');

afterEach(() => {
  jest.clearAllMocks();
});

describe('Codebox component (one lang)', (): void => {
  const code = 'const a = 1;';
  const textToCopy = sanitize(highlight(code, languages.js, 'js'));

  it('renders correctly', (): void => {
    const { container } = render(
      <Codebox>
        {{
          props: {
            className: 'language-js',
            children: textToCopy,
          },
        }}
      </Codebox>
    );
    expect(container).toMatchSnapshot();
  });

  it('renders correctly', async () => {
    render(
      <Codebox>
        {{
          props: {
            className: 'language-js',
            children: textToCopy,
          },
        }}
      </Codebox>
    );

    navigatorClipboardSpy.mockImplementationOnce(() => Promise.resolve());

    const buttonElement = screen.getByText('copy');
    userEvent.click(buttonElement);

    await screen.findByText('copied');

    expect(navigatorClipboardSpy).toHaveBeenCalledTimes(1);
    expect(navigatorClipboardSpy).toHaveBeenCalledWith(textToCopy.toString());
  });
});

describe('Codebox component (multiple langs)', (): void => {
  const code = `const http = require('http');
  -------
  import http from 'http';`;

  it('renders correctly', (): void => {
    const { container } = render(
      <Codebox>
        {{
          props: {
            className: 'language-js|language-js',
            children: code,
          },
        }}
      </Codebox>
    );
    expect(container).toMatchSnapshot();
  });

  it('switch between languages', async () => {
    render(
      <Codebox>
        {{
          props: {
            className: 'language-js|language-js',
            children: code,
          },
        }}
      </Codebox>
    );

    const buttonElement = screen.getByText('js');
    userEvent.click(buttonElement);

    await screen.findByText('js');

    expect(screen.getByText('js')).toBeInTheDocument();
  });
});
