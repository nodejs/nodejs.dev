import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { useUpdateDocumentColorScheme } from '../useUpdateDocumentColorScheme';

describe('useUpdateDocumentColorScheme', () => {
  const HookRenderer = ({ theme }: { theme: string | null }): JSX.Element => {
    const updateColorScheme = useUpdateDocumentColorScheme();

    return <button type="button" onClick={() => updateColorScheme(theme)} />;
  };

  it('should update color scheme of document', () => {
    render(<HookRenderer theme="testTheme" />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(document.documentElement.style['color-scheme']).toEqual('testTheme');
  });
});
