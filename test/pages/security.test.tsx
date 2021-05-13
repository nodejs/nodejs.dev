import React from 'react';
import { render } from '@testing-library/react';
import SecurityPage from '../../src/pages/security';
import '../__mocks__/intersectionObserverMock';
import { createSecurityData } from '../__fixtures__/page';

const mockData = createSecurityData();
describe('Privacy page', () => {
  it('renders correctly', () => {
    const { container } = render(<SecurityPage data={mockData.data} />);
    expect(container).toMatchSnapshot();
  });
});
