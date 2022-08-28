import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

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

describe('Codebox component', (): void => {
  it('renders correctly', (): void => {
    const textToCopy = <p>text to be copy</p>;
    const { container } = render(
      <Codebox>
        {{
          props: {
            className: 'language-html',
            children: textToCopy,
          },
        }}
      </Codebox>
    );
    expect(container).toMatchSnapshot();
  });

  it('renders correctly', async () => {
    const textToCopy = <p>text to be copy</p>;

    render(
      <Codebox>
        {{
          props: {
            className: 'language-html',
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
