import React from 'react';
import { render } from '@testing-library/react';
import '../__mocks__/intersectionObserverMock';
import { createGeneralPageData } from '../__fixtures__/page';
import ReleasesPage from '../../src/pages/releases';

const mockData = createGeneralPageData();

describe('Releases page', () => {
  it('renders correctly', () => {
    const { container } = render(<ReleasesPage data={mockData.data} />);
    expect(container).toMatchSnapshot();
  });
});
