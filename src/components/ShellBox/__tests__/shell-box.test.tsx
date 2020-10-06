import React from 'react';

import { fireEvent, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

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
    const { getByText } = render(
      <ShellBox textToCopy={textToCopy}>mock-children-code</ShellBox>
    );

    navigatorClipboardSpy.mockImplementationOnce(() => Promise.resolve());

    const buttonEle = getByText('copy');
    fireEvent.click(buttonEle);

    await waitFor(() => getByText('copied'));

    expect(getByText('done')).toBeInTheDocument();
    expect(navigatorClipboardSpy).toHaveBeenCalledTimes(1);
    expect(navigatorClipboardSpy).toHaveBeenCalledWith(textToCopy);
  });
});
