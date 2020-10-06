/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import renderer from 'react-test-renderer';
import ReleaseTable from '..';

describe('ReleaseTable component', () => {
  it('renders correctly with data', () => {
    const mockReleaseData = [
      {
        version: 'v14.13.0',
        date: '2020-09-29',
        files: ['aix-ppc64', 'headers', 'linux-arm64', 'linux-armv7l'],
        npm: '6.14.8',
        v8: '8.4.371.19',
        uv: '1.40.0',
        zlib: '1.2.11',
        openssl: '1.1.1g',
        modules: '83',
        lts: false,
        security: false,
      },
      {
        version: 'v13.0.1',
        date: '2019-10-23',
        files: ['aix-ppc64', 'headers', 'linux-arm64'],
        npm: '6.12.0',
        v8: '7.8.279.17',
        uv: '1.33.1',
        zlib: '1.2.11',
        openssl: '1.1.1d',
        modules: '79',
        lts: false,
        security: false,
      },
    ];
    const tree = renderer
      .create(<ReleaseTable releases={mockReleaseData} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
