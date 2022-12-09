import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import HistoryPage from '../history';
import { createGeneralPageData } from '../../../__fixtures__/page';

const mockData = createGeneralPageData();
expect.extend(toHaveNoViolations);

describe('History Page', () => {
  it('renders correctly', () => {
    const { container } = render(<HistoryPage data={mockData.data} />);
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const pageContent = container.querySelector('main');

    expect(pageContent).toMatchSnapshot();
  });

  it('shold have no a11y violations', async () => {
    const { container } = render(<HistoryPage data={mockData.data} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
