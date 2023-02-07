import {
  getMaxContributors,
  getContributor,
  fetchRandomContributor,
  linkParser,
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
});

describe('getMaxContributors', () => {
  it('should return an array with a random page number and the maximum number of contributors', async () => {
    const maxContributors = await getMaxContributors();
    expect(Array.isArray(maxContributors)).toBe(true);
    expect(typeof maxContributors[0]).toBe('number');
    expect(typeof maxContributors[1]).toBe('number');
  });
});

describe('getContributor', () => {
  it('should retrieve a contributor object by its index in the API', async () => {
    const randomPage = 1;
    const contributor = await getContributor(randomPage);
    expect(typeof contributor).toBe('object');
    expect(contributor).toHaveProperty('avatarUri');
    expect(contributor).toHaveProperty('login');
    expect(contributor).toHaveProperty('contributionsCount');
    expect(contributor).toHaveProperty('profileUri');
    expect(contributor).toHaveProperty('commitsListUri');
  });
});

describe('fetchRandomContributor', () => {
  it('should return a random contributor for the Node.js main repo', async () => {
    const contributor = await fetchRandomContributor();
    expect(typeof contributor).toBe('object');
    expect(contributor).toHaveProperty('avatarUri');
    expect(contributor).toHaveProperty('login');
    expect(contributor).toHaveProperty('contributionsCount');
    expect(contributor).toHaveProperty('profileUri');
    expect(contributor).toHaveProperty('commitsListUri');
  });
});
