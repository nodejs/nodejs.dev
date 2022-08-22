import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import NotFound from '../../src/pages/404';
import '../__mocks__/intersectionObserverMock';

expect.extend(toHaveNoViolations);

describe('404 page', () => {
  it('renders correctly', () => {
    const { container } = render(<NotFound />);
    expect(container).toMatchSnapshot();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<NotFound />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
