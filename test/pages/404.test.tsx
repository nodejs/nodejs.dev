import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../../src/pages/404';
import '../__mocks__/intersectionObserverMock';

describe('404 page', () => {
  it('renders correctly', () => {
    const { container } = render(<NotFound location={window.location} />);
    expect(container).toMatchSnapshot();
  });
});
