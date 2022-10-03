import React from 'react';
import { render } from '@testing-library/react';
import DarkModeToggle from '../index';

describe('DarkModeToggle Component', () => {
  it('render dark mode toggle', () => {
    const { container } = render(<DarkModeToggle />);
    expect(container).toMatchSnapshot();
  });
});
