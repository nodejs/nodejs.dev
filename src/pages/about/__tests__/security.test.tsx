import React from 'react';
import { render } from '@testing-library/react';
import SecurityPage from '../security';
import { createGeneralPageData } from '../../../__fixtures__/page';

const mockData = createGeneralPageData();

describe('Security page', () => {
  it('renders correctly', () => {
    const { container } = render(<SecurityPage data={mockData.data} />);
    expect(container).toMatchSnapshot();
  });
});
