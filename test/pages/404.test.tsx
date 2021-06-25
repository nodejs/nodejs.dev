import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../../src/pages/404';
// import { createReleaseData } from '../__fixtures__/page';
// import { ReleaseHistory } from '../../src/types';
import '../__mocks__/intersectionObserverMock';

// const mockReleaseData = createReleaseData();

// jest.mock('../../src/hooks/useReleaseHistory', () => ({
//   useReleaseHistory: (): ReleaseData[] => mockReleaseData,
// }));

describe('404 page', () => {
  it('renders correctly', () => {
    const { container } = render(<NotFound location={window.location} />);
    expect(container).toMatchSnapshot();
  });
});
