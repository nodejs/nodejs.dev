import React, { useState, useEffect } from 'react';
import { Tabs, TabList } from 'react-tabs';
import { NodeReleaseData } from '../../../types';
import { ReactComponent as AppleLogo } from '../../../images/logos/apple-logo.svg';
import { ReactComponent as MicrosoftLogo } from '../../../images/logos/microsoft-download-logo.svg';
import { ReactComponent as SourceCodeIcon } from '../../../images/logos/source-code-icon.svg';
import { UserOS } from '../../../util/detectOS';
import DownloadCard from './DownloadCard';
import styles from './index.module.scss';

interface Props {
  line?: NodeReleaseData;
  userOS: UserOS;
}

const DownloadCards = ({ line, userOS }: Props): JSX.Element => {
  const fileName = line?.fullVersion;
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
      icon: MicrosoftLogo,
      name: UserOS.WIN,
      fileName: `node-${fileName}-x86.msi`,
      download: `https://nodejs.org/dist/${fileName}/node-${fileName}-x86.msi`,
    },
    {
      label: 'MAC Installer',
      icon: AppleLogo,
      name: UserOS.MAC,
      fileName: `node-${fileName}.pkg`,
      download: `https://nodejs.org/dist/${fileName}/node-${fileName}.pkg`,
    },
    {
      label: 'Source Code',
      name: 'SOURCECODE',
      icon: SourceCodeIcon,
      fileName: `node-${fileName}.tar.gz`,
      download: `https://nodejs.org/dist/${fileName}/node-${fileName}.tar.gz`,
    },
  ];

  return (
    <Tabs tabIndex={-1} className={styles.downloadCardsWrapper}>
      <TabList
        className={styles.downloadCards}
        role="tablist"
        onKeyDown={(e: React.KeyboardEvent): void => {
          const currentIndex = downloadTypes.findIndex(
            d => d.name === selected
          );

          let direction = null;

          if (e.key === 'ArrowLeft') {
            direction = 'left';
          } else if (e.key === 'ArrowRight') {
            direction = 'right';
          }

          if (!direction) return;

          let nextIndex = currentIndex;
          nextIndex += direction === 'left' ? -1 : 1;

          if (nextIndex < 0) {
            nextIndex = downloadTypes.length - 1;
          } else if (nextIndex >= downloadTypes.length) {
            nextIndex = 0;
          }

          const nextItem = downloadTypes[nextIndex].name;
          setSelected(nextItem);
        }}
      >
        {downloadTypes.map(
          (os): JSX.Element => (
            <DownloadCard
              key={os.name}
              name={os.name}
              icon={os.icon}
              label={os.label}
              download={os.download}
              fileName={os.fileName}
              selected={selected === os.name}
              onSelect={setSelected}
            />
          )
        )}
      </TabList>
    </Tabs>
  );
};

export default DownloadCards;
