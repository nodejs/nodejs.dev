import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { NodeReleaseLTSNPMVersion } from '../../types';
import SectionTitle from '../SectionTitle';
import styles from './index.module.scss';

interface Props {
  release?: NodeReleaseLTSNPMVersion;
}

const DownloadHeader = ({ release }: Props): JSX.Element => {
  const nodeVersion = release?.version;
  const npmVersion = release?.npm;
  const lts = !!release?.lts;

  const intl = useIntl();

  return (
    <>
      <div className={styles.downloadHeader}>
        <SectionTitle
          path={[
            'home',
            intl.formatMessage({
              id: 'components.downloadHeader.navigation.activeSection',
            }),
          ]}
        />
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
