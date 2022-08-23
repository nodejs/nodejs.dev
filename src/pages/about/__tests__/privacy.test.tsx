import React from 'react';
import { render } from '@testing-library/react';
import PrivacyPage from '../privacy';
import { createPrivacyData } from '../../../__fixtures__/page';

const mockData = createPrivacyData();

describe('Privacy Page', () => {
  it('renders correctly', () => {
    const { container } = render(<PrivacyPage data={mockData.data} />);
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const pageContent = container.querySelector('main');

    expect(pageContent).toMatchSnapshot();
  });
});
