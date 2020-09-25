import React from 'react';
import renderer from 'react-test-renderer';
import DownloadTable from '../DownloadTable';

describe('DownloadTable component', (): void => {
  it('renders correctly', (): void => {
    const tree = renderer
      .create(
        <DownloadTable
          releases={[
            {
              date: '2020-09-15',
              files: [],
              lts: false,
              modules: '83',
              npm: '6.14.8',
              openssl: '1.1.1g',
              security: true,
              uv: '1.39.0',
              v8: '8.4.371.19',
              version: 'v14.11.0',
              zlib: '1.2.11',
            },
          ]}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
