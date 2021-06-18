import React from 'react';
import { render } from '@testing-library/react';
import PrivacyPage from '../../src/pages/privacy';
import '../__mocks__/intersectionObserverMock';

import { createPrivacyData } from '../__fixtures__/page';

const mockData = createPrivacyData();

describe('Privacy Page', () => {
  it('renders correctly', () => {
    const { container } = render(<PrivacyPage data={mockData.data} />);
    expect(container).toMatchSnapshot();
  });
});
