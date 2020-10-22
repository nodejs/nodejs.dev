import React from 'react';
import { render } from '@testing-library/react';
import ReleaseCards from '..';

describe('ReleaseCards component', () => {
  it('renders correctly with data', () => {
    const mockLineData = {
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
    };

    const { container } = render(<ReleaseCards line={mockLineData} />);
    expect(container).toMatchSnapshot();
  });
});
