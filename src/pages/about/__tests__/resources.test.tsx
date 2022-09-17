import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import ResourcesPage from '..';
import { createResourcesData } from '../../../__fixtures__/page';

const mockData = createResourcesData();
expect.extend(toHaveNoViolations);

describe('Resources page', () => {
  it('renders correctly', () => {
    const { container } = render(<ResourcesPage data={mockData.data} />);
    expect(container).toMatchSnapshot();
  });
  it('should have no a11y violations', async () => {
    const { container } = render(<ResourcesPage data={mockData.data} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
