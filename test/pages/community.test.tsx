import React from 'react';
import { render } from '../../test-utils.js';
import CommunityPage from '../../src/pages/community';
import '../__mocks__/intersectionObserverMock';

import { createGeneralPageData } from '../__fixtures__/page';

const mockData = createGeneralPageData();

describe('Community Page', () => {
  it('renders correctly', () => {
    const { container } = render(<CommunityPage data={mockData.data} />);
    expect(container).toMatchSnapshot();
  });
});
