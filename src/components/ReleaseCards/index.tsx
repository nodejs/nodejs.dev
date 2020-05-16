import React from 'react';
import { ReleaseData } from '../../hooks/useReleaseHistory';

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
    <div>
      <div>
        <i className="material-icons">cloud</i>
        <p>Windows Installer</p>
        <a
          href={`https://nodejs.org/dist/${fileName}/node-${line &&
            line.version}-x86.msi`}
        >
          node-
          {line && line.version}
          .x86.msi
        </a>
      </div>
      <div>
        <i className="material-icons">cloud</i>
        <p>Mac Installer</p>
        <a
          href={`https://nodejs.org/dist/${fileName}/node-${line &&
            line.version}.pkg`}
        >
          node-
          {line && line.version}
          .pkg
        </a>
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
        <a
          href={`https://nodejs.org/dist/${fileName}/node-${line &&
            line.version}.tar.gz`}
        >
          node-
          {line && line.version}
          .tar.gz
        </a>
      </div>
    </div>
  );
}
