import React from 'react';
import { render } from '@testing-library/react';
import WorkingGroupsPage from '../../src/pages/working-groups';
import '../__mocks__/intersectionObserverMock';

import { createWorkingGroupsData } from '../__fixtures__/page';

const mockData = createWorkingGroupsData();

describe('Working Groups page', () => {
  it('renders correctly', () => {
    const { container } = render(<WorkingGroupsPage data={mockData.data} />);
    expect(container).toMatchSnapshot();
  });
});
