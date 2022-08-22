import React from 'react';
import { render } from '@testing-library/react';
import TrademarkPage from '../trademark';
import { createGeneralPageData } from '../../../__fixtures__/page';

const mockData = createGeneralPageData();

describe('Trademark page', () => {
  it('renders correctly', () => {
    const { container } = render(<TrademarkPage data={mockData.data} />);
    expect(container).toMatchSnapshot();
  });
});
