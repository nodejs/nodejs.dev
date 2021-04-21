import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { ThemeToggler } from 'gatsby-plugin-dark-mode';
import Header from '..';
import { useMediaQuery } from '../../../hooks/useMediaQuery';

// mock dark mode module for controlling dark mode HOC behaviour
jest.mock('gatsby-plugin-dark-mode', () => ({
  ThemeToggler: jest.fn(),
}));

// mock useMediaQuery hook for emulating mobile device
jest.mock('../../../hooks/useMediaQuery', () => ({
  useMediaQuery: jest.fn(),
}));

// mock callback that actually toggles dark mode
let toggleThemeMock: jest.Mock;

// mock ThemeToggler HOC in order to pass mocked "toggleTheme" prop
ThemeToggler.mockImplementation(
  // eslint-disable-next-line react/display-name
  (props: { children: unknown }): JSX.Element => (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <props.children theme="" toggleTheme={toggleThemeMock} />
  )
);

describe('Tests for Header component', () => {
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useMediaQuery.mockReturnValue(false);
    toggleThemeMock = jest.fn();
  });

  afterEach(() => {
    toggleThemeMock.mockClear();
  });

  it('renders correctly', () => {
    const { container } = render(<Header />);
    expect(container).toMatchSnapshot();
  });

  it('renders shorter menu items for mobile', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useMediaQuery.mockReturnValue(true);
    const { container } = render(<Header />);

    expect(container).toMatchSnapshot();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useMediaQuery.mockClear();
  });

  describe('Theme color switcher', () => {
    it('switches color theme to dark', () => {
      const { container } = render(<Header />);
      const toggler = container.querySelector('i.light-mode-only') as Element;

      fireEvent.click(toggler);

      expect(toggleThemeMock).toHaveBeenCalledWith('dark');
    });

    it('switches color theme to light', () => {
      const { container } = render(<Header />);
      const toggler = container.querySelector('i.dark-mode-only') as Element;

      fireEvent.click(toggler);

      expect(toggleThemeMock).toHaveBeenCalledWith('light');
    });

    it('ignore key presses on color switcher', () => {
      const { container } = render(<Header />);
      const toggler = container.querySelector('i.light-mode-only') as Element;

      fireEvent.keyPress(toggler, { key: 'Enter', code: 13, charCode: 13 });

      expect(toggleThemeMock).toHaveBeenCalledTimes(0);
    });

    it('skips rendering in case no theme value was provided from plugin', () => {
      ThemeToggler.mockImplementation(
        // eslint-disable-next-line react/display-name
        (props: { children: unknown }): JSX.Element => (
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          <props.children theme={null} toggleTheme={toggleThemeMock} />
        )
      );

      const { container } = render(<Header />);
      expect(container).toMatchSnapshot();
    });
  });
});
