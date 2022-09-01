import fetchMock from 'jest-fetch-mock';

describe('getNodeReleasesData', () => {
  beforeEach(() => {
    fetchMock.enableMocks();
  });

  afterEach(() => {
    fetchMock.resetMocks();
  });

  it('should retrieve data from correct URL', async () => {
    // import dynamically in order to apply mock for node-fetch
    const getNodeReleasesData = (await import('../getNodeReleasesData'))
      .default;

    fetchMock.mockResponses(
      // mock second request to schedule
      JSON.stringify({
        'v0.8': {
          start: '2012-06-25',
          end: '2014-07-31',
        },
        'v0.10': {
          start: '2013-03-11',
          end: '9999-01-01',
        },
      }),
      // mock first call to index.json
      JSON.stringify([
        {
          lts: true,
          end: new Date(),
        },
      ])
    );

    getNodeReleasesData((releases: unknown) => {
      expect(releases).toStrictEqual({
        nodeReleasesData: [
          {
            activeLTSStart: '',
            codename: '',
            endOfLife: '9999-01-01',
            initialRelease: '2013-03-11',
            maintenanceLTSStart: '',
            release: 'v0.10',
            status: 'Current',
          },
        ],
        nodeReleasesDataDetail: [],
      });

      expect(fetchMock.mock.calls[0][0]).toBe(
        'https://raw.githubusercontent.com/nodejs/Release/main/schedule.json'
      );

      expect(fetchMock.mock.calls[1][0]).toBe(
        'https://nodejs.org/dist/index.json'
      );
    });
  });
});
