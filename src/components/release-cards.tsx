import React from 'react';
import { ReleaseData } from '../hooks/useReleaseHistory';

interface Props {
  line?: ReleaseData;
}

export default function ReleaseCards({ line }: Props): JSX.Element {
  const fileName = line && line.version;
  return (
    <div className="release-card-container">
      <div className="release-card">
        <i className="material-icons">cloud</i>
        <p className="release-card-title">Windows Installer</p>
        <a
          className="release-card-filename"
          href={`https://nodejs.org/dist/${fileName}/node-${line &&
            line.version}-x86.msi`}
        >
          {' '}
          node-{line && line.version}.x86.msi
        </a>
      </div>
      <div className="release-card">
        <i className="material-icons">cloud</i>
        <p className="release-card-title">Mac Installer</p>
        <a
          className="release-card-filename"
          href={`https://nodejs.org/dist/${fileName}/node-${line &&
            line.version}.pkg`}
        >
          node-{line && line.version}.pkg
        </a>
      </div>
      <div className="release-card">
        <i className="material-icons">cloud</i>
        <p className="release-card-title">Source Code</p>
        <a
          className="release-card-filename"
          href={`https://nodejs.org/dist/${fileName}/node-${line &&
            line.version}.tar.gz`}
        >
          node-{line && line.version}.tar.gz
        </a>
      </div>
    </div>
  );
}
