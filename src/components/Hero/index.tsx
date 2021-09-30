import React from 'react';
import { Link } from 'gatsby';
import { detectOS } from '../../util/detectOS';
import downloadUrlByOS from '../../util/downloadUrlByOS';
import { NodeReleaseLTSVersion } from '../../types';

import './Hero.scss';

interface Props {
  title: string;
  subTitle?: string;
  nodeReleasesLTSVersion: NodeReleaseLTSVersion[];
}

const Hero = ({
  title,
  subTitle,
  nodeReleasesLTSVersion,
}: Props): JSX.Element => {
  const userOS = detectOS();
  const [currentRelease, ...releases] = nodeReleasesLTSVersion;

  // find first lts version (first found is last LTS)
  const lastLTSRelease = releases.find((release): boolean => !!release.lts);

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
