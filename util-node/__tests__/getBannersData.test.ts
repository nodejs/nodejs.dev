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
    const getBannersData = (await import('../getBannersData')).default;
    fetchMock.mockResponseOnce(JSON.stringify({}));
    await getBannersData();

    expect(fetchMock.mock.calls[0][0]).toBe(
      'https://raw.githubusercontent.com/nodejs/nodejs.org/main/site.json'
    );
  });

  it('should handle errors', async () => {
    // import dynamically in order to apply mock for node-fetch
    const getBannersData = (await import('../getBannersData')).default;
    fetchMock.mockReject(new Error('Error in request'));

    await expect(getBannersData()).rejects.toBeTruthy();
  });
});
