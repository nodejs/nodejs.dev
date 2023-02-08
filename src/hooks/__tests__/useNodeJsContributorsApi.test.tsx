import fetchMock from 'jest-fetch-mock';
import { linkParser, getContributor } from '../useNodeJsContributorsApi';

describe('linkParser', () => {
  it('should parse the Link header correctly', () => {
    const linkHeader =
      '<https://api.github.com/repos/nodejs/node/contributors?per_page=5&page=2>; rel="next", <https://api.github.com/repos/nodejs/node/contributors?per_page=5&page=3>; rel="last"';
    const parsedLinks = linkParser(linkHeader);
    expect(parsedLinks).toEqual({
      next: {
        url: 'https://api.github.com/repos/nodejs/node/contributors?per_page=5&page=2',
        page: 2,
      },
      last: {
        url: 'https://api.github.com/repos/nodejs/node/contributors?per_page=5&page=3',
        page: 3,
      },
    });
  });
});

describe('getContributor', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('returns a contributor object by its index in API', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify([
        {
          avatar_url: 'https://avatars.githubusercontent.com/u/2512748?v=4',
          login: 'cjihrig',
          contributions: 1045,
          html_url: 'https://github.com/cjihrig',
        },
      ])
    );

    const result = await getContributor(2);
    expect(result).toEqual({
      avatarUri: 'https://avatars.githubusercontent.com/u/2512748?v=4',
      login: 'cjihrig',
      contributionsCount: 1045,
      profileUri: 'https://github.com/cjihrig',
      commitsListUri: 'https://github.com/nodejs/node/commits?author=cjihrig',
    });
  });
});
