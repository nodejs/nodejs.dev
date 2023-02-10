import fetchMock from 'jest-fetch-mock';
import {
  linkParser,
  getContributor,
  fetchRandomContributor,
  getMaxContributors,
} from '../useNodeJsContributorsApi';

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

  it('should return an empty object if the Link header is not present', () => {
    const linkHeader = '';
    const parsedLinks = linkParser(linkHeader);
    expect(parsedLinks).toEqual({});
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

describe('fetchRandomContributor', () => {
  it('returns a random contributor', async () => {
    const randomContributor = await fetchRandomContributor();
    expect(randomContributor).toHaveProperty('login');
    expect(randomContributor).toHaveProperty('avatarUri');
    expect(randomContributor).toHaveProperty('contributionsCount');
    expect(randomContributor).toHaveProperty('profileUri');
    expect(randomContributor).toHaveProperty('commitsListUri');
  });

  it('returns a random contributor from the local storage', async () => {
    const randomContributor = await fetchRandomContributor();
    expect(randomContributor).toHaveProperty('login');
    expect(randomContributor).toHaveProperty('avatarUri');
    expect(randomContributor).toHaveProperty('contributionsCount');
    expect(randomContributor).toHaveProperty('profileUri');
    expect(randomContributor).toHaveProperty('commitsListUri');
  });

  it('returns a random contributor from the local storage if the API call fails', async () => {
    fetchMock.mockRejectOnce(new Error('Failed to fetch'));

    const randomContributor = await fetchRandomContributor();
    expect(randomContributor).toHaveProperty('login');
    expect(randomContributor).toHaveProperty('avatarUri');
    expect(randomContributor).toHaveProperty('contributionsCount');
    expect(randomContributor).toHaveProperty('profileUri');
    expect(randomContributor).toHaveProperty('commitsListUri');
  });

  it('returns a random contributor from the local storage if the API call returns an empty array', async () => {
    fetchMock.mockResponseOnce(JSON.stringify([]));

    const randomContributor = await fetchRandomContributor();
    expect(randomContributor).toHaveProperty('login');
    expect(randomContributor).toHaveProperty('avatarUri');
    expect(randomContributor).toHaveProperty('contributionsCount');
    expect(randomContributor).toHaveProperty('profileUri');
    expect(randomContributor).toHaveProperty('commitsListUri');
  });
});

describe('getMaxContributors', () => {
  it('returns the max number of contributors and the page number', async () => {
    const maxContributors = await getMaxContributors();
    expect(maxContributors).toHaveLength(2);
    expect(maxContributors[0]).toBeGreaterThan(0);
    expect(maxContributors[1]).toBeGreaterThan(0);
  });

  it('returns the max number of contributors and the page number', async () => {
    fetchMock.mockRejectOnce(new Error('Failed to fetch'));

    const maxContributors = await getMaxContributors();
    expect(maxContributors).toHaveLength(2);
    expect(maxContributors[0]).toBeGreaterThan(0);
    expect(maxContributors[1]).toBeGreaterThan(0);
  });
});
