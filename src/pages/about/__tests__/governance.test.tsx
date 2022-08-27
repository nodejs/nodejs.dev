import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import GovernancePage from '../governance';
import { createGeneralPageData } from '../../../__fixtures__/page';

const mockData = createGeneralPageData();
expect.extend(toHaveNoViolations);

describe('Governance Page', () => {
  it('renders correctly', () => {
    const { container } = render(<GovernancePage data={mockData.data} />);
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const pageContent = container.querySelector('main');

    expect(pageContent).toMatchSnapshot();
  });

  it('shold have no a11y violations', async () => {
    const { container } = render(<GovernancePage data={mockData.data} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
