import React, { useState, useEffect } from 'react';

import { ReleaseData } from '../../hooks/useReleaseHistory';
import appleLogo from '../../images/logos/apple-logo.svg';
import microsoftLogo from '../../images/logos/microsoft-download-logo.svg';
import sourceCodeIcon from '../../images/logos/source-code-icon.svg';
import { UserOS } from '../../util/detectOS';

import './DownloadCards.scss';

interface Props {
  line?: ReleaseData;
  userOS: UserOS;
}

export default function DownloadCards({ line, userOS }: Props): JSX.Element {
  const fileName = line?.version;
  const [selected, setSelected] = useState('');

  useEffect(() => {
    setSelected(
      ![UserOS.WIN, UserOS.MAC, UserOS.MOBILE].includes(userOS)
        ? 'SOURCECODE'
        : userOS
    );
  }, [userOS]);

  const downloadTypes = [
    {
      label: 'Windows Installer',
      icon: microsoftLogo,
      name: UserOS.WIN,
      fileName: `node-${fileName}-x86.msi`,
      download: `https://nodejs.org/dist/${fileName}/node-${fileName}-x86.msi`,
    },
    {
      label: 'MAC Installer',
      icon: appleLogo,
      name: UserOS.MAC,
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
    <ul
      className="download-card__row"
      role="tablist"
      tabIndex={0}
      onKeyDown={(e: React.KeyboardEvent): void => {
        let key = null;
        if (e.which === 37) key = 'left';
        if (e.which === 39) key = 'right';
        if (!key) return;

        const currentIndex = downloadTypes.findIndex(d => d.name === selected);
        let nextIndex = currentIndex;
        nextIndex += key === 'left' ? -1 : 1;
        if (nextIndex < 0) nextIndex = downloadTypes.length - 1;
        if (nextIndex >= downloadTypes.length) nextIndex = 0;

        const nextItem = downloadTypes[nextIndex].name;
        setSelected(nextItem);
      }}
    >
      {downloadTypes.map(
        (os): JSX.Element => (
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
        )
      )}
    </ul>
  );
}
