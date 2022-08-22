import React from 'react';
import { render } from '@testing-library/react';
import GovernancePage from '../governance';
import { createGeneralPageData } from '../../../__fixtures__/page';

const mockData = createGeneralPageData();

describe('Governance Page', () => {
  it('renders correctly', () => {
    const { container } = render(<GovernancePage data={mockData.data} />);
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const pageContent = container.querySelector('main');

    expect(pageContent).toMatchSnapshot();
  });
});
