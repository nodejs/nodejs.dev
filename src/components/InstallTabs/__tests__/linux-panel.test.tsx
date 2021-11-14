import React from 'react';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import LinuxPanel from '../LinuxPanel';

describe('Tests for LinuxPanel component', () => {
  it('renders correctly', async () => {
    const { container } = render(<LinuxPanel />);
    await waitForElementToBeRemoved(screen.getByText('Loading...'));
    expect(container).toMatchSnapshot();
  });
});
