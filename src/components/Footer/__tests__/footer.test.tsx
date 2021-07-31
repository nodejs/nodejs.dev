import React from 'react';
import { render } from '@testing-library/react';
import Footer from '..';
import '../../../../test/__mocks__/intersectionObserverMock';

describe('Tests for Footer component', () => {
  it('renders correctly', () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });
});
