import React from 'react';
import { render } from '@testing-library/react';
import WorkingGroupsPage from '../working-groups';
import { createGeneralPageData } from '../../../__fixtures__/page';

const mockData = createGeneralPageData();

describe('Working Groups page', () => {
  it('renders correctly', () => {
    const { container } = render(<WorkingGroupsPage data={mockData.data} />);
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const pageContent = container.querySelector('main');

    expect(pageContent).toMatchSnapshot();
  });
});
