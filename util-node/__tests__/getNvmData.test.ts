import fetchMock from 'jest-fetch-mock';

describe('getLatestNvmVersion', () => {
  beforeEach(() => {
    fetchMock.enableMocks();
  });

  afterEach(() => {
    fetchMock.resetMocks();
  });

  it('returns the latest NVM version', async () => {
    // import dynamically in order to apply mock for node-fetch
    const getLatestNvmVersion = (await import('../getNvmData')).default;
    fetchMock.mockResponse(JSON.stringify([{ name: 'mockVersionString' }]));

    const result = await getLatestNvmVersion();

    expect(result).toEqual({ version: 'mockVersionString' });
  });

  it.each`
    response          | reason
    ${'foo'}          | ${'is not a string'}
    ${[]}             | ${'is empty'}
    ${[false]}        | ${'is not an array of objects'}
    ${[{}]}           | ${'contains objects without a name'}
    ${[{ name: 12 }]} | ${'contains objects with a non-string name'}
  `('rejects response which $reason', async ({ response }) => {
    // import dynamically in order to apply mock for node-fetch
    const getLatestNvmVersion = (await import('../getNvmData')).default;
    fetchMock.mockResponse(JSON.stringify(response));

    expect(await getLatestNvmVersion()).toEqual({ version: 'unknown' });
  });
});
