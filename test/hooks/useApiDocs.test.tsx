import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import {
  isClassObj,
  isEventObj,
  isMethodObj,
  isModuleObj,
  useApiData,
} from '../../src/hooks/useApiDocs';

describe('useApiDocs', () => {
  it('should export isMethodObj function', () => {
    expect(
      isMethodObj({
        textRaw: 'mock-textRaw',
        type: 'method',
        signatures: [],
        name: 'mock',
      })
    ).toBe(true);
    expect(
      isMethodObj({
        textRaw: 'mock-textRaw',
        type: 'misc',
        signatures: [],
        name: 'mock',
      })
    ).toBe(false);
  });

  it('should export isEventObj function', () => {
    expect(
      isEventObj({
        textRaw: 'mock-textRaw',
        type: 'event',
        signatures: [],
        name: 'mock',
      })
    ).toBe(true);
    expect(
      isEventObj({
        textRaw: 'mock-textRaw',
        type: 'misc',
        signatures: [],
        name: 'mock',
      })
    ).toBe(false);
  });

  it('should export isClassObj function', () => {
    expect(
      isClassObj({
        textRaw: 'mock-textRaw',
        type: 'class',
        signatures: [],
        name: 'mock',
      })
    ).toBe(true);
    expect(
      isClassObj({
        textRaw: 'mock-textRaw',
        type: 'misc',
        signatures: [],
        name: 'mock',
      })
    ).toBe(false);
  });

  it('should export isModuleObj function', () => {
    expect(
      isModuleObj({
        textRaw: 'mock-textRaw',
        type: 'module',
        signatures: [],
        name: 'mock',
      })
    ).toBe(true);
    expect(
      isModuleObj({
        textRaw: 'mock-textRaw',
        type: 'misc',
        signatures: [],
        name: 'mock',
      })
    ).toBe(false);
  });

  describe('useApiData hook tests', () => {
    const ApiDataRenderer = ({
      version,
    }: {
      version: string | null;
    }): JSX.Element => {
      const apiData = useApiData(version);
      return <>{JSON.stringify(apiData)}</>;
    };

    beforeEach(() => {
      fetchMock.enableMocks();
    });

    afterEach(() => {
      fetchMock.resetMocks();
    });

    it('should return empty APIResponse if version not passed', () => {
      const { container } = render(<ApiDataRenderer version={null} />);
      expect(container).toMatchSnapshot();
    });

    it('should retrieve correct APIResponse for specified version', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ mockedVersions: [] }));
      render(<ApiDataRenderer version="mock-version" />);

      await waitFor(() => {
        expect(screen.getByText(/mockedVersions/i)).toBeInTheDocument();
        expect(fetchMock.mock.calls[0][0]).toBe(
          'https://nodejs.org/dist/mock-version/docs/api/all.json'
        );
      });
    });
  });
});
