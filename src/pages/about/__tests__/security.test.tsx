import React from 'react';
import { render } from '@testing-library/react';
import SecurityPage from '../security';
import { createGeneralPageData } from '../../../__fixtures__/page';
import { axe, toHaveNoViolations } from 'jest-axe';

const mockData = createGeneralPageData();
expect.extend(toHaveNoViolations);

describe('Security page', () => {
  it('renders correctly', () => {
    const { container } = render(<SecurityPage data={mockData.data} />);
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const pageContent = container.querySelector('main');

    expect(pageContent).toMatchSnapshot();
  });
  it('should have no a11y violations', async () => {
    const { container } = render(<SecurityPage data={mockData.data} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
