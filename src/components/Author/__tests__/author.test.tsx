import React from 'react';
import { render } from '../../../../test-utils.js';
import Author from '..';

describe('Author component', () => {
  it('renders correctly', () => {
    const username = 'test-author';
    const { container } = render(
      <Author index={1} username={username} size="60" />
    );
    expect(container).toMatchSnapshot();
  });

  it('does not render without a username', () => {
    const { container } = render(<Author index={0} username="" size="" />);
    expect(container).toMatchSnapshot();
  });
});
