import React from 'react';
import { render } from '@testing-library/react';
import TrademarkPage from '../../src/pages/trademark';
import '../__mocks__/intersectionObserverMock';

import { createTrademarkData } from '../__fixtures__/page';

const mockData = createTrademarkData();

describe('Trademark page', () => {
  it('renders correctly', () => {
    const { container } = render(<TrademarkPage data={mockData.data} />);
    expect(container).toMatchSnapshot();
  });
});
