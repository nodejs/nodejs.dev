import React from 'react';
import { render } from '../../test-utils.js';
import AboutPage from '../../src/pages/about';
import '../__mocks__/intersectionObserverMock';

import { createGeneralPageData } from '../__fixtures__/page';

const mockData = createGeneralPageData();

describe('About page', () => {
  it('renders correctly', () => {
    const { container } = render(<AboutPage data={mockData.data} />);
    expect(container).toMatchSnapshot();
  });
});
