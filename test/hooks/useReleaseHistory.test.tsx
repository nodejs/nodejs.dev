import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import {
  useReleaseHistory,
  useReleaseData,
} from '../../src/hooks/useReleaseHistory';

describe('useReleaseHistory and useReleaseData', () => {
  describe('useReleaseData hook tests', () => {
    const ReleaseDataRenderer = (): JSX.Element => {
      const { rawData } = useReleaseData();
      return <>{JSON.stringify(rawData)}</>;
    };

    beforeEach(() => {
      fetchMock.enableMocks();
    });

    afterEach(() => {
      fetchMock.resetMocks();
    });

    it('should retrieve data from correct endpoint', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ mockedData: {} }));
      render(<ReleaseDataRenderer />);

      await waitFor(() => {
        expect(screen.getByText(/mockedData/i)).toBeInTheDocument();
        expect(fetchMock.mock.calls[0][0]).toBe(
          'https://raw.githubusercontent.com/nodejs/Release/main/schedule.json'
        );
      });
    });
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
