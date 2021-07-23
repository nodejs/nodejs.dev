import React from 'react';

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ShellBox from '../index';

Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(),
  },
});

const navigatorClipboardSpy = jest.spyOn(navigator.clipboard, 'writeText');

afterEach(() => {
  jest.clearAllMocks();
});

describe('ShellBox component', (): void => {
  it('renders correctly', (): void => {
    const textToCopy = 'text to be copy';
    const { container } = render(
      <ShellBox textToCopy={textToCopy}>mock-children-code</ShellBox>
    );
    expect(container).toMatchSnapshot();
  });

  it('renders correctly', async () => {
    const textToCopy = 'text to be copy';
    const { getByText, findByText } = render(
      <ShellBox textToCopy={textToCopy}>mock-children-code</ShellBox>
    );

    navigatorClipboardSpy.mockImplementationOnce(() => Promise.resolve());

    const buttonElement = getByText('copy');
    userEvent.click(buttonElement);

    await findByText('copied');

    expect(getByText('done')).toBeInTheDocument();
    expect(navigatorClipboardSpy).toHaveBeenCalledTimes(1);
    expect(navigatorClipboardSpy).toHaveBeenCalledWith(textToCopy);
  });
});
