import React from 'react';
import { render } from '@testing-library/react';
import AboutPage from '../../src/pages/resources';
import '../__mocks__/intersectionObserverMock';

import { createResourcesData } from '../__fixtures__/page';

const mockData = createResourcesData();

describe('About page', () => {
  it('renders correctly', () => {
    const { container } = render(<AboutPage data={mockData.data} />);
    expect(container).toMatchSnapshot();
  });
});
