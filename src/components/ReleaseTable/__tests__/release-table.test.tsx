import React from 'react';
import { render } from '@testing-library/react';

import { createReleaseData } from '../../../../test/__fixtures__/page';

import ReleaseTable from '..';

const mockReleaseData = createReleaseData();

describe('ReleaseTable component', () => {
  it('renders correctly with data', () => {
    const { container } = render(<ReleaseTable releases={mockReleaseData} />);
    expect(container).toMatchSnapshot();
  });
});
