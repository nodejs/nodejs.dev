import fetchMock from 'jest-fetch-mock';

describe('getNodeReleasesData', () => {
  beforeEach(() => {
    fetchMock.enableMocks();
  });

  afterEach(() => {
    fetchMock.resetMocks();
  });

  it('should retrieve data from correct URL', done => {
    // import dynamically in order to apply mock for node-fetch
    import('../getNodeReleasesData').then(
      ({ default: getNodeReleasesData }) => {
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
          })
        );

        getNodeReleasesData((releases: unknown) => {
          expect(JSON.stringify(releases)).toMatchSnapshot();

          expect(fetchMock.mock.calls[0][0]).toBe(
            'https://raw.githubusercontent.com/nodejs/Release/main/schedule.json'
          );

          done();
        });
      }
    );
  });
});
