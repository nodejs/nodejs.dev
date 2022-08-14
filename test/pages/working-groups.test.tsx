import React from 'react';
import { render } from '../../test-utils.js';
import WorkingGroupsPage from '../../src/pages/about/working-groups';
import '../__mocks__/intersectionObserverMock';
import { createGeneralPageData } from '../__fixtures__/page';

const mockData = createGeneralPageData();

describe('Working Groups page', () => {
  it('renders correctly', () => {
    const { container } = render(<WorkingGroupsPage data={mockData.data} />);
    expect(container).toMatchSnapshot();
  });
});
