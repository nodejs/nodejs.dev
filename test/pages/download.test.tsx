import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import DownloadPage from '../../src/pages/download';
import { createReleaseData } from '../__fixtures__/page';
import * as useReleaseHistory from '../../src/hooks/useReleaseHistory';
import '../__mocks__/intersectionObserverMock';

const mockReleaseData = createReleaseData();

describe('Download page', () => {
  beforeEach(() => {
    jest
      .spyOn(useReleaseHistory, 'useReleaseHistory')
      .mockReturnValue(mockReleaseData);
  });

  it('renders correctly', () => {
    const { container } = render(<DownloadPage location={window.location} />);
    expect(container).toMatchSnapshot();
  });

  it('should handle LTS to Current switch', () => {
    const { container } = render(<DownloadPage location={window.location} />);

    fireEvent.click(screen.getAllByText('Current')[0]);

    expect(container).toMatchSnapshot();
  });
});
