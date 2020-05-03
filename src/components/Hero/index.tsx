import React from 'react';
import { Link } from 'gatsby';

import { detectOS, UserOS } from '../../util/detectOS';
import { useReleaseHistory, ReleaseData } from '../../hooks/useReleaseHistory';

import './Hero.scss';

interface Props {
  title: string;
  subTitle: string;
}

function downloadUrlByOS(userOS: UserOS, version: string): string {
  const baseURL = `https://nodejs.org/dist/${version}`;

  if (userOS === UserOS.MOBILE) {
    return baseURL;
  }

  if (userOS === UserOS.MAC) {
    return `${baseURL}/node-${version}.pkg`;
  }

  if (userOS === UserOS.WIN) {
    if (
      navigator.appVersion.indexOf('WOW64') !== -1 ||
      navigator.appVersion.indexOf('Win64') !== -1
    ) {
      return `${baseURL}/node-${version}-x64.msi`;
    }

    return `${baseURL}/node-${version}-x86.msi`;
  }

  return `${baseURL}/node-${version}.tar.gz`;
}

const Hero = ({ title, subTitle }: Props): JSX.Element => {
  const userOS = detectOS();
  const [currentRelease, ...releases] = useReleaseHistory();

  // find first lts version (first found is last LTS)
  const lastLTSRelease = releases.find(
    (release: ReleaseData): boolean => release.lts
  );

  const ltsVersionUrl = downloadUrlByOS(
    userOS,
    lastLTSRelease ? lastLTSRelease.version : ''
  );
  const currentVersionUrl = downloadUrlByOS(
    userOS,
    currentRelease ? currentRelease.version : ''
  );

  return (
    <div className="home-page-hero">
      <h1>{title}</h1>
      <h2 className="sub-title t-subheading">{subTitle}</h2>
      <div className="btn-ctas">
        <div className="download-lts-container">
          <a className="circular-container" href={ltsVersionUrl}>
            Download Node (LTS)
          </a>
          <p className="t-caption">
            {lastLTSRelease
              ? `Version ${lastLTSRelease.version.substr(1)} - `
              : ''}
            <a href={currentVersionUrl}>Get Current</a>
          </p>
        </div>
        <Link className="circular-container inverse" to="/learn">
          Learn Node
        </Link>
      </div>
    </div>
  );
};

export default Hero;
