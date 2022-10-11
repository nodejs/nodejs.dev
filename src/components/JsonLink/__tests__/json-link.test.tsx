import React from 'react';
import { render } from '@testing-library/react';
import JsonLink from '..';

describe('EditLink component', () => {
  it('renders correctly', () => {
    const { container } = render(<JsonLink fileTitle="cli" version="v18" />);
    expect(container).toMatchSnapshot();
  });
});
