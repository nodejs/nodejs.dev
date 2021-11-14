import fetch from 'node-fetch';

import { getLatestNvmVersion } from '../../util-node/getNvmData';

jest.mock('node-fetch');

const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

const prepareMockFetch = ({
  response = [{ name: 'mockVersionString' }] as any,
} = {}) => {
  mockFetch.mockResolvedValue({
    json: () => Promise.resolve(response),
  } as any);
};

describe('getLatestNvmVersion', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns the latest NVM version', async () => {
    prepareMockFetch();

    const result = await getLatestNvmVersion();

    expect(result).toEqual('mockVersionString');
  });

  it.each`
    response          | reason
    ${'foo'}          | ${'is not a string'}
    ${[]}             | ${'is empty'}
    ${[false]}        | ${'is not an array of objects'}
    ${[{}]}           | ${'contains objects without a name'}
    ${[{ name: 12 }]} | ${'contains objects with a non-string name'}
  `('rejects response which $reason', ({ response }) => {
    prepareMockFetch({ response });

    expect(getLatestNvmVersion()).rejects.toThrow('Unable to parse response');
  });
});
