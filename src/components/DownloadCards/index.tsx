import React, { useState } from 'react';
import { ReleaseData } from '../../hooks/useReleaseHistory';

import './DownloadCards.scss';
import appleLogo from '../../images/logos/apple-logo.svg';
import microsoftLogo from '../../images/logos/microsoft-download-logo.svg';
import sourceCodeIcon from '../../images/logos/source-code-icon.svg';

interface Props {
  line?: ReleaseData;
  userOS: string;
}

export default function DownloadCards({ line, userOS }: Props): JSX.Element {
  const fileName = line && line.version;
  const [selected, setSelected] = useState(
    !(['WIN', 'MAC', 'MOBILE'].indexOf(userOS) >= 0) ? 'SOURCECODE' : userOS
  );
  // eslint-disable-next-line no-console
  console.log('OS: ', userOS, 'hook: ', selected);
  const DownloadTypes = [
    {
      label: 'Windows Installer',
      icon: microsoftLogo,
      name: 'WIN',
      fileName: `node-${fileName}-x86.msi`,
      download: `https://nodejs.org/dist/${fileName}/node-${fileName}-x86.msi`,
    },
    {
      label: 'MAC Installer',
      icon: appleLogo,
      name: 'MAC',
      fileName: `node-${fileName}.pkg`,
      download: `https://nodejs.org/dist/${fileName}/node-${fileName}.pkg`,
    },
    {
      label: 'Source Code',
      name: 'SOURCECODE',
      icon: sourceCodeIcon,
      fileName: `node-${fileName}.tar.gz`,
      download: `https://nodejs.org/dist/${fileName}/node-${fileName}.tar.gz`,
    },
  ];

  return (
    <>
      <ul className="download-card__row">
        {DownloadTypes.map(
          (os): JSX.Element => {
            return (
              <li
                className={
                  selected === os.name
                    ? 'download-card--active'
                    : 'download-card--inactive'
                }
                key={os.name}
                role="presentation"
                onClick={(): void => {
                  setSelected(os.name);
                }}
              >
                <div className="download-card__top">
                  <img
                    className={
                      selected === os.name
                        ? 'download-card__top--active'
                        : 'download-card__top--inactive'
                    }
                    src={os.icon}
                    alt={`${os.label} logo`}
                  />
                  {selected === os.name && (
                    <a className="download-card__link" href={os.download}>
                      <i className="material-icons">get_app</i>
                    </a>
                  )}
                </div>
                <p
                  className={
                    selected === os.name
                      ? 'download-card__label--active'
                      : 'download-card__label--inactive'
                  }
                >
                  {os.label}
                </p>
                <p className="download-card__filename">{os.fileName}</p>
              </li>
            );
          }
        )}
      </ul>
    </>
  );
}
