import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import {
  getStaticReleaseData,
  useReleaseHistory,
} from '../../src/hooks/useReleaseHistory';

describe('useReleaseHistory', () => {
  it('should export getStaticReleaseData function', () => {
    expect(getStaticReleaseData).toBeDefined();
    expect(getStaticReleaseData().length).toBeGreaterThan(0);
  });

  describe('useReleaseHistory hook tests', () => {
    const ReleaseHistoryRenderer = (): JSX.Element => {
      const data = useReleaseHistory();
      return <>{JSON.stringify(data)}</>;
    };

    beforeEach(() => {
      fetchMock.enableMocks();
    });

    afterEach(() => {
      fetchMock.resetMocks();
    });

    it('should retrieve data from correct endpoint', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ mockedData: [] }));
      render(<ReleaseHistoryRenderer />);

      await waitFor(() => {
        expect(screen.getByText(/mockedData/i)).toBeInTheDocument();
        expect(fetchMock.mock.calls[0][0]).toBe(
          'https://nodejs.org/dist/index.json'
        );
      });
    });
  });
});
