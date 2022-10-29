import React from 'react';
import { render } from '@testing-library/react';
import Info from '../index';

describe('Info component', () => {
  it('should render correctly', () => {
    const { container } = render(<Info />);

    expect(container).toMatchSnapshot();
  });

  it('should support passing children into the component', () => {
    const { container } = render(<Info>This is an Info</Info>);

    expect(container).toMatchSnapshot();
  });
});
