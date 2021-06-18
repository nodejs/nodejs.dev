import React from 'react';
import { render } from '@testing-library/react';
import SecurityPage from '../../src/pages/security';
import '../__mocks__/intersectionObserverMock';
import { createGeneralPageData } from '../__fixtures__/page';

const mockData = createGeneralPageData();
describe('Privacy page', () => {
  it('renders correctly', () => {
    const { container } = render(<SecurityPage data={mockData.data} />);
    expect(container).toMatchSnapshot();
  });
});
