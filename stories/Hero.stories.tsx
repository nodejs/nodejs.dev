import React from 'react';
import Hero from '../src/components/Hero';
import '../src/components/Hero/Hero.scss';
import { NodeReleaseDataDetail } from '../src/types';
import '../src/styles/tokens.scss';
import '../src/styles/layout.scss';
import '../src/styles/mobile.scss';

export default {
  title: 'Hero',
  component: Hero,
};

const title = 'Run JavaScript Everywhere.';
const subTitle =
  'Node.js is a free, open-sourced, cross-platform JavaScript run-time environment that lets developers write command line tools and server-side scripts outside of a browser.';

const nodeReleasesLTSVersion: NodeReleaseDataDetail[] = [
  {
    date: '2021-06-03',
    files: [
      'aix-ppc64',
      'headers',
      'linux-arm64',
      'linux-armv7l',
      'linux-ppc64le',
      'linux-s390x',
      'linux-x64',
      'osx-arm64-tar',
      'osx-x64-pkg',
      'osx-x64-tar',
      'src',
      'win-x64-7z',
      'win-x64-exe',
      'win-x64-msi',
      'win-x64-zip',
      'win-x86-7z',
      'win-x86-exe',
      'win-x86-msi',
      'win-x86-zip',
    ],
    lts: '',
    v8: '9.0.257.25',
    version: 'v16.3.0',
  },
  {
    date: '2021-05-19',
    files: [
      'aix-ppc64',
      'headers',
      'linux-arm64',
      'linux-armv7l',
      'linux-ppc64le',
      'linux-s390x',
      'linux-x64',
      'osx-arm64-tar',
      'osx-x64-pkg',
      'osx-x64-tar',
      'src',
      'win-x64-7z',
      'win-x64-exe',
      'win-x64-msi',
      'win-x64-zip',
      'win-x86-7z',
      'win-x86-exe',
      'win-x86-msi',
      'win-x86-zip',
    ],
    lts: '',
    v8: '9.0.257.25',
    version: 'v16.2.0',
  },
  {
    date: '2021-05-04',
    files: [
      'aix-ppc64',
      'headers',
      'linux-arm64',
      'linux-armv7l',
      'linux-ppc64le',
      'linux-s390x',
      'linux-x64',
      'osx-arm64-tar',
      'osx-x64-pkg',
      'osx-x64-tar',
      'src',
      'win-x64-7z',
      'win-x64-exe',
      'win-x64-msi',
      'win-x64-zip',
      'win-x86-7z',
      'win-x86-exe',
      'win-x86-msi',
      'win-x86-zip',
    ],
    lts: '',
    v8: '9.0.257.24',
    version: 'v16.1.0',
  },
  {
    date: '2021-04-20',
    files: [
      'aix-ppc64',
      'headers',
      'linux-arm64',
      'linux-armv7l',
      'linux-ppc64le',
      'linux-s390x',
      'linux-x64',
      'osx-arm64-tar',
      'osx-x64-pkg',
      'osx-x64-tar',
      'src',
      'win-x64-7z',
      'win-x64-exe',
      'win-x64-msi',
      'win-x64-zip',
      'win-x86-7z',
      'win-x86-exe',
      'win-x86-msi',
      'win-x86-zip',
    ],
    lts: '',
    v8: '9.0.257.17',
    version: 'v16.0.0',
  },
  {
    date: '2021-04-06',
    files: [
      'aix-ppc64',
      'headers',
      'linux-arm64',
      'linux-armv7l',
      'linux-ppc64le',
      'linux-s390x',
      'linux-x64',
      'osx-x64-pkg',
      'osx-x64-tar',
      'src',
      'win-x64-7z',
      'win-x64-exe',
      'win-x64-msi',
      'win-x64-zip',
      'win-x86-7z',
      'win-x86-exe',
      'win-x86-msi',
      'win-x86-zip',
    ],
    lts: '',
    v8: '8.6.395.17',
    version: 'v15.14.0',
  },
  {
    date: '2021-03-31',
    files: [
      'aix-ppc64',
      'headers',
      'linux-arm64',
      'linux-armv7l',
      'linux-ppc64le',
      'linux-s390x',
      'linux-x64',
      'osx-x64-pkg',
      'osx-x64-tar',
      'src',
      'win-x64-7z',
      'win-x64-exe',
      'win-x64-msi',
      'win-x64-zip',
      'win-x86-7z',
      'win-x86-exe',
      'win-x86-msi',
      'win-x86-zip',
    ],
    lts: '',
    v8: '8.6.395.17',
    version: 'v15.13.0',
  },
];

export const root = (): JSX.Element => (
  <Hero
    title={title}
    subTitle={subTitle}
    nodeReleasesLTSVersion={nodeReleasesLTSVersion}
  />
);
