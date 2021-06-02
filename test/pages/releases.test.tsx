import React from 'react';
import { render } from '@testing-library/react';
import '../__mocks__/intersectionObserverMock';
import {
  createGeneralPageData,
  createNodeReleaseData,
} from '../__fixtures__/page';
import ReleasesPage from '../../src/pages/releases';
import { useReleaseData } from '../../src/hooks/useReleaseHistory';

const mockData = createGeneralPageData();
const mockReleaseData = createNodeReleaseData();
jest.mock('../../src/hooks/useReleaseHistory');

describe('Releases page', () => {
  it('renders correctly', () => {
    (useReleaseData as jest.Mock).mockReturnValue({
      releaseData: mockReleaseData,
    });

    const { container } = render(<ReleasesPage data={mockData.data} />);
    expect(container).toMatchSnapshot();
  });
});
