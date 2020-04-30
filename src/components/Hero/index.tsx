import React from 'react';
import { Link } from 'gatsby';

import { useReleaseHistory, ReleaseData } from '../../hooks/useReleaseHistory';

interface Props {
  title: string;
  subTitle: string;
}

const Hero = ({ title, subTitle }: Props): JSX.Element => {
  // find first lts version (first found is last LTS)
  const lastLts = useReleaseHistory().find(
    (release: ReleaseData): boolean => !!release.lts
  );

  return (
    <div className="home-page-hero">
      <h1>{title}</h1>
      <h2 className="sub-title t-subheading">{subTitle}</h2>
      <div className="btn-ctas">
        <div className="download-lts-container">
          <button className="download-lts-cta t-body1" type="button">
            Download Node (LTS)
          </button>
          <p className="links t-caption">
            {lastLts ? `Version ${lastLts.version.substr(1)} - ` : ''}
            <Link to="/download">What’s new</Link> /{' '}
            <Link to="/download">Get Current</Link>
          </p>
        </div>
        <Link to="/learn">
          <button className="learn-cta t-body1" type="button">
            Learn Node
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
