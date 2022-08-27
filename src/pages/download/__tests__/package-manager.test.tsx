import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import PackageManager from '../package-manager';
import { createGeneralPageData } from '../../../__fixtures__/page';

const mockData = createGeneralPageData();
expect.extend(toHaveNoViolations);

describe('Package Manager Page', () => {
  it('renders correctly', () => {
    const { container } = render(<PackageManager data={mockData.data} />);
    expect(container).toMatchSnapshot();
  });

  it('shold have no a11y violations', async () => {
    const { container } = render(<PackageManager data={mockData.data} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
