import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { useCopyToClipboard } from '../useCopyToClipboard';

describe('useCopyToClipboard', () => {
  const HookRenderer = ({
    textToCopy = 'textToCopy',
  }: {
    textToCopy?: string;
  }): JSX.Element => {
    const copy = useCopyToClipboard();
    return <button type="button" onClick={() => copy(textToCopy)} />;
  };

  it('should call navigator clipboard writeText with `test`', () => {
    const navigatorClipboardWriteTextSpy = jest.fn();

    Object.defineProperty(navigator, 'clipboard', {
      writable: true,
      value: {
        writeText: navigatorClipboardWriteTextSpy,
      },
    });

    render(<HookRenderer textToCopy="test" />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(navigatorClipboardWriteTextSpy).toHaveBeenCalledWith('test');
  });
});
