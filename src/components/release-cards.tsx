import React from 'react';
import { ReleaseData } from '../hooks/useReleaseHistory';

interface Props {
  line?: ReleaseData;
}

export default function ReleaseCards({ line }: Props): JSX.Element {
  const fileName = line && line.version;
  return (
    <div>
      <div>
        <i className="material-icons">cloud</i>
        <p>Windows Installer</p>
        <a
          href={`https://nodejs.org/dist/${fileName}/node-${
            line && line.version
          }-x86.msi`}
        >
          node-{line && line.version}.x86.msi
        </a>
      </div>
      <div>
        <i className="material-icons">cloud</i>
        <p>Mac Installer</p>
        <a
          href={`https://nodejs.org/dist/${fileName}/node-${
            line && line.version
          }.pkg`}
        >
          node-{line && line.version}.pkg
        </a>
      </div>
      <div>
        <i className="material-icons">cloud</i>
        <p>Source Code</p>
        <a
          href={`https://nodejs.org/dist/${fileName}/node-${
            line && line.version
          }.tar.gz`}
        >
          node-{line && line.version}.tar.gz
        </a>
      </div>
    </div>
  );
}
