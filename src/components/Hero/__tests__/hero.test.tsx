import React from 'react';
import { render } from '@testing-library/react';

import { ReleaseData } from '../../../hooks/useReleaseHistory';

import Hero from '..';

const mockReleaseData = [
  {
    version: 'mock-version-1',
    date: 'mock-date',
    files: ['aix-ppc64', 'headers', 'linux-arm64'],
    npm: 'mock-npm',
    v8: 'mock-v8',
    uv: 'mock-uv',
    zlib: 'mock-zlib',
    openssl: 'mock-openssl',
    modules: 'mock-module',
    lts: true,
    security: false,
  },
  {
    version: 'mmock-version-2',
    date: 'mock-date',
    files: ['aix-ppc64', 'headers', 'linux-arm64', 'linux-armv7l'],
    npm: 'mock-npm',
    v8: 'mock-v8',
    uv: 'mock-uv',
    zlib: 'mock-zlib',
    openssl: '1.1.1g',
    modules: '83',
    lts: true,
    security: false,
  },
];

jest.mock('../../../hooks/useReleaseHistory', () => ({
  useReleaseHistory: (): ReleaseData[] => mockReleaseData,
}));

describe('Hero component', () => {
  it('renders correctly', () => {
    const title = 'Introduction to Node.js';
    const subTitle = 'Mock SubTitle';
    const { container } = render(<Hero title={title} subTitle={subTitle} />);
    expect(container).toMatchSnapshot();
  });
});
