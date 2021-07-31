import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import { useNodeJsContributorsApi } from '../../src/hooks';
import { createRandomContributorApiData } from '../__fixtures__/hooks';

describe('useNodeJsContributorsApi', () => {
  const HookRenderer = ({ isVisible }: { isVisible: boolean }): JSX.Element => {
    const result = useNodeJsContributorsApi(isVisible);

    return result === null ? <>null</> : <>{JSON.stringify(result)}</>;
  };

  const linkResponseHeaderMock =
    '<https://api.github.com/repositories/27193779/contributors?per_page=1&page=2>; rel="next", <https://api.github.com/repositories/27193779/contributors?per_page=1&page=438>; rel="last"';

  beforeEach(() => {
    fetchMock.enableMocks();
  });

  afterEach(() => {
    fetchMock.resetMocks();
    localStorage.setItem('max_contributors', '');
    localStorage.setItem('fetch_date', '');
  });

  it('should return null in case no visible', () => {
    render(<HookRenderer isVisible={false} />);
    const linkElement = screen.getByText(/null/i);
    expect(linkElement).toBeInTheDocument();
  });

  it('should return null in case no local storage found', async () => {
    fetchMock.mockResponses(
      // mock first call to contributors API
      [
        '',
        {
          headers: {
            link: linkResponseHeaderMock,
          },
        },
      ],
      // mock second request and return contributor mocked object
      JSON.stringify([createRandomContributorApiData()])
    );

    render(<HookRenderer isVisible />);
    await waitFor(() => {
      expect(screen.getByText(/login_mock/i)).toBeInTheDocument();
      expect(screen.getByText(/avatar_url_mock/i)).toBeInTheDocument();
      expect(fetchMock.mock.calls[0][0]).toBe(
        'https://api.github.com/repos/nodejs/node/contributors?per_page=1'
      );
      expect(
        (fetchMock.mock.calls[1][0] as string).includes(
          'https://api.github.com/repos/nodejs/node/contributors?per_page=1&page='
        )
      ).toBe(true);
    });
  });

  it('should skip retrieving max pages for fresh data in localStorage', async () => {
    localStorage.setItem('max_contributors', '100');
    localStorage.setItem('fetch_date', String(Date.now() + 5000));

    fetchMock.mockResponse(JSON.stringify([createRandomContributorApiData()]));

    render(<HookRenderer isVisible />);

    await waitFor(() => {
      expect(screen.getByText(/login_mock/i)).toBeInTheDocument();
      expect(screen.getByText(/avatar_url_mock/i)).toBeInTheDocument();

      // expect first call will be to random page instead of extra request for
      // getting max pages
      expect(
        (fetchMock.mock.calls[0][0] as string).includes(
          'https://api.github.com/repos/nodejs/node/contributors?per_page=1&page='
        )
      ).toBe(true);
    });
  });

  it('should refetch expired data', async () => {
    localStorage.setItem('fetch_date', '1');

    fetchMock.mockResponses(
      // mock first call to contributors API
      [
        '',
        {
          headers: {
            link: linkResponseHeaderMock,
          },
        },
      ],
      // mock second request and return contributor mocked object
      JSON.stringify([createRandomContributorApiData()])
    );

    render(<HookRenderer isVisible />);
    await waitFor(() => {
      expect(screen.getByText(/login_mock/i)).toBeInTheDocument();
      expect(screen.getByText(/avatar_url_mock/i)).toBeInTheDocument();
      expect(fetchMock.mock.calls[0][0]).toBe(
        'https://api.github.com/repos/nodejs/node/contributors?per_page=1'
      );
      expect(
        (fetchMock.mock.calls[1][0] as string).includes(
          'https://api.github.com/repos/nodejs/node/contributors?per_page=1&page='
        )
      ).toBe(true);
    });
  });

  describe('error handling', () => {
    it('should return null on error', async () => {
      fetchMock.mockReject(new Error('fake error message'));
      render(<HookRenderer isVisible />);
      const linkElement = screen.getByText(/null/i);
      expect(linkElement).toBeInTheDocument();
    });

    it('should return null on unexpected link header from API', async () => {
      fetchMock.mockResponseOnce('');
      render(<HookRenderer isVisible />);
      const linkElement = screen.getByText(/null/i);
      expect(linkElement).toBeInTheDocument();
    });
  });
});
