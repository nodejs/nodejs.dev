import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import NavigationContainer from '../index';

describe('Navigation component', (): void => {
  let isOpen: boolean;
  let label: string;

  beforeEach(() => {
    isOpen = false;
    label = 'API Navigation';
  });

  it('renders correctly', (): void => {
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
