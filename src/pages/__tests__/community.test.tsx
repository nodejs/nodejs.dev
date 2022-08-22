import React from 'react';
import { render } from '@testing-library/react';
import CommunityPage from '../community';
import { createGeneralPageData } from '../../__fixtures__/page';

const mockData = createGeneralPageData();

describe('Community Page', () => {
  it('renders correctly', () => {
    const { container } = render(<CommunityPage data={mockData.data} />);
    expect(container).toMatchSnapshot();
  });
});
