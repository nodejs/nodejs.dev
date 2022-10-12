import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LanguageSelector from '..';

describe('LanguageSelector component', () => {
  it('renders correctly', () => {
    const { container } = render(<LanguageSelector />);
    expect(container).toMatchSnapshot();
  });

  it('should show dropdown after button click', async () => {
    render(<LanguageSelector />);
    const trigger: Element = screen.getByRole('button');
    await userEvent.click(trigger);
    const list: Element = screen.getByRole('list');
    expect(list).toBeVisible();
  });
});
