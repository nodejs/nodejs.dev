import React from 'react';
import { render } from '@testing-library/react';
import ResourcesPage from '..';
import { createResourcesData } from '../../../__fixtures__/page';

const mockData = createResourcesData();

describe('Resources page', () => {
  it('renders correctly', () => {
    const { container } = render(<ResourcesPage data={mockData.data} />);
    expect(container).toMatchSnapshot();
  });
});
