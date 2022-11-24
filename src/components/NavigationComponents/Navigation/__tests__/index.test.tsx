import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import NavigationContainer from '../index';

describe('Navigation component', (): void => {
  it('renders correctly', (): void => {
    const isOpen = false;
    const label = 'API Navigation';
    const { container } = render(
      <NavigationContainer
        isOpen={isOpen}
        toggleNavigation={jest.fn()}
        label={label}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it('utilizes click handler correctly', async () => {
    const isOpen = false;
    const label = 'API Navigation';
    const mockHandler = jest.fn();

    render(
      <NavigationContainer
        isOpen={isOpen}
        toggleNavigation={mockHandler}
        label={label}
      />
    );

    await userEvent.click(screen.getByText('Menu'));

    expect(mockHandler.mock.calls.length).toBe(1);
  });
});
