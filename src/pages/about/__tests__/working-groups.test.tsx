import React from 'react';
import { render } from '@testing-library/react';
import WorkingGroupsPage from '../working-groups';
import { createGeneralPageData } from '../../../__fixtures__/page';

const mockData = createGeneralPageData();

describe('Working Groups page', () => {
  it('renders correctly', () => {
    const { container } = render(<WorkingGroupsPage data={mockData.data} />);
    expect(container).toMatchSnapshot();
  });
});
