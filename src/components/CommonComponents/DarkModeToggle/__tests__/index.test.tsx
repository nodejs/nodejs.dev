import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DarkModeToggle from '../index';

let mockCurrentTheme = '';
const mockToggleTheme = jest.fn().mockImplementation((newTheme: string) => {
  mockCurrentTheme = newTheme;
});

// mock dark mode module for controlling dark mode HOC behavior
jest.mock('@skagami/gatsby-plugin-dark-mode', () => ({
  __esModule: true,
  useTheme: () => [mockCurrentTheme, mockToggleTheme],
}));

describe('DarkModeToggle Component', () => {
  it('render dark mode toggle', () => {
    const { container } = render(<DarkModeToggle />);
    expect(container).toMatchSnapshot();
  });

  it('switches dark theme to light theme', async () => {
    mockCurrentTheme = 'dark';
    render(<DarkModeToggle />);
    const toggle = await screen.findByText('Toggle Dark Mode');
    await userEvent.click(toggle);
    expect(mockCurrentTheme).toBe('light');
  });

  it('switches light theme to dark theme', async () => {
    mockCurrentTheme = 'light';
    render(<DarkModeToggle />);
    const toggle = await screen.findByText('Toggle Dark Mode');
    await userEvent.click(toggle);
    expect(mockCurrentTheme).toBe('dark');
  });
});
