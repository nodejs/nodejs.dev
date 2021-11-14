import React from 'react';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import MacOSPanel from '../MacOSPanel';

describe('Tests for MacOSPanel component', () => {
  it('renders correctly', async () => {
    const { container } = render(<MacOSPanel />);
    await waitForElementToBeRemoved(screen.getByText('Loading...'));
    expect(container).toMatchSnapshot();
  });
});
