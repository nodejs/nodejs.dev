import React from 'react';
import { FormattedMessage } from 'react-intl';
import { NodeReleaseLTSNPMVersion } from '../../types';
import styles from './index.module.scss';

interface Props {
  release?: NodeReleaseLTSNPMVersion;
}

const DownloadHeader = ({ release }: Props): JSX.Element => {
  const nodeVersion = release?.version;
  const npmVersion = release?.npm;
  const lts = !!release?.lts;

  return (
    <>
      <div className={styles.downloadHeader}>
        <div>
          HOME /{' '}
          <span className={styles.active}>
            <FormattedMessage id="components.downloadHeader.navigation.activeSection" />
          </span>
        </div>
        <div>
          <FormattedMessage
            id="components.downloadHeader.navigation.nodeVersion"
            values={{ lts, nodeVersion }}
          />
        </div>
      </div>
      <div className={styles.downloadHeader}>
        <div className={styles.title}>
          <FormattedMessage id="components.downloadHeader.navigation.title" />
        </div>
        <div className={styles.npm}>
          <FormattedMessage
            id="components.downloadHeader.navigation.npmVersion"
            values={{ npmVersion }}
          />
        </div>
      </div>
    </>
  );
};

export default DownloadHeader;
