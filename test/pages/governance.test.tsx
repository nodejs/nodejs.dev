import React from 'react';
import { render } from '@testing-library/react';
import GovernancePage from '../../src/pages/governance';
import '../__mocks__/intersectionObserverMock';

import { createGeneralPageData } from '../__fixtures__/page';

const mockData = createGeneralPageData();

describe('Governance Page', () => {
  it('renders correctly', () => {
    const { container } = render(<GovernancePage data={mockData.data} />);
    expect(container).toMatchSnapshot();
  });
});
