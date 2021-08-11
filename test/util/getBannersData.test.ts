import fetchMock from 'jest-fetch-mock';

describe('getBannersData', () => {
  beforeEach(() => {
    fetchMock.enableMocks();
  });

  afterEach(() => {
    fetchMock.resetMocks();
  });

  it('should retrieve banners from correct URL', async () => {
    // import dynamically in order to apply mock for node-fetch
    const getBannersData = (await import('../../util-node/getBannersData'))
      .default;
    fetchMock.mockResponseOnce(JSON.stringify({ banners: ['mocked-banner'] }));
    const banners = await getBannersData();

    expect(banners).toStrictEqual(['mocked-banner']);
    expect(fetchMock.mock.calls[0][0]).toBe(
      'https://raw.githubusercontent.com/nodejs/nodejs.org/master/locale/en/site.json'
    );
  });

  it('should handle errors', async () => {
    // import dynamically in order to apply mock for node-fetch
    const getBannersData = (await import('../../util-node/getBannersData'))
      .default;
    fetchMock.mockReject(new Error('Error in request'));

    await expect(getBannersData()).rejects.toBeTruthy();
  });
});
