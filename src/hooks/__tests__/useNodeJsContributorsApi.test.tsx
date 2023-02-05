import { fetchRandomContributor } from '../useNodeJsContributorsApi';

describe('fetchRandomContributor', () => {
  it('should return a random contributor', async () => {
    window.fetch = jest.fn().mockResolvedValue({
      headers: {
        get: jest.fn().mockReturnValue('<link1>; rel="last"'),
      },
      json: jest.fn().mockResolvedValue([
        {
          avatar_url: 'avatar_url',
          login: 'login',
          contributions: 123,
          html_url: 'html_url',
        },
      ]),
    });
    window.localStorage = {
      getItem: jest.fn().mockReturnValue(null),
      setItem: jest.fn(),
      length: 0,
      clear: jest.fn(),
      key: jest.fn(),
      removeItem: jest.fn(),
    };
    Math.random = jest.fn().mockReturnValue(0.5);

    const contributor = await fetchRandomContributor();
    expect(contributor).toEqual({
      avatarUri: 'avatar_url',
      login: 'login',
      contributionsCount: 123,
      profileUri: 'html_url',
      commitsListUri: 'https://github.com/nodejs/node/commits?author=login',
    });
  });
});
