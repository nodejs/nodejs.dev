import React from 'react';
import { render } from '@testing-library/react';
import PackageManager from '../package-manager';
import { createGeneralPageData } from '../../../__fixtures__/page';

const mockData = createGeneralPageData();

describe('Package Manager Page', () => {
  it('renders correctly', () => {
    const { container } = render(<PackageManager data={mockData.data} />);
    expect(container).toMatchSnapshot();
  });
});
