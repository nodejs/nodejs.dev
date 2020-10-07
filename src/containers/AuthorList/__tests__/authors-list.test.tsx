/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { render } from '@testing-library/react';
import AuthorsList from '..';

describe('AuthorsList component', () => {
  it('renders correctly', () => {
    const authors = ['test-author', 'another-test-author'];
    const { container } = render(<AuthorsList authors={authors} />);
    expect(container).toMatchSnapshot();
  });
  it('render empty div without an authors list', () => {
    const { container } = render(<AuthorsList authors={undefined} />);
    expect(container).toMatchSnapshot();
  });
});
