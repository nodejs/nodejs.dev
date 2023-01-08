import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import BrandingPage from '..';
import { createBrandingData } from '../../../__fixtures__/page';

const mockData = createBrandingData();
expect.extend(toHaveNoViolations);

describe('Branding page', () => {
  it('renders correctly', () => {
    const { container } = render(<BrandingPage data={mockData.data} />);
    expect(container).toMatchSnapshot();
  });
  it('should have no a11y violations', async () => {
    const { container } = render(<BrandingPage data={mockData.data} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
