import React from 'react';
import '../styles/release-header.css';

interface Props {
  ltsVersion: string;
  npmVersion: string;
}

const RelaseHeader = ({ ltsVersion, npmVersion }: Props): JSX.Element => {
  return (
    <>
      <div className="release-page-navigation">
        <div>
          HOME /{' '}
          <span className="release-page-navigation-active">downloads</span>
        </div>
        <div>LATEST LTS VERSION {ltsVersion}</div>
      </div>
      <div className="release-page-navigation">
        <div className="release-page-navigation -title">Downloads</div>
        <div className="release-page-navigation-right-npm">
          (includes npm {npmVersion})
        </div>
      </div>
    </>
  );
};

export default RelaseHeader;
