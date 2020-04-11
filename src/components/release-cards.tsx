import React from 'react';
import { ReleaseData } from '../hooks/useReleaseHistory';

import '../styles/release-cards.css';
import appleLogo from '../images/logos/apple-logo.svg';
import microsoftLogo from '../images/logos/microsoft-download-logo.svg';
import sourceCodeIcon from '../images/logos/source-code-icon.svg';
interface Props {
  line?: ReleaseData;
  userOS: string;
}

export default function ReleaseCards({ line, userOS }: Props): JSX.Element {
  const fileName = line && line.version;
  return (
    <div className="release-card-container">
      <div
        className={userOS === 'Win' ? 'release-card -active' : 'release-card'}
      >
        <div className="release-row">
          <img src={microsoftLogo} alt="Microsoft logo" />
          <a
            className="release-card-download"
            href={`https://nodejs.org/dist/${fileName}/node-${line &&
              line.version}-x86.msi`}
          >
            <i className="material-icons ">get_app</i>
          </a>
        </div>

        <p className="release-card-title">Windows Installer</p>
        <p className="release-card-filename">
          node-{line && line.version}.x86.msi
        </p>
      </div>
      <div
        className={userOS === 'Mac' ? 'release-card -active' : 'release-card'}
      >
        <div className="release-row">
          <img src={appleLogo} alt="apple logo" />
          <a
            className="release-card-download"
            href={`https://nodejs.org/dist/${fileName}/node-${line &&
              line.version}.pkg`}
          >
            <i className="material-icons">get_app</i>
          </a>
        </div>
        <p className="release-card-title">Mac Installer</p>
        <p className="release-card-filename">node-{line && line.version}.pkg</p>
      </div>
      <div className="release-card">
        <div className="release-row">
          <img src={sourceCodeIcon} alt="source code icon" />
          <a
            className="release-card-download"
            href={`https://nodejs.org/dist/${fileName}/node-${line &&
              line.version}.tar.gz`}
          >
            <i className="material-icons">get_app</i>
          </a>
        </div>
        <p>Source Code</p>
        <p className="release-card-filename">
          node-{line && line.version}.tar.gz
        </p>
      </div>
    </div>
  );
}
