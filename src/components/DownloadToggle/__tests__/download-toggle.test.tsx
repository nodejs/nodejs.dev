import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DownloadToggle from '..';

describe('DownloadToggle component', (): void => {
  it('renders correctly', (): void => {
    const { container } = render(
      <DownloadToggle selected="LTS" handleClick={jest.fn()} />
    );

    expect(container).toMatchSnapshot();
  });

  it('utilizes click handler correctly', (): void => {
    const mockHandler = jest.fn();
    render(<DownloadToggle selected="LTS" handleClick={mockHandler} />);

    userEvent.click(screen.getByText('LTS'));
    userEvent.click(screen.getByText('Current'));

    expect(mockHandler.mock.calls.length).toBe(2);
  });
});
